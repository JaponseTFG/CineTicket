const passport = require("passport"); //importo la libreria
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = (app) => {
  //ruta para lanzar la peticion de los datos del usuario
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //Passport tiene este identificador intrinseco
      scope: ["profile", "email"], //Elijo la informacion que quiero, los identificadores también son intrínsecos
    })
  );
  //ruta de la que obtengo los datos del usuario y lanzo la funcion de callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),

    (req, res) => {
      res.redirect("/");
    }
  ); //es un middleware

  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      if (req.user.tipo == 1) res.send(req.user);
      else res.send({ tipo: req.user.tipo });
    } else {
      res.send(false);
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post(
    "/api/auth/admin",
    passport.authenticate("local", { failureRedirect: "/api/auth/error" }),
    (req, res) => {
      res.send({ tipo: req.user.tipo });
    }
  );

  app.get("/api/auth/error", (req, res) => {
    console.log(res.user);
    res.send(false);
  });

  app.post("/api/auth/admin-new", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10); //salt rounds
    admin = new User({
      username: req.body.username,
      password: hash,
      tipo: 2,
    });
    await admin.save();
    res.send("Ok");
  });

  app.get("/api/auth/admina", (req, res) => {
    res.redirect("localhost:3000/");
  });
};
