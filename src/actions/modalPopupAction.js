import {createAction} from "redux-actions";

const OPEN_MODAL = "OPEN_MODAL";
const HIDE_MODAL = "HIDE_MODAL";

export const openModal = createAction(OPEN_MODAL);
export const hideModal = createAction(HIDE_MODAL);

const ADD_MODAL = "ADD_MODAL";
const EDIT_MODAL = "EDIT_MODAL";

export const addModal = createAction(ADD_MODAL);
export const editModal = createAction(EDIT_MODAL);