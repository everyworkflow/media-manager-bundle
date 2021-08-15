<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model\FileType;

use EveryWorkflow\MediaManagerBundle\Model\FileInterface;

interface ImageFileInterface extends FileInterface
{
    public const KEY_THUMBNAIL_PATH = 'thumbnail_path';

    public function getThumbnailPath(): ?string;

    public function setThumbnailPath(string $thumbnailPath): self;
}
