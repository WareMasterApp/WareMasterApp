const express = require('express');
const authRouter = express.Router();
const passport = require('../helpers/pasportStrategy');
const {
  gitHubLogin,
  logout,
  googleLogin,
} = require('../controllers/authController');

authRouter.get('/login', () => {});

authRouter.get('/github/login', passport.authenticate('github'));

authRouter.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    session: false,
  }),
  gitHubLogin
);

authRouter.get(
  '/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  googleLogin
);

authRouter.get('/logout', logout);

module.exports = authRouter;
