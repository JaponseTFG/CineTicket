const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const nodemailerServ = require("../services/nodemailer");

const mongoose = require("mongoose");
const Survey = mongoose.model("surveys"); //si solo pongo un parametro lo accedo

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    try {
      const emailConfig = {
        destinatario: req.user.email,
        dia: "22",
        hora: "22",
        enlace: "https://www.google.com/",
      };

      const email_sucess = await nodemailerServ.sendEmail(emailConfig);

      if(!email_sucess.accepted){
          res.status(400).send({ Error: "Error al enviar" });
      }

      req.user.credits -= 5;

      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send({ Error: "Algo mal" });
    }
  });
};
