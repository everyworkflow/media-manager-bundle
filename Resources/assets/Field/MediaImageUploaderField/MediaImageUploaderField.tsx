/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useState, useEffect } from 'react';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Image from 'antd/lib/image';
import MediaImageUploaderFieldInterface
    from '@EveryWorkflow/MediaManagerBundle/Model/Field/MediaImageUploaderFieldInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';
import Upload from 'antd/lib/upload';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import UrlHelper from '@EveryWorkflow/PanelBundle/Helper/UrlHelper';
import LocalStorage from '@EveryWorkflow/PanelBundle/Service/LocalStorage';
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '@EveryWorkflow/PanelBundle/Action/AlertAction';

interface MediaImageUploaderFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageUploaderFieldInterface;
}

const MediaImageUploaderField = ({ fieldData, children }: MediaImageUploaderFieldProps) => {
    const { state: formState } = useContext(FormContext);
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
            showUploadList: false,
            action: UrlHelper.buildApiUrl(fieldData.upload_path ?? ''),
            headers: requestHeader,
            onChange: (info: any) => {
                const { status, response } = info.file;
                if (status === 'done') {
                    if (response.item && response.item.path_name) {
                        setSelectedMediaPath(response.item.path_name);
                        const fieldValues: any = {};
                        if (fieldData.name) {
                            fieldValues[fieldData.name] = response.item.path_name;
                            formState.form?.setFieldsValue(fieldValues);
                        }
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
                    <Upload listType="picture" {...getProps()}>
                        <Button type="default" icon={<UploadOutlined />}>Upload image</Button>
                    </Upload>
                </>
            </Form.Item>
            {children}
        </>
    );
};

export default MediaImageUploaderField;
