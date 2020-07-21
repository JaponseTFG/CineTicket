const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecipienButacaSchema = require("./RecipientButaca");
//const {Schema} = mongoose;
//barrabaja es convencion

const salaSchema = new Schema({
  nombre : { type: String },
  n_asientos : { type: Number },
  x_maxima : { type: Number},
  y_maxima : { type: Number},
});

mongoose.model("salas", salaSchema); //Esto es un comando, si existe no lo crea;nombre, esquema
