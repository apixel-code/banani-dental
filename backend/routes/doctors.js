// Doctor profile CRUD with Cloudinary photo upload
const express = require('express');
const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor');
const { requireAdmin } = require('../middleware/auth');
const { buildUploader, destroyAsset } = require('../config/cloudinary');

const router = express.Router();
const uploader = buildUploader('doctors');

// Public: list all doctors (sorted by order)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const docs = await Doctor.find({}).sort({ order: 1, createdAt: 1 }).lean();
    res.json(docs.map((d) => ({ ...d, id: d._id.toString(), _id: undefined })));
  })
);

// Public: single doctor
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const d = await Doctor.findById(req.params.id).lean();
    if (!d) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ ...d, id: d._id.toString(), _id: undefined });
  })
);

// Admin: create doctor (multipart with 'photo' file)
router.post(
  '/',
  requireAdmin,
  uploader.single('photo'),
  asyncHandler(async (req, res) => {
    const { name, nameEn, specialization, bio, experience, degrees, order } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Photo is required' });
    }
    if (!name || !specialization) {
      // cleanup uploaded asset if validation fails
      await destroyAsset(req.file.filename);
      return res.status(400).json({ error: 'Name and specialization required' });
    }
    const doctor = await Doctor.create({
      name,
      nameEn: nameEn || '',
      specialization,
      bio: bio || '',
      experience: experience || '',
      degrees: degrees || '',
      photoUrl: req.file.path,
      photoPublicId: req.file.filename,
      order: Number(order) || 0,
    });
    res.status(201).json({ ...doctor.toObject(), id: doctor._id.toString(), _id: undefined });
  })
);

// Admin: update doctor (photo optional)
router.put(
  '/:id',
  requireAdmin,
  uploader.single('photo'),
  asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      if (req.file) await destroyAsset(req.file.filename);
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const { name, nameEn, specialization, bio, experience, degrees, order } = req.body;
    if (name !== undefined) doctor.name = name;
    if (nameEn !== undefined) doctor.nameEn = nameEn;
    if (specialization !== undefined) doctor.specialization = specialization;
    if (bio !== undefined) doctor.bio = bio;
    if (experience !== undefined) doctor.experience = experience;
    if (degrees !== undefined) doctor.degrees = degrees;
    if (order !== undefined) doctor.order = Number(order) || 0;
    if (req.file) {
      // Replace photo - destroy old asset then save new
      const oldId = doctor.photoPublicId;
      doctor.photoUrl = req.file.path;
      doctor.photoPublicId = req.file.filename;
      await doctor.save();
      if (oldId) await destroyAsset(oldId);
    } else {
      await doctor.save();
    }
    res.json({ ...doctor.toObject(), id: doctor._id.toString(), _id: undefined });
  })
);

// Admin: delete doctor
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    if (doctor.photoPublicId) await destroyAsset(doctor.photoPublicId);
    await doctor.deleteOne();
    res.json({ ok: true });
  })
);

module.exports = router;
