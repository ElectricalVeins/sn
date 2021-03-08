const JWTService = require('./jwtService');
const { MAX_SESSIONS_LIMIT } = require('../config');

async function createSession (user, payload = {}) {
  const { accessToken, refreshToken } = await JWTService.createTokens(user);
  const count = await user.countRefreshTokens();
  if (count >= MAX_SESSIONS_LIMIT) {
    const [oldestToken] = await user.getRefreshTokens({
      order: [['updatedAt', 'ASC']],
    });
    await oldestToken.update({
      token: refreshToken,
      ...payload,
    });
  } else {
    await user.createRefreshToken({
      token: refreshToken,
      ...payload,
    });
  }
  return {
    user,
    tokenPair: {
      accessToken,
      refreshToken,
    },
  };
}

async function refreshSession (refreshTokenInstance) {
  const userInstance = await refreshTokenInstance.getUser(); // getUser ??
  const { accessToken, refreshToken } = await JWTService.createTokens(
    userInstance
  );
  await refreshTokenInstance.update({
    token: refreshToken,
  });
  return {
    user: userInstance,
    tokenPair: {
      accessToken,
      refreshToken,
    },
  };
}

module.exports = {
  createSession,
  refreshSession,
};
