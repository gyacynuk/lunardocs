import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AnimatedButton = styled.div`
    width: ${props => props.width};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    z-index: ${props => props.zIndex};

    color: ${props => props.color};
    text-align: center;
    cursor: pointer;
    
    border: 2px solid ${props => props.color};
    border-radius: 8px;

    font-weight: ${props => props.fontWeight};
    font-size: ${props => props.fontWeight};

    background-image: linear-gradient(to right, ${props => props.color} 50%, transparent 50%);
    background-position: 100% 0%;
    background-size: 200% 100%;
    transition: background-position 500ms;

    &:hover {
        color: ${props => props.hoverColor};
        background-position: 0% 50%;
    }
`

const SlidingButton = props => {
    return (
        <AnimatedButton {...props}>
            {props.children}
        </AnimatedButton>
    );
};

SlidingButton.propTypes = {
    width: PropTypes.string,
    padding: PropTypes.string,
    margin: PropTypes.string,
    zIndex: PropTypes.string,

    color: PropTypes.string,
    hoverColor: PropTypes.string,
    fontWeight: PropTypes.string,
    fontSize: PropTypes.string,
};

SlidingButton.defaultProps = {
    width: '100px',
    padding: '12px 0',
    margin: '0',
    zIndex: '1',

    color: 'white',
    hoverColor: 'black',
    fontWeight: '500',
    fontSize: '1rem',
};

export default SlidingButton;