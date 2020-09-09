import React, { Component, Fragment } from 'react';
import axios from "axios";
function callAPI2(
  endpoint,
  method = "GET",
  body,
  header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "cache-control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
      // "Authorization": `Bearer ${accessToken}`,
    }
) {
  return new Promise((resolve, reject) => {
    axios({
     url: `http://127.0.0.1:8000/api/v1/users?search=user&sort=age`,
     method,
     headers: header,
     data: body
   })
     .then(response => {
       console.log(response)
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
class Notification extends Component {

    componentDidMount = () => {
        callAPI2();
    }
    render() {
        return (
            <Fragment>
                Trang thông báo, xem tất cả thông báo tại đây !!!
            </Fragment>
        );
    }
}

export default Notification;