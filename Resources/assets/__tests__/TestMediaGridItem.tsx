/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import MediaGridItem from "@EveryWorkflow/MediaManagerBundle/Component/MediaGridItem";

afterEach(cleanup);

test('Media manager --> grid item must show base_name on hover', () => {
    const result = render(
        <MediaGridItem itemData={{
            file_name: 'file_name',
            base_name: 'base_name',
            extension: 'tsx',
            size: 55,
            path: 'path',
            path_name: 'path_name',
            real_path: 'real_path',
            type: 'tsx',
            is_readable: false,
            is_writable: false,
            created_at: 'created_at',
            updated_at: 'updated_at',
            thumbnail_path: 'thumbnail_path',
        }} />
    );

    expect(result.queryByLabelText(/base_name/i)).toBeNull();

    fireEvent.mouseOver(result.getByAltText(/base_name/i));

    expect(result.queryByLabelText(/base_name/i)).toBeDefined();
});
