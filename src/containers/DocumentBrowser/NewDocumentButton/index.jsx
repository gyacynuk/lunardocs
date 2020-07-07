import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import RowItem from '../RowItem';
import styled from 'styled-components';

import { ReactComponent as PlusSVG } from '../../../assets/icons/plus.svg';

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

function useFocus() {
    const focusRef = useRef(null);
    const setFocus = () => focusRef.current && focusRef.current.focus();

    return [focusRef, setFocus];
}

const NewDocumentButton = () => {
    const [focusRef, setFocus] = useFocus();

    return (
        <RowItem onClick={setFocus}>
            <Dot> 
                <PlusIcon/>
            </Dot>
            <ContentContainer>
                <TitleInput ref={focusRef} type="text" placeholder="New Document"/>
            </ContentContainer>
        </RowItem>
    );
};

NewDocumentButton.propTypes = {};

export default NewDocumentButton;