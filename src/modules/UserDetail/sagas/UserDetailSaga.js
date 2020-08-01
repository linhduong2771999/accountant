import {call, put, takeEvery} from "redux-saga/effects";
import { UserDetailActions } from "../../../actions/index";
import * as UserDetailAPI from "../api/UserDetailAPI";

function* handleFetchUserDetailRequest(action){
    const id = action.payload;
    try{
        const {data, statusText} = yield call(UserDetailAPI.getUserDetail, id)
        if(statusText === "OK"){
            yield put(UserDetailActions.fetchUserDetailSuccess(data))
        }
    }
    catch(error){
        yield put(UserDetailActions.fetchUserDetailError(error))
    }
}

function* fetchUserDetailRequest(){
    yield takeEvery(UserDetailActions.fetchUserDetailRequest, handleFetchUserDetailRequest)
}

export default {
    fetchUserDetailRequest   
}