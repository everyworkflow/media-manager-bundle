<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\DependencyInjection;

use EveryWorkflow\DataFormBundle\DependencyInjection\Configuration as DataFormConfiguration;
use EveryWorkflow\DataFormBundle\DependencyInjection\DataFormExtension;
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
        $this->overwriteDataFormConfig($container);
    }

    protected function overwriteDataFormConfig(ContainerBuilder $container): void
    {
        $ymlLoader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $ymlLoader->load('data_form.yaml');

        $extension = new DataFormExtension();
        $configs = $container->getExtensionConfig($extension->getAlias());
        ksort($configs); // Reverse priority -> bundle config then project config
        $configs = $this->processConfiguration(new DataFormConfiguration(), $configs);
        $container->setParameter('data_form', $configs);
    }
}
