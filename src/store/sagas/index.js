import { all } from 'redux-saga/effects'
import { watchFetchUserAsync, watchSignOutUser, watchSetUserPreferredTheme } from './user'

export default function* rootSaga() {
    yield all([
        watchFetchUserAsync(), watchSignOutUser(), watchSetUserPreferredTheme()
    ])
}
