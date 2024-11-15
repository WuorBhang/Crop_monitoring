import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  cropId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['moisture', 'temperature', 'humidity', 'pH'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SensorData', sensorDataSchema);