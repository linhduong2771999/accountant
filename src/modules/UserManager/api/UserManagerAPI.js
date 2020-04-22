import callAPI from "../../../helpers/callAPI";

export const getUserManager = () => {
    return callAPI("user", "GET", null);
}

export const getOneUserManager = (id) => {
    return callAPI(`user/${id}`, "GET", null)
}

export const createUserManager = (user) => {
    return callAPI(`user/${user.id}`, "PUT", user);
}

export const updateUserManager = (user) => {
    return callAPI(`user/${user.id}`, "PUT", user);
}

export const deleteUserManager = (user) => {
    return callAPI(`user/${user.id}`, "DELETE");
}