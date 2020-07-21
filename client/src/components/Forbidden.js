import React from "react";
import { Component } from "react";

class Forbidden extends Component {
  render(){
    return (
      <div>
        <h5 className="center-align">Error 403: Debes estar autenticado para poder acceder a esta ruta.<br></br></h5>
        <br></br>
      </div>
    );
  }
};

export default Forbidden;
