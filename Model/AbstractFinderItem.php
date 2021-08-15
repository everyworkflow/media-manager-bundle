<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use EveryWorkflow\CoreBundle\Model\DataObjectInterface;

abstract class AbstractFinderItem implements AbstractFinderItemInterface
{
    /**
     * @var DataObjectInterface
     */
    protected DataObjectInterface $dataObject;

    public function __construct(DataObjectInterface $dataObject)
    {
        $this->dataObject = $dataObject;
    }

    public function getPath(): ?string
    {
        return $this->dataObject->getData(self::KEY_PATH);
    }

    public function setPath(string $path): self
    {
        $this->dataObject->setData(self::KEY_PATH, $path);
        return $this;
    }

    public function getPathName(): ?string
    {
        return $this->dataObject->getData(self::KEY_PATH_NAME);
    }

    public function setPathName(string $pathName): self
    {
        $this->dataObject->setData(self::KEY_PATH_NAME, $pathName);
        return $this;
    }

    public function getRealPath(): ?string
    {
        return $this->dataObject->getData(self::KEY_REAL_PATH);
    }

    public function setRealPath(string $realPath): self
    {
        $this->dataObject->setData(self::KEY_REAL_PATH, $realPath);
        return $this;
    }

    public function getType(): ?string
    {
        return $this->dataObject->getData(self::KEY_TYPE);
    }

    public function setType(string $type): self
    {
        $this->dataObject->setData(self::KEY_TYPE, $type);
        return $this;
    }

    public function isReadable(): ?bool
    {
        return $this->dataObject->getData(self::KEY_IS_READABLE);
    }

    public function setIsReadable(bool $isReadable): self
    {
        $this->dataObject->setData(self::KEY_IS_READABLE, $isReadable);
        return $this;
    }

    public function isWriteable(): ?bool
    {
        return $this->dataObject->getData(self::KEY_IS_WRITABLE);
    }

    public function setIsWriteable(bool $isWriteable): self
    {
        $this->dataObject->setData(self::KEY_IS_WRITABLE, $isWriteable);
        return $this;
    }

    public function getCreatedAt(): ?CarbonInterface
    {
        $createdAt = $this->dataObject->getData(self::KEY_CREATED_AT);
        if ($createdAt) {
            return Carbon::make($createdAt);
        }
        return null;
    }

    public function setCreatedAt(CarbonInterface $createdAt): self
    {
        $this->dataObject->setData(self::KEY_CREATED_AT, $createdAt->toDateTimeString());
        return $this;
    }

    public function getUpdatedAt(): ?CarbonInterface
    {
        $updatedAt = $this->dataObject->getData(self::KEY_UPDATED_AT);
        if ($updatedAt) {
            return Carbon::make($updatedAt);
        }
        return null;
    }

    public function setUpdatedAt(CarbonInterface $updatedAt): self
    {
        $this->dataObject->setData(self::KEY_UPDATED_AT, $updatedAt->toDateTimeString());
        return $this;
    }

    public function toArray(): array
    {
        return $this->dataObject->toArray();
    }
}
