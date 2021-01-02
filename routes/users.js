const { Router } = require('express');
const UserController = require('../controllers/user');
const usersRouter = Router();

usersRouter.route('/').post(UserController.create).get(UserController.getMany);

usersRouter
  .route('/:userId')
  .get(UserController.getById)
  .patch()
  .delete(UserController.deleteById);

// usersRouter.route('/:userId/images').get().patch().delete();

module.exports = usersRouter;
