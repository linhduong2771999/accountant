import { handleActions } from 'redux-actions';
import * as actions from '../actions/UserManagerAction';

const initialState = {
    userList: [],
    oneUser: {
        id:""
    },
    isLoading: false,
    searchText: ""
}

export default handleActions(
    {
        [actions.fetchUserManagerRequest]: (state, action) => {
            return{
                ...state,
                isLoading: true
            }
        },
        [actions.fetchUserManagerSuccess]: (state, action) => {
            const {payload} = action;
            const data = Object.values(payload)
            return {
                ...state,
                isLoading: false,
                userList: [...data]
            }
        },
        [actions.fetchUserManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false
            }
        },
        [actions.fetchOneUserManagerRequest]: (state, action) => {
            return{
                ...state,
                isLoading: true
            }
        },
        [actions.fetchOneUserManagerSuccess]: (state, action) => {
            const {payload} = action;
            return {
                ...state,
                isLoading: false,
                oneUser: {...payload}
            }
        },
        [actions.fetchOneUserManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false
            }
        },
        [actions.createUserManagerRequest]: (state, action) => {
            return{
                ...state,
                isLoading: true
            }
        },
        [actions.createUserManagerSuccess]: (state, action) => {
            const {payload} = action;
            const data = [...state.userList, payload]
            return {
                ...state,
                isLoading: false,
                userList: [...data]
            }
        },
        [actions.createUserManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false,
            }
        },
        [actions.updateUserManagerRequest]: (state, action) => {
            return{
                ...state,
                isLoading: true
            }
        },
        [actions.updateUserManagerSuccess]: (state, action) => {
            const {payload} = action;
            const temp = state.userList;
            const index = temp.findIndex((item) => item.id === payload.id);
            temp[index] = payload;
            return {
                ...state,
                isLoading: false,
                userList: [...temp]
            }
        },
        [actions.updateUserManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false,
            }
        },
        [actions.deleteUserManagerRequest]: (state, action) => {
            return{
                ...state,
                isLoading: true
            }
        },
        [actions.deleteUserManagerSuccess]: (state, action) => {
            const {payload} = action;
            const data = state.userList.filter(item => item.id !== payload.id);
            return {
                ...state,
                isLoading: false,
                userList: [...data]
            }
        },
        [actions.deleteUserManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false,
            }
        },
        [actions.searchUserManager]: (state, action) => {
            return {
                ...state,
                searchText: action.payload
            }
        }
    },
    initialState
)