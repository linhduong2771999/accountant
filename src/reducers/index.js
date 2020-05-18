import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';
import  authReducers from "../modules/Login/reducers/authReducers";
import  userManagerReducer from "../modules/UserManager/reducers/UserManagerReducer";
import  userListReducer from "../modules/UserList/reducers/UserListReducer";
import  workManagerReducer from "../modules/WorkManager/reducers/WorkManagerReducer";
import modalPopupReducer from "./modalPopupReducer";
// const reducers = [
   
// ]
const rootReducer = combineReducers({
    authReducers,
    userManagerReducer,
    modalPopupReducer,
    userListReducer,
    workManagerReducer,
    form: formReducer
})
export default rootReducer;

// export {
//     authReducers,
//     userManagerReducer
// };