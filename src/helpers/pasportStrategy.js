const passportStrategy = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  GH_CLIENT_ID,
  GH_CLIENT_SECRET,
  GH_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = require('../utils/const.env');

passportStrategy.use(
  new GitHubStrategy(
    {
      clientID: GH_CLIENT_ID,
      clientSecret: GH_CLIENT_SECRET,
      callbackURL: GH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // TODO: Add a user to the database
      // For simplicity, we'll just return the profile here
      return done(null, profile);
    }
  )
);

passportStrategy.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // Allow access to req object in callback
    },
    (req, accessToken, refreshToken, profile, done) => {
      // TODO: Add a user to the database
      // For simplicity, we'll just return the profile here
      return done(null, profile);
    }
  )
);

passportStrategy.serializeUser((user, done) => {
  done(null, user);
});
passportStrategy.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passportStrategy;
