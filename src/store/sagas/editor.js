import { put, call, takeLatest, delay as delaySaga, select } from 'redux-saga/effects'
import { EDITOR_SAVE_DELAY_MILLIS } from '../../api/constants'
import { setActiveDocumentId, setActiveDocumentTitle, setActiveDocumentValue, closeDocument, saveDocumentValueAsync, setLoading, setSavePending, prependDocumentAndSave, updateDocument, updateDocumentAndSave } from '../actions'
import { EDITOR_SAVE_DOCUMENT_ASYNC, EDITOR_OPEN_DOCUMENT, EDITOR_SAVE_AND_CLOSE_DOCUMENT, EDITOR_CREATE_DOCUMENT } from '../actionTypes'
import Api, { db } from '../../api'
import { getActiveDocumentId, getActiveDocumentTitle, getActiveDocumentValue, getDocuments, isActiveDocumentLoaded, isSavePending } from '../selectors'
import { initialState } from '../reducers/editor'
import { v4 as uuid } from 'uuid';


function* createNewDocument(action) {
    const { history, documentTitle } = action.payload; 

    const id = uuid();
    const value = Api.createNewDocumentValue(documentTitle);

    yield put(setActiveDocumentId(id));
    yield put(setActiveDocumentValue(value));

    yield delaySaga(100); // Seems like the array update in the reducer isnt atomic... need a short delay
    history.push(`documents/edit/${id}`);

    // Save to documents list
    yield put(prependDocumentAndSave({id: id, title: documentTitle, value: value}));
}
export function* watchCreateNewDocument() {
    yield takeLatest(EDITOR_CREATE_DOCUMENT, createNewDocument);
}

function* openDocument(action) {
    const isDocumentAlreadyLoaded = yield select(isActiveDocumentLoaded);
    if (isDocumentAlreadyLoaded) {
        return;
    }

    // Start loading screen
    yield put(setLoading(true))

    // Load in data
    const id = action.payload; 
    const { title, value } = yield call(Api.fetchDocumentById, db, id);
    const isWelcomeDocument = yield call(Api.isInitialDocument, id);

    // Handle special case of the initial/welcome document
    if (isWelcomeDocument) {
        const initialDoc = yield call(Api.generateInitialDocumentAndDestroyPreset);
        yield (put(setActiveDocumentId(initialDoc.id)));
        yield (put(setActiveDocumentTitle(initialDoc.title)));
        yield (put(setActiveDocumentValue(initialDoc.value)));

        // Save this doc to the user's DB
        yield put(saveDocumentValueAsync({
            id: initialDoc.id,
            title: initialDoc.title,
            value: initialDoc.value,
            delay: 0
        }))
    }
    // Handle case when document does not exist
    else if (title == undefined || value == undefined) {
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

    // End loading screen
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
    if (action.payload.value) {
        yield put(setActiveDocumentValue(action.payload.value));
        yield put(updateDocument({id: action.payload.id, value: action.payload.value}))
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