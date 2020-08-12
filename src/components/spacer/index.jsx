import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: ${props => props.height};
`

const Spacer = (props) => {
    return (
        <Container height={props.height}/>
    );
};

Spacer.propTypes = {
    height: PropTypes.string
};

export default Spacer;