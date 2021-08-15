<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Factory;

use EveryWorkflow\MediaManagerBundle\Model\DirectoryInterface;
use Symfony\Component\Finder\SplFileInfo;

interface DirectoryFactoryInterface
{
    public function create(array $data = []): DirectoryInterface;

    public function createFromSplFileInfo(SplFileInfo $splFileInfo): DirectoryInterface;
}
