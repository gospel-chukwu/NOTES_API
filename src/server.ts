import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/db.connection.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import { apiLimiter, strictLimiter } from './middleware/rateLimiter.js';

// routes import
// const authRoutes = await import('./routes/auth.js');

const startServer = async () => {
  // load environment variables
  dotenv.config({
    path: './.env',
  });

  // check if PORT is defined
  const PORT = process.env.PORT || 4040;

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  // connect to database
  await connectDB();
  console.log('Database connected successfully.');

  // create express app
  const app: Express = express();

  // middlewares
  app.use(cors()); // Cross-Origin-Resource-Sharing
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // routes

  // home route
  app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
  });

  // auth routes
  app.use('/api/auth', strictLimiter, authRoutes);

  // notes routes
  app.use('/api/notes', apiLimiter, notesRoutes);

  // start server
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
};

startServer();
