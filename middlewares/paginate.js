module.exports = (req, res, next) => {
  try {
    const { query: { offset, limit } } = req;
    if (!offset || offset < 0) {
      req.query.offset = 0;
    }
    if (!limit || limit > 100 || limit < 5) {
      req.query.limit = 50;
    }
    next();
  } catch (err) {
    next(err);
  }
};
