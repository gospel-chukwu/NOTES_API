import express from 'express';
import { registerController } from '../controllers/auth/register.controller.js';
import { loginController } from '../controllers/auth/login.controller.js';
import { logoutController } from '../controllers/auth/logout.controller.js';
import { refreshController } from '../controllers/auth/refresh.controller.js';

const router = express.Router();


// API Routes
router.post('/register', registerController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.get('/refresh', refreshController);

export default router;
