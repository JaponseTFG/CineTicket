const passport = require("passport");
const bcrypt   = require("bcrypt");

const mongoose = require("mongoose");
const User     = mongoose.model("users");
const Reserva  = mongoose.model("reservas");

module.exports = (app) => {

  app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"],}));

  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/current_user", async (req, res) => {
    if (req.user) {
      switch(req.user.tipo){
        case 1:
          let foundReservas = await Reserva.find({ _usuario: req.user._id, estado: "reservada"});
          req.user.n_reservas = foundReservas.length;
          await req.user.save();
          res.send(req.user);
        break;
        case 2:
          res.send({ tipo: req.user.tipo });
        break;
        case 3:
          res.send({ tipo: req.user.tipo });
        break;
        default:
        break;
      }
    } else {
      res.send(false);
      console.log("Error en get /api/current_user", err);
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/auth/admin", passport.authenticate("local", { failureRedirect: "/api/auth/error" }), (req, res) => {
      res.send({ tipo: req.user.tipo });
    }
  );

  app.get("/api/auth/error", (req, res) => {
    res.send(false);
  });

  app.post("/api/auth/admin-new", async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10); //salt rounds
      admin = new User({
        username: req.body.username,
        password: hash,
        tipo: 2,
      });
      await admin.save();
      res.send("Ok");
    }catch(err){
      res.send(false);
      console.log("Error en post /api/auth/admin-new", err);
    }
  });

};
