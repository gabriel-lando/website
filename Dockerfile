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
EXPOSE 80
