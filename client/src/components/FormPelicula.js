import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import M from "materialize-css";
import Dropzone from "./Dropzone";
import Waiting from "./Waiting";
import axios from "axios";

class FormPelicula extends Component {
  constructor(props) {
    super(props);

    if (this.props.pelicula) {
      this.state = {
        titulo: this.props.pelicula.titulo,
        descripcion: this.props.pelicula.descripcions,
      };
    } else {
      this.state = { titulo: "", descripcion: "" ,selectedFile:"",waiting:false};
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler= this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".fixed-action-btn");
      var instances = M.FloatingActionButton.init(elems, {
        direction: "bottom",
        hoverEnabled: false,
      });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async onSubmit(event) {
    try{
      event.preventDefault();
      if (!event.which) {
        this.setState({ waiting: true });
        delete this.state.waiting;

        const data = new FormData();
        data.append('file', this.state.selectedFile);
        console.log("sending",data);
        const res = await axios.post("/api/admin/upload", data);
        console.log("sended",res);


        //const res = await axios.post("/api/admin/editPelicul", this.selectedFile);
        this.setState({ waiting: false });
      }
    }
    catch(err)
    {
        console.log("error",err);
    }
  }

  onChangeHandler(event){
    this.setState({fileimagen:event.target.files[0]});
    this.state.selectedFile = event.target.files[0];
    event.preventDefault();
  }

  toggleSaveLoading(waiting) {
    console.log("ESOOOOOOOOO",waiting);
    if (waiting) {
      return (
              <React.Fragment>
                <div className="col  m1 s12 hide-on-med-and-down">
                    <Waiting />
                </div>
                <div className="fixed-action-btn hide-on-large-only">
                  <Waiting />
                </div>
              </React.Fragment>
              );
    } else {
      return (
        <React.Fragment>
          <div className="col  m1 s12 hide-on-med-and-down">
              <button onClick={this.preventDefault} className="btn-floating btn-large right blue-grey darken-1">
                <i className="material-icons">save</i>
              </button>
          </div>

        <div className="fixed-action-btn">
          <button className="btn-floating btn-large hide-on-large-only blue-grey darken-1" >
            <i className="large material-icons">save</i>
          </button>
        </div>

        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col  l1"></div>
          <Dropzone/>
          

          <div className="col  l1"></div>
          <div className="col s12 m6 l4">
            <div className="input-field col s12 m12 ">
              <input
                id="film_name"
                name="titulo"
                onChange={this.handleChange}
                value={this.state.titulo}
                type="text"
              />
              <label htmlFor="film_name">Titulo</label>
            </div>
            <div className="input-field col s12 m12 ">
              <textarea
                id="txt_sinopsis"
                name="descripcion"
                onChange={this.handleChange}
                value={this.state.descripcion}
                className="materialize-textarea"
              ></textarea>
              <label htmlFor="txt_sinopsis">Sinopsis</label>
            </div>
          </div>
          <div className="col  l1"></div>

            {this.toggleSaveLoading(this.state.waiting)}

        </div>

      </form>
    );
  }
}

function mapStateToProps(state) {
  return { waiting: state.peli.waiting };
}

export default connect(mapStateToProps, actions)(FormPelicula);
