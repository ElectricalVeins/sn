// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../app/config');

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const { ACCESS_TOKEN, REFRESH_TOKEN } = config;

async function verifyToken(token, tokenType = ACCESS_TOKEN) {
  return verify(token, tokenType.value);
}

module.exports.createTokens = async (user) => ({
  accessToken: await sign({
    id: user.id,
    role: user.role,
  }, ACCESS_TOKEN.value, {
    expiresIn: ACCESS_TOKEN.exp,
  }),
  refreshToken: await sign({
    id: user.id,
  }, REFRESH_TOKEN.value, {
    expiresIn: REFRESH_TOKEN.exp,
  }),
});

module.exports.verifyAccessToken = (token) => verifyToken(token);
module.exports.verifyRefreshToken = (token) => verifyToken(token, REFRESH_TOKEN);
