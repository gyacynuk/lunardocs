import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropDownComponent = styled.div`
    min-width: 100px;
    margin-right: 8px;
    color: ${props => props.active
        ? props.theme.palette.text.heavy
        : props.theme.palette.text.light};
    cursor: pointer;
`

const ToolBarDropDown = props => {
    return (
        <DropDownComponent {...props} onMouseDown={event => { event.preventDefault(); props.onMouseDown(); }}>
            {props.children}
        </DropDownComponent>
    );
};

ToolBarDropDown.propTypes = {};

export default ToolBarDropDown;