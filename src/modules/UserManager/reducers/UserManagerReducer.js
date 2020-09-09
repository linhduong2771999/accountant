import { handleActions } from 'redux-actions';
import * as actions from '../actions/UserManagerAction';
import UserFactory from "../../../models/userModel";

const initialState = {
    usersList: {
        usersListTable: [],
        usersListSuggestionForm: []
    },
    pagination: {},
    searchText: "",
    loading: {
        loadingTable: false,
        loadingSuggestionForm: false
    },
    error: {}
}

export default handleActions(
    {
        /**********************GET USER REDUCER*********************/
        [actions.getUser_from_UserManagerRequest]: (state, action) => {
            return handleGetUser_from_UserManagerRequest(state, action)
        },
        [actions.getUser_from_UserManagerSuccess]: (state, action) => {
            return handleGetUser_from_UserManagerSuccess(state, action)
        },
        [actions.getUser_from_UserManagerError]: (state, action) => {
            return handleGetUser_from_UserManagerError(state, action)
        },
        /**********************SEARCH REDUCER*********************/
        [actions.search_from_UserManagerRequest]: (state, action) => {
            return handleSearch_from_UserManagerRequest(state, action)
        },
        [actions.search_from_UserManagerSuccess]: (state, action) => {
            return handleSearch_from_UserManagerSuccess(state, action)
        },
        [actions.search_from_UserManagerError]: (state, action) => {
            return handleSearch_from_UserManagerError(state, action)
        },
        /**********************UPDATE USER REDUCER*********************/
        [actions.updateUser_from_UserManagerRequest]: (state, action) => {
            return handleUpdateUser_from_UserManagerRequest(state, action)
        },
        [actions.updateUser_from_UserManagerSuccess]: (state, action) => {
            return handleUpdateUser_from_UserManagerSuccess(state, action)
        },
        [actions.updateUser_from_UserManagerError]: (state, action) => {
            return handleUpdateUser_from_UserManagerError(state, action)
        },
        /**********************DELETE USER REDUCER*********************/
        [actions.deleteUser_from_UserManagerRequest]: (state, action) => {
            return handleDeleteUser_from_UserManagerRequest(state, action)
        },
        [actions.deleteUser_from_UserManagerSuccess]: (state, action) => {
            return handleDeleteUser_from_UserManagerSuccess(state, action)
        },
        [actions.deleteUser_from_UserManagerError]: (state, action) => {
            return handleDeleteUser_from_UserManagerError(state, action)
        },
        /**********************LOCK USER REDUCER*********************/
        [actions.handlelockedAccount_from_UserManagerRequest]: (state, action) => {
            return handleLockedAccount_from_UserManagerRequest(state, action)
        },
        [actions.handlelockedAccount_from_UserManagerSuccess]: (state, action) => {
            return handleLockedAccount_from_UserManagerSuccess(state, action)
        },
        [actions.handlelockedAccount_from_UserManagerError]: (state, action) => {
            return handleLockedAccount_from_UserManagerError(state, action)
        }
    },
    initialState
)

/***************************HANDLER FOR GET API***************************/
const handleGetUser_from_UserManagerRequest = (state, action) => {
    return{
        ...state
    }
}

const handleGetUser_from_UserManagerSuccess = (state, action) => {
    const {data: {users, currentPage, totalPage, results}, searchText} = action.payload;
    let temp = users.map((item) => new UserFactory(item));
    return {
        ...state,
        usersList: {
            ...state.usersList,
            usersListTable: temp
        },
        searchText,
        pagination: {
            currentPage,
            totalPage,
            results
        }
    }
}

const handleGetUser_from_UserManagerError = (state, action) => {
    return{
        ...state,
        error: action.payload
    }
}

/***************************HANDLER FOR SEARCH API***************************/
const handleSearch_from_UserManagerRequest = (state, action) => {
    return {
        ...state
    }
}



const handleSearch_from_UserManagerSuccess = (state, action) => {
    const {data: {users}} = action.payload;
    let temp = users.map((item) => new UserFactory(item));

    return {
        ...state,
        usersList: {
            ...state.usersList,
            usersListSuggestionForm: temp
        }
    }
}

const handleSearch_from_UserManagerError = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

/***************************HANDLER FOR UPDATE API***************************/
const handleUpdateUser_from_UserManagerRequest = (state, action) => {
    return {
        ...state
    }
}



const handleUpdateUser_from_UserManagerSuccess = (state, action) => {
    const {data} = action.payload;
    const {usersList: {usersListTable}} = state;
    const user = new UserFactory(data);
    let temp =  usersListTable.findIndex((item) => item.id === user.id);
    usersListTable[temp] = user;
    return {
        ...state,
        usersList: {
            ...state.usersList,
            usersListTable: [...usersListTable]
        }
    }
}

const handleUpdateUser_from_UserManagerError = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

/***************************HANDLER FOR DELETE API***************************/
const handleDeleteUser_from_UserManagerRequest = (state, action) => {
    return {
        ...state
    }
}



const handleDeleteUser_from_UserManagerSuccess = (state, action) => {
    const {data: {currentPage, totalPage, results}, id} = action.payload;
    let temp = [];
    temp = state.usersList.usersListTable.filter(tmp => tmp.id !== id)
    return {
        ...state,
        usersList: {
            ...state.usersList,
            usersListTable: [...temp]
        },
        pagination: {
            currentPage,
            totalPage,
            results: results
        }
    }
}

const handleDeleteUser_from_UserManagerError = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

/***************************HANDLER FOR LOCK API***************************/
const handleLockedAccount_from_UserManagerRequest = (state, action) => {
    return {
        ...state
    }
}



const handleLockedAccount_from_UserManagerSuccess = (state, action) => {
    const {usersList: {usersListTable}} = state;
    const { id, active} = action.payload;
    let index = usersListTable.findIndex(item => item.id === id);

    usersListTable[index].active = active; 
    return {
        ...state,
        usersList: {
            ...state.usersList,
            usersListTable: [...usersListTable]
        }
    }
}

const handleLockedAccount_from_UserManagerError = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}