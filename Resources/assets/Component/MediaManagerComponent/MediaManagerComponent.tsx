/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useContext, useEffect, useReducer} from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Sidebar from '@EveryWorkflow/MediaManagerBundle/Component/Sidebar';
import MediaGrid from '@EveryWorkflow/MediaManagerBundle/Component/MediaGrid';
import MediaManagerContext from '@EveryWorkflow/MediaManagerBundle/Context/MediaManagerContext';
import MediaManagerReducer, {
    ACTION_HIDE_UPLOAD_FILES,
    ACTION_SELECTED_MEDIA_FOR_CONFIG,
} from '@EveryWorkflow/MediaManagerBundle/Reducer/MediaManagerReducer';
import FetchMediaAction from '@EveryWorkflow/MediaManagerBundle/Action/FetchMediaAction';
import SidePanelComponent from '@EveryWorkflow/CoreBundle/Component/SidePanelComponent';
import {PANEL_SIZE_MEDIUM} from '@EveryWorkflow/CoreBundle/Component/SidePanelComponent/SidePanelComponent';
import MediaConfigPanel from '@EveryWorkflow/MediaManagerBundle/Component/MediaConfigPanel';
import UploadFiles from '@EveryWorkflow/MediaManagerBundle/Component/UploadFiles';
import SelectedMediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface';
import PanelContext from '@EveryWorkflow/AdminPanelBundle/Admin/Context/PanelContext';
import {mediaManagerState} from "@EveryWorkflow/MediaManagerBundle/State/MediaManagerState";

export const MEDIA_MANAGER_TYPE_NONE = 'media_manager_type_none'; // default
export const MEDIA_MANAGER_TYPE_MULTI_SELECT = 'media_manager_type_multi_select';
export const MEDIA_MANAGER_TYPE_SINGLE_SELECT = 'media_manager_type_single_select';

interface MediaManagerComponentProps {
    mediaManagerId?: string;
    initType?: string;
    mediaPath?: string;
    onClose?: () => void;
    selectedMediaData?: Array<SelectedMediaItemInterface>;
    onSelectedDataChange?: (items: any) => void;
}

const MediaManagerComponent = ({
    mediaManagerId,
    initType = MEDIA_MANAGER_TYPE_NONE,
    mediaPath = '/media',
    onClose,
    selectedMediaData = [],
    onSelectedDataChange,
}: MediaManagerComponentProps) => {
    const {state: panelState} = useContext(PanelContext);
    const [state, dispatch] = useReducer(MediaManagerReducer, {
        ...mediaManagerState,
        media_manager_id: mediaManagerId,
        init_type: initType,
        remote_media_path: mediaPath,
        selected_media_data: selectedMediaData,
    });

    useEffect(() => {
        const run = async () => {
            await FetchMediaAction('/media_manager', {
                path: state.remote_media_path,
                page: state.page_number,
            })(dispatch);
        };
        run();
    }, [state.remote_media_path, state.page_number]);

    const onSelectedButtonClick = () => {
        if (onSelectedDataChange) {
            onSelectedDataChange(state.selected_media_data);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <MediaManagerContext.Provider value={{state: state, dispatch: dispatch}}>
            <>
                {panelState.screen?.width && panelState.screen?.width < 768 ? (
                    <>
                        <div style={{marginBottom: 16}}>
                            <Sidebar onSelectedButtonClick={onSelectedButtonClick}/>
                        </div>
                        <MediaGrid/>
                    </>
                ) : (
                    <Row gutter={16}>
                        <Col style={{width: 250}}>
                            <Sidebar onSelectedButtonClick={onSelectedButtonClick}/>
                        </Col>
                        <Col flex="auto" style={{width: 'calc(100% - 266px)'}}>
                            <MediaGrid/>
                        </Col>
                    </Row>
                )}
                {state.is_upload_files_visible && (
                    <SidePanelComponent
                        title={'Upload files'}
                        size={PANEL_SIZE_MEDIUM}
                        onClose={() => {
                            dispatch({type: ACTION_HIDE_UPLOAD_FILES});
                        }}
                    >
                        <UploadFiles/>
                    </SidePanelComponent>
                )}
                {state.selected_media_for_config && (
                    <SidePanelComponent
                        title={state.selected_media_for_config?.file_name + ' properties'}
                        size={PANEL_SIZE_MEDIUM}
                        onClose={() => {
                            dispatch({
                                type: ACTION_SELECTED_MEDIA_FOR_CONFIG,
                                payload: undefined,
                            });
                        }}
                    >
                        <MediaConfigPanel/>
                    </SidePanelComponent>
                )}
            </>
        </MediaManagerContext.Provider>
    );
};

export default MediaManagerComponent;