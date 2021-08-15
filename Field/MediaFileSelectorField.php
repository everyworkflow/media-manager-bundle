<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

use EveryWorkflow\DataFormBundle\Field\AbstractField;

class MediaFileSelectorField extends AbstractField implements MediaFileSelectorFieldInterface
{
    protected string $fieldType = 'media_file_selector_field';
}
