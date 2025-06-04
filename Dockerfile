# Build stage
FROM node:22-alpine-slim AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Set working directory
WORKDIR /app

# Copy all workspace package.json files
COPY apps ./apps
COPY packages ./packages
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build the application
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Move static and public files to the correct location
RUN cp -r ./apps/web/dist/static ./apps/web/dist/standalone/apps/web/dist && \
    cp -r ./apps/web/public ./apps/web/dist/standalone/apps/web

# Production stage
FROM node:22-alpine-slim AS prod
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir dist
RUN chown nextjs:nodejs dist

# Copy built application
COPY --from=builder /app/apps/web/dist/standalone ./

USER nextjs

# Expose the port your app runs on
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Start the application
CMD ["node", "apps/web/server.js"] 