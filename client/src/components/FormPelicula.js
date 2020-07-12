import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import M from 'materialize-css';
import * as actions from '../actions';

class FormPelicula extends Component {
  constructor(props){
    super(props);
    if(this.props.pelicula){
      this.pelicula = this.props.pelicula;
    }else{
      this.pelicula = {titulo:null,descripcion:null}
    };
  }
  componentDidMount(){
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
          direction: 'bottom',
          hoverEnabled: false
        });
      });
      console.log(this.nombrePelicula);
      console.log(this.descripcionPelicula);
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
            <input id="film_name" value={this.pelicula.titulo} type="text" />
            <label htmlFor ="film_name">Titulo</label>
        </div>
        <div className="input-field col s12 m12 ">
            <textarea id="txt_sinopsis" className="materialize-textarea">{this.pelicula.descrupcion}</textarea>
            <label htmlFor ="txt_sinopsis">Sinopsis</label>
        </div>
      </div>
    );
  }


  onSubmit(event){
    event.preventDefault();
    if(!event.which)
      this.props.submitPelicula();
  }


  render() {
    return (
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col  l1"></div>
                {this.LeftPanel()}
                <div className="col  l1"></div>
                {this.RightPanel()}
                <div className="col  l1"></div>
                <div className="col  m1 s12 hide-on-med-and-down" >
                  <button onClick={this.preventDefault} className="btn-floating btn-large right blue-grey darken-1">
                    <i className="material-icons">save</i>
                  </button>
                </div>
              </div>
            </form>
    );
  }
}

function mapStateToProps(state) {
  return { waiting : state.peli.waiting, pelicula: state.peli.datosPelicula, };
}

export default connect(mapStateToProps)(FormPelicula);
