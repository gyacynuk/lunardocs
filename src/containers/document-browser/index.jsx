import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Divider from './divider';
import Document from './document';
import DocumentFilter from './document-filter';
import SearchBar from './search-bar';
import NewDocumentButton from './new-document-button';
import ContentPane from '../../components/content-pane';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentsAsync } from '../../store/actions';
import { getDocumentFilterTerm, getDocuments, getFilteredDocuments } from '../../store/selectors';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Api from '../../api';
import {v4 as uuid} from 'uuid'


const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto;
`

const DocumentBrowser = () => {
    const dispatch = useDispatch();
    const documents = useSelector(getFilteredDocuments);

    useEffect(() => {
        dispatch(fetchDocumentsAsync())
    }, [])

    return (
        <ContentPane>
            <SearchBar/>
            <DocumentFilter/>
            <ScrollableContainer>
                <NewDocumentButton/>
                {documents.map(doc =>
                    (<React.Fragment key={doc.id} >
                        <Divider/>
                        <Link to={`/documents/edit/${doc.id}`}>
                            <Document title={doc.title} date={moment(doc.timestamp).format('MMM Do YYYY, h:mm a')} subjectColor="red"/>
                        </Link>
                    </React.Fragment>))}
            </ScrollableContainer>
        </ContentPane>
    );
};

DocumentBrowser.propTypes = {};

export default DocumentBrowser;