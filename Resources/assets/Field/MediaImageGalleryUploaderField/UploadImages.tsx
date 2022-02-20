/*
 * @copyright EveryWorkflow. All rights reserved.
 */
import React from 'react';

import Upload from 'antd/lib/upload';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import UrlHelper from '@EveryWorkflow/PanelBundle/Helper/UrlHelper';
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '@EveryWorkflow/PanelBundle/Action/AlertAction';
import LocalStorage from '@EveryWorkflow/PanelBundle/Service/LocalStorage';

interface UploadImagesProps {
    uploadPath: string;
    onNewUpload?: (data: any) => void;
}

const UploadImages = ({ uploadPath, onNewUpload }: UploadImagesProps) => {
    const getProps = () => {
        const requestHeader: any = {
            'accept': 'application/json',
        };
        try {
            const authData: any = LocalStorage.get('ew_auth');
            if (authData.token) {
                requestHeader['Authorization'] = 'Bearer ' + authData.token;
            }
        } catch (error: any) { }
        const props = {
            name: 'file',
            multiple: true,
            action: UrlHelper.buildApiUrl(uploadPath),
            headers: requestHeader,
            onChange: (info: any) => {
                const { status, response } = info.file;
                if (status === 'done') {
                    if (response.item && onNewUpload) {
                        onNewUpload(response.item);
                    }
                    AlertAction({
                        message: `${info.file.name} file uploaded successfully.`,
                        type: ALERT_TYPE_SUCCESS
                    });
                } else if (status === 'error') {
                    AlertAction({
                        message: `${info.file.name} file upload failed.`,
                        type: ALERT_TYPE_ERROR
                    });
                }
            },
            beforeUpload: (file: any) => {
                const isSupportedType = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
                if (!isSupportedType) {
                    AlertAction({
                        message: 'You can only upload images!',
                        type: ALERT_TYPE_ERROR
                    });
                }
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    AlertAction({
                        message: 'Image must smaller than 5MB!',
                        type: ALERT_TYPE_ERROR
                    });
                }
                return isSupportedType && isLt5M;
            }
        };
        return props;
    }

    return (
        <>
            <Upload.Dragger {...getProps()}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
        </>
    );
}

export default UploadImages;
