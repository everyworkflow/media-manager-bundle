<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Factory;

use EveryWorkflow\CoreBundle\Model\DataObjectFactoryInterface;
use EveryWorkflow\MediaManagerBundle\Model\File;
use EveryWorkflow\MediaManagerBundle\Model\FileInterface;
use EveryWorkflow\MediaManagerBundle\Model\FileType\ImageFile;
use EveryWorkflow\MediaManagerBundle\Model\FileType\ImageFileInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpKernel\KernelInterface;

class FileFactory implements FileFactoryInterface
{
    public const IMAGE_EXTENSIONS = [
        'png',
        'jpg',
        'jpeg'
    ];

    /**
     * @var DataObjectFactoryInterface
     */
    protected DataObjectFactoryInterface $dataObjectFactory;
    /**
     * @var KernelInterface
     */
    protected KernelInterface $kernel;
    /**
     * @var Filesystem
     */
    protected Filesystem $filesystem;

    public function __construct(
        DataObjectFactoryInterface $dataObjectFactory,
        KernelInterface $kernel,
        Filesystem $filesystem
    ) {
        $this->dataObjectFactory = $dataObjectFactory;
        $this->kernel = $kernel;
        $this->filesystem = $filesystem;
    }

    public function create(array $data = []): FileInterface
    {
        if (isset($data[FileInterface::KEY_PATH_NAME], $data[FileInterface::KEY_EXTENSION]) &&
            is_string($data[FileInterface::KEY_PATH_NAME]) && is_string($data[FileInterface::KEY_EXTENSION]) &&
            in_array(strtolower($data[FileInterface::KEY_EXTENSION]), self::IMAGE_EXTENSIONS, true)) {
            try {
                return $this->createImage($data);
            } catch (\Exception $e) {
                // ignored
//                dd($e->getMessage());
            }
        }
        $dataObject = $this->dataObjectFactory->create($data);
        return new File($dataObject);
    }

    protected function createImage(array $data): ImageFileInterface
    {
        $pathName = $data[FileInterface::KEY_PATH_NAME];
        $internalPath = $this->kernel->getProjectDir() . '/public' . $pathName;
        $pathArray = explode('/', $internalPath);
        $fileName = $pathArray[count($pathArray) - 1];
        $pathArray[count($pathArray) - 1] = '_thumbnail';
        $thumbnailDirectoryPath = implode('/', $pathArray);
        $pathArray[] = $fileName;
        $thumbnailPath = implode('/', $pathArray);

        if (!$this->filesystem->exists($thumbnailPath)) {
            $this->filesystem->mkdir($thumbnailDirectoryPath);

            $imagine = new \Imagine\Gd\Imagine();
//            $imagine = new \Imagine\Imagick\Imagine();
//            $imagine = new \Imagine\Gmagick\Imagine();
//            $mode = \Imagine\Image\ImageInterface::THUMBNAIL_INSET;

            $imagine->open($internalPath)
                ->thumbnail(new \Imagine\Image\Box(240, 240), \Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND)
                ->save($thumbnailPath);
        }

        $data[ImageFileInterface::KEY_THUMBNAIL_PATH] = $this->removePathToPublic($thumbnailPath);
        $dataObject = $this->dataObjectFactory->create($data);
        return new ImageFile($dataObject);
    }

    protected function removePathToPublic(string $path): string
    {
        $prefixPath = $this->kernel->getProjectDir() . '/public';
        if (str_contains($path, $prefixPath)) {
            $path = str_replace($prefixPath, '', $path);
        }
        return $path;
    }

    public function createFromSplFileInfo(SplFileInfo $splFileInfo): FileInterface
    {
        $data = [
            FileInterface::KEY_FILE_NAME => $splFileInfo->getFilename(),
            FileInterface::KEY_BASE_NAME => $splFileInfo->getBasename(),
            FileInterface::KEY_EXTENSION => $splFileInfo->getExtension(),
            FileInterface::KEY_SIZE => $splFileInfo->getSize(),
            FileInterface::KEY_PATH => $this->removePathToPublic($splFileInfo->getPath()),
            FileInterface::KEY_PATH_NAME => $this->removePathToPublic($splFileInfo->getPathname()),
            FileInterface::KEY_REAL_PATH => $this->removePathToPublic($splFileInfo->getRealPath()),
            FileInterface::KEY_TYPE => $splFileInfo->getType(),
            FileInterface::KEY_IS_READABLE => $splFileInfo->isReadable(),
            FileInterface::KEY_IS_WRITABLE => $splFileInfo->isWritable(),
            FileInterface::KEY_CREATED_AT => Date('Y-m-d H:i:s', $splFileInfo->getCTime()),
            FileInterface::KEY_UPDATED_AT => Date('Y-m-d H:i:s', $splFileInfo->getCTime()),
        ];
        return $this->create($data);
    }
}
