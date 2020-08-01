import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Checkbox, Button } from "antd";
import {firebase} from "../../config/FirebaseClient";
import { AuthActions } from "../../actions/index";
import * as Notifies from "../../components/Notifies/Notifies";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import * as Validate from "../../helpers/Validate";
class Login extends Component {
  _isMounted = false; // giải quyết vấn đề unmounted component
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      phone: 0,
      user: "",
      isLoading: false,
      isActiveClass: true,
      textWarningPassword: true,
      textWarningPhone: true,
      textWarningName: true
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.main();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChange = event => {
    const { name, value } = event.target;
    if(name === "phone"){
      this.onChangePhoneNumber(name, value);
    }
    else {
      this.setState(
        {
          [name]: value
        },
        () => {
          this.validateForm({password: this.state.password, number: Number(this.state.phone), name: this.state.name});
        }
      );
    }
  };

  onChangePhoneNumber = (name, value) => {
    if(!Number(value) && value !== "" && Number(value) !== 0){ // chỉ cho nhập số
      return "";
    }
    else{
      this.setState({
        [name]: value
      }, () => {
        this.validateForm({password: this.state.password,  number: Number(this.state.phone), name: this.state.name})
      })
    }
  };

  validateForm = (validateValue) => {
    const {number, password , name} = validateValue;    
    if(Validate.validateStrengthPassword(password)){
      this.setState({
        textWarningPassword: false
      });
    }
    else {
      this.setState({
        textWarningPassword: true
      });
    } 
    if (number){ // check xem có field phone ko 
      if(Validate.validatePhoneNumber(number)){
        this.setState({
          textWarningPhone: false
        });
      }
      else{
        this.setState({
          textWarningPhone: true
        });
      }
    }
    if(name){ // check xem có field name ko
      if(name !== ""){
        this.setState({
          textWarningName: false
        })
      }
    }
    else {
      this.setState({
        textWarningName: true
      })
    }
  }
  userLogin = event => {
    const { email, password } = this.state;
    event.preventDefault();
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        var errorCode = error.code;
        // var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Sai mật khẩu hoặc tài khoản !!!");
        } else if (errorCode === "auth/network-request-failed") {
          Notifies.errorMessege();
        } else {
          alert("Tài khoản không tồn tại !!!");
        }
        // console.log(error);
      });
  };

  userSignup = event => {
    const { email, password } = this.state;
    event.preventDefault();

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
          this.props.actions.createUserAccountRequest({ // tạo account user
              userUID: user.uid,
              userRole: {
                role: "user"
              },
              userInfo: {
                email: this.state.email,
                phone: this.state.phone,
                name: this.state.name,
                userAccount: {
                  uid: user.uid,
                  creationTime: user.metadata.creationTime,
                  lastSignInTime: user.metadata.lastSignInTime
                },
              },
          })
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("Mật khẩu quá yếu");
        } else if(errorCode === "auth/email-already-in-use") {
          alert("Tài khoản đã tồn tại");
        } else if(errorCode === "auth/invalid-email") {
          alert("Email không hợp lệ")
        }
        else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  onAuthStateChanged = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // this.props.actions.loginAccountSuccess(true);
            localStorage.setItem("userUID", JSON.stringify(user.uid));
            if (this._isMounted) {
              this.setState({
                user
              });
            }
          } else {
            localStorage.setItem("userUID", JSON.stringify(null));
            if (this._isMounted) {
              this.setState({
                user: null
              });
            }
          }
        });
      }, 1000);
    });
  };

   loadingSpinner = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState({
          isLoading: true
        });
        resolve();
      }, 1000);
    });
  };

  main = () => {
    this.loadingSpinner();
    this.onAuthStateChanged();
  };

  isActiveLogin = () => {
    this.setState({
      isActiveClass: true,
      email: "",
      password: "",
      phone: "",
      textWarningPassword: true,
      textWarningPhone: true,
      textWarningName: true
    });
  };
  isActiveSignup = () => {
    this.setState({
      isActiveClass: false,
      email: "",
      password: "",
      phone: "",
      textWarningPassword: true,
      textWarningPhone: true,
      textWarningName: true
    });
  };
  render() {
    const {  textWarningPassword, isActiveClass, textWarningPhone, textWarningName } = this.state;
    if (this.state.user) return <Redirect to="/" />;    
    return (
      <div className="login-wrapper">
        {this.state.isLoading ? null : <LoadingSpinner />}
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-4 col-md-7 col-sm-12 col-12">
              <div className="card">
                <ul className="nav nav-tabs nav-tabs-custom">
                  <li
                    style={
                      isActiveClass
                        ? { backgroundColor: "rgba(196, 185, 185, 0.747)" }
                        : null
                    }
                    className="nav-link-custom col-6 text-center text-uppercase"
                  >
                    <a
                      data-toggle="tab"
                      href="#login"
                      onClick={this.isActiveLogin}
                    >
                      Đăng nhập
                    </a>
                  </li>
                  <li
                    style={
                      isActiveClass
                        ? null
                        : { backgroundColor: "rgba(196, 185, 185, 0.747)" }
                    }
                    className="nav-link-custom col-6 text-center text-uppercase "
                  >
                    <a
                      data-toggle="tab"
                      href="#signup"
                      onClick={this.isActiveSignup}
                    >
                      Đăng Ký
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active card-body px-4 pb-4 text-warning"
                    id="login"
                    aria-labelledby="s"
                  >
                    <div className="card-title mb-4">
                      <h4>Đăng nhập tài khoản</h4>
                    </div>
                    <div className="login-form mt-4">
                      <form onSubmit={this.userLogin}>
                        <div className="form-group">
                          <Input
                            placeholder="Email"
                            value={this.state.email}
                            name="email"
                            required
                            onChange={this.onChange}
                            autoComplete="on"
                          />
                        </div>
                        <div className="form-group">
                          <Input.Password
                            placeholder="mật khẩu"
                            value={this.state.password}
                            name="password"
                            onChange={this.onChange}
                          />
                          {textWarningPassword ? (
                            <span
                              style={{ fontSize: "0.75em" }}
                              className="text-danger"
                            >
                              ( Mật khẩu phải có ít nhất 1 chữ in hoa, số và 8
                              ký tự )
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="checkbox">
                          <Checkbox>Ghi nhớ</Checkbox>
                        </div>
                        <div className="form-group mt-3">
                          <Button
                            disabled={!textWarningPassword ? false : true}
                            htmlType="submit"
                            type="primary"
                            block
                          >
                            Đăng nhập
                          </Button>
                        </div>
                      </form>
                    </div>
                    <div className="text-center">
                      <i className="fa fa-lock"></i>
                      <Link to="/reset">Quên mật khẩu ?</Link>
                    </div>
                  </div>
                  <div
                    id="signup"
                    className="tab-pane card-body px-4 pb-4 text-warning"
                  >
                    <div className="card-title mb-4">
                      <h4>Đăng ký tài khoản</h4>
                    </div>
                    <div className="login-form mt-4">
                      <form onSubmit={this.userSignup}>
                        <div className="form-group">
                          <Input
                            placeholder="Email"
                            value={this.state.email}
                            name="email"
                            required
                            onChange={this.onChange}
                            autoComplete="on"
                          />
                        </div>
                        <div className="form-group">
                          <Input.Password
                            placeholder="mật khẩu"
                            value={this.state.password}
                            name="password"
                            onChange={this.onChange}
                          />
                          {textWarningPassword ? (
                            <span
                              style={{ fontSize: "0.75em" }}
                              className="text-danger"
                            >
                              ( Mật khẩu phải có ít nhất 1 chữ in hoa, số và 8
                              ký tự )
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group">  
                            <Input
                              placeholder="Tên thường gọi"
                              value={this.state.name}
                              name="name"
                              autoComplete="off" 
                              onChange={this.onChange}
                            />
                            {textWarningName ? (
                              <span
                                style={{ fontSize: "0.75em" }}
                                className="text-danger"
                              >
                                ( Tên bắt buộc )
                              </span>
                            ) : (
                              ""
                            )}
                        </div>
                        <div className="form-group">
                            <Input 
                              placeholder="Số điện thoại"
                              value={this.state.phone}
                              name="phone"
                              autoComplete="off"
                              onChange={this.onChange}
                            />
                            {textWarningPhone ? (
                              <span
                                style={{ fontSize: "0.75em" }}
                                className="text-danger"
                              >
                                ( Số điện thoại không hợp lệ )
                              </span>
                            ) : (
                              ""
                            )}
                        </div>
                        <div className="form-group mt-3">
                          <Button
                            disabled={!textWarningPassword && !textWarningPhone && !textWarningName ? false : true}
                            htmlType="submit"
                            type="primary"
                            block
                          >
                            Đăng Ký
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Login);
