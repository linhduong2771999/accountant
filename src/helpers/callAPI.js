import axios from "axios";
const backupAPI = `https://accounting-806b6.firebaseio.com/${""}.json?auth=aMW7qulLyOD0hkmWzHOsaP13yxeXQYjjkWoIH2k5`;
export default function callAPI(
  type,
  modal,
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
    if(type && modal){
      axios({
       url: `http://127.0.0.1:8000/api/v1/${endpoint}`,
       method,
       headers: header,
       data: body
     })
       .then(response => {
         resolve(response);
       })
       .catch(error => {
            const { status, data: {statusText, message} = {} } = error.response || {};
            if(error.message === "Network Error"){
              reject({message: error.message, text: `Không thể kết nối tới server. Vui lòng thử lại ít phút sau!`, icon: "question"})
            } 
            switch (status) {
              case 400:
                  console.log(`Không thể ${type} từ ${modal}`, JSON.stringify(error));
                  reject({message: statusText, text: message, icon: "error", error: JSON.stringify(error)})
                  break;
              case 401:
                  console.log(`Unauthorized ${type} từ ${modal}`, JSON.stringify(error));
                  reject({message: statusText, text: message, icon: "warning", error: JSON.stringify(error)});
                  break;
              case 403:
                  console.log(`Không có quyền để ${type} từ ${modal}`, JSON.stringify(error));
                  reject({message: statusText, text: message, icon: "warning", error: JSON.stringify(error)});
                  break;
              case 404:
                  console.log(`Không tìm thấy ${modal}`, JSON.stringify(error));
                  reject({message: statusText, text: message, icon: "error", error: JSON.stringify(error)});
                  break;
              case 500:
                  console.log(`Server gặp vấn đề`, JSON.stringify(error));
                  reject({message: statusText, text: message, icon: "question", error: JSON.stringify(error)});
                  break;
              default:
                  console.log(`Không thực hiện được chức năng này`, JSON.stringify(error));
                 reject({message: statusText, text: message, icon: "question", error: JSON.stringify(error)});
                  break;
            }
       });
    } else {
      reject({message: "Đường truyền không ổn định"});
    }

  })
}

// .json?auth=aMW7qulLyOD0hkmWzHOsaP13yxeXQYjjkWoIH2k5

// &auth=aMW7qulLyOD0hkmWzHOsaP13yxeXQYjjkWoIH2k5 