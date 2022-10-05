const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  let payload;

  payload = jwt.verify(token, 'some-secret-key');

  try {
    payload = jwt.verify(token, 'some-secret-key');
      if (payload) {
        req.user = payload;
        return next();
      }
  } catch(err) {
    return next(new AuthError('Unauthorized. Token is incorrect or missing'));
  }
}