const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");

const mongoose = require("mongoose");
const Pelicula = mongoose.model("peliculas"); //si solo pongo un parametro lo accedo
const Sala     = mongoose.model("salas"); //si solo pongo un parametro lo accedo
const Sesion   = mongoose.model("sesiones"); //si solo pongo un parametro lo accedo
const Reserva  = mongoose.model("reservas"); //si solo pongo un parametro lo accedo
const User     = mongoose.model("users");

module.exports = (app) => {

  app.get("/api/listaPeliculasCartelera", async (req, res) => {
    try {
      const foundPeliculas = await Pelicula.find({});
      res.json(foundPeliculas);
    } catch (err) {
      console.log("Error en get /api/listaPeliculasCartelera", err);
      res.send(false);
    }
  });

  app.get("/api/sesionesUndia", async (req, res) => {
    try {
      const id_pelicula = new mongoose.Types.ObjectId(req.query.id_pelicula);
      const dia_ini = new Date(req.query.dia);
      const dia_fin = new Date(req.query.dia).setHours(23, 59, 59);
      let sesiones  = await Sesion
      .find({ _pelicula: id_pelicula, fecha: { $gte: dia_ini, $lt: dia_fin } },"_id fecha _sala precio")
      .populate('_sala').sort({ fecha: "asc" });
      res.send(sesiones);
    } catch (err) {
      console.log("Error en get /api/sesionesUndia", err);
      res.send(false);
    }
  });

  app.get("/api/butacasSesion", requireLogin, async (req, res) => {
    try {
      let foundButacas = await Reserva.find({ _sesion: req.query.id });
      let butacasReservadas = foundButacas.filter( butaca => butaca.estado  == "reservada" );

      if(butacasReservadas.length > 0){
        let hora_actual = new Date().getTime();
        await butacasReservadas.forEach(
          async (butaca, i) => {
            try{
              if(butaca._usuario.toString() == req.user._id)
                butaca.estado = "seleccionada";

              //Limpio las reservas caducadas
              var tiempo_desde_reserva = (hora_actual - butaca.fecha_reserva.getTime());
              if(tiempo_desde_reserva > 600000){
                if(butaca._usuario.toString() == req.user._id)
                  req.user.n_reservas -= 1;
                butaca.fecha_reserva = null;
                butaca._usuario = null;
                butaca.estado = "disponible";
                await butaca.save();
              }
            }catch(err){
              console.log("Error en foreach get butacas sesion", err);
              res.send(false);
            }
        });
        await User.findOneAndUpdate( { _id : req.user._id }, req.user);
      }

      res.json(foundButacas);
    } catch (err) {
      console.log("Error en get /api/butacasSesion", err);
      res.send(false);
    }
  });

  app.post("/api/targetButaca",requireLogin, async (req, res) => {
    try {
        let foundButaca = await Reserva.findOne({ _id: req.body._id });
        let nuevo_estado;

        switch(foundButaca.estado){
          case "disponible" :
            if(req.user.n_reservas > 5)
              return res.json({ success : false, estado : foundButaca.estado});
            foundButaca.fecha_reserva = new Date();
            foundButaca._usuario = req.user._id;
            foundButaca.estado = "reservada";
            req.user.n_reservas += 1;
            await req.user.save();
            await foundButaca.save();
            nuevo_estado = "seleccionada";
          break;
          case "reservada" :
            if(foundButaca._usuario.toString() == req.user._id){
              foundButaca.fecha_reserva = null;
              foundButaca._usuario = null;
              foundButaca.estado = "disponible";
              req.user.n_reservas -= 1;
              await req.user.save();
              await foundButaca.save();
              nuevo_estado = "disponible";
            }else{
              var tiempo_desde_reserva = (new Date().getTime() - foundButaca.fecha_reserva.getTime());
              if(tiempo_desde_reserva < 600000){
                nuevo_estado = "reservada";
              }else{
                if(req.user.n_reservas > 5){
                  foundButaca.fecha_reserva = null;
                  foundButaca._usuario = null;
                  foundButaca.estado = "disponible";
                  await foundButaca.save();
                  return res.json({ success : false, estado : foundButaca.estado});
                }else{
                  foundButaca.fecha_reserva = new Date();
                  foundButaca._usuario = req.user._id;
                  foundButaca.estado = "reservada";
                  req.user.n_reservas += 1;
                  await req.user.save();
                  await foundButaca.save();
                  nuevo_estado = "selecionada";
                }
              }
            }
          break;
          case "ocupada" :
            nuevo_estado = "ocupada";
          break;
          default :
            nuevo_estado = "ocupada";
        }

        res.json({ success : true, estado : nuevo_estado});
    } catch (err) {
      console.log("Error en post /api/targetButaca", err);
      res.send(false);
    }
  });
};
