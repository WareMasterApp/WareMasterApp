const express = require('express');
const authRouter = express.Router();
const passport = require('../helpers/pasportStrategy');
const { registerAccount } = require('../controllers/accountController');
const {
  localLogin,
  gitHubLogin,
  googleLogin,
  logout,
} = require('../controllers/authController');

authRouter.post('/signup', registerAccount);

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    session: false,
  }),
  localLogin
);

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
