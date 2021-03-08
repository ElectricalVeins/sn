const { Router } = require('express');
const UserController = require('../controllers/user');
const paginateMW = require('../middlewares/paginate');
const { uploadSignInImage } = require('../middlewares/uploadImages');

const usersRouter = Router();

usersRouter.route('/').get(paginateMW, UserController.getMany);

usersRouter
  .route('/:userId')
  .get(UserController.getById)
  .patch()
  .delete(UserController.deleteById);

usersRouter
  .route('/:userId/image')
  .post(uploadSignInImage, UserController.updateImage);

module.exports = usersRouter;
