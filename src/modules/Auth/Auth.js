import React,  { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { AuthActions } from "../../actions/index";
import Login from "./Form/Login/Login";
import Signup from "./Form/Signup/Signup";

class Auth extends Component {

  componentDidMount = () => {
    const register = document.getElementById("register-link");
    const member = document.getElementById("member-link");

    if(register !== null) register.addEventListener("click", this.handleAnimation);
    if(member !== null) member.addEventListener("click", this.handleAnimation);
  }

  componentWillUnmount = () => {
    const register = document.getElementById("register-link");
    const member = document.getElementById("member-link");

    if(register !== null) register.removeEventListener("click", this.handleAnimation);
    if(member !== null) member.removeEventListener("click", this.handleAnimation);
  }


  handleAnimation = (e) => {
    const login = document.querySelector(".login-form");
    const signup = document.querySelector(".signup-form");

      if(e.target.classList.contains("register-link")){
        login.classList.add("animateFadeOff")
        login.classList.remove("animateFadeIn")
        
        signup.classList.add("animateFadeIn")
        signup.classList.remove("animateFadeOff")
      } else {
        login.classList.add("animateFadeIn")
        login.classList.remove("animateFadeOff")
        
        signup.classList.add("animateFadeOff")
        signup.classList.remove("animateFadeIn")    
      }
  } 
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if(this.props.stateOfAuthReducer.isAuthenticated) return <Redirect to={from.pathname} />
    return (
      <div className="auth-wrapper">
        <div className="container h-100">
             <Login  redirectFrom={from} loginAccountRequest={this.props.actions.loginAccountRequest}/>  
             <Signup redirectFrom={from} signupAccountRequest={this.props.actions.signupAccountRequest} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateOfAuthReducer: state.authReducers 
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
