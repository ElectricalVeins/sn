const { User } = require('../db/models');

module.exports.setNew = (data, userRole = 1) =>
  User.create({ ...data, userRole });
module.exports.getById = id => User.findByPk(id);
module.exports.getByEmail = email => User.findOne({ where: { email } });
module.exports.getAndCountAll = (
  { offset, limit } = { offset: 0, limit: 50 }
) => User.findAndCountAll({ offset, limit, order: [['createdAt', 'DESC']] });
module.exports.deleteById = id =>
  User.destroy({ where: { id }, paranoid: true });
