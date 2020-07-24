import React from "react";
import { Component } from "react";

import M from "materialize-css";
import Butaca from "./Butaca"



const BodyTabla = (props) => {
  var index = -1;
  const Fila = (props) => {
    const index_fila = props.index_fila;
    return (props.fila.map((butaca,index_columna)=>{
      if(butaca){
        index++;
        return <Butaca key = { "b" + index } index = { index }/>
      }else{
        return <td key = { "nll" + index_columna + "_" + index_fila }></td>
      }

    }));
  }
  return (props.grid.map((fila,index_fila)=>{
    return <tr key={"f" + index_fila}><Fila fila={fila} index_fila={index_fila}/></tr>
  }));
}

class GridButacas extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.sala)
      return <></>
    else {
      const x_maxima = this.props.sala.x_maxima;
      const y_maxima = this.props.sala.y_maxima;
      var new_grid = Array(Number(y_maxima)).fill().map((val, index)=>{return Array(Number(x_maxima)).fill(null)});
      this.props.butacas.forEach((butaca, i) => {
        new_grid[butaca.indice_y][butaca.indice_x] = { estado : butaca.estado, id : butaca._id };
      });

    }
    if(!this.props.butacas)
      return <></>
    else
      return (
            <div className="col s12" style={{ overflowX : "auto" }}>
              <table className="centered" >
                <thead>
                </thead>
                <tbody>
                  <BodyTabla grid = { new_grid }/>
                </tbody>
              </table>
            </div>
          );
  }

}



export default GridButacas;
