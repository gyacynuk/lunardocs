import { put, call, takeLatest, delay } from 'redux-saga/effects'
import Api, { db } from '../../api'
import { setDocuments } from '../actions';
import { FETCH_DOCUMENTS_ASYNC } from '../actionTypes';

function* fetchDocumentsAsync(action) {
    const documents = yield call(Api.fetchAllDocuments, db);
    yield put(setDocuments(documents));
}
export function* watchFetchDocumentsAsync() {
    // Will cancel current running updateDocument task
    yield takeLatest(FETCH_DOCUMENTS_ASYNC, fetchDocumentsAsync);
}