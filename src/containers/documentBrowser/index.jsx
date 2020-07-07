import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Divider from './Divider';
import Document from './Document';
import DocumentFilter from './DocumentFilter';
import SearchBar from './SearchBar';
import Spacer from '../../components/Spacer';
import NewDocumentButton from './NewDocumentButton';
import ContentPane from '../../components/ContentPane';

const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto;
`

const DocumentBrowser = () => {
    return (
        <ContentPane>
            <SearchBar/>
            <DocumentFilter/>
            <ScrollableContainer>
                <NewDocumentButton/>
                <Divider/>
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
        </ContentPane>
    );
};

DocumentBrowser.propTypes = {};

export default DocumentBrowser;