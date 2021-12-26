/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import MediaGridItem from '@EveryWorkflow/MediaManagerBundle/Component/MediaGridItem';
import MediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/MediaItemInterface';
import MediaManagerContext from '@EveryWorkflow/MediaManagerBundle/Context/MediaManagerContext';
import { ACTION_NEXT_PAGE } from '@EveryWorkflow/MediaManagerBundle/Reducer/MediaManagerReducer';
import LoadingIndicatorComponent from "@EveryWorkflow/PanelBundle/Component/LoadingIndicatorComponent";

const MediaGrid = () => {
    const { state: mediaState, dispatch: mediaDispatch } = useContext(MediaManagerContext);

    return (
        <>
            <Row gutter={16}>
                {mediaState.media_manager_data.map(
                    (item: MediaItemInterface, index: number) => (
                        <MediaGridItem key={index} itemData={item} />
                    )
                )}
                {!mediaState.is_next_page_ended && (
                    <Col span="24" style={{ padding: 24, textAlign: 'center' }}>
                        <Button
                            type="dashed"
                            disabled={mediaState.loading}
                            onClick={() => {
                                mediaDispatch({ type: ACTION_NEXT_PAGE });
                            }}
                        >
                            {mediaState.loading ? <LoadingIndicatorComponent /> : 'Load more'}
                        </Button>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default MediaGrid;
