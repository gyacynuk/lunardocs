import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Divider from './Divider';
import Document from './Document';
import SearchBar from './SearchBar';
import Spacer from '../../components/Spacer';

const OuterContainer = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.constants.navBar.height};

    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.constants.navBar.height});

    display: flex;
    justify-content: center;
`

const InnerContainer = styled.div`
    width: 700px;
    height: 100%;

    ${({ theme }) => theme.isMobile`
        width: 80%;
    `}
`

const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto;
`

const DocumentBrowser = () => {
    return (
        <OuterContainer>
            <InnerContainer>
                <SearchBar/>
                <Spacer height={32}/>
                <ScrollableContainer>
                    <Document title="Astrial Designer Drugs" date="July 5th, 2020" subjectColor="red"/>
                    <Divider/>
                    <Document title="Salvia Letterpress" date="July 4th, 2020" subjectColor="violet"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                    <Divider/>
                    <Document title="I'm Baby" date="July 4th, 2020" subjectColor="lightBlue"/>
                </ScrollableContainer>
            </InnerContainer>
        </OuterContainer>
    );
};

DocumentBrowser.propTypes = {};

export default DocumentBrowser;