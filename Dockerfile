# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /nextjs-blog
COPY package.json ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /nextjs-blog
COPY --from=deps /nextjs-blog/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /nextjs-blog
ENV NODE_ENV production
COPY --from=builder /nextjs-blog/public ./public
COPY --from=builder /nextjs-blog/.next ./.next
COPY --from=builder /nextjs-blog/node_modules ./node_modules
COPY --from=builder /nextjs-blog/package.json ./package.json

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]