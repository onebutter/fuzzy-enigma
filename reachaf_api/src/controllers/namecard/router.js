import express from 'express';
import { authRequired, addRequestingUser } from 'utils/permissions';
import { createNamecard, getNamecards, deleteNamecard } from './controller';
const router = express.Router();

router.post('/', authRequired, createNamecard);
router.get('/', addRequestingUser, getNamecards);
router.delete('/:namecardId', authRequired, deleteNamecard);

export default router;
