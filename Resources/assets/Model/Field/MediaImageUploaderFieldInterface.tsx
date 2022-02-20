/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface';

interface MediaImageUploaderFieldInterface extends BaseFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    options?: any;
    upload_path?: string;
}

export default MediaImageUploaderFieldInterface;
