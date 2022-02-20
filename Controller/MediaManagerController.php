<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Controller;

use EveryWorkflow\CoreBundle\Annotation\EwRoute;
use EveryWorkflow\MediaManagerBundle\Repository\MediaRepositoryInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class MediaManagerController extends AbstractController
{
    protected MediaRepositoryInterface $mediaRepository;

    public function __construct(MediaRepositoryInterface $mediaRepository)
    {
        $this->mediaRepository = $mediaRepository;
    }

    #[EwRoute(
        path: "media-manager",
        name: 'media_manager',
        methods: 'GET',
        permissions: 'media_manager.view',
        swagger: true
    )]
    public function __invoke(Request $request): JsonResponse
    {
        $reqPath = $request->query->get('path');
        $page = (int) $request->query->get('page');
        if (!$page) {
            $page = 1;
        }

        $data = [
            'media_manager_data' => $this->getMediaManagerData($reqPath, (int) $page),
        ];
        if ((!$reqPath || '/media' === $reqPath) && 1 === $page) {
            $data['media_manager_dir_data'] = $this->getMediaManagerDirData();
        }

        return new JsonResponse($data);
    }

    /**
     * @param scalar|null $reqPath
     */
    protected function getMediaManagerData($reqPath, int $page = 1): array
    {
        $projectRoot = $this->mediaRepository->getFileCollection($reqPath ?? '/media', $page);

        return $projectRoot->toArray();
    }

    protected function getMediaManagerDirData(): array
    {
        $items = [];
        $projectRoot = $this->mediaRepository->readDirTree();
        foreach ($projectRoot as $item) {
            $items[] = $item->toArray();
        }

        return $items;
    }
}
