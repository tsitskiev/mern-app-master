import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage, CreatePage, DetailPage, LinksPage } from "./pages";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/links" component={LinksPage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Route exact path="/create" component={CreatePage} />
        <Redirect to="/create" />;
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
