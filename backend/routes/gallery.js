// Gallery CRUD - supports single images and before/after pairs
const express = require('express');
const asyncHandler = require('express-async-handler');
const Gallery = require('../models/Gallery');
const { requireAdmin } = require('../middleware/auth');
const { buildUploader, destroyAsset } = require('../config/cloudinary');

const router = express.Router();
const uploader = buildUploader('gallery');

const VALID_CATEGORIES = ['doctors', 'patients', 'clinic', 'before-after'];

// Public: list gallery (optional ?category=)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category } = req.query;
    const filter = {};
    if (category && VALID_CATEGORIES.includes(category)) {
      filter.category = category;
    }
    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    res.json(items.map((it) => ({ ...it, id: it._id.toString(), _id: undefined })));
  })
);

// Admin: create gallery item
// For 'before-after' send fields 'before' and 'after' (multipart files)
// For other categories send field 'image'
router.post(
  '/',
  requireAdmin,
  uploader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'before', maxCount: 1 },
    { name: 'after', maxCount: 1 },
  ]),
  asyncHandler(async (req, res) => {
    const { category, title, caption, order } = req.body;
    if (!VALID_CATEGORIES.includes(category)) {
      // cleanup
      Object.values(req.files || {}).flat().forEach((f) => destroyAsset(f.filename));
      return res.status(400).json({ error: 'Invalid category' });
    }

    const payload = {
      category,
      title: title || '',
      caption: caption || '',
      order: Number(order) || 0,
    };

    if (category === 'before-after') {
      const before = req.files?.before?.[0];
      const after = req.files?.after?.[0];
      if (!before || !after) {
        if (before) await destroyAsset(before.filename);
        if (after) await destroyAsset(after.filename);
        return res.status(400).json({ error: 'Both before and after images required' });
      }
      payload.beforeUrl = before.path;
      payload.beforePublicId = before.filename;
      payload.afterUrl = after.path;
      payload.afterPublicId = after.filename;
    } else {
      const image = req.files?.image?.[0];
      if (!image) return res.status(400).json({ error: 'Image is required' });
      payload.imageUrl = image.path;
      payload.imagePublicId = image.filename;
    }

    const item = await Gallery.create(payload);
    res.status(201).json({ ...item.toObject(), id: item._id.toString(), _id: undefined });
  })
);

// Admin: delete gallery item (also destroys cloudinary assets)
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Gallery item not found' });
    const ids = [item.imagePublicId, item.beforePublicId, item.afterPublicId].filter(Boolean);
    await Promise.all(ids.map((id) => destroyAsset(id)));
    await item.deleteOne();
    res.json({ ok: true });
  })
);

module.exports = router;
