// Site-wide settings (singleton document)
const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    marqueeEnabled: { type: Boolean, default: true },
    marqueeText: {
      type: String,
      default: 'বানানী ক্লিনিকে নতুন রোগীদের জন্য বিশেষ ছাড় চলছে — আজই অ্যাপয়েন্টমেন্ট নিন',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', SettingsSchema);
