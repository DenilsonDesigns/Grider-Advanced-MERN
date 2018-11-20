const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  );
}

exports.signin = (req, res, next) => {
  //User has already had there email and password authed
  //Just need a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide an email and password"
    });
  }

  User.findOne({ email: email }, (err, existUser) => {
    if (err) {
      return next(err);
    }
    if (existUser) {
      return res.status(422).send({ error: "Email already used" });
    }

    const user = new User({
      email: email,
      password: password
    });
    user.save(err => {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};
