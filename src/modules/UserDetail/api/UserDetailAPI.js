import callAPI from "../../../helpers/callAPI";

export const getUserDetail = (id) => {    
    return callAPI(`user/${id}`, "GET", null);
} 