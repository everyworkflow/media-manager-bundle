<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model\FileType;

use EveryWorkflow\MediaManagerBundle\Model\File;

class ImageFile extends File implements ImageFileInterface
{
    public function getThumbnailPath(): ?string
    {
        return $this->dataObject->getData(self::KEY_THUMBNAIL_PATH);
    }

    public function setThumbnailPath(string $thumbnailPath): self
    {
        $this->dataObject->setData(self::KEY_THUMBNAIL_PATH, $thumbnailPath);
        return $this;
    }
}
