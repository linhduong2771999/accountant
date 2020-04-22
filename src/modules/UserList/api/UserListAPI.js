import callAPI from "../../../helpers/callAPI";

export const getUserList = () => {
    return callAPI("user", "GET", null)
}