<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Field;

use EveryWorkflow\DataFormBundle\Field\BaseFieldInterface;

interface MediaFileUploaderFieldInterface extends BaseFieldInterface
{
    public const KEY_UPLOAD_PATH = 'upload_path';

    public function setUploadPath(string $uploadPath): self;

    public function getUploadPath(): ?string;
}
