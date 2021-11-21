<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle;

use EveryWorkflow\MediaManagerBundle\DependencyInjection\MediaManagerExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class EveryWorkflowMediaManagerBundle extends Bundle
{
    public function getContainerExtension(): ?ExtensionInterface
    {
        return new MediaManagerExtension();
    }
}
