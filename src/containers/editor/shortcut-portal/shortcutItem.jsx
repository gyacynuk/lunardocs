import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1px 3px;
    border-radius: 4px;
    color: ${({ theme }) => theme.palette.text.heavy};
    background-color: ${props => props.isSelected ? props.theme.palette.accent.light : 'transparent'};
`

const ShortcutItem = props => {
    return (
        <Container {...props}>
            {props.children}
        </Container>
    );
};

ShortcutItem.propTypes = {};

export default ShortcutItem;