import express from 'express';
import { authRequired } from 'utils/permissions';
import { getUsers, createUser } from './controller';
const router = express.Router();

router.get('/', authRequired, getUsers);
router.post('/', createUser);

export default router;
