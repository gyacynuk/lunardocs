import { TOGGLE_TODO, SET_FILTER, TOGGLE_DISPLAY_MODE } from "./actionTypes";

export const toggleDisplayMode = () => ({
  type: TOGGLE_DISPLAY_MODE,
  payload: {}
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
