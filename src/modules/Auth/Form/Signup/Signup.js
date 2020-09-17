import React, { Component } from 'react';
import { Input, Card, Popover , Button, Icon } from "antd";
import { validateEmail, validateStrengthPassword, validateName } from "../../../../helpers/Validate";
import "./Signup.scss";
import * as Notifies from "../../../../components/Notifies/Notifies";
import { Redirect } from 'react-router-dom';
export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: "linhduong277@gmail.com",
                password: "Linhduong277",
                passwordConfirm: "Linhduong277",
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
                callBack: () => {
                    this.setState({
                        isRedirect: true
                    })
                },
                fallBack: (error) => {
                    Notifies.errorMessege(error.message, error.text, error.icon)
                }
            }
            this.props.signupAccountRequest(body);
        }
    }

    handleValidation = (user) => {
        let error = {...this.state.error};
        
        error.email = !validateEmail(user.email) && true; // true nghĩa là validate ko hợp lệ
        error.password = !validateStrengthPassword(user.password) && true;
        error.passwordConfirm = !(user.passwordConfirm === user.password) ? true : false;
        error.name = !validateName(user.name) && true;

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
            case "passwordConfirm":
                let { passwordConfirm } = this.handleValidation(user);
                error.passwordConfirm = passwordConfirm;
                break;
            case "name":
                let { name } = this.handleValidation(user);
                error.name = name;
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
                password: "",
                passwordConfirm: "",
                name: "",
            },
            error: {}
        })
    }
    render() {
        
        const { error, user,isRedirect } = this.state;
        if(isRedirect) return <Redirect to={this.props.redirectFrom.pathname} />
        return (
            <Card title="Sign up" className="signup-form">
                <form className="row" onSubmit={this.handleSubmit} id="signup-form">
                    <div className="col-12 mb-3" id="signup-email_field">
                        <Popover 
                            content="Email không hợp lệ" 
                            visible={error.email} 
                            placement="right"
                            getPopupContainer={() => document.getElementById("signup-email_field")} 
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
                    <div className="col-12 mb-3" id="signup-password_field">
                        <Popover 
                            content="Mật khẩu phải có 8 ký tự, 1 in hoa, 1 số" 
                            visible={error.password} 
                            placement="right"
                            getPopupContainer={() => document.getElementById("signup-password_field")} 
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
                    <div className="col-12 mb-3" id="signup-passwordConfirm_field">
                        <Popover 
                            content="Mật khẩu không giống nhau" 
                            visible={error.passwordConfirm} 
                            placement="right"
                            getPopupContainer={() => document.getElementById("signup-passwordConfirm_field")} 
                        >
                            <Input 
                                placeholder="Xác nhận lại Password" 
                                name="passwordConfirm"
                                value={user.passwordConfirm}
                                autoComplete="off"
                                onChange={this.handleOnchangeInput}
                                onClick={() => this.handleValidationOnchange("passwordConfirm", user)}
                            />
                        </Popover>
                    </div>
                    <div className="col-12 mb-3" id="signup-name_field">
                        <Popover 
                            content="Tên phải hơn 5 ký tự và không có số" 
                            visible={error.name} 
                            placement="right"
                            getPopupContainer={() => document.getElementById("signup-name_field")} 
                        >
                            <Input 
                                placeholder="Họ và tên" 
                                name="name" 
                                value={user.name}
                                autoComplete="off"
                                onChange={this.handleOnchangeInput}
                                onClick={() => this.handleValidationOnchange("name", user)}
                            />
                        </Popover>
                    </div>
                    <div className="col-12 mb-3">
                        <Button 
                            form="signup-form" 
                            htmlType="submit" 
                            className="w-100" 
                            type="primary"
                        > Sign up</Button>
                    </div>
                    <div className="col-12" >
                    <p className="member-aria">
                        <a className="member-link" id="member-link" onClick={this.clearState}>
                        <Icon type="arrow-left" />
                        Đăng nhập
                        </a>
                        Bạn đã là thành viên?
                    </p>
                    </div>
                </form>
            </Card>
        );
    }
}
