const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: {type: String},//Number,
  email:  {type: String}, //Email
  credits:  {type: Number, default:0},
  username:  {type: String}, //Email
  password:  {type: String}, //Email
  tipo:  {type: Number, default:1}, //Email
  n_reservas: {type: Number, default:0}
});

mongoose.model('users',userSchema);//Esto es un comando, si existe no lo crea;nombre, esquema
