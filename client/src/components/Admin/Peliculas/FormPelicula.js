import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import * as actions from "../../../actions";
import M from "materialize-css";

import Dropzone from "./Dropzone";



const InputTitulo = (props) => {
  return (
    <div className="input-field col s12 m12 ">
      <input id="peli_name" name="titulo" onChange={props.onChange} defaultValue="" value={props.titulo} type="text"/>
      <label className="active" htmlFor="peli_name">Titulo</label>
    </div>
  )
};

const InputDescripcion = (props) => {
  return (
    <div className="input-field col s12 m12 ">
      <textarea id="txt_sinopsis" name="descripcion" onChange={props.onChange} defaultValue="" value={props.descripcion} className="materialize-textarea">
      </textarea>
      <label className="active" htmlFor="txt_sinopsis">Sinopsis</label>
    </div>
  )
};

const ImagenAnterior = (props) => {
  const deleteImagen = () => {
    if(document.querySelectorAll('.toastdelete').length > 0){
      M.Toast.dismissAll();
      props.onDelete({src_imagen:null});
    }else{
      M.toast({
        html: "El elemento se eliminará, vuelva a pulsar para confirmar.<p class='hide-on-med-and-up'>&nbsp</p>",
        classes: "right red darken-1 toastdelete",
        displayLength: 2000,
      });
    }
    return;
  };
  return (
    <div className="col s10 m4 card-panel brown lighten-5" style={{ minHeight: "250px" }}>
      <div className="row">
        <div className="col s12 l12" style={{paddingTop:"2%"}}>
          <button type="button" onClick={deleteImagen} className="btn-floating deep-purple lighten-2 right" ><i className="material-icons">delete_forever</i></button>
        </div>
        <div className="col s12 m12 l8 offset-l2 " style={{paddingTop:"2%"}}>
          <div className="card-panel" style={{BackgroundColor:"#edf2f6", cursor: "pointer",padding:"2%",display: "flex",justifyContent:"center" ,alignItems:"center"}}>
            <img src={props.src} style={{width:"100%"}}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

const Botonera = () => {
    return (
      <React.Fragment>
        <div className="col s2 hide-on-med-and-down valign-wrapper" style={{justifyContent: "flex-end"}} >
          <Link to={"/admin/peliculas"} className="btn-floating indigo lighten-3 ">
            <i className="material-icons">undo</i>
          </Link>
          &nbsp;&nbsp;
          <button  className="btn-floating btn-large blue-grey darken-1">
            <i className="material-icons">save</i>
          </button>
        </div>

        <div className="fixed-action-btn">
          <button className="btn-floating btn-large hide-on-large-only blue-grey darken-1">
            <i className="large material-icons">save</i>
          </button>
        </div>
        <div className="fixed-action-btn" style={{margin:"0px 70px 8px 0px"}}>
          <Link to={"/admin/peliculas"} className="btn-floating  hide-on-large-only indigo lighten-3">
            <i className="material-icons">undo</i>
          </Link>
        </div>

      </React.Fragment>
    );
}

class FormPelicula extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    M.AutoInit();
    M.updateTextFields();
    M.textareaAutoResize(document.getElementById('txt_sinopsis'));
  }

  handleChange(event) {
    this.props.actualizaPelicula({ [event.target.name]: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();
    if (!event.which) {
      if(this.props.pelicula){
        const fdata = new FormData();
        fdata.append("titulo", this.props.pelicula.titulo);
        fdata.append("descripcion", this.props.pelicula.descripcion);

        if(this.props.pelicula._id)
          fdata.append("id", this.props.pelicula._id);
        if(this.props.pelicula.nueva_imagen)
          fdata.append("imagen", this.props.pelicula.nueva_imagen);
        this.props.savePelicula(fdata);
      }else{
          this.props.savePelicula(false);
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.isRedirect && <Redirect to={"/admin/peliculas"} />}
        <div className="row">
          <div className="col  s1 l1"></div>
            {(this.props.pelicula && this.props.pelicula._id && this.props.pelicula.src_imagen)?
              (<ImagenAnterior idPelicula={this.props.pelicula._id} onDelete={this.props.actualizaPelicula} src={this.props.pelicula.src_imagen}/>)
              :(<Dropzone/>)}
          <div className="col s12 m6 l4 offset-l1 ">
            <InputTitulo onChange={this.handleChange} titulo={this.props.pelicula && this.props.pelicula.titulo} />
            <InputDescripcion onChange={this.handleChange} descripcion={this.props.pelicula && this.props.pelicula.descripcion} />
          </div>
          <Botonera />
        </div>
      </form>
    );
  }
}


function mapStateToProps(state) {
  return {pelicula : state.pelis.pelicula, isRedirect : state.pelis.isRedirect};
}

export default connect(mapStateToProps, actions)(FormPelicula);
