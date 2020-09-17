import {createAction} from "redux-actions";

const CHECK_LOGGED_IN_ACCOUNT_REQUEST = "CHECK_LOGGED_IN_ACCOUNT_REQUEST";
const CHECK_LOGGED_IN_ACCOUNT_SUCCESS =  "CHECK_LOGGED_IN_ACCOUNT_SUCCESS";
const CHECK_LOGGED_IN_ACCOUNT_ERROR = "CHECK_LOGGED_IN_ACCOUNT_ERROR";

export const checkLoggedInAccountRequest = createAction(CHECK_LOGGED_IN_ACCOUNT_REQUEST);
export const checkLoggedInAccountSuccess = createAction(CHECK_LOGGED_IN_ACCOUNT_SUCCESS);
export const checkLoggedInAccountError = createAction(CHECK_LOGGED_IN_ACCOUNT_ERROR);

const LOGIN_ACCOUNT_REQUEST = "LOGIN_ACCOUNT_REQUEST";
const LOGIN_ACCOUNT_SUCCESS =  "LOGIN_ACCOUNT_SUCCESS";
const LOGIN_ACCOUNT_ERROR = "LOGIN_ACCOUNT_ERROR";

export const loginAccountRequest = createAction(LOGIN_ACCOUNT_REQUEST);
export const loginAccountSuccess = createAction(LOGIN_ACCOUNT_SUCCESS);
export const loginAccountError = createAction(LOGIN_ACCOUNT_ERROR);

const SIGNUP_ACCOUNT_REQUEST = "SIGNUP_ACCOUNT_REQUEST";
const SIGNUP_ACCOUNT_SUCCESS =  "SIGNUP_ACCOUNT_SUCCESS";
const SIGNUP_ACCOUNT_ERROR = "SIGNUP_ACCOUNT_ERROR";

export const signupAccountRequest = createAction(SIGNUP_ACCOUNT_REQUEST);
export const signupAccountSuccess = createAction(SIGNUP_ACCOUNT_SUCCESS);
export const signupAccountError = createAction(SIGNUP_ACCOUNT_ERROR);

const LOG_OUT_ACCOUNT = "LOG_OUT_ACCOUNT";

export const logoutAccount = createAction(LOG_OUT_ACCOUNT);

// const FETCH_SPECIFIC_USER_PROFILE_REQUEST = "FETCH_SPECIFIC_USER_PROFILE_REQUEST";
// const FETCH_SPECIFIC_USER_PROFILE_SUCCESS = "FETCH_SPECIFIC_USER_PROFILE_SUCCESS";
// const FETCH_SPECIFIC_USER_PROFILE_ERROR = "FETCH_SPECIFIC_USER_PROFILE_ERROR";

// export const fetchSpecificUserProfileRequest =  createAction(FETCH_SPECIFIC_USER_PROFILE_REQUEST); 
// export const fetchSpecificUserProfileSuccess =  createAction(FETCH_SPECIFIC_USER_PROFILE_SUCCESS); 
// export const fetchSpecificUserProfileError =  createAction(FETCH_SPECIFIC_USER_PROFILE_ERROR); 

// const CREATE_USER_ACCOUNT_REQUEST = "CREATE_USER_ACCOUNT_REQUEST";
// const CREATE_USER_ACCOUNT_SUCCESS = "CREATE_USER_ACCOUNT_SUCCESS";
// const CREATE_USER_ACCOUNT_ERROR = "CREATE_USER_ACCOUNT_ERROR";

// export const createUserAccountRequest =  createAction(CREATE_USER_ACCOUNT_REQUEST); 
// export const createUserAccountSuccess =  createAction(CREATE_USER_ACCOUNT_SUCCESS); 
// export const createUserAccountError =  createAction(CREATE_USER_ACCOUNT_ERROR); 