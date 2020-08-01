import { all, fork } from "redux-saga/effects";
import { flatten } from 'lodash/array';
import { values } from 'lodash/object';
import AuthSaga from "../modules/Login/sagas/authSaga";
import UserManagerSaga from "../modules/UserManager/sagas/UserManagerSaga";
import UserListSaga from "../modules/UserList/sagas/UserListSaga";
import WorkManagerSaga from "../modules/WorkManager/sagas/WorkManagerSaga";
import UserDetail from "../modules/UserDetail/sagas/UserDetailSaga";
const sagaList = [
    AuthSaga,
    UserManagerSaga,
    UserListSaga,
    WorkManagerSaga,
    UserDetail
]

export default function* () {
    yield all(
        flatten(sagaList.map(sagas => values(sagas))).map(saga => fork(saga))
    )
}