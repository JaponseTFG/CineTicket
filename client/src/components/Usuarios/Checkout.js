import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import M from "materialize-css";
import Waiting from "../Waiting"
import GridButacas from "./GridButacas"
import StripePago from "./StripePago"

const InfoReserva = (props) => {
  return(
    <blockquote style={{borderLeft: "solid #000000"}}>
        <h5>
          <span>
              <b>{props.titulo}</b>&nbsp;
              Fila {props.fila} Asiento {props.columna}&nbsp; - &nbsp;
              {props.dia} a las {props.hora}
          </span>
          <span className="right">
              {props.precio}€
          </span>
        </h5>
      </blockquote>
    );
}

class Checkout extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){
    document.body.scrollIntoView({ behavior : 'smooth', block : 'start' });

  }

  showReservas(butacas_reservadas,precio_total){
    var fecha = new Date(this.props.sesion.fecha);
    var dia = fecha.toLocaleDateString("es-ES", {weekday: 'long', day: 'numeric'});
    var hora = fecha.toLocaleTimeString("es-ES" ,{ hour: '2-digit', minute: '2-digit' });
    return(
      <React.Fragment>
        { butacas_reservadas.map( reserva => <InfoReserva titulo={this.props.pelicula.titulo} fila={reserva.fila} columna={reserva.columna} dia={dia} hora={hora} precio={this.props.sesion.precio}/>) }
        <h5><span className="right"><b>{precio_total}€</b></span></h5>
      </React.Fragment>
    )
  }

  render(){
    if(this.props.sesion == null)
      return <Redirect to={"/sala-reservas"} /> ;
    if(this.props.isSuccess === true){
      return(
        <div className="row" >
          <br></br>
          <div className="col  s12 xl10 offset-xl1">
            <h4>Compra aceptada!</h4>
            <div className="divider"></div>
            <div className="section">
              En breve recibirás las entradas en tu correo electrónico. Si no es así, contacte con el administrador enviando un correo a cineticket@gmail.com. Gracias por su compra.
            </div>
          </div>
          <div className="col  s12 xl10 offset-xl1" style={{paddingTop:"2%", paddingBottom:"5%"}}>
            <i style={{fontSize: "100px"}} className="right material-icons">done </i>
          </div>
        </div>
      );
    }else{
      var butacas_reservadas = this.props.butacas_actualizadas.filter((butaca) => (butaca.estado == "seleccionada"));
      if(butacas_reservadas.length == 0)
        return <Redirect to={"/sala-reservas"} /> ;
      var precio_total = butacas_reservadas.length * this.props.sesion.precio;

      return (
          <div className="row" >
            <br></br>
            <div className="col  s12 xl10 offset-xl1">
              <h4>Resumen de tu reserva</h4>
              <div className="divider"></div>
              <div className="section">
                {this.showReservas(butacas_reservadas,precio_total)}
              </div>
            </div>
            <div className="col  s12 xl10 offset-xl1" >
              <br></br>
              <br></br>        
                {(this.props.isSuccess == "procesandose") ? (<Waiting />) : (<StripePago precio_total={precio_total*100}/>)}
            </div>
          </div>
      );
    }

  }
};


function mapStateToProps(state) {
  return { email: state.auth.email,  pelicula : state.reserva.pelicula, sesion : state.reserva.sesion , butacas_actualizadas : state.reserva.butacas_actualizadas, isSuccess : state.reserva.isSuccess};
}

export default connect(mapStateToProps, null)(Checkout);
