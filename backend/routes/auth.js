// Authentication routes - JWT based admin login
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { sub: admin._id.toString(), username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    return res.json({
      token,
      user: { username: admin.username, role: 'admin' },
    });
  })
);

// GET /api/auth/me - verify token
router.get('/me', requireAdmin, (req, res) => {
  res.json({ user: { username: req.user.username, role: req.user.role } });
});

module.exports = router;
