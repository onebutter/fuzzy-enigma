import express from 'express';
import { userRouter } from './controllers/user';
import { authRouter } from './controllers/auth';
import { namecardRouter } from './controllers/namecard';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/namecards', namecardRouter);

export default router;
