import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions/lectorQRActions";


import QrReader from 'react-qr-reader'
import M from "materialize-css";
import Waiting from "../../Waiting"

class LectorQr extends Component {
  state = {
    result: 'No result'
  }
  componentDidMount(){

  }
  handleScan = data => {
    if(data != null){
      this.props.targetEntrada(data);
      this.props.loadEntrada(data);
    }
  }
  handleError = err => {
    console.error(err)
    this.props.targetEntrada(null);
    this.props.loadEntrada(null);
  }

  submitValidar = () => {
    this.props.validaEntrada(this.props.id_entrada);
  }


  showFecha = () => {
    var fecha = new Date(this.props.entrada._sesion.fecha);
    var fecha_formateada  = fecha.toLocaleDateString("es-ES")+" "+fecha.toLocaleTimeString("es-ES" ,{ hour: '2-digit', minute: '2-digit' });
    return fecha_formateada;
  }

  render(){
    console.log(this.props.entrada);
    return(
      <div className="row" >
        <br></br>
        <div className="col s12 m8 xl4 offset-m2 offset-xl1 center">
          <div>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
          </div>
          <h6>{this.props.id_entrada || "escaneando..."}</h6>
          <br></br>
          <button onClick={this.submitValidar} className="btn btn-large center">VALIDAR ENTRADA</button>
        </div>

        <div className="col s12 m8 xl5 offset-m2 offset-xl1" >
          <h4>Información de la entrada</h4>
          <div className="divider"></div>
          <br></br>
          <h5 style={{color:"red"}}><b>{this.props.entrada && (this.props.entrada.validada ? ("ENTRADA YA VALIDADA"):(""))}</b></h5>
          <h6><b>Pelicula: </b>{this.props.entrada && this.props.entrada._sesion._pelicula.titulo}</h6>
          <h6><b>Sala: </b> {this.props.entrada && this.props.entrada._sesion._sala.nombre}</h6>
          <h6><b>Fecha: </b>{this.props.entrada && this.showFecha()}</h6>
          <h6><b>Numero de butacas: </b>{this.props.entrada && this.props.entrada.n_entradas}</h6>
          <br></br>
        </div>
      </div>
    )

  }
}

function mapStateToProps(state) {
  return { entrada : state.validacion.entrada, id_entrada : state.validacion.id_entrada, isValidada: state.validacion.isValidada}
}

export default connect(mapStateToProps, actions)(LectorQr);
