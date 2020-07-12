const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const {Schema} = mongoose;

const recipientSchema = new Schema({
  email: { type: String },
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema; //Esto es un comando, si existe no lo crea;nombre, esquema
