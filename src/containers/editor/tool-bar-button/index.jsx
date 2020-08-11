import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonComponent = styled.div`
    margin-right: 16px;
    color: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
    cursor: pointer;
`

const ToolBarButton = props => {
    return (
        <ButtonComponent {...props}>
            {props.children}
        </ButtonComponent>
    );
};

ToolBarButton.propTypes = {};

export default ToolBarButton;