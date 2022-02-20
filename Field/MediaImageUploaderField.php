<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

class MediaImageUploaderField extends MediaFileUploaderField implements MediaImageUploaderFieldInterface
{
    protected string $fieldType = 'media_image_uploader_field';
}
