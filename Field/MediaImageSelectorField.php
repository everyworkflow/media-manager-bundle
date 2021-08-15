<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

use EveryWorkflow\DataFormBundle\Field\AbstractField;

class MediaImageSelectorField extends AbstractField implements MediaImageSelectorFieldInterface
{
    protected string $fieldType = 'media_image_selector_field';
}
