const localLogin = (req, res) => {
  req.session.user = req.user._doc;
  res.redirect('/api-docs');
};

const gitHubLogin = (req, res) => {
  req.session.user = req.user;
  res.redirect('/api-docs');
};

const googleLogin = (req, res) => {
  req.session.user = req.user;
  res.redirect('/api-docs');
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = {
  localLogin,
  gitHubLogin,
  googleLogin,
  logout,
};
