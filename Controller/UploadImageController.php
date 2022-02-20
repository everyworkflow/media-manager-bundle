<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\MediaManagerBundle\Controller;

use EveryWorkflow\CoreBundle\Annotation\EwRoute;
use EveryWorkflow\MediaManagerBundle\Factory\FileFactory;
use EveryWorkflow\MediaManagerBundle\Factory\FileFactoryInterface;
use EveryWorkflow\MediaManagerBundle\Repository\MediaRepositoryInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UploadImageController extends AbstractController
{
    protected MediaRepositoryInterface $mediaRepository;
    protected FileFactoryInterface $fileFactory;

    public function __construct(
        MediaRepositoryInterface $mediaRepository,
        FileFactoryInterface $fileFactory
    ) {
        $this->mediaRepository = $mediaRepository;
        $this->fileFactory = $fileFactory;
    }

    #[EwRoute(
        path: "media-manager/upload-image",
        name: 'media_manager.upload_image',
        methods: 'POST',
        permissions: 'media_manager.upload_image',
        swagger: true
    )]
    public function __invoke(Request $request): JsonResponse
    {
        $path = $request->get('path');
        if (empty($path) || !str_starts_with($path, '/media')) {
            return new JsonResponse([
                'detail' => 'Path is not valid.',
            ], 404);
        }

        $file = $request->files->get('file');
        if ($file && in_array($file->guessExtension(), FileFactory::IMAGE_EXTENSIONS)) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileName = $originalFilename . '.' . $file->guessExtension();
            $internalFile = $file->move($this->getParameter('kernel.project_dir') . '/public' . $path, $fileName);

            $fileItem = $this->fileFactory->createFromFile($internalFile);

            return new JsonResponse([
                'detail' => $fileName . ' upload successfull.',
                'item' => $fileItem->toArray(),
            ]);
        }

        return new JsonResponse([
            'detail' => 'Upload failed.'
        ], 400);
    }
}
