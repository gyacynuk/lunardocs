import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Line = styled.div`
    height: 1px;
    width: 100%;
    margin: 8px 0;

    background-color: ${({ theme }) => theme.palette.text.light};
`

const Divider = () => {
    return (
        <Line/>
    );
};

Divider.propTypes = {};

export default Divider;