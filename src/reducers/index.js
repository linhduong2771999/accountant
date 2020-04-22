import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';
import  authReducers from "../modules/Login/reducers/authReducers";
import  userManagerReducer from "../modules/UserManager/reducers/UserManagerReducer";
import modalPopupReducer from "./modalPopupReducer";
// const reducers = [
   
// ]
const rootReducer = combineReducers({
    authReducers,
    userManagerReducer,
    modalPopupReducer,
    form: formReducer
})
export default rootReducer;

// export {
//     authReducers,
//     userManagerReducer
// };