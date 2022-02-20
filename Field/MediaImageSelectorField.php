<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

class MediaImageSelectorField extends MediaFileSelectorField implements MediaImageSelectorFieldInterface
{
    protected string $fieldType = 'media_image_selector_field';
}
