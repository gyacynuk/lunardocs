import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ThemeToggleButton from '../../../components/theme-toggle-button'
import { NavBarRow } from '../../../components/navbar'

import { ReactComponent as BackArrowSVG } from '../../../assets/icons/back-arrow.svg'
import { ReactComponent as MenuSVG } from '../../../assets/icons/menu-dots.svg'


const SubRow = styled.div`
    display: flex;
    align-items: center;
`

const BackIcon = styled(BackArrowSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
`
const MenuIcon = styled(MenuSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.fillStyleWith(theme)}
`

const DocumentLabel = styled.span`
    color: ${({ theme }) => theme.palette.text.heavy};
    padding-bottom: 3px;

    font-family: ${({ theme }) => theme.typography.editor.navBar.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.navBar.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.navBar.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.navBar.lineHeight};
`

const EditorNavBar = () => {
    return (
        <NavBarRow>
            <SubRow>
                <Link to="/documents">
                    <BackIcon/>
                </Link>
                <DocumentLabel>Document Title Goes Here</DocumentLabel>
            </SubRow>

            <div>
                <ThemeToggleButton/>
                <MenuIcon/>
            </div>
        </NavBarRow>
    );
};

EditorNavBar.propTypes = {};

export default EditorNavBar;