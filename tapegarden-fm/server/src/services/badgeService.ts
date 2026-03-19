import prisma from '../utils/db';
import logger from '../utils/logger';
import { BadgeType, BadgeRarity, TimeFrame } from '@shared/types';

interface BadgeCalculationResult {
  userId: string;
  badgeId: string;
  earned: boolean;
  progress: number;
  targetValue: number;
}

export const initializeBadgeSystem = async () => {
  try {
    logger.info('Initializing badge system...');

    // Get all users
    const users = await prisma.user.findMany();

    for (const user of users) {
      await calculateUserBadges(user.id);
    }

    logger.info('Badge system initialization completed');
  } catch (error) {
    logger.error('Error initializing badge system:', error);
  }
};

export const calculateUserBadges = async (userId: string): Promise<BadgeCalculationResult[]> => {
  try {
    const results: BadgeCalculationResult[] = [];

    // Get all badges
    const badges = await prisma.badge.findMany();

    for (const badge of badges) {
      const result = await calculateBadgeProgress(userId, badge);
      results.push(result);

      // Update user badge progress
      await updateUserBadgeProgress(userId, badge.id, result.progress, result.earned);
    }

    return results;
  } catch (error) {
    logger.error('Error calculating user badges:', error);
    throw error;
  }
};

const calculateBadgeProgress = async (userId: string, badge: any): Promise<BadgeCalculationResult> => {
  const criteria = badge.criteria;
  let progress = 0;
  let targetValue = criteria.targetValue;

  switch (criteria.type) {
    case BadgeType.LISTENING_TIME:
      progress = await calculateListeningTimeProgress(userId, criteria);
      break;

    case BadgeType.GENRE_EXPLORATION:
      progress = await calculateGenreExplorationProgress(userId, criteria);
      break;

    case BadgeType.ARTIST_DISCOVERY:
      progress = await calculateArtistDiscoveryProgress(userId, criteria);
      break;

    case BadgeType.DAILY_STREAK:
      progress = await calculateDailyStreakProgress(userId, criteria);
      break;

    default:
      progress = 0;
  }

  const earned = progress >= targetValue;

  return {
    userId,
    badgeId: badge.id,
    earned,
    progress,
    targetValue
  };
};

const calculateListeningTimeProgress = async (userId: string, criteria: any): Promise<number> => {
  const timeFrame = criteria.timeFrame || TimeFrame.ALL_TIME;
  let startDate: Date | undefined;

  if (timeFrame !== TimeFrame.ALL_TIME) {
    startDate = getStartDateForTimeFrame(timeFrame);
  }

  const sessions = await prisma.listeningSession.findMany({
    where: {
      userId,
      ...(startDate && { playedAt: { gte: startDate } })
    }
  });

  const totalListeningTime = sessions.reduce((sum, session) => sum + session.durationMs, 0);
  
  // Convert milliseconds to hours
  return totalListeningTime / (1000 * 60 * 60);
};

const calculateGenreExplorationProgress = async (userId: string, criteria: any): Promise<number> => {
  const timeFrame = criteria.timeFrame || TimeFrame.ALL_TIME;
  let startDate: Date | undefined;

  if (timeFrame !== TimeFrame.ALL_TIME) {
    startDate = getStartDateForTimeFrame(timeFrame);
  }

  const uniqueGenres = await prisma.listeningSession.groupBy({
    by: ['genre'],
    where: {
      userId,
      genre: { not: null },
      ...(startDate && { playedAt: { gte: startDate } })
    }
  });

  return uniqueGenres.length;
};

const calculateArtistDiscoveryProgress = async (userId: string, criteria: any): Promise<number> => {
  const timeFrame = criteria.timeFrame || TimeFrame.ALL_TIME;
  let startDate: Date | undefined;

  if (timeFrame !== TimeFrame.ALL_TIME) {
    startDate = getStartDateForTimeFrame(timeFrame);
  }

  const uniqueArtists = await prisma.listeningSession.groupBy({
    by: ['artistId'],
    where: {
      userId,
      artistId: { not: null },
      ...(startDate && { playedAt: { gte: startDate } })
    }
  });

  return uniqueArtists.length;
};

const calculateDailyStreakProgress = async (userId: string, criteria: any): Promise<number> => {
  // This is a simplified version - in a real implementation, you'd track consecutive days
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

  const dailySessions = await prisma.listeningSession.groupBy({
    by: ['playedAt'],
    where: {
      userId,
      playedAt: { gte: thirtyDaysAgo }
    }
  });

  // Count unique days with listening activity
  const uniqueDays = new Set(
    dailySessions.map(session => session.playedAt.toDateString())
  );

  return uniqueDays.size;
};

const getStartDateForTimeFrame = (timeFrame: TimeFrame): Date => {
  const now = new Date();

  switch (timeFrame) {
    case TimeFrame.DAILY:
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case TimeFrame.WEEKLY:
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      return new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());
    case TimeFrame.MONTHLY:
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case TimeFrame.YEARLY:
      return new Date(now.getFullYear(), 0, 1);
    default:
      return new Date(0);
  }
};

const updateUserBadgeProgress = async (userId: string, badgeId: string, progress: number, earned: boolean) => {
  const existingBadge = await prisma.userBadge.findUnique({
    where: {
      userId_badgeId: {
        userId,
        badgeId
      }
    }
  });

  if (existingBadge) {
    if (earned && !existingBadge.isCompleted) {
      await prisma.userBadge.update({
        where: { id: existingBadge.id },
        data: {
          isCompleted: true,
          earnedAt: new Date(),
          progress
        }
      });
    } else if (!earned) {
      await prisma.userBadge.update({
        where: { id: existingBadge.id },
        data: { progress }
      });
    }
  } else {
    await prisma.userBadge.create({
      data: {
        userId,
        badgeId,
        progress,
        isCompleted: earned,
        earnedAt: earned ? new Date() : null
      }
    });
  }
};

// Predefined badges
export const createDefaultBadges = async () => {
  const defaultBadges = [
    {
      name: "First Steps",
      description: "Listen to your first track",
      icon: "🎵",
      color: "#1DB954",
      rarity: BadgeRarity.COMMON,
      criteria: {
        type: BadgeType.LISTENING_TIME,
        targetValue: 0.1, // 6 minutes
        timeFrame: TimeFrame.ALL_TIME
      }
    },
    {
      name: "Music Lover",
      description: "Reach 10 hours of listening time",
      icon: "🎧",
      color: "#2E3B4E",
      rarity: BadgeRarity.UNCOMMON,
      criteria: {
        type: BadgeType.LISTENING_TIME,
        targetValue: 10,
        timeFrame: TimeFrame.ALL_TIME
      }
    },
    {
      name: "Genre Explorer",
      description: "Listen to 5 different genres",
      icon: "🌍",
      color: "#FF6B6B",
      rarity: BadgeRarity.UNCOMMON,
      criteria: {
        type: BadgeType.GENRE_EXPLORATION,
        targetValue: 5,
        timeFrame: TimeFrame.ALL_TIME
      }
    },
    {
      name: "Artist Hunter",
      description: "Discover 10 new artists",
      icon: "🔍",
      color: "#4ECDC4",
      rarity: BadgeRarity.RARE,
      criteria: {
        type: BadgeType.ARTIST_DISCOVERY,
        targetValue: 10,
        timeFrame: TimeFrame.ALL_TIME
      }
    },
    {
      name: "Daily Listener",
      description: "Listen music for 7 consecutive days",
      icon: "📅",
      color: "#FFD93D",
      rarity: BadgeRarity.RARE,
      criteria: {
        type: BadgeType.DAILY_STREAK,
        targetValue: 7,
        timeFrame: TimeFrame.ALL_TIME
      }
    }
  ];

  for (const badgeData of defaultBadges) {
    await prisma.badge.upsert({
      where: { name: badgeData.name },
      update: badgeData,
      create: badgeData
    });
  }
};