/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import SelectedMediaItemInterface from "@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface";
import MediaItemInterface from "@EveryWorkflow/MediaManagerBundle/Model/MediaItemInterface";
import MediaDirItemInterface from "@EveryWorkflow/MediaManagerBundle/Model/MediaDirItemInterface";

interface MediaManagerStateInterface {
    media_manager_id?: string;
    init_type: string;
    loading: boolean;
    page_number: number;
    is_next_page_ended: boolean;
    remote_media_path: string;
    selected_media_data: Array<SelectedMediaItemInterface>;
    selected_media_for_config?: MediaItemInterface;
    media_manager_data: Array<MediaItemInterface>;
    media_manager_dir_data: Array<MediaDirItemInterface>;
    is_upload_files_visible: boolean;
    media_manager_data_change_trigger: number;
}

export default MediaManagerStateInterface;
