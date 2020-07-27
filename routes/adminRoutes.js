const requireLoginAdmin = require("../middlewares/requireLoginAdmin");
const upload            = require("../middlewares/imageupload");
const keys              = require("../config/keys");
const fs                = require('fs')
const fsPromises        = fs.promises;

const mongoose = require("mongoose");
const Usuario  = mongoose.model("users");
const Pelicula = mongoose.model("peliculas");
const Sala     = mongoose.model("salas");
const Sesion   = mongoose.model("sesiones");
const Butaca   = mongoose.model("butacas");
const Reserva  = mongoose.model("reservas");
const Entrada  = mongoose.model("entradas");

module.exports = (app) => {

  /// RUTAS VALIDACIÓN ENTRADAS //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/api/admin/findEntrada", requireLoginAdmin, async (req, res) => {
    try {
      const foundEntrada = await Entrada.findOne({ _id : req.query.id_entrada }).populate([
        {
          path: '_sesion',
          model: 'sesiones',
          select: '_pelicula _sala fecha',
    		  populate:[ {
    		    path: '_pelicula',
    			  model: 'peliculas',
            select: 'titulo'
    		  },
          {
    		    path: '_sala',
    			  model: 'salas',
            select: 'nombre'
    		  }]
        },
      ]);

      if(foundEntrada){
        res.json(foundEntrada);
      }else{
        res.send(false);
      }
    }catch(err){
      console.log("Error en get/findEntrada", err);
      res.send(false);
    }
  });

  app.post("/api/admin/validaEntrada", requireLoginAdmin, async (req, res) => {
    try {
      const foundEntrada = await Entrada.findOne({ _id : req.body._id });
      if(foundEntrada.validada == true){
        res.send(false);
      }else{
        foundEntrada.validada = true;
        await foundEntrada.save();
        res.send(true);
      }
    }catch(err){
      console.log("Error en post/validaEntrada");
      res.send(false);
    }
  });

  app.get("/api/admin/findUsuario", requireLoginAdmin, async (req, res) => {
    try{
      const foundUsuario = await Usuario.findOne({ email : req.query.email });
      res.send((foundUsuario) ? (foundUsuario) : (false));
    }catch(err){
      console.log("Error en get/findUsuario", err);
      res.send(false);
    }
  });

  /// RUTAS EDICION ENTRADAS /////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/api/admin/listaEntradas", requireLoginAdmin, async (req, res) => {
    try{
      const foundEntradas = await Entrada.find({ _sesion : req.query.id_sesion }).populate('_usuario', 'email').sort({ fecha_compra : 'ascending'});
      res.send((foundEntradas.length > 0) ? (foundEntradas) : (false))
    }catch(err){
      console.log("Error en get/listaEntradas", err);
      res.send(false);
    }
  });

  app.post("/api/admin/deleteEntrada", requireLoginAdmin, async (req, res) => {
    try {
      const isDeleted = await Entrada.findByIdAndDelete({ _id : req.body._id });
      res.send((isDeleted) ? (true) : (false));
    }catch(err){
      console.log("Error en post/validaEntrada");
      res.send(false);
    }
  })

  /// RUTAS EDICION SESIONES /////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.post("/api/admin/editSesion", requireLoginAdmin, async (req, res) => {
    try{
      if(req.body.sesion._id){
        let lastSesion = await Sesion.findOneAndUpdate({_id : req.body.sesion._id},req.body.sesion);
        if(lastSesion._sala != req.body.sesion._sala){
          let removedReservas = await Reserva.deleteMany({ _sesion : req.body.sesion._id });
          let foundButacas    = await Butaca.find({ _sala: req.body.sesion._sala },'-_id indice_x indice_y columna fila').lean();
          foundButacas.map((butaca) => { butaca._sesion = req.body.sesion._id });
          let newReservas = await Reserva.insertMany(foundButacas);
          res.send((lastSesion && newReservas) ? (true) : (false));
        }else{
          res.send((lastSesion) ? (true) : (false));
        }
      }else{
        let newSesion    = await new Sesion(req.body.sesion).save();
        let foundButacas = await Butaca.find({ _sala: newSesion._sala },'-_id indice_x indice_y columna fila').lean();
        foundButacas.map((butaca) => { butaca._sesion = newSesion._id });
        let newReservas = await Reserva.insertMany(foundButacas);
        res.send((newSesion && newReservas) ? (true) : (false));
      }
    }catch(err){
      console.log("ERROR en post/editSesion:", err);
      res.send(false);
    }
  });

  app.get("/api/admin/listaSesiones", requireLoginAdmin, async (req, res) => {
    try{
      let foundListaSesiones  = await Sesion.find({}).populate('_pelicula','titulo').populate('_sala','nombre').sort({ fecha : 'ascending'});
      let foundListaPeliculas = await Pelicula.find({},'_id titulo');
      let foundListaSalas     = await Sala.find({},'_id nombre');
      const opciones = { lista_peliculas : foundListaPeliculas, lista_salas : foundListaSalas };
      res.json({ lista_sesiones : foundListaSesiones, opciones });
    }catch(err){
      console.log("ERROR en get/listaSesiones:", err);
      res.send(false);
    }
  });

  app.post("/api/admin/deleteSesion", requireLoginAdmin, async (req, res) => {
    try{
      let removedSesion   = await Sesion.findByIdAndDelete(req.body._id);
      let removedReservas = await Reserva.deleteMany({ _sesion : req.body._id });
      let removedEntradas = await Entrada.deleteMany({ _sesion : req.body._id });
      res.send((removedSesion && removedReservas && removedEntradas) ? (true) : (false));
    }catch(err){
      console.log("ERROR en post/deleteSesion:", err);
      res.send(false);
    }
  });

  app.get("/api/admin/sesion", requireLoginAdmin, async (req, res) => {
    try{
      const foundSesion = await Sesion.findOne({ _id: req.query.id });
      res.send(foundSesion);
    }catch(err){
      console.log("ERROR en get/sesion:", err);
      res.send(false);
    }
  });

  /// RUTAS EDICION SALAS ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.post("/api/admin/editSala", requireLoginAdmin, async (req, res) => {
    try{
      if(req.body.sala._id){
        let lastSala = await Sala.findOneAndUpdate({ _id : req.body.sala._id },req.body.sala);
        let removedButacas = await Butaca.deleteMany({ _sala :  req.body.sala._id} );
        let newButacas = false;
        if(removedButacas)
          newButacas = await Butaca.insertMany(req.body.butacas);
        res.send((lastSala && newButacas)?(true):(false));
      }else{
        let newSala = await new Sala(req.body.sala).save();
        req.body.butacas.map((butaca)=>{butaca._sala = newSala._id});
        let newButacas = await Butaca.insertMany(req.body.butacas);
        res.send((newSala && newButacas)?(true):(false));
      }
    }catch(err){
      console.log("ERROR en post/editSala:", err);
      res.send(false);
    }
  });

  app.post("/api/admin/deleteSala", requireLoginAdmin, async (req, res) => {
    try{
      var isUsandose = await Sesion.findOne({_sala: req.body._id});
      if(isUsandose){
        res.send(false);
      }else{
        var removedSala    = await Sala.findByIdAndDelete(req.body._id);
        var removedButacas = await Butaca.deleteMany({_sala :  req.body._id});
        res.send((removedSala && removedButacas)?(true):(false));
      }
    }catch(err){
      console.log("ERROR en post/deleteSala:", err);
      res.send(false);
    }
  });

  app.get("/api/admin/listaSalas", requireLoginAdmin, async (req, res) => {
    try{
      const foundListaSalas = await Sala.find({},'_id nombre n_asientos');
      res.json(foundListaSalas);
    }catch(err){
      console.log("ERROR en get/listaSalas:", err);
      res.send(false);
    }
  });

  app.get("/api/admin/sala", requireLoginAdmin, async (req, res) => {
    try{
      const foundSala = await Sala.findOne({_id: req.query.id});
      const foundButacas =  await Butaca.find({_sala: req.query.id});
      res.send({sala:foundSala,butacas:foundButacas});
    }catch(err){
      console.log("ERROR en get/sala:", err);
      res.send(false);
    }
  });

  /// RUTAS EDICION PELICULAS ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.post("/api/admin/editPelicula", requireLoginAdmin, upload.single("imagen"), async (req, res) => {
    try {
      var src_imagen = req.file ? "/uploads/" + req.file.filename.replace(" ", "_") : null;

      if (req.body.id) {//edit
        var pelicula = await Pelicula.findOne({ _id: new mongoose.Types.ObjectId(req.body.id) });
        pelicula.titulo = req.body.titulo;
        pelicula.descripcion = req.body.descripcion;
        src_imagen && (pelicula.src_imagen = src_imagen);//Si ha cambiado la imagen guarda la url nueva
      } else {//nueva
        var pelicula =  new Pelicula({
          titulo: req.body.titulo,
          descripcion: req.body.descripcion,
          src_imagen: src_imagen,
        });
      }

      await pelicula.save();
      res.send(pelicula);
    } catch (err) {
      console.log("ERROR en post/api/admin/editPelicula:", err);
      res.status(401).send({ Error: "Bad request" });
    }
  });

  app.post("/api/admin/deletePelicula", requireLoginAdmin, async (req, res) => {
    try {
      var isUsandose = await Sesion.findOne({ _pelicula: new mongoose.Types.ObjectId(req.body.id) });
      if(isUsandose){
        res.send(false);
      }else{
        let removedImage    = false;
        let removedPelicula = false;

        removedPelicula = await Pelicula.findByIdAndDelete(new mongoose.Types.ObjectId(req.body.id));
        if(removedPelicula.src_imagen)
          removedImage = await fsPromises.unlink("./public"+removedPelicula.src_imagen);

        res.send((removedPelicula || removedImage) ? true : false);
      }
    } catch (err) {
      console.log("ERROR en post/api/admin/deletePelicula:", err);
      res.status(401).send({ Error: "Bad request" });
    }
  });

  app.get("/api/admin/listaPeliculas", requireLoginAdmin, async (req, res) => {
    try {
      const foundPeliculas = await Pelicula.find({});
      res.json(foundPeliculas);
    } catch (err) {
      console.log("ERROR en post/api/admin/listaPeliculas:", err);
      res.send(false);
    }
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};
