// Appointment requests (public submit, admin manage)
const express = require('express');
const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

const getClinicTodayDateString = () => {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(new Date())
    .reduce((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value;
      return acc;
    }, {});

  return `${parts.year}-${parts.month}-${parts.day}`;
};

const isValidDateString = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

// Public: submit appointment request
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, phone, email, service, message, preferredDate } = req.body || {};
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }
    if (preferredDate) {
      if (!isValidDateString(preferredDate)) {
        return res.status(400).json({ error: 'Preferred date must be a valid date' });
      }
      if (preferredDate < getClinicTodayDateString()) {
        return res.status(400).json({ error: 'Preferred date cannot be in the past' });
      }
    }
    const appt = await Appointment.create({
      name,
      phone,
      email: email || '',
      service: service || '',
      message: message || '',
      preferredDate: preferredDate || '',
    });
    res.status(201).json({ id: appt._id.toString(), status: appt.status });
  })
);

// Admin: list all appointments
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const items = await Appointment.find({}).sort({ createdAt: -1 }).lean();
    res.json(items.map((it) => ({ ...it, id: it._id.toString(), _id: undefined })));
  })
);

// Admin: update status
router.patch(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { status } = req.body || {};
    const allowed = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).lean();
    if (!appt) return res.status(404).json({ error: 'Not found' });
    res.json({ ...appt, id: appt._id.toString(), _id: undefined });
  })
);

// Admin: delete appointment
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const appt = await Appointment.findByIdAndDelete(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  })
);

module.exports = router;
