// Banani Dental Clinic - Express + MongoDB API server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seed = require('./utils/seed');

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const galleryRoutes = require('./routes/gallery');
const appointmentRoutes = require('./routes/appointments');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || '*').split(','),
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/', (req, res) => {
  res.json({ message: 'Banani Dental Clinic API', status: 'ok' });
});

// Mount routes (all under /api per ingress requirement)
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/settings', settingsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('[Error]', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
});

const PORT = parseInt(process.env.PORT || '8001', 10);

const start = async () => {
  await connectDB();
  await seed();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Banani Dental API listening on 0.0.0.0:${PORT}`);
  });
};

start().catch((err) => {
  console.error('[Startup Error]', err);
  process.exit(1);
});
