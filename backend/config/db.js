// MongoDB connection using mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URL;
  const dbName = process.env.DB_NAME;
  await mongoose.connect(uri, { dbName });
  console.log(`[DB] Connected to MongoDB: ${dbName}`);
};

module.exports = connectDB;
