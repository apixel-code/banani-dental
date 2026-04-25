const mongoose = require('mongoose');

// category: 'doctors' | 'patients' | 'clinic' | 'before-after'
const GallerySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['doctors', 'patients', 'clinic', 'before-after'],
      required: true,
      index: true,
    },
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    // Single image for non before-after items
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    // Before-after pair (only used when category === 'before-after')
    beforeUrl: { type: String, default: '' },
    beforePublicId: { type: String, default: '' },
    afterUrl: { type: String, default: '' },
    afterPublicId: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', GallerySchema);
