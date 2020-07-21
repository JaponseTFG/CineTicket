import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import M from "materialize-css";
import Waiting from "../../Waiting"

const ItemSesion = (props) => {
  const ItemSesionSmall = (props) => {
    return(
      <div className="hide-on-large-only">
        <div className="col s12">
            <h5 className="valign-wrapper"  style={{justifyContent: "center", textAlign:"center"}}>
              {props.sesion._pelicula.titulo}&nbsp;&nbsp;{props.sesion._sala.nombre} &nbsp;&nbsp;{props.fecha.dia}&nbsp;&nbsp;{props.fecha.hora}
            </h5>
        </div>
        <div className="col s12">
            <div className="divider"></div>
            <h5 className="valign-wrapper"  style={{justifyContent: "center"}}>
              <span>
                <button onClick={() => props.onDelete(props.index)} className="btn-floating red lighten-2" style={{marginRight: "20px"}}>
                   <i className="material-icons">delete_forever</i>
                 </button>
                 <Link to={"/admin/sesiones-edit"} onClick={() => props.onEdit(props.index)} className="btn-floating btn-large deep-purple lighten-2 " >
                   <i className="material-icons">edit</i>
                 </Link>
              </span>
            </h5>
        </div>
      </div>
    )
  }
  const ItemSesionLarge = (props) => {
    return(
      <div className="col s12 hide-on-med-and-down">
        <blockquote style={{borderLeft: "solid #000000"}}>
          <h5 className="valign-wrapper"  style={{justifyContent: "space-between"}}>
            <span className="valign-wrapper">
              {props.sesion._pelicula.titulo}&nbsp;&nbsp;{props.sesion._sala.nombre}&nbsp;&nbsp;{props.fecha.dia}&nbsp;&nbsp;{props.fecha.hora}
            </span>
            <span >
              <button onClick={() => props.onDelete(props.index)} className="btn-floating red lighten-2" style={{marginRight: "20px"}}>
                 <i className="material-icons">delete_forever</i>
               </button>
               <Link to={"/admin/sesiones-edit"} onClick={() => props.onEdit(props.index)} className="btn-floating btn-large deep-purple lighten-2 " >
                 <i className="material-icons">edit</i>
               </Link>
            </span>
          </h5>
        </blockquote>
      </div>
    )
  }

  var fecha = new Date(props.sesion.fecha);
  var fecha_formateada  = {dia: fecha.toLocaleDateString("es-ES"), hora: fecha.toLocaleTimeString("es-ES" ,{ hour: '2-digit', minute: '2-digit' })}

  return (
    <div className="col s12 card ">
      <ItemSesionSmall  sesion={props.sesion} fecha={fecha_formateada} onDelete={props.onDelete} onEdit={props.onEdit} index={props.index}/>
      <ItemSesionLarge  sesion={props.sesion} fecha={fecha_formateada} onDelete={props.onDelete} onEdit={props.onEdit} index={props.index}/>
    </div>
  )
};

const BotonAddSesion = (props) => {
  return (
      <Link  to={"/admin/sesiones-edit"} onClick={() => props.gotoEdit(null)} className="col s12 card hoverable" style={{color:"black",cursor: "pointer",display: "flex",justifyContent:"center" ,alignItems:"center"}}>
          <i className="large material-icons">add</i>  <h5></h5>
      </Link>
  );
}

class ListadoSesiones extends Component {

  constructor(props) {
    super(props);
    this.deleteSesion   = this.deleteSesion.bind(this);
    this.gotoEditSesion = this.gotoEditSesion.bind(this);
  }

  componentDidMount(){
    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    this.props.loadListaSesiones();
  }

  deleteSesion(index){
    if(document.querySelectorAll('.toastdelete').length > 0){
      this.props.deleteSesion(this.props.lista_sesiones[index]._id,index);
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

  gotoEditSesion(index){
    if(index !== null)
      this.props.loadSesion(index);
    else
      this.props.loadSesion(null);
  }

  showSesiones(){
    if(this.props.lista_sesiones){
      return(
        this.props.lista_sesiones.map((sesion, index) => {
          return(<ItemSesion key={"lsesion"+index} sesion={sesion} onDelete={this.deleteSesion} onEdit={this.gotoEditSesion} index={index}/>);
         })
      );
    }else{
      return <Waiting/>;
    }
  }

  render(){

    return (
      <div>
        <br className="hide-on-large-only"></br>
        <div className="row" style={{paddingTop:"1%"}}>
          <div className="col s10 m10 l10 offset-s1 offset-m1 offset-l1">
            <div className="row" style={{paddingTop:"1%"}}>
              {this.showSesiones()}
              <BotonAddSesion gotoEdit={this.gotoEditSesion}/>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
};



function mapStateToProps(state) {
  return { lista_sesiones: state.sesiones.lista_sesiones };
}

export default connect(mapStateToProps, actions)(ListadoSesiones);
