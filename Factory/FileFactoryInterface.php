<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Factory;

use EveryWorkflow\MediaManagerBundle\Model\FileInterface;
use Symfony\Component\Finder\SplFileInfo;

interface FileFactoryInterface
{
    public function create(array $data = []): FileInterface;

    public function createFromSplFileInfo(SplFileInfo $splFileInfo): FileInterface;

    public function createFromFile(\Symfony\Component\HttpFoundation\File\File $file): FileInterface;
}
