import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { toggleDisplayMode } from '../../store/actions'

import { ReactComponent as MoonSVG } from '../../assets/icons/moon.svg'

const MoonIcon = styled(MoonSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
    stroke-width: 2;
`

const ThemeToggleButton = () => {
    const dispatch = useDispatch();
    
    return (
        <MoonIcon onClick={() => dispatch(toggleDisplayMode())}/>
    );
};

ThemeToggleButton.propTypes = {};

export default ThemeToggleButton;