const passport = require("passport"); //importo la libreria

module.exports = (app) => {
  //ruta para lanzar la peticion de los datos del usuario
  app.get(
    "/auth/google",
    passport.authenticate("google", {//Passport tiene este identificador intrinseco
      scope: ["profile", "email"], //Elijo la informacion que quiero, los identificadores también son intrínsecos
    })
  );
  //ruta de la que obtengo los datos del usuario y lanzo la funcion de callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),

    (req, res) => {
      res.redirect("/surveys");
    }
  ); //es un middleware

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
