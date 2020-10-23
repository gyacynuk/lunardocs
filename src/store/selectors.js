// Global
export const isLoading = store => store.global.loading;

// User
export const isUserSignedIn = store => !!store.user.user;
export const isUserPending = store => store.user.pending;
export const getUser = store => store.user.user;

// Themeing and display
export const getTheme = store => store.display.theme;

// Documents
export const getDocuments = store => store.documents.documents;

// Editor
export const getActiveDocumentId = store => store.editor.activeDocument.id;
export const getActiveDocumentTitle = store => store.editor.activeDocument.title;
export const getActiveDocumentValue = store => store.editor.activeDocument.value;

export const getShortcutTarget = store => store.editor.shortcut.target;
export const getShortcutSearch = store => store.editor.shortcut.search;
export const getShortcutDropdownIndex = store => store.editor.shortcut.dropdownIndex;

export const isActiveDocumentLoaded = store => store.editor.activeDocument.id !== '';
export const isSavePending= store => store.editor.savePending;
