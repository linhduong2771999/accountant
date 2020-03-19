import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Checkbox, Button } from "antd";
import Firebase from "../../config/FirebaseClient";
import { authActions } from "../../actions/index";
import Loader from "react-loader-spinner";
class Login extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: false,
      isLoading: false
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
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {})
      .catch(error => {
        var errorCode = error.code;
        // var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Sai mật khẩu hoặc tài khoản !!!");
        } else {
          alert("Tài khoản không tồn tại !!!");
        }
        console.log(error);
      });
  };

  //    authStateChanged = () => {
  //     return new Promise(function(resolve, reject) {
  //       setTimeout(() => {
  //         resolve(Firebase.auth().onAuthStateChanged(user => {
  //           if (user) {
  //             // this.props.actions.loginAccountSuccess(true);
  //             if (this._isMounted) {
  //                 this.setState({
  //                   user
  //                 })
  //             }
  //           } else {
  //             if (this._isMounted) {
  //               this.setState({
  //                 user: null
  //               });
  //             }
  //           }
  //         }))
  //       }, 3000);
  //    });
  // }

  // authStateChanged = () => {
  //   if(this._isMounted){
  //   return new Promise( (resolve, reject) => {
  //     setTimeout(() => {
  //       Firebase.auth().onAuthStateChanged(user => {
  //         if (user) {
  //           this.setState({
  //             user
  //           })
  //           // this.props.actions.loginAccountSuccess(true);
  //         } else {
  //             this.setState({
  //               user: null
  //             });
  //         }
  //       })
  //       resolve();
  //     }, 1000);
  //  });
  // }
  // }

  authStateChanged = () => {
    return new Promise( (resolve, reject) => {
      reject({message: "ko ổn định"})
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
            if(this._isMounted){

              this.setState({
                user: null
              });
            }
          }
        });
        resolve();
      }, 1000)

    })
  };

  waitSpinner = () => {
    return new Promise((resolve, reject) =>  {
      setTimeout(() => {
        this.setState({
          isLoading: true
        })
        resolve();
      }, 1000);
    });
  };

  main =  () => {
     this.waitSpinner();
     this.authStateChanged();
  };

  render() {
    // var user = Firebase.auth().currentUser;
    if (this.state.user) return <Redirect to="/" />;
    return this.state.isLoading ? (
      <div className="login-wrapper">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-4 col-md-7 col-sm-12 col-12">
              <div className="card">
                <div className="card-body p-4">
                  <div className="card-title mt-2 mb-5">
                    <h4>Login your account</h4>
                  </div>
                  <div className="login-form mt-4">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <Input
                          placeholder="Email"
                          name="email"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <Input.Password
                          placeholder="Password"
                          name="password"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="checkbox">
                        <Checkbox>Remember me</Checkbox>
                      </div>
                      <div className="form-group mt-3">
                        <Button htmlType="submit" type="primary" block>
                          Login
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div className="text-center">
                    <i className="fa fa-lock"></i>
                    <Link to="/reset">Forgot password?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={1000}
      />
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};
export default connect(null, mapDispatchToProps)(Login);
