const passportStrategy = require('passport');
const Account = require('../models/Account');
const LocalStrategy = require('passport-local').Strategy;
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
  new LocalStrategy({ usernameField: 'email' }, Account.authenticate())
);

passportStrategy.use(
  new GitHubStrategy(
    {
      clientID: GH_CLIENT_ID,
      clientSecret: GH_CLIENT_SECRET,
      callbackURL: GH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let account = await Account.findOne({ providerId: profile.nodeId });
      if (!account) {
        const { nodeId: providerId, username: name, provider } = profile;
        account = await Account.register(
          {
            providerId,
            name,
            provider,
            email: `${providerId}@${provider}.wmapi`,
          },
          providerId
        );
      }
      return done(null, account);
    }
  )
);

passportStrategy.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let account = await Account.findOne({ providerId: profile.id });
      if (!account) {
        const { id: providerId, displayName: name, provider } = profile;
        account = await Account.register(
          {
            providerId,
            name,
            provider,
            email: `${providerId}@${provider}.wmapi`,
          },
          providerId
        );
      }
      return done(null, account);
    }
  )
);

passportStrategy.serializeUser(Account.serializeUser());
passportStrategy.deserializeUser(Account.deserializeUser());

module.exports = passportStrategy;
