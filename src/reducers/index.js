import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';
import  authReducers from "../modules/Auth/reducers/authReducers";
import  userManagerReducer from "../modules/UserManager/reducers/UserManagerReducer";
import  userListReducer from "../modules/UserList/reducers/UserListReducer";
import  workManagerReducer from "../modules/WorkManager/reducers/WorkManagerReducer";
import userDetailReducers from "../modules/UserDetail/reducers/UserDetailReducer";
import modalPopupReducer from "./modalPopupReducer";
import { loadingReducer } from "./loadingReducer";
// const reducers = [
   
// ]
const rootReducer = combineReducers({
    authReducers,
    userManagerReducer,
    modalPopupReducer,
    userListReducer,
    workManagerReducer,
    userDetailReducers,
    loadingReducer,
    form: formReducer
})
export default rootReducer;

// export {
//     authReducers,
//     userManagerReducer
// };