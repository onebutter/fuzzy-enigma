import express from 'express';
import { authRequired } from 'utils/permissions';
import { createNamecard } from './controller';
const router = express.Router();

router.post('/', authRequired, createNamecard);

export default router;
