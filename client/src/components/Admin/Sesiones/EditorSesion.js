import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import axios from "axios";
import M from "materialize-css";
import Waiting from "../../Waiting"


const Select = (props) => {
  var opciones = props.opciones.filter(opcion => opcion._id != props.selected._id);

  return(
    <div className="input-field col s12 l4">
      <select name={props.input_name} onChange={props.onChange}>
        <option selected value={props.selected._id}> {props.selected.titulo||props.selected.nombre} </option>
        {opciones.map((opcion) => {return <option value={opcion._id}> {opcion.titulo||opcion.nombre} </option> })}
      </select>
      <label>{props.label}</label>
    </div>
  )
};

const DatePicker = (props) => {
  return(
    <div className="input-field col s12  l4">
        <input name={props.input_name}  type="text"  className="datepicker"></input>
      <label>{props.label}</label>
    </div>
  )
};

const TimePicker = (props) => {
  return(
    <div className="input-field col s12 l4">
        <input id="timepicker" name={props.input_name} placeholder=" " type="text"  className="timepicker"></input>
      <label>{props.label}</label>
    </div>
  )
};

const InputPrecio = (props) => {
  return (
    <div className="input-field col s12  l4 ">
      <input id="precio_sesion" onChange={props.onChange}  placeholder="€" value={props.precio} name={props.input_name} type="text"/>
      <label htmlFor="precio_sesion" >{props.label}</label>
    </div>
  )
};

const SubmitSesion = (props) => {
  return(
    <React.Fragment>
      <div className="col l2 xl2  hide-on-med-and-down valign-wrapper "  style={{justifyContent: "flex-end"}}>
        <Link to={"/admin/sesiones"} className="btn-floating indigo lighten-3 ">
          <i className="material-icons">undo</i>
        </Link>
        &nbsp;&nbsp;
        <button  onClick={props.onSubmit} className="btn-floating btn-large blue-grey darken-1">
          <i className="material-icons">save</i>
        </button>
      </div>
      <div className="fixed-action-btn">
        <button onClick={props.onSubmit} className="btn-floating btn-large hide-on-large-only blue-grey darken-1">
          <i className="large material-icons">save</i>
        </button>
      </div>
      <div className="fixed-action-btn" style={{margin:"0px 70px 8px 0px"}}>
        <Link to={"/admin/sesiones"} className="btn-floating  hide-on-large-only indigo lighten-3">
          <i className="material-icons">undo</i>
        </Link>
      </div>
    </React.Fragment>
  )
}

class EditorSesion extends Component {
  constructor(props) {
    super(props);
    this.handleChangeSesion = this.handleChangeSesion.bind(this);
    this.handleChangeDatepicker = this.handleChangeDatepicker.bind(this);
    this.handleChangeTimepicker = this.handleChangeTimepicker.bind(this);
    this.saveSesion = this.saveSesion.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    M.updateTextFields();

    const fecha = (this.props.sesion.fecha) ? (new Date(this.props.sesion.fecha)) : (new Date());
    this.initPickers(fecha);

    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});

    this.props.actualizaSesion({ fecha: fecha});
  }

  initPickers(fecha){
    var opciones_datepicker = {
      i18n : {
        cancel : "Cancelar",
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        weekdaysAbbrev: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
      },
      defaultDate : fecha,
      setDefaultDate: true,
      minDate : new Date(),
      autoClose : true,
      onSelect : (e)=>{this.handleChangeDatepicker(e)}
    };
    var elem_datepicker = document.querySelectorAll('.datepicker');
    var instance_datepicker = M.Datepicker.init(elem_datepicker,opciones_datepicker);
    document.addEventListener('DOMContentLoaded', instance_datepicker);

    var opciones_timepicker = {
      autoClose : true,
      defaultTime : fecha.getHours()+":"+fecha.getMinutes(),
      twelveHour : false,
      onSelect : (h,m)=>{this.handleChangeTimepicker(h,m)}
    };
    var elem_timepicker = document.getElementById('timepicker');
    var instance_timepicker = M.Timepicker.init(elem_timepicker,opciones_timepicker);
    if(instance_timepicker){
      instance_timepicker._updateTimeFromInput();
      instance_timepicker.done();
      elem_timepicker.blur();
    }
    document.addEventListener('DOMContentLoaded', instance_timepicker);
  }

  handleChangeSesion(event) {
    this.props.actualizaSesion({ [event.target.name]: event.target.value });
  }

  handleChangeDatepicker(dia) {
    var fecha_actualizada = this.props.sesion.fecha;

    fecha_actualizada.setDate(dia.getDate());
    fecha_actualizada.setMonth(dia.getMonth());
    fecha_actualizada.setFullYear(dia.getFullYear());

    this.props.actualizaSesion({ fecha: fecha_actualizada });
  }

  handleChangeTimepicker(hora,minuto) {
    var fecha_actualizada = this.props.sesion.fecha;

    fecha_actualizada.setHours(hora);
    fecha_actualizada.setMinutes(minuto);

    this.props.actualizaSesion({ fecha: fecha_actualizada });
  }

  saveSesion(){
    this.props.saveSesion(this.props.sesion);
  }

  render() {
      if(this.props.isRedirect || this.props.opciones == null)
        return <Redirect to={"/admin/sesiones"} /> ;
      return (
        <div className="row" >
          <br></br>
          <div className="col s12 offset-l1">
            {<Select opciones={this.props.opciones.lista_peliculas} selected={this.props.sesion._pelicula} input_name="_pelicula" label="Pelicula" onChange={this.handleChangeSesion}/>}
            <div className="col  s0 xl1"> </div>
            {<Select opciones={this.props.opciones.lista_salas} selected={this.props.sesion._sala} input_name="_sala" label="Sala" onChange={this.handleChangeSesion}/>}
            <SubmitSesion onSubmit={this.saveSesion} />
            <div className="col  s0 xl12"> </div>
            {<DatePicker input_name="fecha" label="Dia" />}
              <div className="col  s0 xl1"> </div>
            {<TimePicker input_name="hora"  label="Hora" />}
              <div className="col  s0 xl1"> </div>
            {<InputPrecio input_name="precio" precio={this.props.sesion.precio} onChange={this.handleChangeSesion} label="Precio en euros" />}

          </div>
          <div className="col  s12 xl10 offset-xl1" >
            <div className="divider"></div>
            <br></br>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {sesion : state.sesiones.sesion, opciones : state.sesiones.opciones,  isRedirect : state.sesiones.isRedirect};
}

export default connect(mapStateToProps, actions)(EditorSesion);
