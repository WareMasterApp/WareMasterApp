const passportStrategy = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const {
  GH_CLIENT_ID,
  GH_CLIENT_SECRET,
  GH_CALLBACK_URL,
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
      // User.create(profile);
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
