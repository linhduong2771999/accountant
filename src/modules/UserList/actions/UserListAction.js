import {createAction} from "redux-actions";

const FETCH_USER_LIST_REQUEST = "FETCH_USER_LIST_REQUEST";
const FETCH_USER_LIST_SUCCESS = "FETCH_USER_LIST_SUCCESS";
const FETCH_USER_LIST_ERROR = "FETCH_USER_LIST_ERROR";

export const fetchUserListRequest = createAction(FETCH_USER_LIST_REQUEST);
export const fetchUserListSuccess = createAction(FETCH_USER_LIST_SUCCESS);
export const fetchUserListError = createAction(FETCH_USER_LIST_ERROR);


const SEARCH_USER_LIST = "SEARCH_USER_LIST";

export const searchUserList = createAction(SEARCH_USER_LIST);