import express from 'express';
import {registerUser, loginUser , logoutUser ,getCurrentUser} from '../controller/auth.controller.js';
import { protect } from '../middleware/protect.js'
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getCurrentUser)

export default router;