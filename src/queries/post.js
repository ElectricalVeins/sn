const { Post, User } = require('../db/models');

module.exports.getAllPosts = ({ offset, limit } = { offset: 0, limit: 50 }) =>
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'imageSrc'],
        as: 'author',
      },
    ],
    offset,
    limit,
  });

module.exports.create = body => Post.create(body);
module.exports.update = (values, { id }) =>
  Post.update(values, { where: { id } });
