import { Router } from 'express';
import { getUserById } from '../controllers/userController';
import { checkToken } from '../middlewares/checkToken';

const router = Router();

router.get('/:id', checkToken, getUserById);

export default router;
