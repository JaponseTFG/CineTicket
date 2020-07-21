const keys = require('../config/keys');

const requireLogin = require('../middlewares/requireLogin');

const mongoose = require("mongoose");
const Pelicula = mongoose.model("peliculas"); //si solo pongo un parametro lo accedo
const Sala     = mongoose.model("salas"); //si solo pongo un parametro lo accedo
const Sesion     = mongoose.model("sesiones"); //si solo pongo un parametro lo accedo

module.exports = (app) => {

  app.get("/api/listaPeliculasCartelera", async (req, res) => {
    try {
      const foundPeliculas = await Pelicula.find({});
      res.json(foundPeliculas);
    } catch (err) {
      res.send(false);
    }
  });

  app.get("/api/sesionesUndia", async (req, res) => {
    try {
      const id_pelicula = new mongoose.Types.ObjectId(req.query.id_pelicula);
      const dia_ini = new Date(req.query.dia);
      const dia_fin = new Date(req.query.dia).setHours(23, 59, 59);
      let sesiones = await Sesion.find( { _pelicula : id_pelicula, fecha : { $gte : dia_ini, $lt : dia_fin } },'_id fecha').sort({ fecha : 'asc' });
      res.send(sesiones);
      //const sesion = await Sesion.findOne({_id: new mongoose.Types.ObjectId(req.query.id)});
    } catch (err) {
      res.send(false);
    }
  });

};
