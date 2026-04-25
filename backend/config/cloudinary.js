// Cloudinary configuration - secure backend uploads only
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Storage factory: returns multer middleware writing to a specific Cloudinary folder
const buildUploader = (folder) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `banani-dental/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    },
  });
  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });
};

// Helper to delete an asset by public_id
const destroyAsset = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { invalidate: true });
};

module.exports = { cloudinary, buildUploader, destroyAsset };
