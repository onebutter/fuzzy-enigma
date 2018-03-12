import express from 'express';
import { userRouter } from './controllers/user';
import { authRouter } from './controllers/auth';
import { namecardRouter } from './controllers/namecard';
import { extServiceRouter } from './controllers/extService';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/namecards', namecardRouter);
router.use('/extservice', extServiceRouter);

export default router;
