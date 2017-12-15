import express from 'express';
import { authRequired } from 'utils/permissions';
import { createNamecard, getNamecards } from './controller';
const router = express.Router();

router.post('/', authRequired, createNamecard);
router.get('/', authRequired, getNamecards);

export default router;
