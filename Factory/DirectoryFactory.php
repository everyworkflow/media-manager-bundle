<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Factory;

use EveryWorkflow\CoreBundle\Model\DataObjectFactoryInterface;
use EveryWorkflow\MediaManagerBundle\Model\Directory;
use EveryWorkflow\MediaManagerBundle\Model\DirectoryInterface;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpKernel\KernelInterface;

class DirectoryFactory implements DirectoryFactoryInterface
{
    /**
     * @var DataObjectFactoryInterface
     */
    protected DataObjectFactoryInterface $dataObjectFactory;
    /**
     * @var KernelInterface
     */
    protected KernelInterface $kernel;

    public function __construct(DataObjectFactoryInterface $dataObjectFactory, KernelInterface $kernel)
    {
        $this->dataObjectFactory = $dataObjectFactory;
        $this->kernel = $kernel;
    }

    public function create(array $data = []): DirectoryInterface
    {
        $dataObject = $this->dataObjectFactory->create($data);
        return new Directory($dataObject);
    }

    protected function removePathToPublic(string $path): string
    {
        $prefixPath = $this->kernel->getProjectDir() . '/public';
        if (str_contains($path, $prefixPath)) {
            $path = str_replace($prefixPath, '', $path);
        }
        return $path;
    }

    public function createFromSplFileInfo(SplFileInfo $splFileInfo): DirectoryInterface
    {
        $data = [
            DirectoryInterface::KEY_DIR_NAME => $splFileInfo->getFilename(),
            DirectoryInterface::KEY_PATH => $this->removePathToPublic($splFileInfo->getPath()),
            DirectoryInterface::KEY_PATH_NAME => $this->removePathToPublic($splFileInfo->getPathname()),
            DirectoryInterface::KEY_REAL_PATH => $this->removePathToPublic($splFileInfo->getRealPath()),
            DirectoryInterface::KEY_TYPE => $splFileInfo->getType(),
            DirectoryInterface::KEY_IS_READABLE => $splFileInfo->isReadable(),
            DirectoryInterface::KEY_IS_WRITABLE => $splFileInfo->isWritable(),
            DirectoryInterface::KEY_CREATED_AT => Date('Y-m-d H:i:s', $splFileInfo->getCTime()),
            DirectoryInterface::KEY_UPDATED_AT => Date('Y-m-d H:i:s', $splFileInfo->getCTime()),
        ];
        return $this->create($data);
    }
}
