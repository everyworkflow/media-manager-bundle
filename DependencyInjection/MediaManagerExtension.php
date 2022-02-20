<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class MediaManagerExtension extends Extension implements PrependExtensionInterface
{
    /**
     * @throws \Exception
     *
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function load(array $configs, ContainerBuilder $container): void
    {
        $loader = new PhpFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.php');
    }

    /**
     * @return void
     */
    public function prepend(ContainerBuilder $container)
    {
        $bundles = $container->getParameter('kernel.bundles');
        $ymlLoader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        if (isset($bundles['EveryWorkflowAuthBundle'])) {
            $ymlLoader->load('auth.yaml');
        }
        if (isset($bundles['EveryWorkflowDataFormBundle'])) {
            $ymlLoader->load('data_form.yaml');
        }
        if (isset($bundles['EveryWorkflowAdminPanelBundle'])) {
            $ymlLoader->load('admin_panel.yaml');
        }
    }
}
