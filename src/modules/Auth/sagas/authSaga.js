import {takeEvery, call, put, delay} from "redux-saga/effects";
import * as authAPI from "../api/authAPI";
import {AuthActions} from "../../../actions/index";
import { setCookies } from "../../../utils/cookies";


function* handleCheckLoggedInRequest(action){
    const { fallBack } = action.payload;
    try {
        yield delay(1000);
        const { data: {user}, statusText } = yield call(authAPI.checkLoggedIn);
        if(statusText === "OK"){
            yield put(AuthActions.checkLoggedInAccountSuccess(user))
        }
    } catch (error) {
        yield put(AuthActions.checkLoggedInAccountError(error))
        if(error.response.status === 403) {
            fallBack && fallBack();
        }
    }
}

function* handleSignupAccountRequest(action){
    const { user: { name, email, password, passwordConfirm }, callBack, fallBack } = action.payload;

    try{
        const { data: { token, user }, statusText } = yield call(authAPI.signupAccount, { name, email, password, passwordConfirm });
        if(statusText === "Created"){
            yield put(AuthActions.signupAccountSuccess(user));
            setCookies({name: "user_token", value: token});
            callBack && callBack();
        }
    } catch(error){
        yield put(AuthActions.signupAccountError(error));
        fallBack && fallBack(error);
    }
}

function* handleLoginAccountRequest(action){
    const { user: {  email, password }, callBack, fallBack } = action.payload;

    try{
        const { data: { token, user }, statusText } = yield call(authAPI.loginAccount, {  email, password });
        if(statusText === "OK"){
            yield put(AuthActions.loginAccountSuccess(user));
            setCookies({name: "user_token", value: token});
            callBack && callBack();
        }
    } catch(error){
        yield put(AuthActions.loginAccountError(error));
        fallBack && fallBack(error);
    }
}

function* signupAccountRequest(){
    yield takeEvery(AuthActions.signupAccountRequest, handleSignupAccountRequest);
}

function* loginAccountRequest(){
    yield takeEvery(AuthActions.loginAccountRequest, handleLoginAccountRequest);
}

function* checkLoggedInAccountRequest(){
    yield takeEvery(AuthActions.checkLoggedInAccountRequest, handleCheckLoggedInRequest);
}
// function* handleCreateUserAccountRequest(action){
//     const {data, statusText} = yield call(authAPI.createUserAccount, action.payload)
// } 

// function* handleFetchSpecificUserProfileRequest(action){
//     const userUID = action.payload;
//     try{
//         const {data, statusText} = yield call(authAPI.fetchSpecificUserProfile, userUID);
//         if(statusText === "OK"){
//             yield put(AuthActions.fetchSpecificUserProfileSuccess(data));
//         }
//     }
//     catch (error) {
//         yield put(AuthActions.fetchSpecificUserProfileError(error));
//     }
// }

// function* fetchSpecificUserProfileRequest(){
//     yield takeEvery(AuthActions.fetchSpecificUserProfileRequest, handleFetchSpecificUserProfileRequest);
// }

// function* createUserAccountRequest(){
//    yield takeEvery(AuthActions.createUserAccountRequest, handleCreateUserAccountRequest)
// }

export default {
    signupAccountRequest,
    loginAccountRequest,
    checkLoggedInAccountRequest
}