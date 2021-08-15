/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useContext, useEffect} from 'react';
import PanelContext from "@EveryWorkflow/AdminPanelBundle/Admin/Context/PanelContext";
import { ACTION_HIDE_FOOTER, ACTION_SET_PAGE_TITLE } from "@EveryWorkflow/AdminPanelBundle/Admin/Reducer/PanelReducer";
import MediaManagerComponent from "@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent";

const MediaManagerPage = () => {
    const {dispatch: panelDispatch} = useContext(PanelContext);

    useEffect(() => {
        panelDispatch({type: ACTION_SET_PAGE_TITLE, payload: 'Media'});
        panelDispatch({type: ACTION_HIDE_FOOTER});
    }, [panelDispatch]);

    return (
        <div className="app-container" style={{paddingTop: 16}}>
            <MediaManagerComponent/>
        </div>
    );
};

export default MediaManagerPage;
