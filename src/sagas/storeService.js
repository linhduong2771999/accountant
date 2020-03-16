import { store as reduxStore } from "../index";
import {get} from "lodash";
export const getGlobalState = () => {
    return reduxStore.getState() 
}

export const getSpecificState = (name) => {
    return get(getGlobalState, name);
}