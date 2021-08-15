/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import MediaItemInterface from "@EveryWorkflow/MediaManagerBundle/Model/MediaItemInterface";
import MediaDirItemInterface from "@EveryWorkflow/MediaManagerBundle/Model/MediaDirItemInterface";

interface MediaResponseDataInterface {
    media_manager_data?: {
        results: Array<MediaItemInterface>;
    };
    media_manager_dir_data?: Array<MediaDirItemInterface>;
}

export default MediaResponseDataInterface;
