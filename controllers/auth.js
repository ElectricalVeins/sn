const { User, RefreshToken } = require('../db/models');
const AuthService = require('../services/authService');
const JWTService = require('../services/jwtService');

module.exports.signIn = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const userInstance = await User.findOne({ where: { email } });

    if (userInstance && (await userInstance.isCorrectPassword(password))) {
      const data = await AuthService.createSession(userInstance);
      res.status(201).send({ data });
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
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await AuthService.createSession(userInstance);
      res.status(201).send({ data });
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
    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (refreshTokenInstance && JWTService.verifyRefreshToken(refreshToken)) {
      const data = await AuthService.refreshSession(refreshTokenInstance);
      res.send({
        data,
      });
      return;
    }
    throw new Error('401: Auth failed. Get new refresh token');
  } catch (err) {
    next(err);
  }
};
