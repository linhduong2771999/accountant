import React from "react";
import { Switch, Route } from "react-router-dom";
import * as path from "./path";
import Accounting from "../modules/Accounting/Accounting";
import UserList from "../modules/UserList/UserList";
import UserManager from "../modules/UserManager/UserManager";
import PageNotFound from "../modules/PageNotFound/PageNotFound";
import Dashboard from "../modules/Home/Dashboard";
import WorkManager from "../modules/WorkManager/WorkManager";
import Notification from "../modules/Notification/Notification";

const Router = (
  <Switch>
    <Route exact path={path.home} component={Dashboard} />
    <Route exact path={path.workManager} component={WorkManager} />
    <Route exact path={path.accounting} component={Accounting} />
    <Route exact path={path.userManager} component={UserManager} />
    <Route path={path.userList} exact component={UserList} />
    <Route path={path.notification} exact component={Notification} />
    <Route exact path="*" component={PageNotFound} />
  </Switch>
);

export default Router;
