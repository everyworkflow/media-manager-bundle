<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model;

class File extends AbstractFinderItem implements FileInterface
{
    public function getFileName(): ?string
    {
        return $this->dataObject->getData(self::KEY_FILE_NAME);
    }

    public function setFileName(string $fileName): self
    {
        $this->dataObject->setData(self::KEY_FILE_NAME, $fileName);
        return $this;
    }

    public function getBaseName(): ?string
    {
        return $this->dataObject->getData(self::KEY_BASE_NAME);
    }

    public function setBaseName(string $baseName): self
    {
        $this->dataObject->setData(self::KEY_BASE_NAME, $baseName);
        return $this;
    }

    public function getExtension(): ?string
    {
        return $this->dataObject->getData(self::KEY_EXTENSION);
    }

    public function setExtension(string $extension): self
    {
        $this->dataObject->setData(self::KEY_EXTENSION, $extension);
        return $this;
    }

    public function getSize(): ?string
    {
        return $this->dataObject->getData(self::KEY_SIZE);
    }

    public function setSize(string $size): FileInterface
    {
        $this->dataObject->setData(self::KEY_SIZE, $size);
        return $this;
    }
}
