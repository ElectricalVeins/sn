const { Router } = require('express');
const userRouter = require('./users');
const authRouter = require('./auth');
const postRouter = require('./post');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;
