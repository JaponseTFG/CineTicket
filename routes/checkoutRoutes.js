const requireLogin   = require('../middlewares/requireLogin');
const nodemailer     = require("nodemailer");
const nodemailerServ = require("../services/nodemailer");
const makepdfServ    = require("../services/makepdf");
const path           = require('path');
const keys           = require('../config/keys');
const stripe         = require('stripe')(keys.stripeSecret);

const mongoose = require("mongoose");
const Reserva  = mongoose.model("reservas"); //si solo pongo un parametro lo accedo
const Entrada  = mongoose.model("entradas"); //si solo pongo un parametro lo accedo
const Sesion   = mongoose.model("sesiones"); //si solo pongo un parametro lo accedo



module.exports = (app) => {

  app.post("/api/stripe",requireLogin, async (req,res)=>{
    try{
      let foundReservas = await Reserva.find({ _usuario: req.user._id , estado : "reservada"});
      const foundSesion = await Sesion.findOne({ _id: foundReservas[0]._sesion }).populate('_pelicula _sala');
      var precio_total  = Math.round(req.user.n_reservas * foundSesion.precio)*100;

      if(precio_total > 0){

        const charge = await stripe.charges.create({
          amount: precio_total,
          currency:'eur',
          source: req.body.id,
          description: "Compra entradas"
        });

        if(charge.status == "succeeded"){

          foundReservas.forEach(async (reserva) => {
            reserva.estado = "ocupada";
            await reserva.save();
          });

          var new_entrada = new Entrada();
          new_entrada._usuario = req.user._id;
          new_entrada._sesion = foundSesion._id;
          new_entrada.n_entradas = req.user.n_reservas;
          new_entrada.fecha_compra = new Date();
          foundReservas.forEach((reserva) =>{
            new_entrada.butacas.push(reserva._id);
          })
          new_entrada = await new_entrada.save();

          req.user.n_reservas = 0;
          await req.user.save();
          res.send(true);

          //Generación del PDF y envio del correo
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
             str_id             : new_entrada._id.toString(),
             str_fecha_compra   : new Date().toString(),
             filename           : filename,
          };

          const path_pdf = await makepdfServ.makePdf(entradaConfig);

          const emailConfig = {
            destinatario: req.user.email,
            enlace: "https://www.google.com/",
            fileEntrada: {
              filename: filename+".pdf",
              path: path_pdf // stream this file
            }
          };

          await nodemailerServ.sendEmail(emailConfig);

        }else{
          res.send(false);
        }
      }else{
        res.send(false);
      }
    }catch(err){
      res.send(false);
      console.log("Error en post /api/stripe", err);
    }
  });

};
