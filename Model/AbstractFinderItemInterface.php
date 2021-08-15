<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model;

use Carbon\CarbonInterface;
use EveryWorkflow\CoreBundle\Support\ArrayableInterface;

interface AbstractFinderItemInterface extends ArrayableInterface
{
    public const KEY_PATH = 'path';
    public const KEY_PATH_NAME = 'path_name';
    public const KEY_REAL_PATH = 'real_path';
    public const KEY_TYPE = 'type';
    public const KEY_IS_READABLE = 'is_readable';
    public const KEY_IS_WRITABLE = 'is_writable';
    public const KEY_CREATED_AT = 'created_at';
    public const KEY_UPDATED_AT = 'updated_at';

    public function getPath(): ?string;

    public function setPath(string $path): self;

    public function getPathName(): ?string;

    public function setPathName(string $pathName): self;

    public function getRealPath(): ?string;

    public function setRealPath(string $realPath): self;

    public function getType(): ?string;

    public function setType(string $type): self;

    public function isReadable(): ?bool;

    public function setIsReadable(bool $isReadable): self;

    public function isWriteable(): ?bool;

    public function setIsWriteable(bool $isWriteable): self;

    public function setCreatedAt(CarbonInterface $createdAt): self;

    public function getCreatedAt(): ?CarbonInterface;

    public function setUpdatedAt(CarbonInterface $updatedAt): self;

    public function getUpdatedAt(): ?CarbonInterface;
}
