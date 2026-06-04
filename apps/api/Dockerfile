# --- build stage ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
RUN npm install --workspace apps/api --include=dev
COPY apps/api ./apps/api
RUN npm run build --workspace apps/api

# --- runtime stage ---
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
RUN npm install --workspace apps/api --omit=dev && npm cache clean --force
COPY --from=build /app/apps/api/dist ./apps/api/dist
# node:sqlite is built in; just ensure the data dir exists and is writable.
RUN mkdir -p /app/apps/api/data && addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app/apps/api/data
USER app
WORKDIR /app/apps/api
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:4000/health/live || exit 1
CMD ["node", "dist/server.js"]
