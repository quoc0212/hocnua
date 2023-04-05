# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Rebuild the source code only when needed
COPY . .
RUN npm run build

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]