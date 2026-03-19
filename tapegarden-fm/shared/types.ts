// User types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  location?: string;
  website?: string;
  privacySettings: PrivacySettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrivacySettings {
  showListeningHistory: boolean;
  showTopArtists: boolean;
  showTopGenres: boolean;
  showBadges: boolean;
  publicProfile: boolean;
}

// Music data types
export interface Track {
  id: string;
  name: string;
  artist: string;
  album?: string;
  durationMs: number;
  genre?: string;
  imageUrl?: string;
  externalUrl?: string;
  platform: MusicPlatform;
  platformId: string;
}

export interface Artist {
  id: string;
  name: string;
  genre?: string;
  imageUrl?: string;
  externalUrl?: string;
  platform: MusicPlatform;
  platformId: string;
}

export interface ListeningSession {
  id: string;
  userId: string;
  trackId: string;
  playedAt: Date;
  durationMs: number;
  platform: MusicPlatform;
  source: ListeningSource;
}

export enum MusicPlatform {
  SPOTIFY = 'spotify',
  APPLE_MUSIC = 'apple_music',
  MANUAL = 'manual'
}

export enum ListeningSource {
  STREAMING = 'streaming',
  IMPORT = 'import',
  MANUAL = 'manual'
}

// Badge system types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: BadgeCriteria;
  rarity: BadgeRarity;
  createdAt: Date;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Date;
  progress: number;
  isCompleted: boolean;
}

export interface BadgeCriteria {
  type: BadgeType;
  targetValue: number;
  timeFrame?: TimeFrame;
  metadata?: Record<string, any>;
}

export enum BadgeType {
  LISTENING_TIME = 'listening_time',
  GENRE_EXPLORATION = 'genre_exploration',
  ARTIST_DISCOVERY = 'artist_discovery',
  DAILY_STREAK = 'daily_streak',
  CUSTOM = 'custom'
}

export enum BadgeRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export enum TimeFrame {
  ALL_TIME = 'all_time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

// Analytics types
export interface ListeningStats {
  totalListeningTime: number;
  totalTracksPlayed: number;
  uniqueArtists: number;
  uniqueGenres: number;
  dailyAverage: number;
  weeklyAverage: number;
  monthlyAverage: number;
}

export interface GenreStats {
  genre: string;
  playCount: number;
  listeningTime: number;
  percentage: number;
}

export interface ArtistStats {
  artist: string;
  playCount: number;
  listeningTime: number;
  firstPlayed: Date;
  lastPlayed: Date;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Platform integration types
export interface PlatformCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface SpotifyCredentials extends PlatformCredentials {
  scopes: string[];
}

export interface AppleMusicCredentials extends PlatformCredentials {
  developerToken: string;
  keyId: string;
  teamId: string;
  privateKey: string;
}

export interface UserPlatformConnection {
  id: string;
  userId: string;
  platform: MusicPlatform;
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
  connectedAt: Date;
  lastSyncedAt?: Date;
  isActive: boolean;
}

// Dashboard types
export interface DashboardData {
  userStats: ListeningStats;
  recentActivity: ListeningSession[];
  topGenres: GenreStats[];
  topArtists: ArtistStats[];
  currentBadges: UserBadge[];
  upcomingBadges: BadgeProgress[];
}

export interface BadgeProgress {
  badge: Badge;
  currentProgress: number;
  targetValue: number;
  percentage: number;
}

// Configuration types
export interface AppConfig {
  apiBaseUrl: string;
  frontendUrl: string;
  spotify: {
    clientId: string;
    redirectUri: string;
    scopes: string[];
  };
  appleMusic: {
    developerToken: string;
    keyId: string;
    teamId: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
}