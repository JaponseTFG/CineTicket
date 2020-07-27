const express       = require("express");
const mongoose      = require("mongoose");
const cookieSession = require("cookie-session");
const passport      = require("passport");
const keys          = require("./config/keys");

mongoose.connect(keys.mongoURI);
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//Modelos
require("./models/User");
require("./models/Pelicula");
require("./models/Sala");
require("./models/Sesion");
require("./models/Butaca");
require("./models/Reserva");
require("./models/Entrada");

//Inicialización de passport
require("./services/passport"); //cargo la configuración de passport definida en passport js

//Rutas
require("./routes/authRoutes")(app);
require("./routes/adminRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/checkoutRoutes")(app);




if(process.env.PORT){//Produccion
    app.use(express.static('client/build')); //Bundles js
    const path = require('path');
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT = process.env.PORT || 5000; //Puerto de produccion o puerto 5000
app.listen(PORT);
