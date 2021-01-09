const _ = require('lodash');

module.exports.prepareUser = async (user, ...pathsToOmit) => _.omit(user, ['password', ...pathsToOmit]);
