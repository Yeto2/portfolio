# Upwork Portfolio Package

A complete, copy-paste-ready set of profile assets positioned for senior backend
and AI integration work. Replace `{{Name}}` and links before publishing.

---

## 1. Profile Headline

Pick the variant that matches the jobs you're bidding on. Headlines are weighted
heavily in Upwork search — lead with the highest-intent keywords.

**Primary (generalist backend):**
> Senior Backend Engineer | Node.js, PostgreSQL, Real-Time & AI Systems

**Variant A (AI-focused):**
> AI SaaS Engineer | Claude/OpenAI, RAG Chatbots, Node.js APIs

**Variant B (real-time / SaaS):**
> Node.js Backend & SaaS Architect | Stripe, WebSockets, Scalable APIs

---

## 2. Bio

> I build production backends that hold up under real traffic — not prototypes
> that break the week after launch.
>
> Over the last several years I've shipped real-time systems, SaaS platforms,
> and AI-powered products end to end: API design, database modeling, payments,
> auth, and deployment. My focus is the part clients actually care about — a
> system that's fast, secure, observable, and easy for their team to extend.
>
> **What I deliver:**
> - **Real-time apps** — live tracking, dashboards, and chat using WebSockets and
>   Redis pub/sub that scale horizontally.
> - **SaaS platforms** — JWT auth with refresh-token rotation, RBAC, and Stripe
>   subscription billing wired to webhooks (no missed payment edge cases).
> - **AI integrations** — Claude/OpenAI chatbots with RAG over your own documents,
>   streaming responses, and conversation history.
> - **Clean architecture** — typed Node.js (TypeScript), PostgreSQL, Docker, and
>   CI so the codebase is maintainable long after handoff.
>
> I communicate clearly, give honest timelines, and leave you with documentation
> your next developer can pick up. If you want a backend that's built to last,
> let's talk.

**Why this works:** opens with a client pain point, lists concrete deliverables
with the keywords clients search, and closes with a low-friction CTA. No "I'm a
passionate self-taught developer" framing — that signals junior.

---

## 3. Skills (Upwork search optimization)

Upwork lets you list up to ~15 skills. Order matters less than coverage — include
the exact phrases clients type into search.

```
Node.js · TypeScript · Fastify · NestJS · Express
PostgreSQL · MySQL · Redis · Prisma
REST API · WebSocket · Real-Time Application Development
Stripe · Subscription Billing · Payment Integration
JWT Authentication · RBAC · API Security
Docker · CI/CD · AWS
OpenAI API · Anthropic Claude · RAG · Vector Database · LangChain
React · Next.js
```

**Specialized Profiles** (Upwork supports 2 — create both):
1. *Backend / API Development* — Node.js, Postgres, Stripe, real-time.
2. *AI Application Development* — Claude/OpenAI, RAG, chatbots, vector DBs.

---

## 4. Service Offerings (Gigs / Project Catalog)

Upwork's "Project Catalog" gigs are fixed-scope, productized offers. These convert
better than hourly bids for new profiles.

### Gig 1 — Custom Node.js REST API
**I will build a secure, production-ready Node.js + PostgreSQL REST API**
- JWT auth, validation, error handling, OpenAPI docs
- Dockerized, with seed data and a Postman collection
- Tiers: Starter (5 endpoints) / Standard (15) / Premium (full CRUD + auth + tests)

### Gig 2 — SaaS Starter: Auth + Stripe Subscriptions
**I will set up your SaaS backend with authentication and Stripe billing**
- JWT + refresh tokens, RBAC, free/pro tiers, webhook-driven subscription state
- User dashboard endpoints + customer billing portal
- Deployment-ready with Docker and environment config

### Gig 3 — AI Chatbot with RAG (Claude / OpenAI)
**I will build an AI support chatbot trained on your documents**
- Upload docs → vector embeddings → grounded answers (no hallucinating outside scope)
- Streaming responses, conversation history, embeddable widget
- Admin panel to manage the knowledge base

### Gig 4 — Real-Time Feature Integration
**I will add live tracking, notifications, or chat to your app**
- WebSocket/SSE architecture, Redis scaling, reconnection handling
- Works with your existing backend or as a standalone service

### Gig 5 — Backend Architecture Review & Scaling
**I will audit your Node.js backend and deliver a scaling plan**
- Schema/index review, N+1 detection, caching strategy, security checklist
- Written report + prioritized fix list

---

## 5. Project Showcase Section

Use these blurbs in the Upwork "Portfolio" tiles. Each links to the corresponding
repo/README and ideally a short Loom walkthrough.

### 🚚 Real-Time Delivery Tracking System
A logistics platform with live driver GPS on a map, full delivery lifecycle
(created → assigned → picked up → delivered), distance-based ETAs, and an admin
control panel. Built with Fastify, PostgreSQL + PostGIS, Redis pub/sub, and
WebSockets designed to scale across multiple server instances.
*Stack: Node.js, TypeScript, Fastify, PostgreSQL/PostGIS, Redis, WebSocket, Docker*

### 🔐 SaaS Authentication + Subscription Boilerplate
A reusable SaaS foundation: JWT auth with rotating refresh tokens, role-based
access control, and Stripe subscriptions (free/pro) kept perfectly in sync via
webhooks. Includes rate limiting, security headers, and a user dashboard. This is
the base I reuse to launch SaaS products fast.
*Stack: NestJS, PostgreSQL, Prisma, Redis, Stripe, Docker*

### 🤖 AI Customer Support System (RAG)
An AI support chatbot that answers from *your* knowledge base. Documents are
chunked, embedded, and stored in a vector database; user questions retrieve the
most relevant context and Claude/OpenAI generates a grounded, streaming answer.
Includes an admin panel for document management and full conversation history.
*Stack: Node.js, Fastify, pgvector, Anthropic/OpenAI, WebSocket streaming, React widget*

---

## 6. Proposal Template

Keep proposals short. Clients skim. Lead with proof you read their post, then a
concrete plan, then a question that forces a reply.

```
Hi {{Client name}},

You're looking for {{restate their goal in one line — proves you read it}}.
I've built exactly this: {{name the most relevant showcase project + 1 metric
or detail}}.

Here's how I'd approach yours:
1. {{Specific first step tied to their requirement}}
2. {{Second step — architecture or integration decision}}
3. {{Delivery: testing, Docker, docs, handoff}}

A couple of things I'd want to confirm before estimating:
- {{Smart clarifying question that shows domain knowledge}}

I can start {{timeframe}} and would deliver an initial working version by
{{milestone}}. Portfolio with similar work: {{link}}.

Happy to hop on a quick call if useful.

— {{Name}}
```

**Rules for high reply rates:**
- Never open with "Dear Sir/Madam" or a wall of text. First sentence must prove
  you understood *their* problem.
- Include exactly one relevant link, not five.
- End with a question — replies beat monologues.
- Mirror their stack; if they say "Express," don't pitch NestJS unironically.
- For your first 5–10 jobs, bid slightly under your target rate to build reviews,
  then raise it. Reviews are the single biggest ranking lever on Upwork.
