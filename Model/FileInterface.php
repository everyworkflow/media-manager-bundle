<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Model;

interface FileInterface extends AbstractFinderItemInterface
{
    public const KEY_FILE_NAME = 'file_name';
    public const KEY_BASE_NAME = 'base_name';
    public const KEY_EXTENSION = 'extension';
    public const KEY_SIZE = 'size';

    public function getFileName(): ?string;

    public function setFileName(string $fileName): self;

    public function getBaseName(): ?string;

    public function setBaseName(string $baseName): self;

    public function getExtension(): ?string;

    public function setExtension(string $extension): self;

    public function getSize(): ?string;

    public function setSize(string $size): self;
}
