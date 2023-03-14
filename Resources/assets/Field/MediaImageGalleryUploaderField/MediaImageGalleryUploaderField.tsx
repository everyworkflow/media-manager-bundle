/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { forwardRef, useCallback, useContext, useState, useEffect } from 'react';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Image from 'antd/lib/image';
import MediaImageUploaderFieldInterface
    from '@EveryWorkflow/MediaManagerBundle/Model/Field/MediaImageUploaderFieldInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import SidePanelComponent from '@EveryWorkflow/PanelBundle/Component/SidePanelComponent';
import { PANEL_SIZE_MEDIUM } from '@EveryWorkflow/PanelBundle/Component/SidePanelComponent/SidePanelComponent';
import UploadImages from '@EveryWorkflow/MediaManagerBundle/Field/MediaImageGalleryUploaderField/UploadImages';
import { ReactSortable } from 'react-sortablejs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tooltip from 'antd/lib/tooltip';
import MediaGridItemContent from '@EveryWorkflow/MediaManagerBundle/Component/MediaGridItem/MediaGridItemContent';
import Space from 'antd/lib/space';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import PreviewImageInterface from '@EveryWorkflow/MediaManagerBundle/Model/PreviewImageInterface';
import SelectedMediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface';
import FieldEditPanel from '@EveryWorkflow/MediaManagerBundle/Component/FieldEditPanel';

interface MediaImageGalleryUploaderFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageUploaderFieldInterface;
}

// eslint-disable-next-line react/display-name
const CustomReactSortable = forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <Row gutter={16} ref={ref}>
            {props.children}
        </Row>
    );
});

const MediaImageGalleryUploaderField = ({ fieldData, children }: MediaImageGalleryUploaderFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [isMediaUploaderEnabled, setIsMediaUploaderEnabled] = useState(false);
    const [mediaItemConfigPath, setMediaItemConfigPath] = useState<string | undefined>(undefined);
    const [previewItem, setPreviewItem] = useState<PreviewImageInterface | undefined>(undefined);
    const [selectedMediaItems, setSelectedMediaItems] = useState<Array<SelectedMediaItemInterface>>(((): Array<SelectedMediaItemInterface> => {
        if (fieldData.name && formState.initial_values[fieldData.name]) {
            return formState.initial_values[fieldData.name] ?? [];
        }
        return [];
    })());

    useEffect(() => {
        const updateValues: any = {};
        if (fieldData.name && selectedMediaItems.length) {
            const mediaValues: Array<any> = [];
            selectedMediaItems.map((item: SelectedMediaItemInterface) => {
                mediaValues.push({
                    path_name: item?.path_name,
                    thumbnail_path: item?.thumbnail_path,
                    title: item?.title,
                });
            });
            updateValues[fieldData.name] = mediaValues;
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }
    }, [selectedMediaItems]);

    const getSortableList = useCallback(() => {
        return selectedMediaItems.map((item: SelectedMediaItemInterface, index: number) => ({
            id: index,
            ...item,
        }));
    }, [selectedMediaItems]);

    const setSortableList = (items: Array<any>) => {
        const selectedItems: Array<SelectedMediaItemInterface> = items.map((item: any) => ({
            title: item.title ?? '',
            path_name: item.path_name ?? '',
            thumbnail_path: item.thumbnail_path ?? '',
        }));
        handleMediaGalleryUpdate(selectedItems);
    }

    const handleMediaGalleryUpdate = (selectedItems: Array<any>) => {
        setSelectedMediaItems(selectedItems);
        const fieldValues: any = {};
        if (fieldData.name) {
            fieldValues[fieldData.name] = selectedItems;
            formState.form?.setFieldsValue(fieldValues);
        }
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
                    {getSortableList()?.length > 0 && (
                        <ReactSortable
                            tag={CustomReactSortable}
                            animation={200}
                            list={getSortableList()}
                            setList={setSortableList}>
                            {getSortableList().map((mediaItem, mediaItemIndex) => (
                                <Col key={mediaItem.id} className="media-gallery-card-col" style={{ marginBottom: 16 }}>
                                    <Tooltip title={mediaItem.title} placement="bottom">
                                        <div className="media-gallery-card-wrapper">
                                            <Button
                                                style={{ height: 'auto', padding: 0 }}>
                                                <MediaGridItemContent
                                                    title={mediaItem.title}
                                                    pathName={mediaItem.path_name}
                                                    thumbnailPath={mediaItem.thumbnail_path}
                                                    imageSize={216}
                                                />
                                            </Button>
                                            <Space className="media-gallery-card-hover">
                                                <Button
                                                    type="default"
                                                    shape="circle"
                                                    onClick={() => {
                                                        setPreviewItem({
                                                            src: mediaItem.path_name,
                                                            visible: true,
                                                        });
                                                    }}>
                                                    <EyeOutlined />
                                                </Button>
                                                <Button
                                                    type="default"
                                                    shape="circle"
                                                    onClick={() => {
                                                        setMediaItemConfigPath(mediaItem.path_name);
                                                    }}>
                                                    <SettingOutlined />
                                                </Button>
                                                <Button
                                                    type="ghost"
                                                    shape="circle"
                                                    danger={true}
                                                    onClick={() => {
                                                        let newSelectedMediaItems = [...getSortableList()];
                                                        newSelectedMediaItems.splice(mediaItemIndex, 1);
                                                        handleMediaGalleryUpdate(newSelectedMediaItems);
                                                    }}>
                                                    <DeleteOutlined />
                                                </Button>
                                            </Space>
                                        </div>
                                    </Tooltip>
                                </Col>
                            ))}
                        </ReactSortable>
                    )}
                    <Button type="default" icon={<UploadOutlined />} onClick={() => setIsMediaUploaderEnabled(true)}>Upload images</Button>
                    {isMediaUploaderEnabled && (
                        <SidePanelComponent
                            title={'Upload images'}
                            size={PANEL_SIZE_MEDIUM}
                            onClose={() => {
                                setIsMediaUploaderEnabled(false);
                            }}>
                            <UploadImages uploadPath={fieldData.upload_path ?? ''} onNewUpload={(data) => {
                                if (selectedMediaItems.findIndex((item) => data.path_name === item.path_name) === -1) {
                                    const newSelectedMediaItems = [...selectedMediaItems];
                                    newSelectedMediaItems.push({
                                        title: data.file_name,
                                        path_name: data.path_name,
                                        thumbnail_path: data.thumbnail_path,
                                    });
                                    handleMediaGalleryUpdate(newSelectedMediaItems);
                                }
                            }} />
                        </SidePanelComponent>
                    )}
                    {selectedMediaItems.length > 0 && mediaItemConfigPath && (
                        <FieldEditPanel
                            selectedMedia={selectedMediaItems.find((item) => item.path_name === mediaItemConfigPath)}
                            onClose={(title: string) => {
                                const newMediaItems = selectedMediaItems;
                                const selectedMediaItemIndex = newMediaItems.findIndex(
                                    (item) => item.path_name === mediaItemConfigPath
                                );
                                if (selectedMediaItemIndex !== -1) {
                                    newMediaItems[selectedMediaItemIndex].title = title;
                                }
                                handleMediaGalleryUpdate(newMediaItems);
                                setMediaItemConfigPath(undefined);
                            }}
                        />
                    )}
                    {previewItem && (
                        <Image
                            width={0}
                            height={0}
                            style={{ display: 'none' }}
                            src={previewItem.src}
                            preview={{
                                src: previewItem.src,
                                visible: previewItem.visible,
                                onVisibleChange: () => {
                                    setPreviewItem(undefined);
                                },
                            }}
                        />
                    )}
                </>
            </Form.Item>
            {children}
        </>
    );
};

export default MediaImageGalleryUploaderField;
