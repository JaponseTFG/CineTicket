const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sesionSchema = new Schema({
  _pelicula : {  type: Schema.Types.ObjectId, ref:"peliculas"},
  _sala : {  type: Schema.Types.ObjectId, ref:"salas"},
  fecha: { type: Date},
  precio: { type: Number}
});

mongoose.model("sesiones", sesionSchema); //Esto es un comando, si existe no lo crea;nombre, esquema
