import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 8px 0px;

    border-radius: 8px;

    cursor: pointer;
`

const RowItem = (props) => {
    return (
        <RowContainer {...props}>
            {props.children}
        </RowContainer>
    );
};

RowItem.propTypes = {};

export default RowItem;