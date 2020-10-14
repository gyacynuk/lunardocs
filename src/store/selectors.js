import { VISIBILITY_FILTERS } from "./constants";

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

// Examples
export const getTodosState = store => store.todos;

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = store =>
  getTodoList(store).map(id => getTodoById(store, id));

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
  const allTodos = getTodos(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};
