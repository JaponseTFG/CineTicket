import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import M from "materialize-css";
import Waiting from "../../Waiting"

const ItemEntrada = (props) => {
  var fecha = new Date(props.entrada.fecha_compra);
  var fecha_formateada  = {dia: fecha.toLocaleDateString("es-ES"), hora: fecha.toLocaleTimeString("es-ES" ,{ hour: '2-digit', minute: '2-digit' })}

  return(
    <div className="col s12">
      <div className="col s10">
        <blockquote style={{borderLeft: "solid #000000"}}>
          <h5>
              <p>{props.entrada._usuario.email}&nbsp;&nbsp;</p>
              <p>{fecha_formateada.dia}&nbsp;&nbsp;{fecha_formateada.hora}&nbsp;&nbsp;</p>
          </h5>
        </blockquote>
      </div>
        <div className="col s2">
          <br></br>
          <button onClick={() => props.onDelete(props.index)} className="btn-floating red lighten-2 right">
             <i className="material-icons">delete_forever</i>
           </button>
        </div>
    </div>
  );
}

const SelectSesion = (props) => {
  var opciones = null;

  if(props.opciones){
      opciones = props.opciones.map((opcion) => {
        var fecha = new Date(opcion.fecha);
        var fecha_formateada  = {dia: fecha.toLocaleDateString("es-ES"), hora: fecha.toLocaleTimeString("es-ES" ,{ hour: '2-digit', minute: '2-digit' })}

        return <option value={opcion._id}> {opcion._pelicula.titulo}&nbsp;{opcion._sala.nombre}&nbsp;{fecha_formateada.dia}&nbsp;{fecha_formateada.hora}</option>
    });
  }


  return(
      <div className="input-field col s12 xl10">
        <select name={props.input_name} onChange={props.onChange}>
          {opciones};
        </select>
        <label>{props.label}</label>
      </div>

    )
};


class ListadoEntradas extends Component {

  componentDidMount(){
    M.AutoInit();
    M.updateTextFields();
    this.props.loadOpcionesEntradas();
    this.handleChangeSelected = this.handleChangeSelected.bind(this);
    this.submitSeleccion      = this.submitSeleccion.bind(this);
    this.deleteEntrada        = this.deleteEntrada.bind(this);
  }
  componentDidUpdate(){
    M.AutoInit();
  }
  handleChangeSelected(event) {
    this.props.changeSeleccion(event.target.value);
  }

  submitSeleccion() {
    this.props.loadEntradas(this.props.selected);
  }

  deleteEntrada(index){
    if(document.querySelectorAll('.toastdelete').length > 0){
      this.props.deleteEntrada(this.props.lista_entradas[index]._id, index);
      M.Toast.dismissAll();
    }else{
      M.toast({
        html: "El elemento se eliminará permanentemente, vuelva a pulsar para confirmar.<p class='hide-on-med-and-up'>&nbsp</p>",
        classes: "right red darken-1 toastdelete",
        displayLength: 2000,
      });
    }
    return;
  }

  showEntradas(){

    if(this.props.lista_entradas === false)
      return <h5>No hemos podido encontrar entradas para esa sesion</h5>;

    if(this.props.lista_entradas){
      return(
        this.props.lista_entradas.map((entrada, index) => {
          return(<ItemEntrada key={"entrada"+index} entrada={entrada} onDelete={this.deleteEntrada} index={index}/>);
         })
      );
    }

  }

  render(){
    return(
      <div className="row" >
        <br></br>
        <div className="col s12 offset-xl1">
          {<SelectSesion opciones={this.props.opciones} input_name="sesion" label="Elige una sesion" onChange={this.handleChangeSelected}/>}
          <div className="col s12 xl10">
            <button className="btn right" onClick={this.submitSeleccion}>Cargar entradas</button>
          </div>
        </div>
        <div className="col  s12 xl10 offset-xl1" >
        <br></br>
        <br></br>
          <div className="divider"></div>
          {this.showEntradas()}
          <br></br>
        </div>
      </div>
    );


  }
}

function mapStateToProps(state) {
  return { lista_entradas : state.entradas.lista_entradas, opciones : state.entradas.opciones, selected : state.entradas.selected };
}

export default connect(mapStateToProps, actions)(ListadoEntradas);
