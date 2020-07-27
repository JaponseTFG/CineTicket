import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/userActions";

import M from "materialize-css";
import Waiting from "../Waiting"

const Pelicula = (props)=>{
  return(
    <div key={props.index} className="col s12 m6 l6 xl4">
      <div className="card grey  lighten-5">
        <div className="card-image " >
            <img src={props.pelicula.src_imagen} ></img>
          <Link to={"/pelicula-info"} onClick={() => props.onClick(props.index)}className="btn-floating  btn-large halfway-fab  deep-purple lighten-2">
            <i className="material-icons">confirmation_number</i>
          </Link>

        </div>
        <div className="card-content activator">
          <span className="card-title truncate activator"><b>{props.pelicula.titulo}</b></span>
          <p className="truncate activator" style={{paddingTop:"1%"}}>{props.pelicula.descripcion}</p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4"><b>{props.pelicula.titulo}</b><i className="material-icons right">close</i></span>
          <h6>{props.pelicula.descripcion}</h6>
        </div>
      </div>
    </div>
  );
}

class Cartelera extends Component {

  constructor(props) {
    super(props);
    this.selecionaPelicula = this.selecionaPelicula.bind(this);
  }

  componentDidMount(){
    this.props.loadCartelera();
  }

  selecionaPelicula(index){
    this.props.targetPelicula(index);
  }

  showPeliculas(){
    if(this.props && this.props.cartelera){
      return(
        this.props.cartelera.map((pelicula, index) => {
          return(<Pelicula key={"c"+index} pelicula={pelicula} index={index} onClick={this.selecionaPelicula}/>);
         })
      );
    }else{
      return <Waiting/>;
    }
  }

  render(){
    console.log("ESTADOCARTELERA",this.props.cartelera);
    return (
      <div>
        <div className="row">
          <div className="col s10 m10 l10 offset-s1 offset-m1 offset-l1">
            <div className="row" style={{paddingTop:"1%"}}>
              <blockquote style={{borderLeft: "solid #000000"}}>
                <h2>Cartelera</h2>
              </blockquote>
              <div className="divider"></div>
              <br></br>
              {this.showPeliculas()}
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
};


function mapStateToProps(state) {
  return { cartelera: state.reserva.cartelera };
}

export default connect(mapStateToProps, actions)(Cartelera);
