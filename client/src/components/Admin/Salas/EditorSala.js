import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions/salasActions";

import axios from "axios";
import M from "materialize-css";
import Waiting from "../../Waiting"
import GridButacas from "./GridButacas"
import SubmitSala from "./SubmitSala"

const InputNombre = (props) => {
  return (
    <div className="input-field col s6 m3 ">
      <input id="sala_name" onChange={props.onChange}  placeholder="Nombre" defaultValue={props.nombre} name="nombre" type="text"/>
      <label htmlFor="sala_name" >Nombre de la sala</label>
    </div>
  )
};

const InputRangeX = (props) => {
  return (
      <div className="input-field col s12 m3 ">
        <p className="range-field">
          <input name="x_maxima" type="range" id="rangeX" onChange={props.onChange} value={props.x_maxima} min="1" max="30" style={{border:"none"}}/>
        </p>
        <label htmlFor="rangeX" style={{marginTop:"-10px"}} >Eje horizontal:  {props.x_maxima}</label>
      </div>
  )
};

const InputRangeY = (props) => {
  return (
      <div className="input-field col s12 m3 ">
        <p className="range-field ">
          <input name="y_maxima" type="range" id="rangeY" onChange={props.onChange} value={props.y_maxima} min="1" max="30" style={{border:"none"}}/>
        </p>
        <label htmlFor="rangeY" style={{marginTop:"-10px"}}>Eje vertical: {props.y_maxima}</label>
      </div>
  )
};

const InputGrid = (props) => {
  return (
    <div className="input-field col offset-s7 s5 m3 l1 xl1 valign-wrapper" style={{justifyContent: "center"}}>
        <button onClick={props.onClick} className="btn-large "> <i className="material-icons">grid_on</i></button>
    </div>
  )
};

class EditorSala extends Component {
  constructor(props) {
    super(props);
    this.handleChangeSala = this.handleChangeSala.bind(this);
    this.submitReseteaButacas = this.submitReseteaButacas.bind(this);
  }

  componentDidMount() {
    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    M.updateTextFields();
  }

  handleChangeSala(event) {
    this.props.actualizaSala({ [event.target.name]: event.target.value });
  }

  submitReseteaButacas(event){
    this.props.reseteaButacas(this.props.sala.y_maxima,this.props.sala.x_maxima);
  }

  render() {
      return (
        <div className="row" >
          <br></br>
          {this.props.isRedirect && <Redirect to={"/admin/salas"} />}
          <div className="col  s12 xl11 offset-xl1">
            <InputNombre onChange={this.handleChangeSala} nombre={this.props.sala&&this.props.sala.nombre}/>
            <InputRangeY onChange={this.handleChangeSala} y_maxima={this.props.sala&&this.props.sala.y_maxima}/>
            <InputRangeX onChange={this.handleChangeSala} x_maxima={this.props.sala&&this.props.sala.x_maxima}/>
            <InputGrid   onClick={this.submitReseteaButacas} />
            <SubmitSala />
          </div>
          <div className="col  s12 xl10 offset-xl1" >
            <div className="divider"></div>
            <br></br>
            <div className="section">
              {<GridButacas />}
            </div>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {sala : state.salas.sala, isRedirect : state.salas.isRedirect};
}

export default connect(mapStateToProps, actions)(EditorSala);
