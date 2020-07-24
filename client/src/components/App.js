import React, { Component } from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from "./Usuarios/Landing";
import DashboardUser from "./DashboardUser";
import DashboardAdmin from "./DashboardAdmin";
import LoginAdmin from "./LoginAdmin";
import Footer from "./Footer";
import Cartelera from "./Usuarios/Cartelera";
import PeliculaInfo from "./Usuarios/PeliculaInfo";

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
          <div className="row" style={{padding:"1%"}}>
            <div className="card-panel grey lighten-4 col s12 l12 xl10 offset-xl1" style={{minHeight:"15%",paddingTop:"1%"}}>
              <Switch>
                <Route exact={true} path="/" component={Cartelera} />
                <Route exact={true} path="/pelicula-info" component={PeliculaInfo} />
                <Route exact={false} path="/admin" component={DashboardAdmin} />
                <Route exact={false} path="/auth/admin" component={LoginAdmin} />
                <Route exact={false} path="/forbidden" component={Forbidden} />
                <Route exact={false} path="/" component={DashboardUser} />
              </Switch>
            </div>
          </div>
        </div>
        <Route exact={false} path="/" component={Footer} />
      </BrowserRouter>

    );
  }
}

export default connect(null, actions)(App);
