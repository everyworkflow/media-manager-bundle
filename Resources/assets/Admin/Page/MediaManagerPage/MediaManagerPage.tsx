/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import PanelContext from "@EveryWorkflow/PanelBundle/Context/PanelContext";
import { ACTION_SET_PAGE_TITLE } from "@EveryWorkflow/PanelBundle/Reducer/PanelReducer";
import MediaManagerComponent from "@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent";

const MediaManagerPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Media' });
    }, [panelDispatch]);

    return (
        <div className="app-container" style={{ paddingTop: 16 }}>
            <MediaManagerComponent />
        </div>
    );
};

export default MediaManagerPage;
