/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const MediaFileSelectorField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaFileSelectorField"));
const MediaImageSelectorField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaImageSelectorField"));
const MediaImageGallerySelectorField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaImageGallerySelectorField"));
const MediaFileUploaderField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaFileUploaderField"));
const MediaImageUploaderField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaImageUploaderField"));
const MediaImageGalleryUploaderField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaImageGalleryUploaderField"));

export const MediaFormFieldMaps = {
    media_file_selector_field: MediaFileSelectorField,
    media_image_selector_field: MediaImageSelectorField,
    media_image_gallery_selector_field: MediaImageGallerySelectorField,
    media_file_uploader_field: MediaFileUploaderField,
    media_image_uploader_field: MediaImageUploaderField,
    media_image_gallery_uploader_field: MediaImageGalleryUploaderField,
};
