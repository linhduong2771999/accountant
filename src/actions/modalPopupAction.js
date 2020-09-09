import {createAction} from "redux-actions";

const OPEN_MODAL = "OPEN_MODAL";
const HIDE_MODAL = "HIDE_MODAL";

export const openModal = createAction(OPEN_MODAL);
export const hideModal = createAction(HIDE_MODAL);