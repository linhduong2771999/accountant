import React, { Component, Fragment } from "react";
import {firebase} from "../../../config/FirebaseClient";
import { PageHeader, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../../assets/img/logo.jpg";
import Swal from 'sweetalert2';
import * as Color from "../../../assets/styles/Colors";
class Header extends Component {
   
  constructor(props){
        super(props);
        this.state = {
            user: false
        }
    }

  logout = () => {
    return Swal.fire({
      title: 'Bạn có chắc chắn đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: Color.primaryColor,
      cancelButtonColor: Color.dangerColor,
      confirmButtonText: 'OK, đăng xuất!'
    }).then((result) => {
      if (result.value) {
        firebase.auth().signOut();
        localStorage.removeItem("userUID");
        this.setState({
            user: true
        })
      }
    })
  };

  render() {
      if(this.state.user) return <Redirect to="/login" />
      const userUID = localStorage.getItem("userUID");
      
    return (
      <PageHeader
        style={{
          boxShadow: "-5px 5px 29px -10px rgba(201,201,214,1)",
          letterSpacing: "2px",
          position: "fixed",
          zIndex: "1000",
          width: "100%"
        }}
        ghost={false}
        title={
          <Link to="/" style={{ color: "black" }}>
            ACCOUNTING
          </Link>
        }
        avatar={{ src: Logo }}
        extra={[
          <Fragment key="1">
            {JSON.parse(userUID) ? (
              <Button  type="danger" onClick={this.logout}>
                  Đăng xuất
              </Button>
            ) : (
              <Button  type="primary" >
                  <Link to="/login" style={{ color: "white" }}>
                    Đăng nhập
                  </Link>
              </Button>
            )}
          </Fragment>

        ]}
      />
    );
  }
}

export default Header;
