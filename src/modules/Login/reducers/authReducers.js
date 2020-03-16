import {handleActions} from "redux-actions";
import * as actions from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    user: ""
}

export default handleActions({
    [actions.loginAccountSuccess]: (state, action) => {
        return {...state,
            isAuthenticated: action.payload
        }
    }
}, initialState)