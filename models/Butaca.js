const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const butacaSchema = new Schema({
  _sala: {  type: Schema.Types.ObjectId, ref:"salas"},
  indice_x: { type: Number },
  indice_y: { type: Number },
  columna: { type: Number },
  fila: { type: Number },
});

mongoose.model("butacas", butacaSchema); //Esto es un comando, si existe no lo crea;nombre, esquema
