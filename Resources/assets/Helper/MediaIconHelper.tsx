/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const MediaIconHelper = {
    getIconSvgForType: (type: string, size = 32): JSX.Element => {
        switch (type) {
            case 'jpg':
            case 'jpeg':
            case 'png': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                fill="currentColor"
                                className="bi bi-file-earmark-image"
                                viewBox="0 0 16 16">
                                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'mp3':
            case 'wave': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                className="bi bi-file-earmark-music"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.572 2.572 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377.5 0 .974-.134 1.338-.377.36-.24.662-.628.662-1.123V8.89l2-.5V6.64z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'mp4':
            case 'mov':
            case 'avi':
            case 'webm':
            case 'ogg': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                className="bi bi-file-earmark-play"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'pdf': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                className="bi bi-file-earmark-code"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'txt': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                fill="currentColor"
                                className="bi bi-file-earmark-text"
                                viewBox="0 0 16 16">
                                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'zip': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                className="bi bi-file-earmark-zip"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z" />
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'doc':
            case 'docx': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                className="bi bi-file-earmark-richtext"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708l1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'pptx':
            case 'pptm':
            case 'ppt': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                fill="currentColor"
                                className="bi bi-file-earmark-easel"
                                viewBox="0 0 16 16">
                                <path d="M8.5 6a.5.5 0 1 0-1 0h-2A1.5 1.5 0 0 0 4 7.5v2A1.5 1.5 0 0 0 5.5 11h.473l-.447 1.342a.5.5 0 1 0 .948.316L7.027 11H7.5v1a.5.5 0 0 0 1 0v-1h.473l.553 1.658a.5.5 0 1 0 .948-.316L10.027 11h.473A1.5 1.5 0 0 0 12 9.5v-2A1.5 1.5 0 0 0 10.5 6h-2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-2z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'xlsx':
            case 'xlsm':
            case 'xlsb':
            case 'xltx':
            case 'xltm':
            case 'xls':
            case 'xlt':
            case 'xlt2': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                className="bi bi-file-earmark-spreadsheet"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                            </svg>
                        )}
                    />
                );
            }
            case 'php':
            case 'html':
            case 'css': {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                className="bi bi-file-earmark-code"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z" />
                            </svg>
                        )}
                    />
                );
            }
            default: {
                return (
                    <Icon
                        style={{ padding: '18px' }}
                        component={() => (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={size - 36}
                                height={size - 36}
                                fill="currentColor"
                                className="bi bi-file-earmark"
                                viewBox="0 0 16 16">
                                <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"></path>
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"></path>
                            </svg>
                        )}
                    />
                );
            }
        }
    },
};

export default MediaIconHelper;
