import { handleActions } from 'redux-actions';
import * as actions from "../actions/modalPopupAction";

const initialState = {
    isOpenModal: false,
    isAddUser: false
}

export default handleActions(
    {
        [actions.openModal]: (state, action) => {
            return {
                ...state,
                isOpenModal: action.payload
            }
        },
        [actions.hideModal]: (state, action) => {
            return {
                ...state,
                isOpenModal: action.payload
            }
        },
        [actions.addModal]: (state, action) => {
            return {
                ...state,
                isAddUser: action.payload
            }
        },
        [actions.editModal]: (state, action) => {
            return {
                ...state,
                isAddUser: action.payload
            }
        }
    },
    initialState
)