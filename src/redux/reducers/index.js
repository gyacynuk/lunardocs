import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import display from "./display";

export default combineReducers({ display, visibilityFilter });