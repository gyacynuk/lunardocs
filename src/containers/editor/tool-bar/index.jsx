import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ReactComponent as BackArrowSVG } from '../../../assets/icons/back-arrow.svg'
import { saveAndCloseDocument } from '../../../store/actions';
import ThemeToggleButton from '../../../components/theme-toggle-button';
import ReactTooltip from 'react-tooltip';
import Spacer from '../../../components/spacer';
import SavingIndicator from './saving-indicator';


const BackIconWrapper = styled.div`
    margin-right: ${({ theme }) => theme.constants.navBar.padding.x};
`
const BackIcon = styled(BackArrowSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    ${({ theme }) => theme.constants.icons.strokeStyleWith(theme)}
`

const ThemeOuterWrapper = styled.div`
    flex-grow: 1;
`
const ThemeInnerWrapper = styled.div`
    float: right;
`

const ToolBarComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: ${({ theme }) => theme.constants.navBar.height};
    padding: ${({ theme }) => theme.constants.navBar.padding.y} ${({ theme }) => theme.constants.navBar.padding.x};

    display: flex;
    align-items: center;
`

const ToolBar = ({ attributes, children}) => {
    const dispatch = useDispatch();

    return (
        <ToolBarComponent {...attributes}>
            <BackIconWrapper>
                <Link to="/documents">
                    <BackIcon data-tip data-for="back" onClick={() => dispatch(saveAndCloseDocument())}/>
                    <ReactTooltip id="back" place="bottom" effect="solid" offset={{  right: 6 }}> {/* offset is to fix a bug with tooltips inside of flexbox */}
                        Save and Exit
                    </ReactTooltip>
                </Link>
            </BackIconWrapper>
            
            {children}

            <ThemeOuterWrapper>
                <ThemeInnerWrapper>
                    <SavingIndicator/>
                    <ThemeToggleButton/>
                </ThemeInnerWrapper>
            </ThemeOuterWrapper>
        </ToolBarComponent>
    );
};

ToolBar.propTypes = {};

export default ToolBar;