import { EDITOR_SET_ACTIVE_DOCUMENT_VALUE, EDITOR_SET_SHORTCUT_TARGET, EDITOR_SET_SHORTCUT_SEARCH, EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX } from "../actionTypes";

const initialState = {
    activeDocument: {
        name: 'You shouldn\'t be seeing this, SNEAKY',
        value: [{
            type: 'paragraph',
            children: [{ text: '' }],
        }],
    },
    shortcut:{
        target: null,
        search: '',
        dropdownIndex: 0,
    },
}

export default (state = initialState, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
}