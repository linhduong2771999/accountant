import {call, put, takeEvery} from "redux-saga/effects";
import { UserManagerActions } from "../../../actions/index";
import * as UserManagerAPI from "../api/UserManagerAPI";

function* handleFetchUserManagerRequest(action){
    try{
        const {data, statusText} = yield call(UserManagerAPI.getUserManager);
        // console.log(data)
        if(statusText === "OK"){
            yield put(UserManagerActions.fetchUserManagerSuccess(data));
        }

    }
    catch (error){
        yield put(UserManagerActions.fetchUserManagerError(error));
    }
}

function* handleFetchOneUserManagerRequest(action){
    try{
        const { data, statusText } = yield call(UserManagerAPI.getOneUserManager, action.payload);
        if(statusText === "OK"){
            yield put(UserManagerActions.fetchOneUserManagerSuccess(data));
        }
    }
    catch (error){
        yield put(UserManagerActions.fetchOneUserManagerError(error));
    }
}

function* handleCreateUserManagerRequest(action){
    const {userInfo, callback, fallback} = action.payload;
    try{
        const {statusText} = yield call(UserManagerAPI.createUserManager, userInfo );
        if(statusText === "OK"){
            yield put(UserManagerActions.createUserManagerSuccess(userInfo));
            yield callback && callback();
        }

    }
    catch (error){
        yield put(UserManagerActions.createUserManagerError(error));
        yield fallback && fallback();
    }
}

function* handleUpdateUserManagerRequest(action){
    const {userInfo, callback, fallback} = action.payload;
    try{
        const {data, statusText} = yield call(UserManagerAPI.updateUserManager, userInfo );     
        if(statusText === "OK"){
            yield put(UserManagerActions.updateUserManagerSuccess(data));
            yield callback && callback();
        }
    }
    catch (error){
        yield put(UserManagerActions.updateUserManagerError(error));
        yield fallback && fallback();
    }
}

function* handleDeleteUserManagerRequest(action){
    const  userInfo  = action.payload;    
    try{
        const {statusText} = yield call(UserManagerAPI.deleteUserManager, userInfo);     
        if(statusText === "OK"){
            yield put(UserManagerActions.deleteUserManagerSuccess(userInfo));
        }
    }
    catch (error){
        yield put(UserManagerActions.updateUserManagerError(error));
    }
}

function* fetchUserManagerRequest() {
    yield takeEvery(UserManagerActions.fetchUserManagerRequest, handleFetchUserManagerRequest);
}

function* fetchOneUserManagerRequest() {
    yield takeEvery(UserManagerActions.fetchOneUserManagerRequest, handleFetchOneUserManagerRequest);
}

function* createUserManagerRequest() {
    yield takeEvery(UserManagerActions.createUserManagerRequest, handleCreateUserManagerRequest);
}

function* updateUserManagerRequest() {
    yield takeEvery(UserManagerActions.updateUserManagerRequest, handleUpdateUserManagerRequest);
}

function* deleteUserManagerRequest() {
    yield takeEvery(UserManagerActions.deleteUserManagerRequest, handleDeleteUserManagerRequest);
}

export default {
    fetchUserManagerRequest,
    createUserManagerRequest,
    fetchOneUserManagerRequest,
    updateUserManagerRequest,
    deleteUserManagerRequest
}