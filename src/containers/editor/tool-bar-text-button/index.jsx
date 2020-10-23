import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonComponent = styled.div`
    width:  ${({theme}) => theme.constants.editor.icons.textButtonWidth};
    margin-right: ${({theme}) => theme.constants.editor.icons.margins};

    text-align: center;
    cursor: pointer;

    color: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
    stroke: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
    fill: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
`

const ToolBarTextButton = props => {
    return (
        <ButtonComponent {...props} onMouseDown={event => { event.preventDefault(); props.onMouseDown(event); }}>
            {props.children}
        </ButtonComponent>
    );
};

ToolBarTextButton.propTypes = {};

export default ToolBarTextButton;