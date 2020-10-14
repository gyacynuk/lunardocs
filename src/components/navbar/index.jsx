import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signOutUser, fetchUserAsync } from '../../store/actions'


import { ReactComponent as UserSVG } from '../../assets/icons/logout.svg'
import { ReactComponent as LightBulbSVG } from '../../assets/icons/lightbulb.svg'
import { ReactComponent as DocumentsSVG } from '../../assets/icons/documents.svg'
import ThemeToggleButton from '../theme-toggle-button';


const UserIcon = styled(UserSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
`

const LightBulbIcon = styled(LightBulbSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.fillStyleWith(theme)}
`

const DocumentsIcon = styled(DocumentsSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
`

export const NavBarRow = styled.div`
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

const NavBar = ({ history }) => {
    const dispatch = useDispatch();
    return (
        <NavBarRow>
            <div>
                {/* <DocumentsIcon/>
                <LightBulbIcon/> */}
            </div>
            <div>
                <ThemeToggleButton/>

                <UserIcon data-tip data-for="logout" onClick={() => dispatch(signOutUser(history))}/>
                <ReactTooltip id="logout" place="bottom" effect="solid">
                    Logout
                </ReactTooltip>
            </div>
        </NavBarRow>
    );
};

NavBar.propTypes = {};

export default withRouter(NavBar);