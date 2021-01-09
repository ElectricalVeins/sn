// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const {
  env,
  env: {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXP,
  },
} = process;

async function verifyToken(token, tokenType = 'ACCESS_TOKEN') {
  return verify(token, tokenType === 'ACCESS_TOKEN' ? env.ACCESS_TOKEN : env.REFRESH_TOKEN_SECRET);
}

module.exports.createTokens = async (user) => ({
  accessToken: await sign({
    id: user.id,
    role: user.role,
  }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXP,
  }),
  refreshToken: await sign({
    id: user.id,
  }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXP,
  }),
});

module.exports.verifyAccessToken = (token) => verifyToken(token);
module.exports.verifyRefreshToken = (token) => verifyToken(token, 'REFRESH_TOKEN');
