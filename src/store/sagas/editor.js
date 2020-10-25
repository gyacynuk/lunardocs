import { put, call, takeLatest, delay as delaySaga, select } from 'redux-saga/effects'
import { EDITOR_SAVE_DELAY_MILLIS } from '../../api/constants'
import { setActiveDocumentId, setActiveDocumentTitle, setActiveDocumentValue, closeDocument, saveDocumentValueAsync, setLoading, setSavePending, prependDocumentAndSave, updateDocument, updateDocumentAndSave } from '../actions'
import { EDITOR_SAVE_DOCUMENT_ASYNC, EDITOR_OPEN_DOCUMENT, EDITOR_SAVE_AND_CLOSE_DOCUMENT, EDITOR_CREATE_DOCUMENT, EDITOR_LOAD_DOCUMENT_AND_OPEN_EDITOR } from '../actionTypes'
import Api, { db } from '../../api'
import { getActiveDocumentId, getActiveDocumentTitle, getActiveDocumentValue, getDocuments, isActiveDocumentLoaded, isSavePending } from '../selectors'
import { initialState } from '../reducers/editor'
import { v4 as uuid } from 'uuid';


function* createNewDocument(action) {
    const { history, documentTitle } = action.payload; 

    const id = uuid();
    const value = Api.createNewDocumentValue(documentTitle);

    // Save Document
    yield call(Api.saveDocument, db, { id: id, title: documentTitle, value: value })
    yield put(prependDocumentAndSave({ id: id, title: documentTitle }));

    yield delaySaga(100); // Seems like the array update in the reducer isnt atomic... need a short delay
    history.push(`documents/edit/${id}`);
}
export function* watchCreateNewDocument() {
    yield takeLatest(EDITOR_CREATE_DOCUMENT, createNewDocument);
}

function* loadDocumentAndOpenEditor(action) {
    // Start loading screen
    yield put(setLoading(true))

    const { history, id } = action.payload
    const { title, value } = yield call(Api.fetchDocumentById, db, id);

    // Handle case when document does not exist
    if (title == undefined || value == undefined) {
        yield (put(setActiveDocumentId(id)));
        yield (put(setActiveDocumentTitle(initialState.activeDocument.title)));
        yield (put(setActiveDocumentValue(initialState.activeDocument.value)));
    }
    // Handle case when doc is loaded normally
    else {
        yield (put(setActiveDocumentId(id)));
        yield (put(setActiveDocumentTitle(title)));
        yield (put(setActiveDocumentValue(value)));
    }

    // Give time for editor reducer to finish
    yield delaySaga(100);

    // End loading screen and redirect
    yield put(setLoading(false))
    history.push(`/documents/edit/${id}`);
}
export function* watchLoadDocumentAndOpenEditor(action) {
    yield takeLatest(EDITOR_LOAD_DOCUMENT_AND_OPEN_EDITOR, loadDocumentAndOpenEditor);
}

function* openDocument(action) {
    const isDocumentAlreadyLoaded = yield select(isActiveDocumentLoaded);
    if (isDocumentAlreadyLoaded) {
        return;
    }

    // Load in data
    const id = action.payload; 
    const { title, value } = yield call(Api.fetchDocumentById, db, id);
    
    // Handle case when document does not exist
    if (title == undefined || value == undefined) {
        yield (put(setActiveDocumentId(id)));
        yield (put(setActiveDocumentTitle(initialState.activeDocument.title)));
        yield (put(setActiveDocumentValue(initialState.activeDocument.value)));
    }
    // Handle case when doc is loaded normally
    else {
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
    yield delaySaga(50)
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
        yield put(updateDocument({id: action.payload.id, title: action.payload.title}))
    }
    // Don't need to update document list here, since document values are not stored
    if (action.payload.value) {
        yield put(setActiveDocumentValue(action.payload.value));
    }

    // Debounce by delaying saga
    const delayDuration = action.payload.delay == undefined ? EDITOR_SAVE_DELAY_MILLIS : action.payload.delay;
    yield delaySaga(delayDuration);
    
    // Update document in database
    const { delay, ...documentData } = action.payload
    yield call(Api.saveDocument, db, documentData)
    yield call(Api.saveDocuments, db, yield select(getDocuments))

    // Save is complete 
    yield put(setSavePending(false));
  }
export function* watchSaveDocumentAsync() {
  // Will cancel current running updateDocument task
  yield takeLatest(EDITOR_SAVE_DOCUMENT_ASYNC, saveDocumentAsync);
}