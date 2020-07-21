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

const Tabla = (props) => {
  const Fila = (props) => {
    const Butaca = (props) => {
      return <button className="btn-small grey"></button>;
    };
    return props.fila.map((butaca, index) => {
      return (
        <td className>
          <button className="btn"></button>
        </td>
      );
    });
  };
  return props.matrix.map((fila, index) => {
    return (
      <tr>
        <Fila fila={fila} />
      </tr>
    );
  });
};

class EditorSala extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    M.updateTextFields();
  }
  async guardarSala() {
    try {
      let array_asientos = [
        { indice_x: 12, indice_y: 11, columna: 12, fila: 11 },
        { indice_x: 2, indice_y: 1, columna: 4, fila: 12 },
      ];
      let nueva_sala = {
        nombre: "SALA",
        n_asientos: 20,
        x_maxima: 10,
        y_maxima: 10,
        asientos: array_asientos,
      };
      let pelicula_res = await axios.post("/api/admin/editSala", {
        sala: nueva_sala,
      });
    } catch (err) {
      console.log("errorpeticion:", err);
    }
  }
  async getSala() {
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
  async getSalas() {
    try {
      let peliculas_res = await axios.get("/api/admin/listaSalas");
      console.log(peliculas_res);
    } catch (err) {
      console.log("errorpeticion:", err);
    }
  }
  async deleteSala() {
    try {
      let pelicula_res = await axios.post("/api/admin/deleteSala", {
        _id: "5f11755ca5aaec7244a29757",
      });
      console.log(pelicula_res);
    } catch (err) {
      console.log("errorpeticion:", err);
    }
  }
  showMatriza() {}
  showMatriz() {
    var x = 7;
    var y = 5;

    var anterior = [{indice_x: 0, indice_y: 0},{indice_x: 1, indice_y: 1},{indice_x: 1, indice_y: 1}];

    var grid = Array(y).fill().map((valor, indice_y) => {
      return Array(x)
      .fill(indice_y)
      .map((indice_y, indice_x) => {
        return { indice_y, indice_x ,valor : 0};
      });
    });

    anterior.forEach((item, i) => { grid[item.indice_y][item.indice_x].valor = 1});

    console.log(grid);
  }
  async showMatriz2() {
    try {
      var new_matrix = Array(5)
        .fill()
        .map((val, index) => {
          return [1, 1, 1, 1, 1, 1, 1];
        });
      console.log(new_matrix);

      var array_final = Array();
      var count_columnas = 0;
      var count_asientos = 0;
      new_matrix.forEach((fila, indice_y) => {
        count_columnas = 0;
        fila.forEach((butaca, indice_x) => {
          if (butaca > 0) {
            count_columnas++;
            count_asientos++;
            array_final.push({
              indice_y: indice_y,
              indice_x: indice_x,
              fila: indice_y + 1,
              columna: count_columnas,
            });
          }
        });
      });

      var sala = {
        _id: "5f134a913c0e511bf8523e0f",
        nombre: "ULTIMTESTS",
        n_asientos: count_asientos,
        x_maxima: 1,
        y_maxima: 1,
        butacas: array_final,
      };

      let pelicula_res = await axios.post("/api/admin/editSala", {
        sala: sala,
      });

      console.log(sala);
    } catch (err) {
      console.log(err);
    }
  }

  echaUnP() {
    return <p>HOLI</p>;
  }
  showEncabezados() {
    var columnas = 20;
    var new_matrix = Array(columnas).fill(1);
    return new_matrix.map(() => {
      return <th>b</th>;
    });
  }
  showTabla() {
    var filas = 12;
    var columnas = 20;
    var total = filas + columnas;
    var new_butacas = {};
    for (var i = 0; i < columnas; i++) {
      for (var j = 0; j < columnas; j++) {
        var keyname = "b" + i + "" + j;
        new_butacas[keyname] = 1;
      }
    }
    console.log(new_butacas);

    var new_matrix = Array(filas)
      .fill()
      .map((val, index) => {
        return Array(columnas).fill(1);
      });

    return <Tabla matrix={new_matrix} />;
  }

  render() {
    return (
      <div>
        MIPOSTER
        <button onClick={this.guardarSala} type="button" className="btn-large">
          CREAR SALA
        </button>
        <button onClick={this.getSala} type="button" className="btn-large">
          GET SALA
        </button>
        <button onClick={this.getSalas} type="button" className="btn-large">
          GET SALAS
        </button>
        <button onClick={this.deleteSala} type="button" className="btn-large">
          DELETE SALA
        </button>
        <button onClick={this.showMatriz} type="button" className="btn-large">
          SHOW MATRIX
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="row" style={{ padding: "10%" }}>
          <div className="col s12" style={{ overflowX: "auto" }}>
            <table className="centered">
              <thead></thead>
              <tbody>{this.showTabla()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorSala;
