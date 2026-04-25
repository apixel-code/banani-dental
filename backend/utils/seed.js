// Seeds initial admin user and demo content (idempotent)
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');
const Gallery = require('../models/Gallery');

const DEMO_DOCTORS = [
  {
    name: 'ডা. আহমেদ রহমান',
    nameEn: 'Dr. Ahmed Rahman',
    specialization: 'ডেন্টাল সার্জন ও ইমপ্ল্যান্ট বিশেষজ্ঞ',
    degrees: 'BDS, FCPS (Dental Surgery), MS (Implantology)',
    experience: '১৫+ বছর',
    bio: 'হাজার হাজার রোগীর হাসি ফিরিয়ে দেয়ার অভিজ্ঞতায় সমৃদ্ধ। সর্বাধুনিক ব্যথামুক্ত ডেন্টাল চিকিৎসায় পারদর্শী।',
    photoUrl: 'https://images.pexels.com/photos/14235194/pexels-photo-14235194.jpeg',
    photoPublicId: 'seed/doctor-male', // sentinel - won't be deleted from cloudinary
    order: 1,
  },
  {
    name: 'ডা. সাবরিনা ইসলাম',
    nameEn: 'Dr. Sabrina Islam',
    specialization: 'কসমেটিক ও অর্থোডন্টিক বিশেষজ্ঞ',
    degrees: 'BDS, MS (Orthodontics)',
    experience: '১০+ বছর',
    bio: 'নিখুঁত হাসি ও দাঁতের নান্দনিকতায় বিশেষায়িত। ইনভিজিবল ব্রেস ও স্মাইল ডিজাইনিং এ অভিজ্ঞ।',
    photoUrl: 'https://images.pexels.com/photos/31043312/pexels-photo-31043312.jpeg',
    photoPublicId: 'seed/doctor-female',
    order: 2,
  },
];

const DEMO_GALLERY = [
  {
    category: 'clinic',
    title: 'অত্যাধুনিক চিকিৎসা কক্ষ',
    caption: 'বিশ্বমানের সরঞ্জামে সজ্জিত আমাদের ক্লিনিক',
    imageUrl: 'https://images.pexels.com/photos/16571735/pexels-photo-16571735.jpeg',
    imagePublicId: 'seed/clinic-1',
    order: 1,
  },
  {
    category: 'clinic',
    title: 'অভ্যর্থনা',
    caption: 'প্রিমিয়াম রিসেপশন এরিয়া',
    imageUrl: 'https://images.pexels.com/photos/31844508/pexels-photo-31844508.jpeg',
    imagePublicId: 'seed/clinic-2',
    order: 2,
  },
  {
    category: 'patients',
    title: 'নতুন আত্মবিশ্বাস',
    caption: 'চিকিৎসার পর প্রকৃত হাসি',
    imageUrl: 'https://images.pexels.com/photos/11563145/pexels-photo-11563145.jpeg',
    imagePublicId: 'seed/patient-1',
    order: 1,
  },
  {
    category: 'patients',
    title: 'নিখুঁত হাসি',
    caption: 'কসমেটিক চিকিৎসার ফলাফল',
    imageUrl: 'https://images.pexels.com/photos/16212691/pexels-photo-16212691.png',
    imagePublicId: 'seed/patient-2',
    order: 2,
  },
  {
    category: 'doctors',
    title: 'অভিজ্ঞ চিকিৎসক দল',
    caption: 'রোগীর সাথে আন্তরিক যোগাযোগ',
    imageUrl: 'https://images.pexels.com/photos/19976565/pexels-photo-19976565.jpeg',
    imagePublicId: 'seed/doctors-1',
    order: 1,
  },
  {
    category: 'doctors',
    title: 'বিশেষজ্ঞ পরামর্শ',
    caption: 'রোগীর জন্য সর্বোত্তম চিকিৎসা পরিকল্পনা',
    imageUrl: 'https://images.pexels.com/photos/6627413/pexels-photo-6627413.jpeg',
    imagePublicId: 'seed/doctors-2',
    order: 2,
  },
  {
    category: 'before-after',
    title: 'স্মাইল মেকওভার',
    caption: 'কসমেটিক চিকিৎসায় সম্পূর্ণ পরিবর্তন',
    beforeUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
    beforePublicId: 'seed/ba-before-1',
    afterUrl: 'https://images.pexels.com/photos/16212691/pexels-photo-16212691.png',
    afterPublicId: 'seed/ba-after-1',
    order: 1,
  },
];

const seed = async () => {
  // Admin user (idempotent)
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'Admin@2026';
  const existing = await Admin.findOne({ username });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ username, passwordHash });
    console.log(`[Seed] Created admin user: ${username}`);
  } else {
    console.log(`[Seed] Admin user already exists: ${username}`);
  }

  // Doctors (only seed if collection empty)
  const docCount = await Doctor.countDocuments();
  if (docCount === 0) {
    await Doctor.insertMany(DEMO_DOCTORS);
    console.log(`[Seed] Inserted ${DEMO_DOCTORS.length} demo doctors`);
  }

  // Gallery (only seed if empty)
  const galleryCount = await Gallery.countDocuments();
  if (galleryCount === 0) {
    await Gallery.insertMany(DEMO_GALLERY);
    console.log(`[Seed] Inserted ${DEMO_GALLERY.length} demo gallery items`);
  }
};

module.exports = seed;
