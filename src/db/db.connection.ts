import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

export const connectDB = async () => {
  const databaseUri = process.env.MONGODB_URL;
  if (!databaseUri) {
    console.error('MONGODB_URL is not defined in the environment variables.');
    return;
  }
  try {
    console.log('Connecting to database...');
    return await mongoose.connect(databaseUri as string, {
      // dbName: 'notes_api'
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
