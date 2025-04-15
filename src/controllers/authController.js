const gitHubLogin = (req, res) => {
  console.log('USER: ', req.user);
  req.session.user = req.user;
  res.redirect('/api-docs');
};

const googleLogin = (req, res) => {
  console.log('USER: ', req.user);
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
  gitHubLogin,
  googleLogin,
  logout,
};
