import { all } from 'redux-saga/effects'
import { watchFetchUserAsync, watchSignOutUser, watchSetUserPreferredTheme } from './user'
import { watchSaveDocument, watchSaveDocumentAsync, watchOpenDocument, watchSaveActiveDocumentAndClose } from './editor'
import { watchFetchDocumentsAsync } from './documents'

export default function* rootSaga() {
    yield all([
        watchFetchUserAsync(),
        watchSignOutUser(),
        watchSetUserPreferredTheme(),
        watchSaveDocument(),
        watchSaveDocumentAsync(),
        watchFetchDocumentsAsync(),
        watchOpenDocument(),
        watchSaveActiveDocumentAndClose(),
    ])
}
