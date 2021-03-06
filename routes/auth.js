const { Router } = require('express');
const AuthController = require('../controllers/auth');
const { validateSignIn, validateSignUp } = require('../middlewares/validation');

const authRouter = Router();

authRouter.post('/', AuthController.authenticate);
authRouter.post('/sign-in', validateSignIn, AuthController.signIn);
authRouter.post('/sign-up', validateSignUp, AuthController.signUp);
authRouter.post('/refresh', AuthController.updateRefreshToken);

module.exports = authRouter;
