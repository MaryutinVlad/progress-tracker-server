const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BadRequestError = require('../errors/bad-request-error');
const AuthError = require('../errors/auth-error');

const User = require('../models/users');

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!password) {
    throw new BadRequestError('Password is incorrect or missing');
  }

  if (!validator.isEmail(email)) {
    throw new AuthError('Email is incorrect or missing');
  }

  return bcrypt.hash(password, 10)
  .then((hash) => {
    User.create({
      email,
      password: hash,
    })
      .then((newUser) => User.findById(newUser._id))
      .then((userData) => res.send(userData))
      .catch((err) => {

        if (err.name === 'ValidationError') {
          return next(new BadRequestError(err.message));
        }

        if (err.code === 11000) {
          return res.status(409).send({ message: err.message });
        }

        return next(err);
      });
  })
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {

      if (!user) {
        throw new AuthError('Email or password is incorrect');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {

          if (!matched) {
            throw new AuthError('Email or password is incorrect');
          }

          const token = jwt.sign(
            { _id: user._id },
            'some-secret-key',
            { expiresIn: '7d'},
          );

          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports.validate = (req, res) => {
  const id = req.user._id;
  User.findOne({ id })
    .then((user) => {
      return res.send(user);
    })
};
