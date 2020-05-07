import { Switch, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreatePassword from "../pages/CreatePassword";
import ErrorPage from "../pages/ErrorPage";
import DashManager from "../pages/DashManager";
import ViewPDF from "../pages/ViewPDF";
import NotFound from "../assets/not_found.svg";

export default function Routes() {

  return (
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/dashboard-gestor" component={DashManager}></Route>
      <Route path="/criar-senha" component={CreatePassword}></Route>
      <Route path="/contrato/:hiredId/:managerId/:politicId" component={ViewPDF}></Route>
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
