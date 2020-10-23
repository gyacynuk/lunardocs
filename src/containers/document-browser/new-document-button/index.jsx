import React, { useState } from "react";
import PropTypes from 'prop-types';
import RowItem from '../row-item';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'

import { ReactComponent as PlusSVG } from '../../../assets/icons/plus.svg';
import { useFocus } from '../../../utils'
import { useDispatch } from "react-redux";
import { createDocument } from "../../../store/actions";

const Dot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${({ theme }) => theme.constants.browser.dotSize};
    height: ${({ theme }) => theme.constants.browser.dotSize};
    margin: 0 21px; /* centers with search magnify icon */

    border-radius: 50%;
    border: 1.5px solid ${({ theme }) => theme.palette.text.regular};
`

const PlusIcon = styled(PlusSVG)`
    width: 8px;
    height: 8px;

    stroke: ${({ theme }) => theme.palette.text.regular};
    stroke-width: 1.5;
`

const ContentContainer = styled.div`
    flex-grow: 1;
`

const TitleInput = styled.input`
    width: 100%;

    color: ${({ theme }) => theme.palette.text.regular};
    background-color: transparent;
    border: none;
    
    font-weight: bold;
    font-family: ${({ theme }) => theme.typography.searchBar.fontFamily};
    font-size: ${({ theme }) => theme.typography.searchBar.fontSize};
    line-height: ${({ theme }) => theme.typography.searchBar.lineHeight};

    cursor: pointer;

    &:focus {
        outline: none;
    }
`

const NewDocumentButton = ({ history }) => {
    const dispatch = useDispatch();
    const [focusRef, setFocus] = useFocus();
    const [titleField, setTitleField] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(createDocument(history, titleField));
        }
    }

    return (
        <RowItem onClick={setFocus}>
            <Dot> 
                <PlusIcon onClick={() => dispatch(createDocument(history, titleField))}/>
            </Dot>
            <ContentContainer>
                <TitleInput ref={focusRef} value={titleField} onChange={e => setTitleField(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder="New Document"/>
            </ContentContainer>
        </RowItem>
    );
};

NewDocumentButton.propTypes = {};

export default withRouter(NewDocumentButton);