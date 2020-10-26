import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import anime from 'animejs';
import styled from 'styled-components';

import { ReactComponent as MoonSVG } from '../../assets/images/moon.svg';
import previewImg from '../../assets/images/preview.png';

import Spacer from '../../components/spacer';
import LandingNavBar from './landing-nav-bar';
import SlidingButton from '../../components/sliding-button';
import { isMobileJs} from '../../theme/breakpoint';
import { setTheme } from '../../store/actions';
import { fire } from '../../api';

const randXPos = () => Math.floor(Math.random() * 98) + 1
const randYPos = () => Math.floor(Math.random() * 90) + 1
const randSize = () => Math.floor(Math.random() * 3) + 1
const STARS = [...Array(60)]
    .map(e => [randYPos(), randXPos(), randSize()]) 
    .map(randData => ({top: randData[0], left: randData[1], size: randData[2]}));

/**
 * Stars
 */
const StarWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    z-index: 2;

    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, #1e293b 100%);
`
const Star = styled.div`
    position: absolute;
    top: ${props => props.top}%;
    left: ${props => props.left}%;

    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-color: white;
    border-radius: 50%;
`

/**
 * Moon
 */
const MoonWrapper = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    height: 80%;

    z-index: 151;
    overflow: visible;
    transform-origin: bottom center;

    ${({ theme }) => theme.isMobile`
        marigin-left: -24px;
    `}

    pointer-events: none;
    will-change: transform;
    will-change: left, top;
`
const MoonImage = styled(MoonSVG)`
    border-radius: 50%;
    box-shadow: 0 0 12px #EBEFF7AA;

    ${({ theme }) => theme.isMobile`
        margin-left: -40px;
    `}

    will-change: width, height;
`

const MainColumn = styled.div`
    position absolute;
    top: 0;
    left: 0;
    width: 100%; 

    background-color: #1e293b;
    z-index: 1;

    padding: 64px;
    ${({ theme }) => theme.isMobile`
        padding: 24px;
    `}

    display: block;
`

const HeroContainer = styled.div`
    position: absolute;
    z-index: 1;
    top: calc(20% + 96px);
    left: 50%;
    transform: translate(-50%, 0);

    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 48px;
`

const HeroText = styled.div`
    color: white;
    text-align: center;

    font-size: 3rem;
    font-weight: ${props => props.thin ? 100 : 700};
`

const LearnMoreContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
`
const TextHolder = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;

    ${({ theme }) => theme.isDesktop`
        flex: 1;
    `}
`
const Heading = styled.h1`
    color: white;
    font-size: 2rem;
`
const Temp = styled.p`
    color: white;
`
const ImageHolder = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;

    ${({ theme }) => theme.isDesktop`
        flex: 1;
    `}
`
const ExpandingImage = styled.img`
    width: 100%;
    height: auto;

    ${({ theme }) => theme.isDesktop`
        margin-left: 32px;
    `}
`

const LandingPage = () => {
    const dispatch = useDispatch();
    const [scrollAtTop, setScrollAtTop] = useState(true)
    const [state, setState] = useState([]);

    useEffect(() => {
        state.forEach(animation => animation.pause())

        if (!scrollAtTop) {
            const animations = [
                // Moon move to navbar
                anime({
                    targets: '.moonWrapper',
                    rotate: 360,
                    translateX: '0%',
                    translateY: '0%',
                    marginTop: '16px',
                    marginLeft: '64px',
                    top: '0%',
                    left: '0%',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Moon shrink
                anime({
                    targets: '.moon',
                    width: '32px',
                    height: '32px',
                    marginLeft: isMobileJs.matches ? '-40px' : '0px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Header text shift
                anime({
                    targets: '.headerHeading',
                    marginLeft: '48px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
            ]

            setState(animations)
        } else {
            const animations = [
                // Moon move to center
                anime({
                    targets: '.moonWrapper',
                    translateX: '-50%',
                    translateY: '0%',
                    marginTop: '0px',
                    marginLeft: '0px',
                    top: '20%',
                    left: '50%',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Moon grow
                anime({
                    targets: '.moon',
                    width: '96px',
                    height: '96px',
                    marginLeft: '0px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
                // Header text shift
                anime({
                    targets: '.headerHeading',
                    marginLeft: '0px',
                    duration: 1000,
                    easing: 'easeOutExpo',
                }),
            ]

            setState(animations)
        }
        
    }, [scrollAtTop]);

    useEffect(() => {
        dispatch(setTheme('landing'))

        fire.analytics().logEvent('landing_page_view');

        let moonAppearAnimation = anime({
            targets: '.moonWrapper',
            translateX: ['-50%', '-50%'],
            rotate: [250, 360],
            duration: 3000,
            easing: 'easeOutExpo',
        })
        let moonGrowAnimation = anime({
            targets: '.moon',
            width: [32, 96],
            height: [32, 96],
            duration: 3000,
            easing: 'easeOutExpo',
        })
        let heroTextFadeInAnimation = anime.timeline({
            duration: 2000,
            easing: 'easeOutExpo',
        }).add({
            targets: '.heroText',
            opacity: [0, 1],
        }).add({
            targets: '.learnMoreButton',
            opacity: [0, 1],
        })

        const handleScroll = event => {
            moonAppearAnimation.pause()
            moonGrowAnimation.pause();
            if (event.target.scrollTop === 0) {
                setScrollAtTop(true);
            } else {
                setScrollAtTop(false);
            }
        }
        document.getElementById('appContainer').addEventListener('scroll', handleScroll);
        return () => document.getElementById('appContainer').removeEventListener('scroll', handleScroll);
    }, [])
    
    return (
        <>
            <LandingNavBar/>

            <StarWrapper>
                {STARS.map((props, index) => <Star key={index} {...props}/>)}
            </StarWrapper>

            <MoonWrapper className='moonWrapper'>
                <MoonImage className='moon'/>
            </MoonWrapper>

            <HeroContainer className='heroContainer'>
                <HeroText className='heroText' thin={true}>
                    Note Taking
                </HeroText>
                <HeroText className='heroText'>
                    Reimagined
                </HeroText>

                <SlidingButton
                className={'learnMoreButton'}
                width={'200px'}
                padding={'12px 0'}
                margin={'32px 0'}
                color={'white'}
                hoverColor={'black'}
                onClick={() => document.getElementById('anchor').scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                    Learn More
                </SlidingButton>
            </HeroContainer>

            <MainColumn>
                <Spacer height={'calc(100vh - 80px)'}/>
                <Spacer id="anchor" height={'80px'}/>
                <LearnMoreContainer>
                    <TextHolder>
                        <Heading id="anchor2">What is LunarDocs?</Heading>
                        <Temp>
                            LunarDocs is a web-based text editor developed by Griffin Yacynuk. The project aims to provide users with an integrated note-taking and study environment: specifically users can annotate their notes with flash-card style questions, which they will later quiz themselves with.
                        </Temp>
                        <Temp>   
                            As this is currently a work in progress, some features may not yet be implemented. However, please feel free to check out the project nonetheless!
                        </Temp>
                    </TextHolder>

                    <ImageHolder>
                        <ExpandingImage src={previewImg}/>
                    </ImageHolder>
                </LearnMoreContainer>
                
                
            </MainColumn>
            
        </>
    );
};

LandingPage.propTypes = {};

export default LandingPage;