<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model;

interface DirectoryInterface extends AbstractFinderItemInterface
{
    public const KEY_DIR_NAME = 'dir_name';

    public function getDirName(): ?string;

    public function setDirName(string $dirName): self;

    public function addChildren(string $key, DirectoryInterface $directory): self;
    public function removeChildren(string $key): self;
    public function getChildren(string|null $key = null): null|array|DirectoryInterface;
}
