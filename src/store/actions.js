import { TOGGLE_TODO, SET_FILTER, TOGGLE_DISPLAY_MODE, EDITOR_SET_ACTIVE_DOCUMENT_VALUE, EDITOR_SET_SHORTCUT_TARGET, EDITOR_SET_SHORTCUT_SEARCH, EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX } from "./actionTypes";

// Themeing and display
export const toggleDisplayMode = () => ({
  type: TOGGLE_DISPLAY_MODE,
  payload: {}
});


// Editor
export const setActiveDocumentValue = (value) => ({
    type: EDITOR_SET_ACTIVE_DOCUMENT_VALUE,
    payload: value
})

export const setShortcutTarget = (value) => ({
    type: EDITOR_SET_SHORTCUT_TARGET,
    payload: value
})
export const setShortcutSearch = (value) => ({
    type: EDITOR_SET_SHORTCUT_SEARCH,
    payload: value
})
export const setShortcutDropdownIndex = (value) => ({
    type: EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX,
    payload: value
})


// Examples
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
