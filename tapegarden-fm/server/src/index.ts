import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cron from 'node-cron';

import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import logger from './utils/logger';
import { initializeBadgeSystem, createDefaultBadges } from './services/badgeService';
import { syncPlatformData } from './services/platformService';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import badgeRoutes from './routes/badge';
import platformRoutes from './routes/platform';
import analyticsRoutes from './routes/analytics';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Initialize background tasks
const initializeBackgroundTasks = () => {
  // Run badge calculations every hour
  cron.schedule('0 * * * *', async () => {
    try {
      logger.info('Running scheduled badge calculations...');
      await initializeBadgeSystem();
    } catch (error) {
      logger.error('Error in scheduled badge calculations:', error);
    }
  });

  // Sync platform data every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    try {
      logger.info('Running scheduled platform data sync...');
      await syncPlatformData();
    } catch (error) {
      logger.error('Error in scheduled platform sync:', error);
    }
  });

  logger.info('Background tasks initialized');
};

// Start server
const startServer = async () => {
  try {
    // Initialize background tasks
    initializeBackgroundTasks();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();