import { combineReducers } from 'redux';

import auth from './auth'
import display from './display';
import editor from './editor';
import user from './user';
import documents from './documents'

export default combineReducers({ auth, display, editor, user, documents });