/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useState } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Image from 'antd/lib/image';
import SidePanelComponent, {
    PANEL_SIZE_MEDIUM,
} from '@EveryWorkflow/CoreBundle/Component/SidePanelComponent/SidePanelComponent';
import SelectedMediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface';
import UrlHelper from "@EveryWorkflow/CoreBundle/Helper/UrlHelper";

interface FieldEditPanelProps {
    selectedMedia?: SelectedMediaItemInterface;
    onClose?: (title: string) => void;
}

const FieldEditPanel = ({ selectedMedia, onClose }: FieldEditPanelProps) => {
    const [title, setTitle] = useState<string>(selectedMedia?.title ?? '');

    return (
        <SidePanelComponent
            title="Edit media item"
            size={PANEL_SIZE_MEDIUM}
            onClose={() => {
                if (onClose) {
                    onClose(title);
                }
            }}
        >
            <>
                <div style={{ marginBottom: 24 }}>
                    {(selectedMedia?.thumbnail_path !== undefined ||
                        selectedMedia?.extension === 'svg' ||
                        selectedMedia?.extension === 'jpg' ||
                        selectedMedia?.extension === 'jpeg' ||
                        selectedMedia?.extension === 'gif') && (
                        <Image
                            preview={false}
                            src={UrlHelper.buildImgUrlFromPath(selectedMedia?.path_name)}
                            style={{ height: 'auto', width: 'auto', maxWidth: '100%' }}
                            alt={title}
                        />
                    )}
                </div>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="Title" name="title" initialValue={title}>
                        <Input
                            autoFocus={true}
                            onChange={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Base name"
                        name="base_name"
                        initialValue={selectedMedia?.base_name}
                    >
                        <Input readOnly={true} bordered={false} />
                    </Form.Item>
                    <Form.Item
                        label="Extension"
                        name="extension"
                        initialValue={selectedMedia?.extension}
                    >
                        <Input readOnly={true} bordered={false} />
                    </Form.Item>
                    <Form.Item
                        label="Path name"
                        name="path_name"
                        initialValue={selectedMedia?.path_name}
                    >
                        <Input readOnly={true} bordered={false} />
                    </Form.Item>
                    {selectedMedia?.thumbnail_path && (
                        <Form.Item
                            label="Thumbnail path"
                            name="thumbnail_path"
                            initialValue={selectedMedia.thumbnail_path}
                        >
                            <Input readOnly={true} bordered={false} />
                        </Form.Item>
                    )}
                    {selectedMedia?.sort_order && (
                        <Form.Item
                            label="Sort order"
                            name="sort_order"
                            initialValue={selectedMedia.sort_order}
                        >
                            <Input readOnly={true} bordered={false} />
                        </Form.Item>
                    )}
                </Form>
            </>
        </SidePanelComponent>
    );
};

export default FieldEditPanel;
