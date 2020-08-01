import React, { Component } from 'react';
import {Redirect, Route} from "react-router-dom";
import {firebase} from "../config/FirebaseClient"
import {withRouter} from "react-router-dom";
import * as storeService from "../sagas/storeService";
class ScrollToTopAndPrivateRoute extends Component {
    componentDidUpdate(prevProps) {
        if (
          this.props.path === this.props.location.pathname &&
          this.props.location.pathname !== prevProps.location.pathname
        ) {
          // content.scrollTop = 0;
          window.scrollTo(0, 0);
        }
      }
    render() {
        const {component: Component, ...rest} = this.props;
        var user = firebase.auth().currentUser;
        const {authReducers} = storeService.getGlobalState();
        // console.log(isAuthenticated[0].isAuthenticated);
        // console.log(authReducers.isAuthenticated);
        const userUID = localStorage.getItem("userUID");
        // console.log(JSON.parse(userUID));
        
        return (
          <Route {...rest} render={(props) => (
            // user !== null
            JSON.parse(userUID) !== null
            // isAuthenticated[0].isAuthenticated
                  ? <Component {...props} />
                  : <Redirect to={{
                      pathname: '/login',
                      state: { from: props.location }
                    }} />
              )} />
        );
    }
}

export default withRouter(ScrollToTopAndPrivateRoute);