# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies
RUN npm install --production

# ---- Build Stage ----
FROM base AS build
COPY . .
RUN npm install
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 5000
CMD [ "node", "dist/server.js" ]
