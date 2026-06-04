# Freelance Portfolio — Backend & AI Systems Engineering

This repository contains my Upwork portfolio package, a **live portfolio web app**
(Fastify API + Next.js frontend), and three production-grade reference projects.
Each project is documented as a real system design: schema, API contract,
real-time event model, folder structure, and Docker setup.

## The portfolio web app

A monorepo (npm workspaces) under `apps/`:

- **`apps/api`** — Fastify + TypeScript backend. Serves profile/services/projects
  content and accepts contact submissions (validated with zod, rate-limited,
  persisted to SQLite via Node's built-in `node:sqlite` — no native build step).
- **`apps/web`** — Next.js (App Router) + Tailwind v4 frontend. Server-renders
  the hero/bio, services, project showcase, and per-project architecture pages
  from the API; the contact form posts back to it.

### Run locally
```bash
npm install                       # installs both workspaces
# terminal 1 — API on :4000
cp apps/api/.env.example apps/api/.env
npm run dev:api
# terminal 2 — web on :3000
cp apps/web/.env.local.example apps/web/.env.local
npm run dev:web
# open http://localhost:3000
```

### Run with Docker
```bash
docker compose up --build         # web on :3000, api on :4000
```

### Test
```bash
npm test                          # API integration tests (node:test + fastify.inject)
```

**Verified:** API tests pass (6/6), `tsc` compiles clean, `next build` succeeds,
both Docker images build, and the containerized stack renders live API data
across the compose network.

---

## Project design docs

## Contents

| # | Document | What it demonstrates |
|---|----------|----------------------|
| — | [Upwork Portfolio Package](./upwork-portfolio-package.md) | Profile, bio, gigs, showcase, proposal template |
| 1 | [Real-Time Delivery Tracking System](./project-1-delivery-tracking/README.md) | WebSockets, GPS streaming, geospatial, role-based auth |
| 2 | [SaaS Auth + Subscription Boilerplate](./project-2-saas-boilerplate/README.md) | JWT + refresh rotation, RBAC, Stripe billing |
| 3 | [AI Customer Support (RAG Chat)](./project-3-ai-support-rag/README.md) | RAG pipeline, vector search, streaming LLM responses |

## Core stack across projects

- **Runtime:** Node.js 22 (LTS), TypeScript (strict)
- **HTTP:** Fastify (delivery, AI) / NestJS (SaaS boilerplate)
- **Data:** PostgreSQL 16 + Prisma, Redis 7 (cache / pub-sub / rate limit)
- **Real-time:** WebSockets (`ws` + Redis adapter), SSE for one-way streams
- **Payments:** Stripe (Checkout + Billing + webhooks)
- **AI:** Anthropic Claude / OpenAI, pgvector for embeddings
- **Infra:** Docker + Docker Compose, GitHub Actions CI

## How to read these docs

Each project README is structured identically:
`Overview → Features → Architecture → Database schema → API design → Real-time
design → Folder structure → Docker/Deployment`.

The intent is to show *system design judgment*, not tutorial code. Every schema,
index, and event is chosen for a stated production reason.
