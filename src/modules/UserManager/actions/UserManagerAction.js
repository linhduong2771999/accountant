import {createAction} from "redux-actions";

const FETCH_USER_MANAGER_REQUEST = "FETCH_USER_MANAGER_REQUEST";
const FETCH_USER_MANAGER_SUCCESS = "FETCH_USER_MANAGER_SUCCESS";
const FETCH_USER_MANAGER_ERROR = "FETCH_USER_MANAGER_ERROR";

export const fetchUserManagerRequest = createAction(FETCH_USER_MANAGER_REQUEST);
export const fetchUserManagerSuccess = createAction(FETCH_USER_MANAGER_SUCCESS);
export const fetchUserManagerError = createAction(FETCH_USER_MANAGER_ERROR);

const FETCH_ONE_USER_MANAGER_REQUEST = "FETCH_ONE_USER_MANAGER_REQUEST";
const FETCH_ONE_USER_MANAGER_SUCCESS = "FETCH_ONE_USER_MANAGER_SUCCESS";
const FETCH_ONE_USER_MANAGER_ERROR = "FETCH_ONE_USER_MANAGER_ERROR";

export const fetchOneUserManagerRequest = createAction(FETCH_ONE_USER_MANAGER_REQUEST);
export const fetchOneUserManagerSuccess = createAction(FETCH_ONE_USER_MANAGER_SUCCESS);
export const fetchOneUserManagerError = createAction(FETCH_ONE_USER_MANAGER_ERROR);


const CREATE_USER_MANAGER_REQUEST = "CREATE_USER_MANAGER_REQUEST";
const CREATE_USER_MANAGER_SUCCESS = "CREATE_USER_MANAGER_SUCCESS";
const CREATE_USER_MANAGER_ERROR = "CREATE_USER_MANAGER_ERROR";

export const createUserManagerRequest = createAction(CREATE_USER_MANAGER_REQUEST);
export const createUserManagerSuccess = createAction(CREATE_USER_MANAGER_SUCCESS);
export const createUserManagerError = createAction(CREATE_USER_MANAGER_ERROR);

const UPDATE_USER_MANAGER_REQUEST = "UPDATE_USER_MANAGER_REQUEST";
const UPDATE_USER_MANAGER_SUCCESS = "UPDATE_USER_MANAGER_SUCCESS";
const UPDATE_USER_MANAGER_ERROR = "UPDATE_USER_MANAGER_ERROR";

export const updateUserManagerRequest = createAction(UPDATE_USER_MANAGER_REQUEST);
export const updateUserManagerSuccess = createAction(UPDATE_USER_MANAGER_SUCCESS);
export const updateUserManagerError = createAction(UPDATE_USER_MANAGER_ERROR);

const DELETE_USER_MANAGER_REQUEST = "DELETE_USER_MANAGER_REQUEST";
const DELETE_USER_MANAGER_SUCCESS = "DELETE_USER_MANAGER_SUCCESS";
const DELETE_USER_MANAGER_ERROR = "DELETE_USER_MANAGER_ERROR";

export const deleteUserManagerRequest = createAction(DELETE_USER_MANAGER_REQUEST);
export const deleteUserManagerSuccess = createAction(DELETE_USER_MANAGER_SUCCESS);
export const deleteUserManagerError = createAction(DELETE_USER_MANAGER_ERROR);

const SEARCH_USER_MANAGER = "SEARCH_USER_MANAGER";

export const searchUserManager = createAction(SEARCH_USER_MANAGER);