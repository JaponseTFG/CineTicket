const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
  _sesion: {type: Schema.Types.ObjectId, ref:"sesiones"},
  _usuario: { type: Schema.Types.ObjectId, ref: "User" },
  indice_x: { type: Number },
  indice_y: { type: Number },
  columna: { type: Number },
  fila: { type: Number },
  fecha_reserva: { type: Date },
  estado: { type: String , default: "disponible"},
});

mongoose.model('reservas',reservaSchema);//Esto es un comando, si existe no lo crea;nombre, esquema
