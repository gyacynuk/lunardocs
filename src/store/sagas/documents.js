import { put, call, takeLatest, delay, select, takeEvery } from 'redux-saga/effects'
import Api, { db } from '../../api'
import { prependDocument, setDocuments, removeDocument, updateDocument } from '../actions';
import { FETCH_DOCUMENTS_ASYNC, PREPEND_DOCUMENT_AND_SAVE, REMOVE_DOCUMENT_AND_SAVE, UPDATE_DOCUMENT_AND_SAVE, SAVE_DOCUMENTS } from '../actionTypes';
import { areDocumentsLoaded, getDocuments } from '../selectors';

function* fetchDocumentsAsync(action) {
    const isLoaded = yield select(areDocumentsLoaded)
    if (!isLoaded) {
        const documents = yield call(Api.fetchAllDocuments, db);
        yield put(setDocuments(documents));
    }
}
export function* watchFetchDocumentsAsync() {
    yield takeEvery(FETCH_DOCUMENTS_ASYNC, fetchDocumentsAsync);
}

function* prependDocumentAndSave(action) {
    yield put(prependDocument(action.payload));
    yield delay(100);
    const documents = yield select(getDocuments);
    yield call(Api.saveDocuments, db, documents);
}
export function* watchPrependDocumentAndSave() {
    yield takeLatest(PREPEND_DOCUMENT_AND_SAVE, prependDocumentAndSave);
}

function* removeDocumentAndSave(action) {
    yield put(removeDocument(action.payload));
    yield delay(100);
    const documents = yield select(getDocuments);
    yield call(Api.saveDocuments, db, documents);
}
export function* watchRemoveDocumentAndSave() {
    yield takeLatest(REMOVE_DOCUMENT_AND_SAVE, removeDocumentAndSave);
}

function* updateDocumentAndSave(action) {
    yield put(updateDocument(action.payload));
    yield delay(100);
    const documents = yield select(getDocuments);
    yield call(Api.saveDocuments, db, documents);
}
export function* watchUpdateDocumentAndSave() {
    yield takeLatest(UPDATE_DOCUMENT_AND_SAVE, updateDocumentAndSave);
}