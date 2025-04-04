FROM node:lts-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm i lightningcss-linux-x64-gnu --legacy-peer-deps --omit=dev
RUN npm install --platform=linux --arch=x64 @tailwindcss/postcss

FROM node:lts-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:lts-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]