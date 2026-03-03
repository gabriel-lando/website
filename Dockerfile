# Build stage
FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g npm-check-updates
RUN ncu -u && npm install --legacy-peer-deps

COPY . .
RUN npm test
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost || exit 1
