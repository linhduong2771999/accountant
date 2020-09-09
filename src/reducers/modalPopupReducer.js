import { handleActions } from 'redux-actions';
import * as actions from "../actions/modalPopupAction";

const initialState = {
    isOpen: false,
    popupName: undefined,
    popupProps: null
}

export default handleActions(
    {
        [actions.openModal]: (state, action) => {
            const { popupName, popupProps } = action.payload || {};
            return {
                ...state,
                isOpen: true,
                popupName,
                popupProps
            }
        },
        [actions.hideModal]: (state, action) => {
            return initialState
        }
    },
    initialState
)