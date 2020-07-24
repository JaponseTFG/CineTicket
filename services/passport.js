const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const keys = require("../config/keys"); //dos directorios arriba
const mongoose = require("mongoose");
const User = mongoose.model("users"); //si solo pongo un parametro lo accedo

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    console.log("DESERIALISAO",user);
    done(null, user); //la funcion done le pone a la request en re.user lo que le ponga aqui
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, //o poner la ruta entera
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const createdUser = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
        }).save();
        done(null, createdUser);
      }
    }
  )
); //Puedes usar google

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });
      if (!user || !user.password) {
        return done(null, false);
      }
      const athorized = await bcrypt.compare(password, user.password);
      if (!athorized) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
