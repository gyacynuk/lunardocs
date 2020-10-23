import { EDITOR_SET_ACTIVE_DOCUMENT_VALUE, EDITOR_SET_SHORTCUT_TARGET, EDITOR_SET_SHORTCUT_SEARCH, EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX, EDITOR_SET_ACTIVE_DOCUMENT_TITLE, EDITOR_SET_ACTIVE_DOCUMENT_ID, EDITOR_CLOSE_DOCUMENT, EDITOR_SET_SAVE_PENDING } from "../actionTypes";

export const initialState = {
    savePending: false,
    activeDocument: {
        id: '',
        title: '',
        value: [
            {
                type: "title",
                children: [{ text: "Untitled Document" }]
            },
            {
                type: "paragraph",
                children: [{ text : "" }]
            },
        ],
    },
    shortcut:{
        target: null,
        search: '',
        dropdownIndex: 0,
    },
}

export default (state = initialState, action) => {
    switch(action.type) {
        case EDITOR_SET_ACTIVE_DOCUMENT_ID: {
            return {
                ...state,
                activeDocument: {
                    ...state.activeDocument,
                    id: action.payload
                }
            }
        }
        case EDITOR_SET_ACTIVE_DOCUMENT_TITLE: {
            return {
                ...state,
                activeDocument: {
                    ...state.activeDocument,
                    title: action.payload
                }
            }
        }
        case EDITOR_SET_ACTIVE_DOCUMENT_VALUE: {
            return {
                ...state,
                activeDocument: {
                    ...state.activeDocument,
                    value: action.payload
                }
            }
        }
        case EDITOR_SET_SHORTCUT_TARGET: {
            return {
                ...state,
                shortcut: {
                    ...state.shortcut,
                    target: action.payload
                }
            }
        }
        case EDITOR_SET_SHORTCUT_SEARCH: {
            return {
                ...state,
                shortcut: {
                    ...state.shortcut,
                    search: action.payload
                }
            }
        }
        case EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX: {
            return {
                ...state,
                shortcut: {
                    ...state.shortcut,
                    dropdownIndex: action.payload
                }
            }
        }
        case EDITOR_CLOSE_DOCUMENT: {
            return initialState;
        }
        case EDITOR_SET_SAVE_PENDING: {
            return {
                ...state,
                savePending: action.payload
            }
        }
        default:
            return state;
    }
}