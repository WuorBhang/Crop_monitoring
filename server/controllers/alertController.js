import Alert from '../models/Alert.js';

export const getAlerts = async (req, res) => {
  try {
    const { severity, startDate, endDate } = req.query;
    const query = { farmerId: req.user.id };
    
    if (severity) query.severity = severity;
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const alerts = await Alert.find(query)
      .sort({ timestamp: -1 })
      .limit(50);
    
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching alerts' });
  }
};

export const markAlertRead = async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.id, farmerId: req.user.id },
      { read: true },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: 'Error updating alert' });
  }
};