import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AppliesRoutes from "../Routing/AppliesRoutes";
import Input from "./Input";


export default ({ authProps }) =>
  <Switch>
    <AppliesRoutes path="/" exact component={Home} />
    <AppliesRoutes props={authProps} path="/login" exact component={Login} />
    <AppliesRoutes props={authProps} path="/register" exact component={Register} />
    <AppliesRoutes path="/messaging" exact component={Input} />
    <Route /*component={NotFound}*/ />
    

  </Switch>;
