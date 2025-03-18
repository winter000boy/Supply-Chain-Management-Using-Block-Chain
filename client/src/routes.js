import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddItems from "./components/AddItems";
import AssignRoles from "./components/AssignRoles";
import Supply from "./components/Supply";
import Track from "./components/Track";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/add-items" component={AddItems} />
        <Route path="/assign-roles" component={AssignRoles} />
        <Route path="/supply" component={Supply} />
        <Route path="/track" component={Track} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={ErrorPage} /> {/* Handles 404 errors */}
      </Switch>
    </Router>
  );
};

export default Routes;
