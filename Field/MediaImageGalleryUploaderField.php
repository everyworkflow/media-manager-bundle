<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

class MediaImageGalleryUploaderField extends MediaFileUploaderField implements MediaImageGalleryUploaderFieldInterface
{
    protected string $fieldType = 'media_image_gallery_uploader_field';
}
