import React from "react";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

import axios from "axios";
import M from "materialize-css";

const InputTitulo = (props) => {
  return (
    <div className="input-field col s12 m12 ">
      <input
        id="peli_name"
        name="titulo"
        onChange={props.onChange}
        defaultValue={props.titulo}
        type="text"
      />
      <label htmlFor="peli_name">Titulo</label>
    </div>
  );
};
const InputDescripcion = (props) => {
  return (
    <div className="input-field col s12 m12 ">
      <textarea
        id="txt_sinopsis"
        name="descripcion"
        onChange={props.onChange}
        defaultValue={props.descripcion}
        className="materialize-textarea"
      ></textarea>
      <label htmlFor="txt_sinopsis">Sinopsis</label>
    </div>
  );
};

const Select = (props) => {
  var peliculas = [
    { _id: "5f1361", titulo: "Anacardo" },
    { _id: "e1582", titulo: "Cacau" },
    { _id: "743a2614", titulo: "Cacau" },
    { _id: "eca2e", titulo: "Pansa" },
  ];

  function ale(event) {
    console.log({ [event.target.name]: event.target.value });
  }

  return (
    <div className="input-field col s6 ">
      <select name="pelisculilla" onChange={ale}>
        {peliculas.map((pelicula) => {
          return <option value={pelicula._id}> {pelicula.titulo} </option>;
        })}
      </select>
      <label>Pelicula</label>
    </div>
  );
};

class EditorSesion extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    M.AutoInit();
    var opciones = {
      i18n: {
        cancel: "Cancelar",
        months: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        monthsShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
        weekdays: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
        weekdaysAbbrev: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      },
      minDate: new Date(),
      autoClose: true,
      onSelect: (e) => {
        this.show(e);
      },
    };
    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems, opciones);
    document.addEventListener("DOMContentLoaded", instances);
  }

  async guardarSesion() {
    try {
      var dia = "2020-07-19";
      var hora = "12:30:00";
      var str_date = dia + "T" + hora + "Z";

      let sesion = {
        _pelicula: "5f10b11cd014db51746b2737",
        _sala: "5f136e1582743a26141eca2e",
        fecha: new Date(str_date),
      };
      let sesion_res = await axios.post("/api/admin/editSesion", {
        sesion: sesion,
      });
    } catch (err) {
      console.log("errorpeticion:", err);
    }
  }
  async getSesion() {
    try {
      let id_sala = "5f11755ca5aaec7244a29757";
      let sala_res = await axios.get("/api/admin/sala?id=" + id_sala, {
        responseType: "json",
      });
      console.log(sala_res);
    } catch (err) {
      console.log("errorpeticion:", err);
    }
  }
  async getSesiones() {
    try {
      let peliculas_res = await axios.get("/api/admin/listaSalas");
      console.log(peliculas_res);
    } catch (err) {
      console.log("errorpeticion:", err);
    }
  }
  async deleteSesion() {
    try {
      let pelicula_res = await axios.post("/api/admin/deleteSala", {
        _id: "5f11755ca5aaec7244a29757",
      });
      console.log(pelicula_res);
    } catch (err) {
      console.log("errorpeticion:", err);
    }
  }

  async show(e) {
    try {
      console.log("e",e);
      var fecha = e;
      var id_pelicula = "5f10b11cd014db51746b2737";
      let sala_res = await axios.get(
        "/api/sesionesUndia?id_pelicula="+id_pelicula+"&dia="+fecha,
        { responseType: "json" }
      );
    } catch (err) {
      console.log("ERRORSITO");
    }
  }

  render() {
    return (
      <div>
        MIPOSTER
        <button
          onClick={this.guardarSesion}
          type="button"
          className="btn-large"
        >
          CREAR SESION
        </button>
        <button onClick={this.getSesion} type="button" className="btn-large">
          GET SESION
        </button>
        <button onClick={this.getSesion} type="button" className="btn-large">
          GET SESION
        </button>
        <button onClick={this.deleteSesion} type="button" className="btn-large">
          DELETE SESION
        </button>
        <button onClick={this.sho} type="button" className="btn-large">
          SHOW
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="row" style={{ padding: "10%" }}>
          <div className="col s12" style={{ overflowX: "auto" }}>
            <input
              name="fecha"
              onChange={this.show}
              id="start"
              type="text"
              className="datepicker"
            ></input>
          </div>
        </div>
        <Select />
      </div>
    );
  }
}

export default EditorSesion;
