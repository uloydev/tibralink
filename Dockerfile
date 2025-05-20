# === Build stage ===
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm install

COPY . .
RUN pnpm build
RUN pnpm prune --prod

# === Production stage ===
FROM node:22-alpine

WORKDIR /app

# Copy files and set permissions
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

# Change ownership (optional if needed for write access)
# RUN chown -R appuser:appgroup /app

USER node

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "build"]