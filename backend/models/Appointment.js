const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    service: { type: String, default: '' },
    message: { type: String, default: '' },
    preferredDate: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
