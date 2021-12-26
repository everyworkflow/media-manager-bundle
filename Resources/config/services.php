<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use Symfony\Component\DependencyInjection\Loader\Configurator\DefaultsConfigurator;

return function (ContainerConfigurator $configurator) {
    /** @var DefaultsConfigurator $services */
    $services = $configurator
        ->services()
        ->defaults()
        ->autowire()
        ->autoconfigure();

    $services
        ->load('EveryWorkflow\\MediaManagerBundle\\', '../../*')
        ->exclude('../../{DependencyInjection,Resources,Support,Tests}');
};
