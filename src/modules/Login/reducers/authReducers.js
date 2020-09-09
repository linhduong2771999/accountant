import {handleActions} from "redux-actions";
import * as actions from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    userProfile: {}    
}

export default handleActions({
    // [actions.loginAccountSuccess]: (state, action) => {
    //     return {...state,
    //         isAuthenticated: action.payload
    //     }
    // },
    // [actions.fetchSpecificUserProfileRequest]: (state, action) => {
    //     return {
    //         ...state
    //     }
    // },
    // [actions.fetchSpecificUserProfileSuccess]: (state, action) => {
    //     if(action.payload){            
    //         return {
    //             ...state,
    //             userProfile: {...action.payload}
    //         }
    //     }
    // },
    // [actions.fetchSpecificUserProfileError]: (state, action) => {
    //     return {
    //         ...state
    //     }
    // }
}, initialState)