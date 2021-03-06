const UserQueries = require('../queries/user');
const AuthQueries = require('../queries/auth');
const AuthService = require('../services/authService');
const JWTService = require('../services/jwtService');

module.exports.signIn = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const user = await UserQueries.getByEmail(email);

    if (user && (await user.isCorrectPassword(password))) {
      const data = await AuthService.createSession(user);
      res.status(201).send(data);
      return;
    }
    throw new Error('401: Auth failed');
  } catch (err) {
    next(err);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserQueries.setNew(body);
    if (user) {
      const data = await AuthService.createSession(user);
      res.status(201).send(data);
      return;
    }
    throw new Error('401: Auth failed');
  } catch (err) {
    next(err);
  }
};

module.exports.updateRefreshToken = async (req, res, next) => {
  try {
    const { body: { refreshToken } } = req;
    const token = await AuthQueries.getByValue(refreshToken);
    if (token && JWTService.verifyRefreshToken(refreshToken)) {
      const data = await AuthService.refreshSession(token);
      res.send(data);
      return;
    }
    throw new Error('401: Auth failed. Get new refresh token');
  } catch (err) {
    next(err);
  }
};
