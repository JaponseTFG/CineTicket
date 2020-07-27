import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/userActions";

import M from "materialize-css";
import Waiting from "../Waiting"
import GridButacas from "./GridButacas"

const LeyendaButacas = () => {
  return (
    <table className="centered">
    <thead>
    </thead>
    <tbody>
      <tr>
        <td> Disponible        &nbsp;<div className="btn btn-xs" ></div></td>
        <td> Seleccionada      &nbsp;<div className="btn btn-xs  lime accent-4"></div></td>
        <td> Reservada         &nbsp;<div className="btn btn-xs grey lighten-2"></div></td>
        <td> Ocupada           &nbsp;<div className="btn btn-xs red darken-1"></div></td>
      </tr>
      </tbody>
    </table>
  )
}

class SalaReservas extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    document.body.scrollIntoView({ behavior : 'smooth', block : 'start' });
    this.props.sesion && this.props.loadSalaReserva(this.props.sesion._id);
  }


  render(){
    if(this.props.sesion == null || this.props.butacas === false)
      return <Redirect to={"/"} /> ;
    if(this.props.butacas == null)
      return <Waiting /> ;
    console.log("sesion",this.props.sesion,this.props.butacas)
    return (
        <div className="row" >
          <br></br>
          <div className="col  s12 xl11 offset-xl1">
            <h4>
              Compra tus entradas para ver <b>{this.props.pelicula.titulo}</b> a las {new Date(this.props.sesion.fecha).toLocaleTimeString("es-ES" ,{ hour: '2-digit', minute: '2-digit' })}
            </h4>
            <h6 style={{paddingTop:"20px",paddingBottom:"2%"}}>
              Recuerda que las reservas no procesadas expirarán tras diez minutos.
            </h6>
          </div>
          <div className="col  s12 xl10 offset-xl1" >
            <br></br>
            <br></br>
            <LeyendaButacas />
            <br></br>
            <h6 className="center-align teal lighten-2" style={{color: "#ffffff", padding: "1%"}}><b>PANTALLA</b></h6>
            <div className="divider"></div>
            <div className="section">
                <GridButacas butacas = { this.props.butacas } sala = { this.props.sesion._sala }/>
            </div>
          </div>

          <div className="col  s12 xl10 offset-xl1" style={{ paddingTop : "5%" ,paddingBottom : "5%" }}>
            <Link to="/checkout" className="btn-large blue-grey darken-1 right">Confirmar</Link>
          </div>
        </div>

    );
  }
};


function mapStateToProps(state) {
  return { pelicula : state.reserva.pelicula, sesion : state.reserva.sesion, butacas : state.reserva.butacas, isRedirect: state.reserva.isRedirect};
}

export default connect(mapStateToProps, actions)(SalaReservas);
