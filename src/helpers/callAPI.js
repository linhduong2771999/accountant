import axios from "axios";
const accessToken = "   aMW7qulLyOD0hkmWzHOsaP13yxeXQYjjkWoIH2k5"
export default function callAPI(
  endpoint,
  method = "GET",
  body
  // header = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "cache-control":
  //     "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
  //     "Authorization": "Bearer" + accessToken,
  //   }
) {
  return axios({
    url: `https://accounting-806b6.firebaseio.com/user/${endpoint}.json?auth=aMW7qulLyOD0hkmWzHOsaP13yxeXQYjjkWoIH2k5`,
    method,
    // headers: header,
    data: body
  })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}