const express = require("express"); //(Common JS)//import express from 'express'
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();

//Middlewares
app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Load models
require("./models/User");
require("./services/passport"); //cargo el servicio passport definido en passport js
require("./routes/authRoutes")(app); // cuando hago el require, se devuelve la funcion e inmediatamente se lanza passandole app
require("./routes/billingRoutes")(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/buid'));
    const path = require('path'); 
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','buid','index.html'));
    });
}

const PORT = process.env.PORT || 5000; //Escucho al puerto que me da Heroku o al 5000
app.listen(PORT); //puerto
