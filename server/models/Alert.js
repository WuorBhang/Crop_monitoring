import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
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
    enum: ['low_moisture', 'high_temperature', 'pest_detection', 'system'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Alert', alertSchema);