<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Repository;

use EveryWorkflow\DataGridBundle\Factory\DataCollectionFactoryInterface;
use EveryWorkflow\DataGridBundle\Model\DataCollectionInterface;
use EveryWorkflow\MediaManagerBundle\Factory\DirectoryFactoryInterface;
use EveryWorkflow\MediaManagerBundle\Factory\FileFactoryInterface;
use EveryWorkflow\MediaManagerBundle\Model\DirectoryInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpKernel\KernelInterface;

class MediaRepository implements MediaRepositoryInterface
{
    /**
     * @var KernelInterface
     */
    protected KernelInterface $kernel;
    /**
     * @var DirectoryFactoryInterface
     */
    protected DirectoryFactoryInterface $directoryFactory;
    /**
     * @var FileFactoryInterface
     */
    protected FileFactoryInterface $fileFactory;
    /**
     * @var DataCollectionFactoryInterface
     */
    protected DataCollectionFactoryInterface $collectionFactory;

    public function __construct(
        KernelInterface $kernel,
        DirectoryFactoryInterface $directoryFactory,
        FileFactoryInterface $fileFactory,
        DataCollectionFactoryInterface $collectionFactory
    ) {
        $this->kernel = $kernel;
        $this->directoryFactory = $directoryFactory;
        $this->fileFactory = $fileFactory;
        $this->collectionFactory = $collectionFactory;
    }

    public function getDirectoryFactory(): DirectoryFactoryInterface
    {
        return $this->directoryFactory;
    }

    public function getFileFactory(): FileFactoryInterface
    {
        return $this->fileFactory;
    }

    /**
     * @param string|string[] $dir
     * @return string|string[]
     */
    protected function mapRootDirToParam(array | string $dir): array | string
    {
        if (is_string($dir)) {
            $dir = $this->kernel->getProjectDir() . '/public' . $dir;
        } elseif (is_array($dir)) {
            foreach ($dir as &$item) {
                $item = $this->kernel->getProjectDir() . '/public' . $item;
            }
        }
        return $dir;
    }

    /**
     * @param string|string[] $dir
     * @param string|int|string[]|int[] $depth
     * @return DirectoryInterface[]
     */
    public function readDirTree(array | string $dir = '/media', $depth = []): array
    {
        $items = [];

        $finder = (new Finder())
            ->directories()
            ->ignoreUnreadableDirs()
            ->depth($depth)
            ->exclude(['cache'])
            ->in($this->mapRootDirToParam($dir));
        /** @var SplFileInfo $item */
        foreach ($finder->getIterator() as $item) {
            $items[] = $this->directoryFactory->createFromSplFileInfo($item);
        }

        return $items;
    }

    /**
     * @param string|string[] $dir
     * @param int $pageNumber
     * @param string|int|string[]|int[] $depth
     * @return DataCollectionInterface
     */
    public function getFileCollection(
        array | string $dir = '/media',
        int $pageNumber = 1,
        $depth = 0
    ): DataCollectionInterface {
        $finder = (new Finder())
            ->files()
            ->ignoreUnreadableDirs()
            ->depth($depth)
            ->exclude(['cache'])
            ->sortByModifiedTime()
            ->reverseSorting()
            //            ->sortByName()
            ->in($this->mapRootDirToParam($dir));
        $iterator = $finder->getIterator();

        $count = 0;
        $from = ($pageNumber * self::COLLECTION_PER_PAGE) - self::COLLECTION_PER_PAGE;

        $results = [];
        /** @var SplFileInfo $item */
        foreach ($iterator as $item) {
            /* Moving cursor to initial state */
            if ($count < $from) {
                $count = $from;
                for ($i = 1; $i < $from; $i++) {
                    $iterator->next();
                }
                continue;
            }

            $count++;
            $results[] = $this->fileFactory->createFromSplFileInfo($item);
            if ($count >= ($pageNumber * self::COLLECTION_PER_PAGE)) {
                break;
            }
        }

        return $this->collectionFactory->create()
            ->setResults($results)
            ->setCurrentPage($pageNumber)
            ->setPerPage(self::COLLECTION_PER_PAGE)
            ->setFrom($from);
    }
}
