import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Login from "../modules/Login/Login";

const RouterIndex = (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route  path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export default RouterIndex;
