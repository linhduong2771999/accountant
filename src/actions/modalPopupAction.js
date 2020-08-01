import {createAction} from "redux-actions";

const OPEN_MODAL = "OPEN_MODAL";
const HIDE_MODAL = "HIDE_MODAL";

export const openModal = createAction(OPEN_MODAL);
export const hideModal = createAction(HIDE_MODAL);

const IS_ADD_MODAL = "IS_ADD_MODAL";

export const isAddModal = createAction(IS_ADD_MODAL);