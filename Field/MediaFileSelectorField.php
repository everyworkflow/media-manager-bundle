<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

use EveryWorkflow\DataFormBundle\Field\BaseField;

class MediaFileSelectorField extends BaseField implements MediaFileSelectorFieldInterface
{
    protected string $fieldType = 'media_file_selector_field';
}
