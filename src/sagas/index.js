import { all, fork } from "redux-saga/effects";
import { flatten } from 'lodash/array';
import { values } from 'lodash/object';
import UserManagerSaga from "../modules/UserManager/sagas/UserManagerSaga";

const sagaList = [
    UserManagerSaga
]

export default function* () {
    yield all(
        flatten(sagaList.map(sagas => values(sagas))).map(saga => fork(saga))
    )
}