import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/userActions";

import M from "materialize-css";

class Butaca extends Component {

  constructor(props) {
    super(props);
    this.handleChangeButacas = this.handleChangeButacas.bind(this);
  }

  handleChangeButacas() {
    if(this.props.butaca.estado != "ocupada")
      this.props.targetButaca(this.props.butaca._id, this.props.index);
  }

  currentClass(){
    switch(this.props.butaca.estado){
      case "disponible" :
        return  "btn btn-xs";
      case "comprobando" :
        return  "btn-floating btn-floating-xs pulse";
      case "seleccionada" :
        return  "btn btn-xs lime accent-4";
      case "reservada" :
        return  "btn btn-xs grey lighten-2";
      case "ocupada" :
        return  "btn btn-xs red darken-1";
      default :
        return  "btn yellow";
    }
  }

  render() {
    console.log(" butaca "+ this.props.butaca._usuario);
    return (
      <td>
        <div onClick={this.handleChangeButacas} className={this.currentClass()} ></div>
      </td>
    );
  }
}

function mapStateToProps(state,ownProps) {
  return {butaca : state.reserva.butacas_actualizadas[ownProps.index]}
}

export default connect(mapStateToProps, actions)(Butaca);
