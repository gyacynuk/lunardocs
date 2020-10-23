import { put, call, takeLatest, delay, select } from 'redux-saga/effects'
import { EDITOR_SAVE_DELAY_MILLIS } from '../../api/constants'
import { setActiveDocumentId, setActiveDocumentTitle, setActiveDocumentValue, closeDocument, saveDocumentValueAsync, setLoading, setSavePending } from '../actions'
import { EDITOR_SAVE_DOCUMENT_ASYNC, EDITOR_OPEN_DOCUMENT, EDITOR_SAVE_AND_CLOSE_DOCUMENT, EDITOR_CREATE_DOCUMENT } from '../actionTypes'
import Api, { db } from '../../api'
import { getActiveDocumentId, getActiveDocumentTitle, getActiveDocumentValue, isActiveDocumentLoaded, isSavePending } from '../selectors'
import { initialState } from '../reducers/editor'
import { v4 as uuid } from 'uuid';


function* createNewDocument(action) {
    const { history, documentTitle } = action.payload; 

    const id = uuid();
    const value = Api.createNewDocumentValue(documentTitle);

    yield put(setActiveDocumentId(id));
    yield put(setActiveDocumentValue(value));

    yield delay(100); // Seems like the array update in the reducer isnt atomic... need a short delay
    history.push(`documents/edit/${id}`);
}
export function* watchCreateNewDocument() {
    yield takeLatest(EDITOR_CREATE_DOCUMENT, createNewDocument);
}

function* openDocument(action) {
    const isDocumentAlreadyLoaded = yield select(isActiveDocumentLoaded);
    if (isDocumentAlreadyLoaded) {
        return;
    }

    yield put(setLoading(true))
    const id = action.payload; 
    const { title, value } = yield call(Api.fetchDocumentById, db, id);
    if (title == undefined || value == undefined) {
        yield (put(setActiveDocumentId(id)));
        yield (put(setActiveDocumentTitle(initialState.activeDocument.title)));
        yield (put(setActiveDocumentValue(initialState.activeDocument.value)));
    } else {
        yield (put(setActiveDocumentId(id)));
        yield (put(setActiveDocumentTitle(title)));
        yield (put(setActiveDocumentValue(value)));
    }
    yield put(setLoading(false))
}
export function* watchOpenDocument() {
    // Will cancel current running updateDocument task
    yield takeLatest(EDITOR_OPEN_DOCUMENT, openDocument);
}

function* saveActiveDocumentAndClose(action) {
    const isDocumentUnsaved = yield select(isSavePending);

    // Only save again if there are pending changes
    if (isDocumentUnsaved) {
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
    }

    // Reset current state
    yield delay(50)
    yield put(closeDocument())
}
export function* watchSaveActiveDocumentAndClose() {
    // Will cancel current running updateDocument task
    yield takeLatest(EDITOR_SAVE_AND_CLOSE_DOCUMENT, saveActiveDocumentAndClose);
}

function* saveDocumentAsync(action) {
    // Save is pending 
    yield put(setSavePending(true));

    // Immidiately update the local variables
    yield put(setActiveDocumentId(action.payload.id));
    if (action.payload.title) {
        yield put(setActiveDocumentTitle(action.payload.title));
    }
    if (action.payload.value) {
        yield put(setActiveDocumentValue(action.payload.value));
    }

    // Debounce by delaying saga
    const delayDuration = action.payload.delay == undefined ? EDITOR_SAVE_DELAY_MILLIS : action.payload.delay;
    console.log('delay: ' + delayDuration)
    yield delay(delayDuration);
    
    // Update document in database
    yield call(Api.saveDocument, db, action.payload)

    // Save is complete 
    yield put(setSavePending(false));
  }
export function* watchSaveDocumentAsync() {
  // Will cancel current running updateDocument task
  yield takeLatest(EDITOR_SAVE_DOCUMENT_ASYNC, saveDocumentAsync);
}