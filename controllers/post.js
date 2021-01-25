const PostQueries = require('../queries/post');

module.exports.getAll = async (req, res, next) => {
  try {
    const { query: { offset, limit } } = req;
    const posts = await PostQueries.getAllPosts({ offset, limit });
    if (posts.length) {
      return res.send(posts);
    }
    throw new Error('No posts'); // TODO: handle error
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { body } = req;
    // Validate user existance, body, rights to create post...
    const newPost = await PostQueries.create(body);
    if (newPost) {
      return res.send(newPost);
    }
    throw new Error('Cant create'); // TODO: handle error
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { body, params: { id } } = req;
    // Validate user existance, body, rights to upd post...
    const updatedPost = await PostQueries.update(body, { id });
    if (updatedPost) {
      return res.send(updatedPost);
    }
    throw new Error('Cant update'); // TODO: handle error
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req;

    /*  */
    
  } catch (error) {
    next(err);
  }
};
