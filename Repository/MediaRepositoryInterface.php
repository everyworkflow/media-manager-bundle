<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Repository;

use EveryWorkflow\DataGridBundle\Model\DataCollectionInterface;
use EveryWorkflow\MediaManagerBundle\Factory\DirectoryFactoryInterface;
use EveryWorkflow\MediaManagerBundle\Factory\FileFactoryInterface;
use EveryWorkflow\MediaManagerBundle\Model\DirectoryInterface;

interface MediaRepositoryInterface
{
    public const COLLECTION_PER_PAGE = 99;

    public function getDirectoryFactory(): DirectoryFactoryInterface;

    public function getFileFactory(): FileFactoryInterface;

    /**
     * @param string|string[] $dir
     * @param string|int|string[]|int[] $depth
     * @return DirectoryInterface[]
     */
    public function readDirTree(array | string $dir = '/media', $depth = []): array;

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
    ): DataCollectionInterface;
}
