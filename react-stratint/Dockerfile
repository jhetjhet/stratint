# --- Build stage ---
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --dangerously-allow-all-builds
COPY . .
RUN pnpm run build

# --- Production stage (Switch to Debian-slim to support workerd) ---
FROM node:22-slim AS prod
WORKDIR /app

# Install curl/ca-certificates (often required by Wrangler/workerd to download runtime assets)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --dangerously-allow-all-builds

# Bring over the built application assets
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENV NODE_ENV=production

# Start Wrangler local routing engine bound to the container bridge gateway
CMD ["pnpx", "wrangler", "dev", "--ip", "0.0.0.0", "--port", "8080", "./dist/server/index.js"]
