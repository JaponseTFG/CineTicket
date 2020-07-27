import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/userActions";

import M from "materialize-css";
import Waiting from "../Waiting"


const DatePicker = (props) => {
  return(
    <div className="input-field col s12  l12" >
        <input name={props.input_name}  Placeholder="Pulsa aquí para elegir un día" type="text"   className="datepicker" style={{cursor : "pointer"}}></input>
    </div>
  )
};

const BotonTargetSesion = (props) => {
  var fecha = new Date(props.sesion.fecha);

  if(props.logged){
    return (
      <React.Fragment>
        <Link to={"/sala-reservas"} onClick={() => props.onClick(props.index)} className="btn">
          {fecha.toLocaleTimeString("es-ES", {hour: '2-digit', minute: '2-digit'})}
        </Link>
        &nbsp;
      </React.Fragment>
    )
  }
  else{
    return (
      <React.Fragment>
        <button onClick={() => props.onClick(props.toast())} className="btn">
          {fecha.toLocaleTimeString("es-ES", {hour: '2-digit', minute: '2-digit'})}
        </button>
        &nbsp;
      </React.Fragment>
    )
  }
};

class PeliculaInfo extends Component {

  constructor(props) {
    super(props);
    this.seleccionaSesion = this.seleccionaSesion.bind(this);
  }

  componentDidMount(){
    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    this.initPicker();


  }

  initPicker(){
    var opciones_datepicker = {
      i18n : {
        cancel : "Cancelar",
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        weekdaysAbbrev: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
      },
      minDate : new Date(),
      autoClose : true,
      onSelect : (e)=>{this.handleChangeDatepicker(e)}
    };
    var elem_datepicker = document.querySelectorAll('.datepicker');
    var instance_datepicker = M.Datepicker.init(elem_datepicker,opciones_datepicker);
    document.addEventListener('DOMContentLoaded', instance_datepicker);
  }

  handleChangeDatepicker(fecha) {
    this.props.targetSesiones(fecha,this.props.pelicula._id);
  }

  seleccionaSesion(index){
    this.props.targetSesion(index);
  }

  toastInfoLogin(){
    M.Toast.dismissAll();
    M.toast({
      html: "Debes iniciar sesión para reservar entradas <p class='hide-on-med-and-up'>&nbsp</p>",
      classes: "right teal lighten-1",
      displayLength: 3000,
    });
  };

  showSesiones(){
    if(this.props.sesiones){
      return this.props.sesiones.map((sesion,index)=>{
        return <BotonTargetSesion key={"s"+index} sesion={sesion} index={index} onClick={this.seleccionaSesion} logged={this.props.auth} toast={this.toastInfoLogin}/>
      });
    }
  }


  render(){
    if(this.props.pelicula == null)
      return <Redirect to={"/"} /> ;
    return (
        <div className="row">
          <div className="col s10 xl4 offset-xl1 offset-s1">
            <div className="card">
              <div id="img_cnt" className="card-image">
                  <img src={this.props.pelicula.src_imagen} ></img>
              </div>
            </div>
          </div>
          <div className="col s10 xl5 offset-xl1 offset-s1" >
            <div className="row">
              <div className="col s12 card grey lighten-5" style={{paddingLeft:"2%",paddingRight:"2%"}}>
                <h3>{this.props.pelicula.titulo}</h3>
                <div className="divider"></div>
                <div className="section">
                  <h6>{this.props.pelicula.descripcion}</h6>
                </div>
              </div>
              <div className="col s12 card grey lighten-5">
                <h5>Elige tu sesión</h5>
                <div className="divider"></div>
                <div className="section" >
                  <DatePicker input_name="target_sesion" label="Día"/>
                </div>
                <div className="section" style={{paddingLeft:"2%",paddingRight:"2%"}}>
                  {this.showSesiones()}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
};


function mapStateToProps(state) {
  return { pelicula:state.reserva.pelicula, sesiones: state.reserva.sesiones ,  auth: state.auth};
}

export default connect(mapStateToProps, actions)(PeliculaInfo);
