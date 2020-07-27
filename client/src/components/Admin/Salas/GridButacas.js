import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/salasActions";

import M from "materialize-css";
import Butaca from "./Butaca"

const Fila = (props) => {
  const index_fila = props.index_fila;
  return (props.fila.map((butaca,index_columna)=>{
    return <Butaca key={"b"+index_columna+"_"+index_fila} index_fila={index_fila} index_columna={index_columna}/>
  }));
}

const BodyTabla = (props) => {
  return (props.grid.map((fila,index_fila)=>{
    return <tr key={"f"+index_fila}><Fila fila={fila} index_fila={index_fila}/></tr>
  }));
}

class GridButacas extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.existentGrid)
      return <></>
    else
      return (
            <div className="col s12" style={{overflowX: "auto"}}>
              <table className="centered" >
                <thead>
                </thead>
                <tbody>
                  <BodyTabla grid={this.props.existentGrid}/>
                </tbody>
              </table>
            </div>
          );
  }

}

function mapStateToProps(state) {
  return {existentGrid: state.salas.existentGrid};
}

export default connect(mapStateToProps)(GridButacas);
