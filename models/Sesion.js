const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecipientReservasSchema = require("./RecipientReservas");
//const {Schema} = mongoose;
//barrabaja es convencion

const sesionSchema = new Schema({
  _pelicula : {  type: Schema.Types.ObjectId, ref:"peliculas"},
  _sala : {  type: Schema.Types.ObjectId, ref:"salas"},
  fecha: { type: Date}
});

mongoose.model("sesiones", sesionSchema); //Esto es un comando, si existe no lo crea;nombre, esquema
