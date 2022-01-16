/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect, useState } from 'react';
import Space from 'antd/lib/space';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import MediaImageSelectorFieldInterface
    from '@EveryWorkflow/MediaManagerBundle/Model/Field/MediaImageSelectorFieldInterface';
import MediaPanelComponent from "@EveryWorkflow/MediaManagerBundle/Component/MediaPanelComponent";
import { MEDIA_MANAGER_TYPE_SINGLE_SELECT } from '@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent/MediaManagerComponent';
import MediaGridItemContent from '@EveryWorkflow/MediaManagerBundle/Component/MediaGridItem/MediaGridItemContent';
import SelectedMediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface';
import MediaEditPanel from '@EveryWorkflow/MediaManagerBundle/Component/FieldEditPanel';
import FileImageOutlined from '@ant-design/icons/FileImageOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';

interface MediaImageSelectorFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageSelectorFieldInterface;
}

const MediaImageSelectorField = ({ fieldData, children }: MediaImageSelectorFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [isMediaSelectorEnabled, setIsMediaSelectorEnabled] = useState(false);
    const [isMediaConfigEnabled, setIsMediaConfigEnabled] = useState(false);
    // const [selectedMediaItem, setSelectedMediaItem] = useState<SelectedMediaItemInterface>(fieldData.value);
    const [selectedMediaItem, setSelectedMediaItem] = useState<SelectedMediaItemInterface | undefined>(((): SelectedMediaItemInterface | undefined => {
        if (fieldData.name && formState.initial_values[fieldData.name]) {
            if (formState.initial_values[fieldData.name] === 'string') {
                return JSON.parse(formState.initial_values[fieldData.name]);
            } else {
                return formState.initial_values[fieldData.name];
            }
        }
        return undefined;
    })());

    useEffect(() => {
        const updateValues: any = {};
        if (fieldData.name && selectedMediaItem) {
            updateValues[fieldData.name] = {
                path_name: selectedMediaItem?.path_name,
                thumbnail_path: selectedMediaItem?.thumbnail_path,
                title: selectedMediaItem?.title,
            };
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }
    }, [selectedMediaItem]);

    if (fieldData.name && formState.hidden_field_names?.includes(fieldData.name)) {
        return null;
    }

    return (
        <>
            <Form.Item
                style={!!(fieldData.name && formState.invisible_field_names?.includes(fieldData.name)) ? {
                    display: 'none',
                } : undefined}
                name={fieldData.name}
                label={fieldData.label}
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : undefined}
                rules={[{ required: fieldData.is_required }]}>
                <>
                    {selectedMediaItem && (
                        <div style={{ marginBottom: 8 }}>
                            <Tooltip title={selectedMediaItem.title} placement="bottom">
                                <Button
                                    onClick={() => {
                                        setIsMediaConfigEnabled(true);
                                    }}
                                    style={{ height: 'auto', padding: 0 }}>
                                    <MediaGridItemContent
                                        imageSize={240}
                                        itemData={selectedMediaItem}
                                    />
                                </Button>
                            </Tooltip>
                        </div>
                    )}
                    <Button
                        icon={selectedMediaItem ? <EditOutlined /> : <FileImageOutlined />}
                        onClick={() => {
                            setIsMediaSelectorEnabled(true);
                        }}
                        disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}>
                        {selectedMediaItem ? 'Reselect media image' : 'Select media image'}
                    </Button>
                </>
            </Form.Item>
            {selectedMediaItem && isMediaConfigEnabled && (
                <MediaEditPanel
                    selectedMedia={selectedMediaItem}
                    onClose={(title) => {
                        const newMediaItem = selectedMediaItem;
                        newMediaItem.title = title;
                        setSelectedMediaItem(newMediaItem);
                        setIsMediaConfigEnabled(false);
                    }}
                />
            )}
            {isMediaSelectorEnabled && (
                <MediaPanelComponent
                    initType={MEDIA_MANAGER_TYPE_SINGLE_SELECT}
                    selectedMediaData={selectedMediaItem ? [selectedMediaItem] : []}
                    onSelectedDataChange={(items: Array<SelectedMediaItemInterface>) => {
                        if (items.length) {
                            setSelectedMediaItem(items[0]);
                        }
                    }}
                    onClose={() => {
                        setIsMediaSelectorEnabled(false);
                    }}
                />
            )}
            {children}
        </>
    );
};

export default MediaImageSelectorField;
