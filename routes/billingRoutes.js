const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecret);
const requireLogin = require('../middlewares/requireLogin');
const nodemailer = require("nodemailer");
const nodemailerServ = require("../services/nodemailer");
const makepdfServ = require("../services/makepdf");

const path = require('path');
const mongoose = require("mongoose");
const Reserva = mongoose.model("reservas"); //si solo pongo un parametro lo accedo
const Entrada  = mongoose.model("entradas"); //si solo pongo un parametro lo accedo
const Sesion   = mongoose.model("sesiones"); //si solo pongo un parametro lo accedo

var fs = require('fs');

module.exports = (app) => {
  app.get("/api/generapdf2", async (req,res)=>{
    const entradaConfig = {
       titulo_pelicula   : "TIUTL",
       nombre_sala        : "sala",
       str_fecha          : "fecha",
       str_butacas        : "buts",
       str_id             : "idcompra",
       str_fecha_compra   : "fecha",
       filename           : "folename",
    };
    const path_sucess = await makepdfServ.makePdf(entradaConfig);
    console.log(path_sucess);
  });


  app.post("/api/stripe",requireLogin, async (req,res)=>{
    try{
      let foundReservas = await Reserva.find({ _usuario: req.user._id , estado : "reservada"});
      const foundSesion = await Sesion.findOne({ _id: foundReservas[0]._sesion }).populate('_pelicula _sala');
      console.log(foundReservas);
      console.log(foundSesion);

      var precio_total = Math.round(req.user.n_reservas * foundSesion.precio)*100;

      if(precio_total > 0){
        const charge = await stripe.charges.create({
          amount: precio_total,
          currency:'eur',
          source: req.body.id,
          description: "Compra entradas"
        });
        if(charge.status == "succeeded"){
          var success_reserva;
          foundReservas.forEach(async (reserva) => {
            reserva.estado = "ocupada";
            success_reserva = await reserva.save();
          });

          var new_entrada = new Entrada();
          new_entrada._usuario = req.user._id;
          new_entrada._sesion = foundSesion._id;
          new_entrada.n_entradas = req.user.n_reservas;
          new_entrada.fecha_compra = new Date();
          foundReservas.forEach((reserva) =>{
            new_entrada.butacas.push(reserva._id);
          })

          var confirmada = await new_entrada.save();
          console.log("confirmada",confirmada);
          req.user.n_reservas = 0;
          await req.user.save();
          res.send(true);

          var filename = Date.now() +"_"+foundSesion._pelicula.titulo;
          var fecha = new Date(foundSesion.fecha);
          var fecha_formateada  = fecha.toLocaleDateString("es-ES") +" "+ fecha.toLocaleTimeString("es-ES" ,{ hour: '2-digit', minute: '2-digit' });
          var str_butacas="";
          foundReservas.forEach((reserva, i) => {
            str_butacas += ("Fila " + reserva.fila +", Columna "+ reserva.columna +" \n");
          });
          const entradaConfig = {
             titulo_pelicula    : foundSesion._pelicula.titulo.toString(),
             nombre_sala        : foundSesion._sala.nombre.toString(),
             str_fecha          : fecha_formateada,
             str_butacas        : str_butacas,
             str_id             : success_reserva._id.toString(),
             str_fecha_compra   : new Date().toString(),
             filename           : filename,
          };

          const path_sucess = await makepdfServ.makePdf(entradaConfig);

          const emailConfig = {
            destinatario: req.user.email,
            enlace: "https://www.google.com/",
            fileEntrada: {
              filename: filename+".pdf",
              path: path_sucess // stream this file
            }
          };

          const email_sucess = await nodemailerServ.sendEmail(emailConfig);

        }else{
          res.send(false);
        }
      }else{
        res.send(false);
      }
    }catch(err){
      console.log(err);
    }
  });

};
