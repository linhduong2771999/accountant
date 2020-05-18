import { all, fork } from "redux-saga/effects";
import { flatten } from 'lodash/array';
import { values } from 'lodash/object';
import UserManagerSaga from "../modules/UserManager/sagas/UserManagerSaga";
import UserListSaga from "../modules/UserList/sagas/UserListSaga";
import WorkManagerSaga from "../modules/WorkManager/sagas/WorkManagerSaga";

const sagaList = [
    UserManagerSaga,
    UserListSaga,
    WorkManagerSaga
]

export default function* () {
    yield all(
        flatten(sagaList.map(sagas => values(sagas))).map(saga => fork(saga))
    )
}