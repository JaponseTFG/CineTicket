const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: {type: String},//Number,
  credits:  {type: Number, default:0}
});

mongoose.model('users',userSchema);//Esto es un comando, si existe no lo crea;nombre, esquema
