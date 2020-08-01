import callAPI from "../../../helpers/callAPI";

export const getUserManager = () => {
    return callAPI("members", "GET", null);
}

export const createUserManager = (user) => {
    return callAPI(`user/${user.id}`, "PUT", user); // tạo tên user bởi id 
}

export const updateUserManager = (data) => {
    return callAPI(`members/${data.userUID}`, "PATCH", {...data});
}

export const deleteUserManager = (user) => {
    return callAPI(`user/${user.id}`, "DELETE");
}