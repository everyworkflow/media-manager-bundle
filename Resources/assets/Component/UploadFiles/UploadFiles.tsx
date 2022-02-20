/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext } from 'react';
import Upload from 'antd/lib/upload';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import UrlHelper from '@EveryWorkflow/PanelBundle/Helper/UrlHelper';
import { message } from 'antd';
import MediaManagerContext from '@EveryWorkflow/MediaManagerBundle/Context/MediaManagerContext';
import LocalStorage from '@EveryWorkflow/PanelBundle/Service/LocalStorage';

const UploadFiles = () => {
    const { state: mediaState } = useContext(MediaManagerContext);

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

        let props: any = {
            name: 'file',
            multiple: true,
            action: UrlHelper.buildApiUrl('/media-manager/upload?path=' + mediaState.remote_media_path),
            headers: requestHeader,
            onChange: (info: any) => {
                const { status } = info.file;
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
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
};

export default UploadFiles;
