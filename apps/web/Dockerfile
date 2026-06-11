# --- build stage ---
FROM node:22-alpine AS build
WORKDIR /app
# NEXT_PUBLIC_* is inlined at build time, so the browser API URL is a build arg.
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
RUN npm install --workspace apps/web --include=dev
COPY apps/web ./apps/web
# @portfolio/api/content is imported by Next.js route handlers at build time.
COPY apps/api ./apps/api
RUN npm run build --workspace apps/web

# --- runtime stage (Next.js standalone) ---
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
