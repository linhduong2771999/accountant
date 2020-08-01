import { handleActions } from 'redux-actions';
import * as actions from '../actions/UserManagerAction';

const initialState = {
    userList: [],
    userById: {
        userUID: ""
    },
    isLoading: false,
    searchText: "",
    sortArray: []
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
            const {payload} = action; // payload = user
            if(payload){
                const data = Object.values(payload) // chuyển dãy đối tượng thành mảng
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
        [actions.fetchUserManagerError]: (state, action) => {
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
            const index = temp.findIndex((item) => item.userUID === payload.userUID);
            temp[index] = {...payload};
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
        [actions.getUserByIdUserManager]: (state, action) => {
            const userUID = action.payload;
            const temp = state.userList;
            const index = temp.findIndex((user) => user.userUID === userUID);
            let data = state.userById;
            if(temp[index]){
                data = temp[index] 
            }            
            return {
                ...state,
                userById: data
            }
        },  
        [actions.searchUserManager]: (state, action) => {
            return {
                ...state,
                searchText: action.payload
            }
        },
        [actions.sortUserManager]: (state, action) => {
            return {
                ...state,
                sortArray: action.payload
            }
        }
    },
    initialState
)