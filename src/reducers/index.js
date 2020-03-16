import {combineReducers} from "redux";
import  authReducers from "../modules/Login/reducers/authReducers";

const reducers = [
    authReducers
]
const rootReducer = combineReducers({
    ...reducers
})

export default rootReducer;

export {
    authReducers
};