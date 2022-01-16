<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

use EveryWorkflow\DataFormBundle\Field\BaseField;

class MediaImageGallerySelectorField extends BaseField implements MediaImageGallerySelectorFieldInterface
{
    protected string $fieldType = 'media_image_gallery_selector_field';
}
