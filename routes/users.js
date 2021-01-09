const { Router } = require('express');
const UserController = require('../controllers/user');
const { uploadSignleImage } = require('../middlewares/uploadImages');

const usersRouter = Router();

usersRouter.route('/')
  .get(UserController.getMany);

usersRouter
  .route('/:userId')
  .get(UserController.getById)
  .patch()
  .delete(UserController.deleteById);

usersRouter
  .route('/:userId/image')
  .post(
    uploadSignleImage,
    UserController.updateImage,
  );

module.exports = usersRouter;
