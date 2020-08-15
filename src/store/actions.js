import { TOGGLE_TODO, SET_FILTER, TOGGLE_DISPLAY_MODE, EDITOR_SET_ACTIVE_DOCUMENT_VALUE, EDITOR_SET_SHORTCUT_TARGET,EDITOR_SET_SHORTCUT_SEARCH, EDITOR_SET_SHORTCUT_DROP_DOWN_INDEX, SET_AUTH_USER, FETCH_USER_ASYNC, SIGN_OUT_USER, SET_THEME, SET_USER, SET_USER_PREFERRED_THEME } from "./actionTypes";

// Auth
export const setAuthUser = (value) => ({
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
export const setTheme = (theme) => ({
	type: SET_THEME,
	payload: {
		theme
	}
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
