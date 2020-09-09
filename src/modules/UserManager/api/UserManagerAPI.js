import callAPI from "../../../helpers/callAPI";
import {TYPE, MODAL} from "../../../helpers/constant";
export const getUser_from_UserManager = ({page = 1, limit = 10, search = "", sort = "", fields = "" }) => {
    return callAPI(TYPE.GET, MODAL.LIST, `users?page=${page}&limit=${limit}&search=${search}&sort=${sort}&fields=${fields}`, "GET", null);
}

export const updateUser_from_UserManager = (user) => {
    return callAPI(TYPE.UPDATE, MODAL.USER, `users/${user.id}`, "PATCH", user);
}

export const deleteUser_from_UserManager = ({id, page = 1, limit = 10}) => {
    return callAPI(TYPE.DELETE, MODAL.USER, `users/${id}?page=${page}&limit=${limit}`, "DELETE");
}

export const lockAccount_from_UserManager = (data) => {
    return callAPI(TYPE.LOCK, MODAL.ACCOUNT, "users/lockAccount", "POST" , data);
}

export const unlockAccount_from_UserManager = (data) => {
    return callAPI(TYPE.LOCK, MODAL.ACCOUNT, "users/unlockAccount", "POST" , data);
}