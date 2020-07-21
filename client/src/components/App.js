import React, { Component } from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from "./Usuarios/Landing";
import Dashboard from "./Dashboard";
import DashboardAdmin from "./DashboardAdmin";
import LoginAdmin from "./LoginAdmin";
import Footer from "./Footer";


const Forbidden = () => {
  return <h5 className="center-align">Error 403: No tienes permiso para acceder a esta ruta.</h5>;
};
const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};


class App extends Component {
  componentDidMount(){
    this.props.getAuth();
  }
  render() {
    return (

        <BrowserRouter>
        <div style={{position:"relative",display:"inline-block", width:"100%",minHeight:"97vh"}}>
          <Route exact={false} path="/" component={Header} />
          <Switch>
            <Route exact={false} path="/admin" component={DashboardAdmin} />
            <Route exact={false} path="/auth/admin" component={LoginAdmin} />
            <Route exact={false} path="/forbidden" component={Forbidden} />
            <Route exact={false} path="/" component={Dashboard} />
          </Switch>
        </div>
        <Route exact={false} path="/" component={Footer} />
      </BrowserRouter>

    );
  }
}

export default connect(null, actions)(App);
