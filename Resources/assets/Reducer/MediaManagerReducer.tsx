/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { MEDIA_MANAGER_TYPE_SINGLE_SELECT } from '@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent/MediaManagerComponent';
import MediaManagerStateInterface from '@EveryWorkflow/MediaManagerBundle/Model/MediaManagerStateInterface';
import SelectedMediaItemInterface from '@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface';

export const ACTION_SET_REMOTE_MEDIA_PATH = 'set_remote_media_path';
export const ACTION_APPEND_MEDIA_DATA = 'append_media_data';
export const ACTION_SELECTED_MEDIA_FOR_CONFIG = 'set_selected_media_for_config';
export const ACTION_SET_DIR_DATA = 'set_dir_data';

export const ACTION_CLEAR_ALL_SELECTED_MEDIA = 'clear_all_selected_media';
export const ACTION_PUSH_SELECTED_MEDIA = 'push_selected_media';
export const ACTION_REMOVE_SELECTED_MEDIA = 'remove_selected_media';

export const ACTION_NEXT_PAGE = 'next_page';
export const ACTION_SHOW_UPLOAD_FILES = 'show_upload_files_visible';
export const ACTION_HIDE_UPLOAD_FILES = 'hide_upload_files_visible';

export const ACTION_SET_PREVIEW_IMAGE = 'set_preview_image';

const MediaManagerReducer = (
    state: MediaManagerStateInterface,
    action: any
) => {
    switch (action.type) {
        case ACTION_SET_REMOTE_MEDIA_PATH: {
            if (action.payload === state.remote_media_path) {
                return state;
            }
            return {
                ...state,
                loading: true,
                page_number: 1,
                selected_media_data: [],
                media_manager_data: [],
                remote_media_path: action.payload,
            };
        }
        case ACTION_APPEND_MEDIA_DATA: {
            return {
                ...state,
                loading: false,
                media_manager_data: [...state.media_manager_data, ...action.payload],
                is_next_page_ended: action.payload.length < 99,
            };
        }
        case ACTION_SELECTED_MEDIA_FOR_CONFIG: {
            return {
                ...state,
                selected_media_for_config: action.payload,
            };
        }
        case ACTION_SET_DIR_DATA: {
            return {
                ...state,
                media_manager_dir_data: action.payload,
            };
        }
        case ACTION_CLEAR_ALL_SELECTED_MEDIA: {
            return {
                ...state,
                selected_media_data: [],
            };
        }
        case ACTION_PUSH_SELECTED_MEDIA: {
            const mediaItem: SelectedMediaItemInterface = {
                title: action.payload.file_name,
                path_name: action.payload.path_name,
                thumbnail_path: action.payload.thumbnail_path,
            };
            if (state.init_type === MEDIA_MANAGER_TYPE_SINGLE_SELECT) {
                return {
                    ...state,
                    selected_media_data: [mediaItem],
                };
            }
            const selectedMediaData = state.selected_media_data;
            const payloadIndex = selectedMediaData.findIndex(
                (item) => item.path_name === mediaItem.path_name
            );
            if (payloadIndex === -1) {
                selectedMediaData.push(mediaItem);
            }
            return {
                ...state,
                selected_media_data: selectedMediaData,
            };
        }
        case ACTION_REMOVE_SELECTED_MEDIA: {
            const selectedMediaData = state.selected_media_data;
            const payloadIndex = selectedMediaData.findIndex(
                (item) => item.path_name === action.payload.path_name
            );
            if (payloadIndex !== -1) {
                selectedMediaData.splice(payloadIndex, 1);
            }
            return {
                ...state,
                selected_media_data: selectedMediaData,
            };
        }
        case ACTION_NEXT_PAGE: {
            return {
                ...state,
                loading: true,
                page_number: state.page_number + 1,
            };
        }
        case ACTION_SHOW_UPLOAD_FILES: {
            return {
                ...state,
                is_upload_files_visible: true,
            };
        }
        case ACTION_HIDE_UPLOAD_FILES: {
            return {
                ...state,
                is_upload_files_visible: false,
            };
        }
        case ACTION_SET_PREVIEW_IMAGE: {
            return {
                ...state,
                preview_image: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default MediaManagerReducer;
