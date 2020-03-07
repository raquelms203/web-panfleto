import { Switch, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sign from "../pages/Sign";

export default function Routes() {  
  return (  
    <Switch>
    <Route path="/" exact component={Login}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/assinatura" component={Sign}></Route>
    </Switch>
  );
}