/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useState, useEffect } from 'react';
import Menu from 'antd/lib/menu';
import Tree from 'antd/lib/tree';
import Input from 'antd/lib/input';
import Space from 'antd/lib/space';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import MediaManagerContext from '@EveryWorkflow/MediaManagerBundle/Context/MediaManagerContext';
import {
    ACTION_SET_REMOTE_MEDIA_PATH,
    ACTION_SHOW_UPLOAD_FILES,
} from '@EveryWorkflow/MediaManagerBundle/Reducer/MediaManagerReducer';
import {
    MEDIA_MANAGER_TYPE_MULTI_SELECT,
    MEDIA_MANAGER_TYPE_NONE,
    MEDIA_MANAGER_TYPE_SINGLE_SELECT,
} from '@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent/MediaManagerComponent';
import DownOutlined from '@ant-design/icons/DownOutlined';

interface SidebarProps {
    onSelectedButtonClick?: () => void;
}

const Sidebar = ({ onSelectedButtonClick }: SidebarProps) => {
    const { state: mediaState, dispatch: mediaDispatch } = useContext(MediaManagerContext);
    const [treeMediaDirData, setTreeMediaDirData] = useState<Array<any>>([
        {
            title: 'media',
            key: '/media',
            isLeaf: false,
        }
    ]);
    const [bulkActionVisible, setBulkActionVisible] = useState(false);

    useEffect(() => {
        const mediaDirData = mediaState.media_manager_dir_data.filter(
            (item) => item.path === '/media'
        );
        const mediaDirDataMapped: Array<any> = [];
        mediaDirData.forEach((item) => {
            const mappedData: any = {
                title: item.dir_name,
                key: item.path_name,
            };
            if (
                mediaState.media_manager_dir_data.filter(
                    (dir) => dir.path === item.path_name
                ).length === 0
            ) {
                mappedData['isLeaf'] = true;
            }
            mediaDirDataMapped.push(mappedData);
        });
        setTreeMediaDirData([{
            title: 'media',
            key: '/media',
            isLeaf: false,
            children: mediaDirDataMapped
        }]);
    }, [mediaState.media_manager_dir_data]);

    const updateTreeData = (
        list: any[],
        key: React.Key,
        children: any[]
    ): any[] => {
        return list.map((node) => {
            if (node.key === key) {
                return {
                    ...node,
                    children,
                };
            } else if (node.children) {
                return {
                    ...node,
                    children: updateTreeData(node.children, key, children),
                };
            }
            return node;
        });
    };

    const onLoadData = ({ key, children }: any) => {
        return new Promise<void>((resolve) => {
            if (children) {
                resolve();
                return;
            }
            const mediaDirData = mediaState.media_manager_dir_data.filter(
                (dir) => dir.path === key
            );
            const mediaDirDataMapped: Array<any> = [];
            mediaDirData.forEach((item: any) => {
                const mappedData: any = {
                    title: item.dir_name,
                    key: item.path_name,
                };
                if (
                    mediaState.media_manager_dir_data.filter(
                        (dir) => dir.path === item.path_name
                    ).length === 0
                ) {
                    mappedData['isLeaf'] = true;
                }
                mediaDirDataMapped.push(mappedData);
            });
            setTreeMediaDirData((origin: any[]) =>
                updateTreeData(origin, key, mediaDirDataMapped)
            );
            resolve();
        });
    };

    const renderSelectedCount = () => {
        return (
            <small>
                Selected {mediaState.selected_media_data.length}{' '}
                {mediaState.selected_media_data.length > 1 ? 'items' : 'item'}
            </small>
        );
    };

    const onDirSelect = (selectedKeys: React.Key[], info: any) => {
        if (selectedKeys.length) {
            mediaDispatch({
                type: ACTION_SET_REMOTE_MEDIA_PATH,
                payload: selectedKeys[0],
            });
        }
    };

    return (
        <div>
            {(mediaState.init_type === MEDIA_MANAGER_TYPE_SINGLE_SELECT ||
                mediaState.init_type === MEDIA_MANAGER_TYPE_MULTI_SELECT) && (
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <Button
                            type="primary"
                            block={true}
                            disabled={mediaState.selected_media_data.length === 0}
                            onClick={() => {
                                if (onSelectedButtonClick) {
                                    onSelectedButtonClick();
                                }
                            }}>
                            {renderSelectedCount()}
                        </Button>
                    </div>
                )}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Button
                    type="primary"
                    block={true}
                    onClick={() => {
                        mediaDispatch({ type: ACTION_SHOW_UPLOAD_FILES });
                    }}>
                    Upload files
                </Button>
            </div>
            <div style={{ marginBottom: 8 }}>
                <Input
                    addonBefore="path"
                    value={mediaState.remote_media_path}
                    readOnly={true}
                />
            </div>
            <Space style={{ marginBottom: 16 }}>
                {renderSelectedCount()}
                <Dropdown
                    overlay={
                        <Menu
                            onClick={(e) => {
                                if (e.key === '3') {
                                    setBulkActionVisible(false);
                                }
                            }}>
                            <Menu.Item key="1">Move selected</Menu.Item>
                            <Menu.Item key="2">Delete selected</Menu.Item>
                        </Menu>
                    }
                    onVisibleChange={(flag: boolean) => {
                        setBulkActionVisible(flag);
                    }}
                    visible={bulkActionVisible}
                    disabled={!mediaState.selected_media_data.length}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        Bulk action <DownOutlined />
                    </a>
                </Dropdown>
            </Space>
            <div
                style={{
                    padding: 8,
                    borderRadius: 4,
                    border:
                        mediaState.init_type === MEDIA_MANAGER_TYPE_NONE
                            ? 'none'
                            : 'solid 1px #dedede',
                }}>
                <Tree
                    showLine={{
                        showLeafIcon: false,
                    }}
                    showIcon={false}
                    onSelect={onDirSelect}
                    defaultExpandAll={true}
                    loadData={onLoadData}
                    treeData={treeMediaDirData}
                />
            </div>
        </div>
    );
};

export default Sidebar;
