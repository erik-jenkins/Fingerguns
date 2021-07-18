import React, { ReactNode } from "react";

import { Switch, Route } from "react-router";

import DocketPage from "pages/DocketPage";

interface SiteRoute {
  path: string;
  component: ReactNode;
}

function Router() {
  const siteRoutes: SiteRoute[] = [
    {
      path: "/dockets/:docketId",
      component: <DocketPage />,
    },
    {
      path: "/groups",
      component: <p>Groups</p>,
    },
    {
      path: "/login",
      component: <p>Log in</p>,
    },
    {
      path: "/register",
      component: <p>Register</p>,
    },
  ];

  return (
    <Switch>
      {siteRoutes.map((route) => (
        <Route path={route.path} key={route.path}>
          {route.component}
        </Route>
      ))}
    </Switch>
  );
}

export default Router;
