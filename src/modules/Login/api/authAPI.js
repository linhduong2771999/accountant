import callAPI from "../../../helpers/callAPI";

export const createUserAccount = (user) => {
    return callAPI(`members/${user.userUID}`, "PUT", user);
}

export const fetchSpecificUserProfile = (userUID) => {
    return callAPI(`members/${userUID}`, "GET", null);
}