import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import * as path from "./path";

const Accounting = lazy(() => import("../modules/Accounting/Accounting"));
const UserList = lazy(() => import("../modules/UserList/UserList"));
const UserManager = lazy(() => import("../modules/UserManager/UserManager"));
const PageNotFound = lazy(() => import("../modules/PageNotFound/PageNotFound"));
const Dashboard = lazy(() => import("../modules/Home/Dashboard"));
const WorkManager = lazy(() => import("../modules/WorkManager/WorkManager"));
const Notification = lazy(() => import("../modules/Notification/Notification"));
const NotificationManager = lazy(() => import("../modules/NotificationManager/NotificationManager"));

const Router = (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path={path.home} component={Dashboard} />
      <Route exact path={path.workManager} component={WorkManager} />
      <Route exact path={path.accounting} component={Accounting} />
      <Route exact path={path.userManager} component={UserManager} />
      <Route exact path={path.userList}  component={UserList} />
      <Route exact path={path.notification} component={Notification} />
      <Route exact path={path.notificationManager} component={NotificationManager} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </Suspense>
);

export default Router;