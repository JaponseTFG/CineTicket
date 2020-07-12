const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peliculaSchema = new Schema({
  titulo: {type: String},//Number,
  descripcion:  {type: String}, //Email
  url_imagen:  {type: String}
});

mongoose.model('peliculas',peliculaSchema);//Esto es un comando, si existe no lo crea;nombre, esquema
