const JWTService = require('./jwtService');
const { MAX_SESSIONS_LIMIT } = require('../constants');

async function createSession(userInstance, payload = {}) {
  const { accessToken, refreshToken } = await JWTService.createTokens(userInstance);
  const count = await userInstance.countRefreshTokens();
  if (count >= MAX_SESSIONS_LIMIT) {
    const [oldestToken] = await userInstance.getRefreshTokens({
      order: [['updatedAt', 'ASC']],
    });
    await oldestToken.update({
      token: refreshToken,
      ...payload,
    });
  } else {
    await userInstance.createRefreshToken({
      token: refreshToken,
      ...payload,
    });
  }
  return {
    user: userInstance,
    tokenPair: {
      accessToken,
      refreshToken,
    },
  };
}

async function refreshSession(refreshTokenInstance) {
  const userInstance = await refreshTokenInstance.getUser();
  const { accessToken, refreshToken } = await JWTService.createTokens();
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
