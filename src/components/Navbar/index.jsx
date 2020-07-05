import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { toggleDisplayMode } from '../../store/actions'

import { ReactComponent as UserSVG } from '../../assets/icons/user.svg'
import { ReactComponent as MoonSVG } from '../../assets/icons/moon.svg'
import { ReactComponent as LightBulbSVG } from '../../assets/icons/lightbulb.svg'
import { ReactComponent as DocumentsSVG } from '../../assets/icons/documents.svg'


const UserIcon = styled(UserSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
`

const MoonIcon = styled(MoonSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
    stroke-width: 2;
`

const LightBulbIcon = styled(LightBulbSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.fillStyleWith(theme)}
`

const DocumentsIcon = styled(DocumentsSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
`

const NavBarRow = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: ${({ theme }) => theme.constants.navBar.height};

    padding: ${({ theme }) => theme.constants.navBar.padding.y + ' ' + theme.constants.navBar.padding.x};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const NavBar = () => {
    const dispatch = useDispatch();

    return (
        <NavBarRow>
            <div>
                <DocumentsIcon/>
                <LightBulbIcon/>
            </div>
            <div>
                <MoonIcon onClick={() => dispatch(toggleDisplayMode())}/>
                <UserIcon/>
            </div>
        </NavBarRow>
    );
};

NavBar.propTypes = {};

export default NavBar;