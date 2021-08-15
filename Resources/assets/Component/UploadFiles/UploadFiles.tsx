/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import Upload from 'antd/lib/upload';
import InboxOutlined from '@ant-design/icons/InboxOutlined';

const UploadFiles = () => {
    return (
        <>
            <Form.Item
                name="dragger"
                valuePropName="fileList"
                // getValueFromEvent={normFile}
                noStyle
            >
                <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                    </p>
                </Upload.Dragger>
            </Form.Item>
        </>
    );
};

export default UploadFiles;
