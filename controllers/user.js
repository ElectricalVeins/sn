const UserQueries = require('../queries/user');
const UserService = require('../services/userService');

module.exports.getMany = async (req, res, next) => {
  try {
    const { body: { limit, offset } } = req;
    const { count, rows } = await UserQueries.getAndCountAll({ offset, limit });
    if (count) {
      const data = rows.map((user) => UserService.prepareUser(user, 'email', 'phone'));
      res.send({
        meta: { count },
        users: data,
      });
      return;
    }
    throw new Error('something went wrong!');
  } catch (err) {
    next(err);
  }
};

module.exports.getById = async (req, res, next) => {
  const {
    query: { userId }
  } = req;
  try {
    const user = await UserQueries.getByPk(userId);
    if (user) {
      const data = UserService.prepareUser(user, 'email', 'phone');
      res.send(data);
      return;
    }
    throw new Error('400'); // Заглушка пока нет обработчика
  } catch (err) {
    next(err);
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const {
      query: { userId: id }
    } = req;
    const user = await UserQueries.deleteById(id);
    if (user) {
      res.send(user);
      return;
    }
    throw new Error('400'); // Заглушка пока нет обработчика
  } catch (err) {
    next(err);
  }
};

module.exports.updateImage = async (req, res, next) => {
  try {
    const {
      params: { userId },
      file: { filename }
    } = req;
    const user = await UserQueries.getById(userId);
    if (user) {
      const data = await user.update({
        imageSrc: filename
      });
      res.send(data);
      return;
    }
    throw new Error('404: User not found');
  } catch (err) {
    next(err);
  }
};
