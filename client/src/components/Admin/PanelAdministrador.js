import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

class PanelAdministrador extends Component {

  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        <br className="hide-on-large-only"></br>
        <div className="row" style={{paddingTop:"1%"}}>
          <Link to={"/admin/peliculas"} className="col s10 l4 offset-s1 offset-l1 card-panel card-panel hoverable grey  lighten-5" style={{padding:"1%",color:"black"}}>
            <i className="left medium material-icons">movie</i>
            <h5 className="center"><b>PELÍCULAS</b></h5>
          </Link>
          <Link to={"/admin/salas"} className="col s10 l4 offset-s1 offset-l1 card-panel hoverable grey  lighten-5" style={{padding:"1%",color:"black"}}>
            <i className="left medium material-icons">event_seat</i>
            <h5 className="center"><b>SALAS</b></h5>
          </Link>
          <Link to={"/admin/sesiones"} className="col s10 l4 offset-s1 offset-l1 card-panel hoverable grey  lighten-5" style={{padding:"1%",color:"black"}}>
            <i className="left medium material-icons">date_range</i>
            <h5 className="center"><b>SESIONES</b></h5>
          </Link>
          <Link to={"/admin/entradas"} className="col s10 l4 offset-s1 offset-l1 card-panel hoverable grey  lighten-5" style={{padding:"1%",color:"black"}}>
            <i className="left medium material-icons">confirmation_number</i>
            <h5 className="center"><b>ENTRADAS</b></h5>
          </Link>
          <Link to={"/admin/validacion"} className="col s10 l4 offset-s1 offset-l1 card-panel hoverable grey  lighten-5" style={{padding:"1%",color:"black"}}>
            <i className="left medium material-icons">qr_code_scanner</i>
            <h5 className="center"><b>VALIDACIÓN</b></h5>
          </Link>
        </div>
        <br></br>
      </div>
    );
  }
};


export default PanelAdministrador;
