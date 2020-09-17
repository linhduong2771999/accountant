import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose , bindActionCreators} from "redux";
import {Redirect, Route, withRouter} from "react-router-dom";
import { AuthActions } from "../actions/index";
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
    // console.log(this.props.stateOfAuthReducer);
    const { isAuthenticated, currentUser } = this.props.stateOfAuthReducer;
      const {component: Component, ...rest} = this.props;
      return (
        <Route {...rest} render={(props) => (
          isAuthenticated && currentUser.role === "admin"
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/auth',
                    state: { from: props.location }
                  }} />
            )} />
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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ScrollToTopAndPrivateRoute)