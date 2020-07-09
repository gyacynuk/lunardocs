import { combineReducers } from 'redux';

import display from './display';
import editor from './editor';

export default combineReducers({ display, editor });