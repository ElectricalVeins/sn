const { Router } = require('express');
const UserController = require('../controllers/user');

const usersRouter = Router();

usersRouter.route('/')
  .get(UserController.getMany);

usersRouter
  .route('/:userId')
  .get(UserController.getById)
  .patch()
  .delete(UserController.deleteById);

module.exports = usersRouter;
