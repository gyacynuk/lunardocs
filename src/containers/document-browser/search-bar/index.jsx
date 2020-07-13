import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as MagnifySVG } from '../../../assets/icons/magnifying-glass.svg'

const Container = styled.div`
    position: relative;

    width: 100%;
`

const SearchInput = styled.input`
    width: 100%;

    padding: 8px 32px;
    padding-left: 56px;
    
    color: ${({ theme }) => theme.palette.text.regular};
    background-color: transparent;

    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.palette.text.light};
    
    font-family: ${({ theme }) => theme.typography.searchBar.fontFamily};
    font-size: ${({ theme }) => theme.typography.searchBar.fontSize};
    line-height: ${({ theme }) => theme.typography.searchBar.lineHeight};

    &:focus {
       outline: none;
    }
`

const MagnifyIcon = styled(MagnifySVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}

    position: absolute;
    top: 10px;
    left: 0;

    stroke: ${({ theme }) => theme.palette.text.regular};
    stroke-width: 1.5;

    cursor: auto;
    pointer-events: none;
`

const SearchBar = () => {
    return (
        <Container>
            <SearchInput type="text"/>
            <MagnifyIcon/>
        </Container>
    );
};

SearchBar.propTypes = {};

export default SearchBar;