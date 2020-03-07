import React, { Component } from "react";
import {Link} from "react-router-dom";
import { Input, Checkbox, Button } from "antd";
class Login extends Component {
  render() {
    return (
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
                    <form>
                      <div className="form-group">
                        <Input placeholder="Email" />
                      </div>
                      <div className="form-group">
                        <Input.Password placeholder="Password" />
                      </div>
                      <div className="checkbox">
                        <Checkbox>Remember me</Checkbox>
                      </div>
                      <div className="form-group mt-3">
                        <Button type="primary" block>
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
    );
  }
}
export default Login;