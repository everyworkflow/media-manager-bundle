/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import MediaManagerStateInterface from '@EveryWorkflow/MediaManagerBundle/Model/MediaManagerStateInterface';
import {mediaManagerState} from "@EveryWorkflow/MediaManagerBundle/State/MediaManagerState";

export interface MediaManagerContextInterface {
    state: MediaManagerStateInterface;
    dispatch: any;
}

const MediaManagerContext = createContext<MediaManagerContextInterface>({
    state: mediaManagerState,
    dispatch: () => null,
});

export default MediaManagerContext;
