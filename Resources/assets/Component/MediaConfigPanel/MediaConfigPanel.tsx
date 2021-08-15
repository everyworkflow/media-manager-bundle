/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext } from 'react';
import Image from 'antd/lib/image';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import MediaManagerContext from '@EveryWorkflow/MediaManagerBundle/Context/MediaManagerContext';
import UrlHelper from "@EveryWorkflow/CoreBundle/Helper/UrlHelper";

const MediaConfigPanel = () => {
    const { state: mediaState } = useContext(MediaManagerContext);

    const getHumanReadableSize = () => {
        const size = mediaState.selected_media_for_config?.size;
        if (size && size > 1000 && size <= 1000000) {
            return (Number(size) / 1000).toFixed(1) + ' KB';
        } else if (size && size > 1000000 && size <= 1000000000) {
            return (Number(size) / 1000000).toFixed(1) + ' MB';
        } else if (size && size > 1000000000) {
            return (Number(size) / 1000000000).toFixed(1) + ' GB';
        }
        return size + ' bytes';
    };

    return (
        <>
            <div style={{ marginBottom: 24 }}>
                {(mediaState.selected_media_for_config?.thumbnail_path !== undefined ||
                    mediaState.selected_media_for_config?.extension === 'svg' ||
                    mediaState.selected_media_for_config?.extension === 'jpg' ||
                    mediaState.selected_media_for_config?.extension === 'jpeg' ||
                    mediaState.selected_media_for_config?.extension === 'gif') && (
                    <Image
                        preview={false}
                        src={UrlHelper.buildImgUrlFromPath(mediaState.selected_media_for_config?.path_name)}
                        style={{ height: 'auto', width: 'auto', maxWidth: '100%' }}
                        alt={mediaState.selected_media_for_config?.file_name ?? ''}
                    />
                )}
            </div>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item
                    label="Name"
                    name="name"
                    initialValue={mediaState.selected_media_for_config?.file_name}
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Path"
                    name="path"
                    initialValue={mediaState.selected_media_for_config?.path}
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Path name"
                    name="path_name"
                    initialValue={mediaState.selected_media_for_config?.path_name}
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
                {mediaState.selected_media_for_config?.thumbnail_path !== undefined && (
                    <Form.Item
                        label="Thumbnail path"
                        name="thumbnail_path"
                        initialValue={mediaState.selected_media_for_config?.thumbnail_path}
                    >
                        <Input readOnly={true} bordered={false} />
                    </Form.Item>
                )}
                <Form.Item
                    label="Type"
                    name="type"
                    initialValue={mediaState.selected_media_for_config?.type}
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Extension"
                    name="extension"
                    initialValue={mediaState.selected_media_for_config?.extension}
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Size"
                    name="size"
                    initialValue={getHumanReadableSize()}
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Is readable"
                    name="is_readable"
                    initialValue={
                        mediaState.selected_media_for_config?.is_readable ? 'Yes' : 'No'
                    }
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Is writable"
                    name="is_writable"
                    initialValue={
                        mediaState.selected_media_for_config?.is_writable ? 'Yes' : 'No'
                    }
                >
                    <Input readOnly={true} bordered={false} />
                </Form.Item>
            </Form>
        </>
    );
};

export default MediaConfigPanel;
