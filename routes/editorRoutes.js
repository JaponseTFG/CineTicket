const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const multer = require("multer");
const keys = require("../config/keys");

const mongoose = require("mongoose");
const Pelicula = mongoose.model("peliculas"); //si solo pongo un parametro lo accedo

module.exports = (app) => {
  app.post("/api/admin/editPelicula", async (req, res) => {
    try {
      var docPelicula;
      if(req.query.id){
          docPelicula = await Pelicula.findOne({ _id: req.query.id });
          docPelicula.titulo= req.body.titulo;
          docPelicula.descripcion= req.body.descripcion;
          docPelicula.url_imagen= req.body.url_img;
      }else{
          docPelicula = new Pelicula({
            titulo: req.query.titulo,
            descripcion: req.query.descripcion,
            url_imagen: req.query.url_img,
        });
      }
      await docPelicula.save();
      res.status(200).send("Ok");
    } catch (err) {
      res.status(401).send({ Error: "Bad request" });
    }
  });

  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})
  var upload = multer({ storage: storage }).single('file')
  app.post('/api/admin/upload',function(req, res) {
    console.log(req);
      upload(req, res, function (err) {
             if (err instanceof multer.MulterError) {
                 return res.status(500).json(err)
             } else if (err) {
                 return res.status(500).json(err)
             }
        return res.status(200).send("MANOLO")
      })
  });

};
