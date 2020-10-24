import { add } from "lodash";
import { SET_DOCUMENTS, PREPEND_DOCUMENT, REMOVE_DOCUMENT, UPDATE_DOCUMENT, SET_DOCUMENT_FILTER_TERM, SET_DOCUMENT_FILTER_TAG, SET_DOCUMENT_FILTER_TAG_DROP_DOWN, UPDATE_DOCUMENT_NOT_TIMESTAMP } from "../actionTypes";

function addTagIfMissing(document) {
    if (!document.tag) {
        return { ...document, tag: 'untagged' }
    }
    return document
}

function removeDocumentValue(document) {
    const { value, ...documentNoValue } = document
    return documentNoValue
}

function addTimestamp(document) {
    return { ...document, timestamp: + new Date()} 
}

function prependDocument(docs, document) {
    let newDocs = docs.slice()
    newDocs.splice(0, 0, document)
    return newDocs
}

function removeDocument(docs, document) {
    return docs.filter(doc => doc.id !== document.id)
}

function updateDocument(docs, document) {
    let newDocs = docs.map(doc => {
        if (doc.id !== document.id) {
            return doc
        }
        return {
            ...doc,
            ...document
        }
    })
    newDocs.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : ((a.timestamp > b.timestamp) ? -1 : 0))
    return newDocs
}

const initialState = {
    areDocumentsLoaded: false,
    filterTerm: '',
    documents: [],
    activeDropDownTag: '',
    tags: {
        red: false,
        violet: false,
        cyan: false,
        green: false,
        yellow: false,
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_DOCUMENTS: {
            return {
                ...state,
                areDocumentsLoaded: true,
                documents: action.payload,
            }
        }
        case PREPEND_DOCUMENT: {
            return {
                ...state,
                documents: prependDocument(state.documents, removeDocumentValue(addTagIfMissing(addTimestamp(action.payload))))
            }
        }
        case REMOVE_DOCUMENT: {
            return {
                ...state,
                documents: removeDocument(state.documents, action.payload)
            }
        }
        case UPDATE_DOCUMENT: {
            return {
                ...state,
                documents: updateDocument(state.documents, removeDocumentValue(addTimestamp(action.payload)))
            }
        }
        case UPDATE_DOCUMENT_NOT_TIMESTAMP: {
            return {
                ...state,
                documents: updateDocument(state.documents, removeDocumentValue(action.payload))
            }
        }
        case SET_DOCUMENT_FILTER_TERM: {
            return {
                ...state,
                filterTerm: action.payload.toLowerCase()
            }
        }
        case SET_DOCUMENT_FILTER_TAG: {
            return {
                ...state,
                tags: {
                    ...state.tags,
                    [action.payload.tag]: action.payload.value
                }
            }
        }
        case SET_DOCUMENT_FILTER_TAG_DROP_DOWN: {
            return {
                ...state,
                activeDropDownTag: action.payload
            }
        }
        default:
            return state;
    }
}
