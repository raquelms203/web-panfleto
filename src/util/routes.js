import { Switch, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sign from "../pages/Sign";
import CreatePassword from "../pages/CreatePassword";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../assets/not_found.svg";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      {/* <Route path="/gestor" component={DashManager}></Route> */}
      <Route path="/assinatura" component={Sign}></Route>
      <Route path="/criar-senha" component={CreatePassword}></Route>
      <Route
        path="*"
        render={(props) => (
          <ErrorPage
            {...props}
            title="Erro 404"
            message="Essa página não existe ou pode ter sido removida."
            file={NotFound}
          />
        )}
      ></Route>
    </Switch>
  );
}
