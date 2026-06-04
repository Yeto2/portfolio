/**
 * Static portfolio content served by the API. In a larger build this would
 * live in a CMS/DB; keeping it as typed data keeps the demo self-contained
 * while still exercising a real API contract.
 */

export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  bio: string[];
  location: string;
  availability: string;
  skills: string[];
  metrics: { label: string; value: string }[];
  social: { label: string; url: string }[];
}

export interface Service {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface ApiRoute {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'WS';
  path: string;
  desc: string;
}

export interface ApiGroup {
  group: string;
  routes: ApiRoute[];
}

export interface SchemaTable {
  name: string;
  purpose: string;
  columns: string[];
}

export interface RealtimeEvent {
  name: string;
  direction: 'in' | 'out';
  payload: string;
  desc: string;
}

export interface Project {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  summary: string;
  demo: string;
  /** Public URL of the deployed, runnable demo. Empty string hides the button. */
  liveUrl: string;
  /** Public source-code URL (GitHub). Empty string hides the button. */
  repoUrl: string;
  stack: string[];
  highlights: string[];
  features: string[];
  architecture: string;
  schema: SchemaTable[];
  apiGroups: ApiGroup[];
  realtime: RealtimeEvent[];
  folders: string;
  docPath: string;
}

export const profile: Profile = {
  name: 'Yassine Essemnaoui',
  headline: 'Senior Backend Engineer — Node.js, PostgreSQL, Real-Time & AI Systems',
  tagline: 'I build production backends that hold up under real traffic.',
  bio: [
    'I build production backends that hold up under real traffic — not prototypes that break the week after launch.',
    'Over the last several years I have shipped real-time systems, SaaS platforms, and AI-powered products end to end: API design, database modeling, payments, auth, and deployment. My focus is the part clients actually care about — a system that is fast, secure, observable, and easy for their team to extend.',
    'I communicate clearly, give honest timelines, and leave you with documentation your next developer can pick up. If you want a backend that is built to last, let us talk.',
  ],
  location: 'Remote',
  availability: 'Open to new projects',
  metrics: [
    { label: 'Years shipping backends', value: '3+' },
    { label: 'APIs in production', value: '20+' },
    { label: 'Typical reply time', value: '< 24h' },
    { label: 'Focus', value: 'Node · AI · Realtime' },
  ],
  skills: [
    'Node.js', 'TypeScript', 'Fastify', 'NestJS', 'Express',
    'PostgreSQL', 'MySQL', 'Redis', 'Prisma',
    'REST API', 'WebSocket', 'Real-Time Systems',
    'Stripe', 'Subscription Billing', 'Payment Integration',
    'JWT Authentication', 'RBAC', 'API Security',
    'Docker', 'CI/CD', 'AWS',
    'OpenAI API', 'Anthropic Claude', 'RAG', 'Vector Databases',
    'React', 'Next.js',
  ],
  social: [
    { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~01e9627c9399e828e0' },
    { label: 'GitHub', url: 'https://github.com/Yeto2' },
    { label: 'Email', url: 'mailto:yessemna1337@gmail.com' },
  ],
};

export const services: Service[] = [
  {
    slug: 'node-rest-api',
    icon: 'server',
    title: 'Custom Node.js REST API',
    summary: 'A secure, production-ready Node.js + PostgreSQL API with auth, validation, error handling, and OpenAPI docs.',
    deliverables: ['JWT auth & RBAC', 'Validated endpoints', 'Dockerized setup', 'Postman collection & seed data'],
  },
  {
    slug: 'saas-auth-stripe',
    icon: 'card',
    title: 'SaaS Starter: Auth + Stripe Subscriptions',
    summary: 'Authentication and Stripe billing wired correctly — webhook-driven subscription state, no missed edge cases.',
    deliverables: ['JWT + refresh rotation', 'Free/Pro tiers', 'Billing portal', 'Deployment-ready Docker'],
  },
  {
    slug: 'ai-rag-chatbot',
    icon: 'bot',
    title: 'AI Chatbot with RAG (Claude / OpenAI)',
    summary: 'A support chatbot grounded in your documents — no hallucinating outside scope, with streaming responses.',
    deliverables: ['Document ingestion', 'Vector search', 'Streaming answers + citations', 'Admin knowledge base'],
  },
  {
    slug: 'realtime-integration',
    icon: 'bolt',
    title: 'Real-Time Feature Integration',
    summary: 'Add live tracking, notifications, or chat to your app with WebSocket/SSE architecture that scales.',
    deliverables: ['Redis pub/sub fan-out', 'Reconnection handling', 'Horizontal scaling', 'Load-tested design'],
  },
  {
    slug: 'backend-audit',
    icon: 'gauge',
    title: 'Backend Architecture Review & Scaling',
    summary: 'An audit of your Node.js backend with a prioritized, written scaling and security plan.',
    deliverables: ['Schema/index review', 'N+1 detection', 'Caching strategy', 'Security checklist'],
  },
];

export const projects: Project[] = [
  {
    slug: 'delivery-tracking',
    name: 'Real-Time Delivery Tracking System',
    icon: 'truck',
    tagline: 'Live driver GPS, full delivery lifecycle, distance-based ETAs.',
    summary:
      'A logistics platform with live driver GPS on a map, full delivery lifecycle (created → assigned → picked up → delivered), distance-based ETAs, and an admin control panel. Built to scale horizontally — multiple WebSocket instances share state through Redis pub/sub.',
    demo: 'Runnable Fastify + WebSocket backend with a live Next.js tracking console.',
    // TODO: paste the deployed frontend URL (Vercel) after deploying project 1.
    liveUrl: '',
    // TODO: paste this project's GitHub repo URL.
    repoUrl: '',
    stack: ['Node.js', 'TypeScript', 'Fastify', 'PostgreSQL/PostGIS', 'Redis', 'WebSocket', 'Docker'],
    highlights: [
      'Stateless WS gateway + Redis pub/sub for horizontal scaling',
      'PostGIS geospatial queries for nearest-driver assignment',
      'Lifecycle state machine with immutable audit trail',
    ],
    features: [
      'JWT auth with customer / driver / admin roles',
      'Real-time GPS streaming over WebSockets',
      'Delivery lifecycle state machine',
      'Driver online/offline availability with heartbeats',
      'Distance-based ETA recalculated as the driver moves',
      'Admin dashboard with a live map',
    ],
    architecture:
      'A stateless Fastify HTTP API and a WebSocket gateway run behind a load balancer. Live driver coordinates and room membership live in Redis, so any number of instances can serve sockets without sticky sessions. PostgreSQL + PostGIS is the durable source of truth and the authoritative geospatial store.',
    schema: [
      { name: 'users', purpose: 'Accounts, role-discriminated (customer/driver/admin).', columns: ['id uuid pk', 'email citext unique', 'password_hash', 'role', 'full_name', 'created_at'] },
      { name: 'driver_profiles', purpose: 'Driver vehicle + live availability and last position.', columns: ['user_id uuid pk', 'vehicle_type', 'status (offline/online/on_delivery)', 'last_location geography(point)', 'last_seen_at', 'rating'] },
      { name: 'deliveries', purpose: 'Lifecycle state machine for each delivery.', columns: ['id uuid pk', 'customer_id', 'driver_id', 'status', 'pickup/dropoff geography', 'distance_m', 'eta_seconds', 'price_cents', 'created_at'] },
      { name: 'location_pings', purpose: 'Append-only GPS breadcrumbs for route replay / proof of delivery.', columns: ['id bigserial pk', 'delivery_id', 'driver_id', 'location geography(point)', 'recorded_at'] },
      { name: 'delivery_events', purpose: 'Immutable audit trail of every status transition.', columns: ['id bigserial pk', 'delivery_id', 'from_status', 'to_status', 'actor_id', 'created_at'] },
    ],
    apiGroups: [
      { group: 'Auth', routes: [
        { method: 'POST', path: '/auth/login', desc: 'Issue access + refresh token pair' },
        { method: 'POST', path: '/auth/refresh', desc: 'Rotate token pair' },
      ] },
      { group: 'Deliveries (customer)', routes: [
        { method: 'POST', path: '/deliveries', desc: 'Create delivery, returns ETA' },
        { method: 'GET', path: '/deliveries/:id', desc: 'Status + assigned driver' },
        { method: 'POST', path: '/deliveries/:id/cancel', desc: 'Cancel before pickup' },
      ] },
      { group: 'Driver', routes: [
        { method: 'PATCH', path: '/driver/status', desc: 'Go online / offline' },
        { method: 'POST', path: '/deliveries/:id/accept', desc: 'Accept assignment' },
        { method: 'POST', path: '/deliveries/:id/pickup', desc: 'Mark picked up' },
        { method: 'POST', path: '/deliveries/:id/deliver', desc: 'Mark delivered' },
      ] },
      { group: 'Admin', routes: [
        { method: 'GET', path: '/admin/deliveries', desc: 'All active, filterable' },
        { method: 'POST', path: '/admin/deliveries/:id/reassign', desc: 'Reassign driver' },
        { method: 'GET', path: '/admin/metrics', desc: 'Counts, avg time, active drivers' },
      ] },
    ],
    realtime: [
      { name: 'driver:location', direction: 'in', payload: '{ lat, lng, heading, speed }', desc: 'Driver streams GPS; gateway GEOADDs to Redis and recomputes ETA' },
      { name: 'driver:heartbeat', direction: 'in', payload: '{}', desc: 'Liveness ping every 10s; expiry flips driver offline' },
      { name: 'subscribe', direction: 'in', payload: '{ deliveryId }', desc: 'Customer/admin joins a delivery room' },
      { name: 'location:update', direction: 'out', payload: '{ deliveryId, lat, lng, etaSeconds }', desc: 'Fanned out via Redis pub/sub to room subscribers' },
      { name: 'delivery:status', direction: 'out', payload: '{ deliveryId, status, at }', desc: 'Lifecycle transition broadcast' },
      { name: 'delivery:assigned', direction: 'out', payload: '{ deliveryId, pickup, dropoff }', desc: 'Sent to the matched driver' },
    ],
    folders: `delivery-tracking/
├── src/
│   ├── modules/
│   │   ├── auth/            # jwt + refresh rotation
│   │   ├── deliveries/      # routes, service, lifecycle.ts, eta.ts
│   │   ├── drivers/
│   │   └── admin/
│   ├── realtime/
│   │   ├── ws-gateway.ts    # connection, auth handshake, rooms
│   │   ├── rooms.ts         # Redis-backed membership
│   │   └── pubsub.ts        # publish/subscribe fan-out
│   ├── workers/
│   │   ├── heartbeat-reaper.ts
│   │   └── assignment.ts    # nearest-driver matching (PostGIS)
│   └── plugins/             # auth, db, redis, error-handler
├── prisma/schema.prisma
├── admin-dashboard/         # React + Leaflet live map
└── docker-compose.yml`,
    docPath: 'project-1-delivery-tracking/README.md',
  },
  {
    slug: 'saas-boilerplate',
    name: 'SaaS Authentication + Subscription Boilerplate',
    icon: 'shield',
    tagline: 'JWT + refresh rotation, RBAC, and webhook-synced Stripe billing.',
    summary:
      'A reusable SaaS foundation: secure auth with rotating refresh tokens, role-based access control, and Stripe subscriptions kept in perfect sync with the database via webhooks. The base I clone to launch SaaS products fast.',
    demo: 'Runnable Fastify backend with a Next.js dashboard: login, tier gating, billing.',
    // TODO: paste the deployed frontend URL (Vercel) after deploying project 2.
    liveUrl: '',
    // TODO: paste this project's GitHub repo URL.
    repoUrl: '',
    stack: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Stripe', 'Docker'],
    highlights: [
      'Refresh-token rotation with reuse detection (OWASP pattern)',
      'Stripe as source of truth, DB as webhook-synced mirror',
      'Idempotent webhook handling — no double-processing',
    ],
    features: [
      'Email/password auth with short-lived access + rotating refresh tokens',
      'Role-based access control and tier gates (free/pro)',
      'Stripe Checkout, Billing Portal, and subscription webhooks',
      'User dashboard: profile, plan, usage, billing history',
      'Rate limiting, security headers, input validation',
      'Email verification and password reset',
    ],
    architecture:
      'NestJS modules with an auth → roles → tier guard pipeline. Authorization reads a local subscriptions table for speed, but that table is written only by signed Stripe webhooks — so access is never granted on an unverified redirect. An idempotency table prevents replaying the same event twice.',
    schema: [
      { name: 'users', purpose: 'Accounts with role + Stripe customer link.', columns: ['id uuid pk', 'email citext unique', 'password_hash', 'role (user/admin)', 'email_verified', 'stripe_customer_id', 'created_at'] },
      { name: 'refresh_tokens', purpose: 'Rotating refresh tokens with reuse detection (family chain).', columns: ['id uuid pk', 'user_id', 'family_id', 'token_hash', 'expires_at', 'revoked_at', 'replaced_by', 'ip'] },
      { name: 'subscriptions', purpose: 'Local mirror of Stripe state — written only by webhooks.', columns: ['id uuid pk', 'user_id unique', 'stripe_subscription_id', 'tier (free/pro)', 'status', 'current_period_end', 'cancel_at_period_end'] },
      { name: 'processed_webhook_events', purpose: 'Idempotency guard — never process the same Stripe event twice.', columns: ['id text pk (evt_...)', 'type', 'processed_at'] },
      { name: 'password_reset_tokens', purpose: 'Single-use, expiring reset tokens.', columns: ['id uuid pk', 'user_id', 'token_hash', 'expires_at', 'used_at'] },
    ],
    apiGroups: [
      { group: 'Auth', routes: [
        { method: 'POST', path: '/auth/register', desc: 'Create account + send verification' },
        { method: 'POST', path: '/auth/login', desc: 'Access token + httpOnly refresh cookie' },
        { method: 'POST', path: '/auth/refresh', desc: 'Rotate token pair (reuse-detected)' },
        { method: 'POST', path: '/auth/reset-password', desc: 'Complete password reset' },
      ] },
      { group: 'User / dashboard', routes: [
        { method: 'GET', path: '/me', desc: 'Profile + role + tier' },
        { method: 'GET', path: '/me/subscription', desc: 'Plan, status, renewal date' },
        { method: 'GET', path: '/me/usage', desc: 'Tier-gated usage counters' },
      ] },
      { group: 'Billing', routes: [
        { method: 'POST', path: '/billing/checkout', desc: 'Create Stripe Checkout session' },
        { method: 'POST', path: '/billing/portal', desc: 'Create Billing Portal session' },
        { method: 'POST', path: '/webhooks/stripe', desc: 'Signed, idempotent event handler' },
      ] },
      { group: 'Admin (RBAC)', routes: [
        { method: 'GET', path: '/admin/users', desc: 'List / search users' },
        { method: 'PATCH', path: '/admin/users/:id/role', desc: 'Change role' },
        { method: 'GET', path: '/admin/metrics', desc: 'MRR, active subs, churn' },
      ] },
    ],
    realtime: [],
    folders: `saas-boilerplate/
├── src/
│   ├── common/
│   │   ├── guards/          # auth, roles, tier guards
│   │   └── decorators/      # @RequireTier, @Roles, @CurrentUser
│   ├── auth/
│   │   ├── auth.service.ts
│   │   └── token.service.ts # rotate / revoke / reuse detection
│   ├── users/
│   ├── billing/             # checkout + portal sessions
│   └── webhooks/
│       └── stripe-webhook.controller.ts  # raw body, idempotent
├── prisma/schema.prisma
├── frontend/                # Next.js dashboard
└── docker-compose.yml`,
    docPath: 'project-2-saas-boilerplate/README.md',
  },
  {
    slug: 'ai-support-rag',
    name: 'AI Customer Support System (RAG Chat)',
    icon: 'bot',
    tagline: 'A chatbot grounded in your documents, with streaming answers.',
    summary:
      'An AI support chatbot that answers from your knowledge base, not the open internet. Documents are chunked, embedded, and stored in a vector database; each question retrieves the most relevant context and Claude/OpenAI generates a grounded, streaming answer with citations.',
    demo: 'Runnable Fastify backend with a Next.js console: upload docs, stream grounded answers.',
    // TODO: paste the deployed frontend URL (Vercel) after deploying project 3.
    liveUrl: '',
    // TODO: paste this project's GitHub repo URL.
    repoUrl: '',
    stack: ['Node.js', 'Fastify', 'pgvector', 'Anthropic/OpenAI', 'WebSocket', 'BullMQ', 'React'],
    highlights: [
      'RAG grounding — answers cite sources or admit they do not know',
      'Async ingestion pipeline (parse → chunk → embed) via BullMQ',
      'Swappable VectorStore port (pgvector → Pinecone/Weaviate)',
    ],
    features: [
      'Embeddable chat widget for any website',
      'RAG retrieval over pgvector with similarity threshold',
      'Streaming token-by-token responses for instant UX',
      'Admin panel to upload and manage documents',
      'Full conversation history with provenance',
      'Multi-tenant workspace isolation',
    ],
    architecture:
      'A Fastify API plus a WebSocket gateway for streaming. Document ingestion runs async on a BullMQ queue so large uploads never block. Queries embed the question, run a vector search scoped to the tenant, inject the top chunks into a grounding prompt, and stream the LLM completion back token by token.',
    schema: [
      { name: 'workspaces', purpose: 'Multi-tenant boundary; one per client site.', columns: ['id uuid pk', 'name', 'public_key unique (widget auth)', 'created_at'] },
      { name: 'documents', purpose: 'Uploaded knowledge sources with ingestion status.', columns: ['id uuid pk', 'workspace_id', 'title', 'source_type (pdf/docx/txt/url)', 'status (processing/ready/failed)', 'chunk_count'] },
      { name: 'chunks', purpose: 'Embedded text chunks for vector retrieval.', columns: ['id bigserial pk', 'document_id', 'workspace_id', 'content', 'token_count', 'embedding vector(1536)', 'position'] },
      { name: 'conversations', purpose: 'Per-visitor chat sessions.', columns: ['id uuid pk', 'workspace_id', 'visitor_id', 'created_at'] },
      { name: 'messages', purpose: 'Chat turns with provenance + token usage.', columns: ['id bigserial pk', 'conversation_id', 'role (user/assistant)', 'content', 'cited_chunk_ids[]', 'prompt/completion_tokens'] },
    ],
    apiGroups: [
      { group: 'Public widget', routes: [
        { method: 'POST', path: '/widget/conversations', desc: 'Start a conversation (public_key auth)' },
        { method: 'WS', path: '/widget/chat', desc: 'Stream Q&A token-by-token' },
        { method: 'GET', path: '/widget/conversations/:id', desc: "Visitor's own history" },
      ] },
      { group: 'Admin — knowledge base', routes: [
        { method: 'POST', path: '/documents', desc: 'Upload → enqueue ingestion' },
        { method: 'GET', path: '/documents', desc: 'List with status + chunk counts' },
        { method: 'POST', path: '/documents/:id/reindex', desc: 'Re-run ingestion' },
        { method: 'DELETE', path: '/documents/:id', desc: 'Remove doc + its vectors' },
      ] },
      { group: 'Admin — insight', routes: [
        { method: 'GET', path: '/conversations', desc: 'Transcripts, filterable' },
        { method: 'GET', path: '/analytics', desc: 'Volume, top questions, token spend' },
      ] },
    ],
    realtime: [
      { name: 'chat:message', direction: 'in', payload: '{ conversationId, content }', desc: 'Visitor asks a question' },
      { name: 'chat:sources', direction: 'out', payload: '{ documents: [{id,title}] }', desc: 'Cited sources, sent with the answer' },
      { name: 'chat:token', direction: 'out', payload: '{ delta }', desc: 'Streamed LLM completion chunk' },
      { name: 'chat:done', direction: 'out', payload: '{ messageId, usage }', desc: 'Completion finished + token usage' },
    ],
    folders: `ai-support-rag/
├── src/
│   ├── modules/
│   │   ├── documents/
│   │   │   └── ingest.processor.ts  # BullMQ: parse→chunk→embed
│   │   ├── chat/
│   │   │   ├── chat.ws.ts           # streaming gateway
│   │   │   └── prompt.ts            # grounding prompt builder
│   │   └── analytics/
│   ├── rag/
│   │   ├── vector-store.ts          # port (swap pgvector↔Pinecone)
│   │   ├── pgvector-store.ts
│   │   └── chunker.ts               # token-aware splitting + overlap
│   └── llm/
│       ├── anthropic.adapter.ts
│       └── openai.adapter.ts
├── widget/                          # embeddable <script> widget
├── admin/                           # React admin panel
└── docker-compose.yml`,
    docPath: 'project-3-ai-support-rag/README.md',
  },
];
