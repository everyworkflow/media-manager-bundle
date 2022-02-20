/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import MediaManagerStateInterface from "@EveryWorkflow/MediaManagerBundle/Model/MediaManagerStateInterface";

export const mediaManagerState: MediaManagerStateInterface = {
    init_type: '',
    loading: true,
    page_number: 1,
    is_next_page_ended: true,
    remote_media_path: '/media',
    selected_media_data: [],
    selected_media_for_config: undefined,
    media_manager_data: [],
    media_manager_dir_data: [],
    is_upload_files_visible: false,
    media_manager_data_change_trigger: 1,
    preview_image: undefined,
};
