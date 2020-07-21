import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (

      <footer className="page-footer  grey darken-4">
          <div className="container " >
            <div className="row">
              <div className="col l6 s12" >
                <h5 className="white-text">CineTicket</h5>
                <p className="grey-text text-lighten-4">Aplicacción web de venta online de entradas. Trabajo final de grado GIM UV 2020.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Información</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#">Política de privacidad</a></li>
                  <li><a className="grey-text text-lighten-3" href="#">Gestión de cookies</a></li>
                  <li><Link className="grey-text text-lighten-3" to={"/auth/admin"}>Acceso administrador</Link></li>
                </ul>

              </div>
            </div>
          </div>
          <div className="right-align" style={{backgroundColor:"#191919"}}>
            Javier Ponsoda Segura 2020 &nbsp;
          </div>
        </footer>

    );
  }
}

export default Footer;
