const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientReservasSchema = new Schema({
  id_butaca: { type: Schema.Types.ObjectId, ref: "RecipientButaca" },
  id_usuario: { type: Schema.Types.ObjectId, ref: "User" },
  fecha_reserva: { type: Date },
  estado: { type: String },
});

module.exports = recipientReservasSchema; //Esto es un comando, si existe no lo crea;nombre, esquema
