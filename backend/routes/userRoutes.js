import express from 'express';
import { register, login, logout } from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', protect, register);
router.post('/login', login);
router.post('/logout', logout);

export default router;

