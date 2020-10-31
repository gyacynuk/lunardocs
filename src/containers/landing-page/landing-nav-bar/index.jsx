import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import SlidingButton from '../../../components/sliding-button';
import { fire } from '../../../api';


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;

    width: 100%;
    height: 64px;

    padding: 0 64px;
    ${({ theme }) => theme.isMobile`
        padding: 0 24px;
    `}
    
    background-color: black;
    color: white;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Group = styled.div`
    display: flex;
    align-items: center;
`

const Heading = styled.h1`
    font-family: ${({ theme }) => theme.typography.editor.h2.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.h2.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.h2.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.h2.lineHeight};
`

const DesktopOnlySlidingButton = styled(SlidingButton)`
    ${({ theme }) => theme.isMobile`
        display:none
    `}
`

const Button = styled.div`
    width: 100px;
    padding: 8px 0;
    margin-left: 16px;

    color: ${props => props.filled ? `black` : 'white'};
    text-align: center;
    cursor: pointer;
    text-docoration: none;

    border: 2px solid white;
    border-radius: 8px;
    background-color: ${props => props.filled ? 'white' : `transparent`};

    font-weight: 400;
`


const LandingNavBar = (props) => {
    return (
        <Container>
            <Heading className='headerHeading'>Lunar Docs</Heading>
            
            <Group>
                <Link to='/login'>
                    <DesktopOnlySlidingButton
                    width={'100px'}
                    padding={'8px 0'}
                    color={'white'}
                    hoverColor={'black'}
                    fontWeight={'400'}
                    onClick={() => fire.analytics().logEvent('landing_page_login_click')}>
                        Login
                    </DesktopOnlySlidingButton>
                </Link>
                
                <Link to='/login'>
                    <Button
                    filled
                    onClick={() => fire.analytics().logEvent('landing_page_signup_click')}>
                        Sign Up
                    </Button>
                </Link>
            </Group>
        </Container>
    );
};

LandingNavBar.propTypes = {};

export default withTheme(LandingNavBar);