import express from 'express';
import { userRouter } from './controllers/user';

const router = express.Router();

router.use('/users', userRouter);

export default router;
