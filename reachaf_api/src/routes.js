import express from 'express';
import { authRequired } from 'utils/permissions';
import { userRouter } from './controllers/user';
import { authRouter } from './controllers/auth';
import { namecardRouter } from './controllers/namecard';
import myRouter from './controllers/my/router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/namecards', namecardRouter);
router.use('/my', authRequired, myRouter);

export default router;
