const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecipientButacaEntrada = require("./RecipientButacaEntrada");

const entradaSchema = new Schema({
  _usuario : {type: Schema.Types.ObjectId, ref:"usuarios"},
  _sesion : {type: Schema.Types.ObjectId, ref:"sesiones"},
  n_entradas : {type : Number},
  butacas : [{ type: Schema.Types.ObjectId, ref: 'reservaButacas' }],
  fecha_compra : {type:Date, default new Date()},
});

mongoose.model('entradas',peliculaSchema);//Esto es un comando, si existe no lo crea;nombre, esquema
