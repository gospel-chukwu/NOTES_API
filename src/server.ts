import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.connection.js';
import authRoutes from './routes/auth.js';
import { strictLimiter } from './utils/rateLimiter.js';

// routes import
// const authRoutes = await import('./routes/auth.js');

const startServer = async () => {
  // load environment variables
  dotenv.config({
    path: './.env',
  });

  // check if PORT is defined
  const PORT = process.env.PORT || 4040;

  // connect to database
  await connectDB();
  console.log('Database connected successfully.');

  // create express app
  const app = express();

  // middlewares
  app.use(cors()); // Cross-Origin-Resource-Sharing
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // routes
  // register routes
  app.use('/api/v1/auth', strictLimiter, authRoutes);

  // home route
  app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
  });

  app.get('/api/v1', (req, res) => {
    res.send('Welcome to the Notes API v1');
  });

  // start server
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
};

startServer();
