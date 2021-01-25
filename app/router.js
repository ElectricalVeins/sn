const { Router } = require('express');
const userRouter = require('../routes/users');
const authRouter = require('../routes/auth');
const postRouter = require('../routes/post');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;
