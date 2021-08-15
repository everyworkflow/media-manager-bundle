import React from 'react';
import Image from 'antd/lib/image';
import MediaItemInterface from '../../Model/MediaItemInterface';
import SelectedMediaItemInterface from '../../Model/SelectedMediaItemInterface';
import MediaIconHelper from '../../Helper/MediaIconHelper';
import UrlHelper from "@EveryWorkflow/CoreBundle/Helper/UrlHelper";

interface MediaGridItemContentProps {
    itemData: MediaItemInterface | SelectedMediaItemInterface;
    imageSize?: number;
}

const MediaGridItemContent = ({
    itemData,
    imageSize = 122,
}: MediaGridItemContentProps) => {
    if (itemData.thumbnail_path) {
        return (
            <Image
                height={imageSize}
                width={imageSize}
                src={UrlHelper.buildImgUrlFromPath(itemData.thumbnail_path)}
                style={{ display: 'inline-block' }}
                alt={itemData.base_name}
                preview={false}
            />
        );
    } else if (itemData.extension === 'svg') {
        return (
            <Image
                height={imageSize}
                width={imageSize}
                src={UrlHelper.buildImgUrlFromPath(itemData.path_name)}
                style={{ display: 'inline-block' }}
                alt={itemData.base_name}
                preview={false}
            />
        );
    }

    return (
        <>
            {MediaIconHelper.getIconSvgForType(itemData.extension, imageSize)}
            <div
                style={{
                    fontSize: 11,
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    textAlign: 'center',
                    padding: '0 4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {itemData.base_name}
            </div>
        </>
    );
};

export default MediaGridItemContent;
