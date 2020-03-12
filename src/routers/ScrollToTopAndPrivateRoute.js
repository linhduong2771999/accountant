import React, { Component } from 'react';
import {Redirect, Route} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {fakeAuth} from "../config/Auth.config";
class ScrollToTopAndPrivateRoute extends Component {
    componentDidUpdate(prevProps) {
        if (
          this.props.location.pathname !== prevProps.location.pathname
        ) {
          window.scrollTo(0, 0);
        }
      }
    render() {
        const {component: Component, ...rest} = this.props
        return (
            <Route {...rest} render={(props) => (
                fakeAuth.isAuthenticated === true
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