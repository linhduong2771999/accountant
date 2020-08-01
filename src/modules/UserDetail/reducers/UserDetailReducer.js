import {handleActions } from "redux-actions";
import * as actions from "../actions/UserDetailAction";

const initialState = {
    userDetail: {}
} 
export default handleActions(
    {
        [actions.fetchUserDetailRequest]: (state, action) => {
            return {
                ...state
            }
        },
        [actions.fetchUserDetailSuccess]: (state, action) => {
            const user = action.payload;
            if(user.task){
                const taskArray = Object.values(user.task);
                user.task = taskArray;
            }
            return {
                ...state,
                userDetail: {...user}
            }
        },
        [actions.fetchUserDetailError]: (state, action) => {
            return {
                ...state
            }
        }
    },
    initialState   
)