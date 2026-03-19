# TapeGarden FM

A gamified music streaming badge tracking platform that helps users track their listening habits and earn badges for their musical journey.

## Features

### 🎵 **Music Integration**
- **Spotify Integration**: OAuth2 authentication with Spotify Web API
- **Apple Music Integration**: MusicKit JS integration
- **Manual Entry**: CSV import and manual logging interface

### 🏆 **Badge System**
- **Time Milestones**: 1hr, 10hrs, 50hrs, 100hrs, 500hrs, 1000hrs
- **Genre Exploration**: Badge for listening to 5, 10, 20 different genres
- **Artist Discovery**: Badge for discovering 10, 50, 100 new artists
- **Daily Streaks**: 3-day, 7-day, 30-day consecutive listening streaks
- **Custom Badges**: Configurable criteria for special achievements

### 🎮 **Gamified Dashboard**
- **Progress Visualizations**: Circular progress bars for badge completion
- **Interactive Charts**: Genre distribution, listening time trends
- **Badge Showcase**: Gallery view of earned badges with animations
- **Leaderboards**: Community rankings and comparisons
- **Achievement Notifications**: Real-time badge unlock notifications

### 📊 **Data Analytics**
- Listening time statistics and trends
- Genre preference analysis
- Artist discovery tracking
- Exportable reports and summaries

## Tech Stack

### Frontend
- **React** with TypeScript
- **Material-UI (MUI)** for consistent, modern components
- **Recharts** for interactive data visualizations
- **Redux Toolkit** with RTK Query for state management
- **React Router v6** for navigation
- **Vite** for fast development and build

### Backend
- **Node.js** with TypeScript
- **Express.js** framework
- **PostgreSQL** with Prisma ORM
- **JWT** authentication with bcrypt for password hashing
- **Redis** for session management and caching
- **Winston** for logging

### Platform Integrations
- **Spotify Web API** with OAuth2
- **Apple Music** with MusicKit JS
- **Cron jobs** for scheduled data synchronization

## Project Structure

```
tapegarden-fm/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── index.html
│   └── vite.config.ts
├── server/           # Node.js backend
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── prisma/            # Database schema
│   └── tsconfig.json
├── shared/           # Shared types and utilities
├── docker/           # Docker configuration
└── docs/            # API documentation
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Redis (optional, for caching)

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd tapegarden-fm/server
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://username:password@localhost:5432/tapegarden_fm"
   JWT_SECRET="your-secret-key"
   REDIS_URL="redis://localhost:6379"
   
   # Spotify API credentials
   SPOTIFY_CLIENT_ID="your-spotify-client-id"
   SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
   SPOTIFY_REDIRECT_URI="http://localhost:5000/api/auth/spotify/callback"
   
   # Apple Music credentials
   APPLE_MUSIC_DEVELOPER_TOKEN="your-developer-token"
   APPLE_MUSIC_KEY_ID="your-key-id"
   APPLE_MUSIC_TEAM_ID="your-team-id"
   APPLE_MUSIC_PRIVATE_KEY="your-private-key"
   ```

3. **Set up database:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd tapegarden-fm/client
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

### Full Development Setup

1. **Install all dependencies:**
   ```bash
   cd tapegarden-fm
   npm run install:all
   ```

2. **Start both servers:**
   ```bash
   npm run dev
   ```

## API Documentation

The API is documented using OpenAPI/Swagger. Once the server is running, visit `http://localhost:5000/api-docs` to view the interactive documentation.

### Key Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `GET /api/badges` - Get user badges
- `GET /api/analytics` - Get listening statistics
- `POST /api/platforms/connect/spotify` - Connect Spotify account
- `POST /api/platforms/sync` - Sync platform data

## Development

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use functional components in React
- Follow Redux best practices

### Database Migrations
```bash
# Generate new migration
npm run db:migrate

# Push schema changes (development only)
npm run db:push

# View database in browser
npm run db:studio
```

### Testing
```bash
# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test
```

## Deployment

### Docker
Use the provided Docker configuration for containerized deployment:

```bash
# Build and run with Docker Compose
docker-compose -f docker/docker-compose.yml up
```

### Environment Variables
Ensure all required environment variables are set in production:
- Database connection string
- JWT secret
- Platform API credentials
- CORS origins

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Email us at support@tapegarden.fm

---

**Built with ❤️ by the TapeGarden FM Team**