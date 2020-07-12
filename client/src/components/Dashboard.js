import React from "react";
import {Link} from "react-router-dom";
import FormPelicula from "./FormPelicula";

const Dashboard = () => {
  return (
    <div className="row">
      <div className="fixed-action-btn ">
        <a className="btn-floating btn-large hide-on-large-only" style={{ backgroundColor:"#6d547a"}}>
          <i className="large material-icons">save</i>
        </a>
      </div>
      <br></br>
      <div className="col m1"></div>
      <div className="col s12 m10">
          <br></br>
          <div className={"card-panel grey lighten-4"}>
            <FormPelicula />
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
