<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use EveryWorkflow\MediaManagerBundle\Model\File;
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

//    $services
//        ->load('EveryWorkflow\\MediaManagerBundle\\Controller\\', '../../Controller/*')
//        ->tag('controller.service_arguments');

//    $services->set(File::class)
//        ->factory([service('EveryWorkflow\MediaManagerBundle\Model\FileFactory'), 'createFile']);
};
