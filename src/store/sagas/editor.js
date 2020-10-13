import { put, call, takeLatest, delay, select } from 'redux-saga/effects'
import { EDITOR_SAVE_DELAY_MILLIS } from '../../api/constants'
import { setActiveDocumentId, setActiveDocumentTitle, setActiveDocumentValue, closeDocument, saveDocumentValueAsync } from '../actions'
import { EDITOR_SAVE_DOCUMENT, EDITOR_SAVE_DOCUMENT_ASYNC, EDITOR_OPEN_DOCUMENT, EDITOR_SAVE_AND_CLOSE_DOCUMENT } from '../actionTypes'
import Api, { db } from '../../api'
import { getActiveDocumentId, getActiveDocumentTitle, getActiveDocumentValue } from '../selectors'

function* openDocument(action) {
    const id = action.payload; 
    const { title, value } = yield call(Api.fetchDocumentById, db, id);

    if (title == undefined || value == undefined) {
        // TODO Handle when load fails
        console.error('Failed to read document')
    } else {
        yield (put(setActiveDocumentId(id)));
        yield (put(setActiveDocumentTitle(title)));
        yield (put(setActiveDocumentValue(value)));
    }
}
export function* watchOpenDocument() {
    // Will cancel current running updateDocument task
    yield takeLatest(EDITOR_OPEN_DOCUMENT, openDocument);
}

function* saveActiveDocumentAndClose(action) {
    // Read in current state of active doc
    const id = yield select(getActiveDocumentId);
    const title = yield select(getActiveDocumentTitle);
    const value = yield select(getActiveDocumentValue);

    // Update document in database
    yield put(saveDocumentValueAsync({
        id,
        title,
        value,
        delay: 0
    }))

    // Reset current state
    yield delay(50)
    yield put(closeDocument())
}
export function* watchSaveActiveDocumentAndClose() {
    // Will cancel current running updateDocument task
    yield takeLatest(EDITOR_SAVE_AND_CLOSE_DOCUMENT, saveActiveDocumentAndClose);
}

function* saveDocument(action) {
    // Immidiately update the local variables
    yield (put(setActiveDocumentId(action.payload.id)));
    if (action.payload.title) {
        yield (put(setActiveDocumentTitle(action.payload.title)));
    }
    if (action.payload.value) {
        yield (put(setActiveDocumentValue(action.payload.value)));
    }

    // Update document in database
    yield call(Api.saveDocument, db, action.payload)
}
export function* watchSaveDocument() {
    // Will cancel current running updateDocument task
    yield takeLatest(EDITOR_SAVE_DOCUMENT, saveDocument);
}

function* saveDocumentAsync(action) {
    // Immidiately update the local variables
    yield (put(setActiveDocumentId(action.payload.id)));
    if (action.payload.title) {
        yield (put(setActiveDocumentTitle(action.payload.title)));
    }
    if (action.payload.value) {
        yield (put(setActiveDocumentValue(action.payload.value)));
    }

    // Debounce by delaying saga
    const delayDuration = action.payload.delay == undefined ? EDITOR_SAVE_DELAY_MILLIS : action.payload.delay;
    console.log('delay: ' + delayDuration)
    yield delay(delayDuration);
    
    // Update document in database
    yield call(Api.saveDocument, db, action.payload)
  }
export function* watchSaveDocumentAsync() {
  // Will cancel current running updateDocument task
  yield takeLatest(EDITOR_SAVE_DOCUMENT_ASYNC, saveDocumentAsync);
}