# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S tapegarden -u 1001

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=tapegarden:nodejs /app/dist ./dist
COPY --from=builder --chown=tapegarden:nodejs /app/prisma ./prisma

# Create logs directory
RUN mkdir -p logs && chown tapegarden:nodejs logs

USER tapegarden

EXPOSE 5000

CMD ["node", "dist/index.js"]