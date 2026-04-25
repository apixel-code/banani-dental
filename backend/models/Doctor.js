const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameEn: { type: String, default: '' }, // English name
    specialization: { type: String, required: true, trim: true },
    bio: { type: String, default: '' },
    experience: { type: String, default: '' }, // e.g. "১৫+ বছর"
    degrees: { type: String, default: '' }, // e.g. BDS, FCPS
    photoUrl: { type: String, required: true },
    photoPublicId: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', DoctorSchema);
