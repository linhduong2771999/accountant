import React, { Component, Fragment } from "react";
import { PageHeader, Button, Badge, Avatar  } from "antd";
import { Link, Redirect } from "react-router-dom";
import { removeCookies } from "../../../utils/cookies"
import Logo from "../../../assets/img/logo.jpg";
import UserImage from "../../../assets/img/userImage.png";
import Swal from "sweetalert2";
// import  {isEmpty} from "lodash";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import { AuthActions } from "../../../actions/index";

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      isRedirect: false
    }
  }
  
  logout = () => {
    Swal.fire({
      title: "Bạn chắc chắn muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất",
    }).then((result) => {
      if (result.value) {
        const body = {
          callBack: () => {
            removeCookies({name: "user_token"});
          }
        }
        this.props.actions.logoutAccount(body);
        this.setState({
          isRedirect: true
        })
      }
    });
  };

  render() {
    const { isAuthenticated, currentUser } = this.props.stateOfAuthReducer;
    if(this.state.isRedirect) return <Redirect to="/auth" />
    
    const countReportMessage = currentUser.reportMessage && currentUser.reportMessage.length 
    return (
      <PageHeader
        style={{
          boxShadow: "-5px 5px 29px -10px rgba(201,201,214,1)",
          width: "100%",
          position: "fixed",
          zIndex: "1000",
          letterSpacing: "2px",
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
            {isAuthenticated ? (
              <div className="d-flex justify-content-center">
                <p className="m-0 mr-3 header-heading-extra_name" style={{lineHeight: "35px", letterSpacing: "1px", fontSize:  "14px"}}>{currentUser.name}</p>
                <Link to="/user_detail" className="mr-3">
                    <Badge count={countReportMessage || 0} showZero>
                      <Avatar  src={currentUser.photoUrl ? currentUser.photoUrl : UserImage} />
                    </Badge>
                </Link>
                <Button type="danger" onClick={this.logout}>
                  Đăng xuất
                </Button>
              </div>
            ) : (
                <Button type="primary">
                  <Link to="/auth" style={{ color: "white" }}>
                    Đăng nhập
                  </Link>
                </Button>
            )}
          </Fragment>,
        ]}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateOfAuthReducer: state.authReducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...AuthActions }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
