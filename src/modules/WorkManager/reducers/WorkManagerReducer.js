import { handleActions } from "redux-actions";
import * as actions from "../actions/WorkManagerAction";

const initialState = {
    userList: [],
    searchText: "",
    isLoading: false,
    oneUser: {},
    userById: {},
    taskById: {}
}

export default handleActions(
    {
        [actions.fetchUserWorkManagerRequest]: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
        [actions.fetchUserWorkManagerSuccess]: (state, action) => {
            const {payload} = action;
            if(payload){
                const userArray = Object.values(payload); // đổi 1 dãy đối tượng thành mảng
                userArray.forEach((user) => {
                    if(user.task){
                        const taskArray = Object.values(user.task);
                        user.task = taskArray
                    }
                })  
                return {
                    ...state,
                    userList: [...userArray],
                    isLoading: false
                }
            }
        },
        [actions.fetchUserWorkManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false
            }
        },
        [actions.getUserByIdWorkManager]: (state, action) => {
            return {
                ...state,
                userById: action.payload
            }
        },
        [actions.getTaskByIdWorkManager]: (state, action) => {
            return {
                ...state,
                taskById: {...action.payload}
            }
        },
        [actions.searchUserWorkManager]: (state, action) => {
            return {
                ...state,
                searchText: action.payload
            }
        },
        [actions.fetchOneUserWorkManagerRequest]: (state, action) => {
            return {
                ...state
            }
        },
        [actions.fetchOneUserWorkManagerSuccess]: (state, action) => {
            return {
                ...state,
                oneUser: {...action.payload}
            }
        },
        [actions.fetchOneUserWorkManagerError]: (state, action) => {
            return {
                ...state
            }
        },
        [actions.createTaskWorkManagerRequest]: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
        [actions.createTaskWorkManagerSuccess]: (state, action) => {
            const {taskInfo, id } = action.payload
            const temp = state.userList;
            temp.forEach((user) => {
                if(user.id === id){
                    user.task = Object.values({...user.task, taskInfo});
                }
            })
            return {
                ...state,
                isLoading: false,
                userList: [...temp]
            }
        },
        [actions.createTaskWorkManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false
            }
        },
        [actions.updateTaskWorkManagerRequest]: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
        [actions.updateTaskWorkManagerSuccess]: (state, action) => {
            const {taskInfo, id} = action.payload;            
            const temp = state.userList;
            temp.forEach((user) => {
                if(user.id === id){
                    const taskArray = Object.values(user.task); // đổi dãy đối tượng sang mảng để loop 
                    const index = taskArray.findIndex((task) => task.taskId === taskInfo.taskId);
                    taskArray[index] = taskInfo;
                    user.task = taskArray;
                }
            })
            return {
                ...state,
                isLoading: false,
                userList: [...temp]
            }
        },
        [actions.updateTaskWorkManagerError]: (state, action) => {
            return {
                ...state,
                isLoading: false
            }
        },
        [actions.deleteOneTaskWorkManagerRequest]: (state, action) => {
            return {
                ...state
            }
        },
        [actions.deleteOneTaskWorkManagerSuccess]: (state, action) => {
            const {userId, taskId } = action.payload;
            const temp = state.userList;
            temp.forEach((user) => {
                if(user.id === userId){
                    const taskArray = Object.values(user.task); // đổi dãy đối tượng sang mảng để loop 
                    const index = taskArray.findIndex((task) => task.taskId === taskId);
                    taskArray.splice(index, 1);
                    if(taskArray.length > 0){
                        user.task = taskArray
                    }else {
                        user.task = false;
                    }
                }
            })
            return {
                ...state,
                userList: [...temp]
            }
        },
        [actions.deleteOneTaskWorkManagerError]: (state, action) => {
            return {
                ...state
            }
        },
        [actions.deleteAllTaskWorkManagerRequest]: (state, action) => {
            return {
                ...state
            }
        },
        [actions.deleteAllTaskWorkManagerSuccess]: (state, action) => {
            const id = action.payload;
            const temp = state.userList;
            const index = temp.findIndex((item) => item.id === id);
            temp[index].task = null;
            return {
                ...state,
                userList: [...temp]
            }
        },
        [actions.deleteAllTaskWorkManagerError]: (state, action) => {
            return {
                ...state
            }
        }
    },
    initialState
)