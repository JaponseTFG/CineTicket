import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import Waiting from "./Waiting";
import PeliculaInfo from "./Usuarios/PeliculaInfo";
import SalaReservas from "./Usuarios/SalaReservas";
import Checkout from "./Usuarios/Checkout";

const NotFound = () => {
  return <h5 className="center-align">Error 404: Ruta desconocida.</h5>;
};

class DashboardUser extends Component {

  render(){
    if(this.props.auth == null || this.props.auth == false|| this.props.auth.tipo==2){
        return(this.props.auth == null) ? (<Waiting/>):(<Redirect to={"/forbidden"} />)
    }else{
      return(
        <Switch>
          <Route exact={true} path="/sala-reservas" component={SalaReservas} />
          <Route exact={true} path="/checkout" component={Checkout} />
          <Route exact={false} path="/" component={NotFound} />
        </Switch>
      )
    }
  }

};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, null)(DashboardUser);
