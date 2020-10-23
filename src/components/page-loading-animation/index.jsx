import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const LoadingAnimation = keyframes`
    0% {
        height: 0%;
    }

    30% {
        height: 100%;
    }

    60% {
        height: 0%;
    }
`

const LoadingBar = styled.div`
    width: ${props => props.barWidth};
    margin: 0 ${props => props.barSpacing};
    border-radius: ${props => props.barWidth};

    background-color: ${({ theme }) => (!!theme && !!theme.palette) ? theme.palette.text.heavy : '#bcbcbc'};

    animation: ${LoadingAnimation} 1200ms ${({ animate }) => animate ? `infinite` : `0`};
`

const Container = styled.div`
    ${({ centerOnScreen }) => centerOnScreen && `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `}

    display: flex;
    align-items: center;
    height: ${props => props.height};

    ${LoadingBar} {
        &:nth-child(1) {
            animation-delay: 000ms;
        }
        &:nth-child(2) {
            animation-delay: 80ms;
        }
        &:nth-child(3) {
            animation-delay: 160ms;
        }
    }
`

const PageLoadingAnimation = props => {
    return (
        <Container {...props}>
            <LoadingBar {...props}/>
            <LoadingBar {...props}/>
            <LoadingBar {...props}/>
        </Container>
    );
};

PageLoadingAnimation.defaultProps = {
    animate: true,
    centerOnScreen: false,
    barSpacing: '4px',
    barWidth: '6px',
    height: '40px',
}

PageLoadingAnimation.propTypes = {
    animate: PropTypes.bool,
    centerOnScreen: PropTypes.bool,
    barSpacing: PropTypes.string,
    barWidth: PropTypes.string,
    height: PropTypes.string,
};

export default PageLoadingAnimation;