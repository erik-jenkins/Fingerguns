import React, { ReactNode } from "react";

import { Switch, Route } from "react-router";

import MoviesPage from "pages/MoviesPage";

interface SiteRoute {
  path: string;
  component: ReactNode;
}

function Router() {
  const siteRoutes: SiteRoute[] = [
    {
      path: "/movies",
      component: MoviesPage
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