import React, { Component } from "react";
import Firebase from "../../../config/FirebaseClient";
import { PageHeader, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../../assets/img/logo.jpg";
import Swal from 'sweetalert2'
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
      confirmButtonColor: '#1890ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK, đăng xuất!'
    }).then((result) => {
      if (result.value) {
        Firebase.auth().signOut();
        this.setState({
            user: true
        })
      }
    })
  };

  render() {
      if(this.state.user) return <Redirect to="/login" />
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
          <Button key="1" type="primary" onClick={this.logout}>
            Log out
          </Button>
        ]}
      />
    );
  }
}

export default Header;
