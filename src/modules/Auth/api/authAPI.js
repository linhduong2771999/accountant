import callAPI from "../../../helpers/callAPI";
import { MODAL, TYPE } from "../../../helpers/constant";
import axios from "axios"
import { getCookies } from "../../../utils/cookies";

export const checkLoggedIn = () => {
    return new Promise((resolve, reject) => {
      return axios({
        url: "http://127.0.0.1:8000/auth",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "cache-control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
          "Authorization": `Bearer ${getCookies({name: "user_token"})}`
        }
      }).then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error)
      })
    })
  }
// export const createUserAccount = (user) => {
//     return callAPI(`members/${user.userUID}`, "PUT", user);
// }

// export const fetchSpecificUserProfile = (userUID) => {
//     return callAPI(`members/${userUID}`, "GET", null);
// }

export const loginAccount = (data) => {
    return callAPI(TYPE.LOGIN, MODAL.ACCOUNT, "users/login", "POST", data)
}

export const signupAccount = (data) => {
    return callAPI(TYPE.SIGNUP, MODAL.ACCOUNT, "users/signup", "POST", data);
}