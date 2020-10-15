import { TOGGLE_DISPLAY_MODE, EDITOR_SAVE_DOCUMENT_ASYNC, EDITOR_SET_ACTIVE_DOCUMENT_ID, EDITOR_SET_ACTIVE_DOCUMENT_TITLE, EDITOR_SET_ACTIVE_DOCUMENT_VALUE, EDITOR_SET_SHORTCUT_TARGET,EDITOR_SET_SHORTCUT_SEARCH, EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX, SET_AUTH_USER, FETCH_USER_ASYNC, SIGN_OUT_USER, SET_THEME, SET_USER, SET_USER_PREFERRED_THEME, FETCH_DOCUMENTS_ASYNC, SET_DOCUMENTS, SET_ACTIVE_DOCUMENT, EDITOR_OPEN_DOCUMENT, EDITOR_CLOSE_DOCUMENT, EDITOR_SAVE_AND_CLOSE_DOCUMENT, SET_LOADING } from './actionTypes';

// Global
export const setLoading = value => ({
	type: SET_LOADING,
	payload: value
})

// Auth
export const setAuthUser = value => ({
	type: SET_AUTH_USER,
	payload: value
})

// User
export const fetchUserAsync = userId => ({
	type: FETCH_USER_ASYNC,
	payload: {
		userId
	}
})
export const signOutUser = history => ({
	type: SIGN_OUT_USER,
	payload: {
		history
	}
})
export const setUser = user => ({
	type: SET_USER,
	payload: {
		user
	}
})
export const setUserPreferredTheme = theme => ({
	type: SET_USER_PREFERRED_THEME,
	payload: {
		theme
	}
})


// Themeing and display
export const toggleDisplayMode = () => ({
	type: TOGGLE_DISPLAY_MODE,
	payload: {}
});
export const setTheme = theme => ({
	type: SET_THEME,
	payload: {
		theme
	}
});


// Documents
export const fetchDocumentsAsync = () => ({
	type: FETCH_DOCUMENTS_ASYNC,
	payload: {}
})
export const setDocuments = value => ({
	type: SET_DOCUMENTS,
	payload: value
})
export const setActiveDocument = value => ({
	type: SET_ACTIVE_DOCUMENT,
	payload: value
})



// Editor
export const openDocument = documentId => ({
	type: EDITOR_OPEN_DOCUMENT,
	payload: documentId
})
export const closeDocument = () => ({
	type: EDITOR_CLOSE_DOCUMENT,
	payload: {}
})
export const saveAndCloseDocument = () => ({
	type: EDITOR_SAVE_AND_CLOSE_DOCUMENT,
	payload: {}
})
export const saveDocumentValueAsync = documentData => ({
	type: EDITOR_SAVE_DOCUMENT_ASYNC,
	payload: documentData
})
export const setActiveDocumentId = value => ({
	type: EDITOR_SET_ACTIVE_DOCUMENT_ID,
	payload: value
})
export const setActiveDocumentTitle = value => ({
	type: EDITOR_SET_ACTIVE_DOCUMENT_TITLE,
	payload: value
})
export const setActiveDocumentValue = value => ({
	type: EDITOR_SET_ACTIVE_DOCUMENT_VALUE,
	payload: value
})

export const setShortcutTarget = value => ({
	type: EDITOR_SET_SHORTCUT_TARGET,
	payload: value
})
export const setShortcutSearch = value => ({
	type: EDITOR_SET_SHORTCUT_SEARCH,
	payload: value
})
export const setShortcutDropdownIndex = value => ({
	type: EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX,
	payload: value
})


