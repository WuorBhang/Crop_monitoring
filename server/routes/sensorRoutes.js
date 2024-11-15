import express from 'express';
import { getSensorData, addSensorData } from '../controllers/sensorController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.get('/', getSensorData);
router.post('/', addSensorData);

export default router;