import {handleActions} from "redux-actions";
import UserModel from "../../../models/userModel";
import * as actions from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    currentUser: {}  
}

export default handleActions({
    [actions.checkLoggedInAccountRequest]: (state, action) => {
        return {
            ...state,
        }
    },
    [actions.checkLoggedInAccountSuccess]: (state, action) => {
        const user = new UserModel(action.payload);
        return {
            ...state,
            isAuthenticated: true,
            currentUser: user
        }
    },
    [actions.checkLoggedInAccountError]: (state, action) => {
        return initialState
    },
    [actions.signupAccountRequest]: (state, action) => {
        return {
            ...state,
        }
    },
    [actions.signupAccountSuccess]: (state, action) => {
        const user = new UserModel(action.payload);
        return {
            ...state,
            isAuthenticated: true,
            currentUser: user
        }
    },
    [actions.signupAccountError]: (state, action) => {
        return initialState
    },
    [actions.loginAccountRequest]: (state, action) => {
        return {
            ...state,
        }
    },
    [actions.loginAccountSuccess]: (state, action) => {
        const user = new UserModel(action.payload);
        return {
            ...state,
            isAuthenticated: true,
            currentUser: user
        }
    },
    [actions.loginAccountError]: (state, action) => {
        return initialState
    },

    [actions.logoutAccount]: (state, action) => {
        const { callBack } = action.payload;
        callBack && callBack();
        return initialState
    },
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