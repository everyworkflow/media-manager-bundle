/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import MediaResponseDataInterface from "@EveryWorkflow/MediaManagerBundle/Model/MediaResponseDataInterface";
import Remote from "@EveryWorkflow/AdminPanelBundle/Admin/Service/Remote";
import {
    ACTION_APPEND_MEDIA_DATA,
    ACTION_SET_DIR_DATA
} from "@EveryWorkflow/MediaManagerBundle/Reducer/MediaManagerReducer";

const FetchMediaAction = (url: string, params?: any) => {
    return async (dispatch: any) => {
        const apiSubfixArray: Array<string> = [];
        if (params) {
            Object.keys(params).forEach((key) => {
                const subfix = key + '=' + params[key];
                apiSubfixArray.push(subfix);
            });
        }
        const apiUrl = url + '?' + apiSubfixArray.join('&').toString();
        const data: MediaResponseDataInterface = await Remote.get(apiUrl);
        if (data.media_manager_dir_data) {
            dispatch({
                type: ACTION_SET_DIR_DATA,
                payload: data.media_manager_dir_data,
            });
        }
        if (data.media_manager_data) {
            dispatch({
                type: ACTION_APPEND_MEDIA_DATA,
                payload: data.media_manager_data.results,
            });
        }
        return data;
    };
};

export default FetchMediaAction;
