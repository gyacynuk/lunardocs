import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as MoonSVG } from '../../assets/images/moon.svg'

const randXPos = () => Math.floor(Math.random() * 100) + 1
const randYPos = () => Math.floor(Math.random() * 90) + 1
const randSize = () => Math.floor(Math.random() * 3) + 1
const STARS = [...Array(60)]
    .map(e => [randYPos(), randXPos(), randSize()]) 
    .map(randData => ({top: randData[0], left: randData[1], size: randData[2]}));


const FadeInAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

/**
 * Stars
 */
const StarWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(37,42,49,1) 100%);
`
const Star = styled.div`
    position: absolute;
    top: ${props => props.top}%;
    left: ${props => props.left}%;

    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-color: white;
`

/**
 * Moon
 */
const MoonGrowAnimation = keyframes`
    0% {
        transform: scale(0.25);
    }
    100% {
        transform: scale(1);
    }
`
const MoonMoveAnimation = keyframes`
    0% {
        transform: rotate(250deg) translate(-50%, 0);
    }
    100% {
        transform: rotate(360deg) translate(-50%, 0);
    }
`
const MoonWrapper = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);

    height: 70%;
    transform-origin: bottom center;
    animation: ${MoonMoveAnimation} 3000ms;
    animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
`
const MoonImage = styled(MoonSVG)`
    width: 96px;
    height: 96px;

    border-radius: 50%;
    box-shadow: 0 0 12px #EBEFF7AA;   
    
    animation: ${MoonGrowAnimation} 3000ms;
    animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
`

const MainColumn = styled.div`
    position absolute;
    top: 0;
    left: 0;

    padding: 80px 80px;
    ${({ theme }) => theme.isMobile`
        padding: 5%;
    `}

    display: block;
    width: 100%;
`

const HeroContainer = styled.div`
    position: absolute;
    top: calc(30% + 96px);
    left: 50%;
    transform: translate(-50%, 0);

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 48px;
`

const HeroTextAppearAnimation = keyframes`
`
const HeroText = styled.div`
    color: white;
    text-align: center;

    font-size: 3rem;
    font-weight: ${props => props.thin ? 100 : 700};

    opacity: 0;
    animation: ${FadeInAnimation} 1000ms forwards;
`

const AnimatedButton = styled.div`
    width: 200px;
    padding: 12px 0;
    margin-top: 32px;

    color: white;
    text-align: center;
    cursor: pointer;
    
    border: 2px solid white;
    border-radius: 8px;

    font-weight: 500;

    background-image: linear-gradient(to right, white 50%, transparent 50%);
    background-position: 100% 0%;
    background-size: 200% 100%;
    transition: 500ms;

    opacity: 0;
    animation: ${FadeInAnimation} 1000ms forwards;
    animation-delay: 2000ms;
    &:hover {
        color: black;
        background-position: 0% 50%;
    }
`

const LandingPage = () => {
    return (
        <>
            <StarWrapper>
                {STARS.map((props, index) => <Star key={index} {...props}/>)}
                <MoonWrapper>
                    <MoonImage/>
                </MoonWrapper>
            </StarWrapper>

            <HeroContainer>
                <HeroText thin={true}>
                    Note Taking
                </HeroText>
                <HeroText>
                    Reimagined
                </HeroText>

                <AnimatedButton>
                    Learn More
                </AnimatedButton>
            </HeroContainer>

            <MainColumn>
                
            </MainColumn>
            
        </>
    );
};

LandingPage.propTypes = {};

export default LandingPage;