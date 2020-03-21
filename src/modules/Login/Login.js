import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Checkbox, Button } from "antd";
import Firebase from "../../config/FirebaseClient";
import { authActions } from "../../actions/index";
import * as Notifies from "../../components/Notifies/Notifies";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import * as Validate from "../../helpers/Validate";
class Login extends Component {
  _isMounted = false; // giải quyết vấn đề unmounted component
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: "",
      isLoading: false,
      disabledButton: false,
      textWarningPassword: false
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
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validatePassword(this.state.password);
      }
    );
  };

  validatePassword = password => {
    if (Validate.validateStrengthPassword(password)) {
      this.setState({
        disabledButton: true,
        textWarningPassword: false
      });
    } else {
      this.setState({
        disabledButton: false,
        textWarningPassword: true
      });
    }
  };

  userLogin = event => {
    const { email, password } = this.state;
    event.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        var errorCode = error.code;
        // var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Sai mật khẩu hoặc tài khoản !!!");
        } else if (errorCode === "auth/network-request-failed") {
          Notifies.errorMessege();
        } else{
          alert("Tài khoản không tồn tại !!!");
        }
        // console.log(error);
      });
  };

  onAuthStateChanged = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        Firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // this.props.actions.loginAccountSuccess(true);
            if (this._isMounted) {
              this.setState({
                user
              });
            }
          } else {
            if (this._isMounted) {
              this.setState({
                user: null
              });
            }
          }
        });
        resolve();
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

  render() {
    const { disabledButton, textWarningPassword } = this.state;
    // var user = Firebase.auth().currentUser;
    if (this.state.user) return <Redirect to="/" />;
    return (
      <div className="login-wrapper">
        {this.state.isLoading ? null : <LoadingSpinner />}
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-4 col-md-7 col-sm-12 col-12">
              <div className="card">
                <div className="card-body p-4">
                  <div className="card-title mt-2 mb-5">
                    <h4>Đăng nhập tài khoản</h4>
                  </div>
                  <div className="login-form mt-4">
                    <form onSubmit={this.userLogin}>
                      <div className="form-group">
                        <Input
                          placeholder="Email"
                          name="email"
                          onChange={this.onChange}
                          autoComplete="on"
                        />
                      </div>
                      <div className="form-group">
                        <Input.Password
                          placeholder="mật khẩu"
                          name="password"
                          onChange={this.onChange}
                        />
                        {textWarningPassword ? (
                          <span
                            style={{ fontSize: "0.75em" }}
                            className="text-danger"
                          >
                            ( Mật khẩu phải có ít nhất 1 chữ in hoa, số và 8 ký tự )
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
                          disabled={disabledButton ? false : true}
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
    actions: bindActionCreators(authActions, dispatch)
  };
};
export default connect(null, mapDispatchToProps)(Login);
