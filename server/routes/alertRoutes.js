import express from 'express';
import { getAlerts, markAlertRead } from '../controllers/alertController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.get('/', getAlerts);
router.patch('/:id/read', markAlertRead);

export default router;