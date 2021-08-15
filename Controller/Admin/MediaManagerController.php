<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Controller\Admin;

use EveryWorkflow\MediaManagerBundle\Repository\MediaRepositoryInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MediaManagerController extends AbstractController
{
    protected MediaRepositoryInterface $mediaRepository;

    public function __construct(MediaRepositoryInterface $mediaRepository)
    {
        $this->mediaRepository = $mediaRepository;
    }

    /**
     * @Route(
     *     path="admin_api/media_manager",
     *     name="admin_media_manager",
     *     methods="GET"
     * )
     */
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

        return (new JsonResponse())->setData($data);
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
