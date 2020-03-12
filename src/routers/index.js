import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import ScrollToTopAndPrivateRoute from "../routers/ScrollToTopAndPrivateRoute";
import Login from "../modules/Login/Login";

const RouterIndex = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ScrollToTopAndPrivateRoute  path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export default RouterIndex;
