<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model;

class Directory extends AbstractFinderItem implements DirectoryInterface
{
    /**
     * @var DirectoryInterface[]
     */
    protected array $children = [];

    public function getDirName(): ?string
    {
        return $this->dataObject->getData(self::KEY_DIR_NAME);
    }

    public function setDirName(string $dirName): DirectoryInterface
    {
        $this->dataObject->setData(self::KEY_DIR_NAME, $dirName);
        return $this;
    }

    public function addChildren(string $key, DirectoryInterface $directory): DirectoryInterface
    {
        $this->children[$key] = $directory;
        return $this;
    }

    public function removeChildren(string $key): DirectoryInterface
    {
        if (isset($this->children[$key])) {
            unset($this->children[$key]);
        }
        return $this;
    }

    public function getChildren(?string $key = null): null|array|DirectoryInterface
    {
        if ($key === null) {
            return $this->children;
        }
        return $this->children[$key] ?? null;
    }
}
