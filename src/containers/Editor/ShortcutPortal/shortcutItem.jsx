import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1px 3px;
    border-radius: 4px;
    background: ${props => props.isSelected ? '#7C89FF' : 'transparent'};
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