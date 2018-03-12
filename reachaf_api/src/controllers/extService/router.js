import express from 'express';
import { authRequired } from 'utils/permissions';
import { getTokenForDiscord } from './controller';
const router = express.Router();

router.post('/discord', authRequired, getTokenForDiscord);

export default router;
