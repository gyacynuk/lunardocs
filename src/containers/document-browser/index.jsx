import React, { useEffect, useRef } from 'react';
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
import { getFilteredDocuments } from '../../store/selectors';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto;
`

export const TAGS = [
    { name: 'red', displayName: 'Red Tag', color: 'red' },
    { name: 'violet', displayName: 'Violet Tag', color: 'violet' },
    { name: 'cyan', displayName: 'Cyan Tag', color: 'lightBlue' },
    { name: 'green', displayName: 'Green Tag', color: 'lightGreen' },
    { name: 'yellow', displayName: 'Yellow Tag', color: 'yellow' },
    { name: 'untagged', displayName: 'Untagged', color: 'grey' },
]

export const getTagColor = tagName => TAGS.find(tag => tag.name === tagName).color;

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
                            <Document id={doc.id} title={doc.title} tag={doc.tag || 'untagged'} date={moment(doc.timestamp).format('MMM Do YYYY, h:mm a')}/>
                        </Link>
                    </React.Fragment>))}
            </ScrollableContainer>
        </ContentPane>
    );
};

DocumentBrowser.propTypes = {};

export default DocumentBrowser;