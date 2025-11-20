import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

//ROTAS DE AUTENTICAÇÃO
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
