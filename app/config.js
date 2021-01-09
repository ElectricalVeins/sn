const path = require('path');

const { env } = process;
module.exports = {
  PORT: env.PORT || 3000,
  MAX_SESSIONS_LIMIT: 3,
  SALT_ROUND: env.SALT_ROUND || 5,
  REFRESH_TOKEN: {
    value: env.REFRESH_TOKEN_SECRET || 'secret',
    exp: env.REFRESH_TOKEN_EXP || '15 days',
  },
  ACCESS_TOKEN: {
    value: env.ACCESS_TOKEN_SECRET || 'secret 2',
    exp: env.ACCESS_TOKEN_EXP || '0.5h',
  },
  STATIC_FILES_DEST: path.resolve(__dirname, '../uploads'),
  STATIC_IMAGES_DIR: 'images/',
};
