const _ = require('lodash');

module.exports.prepareUser = (user, ...pathsToOmit) => _.omit(user.get(), ['password', ...pathsToOmit]);
