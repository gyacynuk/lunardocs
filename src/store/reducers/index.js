import { combineReducers } from 'redux';

import auth from './auth'
import display from './display';
import documents from './documents'
import editor from './editor';
import global from './global'
import user from './user';

export default combineReducers({ auth, display, documents, editor, global, user });