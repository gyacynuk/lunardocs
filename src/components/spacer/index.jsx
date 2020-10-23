import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`

const Spacer = ({height, width, ...props}) => {
    return (
        <Container height={height} width={width} {...props}/>
    );
};

Spacer.defaultProps = {
    height: '100%',
    width: '100%',
}
Spacer.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
};

export default Spacer;