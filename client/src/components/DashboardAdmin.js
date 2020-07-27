import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route  } from "react-router-dom";
import { Redirect } from "react-router";

import Waiting from "./Waiting";
import PanelAdministrador from "./Admin/PanelAdministrador";
import ListadoPeliculas from "./Admin/Peliculas/ListadoPeliculas";
import FormPelicula from "./Admin/Peliculas/FormPelicula";
import ListadoSalas from "./Admin/Salas/ListadoSalas";
import EditorSala from "./Admin/Salas/EditorSala";
import ListadoSesiones from "./Admin/Sesiones/ListadoSesiones";
import EditorSesion from "./Admin/Sesiones/EditorSesion";
import ListadoEntradas from "./Admin/Entradas/ListadoEntradas";
import LectorQR from "./Admin/LectorQr/LectorQR";

const NotFound = () => {
  return <h5 className="center-align">Error 404: Ruta desconocida.</h5>;
};

class DashboardAdmin extends Component {

  render(){
    if(this.props.auth == null || this.props.auth == false|| this.props.auth.tipo==1){
        return(this.props.auth == null) ? (<Waiting/>):(<Redirect to={"/forbidden"} />)
    }else {
      return(
        <Switch>
            <Route exact={true} path="/admin" component={PanelAdministrador} />
            <Route exact={true} path="/admin/peliculas" component={ListadoPeliculas} />
            <Route exact={true} path="/admin/peliculas-edit" component={FormPelicula} />
            <Route exact={true} path="/admin/salas" component={ListadoSalas} />
            <Route exact={true} path="/admin/salas-edit" component={EditorSala} />
            <Route exact={true} path="/admin/sesiones" component={ListadoSesiones} />
            <Route exact={true} path="/admin/sesiones-edit" component={EditorSesion} />
            <Route exact={true} path="/admin/entradas" component={ListadoEntradas} />
            <Route exact={true} path="/admin/validacion" component={LectorQR} />
            <Route exact={false} path="/" component={NotFound} />
        </Switch>
      )
    }
  }

};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, null)(DashboardAdmin);
