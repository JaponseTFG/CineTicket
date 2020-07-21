import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import M from "materialize-css";
import Waiting from "../../Waiting"

const BotonAddPeliculas = (props) => {
  return (
    <div className="col s12 m6 l4 ">
      <Link to={"/admin/peliculas-edit"} onClick={() => props.gotoEdit(null)} className="card grey  lighten-5 hoverable" style={{color:"black",cursor: "pointer",height:"30vh",display: "flex",justifyContent:"center" ,alignItems:"center"}}>
        <i className="large material-icons">add</i>
      </Link>
    </div>
  )
};

class ListadoPeliculas extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.loadListaPeliculas();
  }

  gotoEditPelicula(index){
    this.props.gotoEditPelicula(index);
  }

  deletePelicula(index){

    if(document.querySelectorAll('.toastdelete').length > 0){
      M.Toast.dismissAll();
      this.props.deletePelicula(this.props.lista_peliculas[index]._id, index);
    }else{
      M.toast({
        html: "El elemento se eliminará permanentemente, vuelva a pulsar para confirmar.<p class='hide-on-med-and-up'>&nbsp</p>",
        classes: "right red darken-1 toastdelete",
        displayLength: 2000,
      });
    }
    return;
  }

  Pelicula(pelicula,index){
    return(
      <div key={index} className="col s12 m6 l4">
        <div className="card grey  lighten-5">
          <div className="card-image " >
            <div style={{height:"30vh" ,backgroundImage: `url(${pelicula.src_imagen})`,backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundPosition:"center"}}></div>
            <Link to={"/admin/peliculas-edit"} onClick={() => this.gotoEditPelicula(index)}className="btn-floating  btn-large halfway-fab  deep-purple lighten-2">
              <i className="material-icons">edit</i>
            </Link>
            <button onClick={() => this.deletePelicula(index)} className="btn-floating halfway-fab  red lighten-2" style={{marginRight:"65px"}}>
              <i className="material-icons">delete_forever</i>
            </button>
          </div>
          <div className="card-content activator">
            <span className="card-title truncate activator"><b>{pelicula.titulo}</b></span>
            <p className="truncate activator" style={{paddingTop:"1%"}}>{pelicula.descripcion}</p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4"><b>{pelicula.titulo}</b><i className="material-icons right">close</i></span>
            <p>{pelicula.descripcion}</p>
          </div>
        </div>
      </div>
    );
  }

  showPeliculas(){
    if(this.props && this.props.lista_peliculas){
      return(
        this.props.lista_peliculas.map((pelicula, index) => {
          return(this.Pelicula(pelicula, index));
         })
      );
    }else{
      return <Waiting/>;
    }
  }

  render(){
    console.log(this.props);
    return (
      <div>
        <br className="hide-on-large-only"></br>
        <div className="row" style={{paddingTop:"1%"}}>
          <div className="col s10 m10 l10 offset-s1 offset-m1 offset-l1">
            <div className="row" style={{paddingTop:"1%"}}>
              {this.showPeliculas()}
              <BotonAddPeliculas gotoEdit={this.props.gotoEditPelicula}/>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
};


function mapStateToProps(state) {
  return { lista_peliculas: state.pelis.lista_peliculas };
}

export default connect(mapStateToProps, actions)(ListadoPeliculas);
