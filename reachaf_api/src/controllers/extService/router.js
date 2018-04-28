import express from 'express';
import { authRequired } from 'utils/permissions';
import { getTokenForDiscord, getTokenForGithub } from './controller';
const router = express.Router();

router.post('/discord', authRequired, getTokenForDiscord);
router.post('/github', authRequired, getTokenForGithub);

export default router;
