import { Switch, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sign from "../pages/Sign";
import FormHired from "../pages/FormHired";

export default function Routes() {  
  return (  
    <Switch>
    <Route path="/" exact component={Login}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/sign" component={Sign}></Route>
    <Route path="/hired" component={FormHired}></Route>
    </Switch>
  );
}