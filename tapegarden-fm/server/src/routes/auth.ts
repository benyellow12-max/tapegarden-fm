import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/db';
import { authenticateToken } from '../middleware/auth';
import logger from '../utils/logger';

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('username').isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body('password').isLength({ min: 6 }),
    body('displayName').isLength({ min: 1, max: 50 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Invalid input data',
          details: errors.array()
        });
      }

      const { email, username, password, displayName } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: existingUser.email === email ? 'Email already registered' : 'Username already taken'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          displayName
        }
      });

      // Create default privacy settings
      await prisma.privacySettings.create({
        data: {
          userId: user.id
        }
      });

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      logger.info(`User registered: ${user.username}`);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            displayName: user.displayName
          },
          token
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
);

// Login user
router.post(
  '/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Invalid input data',
          details: errors.array()
        });
      }

      const { username, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { username }
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      logger.info(`User logged in: ${user.username}`);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            displayName: user.displayName
          },
          token
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
);

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        profile: true,
        privacySettings: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { displayName, bio, location, website } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        displayName,
        profile: {
          update: {
            bio,
            location,
            website
          }
        }
      },
      include: {
        profile: true
      }
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update privacy settings
router.put('/privacy', authenticateToken, async (req, res) => {
  try {
    const { showListeningHistory, showTopArtists, showTopGenres, showBadges, publicProfile } = req.body;

    const privacySettings = await prisma.privacySettings.update({
      where: { userId: req.user!.id },
      data: {
        showListeningHistory,
        showTopArtists,
        showTopGenres,
        showBadges,
        publicProfile
      }
    });

    res.json({
      success: true,
      data: privacySettings
    });
  } catch (error) {
    logger.error('Update privacy settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;