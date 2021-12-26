/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";

const MediaManagerPage = lazy(() => import("@EveryWorkflow/MediaManagerBundle/Admin/Page/MediaManagerPage"));

export const MediaManagerRoutes = [
    {
        path: '/media-manager',
        exact: true,
        component: MediaManagerPage
    },
];
