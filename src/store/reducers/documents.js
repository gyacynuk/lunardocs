import { SET_DOCUMENTS, PREPEND_DOCUMENT, REMOVE_DOCUMENT, UPDATE_DOCUMENT, SET_DOCUMENT_FILTER_TERM, SET_DOCUMENT_FILTER_TAG } from "../actionTypes";

function removeDocumentValueAddTimestamp(document) {
    const { value, ...documentNoValue } = document
    return { ...documentNoValue, timestamp: + new Date()} 
}

function prependDocument(docs, document) {
    let newDocs = docs.slice()
    newDocs.splice(0, 0, removeDocumentValueAddTimestamp(document))
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
            ...removeDocumentValueAddTimestamp(document)
        }
    })
    newDocs.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : ((a.timestamp > b.timestamp) ? -1 : 0))
    return newDocs
}

const initialState = {
    areDocumentsLoaded: false,
    filterTerm: '',
    documents: [],
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
                documents: prependDocument(state.documents, action.payload)
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
                documents: updateDocument(state.documents, action.payload)
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
        default:
            return state;
    }
}
