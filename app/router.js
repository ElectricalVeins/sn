const { Router } = require('express');
const userRouter = require('../routes/users');
const authRouter = require('../routes/auth');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
