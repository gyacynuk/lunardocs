import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setUserPreferredTheme } from '../../store/actions'

import { ReactComponent as MoonSVG } from '../../assets/icons/moon.svg'
import { getTheme } from '../../store/selectors';

const MoonIcon = styled(MoonSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
    stroke-width: 2;
`

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';
const oppositeTheme = (theme) => {
    if (theme === LIGHT_THEME) {
        return DARK_THEME;
    }
    return LIGHT_THEME;
}

const ThemeToggleButton = () => {
    const theme = useSelector(getTheme);
    const dispatch = useDispatch();
    
    return (<>
        <MoonIcon data-tip data-for="theme" onClick={() => dispatch(setUserPreferredTheme(oppositeTheme(theme)))}/>
        <ReactTooltip id="theme" place="bottom" effect="solid">
            Toggle Theme
        </ReactTooltip>
    </>);
};

ThemeToggleButton.propTypes = {};

export default ThemeToggleButton;