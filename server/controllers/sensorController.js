import SensorData from '../models/SensorData.js';
import Alert from '../models/Alert.js';

export const getSensorData = async (req, res) => {
  try {
    const { cropId, type, startDate, endDate } = req.query;
    const query = { farmerId: req.user.id };
    
    if (cropId) query.cropId = cropId;
    if (type) query.type = type;
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const data = await SensorData.find(query).sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sensor data' });
  }
};

export const addSensorData = async (req, res) => {
  try {
    const { cropId, type, value } = req.body;
    const sensorData = new SensorData({
      farmerId: req.user.id,
      cropId,
      type,
      value,
      timestamp: new Date()
    });

    await sensorData.save();

    // Check thresholds and create alerts if necessary
    if (type === 'moisture' && value < 30) {
      const alert = new Alert({
        farmerId: req.user.id,
        cropId,
        type: 'low_moisture',
        message: `Low moisture level detected: ${value}%`,
        severity: 'warning'
      });
      await alert.save();
    }

    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ error: 'Error adding sensor data' });
  }
};