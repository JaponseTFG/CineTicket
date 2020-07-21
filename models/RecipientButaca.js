const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientButacaSchema = new Schema({
  indice_x: { type: Number },
  indice_y: { type: Number },
  columna: { type: Number },
  fila: { type: Number },
});

module.exports = recipientButacaSchema; //Esto es un comando, si existe no lo crea;nombre, esquema
