/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect, useState } from 'react';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Image from 'antd/lib/image';
import MediaImageSelectorFieldInterface
    from '@EveryWorkflow/MediaManagerBundle/Model/Field/MediaImageSelectorFieldInterface';
import MediaPanelComponent from "@EveryWorkflow/MediaManagerBundle/Component/MediaPanelComponent";
import { MEDIA_MANAGER_TYPE_SINGLE_SELECT } from '@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent/MediaManagerComponent';
import SelectedMediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface';
import FileImageOutlined from '@ant-design/icons/FileImageOutlined';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';
import UrlHelper from '@EveryWorkflow/PanelBundle/Helper/UrlHelper';

interface MediaImageSelectorFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageSelectorFieldInterface;
}

const MediaImageSelectorField = ({ fieldData, children }: MediaImageSelectorFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [isMediaSelectorEnabled, setIsMediaSelectorEnabled] = useState(false);
    const [selectedMediaPath, setSelectedMediaPath] = useState<string | undefined>(((): string | undefined => {
        if (fieldData.name && formState.initial_values[fieldData.name]) {
            if (formState.initial_values[fieldData.name] === 'string') {
                return formState.initial_values[fieldData.name];
            }
        }
        return undefined;
    })());

    useEffect(() => {
        const updateValues: any = {};
        if (fieldData.name && selectedMediaPath) {
            updateValues[fieldData.name] = selectedMediaPath;
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }
    }, [selectedMediaPath]);

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
                    {selectedMediaPath && (
                        <div style={{ marginBottom: 8 }}>
                            <Image
                                src={UrlHelper.buildImgUrlFromPath(selectedMediaPath)}
                                style={{ maxWidth: '100%', maxHeight: '600px' }}
                            />
                        </div>
                    )}
                    <Button
                        icon={<FileImageOutlined />}
                        onClick={() => {
                            setIsMediaSelectorEnabled(true);
                        }}
                        disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}>
                        Select media image
                    </Button>
                </>
            </Form.Item>
            {isMediaSelectorEnabled && (
                <MediaPanelComponent
                    initType={MEDIA_MANAGER_TYPE_SINGLE_SELECT}
                    mediaPath={fieldData.upload_path ?? '/media'}
                    onSelectedDataChange={(items: Array<SelectedMediaItemInterface>) => {
                        if (items.length && items[0].path_name) {
                            setSelectedMediaPath(items[0].path_name);
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
