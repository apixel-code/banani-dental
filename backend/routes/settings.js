// Site settings - single document, public GET / admin PUT
const express = require('express');
const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Helper: get or create the singleton
const getOrCreate = async () => {
  let s = await Settings.findOne({ key: 'site' });
  if (!s) s = await Settings.create({ key: 'site' });
  return s;
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const s = await getOrCreate();
    res.json({
      marqueeEnabled: s.marqueeEnabled,
      marqueeText: s.marqueeText,
    });
  })
);

router.put(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { marqueeEnabled, marqueeText } = req.body || {};
    const s = await getOrCreate();
    if (typeof marqueeEnabled === 'boolean') s.marqueeEnabled = marqueeEnabled;
    if (typeof marqueeText === 'string') s.marqueeText = marqueeText;
    await s.save();
    res.json({
      marqueeEnabled: s.marqueeEnabled,
      marqueeText: s.marqueeText,
    });
  })
);

module.exports = router;
