import express from 'express';
import { authRequired, addRequestingUser } from 'utils/permissions';
import { createNamecard, getNamecards } from './controller';
const router = express.Router();

router.post('/', authRequired, createNamecard);
router.get('/', addRequestingUser, getNamecards);

export default router;
