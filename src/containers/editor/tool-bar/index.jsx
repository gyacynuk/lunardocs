import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToolBarComponent = styled.div`
    width: 100%;
    height: ${({ theme }) => theme.constants.editor.toolBarHeight};

    display: flex;
    align-items: center;
`

const ToolBar = ({ attributes, children}) => {
    return (
        <ToolBarComponent {...attributes}>
            {children}
        </ToolBarComponent>
    );
};

ToolBar.propTypes = {};

export default ToolBar;