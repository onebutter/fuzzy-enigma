import express from 'express';
import { authRequired, addTokenPayload } from 'utils/permissions';
import { createNamecard, getNamecards } from './controller';
const router = express.Router();

router.post('/', authRequired, createNamecard);
router.get('/', addTokenPayload, getNamecards);

export default router;
