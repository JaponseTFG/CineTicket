const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecipientSchema = require("./Recipient");
//const {Schema} = mongoose;
//barrabaja es convencion

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  tittle: { type: String },
  subject: { type: String },
  body: { type: String },
  recipients: { type: [RecipientSchema] },
  yes: { type: Boolean, default: 0 },
  no: { type: Boolean, default: 0 },
  dateSent:Date,
  lastResponded:Date
});

mongoose.model("surveys", surveySchema); //Esto es un comando, si existe no lo crea;nombre, esquema
