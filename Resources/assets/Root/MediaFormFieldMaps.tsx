/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";

const MediaImageSelectorField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaImageSelectorField"));
const MediaImageGallerySelectorField = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Field/MediaImageGallerySelectorField"));

export const MediaFormFieldMaps = {
    media_image_selector_field: MediaImageSelectorField,
    media_image_gallery_selector_field: MediaImageGallerySelectorField,
};
