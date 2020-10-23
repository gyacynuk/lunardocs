import { all } from 'redux-saga/effects'
import { watchFetchUserAsync, watchSignOutUser, watchSetUserPreferredTheme } from './user'
import { watchSaveDocumentAsync, watchOpenDocument, watchSaveActiveDocumentAndClose, watchCreateNewDocument } from './editor'
import { watchFetchDocumentsAsync } from './documents'

export default function* rootSaga() {
    yield all([
        watchFetchUserAsync(),
        watchSignOutUser(),
        watchSetUserPreferredTheme(),
        watchSaveDocumentAsync(),
        watchFetchDocumentsAsync(),
        watchOpenDocument(),
        watchSaveActiveDocumentAndClose(),
        watchCreateNewDocument(),
    ])
}
