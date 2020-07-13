import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Divider from './divider';
import Document from './document';
import DocumentFilter from './document-filter';
import SearchBar from './search-bar';
import Spacer from '../../components/spacer';
import NewDocumentButton from './new-document-button';
import ContentPane from '../../components/content-pane';

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