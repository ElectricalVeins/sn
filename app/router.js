const { Router } = require('express');
const userRouter = require('../routes/users');

const router = Router();

router.use('/users', userRouter);

module.exports = router;
