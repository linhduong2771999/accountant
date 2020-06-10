import {takeEvery, call, put} from "redux-saga/effects";
import * as authAPI from "../api/authAPI";
import {AuthActions} from "../../../actions/index";

function* handleCreateUserAccountRequest(action){
    const {data, statusText} = yield call(authAPI.createUserAccount, action.payload)
} 

function* handleFetchSpecificUserProfileRequest(action){
    const userUID = action.payload;
    try{
        const {data, statusText} = yield call(authAPI.fetchSpecificUserProfile, userUID);
        if(statusText === "OK"){
            yield put(AuthActions.fetchSpecificUserProfileSuccess(data));
        }
    }
    catch (error) {
        yield put(AuthActions.fetchSpecificUserProfileError(error));
    }
}

function* fetchSpecificUserProfileRequest(){
    yield takeEvery(AuthActions.fetchSpecificUserProfileRequest, handleFetchSpecificUserProfileRequest);
}

function* createUserAccountRequest(){
   yield takeEvery(AuthActions.createUserAccountRequest, handleCreateUserAccountRequest)
}

export default {
    createUserAccountRequest,
    fetchSpecificUserProfileRequest
}