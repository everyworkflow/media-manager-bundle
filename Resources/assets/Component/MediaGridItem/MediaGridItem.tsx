/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useContext, useEffect, useState} from 'react';
import classNames from 'classnames';
import Col from 'antd/lib/col';
import Space from 'antd/lib/space';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Checkbox from 'antd/lib/checkbox';
import MediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/MediaItemInterface';
import {
    ACTION_PUSH_SELECTED_MEDIA,
    ACTION_REMOVE_SELECTED_MEDIA,
    ACTION_SELECTED_MEDIA_FOR_CONFIG,
} from '@EveryWorkflow/MediaManagerBundle/Reducer/MediaManagerReducer';
import MediaManagerContext from '@EveryWorkflow/MediaManagerBundle/Context/MediaManagerContext';
import MediaGridItemContent from '@EveryWorkflow/MediaManagerBundle/Component/MediaGridItem/MediaGridItemContent';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

interface MediaGridItemProps {
    itemData: MediaItemInterface;
}

const MediaGridItem = ({itemData}: MediaGridItemProps) => {
    const {state: mediaState, dispatch: mediaDispatch} = useContext(
        MediaManagerContext
    );
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {
        const currentMediaIndex = mediaState.selected_media_data.findIndex(
            (item) => item.path_name === itemData.path_name
        );
        setIsSelected(currentMediaIndex !== -1);
    }, [mediaState.selected_media_data, itemData]);

    const onMediaItemClick = () => {
        if (isSelected) {
            mediaDispatch({type: ACTION_REMOVE_SELECTED_MEDIA, payload: itemData});
        } else {
            mediaDispatch({type: ACTION_PUSH_SELECTED_MEDIA, payload: itemData});
        }
        setIsSelected(!isSelected);
    };

    return (
        <Col>
            <div
                className={classNames(
                    'app-media-grid-item mb-1',
                    isSelected ? 'selected' : ''
                )}
                style={{marginBottom: 8}}
            >
                <div style={{height: 28}}>
                    <Space
                        align="end"
                        style={{display: 'flex', justifyContent: 'space-between'}}
                    >
                        <Checkbox checked={isSelected} onChange={onMediaItemClick}/>
                        <Tooltip title="Properties" placement="bottom">
                            <Button
                                type="dashed"
                                shape="circle"
                                size="small"
                                icon={<SettingOutlined/>}
                                onClick={() => {
                                    mediaDispatch({
                                        type: ACTION_SELECTED_MEDIA_FOR_CONFIG,
                                        payload: itemData,
                                    });
                                }}
                            />
                        </Tooltip>
                    </Space>
                </div>
                <Tooltip title={itemData.base_name} placement="bottom">
                    <Button
                        onClick={onMediaItemClick}
                        style={{height: 'auto', padding: 0}}
                    >
                        <MediaGridItemContent itemData={itemData} imageSize={122}/>
                    </Button>
                </Tooltip>
            </div>
        </Col>
    );
};

export default MediaGridItem;
