const { Router } = require('express');
const PostController = require('../controllers/post');
const paginateMW = require('../middlewares/paginate');
// const { } = require('../middlewares/validation');

const postRouter = Router();

postRouter
  .route('/')
  .get(paginateMW, PostController.getAll)
  .post(
    // TODO: validation
    PostController.create
  );

postRouter.route('/:id').patch(
  // TODO: validation
  PostController.update
);

module.exports = postRouter;
