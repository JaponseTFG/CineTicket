import React from "react";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Cartelera from "./Usuarios/Cartelera";
import PeliculaInfo from "./Usuarios/PeliculaInfo";

const NotFound = () => {
  return <h5 className="center-align">Error 404: Ruta desconocida.</h5>;
};

class Dashboard extends Component {
  render(){
    return (
      <div className="row" style={{padding:"1%"}}>
        <div className="col xl1" ></div>
        <div className="card-panel grey lighten-4 col s12 l12 xl10" style={{minHeight:"15%",paddingTop:"1%"}}>
          <Switch>
            <Route exact={true} path="/" component={Cartelera} />
            <Route exact={true} path="/pelicula-info" component={PeliculaInfo} />
            <Route exact={false} path="/" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
};

export default Dashboard;
