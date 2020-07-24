import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import M from "materialize-css";

class Butaca extends Component {

  constructor(props) {
    super(props);
    this.handleChangeButacas = this.handleChangeButacas.bind(this);
  }

  handleChangeButacas() {
    var valor = this.props.butaca * -1;
    this.props.actualizaButacas({y : this.props.index_fila, x : this.props.index_columna, valor: valor });
  }

  currentClass(){
    if(this.props.butaca == 1)
      return "btn btn-xs";
    else
      return "btn btn-xs transparent";

  }

  render() {
    console.log("BUTAQUED");
    return (
      <td>
        <div onClick={this.handleChangeButacas} className={this.currentClass()} ></div>
      </td>
    );
  }
}

function mapStateToProps(state,ownProps) {
  return {butaca : state.salas.butacas[ownProps.index_fila][ownProps.index_columna]};
}

export default connect(mapStateToProps, actions)(Butaca);
