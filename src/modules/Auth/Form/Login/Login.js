import React, { Component } from 'react';
import { Input, Card, Popover, Button, Icon } from "antd";
import { validateEmail, validateStrengthPassword, validateName } from "../../../../helpers/Validate";
import * as Notifies from "../../../../components/Notifies/Notifies";
import "./Login.scss";
export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {
                email: "linhduong277@gmail.com",
                password: "Linhduong277",
                name: "Linh Duong",
            },
            error: {},
            isRedirect: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const error = this.handleValidation(this.state.user);
        const isValid = Object.values(error).some(el => Boolean(el)); // return false if validate pass
        if(!isValid){
            const body = {
                user: this.state.user,
                fallBack: (error) => {
                    Notifies.errorMessege(error.message, error.text, error.icon)
                }
            }
            this.props.loginAccountRequest(body);
        }
    }

    handleValidation = (user) => {
        let error = {...this.state.error};
        
        error.email = !validateEmail(user.email) && true; // true nghĩa là validate ko hợp lệ
        error.password = !validateStrengthPassword(user.password) && true;

        return error;
    }

    handleValidationOnchange = (field, user) => {
        let error = {...this.state.error};

        switch (field) {
            case "email":
                let { email } = this.handleValidation(user);
                error.email = email;
                break;
            case "password":
                let { password } = this.handleValidation(user);
                error.password = password;
                break;            
            default:
                break;
        }

        this.setState({
            error
        })
    }

    handleOnchangeInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        }, () => this.handleValidationOnchange(name, this.state.user))
    }   

    clearState = () => {
        this.setState({
            user: {
                email: "",
                password: ""
            },
            error: {}
        })
    }

    render() {
        const { error, user } = this.state;
        return (
                <Card  title="Login"   className="login-form" >
                    <form className="row" onSubmit={this.handleSubmit} id="login-form">
                        <div className="col-12 mb-3" id="login-email_field">
                            <Popover 
                                content="Email không hợp lệ" 
                                visible={error.email} 
                                placement="right"
                                getPopupContainer={() => document.getElementById("login-email_field")} 
                            >
                                <Input 
                                    placeholder="Email" 
                                    name="email" 
                                    value={user.email}
                                    autoComplete="off"
                                    onChange={this.handleOnchangeInput}
                                    onClick={() => this.handleValidationOnchange("email", user)}
                                />
                            </Popover>
                        </div>
                        <div className="col-12 mb-3" id="login-password_field">
                            <Popover 
                                content="Mật khẩu phải có 8 ký tự, 1 in hoa, 1 số" 
                                visible={error.password} 
                                placement="right"
                                getPopupContainer={() => document.getElementById("login-password_field")} 
                            >
                                <Input 
                                    placeholder="Password" 
                                    name="password" 
                                    value={user.password}
                                    autoComplete="off"
                                    onChange={this.handleOnchangeInput}
                                    onClick={() => this.handleValidationOnchange("password", user)}
                                />
                            </Popover>
                        </div>
                        <div className="col-12 mb-3">
                            <Button
                                form="login-form" 
                                htmlType="submit" 
                                className="w-100" 
                                type="primary"
                            > Login</Button>
                        </div>
                        <div className="col-12">
                            <p className="register-aria">
                                Chưa có tài khoản?
                                <a className="register-link" id="register-link">Đăng ký ngay
                                    <Icon type="arrow-right" />
                                </a>
                            </p>
                        </div>
                    </form>
                </Card>
        );
    }
}
