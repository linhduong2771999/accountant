import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import * as path from "./path";
import { AnimatedSwitch, spring } from "react-router-transition";

const Accounting = lazy(() => import("../modules/Accounting/Accounting"));
const UserList = lazy(() => import("../modules/UserList/UserList"));
const UserManager = lazy(() => import("../modules/UserManager/UserManager"));
const PageNotFound = lazy(() => import("../modules/PageNotFound/PageNotFound"));
const Dashboard = lazy(() => import("../modules/Home/Dashboard"));
const WorkManager = lazy(() => import("../modules/WorkManager/WorkManager"));
const Notification = lazy(() => import("../modules/Notification/Notification"));
const NotificationManager = lazy(() => import("../modules/NotificationManager/NotificationManager"));


function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};


const Router = (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
    <AnimatedSwitch
      atEnter={bounceTransition.atEnter}
      atLeave={bounceTransition.atLeave}
      atActive={bounceTransition.atActive}
      mapStyles={mapStyles}
      className="switch-wrapper"
    >
        <Route exact path={path.home} component={Dashboard} />
        <Route exact path={path.workManager} component={WorkManager} />
        <Route exact path={path.accounting} component={Accounting} />
        <Route exact path={path.userManager} component={UserManager} />
        <Route exact path={path.userList}  component={UserList} />
        <Route exact path={path.notification} component={Notification} />
        <Route exact path={path.notificationManager} component={NotificationManager} />
        <Route path="*" component={PageNotFound} />
    </AnimatedSwitch>
    </Switch>
  </Suspense>
);

export default Router;