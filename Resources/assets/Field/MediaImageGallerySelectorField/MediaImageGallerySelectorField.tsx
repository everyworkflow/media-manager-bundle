/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import {ReactSortable} from 'react-sortablejs';
import MediaImageSelectorFieldInterface
    from '@EveryWorkflow/MediaManagerBundle/Model/Field/MediaImageSelectorFieldInterface';
import MediaPanelComponent from "@EveryWorkflow/MediaManagerBundle/Component/MediaPanelComponent";
import {MEDIA_MANAGER_TYPE_MULTI_SELECT} from '@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent/MediaManagerComponent';
import MediaGridItemContent from '@EveryWorkflow/MediaManagerBundle/Component/MediaGridItem/MediaGridItemContent';
import SelectedMediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface';
import FieldEditPanel from '@EveryWorkflow/MediaManagerBundle/Component/FieldEditPanel';
import FileImageOutlined from '@ant-design/icons/FileImageOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface MediaImageSelectorFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageSelectorFieldInterface;
}

// eslint-disable-next-line react/display-name
const CustomReactSortable = forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <Row gutter={16} ref={ref}>
            {props.children}
        </Row>
    );
});

const MediaImageGallerySelectorField = ({fieldData, children, form}: MediaImageSelectorFieldProps) => {
    const [isMediaSelectorEnabled, setIsMediaSelectorEnabled] = useState(false);
    const [mediaItemConfigId, setMediaItemConfigId] = useState<number>(-1);
    const [selectedMediaItems, setSelectedMediaItems] = useState<SelectedMediaItemInterface[]>(
        typeof fieldData.value === 'string' ? JSON.parse(fieldData.value) : []
    );

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
            updateValues[fieldData.name] = JSON.stringify(mediaValues);
        }
        if (Object.keys(updateValues).length) {
            form.setFieldsValue(updateValues);
        }
    }, [selectedMediaItems]);

    const getSelectedMedia = useCallback(() => {
        const selectedMediaItem = selectedMediaItems.find((item) => item.id === mediaItemConfigId);
        if (selectedMediaItem) {
            return selectedMediaItem;
        }
        return undefined;
    }, [selectedMediaItems, mediaItemConfigId]);

    return (
        <>
            <Form.Item
                wrapperCol={{span: 20}}
                name={fieldData.name}
                label={fieldData.label}
                initialValue={fieldData.value ?? []}
                rules={[{required: fieldData.is_required}]}
            >
                <>
                    <Button
                        style={{marginBottom: 16}}
                        icon={
                            selectedMediaItems?.length > 0 ? (
                                <EditOutlined/>
                            ) : (
                                <FileImageOutlined/>
                            )
                        }
                        onClick={() => {
                            setIsMediaSelectorEnabled(true);
                        }}
                    >
                        {selectedMediaItems?.length > 0
                            ? 'Reselect media images'
                            : 'Select media images'}
                    </Button>
                    {selectedMediaItems?.length > 0 && (
                        <ReactSortable
                            tag={CustomReactSortable}
                            animation={200}
                            list={selectedMediaItems}
                            setList={setSelectedMediaItems}
                        >
                            {selectedMediaItems.map((mediaItem) => (
                                <Col key={mediaItem.id} style={{marginBottom: 16}}>
                                    <Tooltip title={mediaItem.title} placement="bottom">
                                        <Button
                                            onClick={() => {
                                                setMediaItemConfigId(mediaItem.id);
                                            }}
                                            style={{height: 'auto', padding: 0}}
                                        >
                                            <MediaGridItemContent
                                                imageSize={175}
                                                itemData={mediaItem}
                                            />
                                        </Button>
                                    </Tooltip>
                                </Col>
                            ))}
                        </ReactSortable>
                    )}
                </>
            </Form.Item>
            {selectedMediaItems.length > 0 && mediaItemConfigId !== -1 && (
                <FieldEditPanel
                    selectedMedia={getSelectedMedia()}
                    onClose={(title: string) => {
                        if (getSelectedMedia()) {
                            const newMediaItems = selectedMediaItems;
                            const selectedMediaItemIndex = newMediaItems.findIndex(
                                (item) => item.id === mediaItemConfigId
                            );
                            if (selectedMediaItemIndex !== -1) {
                                newMediaItems[selectedMediaItemIndex].title = title;
                            }
                            setSelectedMediaItems(newMediaItems);
                        }
                        setMediaItemConfigId(-1);
                    }}
                />
            )}
            {isMediaSelectorEnabled && (
                <MediaPanelComponent
                    initType={MEDIA_MANAGER_TYPE_MULTI_SELECT}
                    selectedMediaData={selectedMediaItems}
                    onSelectedDataChange={(items: Array<SelectedMediaItemInterface>) => {
                        setSelectedMediaItems(items);
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

export default MediaImageGallerySelectorField;
