/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import SelectedMediaItemInterface from "@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface";
import SidePanelComponent from "@EveryWorkflow/PanelBundle/Component/SidePanelComponent";
import MediaManagerComponent from "@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent";

interface MediaPanelComponentProps {
    mediaManagerId?: string;
    initType?: string;
    mediaPath?: string;
    selectedMediaData?: Array<SelectedMediaItemInterface>;
    onSelectedDataChange?: (items: any) => void;
    onClose?: () => void;
    title?: string;
    size?: string;
    fromDirection?: string;
}

const MediaPanelComponent = ({
    mediaManagerId,
    initType,
    mediaPath = '/media',
    selectedMediaData = [],
    onSelectedDataChange,
    onClose,
    title,
    size,
    fromDirection,
}: MediaPanelComponentProps) => {
    return (
        <SidePanelComponent
            title={title ?? 'Media Manager'}
            size={size}
            onClose={onClose}
            fromDirection={fromDirection}>
            <MediaManagerComponent
                mediaManagerId={mediaManagerId}
                initType={initType}
                mediaPath={mediaPath}
                selectedMediaData={selectedMediaData}
                onClose={onClose}
                onSelectedDataChange={onSelectedDataChange}
            />
        </SidePanelComponent>
    );
};

export default MediaPanelComponent;
