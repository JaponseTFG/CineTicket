import React from "react";
import { Component } from "react";
import M from 'materialize-css';

class Landing extends Component {
  componentDidMount(){
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
          direction: 'bottom',
          hoverEnabled: false
        });
      });
  }
  LeftPanel() {
    return (
      <div className="card-panel col s12 m4  brown lighten-5"  style={{ position:"relative", minHeight:"300px"}}>

      <div className="fixed-action-btn" style={{ position: "absolute", display: "inline-block", top: "10px" }}>
      <a className="btn-floating" style={{ backgroundColor:"#6d547a"}}>
        <i className="large material-icons">mode_edit</i>
      </a>
      <ul>
        <li><a className="btn-floating btn-small red"><i className="material-icons">insert_chart</i></a></li>
        <li><a className="btn-floating btn-small yellow darken-1"><i className="material-icons">format_quote</i></a></li>
        <li><a className="btn-floating btn-small green"><i className="material-icons">publish</i></a></li>
        <li><a className="btn-floating btn-small blue"><i className="material-icons">attach_file</i></a></li>
      </ul>
      </div>


      </div>
    );
  }
  RightPanel() {
    return (
      <div className="col s12 m6 l4">
        <div className="input-field col s12 m12 ">
            <input id="film_name" type="text" />
            <label htmlFor ="film_name">Nombre de la película</label>
        </div>
        <div className="input-field col s12 m12 ">
            <textarea id="txt_sinopsis" className="materialize-textarea"></textarea>
            <label htmlFor ="txt_sinopsis">Sinopsis</label>
        </div>
      </div>
    );
  }
  render() {
    return (
            <div className="row">
              <div className="col   l1"></div>
              {this.LeftPanel()}
              <div className="col   l1"></div>
              {this.RightPanel()}
              <div className="col   l1"></div>
              <div className="col  m1 s12 hide-on-med-and-down" >
                <a className="btn-floating btn-large right blue-grey darken-1">
                  <i className="material-icons">save</i>
                </a>
              </div>
            </div>
    );
  }
}

export default Landing;
