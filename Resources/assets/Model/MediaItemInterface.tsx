/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface MediaItemInterface {
    file_name: string;
    extension: string;
    size: number;
    path: string;
    path_name: string;
    real_path: string;
    type: string;
    is_readable: boolean;
    is_writable: boolean;
    created_at: string;
    updated_at: string;
    thumbnail_path?: string;
}

export default MediaItemInterface;
