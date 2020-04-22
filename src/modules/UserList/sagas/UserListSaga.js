import {call, put, takeEvery} from "redux-saga/effects";
import * as UserListAPI from "../api/UserListAPI";
import { UserListActions } from "../../../actions/index";

function* handleFetchUserListRequest(action){
    try{
        const {data, statusText} = yield call(UserListAPI.getUserList);
        // console.log(data)
        if(statusText === "OK"){
            yield put(UserListActions.fetchUserListSuccess(data));
        }

    }
    catch (error){
        yield put(UserListActions.fetchUserListError(error));
    }
}

function* fetchUserListRequest(){
    yield takeEvery(UserListActions.fetchUserListRequest, handleFetchUserListRequest)
}

export default {
    fetchUserListRequest
}