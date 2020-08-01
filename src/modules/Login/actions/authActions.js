import {createAction} from "redux-actions";

const LOGIN_ACCOUNT_SUCCESS =  "LOGIN_ACCOUNT_SUCCESS";
const LOGIN_ACCOUNT_FAILED = "LOGIN_ACCOUNT_FAILED";

export const loginAccountSuccess = createAction(LOGIN_ACCOUNT_SUCCESS);
export const loginAccountFailed = createAction(LOGIN_ACCOUNT_FAILED);

const FETCH_SPECIFIC_USER_PROFILE_REQUEST = "FETCH_SPECIFIC_USER_PROFILE_REQUEST";
const FETCH_SPECIFIC_USER_PROFILE_SUCCESS = "FETCH_SPECIFIC_USER_PROFILE_SUCCESS";
const FETCH_SPECIFIC_USER_PROFILE_ERROR = "FETCH_SPECIFIC_USER_PROFILE_ERROR";

export const fetchSpecificUserProfileRequest =  createAction(FETCH_SPECIFIC_USER_PROFILE_REQUEST); 
export const fetchSpecificUserProfileSuccess =  createAction(FETCH_SPECIFIC_USER_PROFILE_SUCCESS); 
export const fetchSpecificUserProfileError =  createAction(FETCH_SPECIFIC_USER_PROFILE_ERROR); 

const CREATE_USER_ACCOUNT_REQUEST = "CREATE_USER_ACCOUNT_REQUEST";
const CREATE_USER_ACCOUNT_SUCCESS = "CREATE_USER_ACCOUNT_SUCCESS";
const CREATE_USER_ACCOUNT_ERROR = "CREATE_USER_ACCOUNT_ERROR";

export const createUserAccountRequest =  createAction(CREATE_USER_ACCOUNT_REQUEST); 
export const createUserAccountSuccess =  createAction(CREATE_USER_ACCOUNT_SUCCESS); 
export const createUserAccountError =  createAction(CREATE_USER_ACCOUNT_ERROR); 