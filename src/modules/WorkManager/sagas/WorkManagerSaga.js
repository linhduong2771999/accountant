import {call, put, takeEvery} from "redux-saga/effects";
import { WorkManagerActions } from "../../../actions/index";
import * as WorkManagerAPI from "../api/WorkManagerAPI";


function* handleFetchUserWorkManagerRequest(){
    try{
        const {data, statusText} = yield call(WorkManagerAPI.getUserWorkManager);
        if(statusText === "OK"){
            yield put(WorkManagerActions.fetchUserWorkManagerSuccess(data));
        }
    }
    catch (error){
        yield put(WorkManagerActions.fetchUserWorkManagerError(error))
    }
}

function* handleFetchOneUserWorkManagerRequest(action){
    try{        
        const {data, statusText} = yield call(WorkManagerAPI.getOneUserWorkManager, action.payload);
        if(statusText === "OK"){
            yield put(WorkManagerActions.fetchOneUserWorkManagerSuccess(data));
        }
    }
    catch (error){
        yield put(WorkManagerActions.fetchOneUserWorkManagerError(error))
    }
}

function* handleCreateTaskWorkManagerRequest(action){
    const {taskInfo, id, callBack, fallBack} = action.payload;
    try{
        const {statusText} = yield call(WorkManagerAPI.createTaskWorkManager, id, taskInfo)
        if(statusText === "OK") {
            yield put(WorkManagerActions.createTaskWorkManagerSuccess(action.payload));
            callBack && callBack();
        }
    }
    catch(error){
        yield put(WorkManagerActions.createTaskWorkManagerError(error))
        fallBack && fallBack();
    }
}

function* handleUpdateTaskWorkManagerRequest(action){
    const {id, taskInfo, callBack, fallBack} = action.payload;
    console.log(taskInfo.taskId);
    
    try{
        const {statusText} = yield call(WorkManagerAPI.updateTaskWorkManager, id , taskInfo);
        if(statusText === "OK"){
            yield put(WorkManagerActions.updateTaskWorkManagerSuccess(action.payload));
            callBack && callBack();
        }
    }
    catch(error){
        yield put(WorkManagerActions.updateTaskWorkManagerError(error));
        fallBack && fallBack();
    }
}

function* handleDeleteAllTaskWorkManagerRequest(action){
    try {
        const {statusText} =  yield call(WorkManagerAPI.deleteAllTaskWorkManager, action.payload); // truyền vào id
        if(statusText === "OK"){
            yield put(WorkManagerActions.deleteAllTaskWorkManagerSuccess(action.payload))
        }
    }
    catch(error){
        yield put(WorkManagerActions.deleteAllTaskWorkManagerError(error));
    }
}

function* handleDeleteOneTaskWorkManagerRequest(action){
    const {userId, taskId} = action.payload;
    try{
        const { statusText } = yield call(WorkManagerAPI.deleteOneTaskWorkManager, userId, taskId);
        if(statusText === "OK"){
            yield put(WorkManagerActions.deleteOneTaskWorkManagerSuccess(action.payload)) // truyền vào object userId vs taskId
        }
    }
    catch(error){
        yield put(WorkManagerActions.deleteOneTaskWorkManagerError(error));
    }
}

function* fetchUserWorkManagerRequest(){
    yield takeEvery(WorkManagerActions.fetchUserWorkManagerRequest, handleFetchUserWorkManagerRequest)
}

function* fetchOneUserWorkManagerRequest(){
    yield takeEvery(WorkManagerActions.fetchOneUserWorkManagerRequest, handleFetchOneUserWorkManagerRequest)
}

function* createTaskWorkManagerRequest(){
    yield takeEvery(WorkManagerActions.createTaskWorkManagerRequest, handleCreateTaskWorkManagerRequest)
}

function* updateTaskWorkManagerRequest(){
    yield takeEvery(WorkManagerActions.updateTaskWorkManagerRequest, handleUpdateTaskWorkManagerRequest);
}

function* deleteOneTaskWorkManager(){
    yield takeEvery(WorkManagerActions.deleteOneTaskWorkManagerRequest, handleDeleteOneTaskWorkManagerRequest)
}

function* deleteAllTaskWorkManagerRequest(){
    yield takeEvery(WorkManagerActions.deleteAllTaskWorkManagerRequest, handleDeleteAllTaskWorkManagerRequest)
}

export default {
    fetchUserWorkManagerRequest,
    fetchOneUserWorkManagerRequest,
    createTaskWorkManagerRequest,
    updateTaskWorkManagerRequest,
    deleteOneTaskWorkManager,
    deleteAllTaskWorkManagerRequest
}