import {call, put, takeEvery, delay, takeLatest} from "redux-saga/effects";
import { UserManagerActions } from "../../../actions/index";
import * as UserManagerAPI from "../api/UserManagerAPI";
// import {  } from "lodash";

function* handle_GetUser_from_UserManagerRequest(action){
    const {page, limit , search, sort, fields, fallBack} = action.payload || {};
    try{
        yield delay(500)
        const {data, statusText} = yield call(UserManagerAPI.getUser_from_UserManager, {page,limit, search, sort, fields });
        if(statusText === "OK"){
            yield put(UserManagerActions.getUser_from_UserManagerSuccess({data, searchText: search}));
        }
    }
    catch (error){
        yield put(UserManagerActions.getUser_from_UserManagerError(error));
        fallBack && fallBack(error);
    }
}

function* handle_Search_from_UserManagerRequest(action){
    const {page, limit, search, sort, fields, fallBack} = action.payload || {};
    try{
        yield delay(700);
        const {data, statusText} = yield call(UserManagerAPI.getUser_from_UserManager, {page, limit, search, sort, fields });
        if(statusText === "OK"){ 
            yield put(UserManagerActions.search_from_UserManagerSuccess({data})); // For suggestion form
          
        }
    } catch(error){
        yield put(UserManagerActions.search_from_UserManagerError(error));
    }

}

function* handle_Update_from_UserManagerRequest(action){
    const {user,  callBack, fallBack} = action.payload;
    try{
        const {data, statusText} = yield call(UserManagerAPI.updateUser_from_UserManager, user)
        if(statusText === "OK") {
            yield put(UserManagerActions.updateUser_from_UserManagerSuccess(data));
            callBack && callBack();
        }
    }
    catch (error){
        yield put(UserManagerActions.updateUser_from_UserManagerError(error));
        yield fallBack && fallBack();
    }
}

function* handle_DeleteUser_from_UserManagerRequest(action){
    const  {id, page, limit, callBack, fallBack}  = action.payload;    
    try{
        const {data, statusText} = yield call(UserManagerAPI.deleteUser_from_UserManager, {id, page, limit}); // id   
        if(statusText === "OK"){
            yield put(UserManagerActions.deleteUser_from_UserManagerSuccess({data, id}));
            callBack && callBack();
        }
    }
    catch (error){
        yield put(UserManagerActions.deleteUser_from_UserManagerError(error));
        fallBack && fallBack(error);
    }
}

function* handle_LockedAccount_from_UserManagerRequest(action)  {
    const {id, email, accountLockedUntil, active, isLock, callBack, fallBack} = action.payload;
    try{
        if(isLock === "lock"){
            yield call(UserManagerAPI.lockAccount_from_UserManager, {email, accountLockedUntil, active})
        } else {
            yield call(UserManagerAPI.unlockAccount_from_UserManager, {email, accountLockedUntil, active})
        }
        yield put(UserManagerActions.handlelockedAccount_from_UserManagerSuccess({id, active}));
        callBack && callBack();
    } catch(error) {
        yield put(UserManagerActions.handlelockedAccount_from_UserManagerError(error));
        fallBack && fallBack(error);
    }
}

function* getUser_from_UserManagerRequest() {
    yield takeEvery(UserManagerActions.getUser_from_UserManagerRequest, handle_GetUser_from_UserManagerRequest);
}

function* search_from_UserManagerRequest() {
    yield takeLatest(UserManagerActions.search_from_UserManagerRequest, handle_Search_from_UserManagerRequest);
}

function* updateUser_from_UserManagerRequest() {
    yield takeEvery(UserManagerActions.updateUser_from_UserManagerRequest, handle_Update_from_UserManagerRequest);
}

function* deleteUser_from_UserManagerRequest() {
    yield takeEvery(UserManagerActions.deleteUser_from_UserManagerRequest, handle_DeleteUser_from_UserManagerRequest);
}

function* handlelockedAccount_from_UserManagerRequest() {
    yield takeEvery(UserManagerActions.handlelockedAccount_from_UserManagerRequest, handle_LockedAccount_from_UserManagerRequest);
}

export default {
    getUser_from_UserManagerRequest,
    search_from_UserManagerRequest,
    updateUser_from_UserManagerRequest,
    deleteUser_from_UserManagerRequest,
    handlelockedAccount_from_UserManagerRequest
}