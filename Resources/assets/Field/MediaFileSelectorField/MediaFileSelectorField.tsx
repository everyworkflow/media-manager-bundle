/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useContext, useEffect, useState } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
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

interface MediaFileSelectorFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageSelectorFieldInterface;
}

const MediaFileSelectorField = ({ fieldData, children }: MediaFileSelectorFieldProps) => {
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

    const isImageSelected = useCallback(() => {
        let isImage = false;
        ['.png', '.jpg', '.jpeg', 'svg'].forEach((extension: string) => {
            if (selectedMediaPath?.endsWith(extension)) {
                isImage = true;
            }
        });
        return isImage;
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
                            <Input
                                value={selectedMediaPath}
                                disabled={true}
                                readOnly={true}
                            />
                        </div>
                    )}
                    {selectedMediaPath && isImageSelected() && (
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

export default MediaFileSelectorField;
