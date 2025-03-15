FROM node:lts-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:lts-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:lts-slim AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]