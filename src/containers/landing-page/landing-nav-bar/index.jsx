import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import SlidingButton from '../../../components/sliding-button';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;

    width: 100%;
    height: 64px;
    padding: 0 64px;
    
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
    font-weight: 700;
`

const Button = styled.div`
    width: 120px;
    padding: 8px 0;
    margin-left: 16px;

    color: ${props => props.filled ? `black` : 'white'};
    text-align: center;
    cursor: pointer;
    text-docoration: none;

    border: 2px solid white;
    border-radius: 8px;
    background-color: ${props => props.filled ? 'white' : `transparent`};

    font-weight: 500;
`


const LandingNavBar = (props) => {
    return (
        <Container>
            <Heading className='headerHeading'>Lunar Docs</Heading>
            
            <Group>
                <Link to='/login'>
                    <SlidingButton
                    width={'120px'}
                    padding={'8px 0'}
                    color={'white'}
                    hoverColor={'black'}>
                        Login
                    </SlidingButton>
                </Link>
                
                <Link to='/login'>
                    <Button filled>Sign Up</Button>
                </Link>
            </Group>
        </Container>
    );
};

LandingNavBar.propTypes = {};

export default withTheme(LandingNavBar);