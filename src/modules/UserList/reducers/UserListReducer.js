import {handleActions} from "redux-actions";
import * as actions from "../actions/UserListAction";

const initialState = {
    userList: [],
    isLoading: false,
    searchText: ""
}

export default handleActions(
    {
        [actions.fetchUserListRequest]: (state , action) => {
            return {
                ...state,
                isLoading: true
            }
        },
        [actions.fetchUserListSuccess]: (state , action) => {
            const {payload} = action;
            if(payload){
                const data = Object.values(payload)
                return {
                    ...state,
                    isLoading: false,
                    userList: [...data]
                }
            }
            else{
                return {
                    ...state,
                    isLoading: false
                }
            }
        },
        [actions.fetchUserListError]: (state , action) => {
            return {
                ...state,
                isLoading:false
            }
        },
        [actions.searchUserList]: (state, action) => {
            return {
                ...state,
                searchText: action.payload
            }
        }
    },
    initialState
)