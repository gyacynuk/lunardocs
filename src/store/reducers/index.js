import { combineReducers } from 'redux';

import auth from './auth'
import display from './display';
import editor from './editor';

export default combineReducers({ auth, display, editor });