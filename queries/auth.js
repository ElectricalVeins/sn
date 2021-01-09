const { RefreshToken } = require('../db/models');

module.exports.getByValue = (token) => RefreshToken.findOne({ where: { token } });
