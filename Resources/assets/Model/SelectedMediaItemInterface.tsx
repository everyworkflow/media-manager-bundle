/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface SelectedMediaItemInterface {
    id: number;
    title: string;
    base_name: string;
    extension: string;
    path: string;
    path_name: string;
    thumbnail_path?: string;
    sort_order: number;
}

export default SelectedMediaItemInterface;
