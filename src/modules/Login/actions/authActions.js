import {createAction} from "redux-actions";

const LOGIN_ACCOUNT_SUCCESS =  "LOGIN_ACCOUNT_SUCCESS";
const LOGIN_ACCOUNT_FAILED = "LOGIN_ACCOUNT_FAILED";

export const loginAccountSuccess = createAction(LOGIN_ACCOUNT_SUCCESS);
export const loginAccountFailed = createAction(LOGIN_ACCOUNT_FAILED);