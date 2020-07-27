const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users"); 

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user); //Se renueva cada vez que se verifica la identidad
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, //Heroku utiliza proxy
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.findOne({ googleId: profile.id });
      if (foundUser) {
        done(null, foundUser);
      } else {
        const createdUser = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
        }).save();
        done(null, createdUser);
      }
    }
  )
);

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
