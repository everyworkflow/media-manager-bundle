/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface MediaDirItemInterface {
    dir_name: string;
    path: string;
    path_name: string;
    real_path: string;
    type: string;
    is_readable: boolean;
    is_writable: boolean;
    created_at: string;
    updated_at: string;
    media_manager_dir_data?: Array<MediaDirItemInterface>;
}

export default MediaDirItemInterface;
