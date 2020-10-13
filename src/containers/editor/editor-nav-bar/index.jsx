import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ThemeToggleButton from '../../../components/theme-toggle-button'
import { NavBarRow } from '../../../components/navbar'

import { ReactComponent as BackArrowSVG } from '../../../assets/icons/back-arrow.svg'
import { ReactComponent as MenuSVG } from '../../../assets/icons/menu-dots.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getActiveDocumentTitle } from '../../../store/selectors';
import { saveAndCloseDocument, saveDocumentValue, setActiveDocumentTitle } from '../../../store/actions';


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

const DocumentLabel = styled.input.attrs(props => ({
    type: "text",
  }))`
    color: ${({ theme }) => theme.palette.text.heavy};
    background-color: transparent;
    border: none;
    padding-bottom: 3px;
    
    font-family: ${({ theme }) => theme.typography.editor.navBar.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.navBar.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.navBar.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.navBar.lineHeight};

    text-overflow: ellipsis;

    &:focus {
        outline: none;
    }
`

const EditorNavBar = ({ documentId }) => {
    const dispatch = useDispatch();
    const documentTitle = useSelector(getActiveDocumentTitle);

    return (
        <NavBarRow>
            <SubRow>
                <Link to="/documents">
                    <BackIcon onClick={() => dispatch(saveAndCloseDocument())}/>
                </Link>
                <DocumentLabel
                value={documentTitle}
                onChange={e => dispatch(setActiveDocumentTitle(e.target.value))}
                onBlur={(e) => dispatch(saveDocumentValue({
                    id: documentId,
                    title: e.target.value,
                    timestamp: + new Date()
                }))}/>
            </SubRow>

            <div>
                <ThemeToggleButton/>
                {/* <MenuIcon/> */}
            </div>
        </NavBarRow>
    );
};

EditorNavBar.propTypes = {};

export default EditorNavBar;