import axios from "axios";
export default function callAPI(
  endpoint,
  method = "GET",
  body,
  header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "cache-control":
      "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
      // "Authorization": `Bearer ${accessToken}`,
    }
) {
  return new Promise((resolve, reject) => {
    axios({
     url: `https://accounting-806b6.firebaseio.com/${endpoint}.json?auth=aMW7qulLyOD0hkmWzHOsaP13yxeXQYjjkWoIH2k5`,
     method,
     headers: header,
     data: body
   })
     .then(response => {
      //  console.log(response)
       resolve(response);
     })
     .catch(err => {
       console.log("Lỗi: ",err)
       reject({
         message: "Đường truyền không ổn định"
       })
     });

  })
}

// .json?auth=aMW7qulLyOD0hkmWzHOsaP13yxeXQYjjkWoIH2k5