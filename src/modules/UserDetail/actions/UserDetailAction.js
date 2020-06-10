import { createAction } from "redux-actions";

const FETCH_USER_DETAIL_REQUEST = "FETCH_USER_DETAIL_REQUEST";
const FETCH_USER_DETAIL_SUCCESS = "FETCH_USER_DETAIL_SUCCESS";
const FETCH_USER_DETAIL_ERROR = "FETCH_USER_DETAIL_ERROR";

export const fetchUserDetailRequest = createAction(FETCH_USER_DETAIL_REQUEST);
export const fetchUserDetailSuccess = createAction(FETCH_USER_DETAIL_SUCCESS);
export const fetchUserDetailError = createAction(FETCH_USER_DETAIL_ERROR);