import express from 'express';
import { registerFarmer, loginFarmer, getFarmerProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerFarmer);
router.post('/login', loginFarmer);
router.get('/profile', authenticateToken, getFarmerProfile);

export default router;