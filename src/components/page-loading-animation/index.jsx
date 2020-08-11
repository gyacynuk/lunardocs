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
    width: 6px;
    margin: 0 4px;
    border-radius: 6px;

    background-color: ${({ theme }) => (!!theme && !!theme.palette) ? theme.palette.text.heavy : '#222'};
    animation: ${LoadingAnimation} 1200ms infinite;
`

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    height: 40px;

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

const PageLoadingAnimation = () => {
    return (
        <Container>
            <LoadingBar/>
            <LoadingBar/>
            <LoadingBar/>
        </Container>
    );
};

PageLoadingAnimation.propTypes = {};

export default PageLoadingAnimation;