const { User } = require('../db/models');

module.exports.getMany = async (req, res, next) => {
  try {
    const { count, rows } = await User.findAndCountAll({
      attributes: {
        exclude: ['passwordHash'],
      },
    });
    res.send({
      meta: { count },
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getById = async (req, res, next) => {
  const {
    query: { userId },
  } = req;
  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['passwordHash'],
      },
    });
    if (user) {
      res.send({ data: user });
    }
    throw new Error('400'); // Заглушка пока нет обработчика
  } catch (err) {
    next(err);
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const {
      query: { userId },
    } = req;

    const user = await User.destroy({
      where: {
        id: userId,
      },
      paranoid: true,
    });
    if (user) {
      res.send({ data: user });
    }
    throw new Error('400'); // Заглушка пока нет обработчика
  } catch (err) {
    next(err);
  }
};
