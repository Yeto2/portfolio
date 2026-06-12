export interface Profile {
  name: string;
  role: string;
  headline: string;
  tagline: string;
  bio: string[];
  location: string;
  availability: string;
  email: string;
  metrics: { label: string; value: string }[];
  social: { label: string; url: string; icon: 'github' | 'linkedin' | 'upwork' | 'mail' }[];
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface Project {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  summary: string;
  demo: string;
  liveUrl: string;
  repoUrl: string;
  stack: string[];
  highlights: string[];
  features: string[];
  challenges: string[];
  results: string[];
  architecture: string;
  schema: { name: string; purpose: string; columns: string[] }[];
  apiGroups: { group: string; routes: { method: string; path: string; desc: string }[] }[];
  realtime: { name: string; direction: 'in' | 'out'; payload: string; desc: string }[];
  folders: string;
  accent: 'blue' | 'violet' | 'cyan';
}

export const profile: Profile = {
  name: 'Yassine Essemnaoui',
  role: 'Senior Full Stack Developer',
  headline: 'I craft production-grade web systems that scale.',
  tagline:
    'Full stack development, real-time backends, SaaS platforms, and AI integrations — built with the precision of a product team and the reliability clients expect.',
  bio: [
    'I build production systems that hold up under real traffic — not prototypes that break the week after launch. From polished frontends to resilient APIs, I ship end-to-end with clear architecture and documentation your team can extend.',
    'Over several years I have delivered real-time logistics platforms, SaaS foundations with Stripe billing, AI-powered support systems, and e-commerce solutions across WordPress, WooCommerce, and Shopify. My focus is what clients actually care about: speed, security, maintainability, and honest communication.',
    'I work remotely with founders, agencies, and product teams worldwide. You get incremental delivery, tested code, and a handoff that does not leave your next developer guessing.',
  ],
  location: 'Remote · Worldwide',
  availability: 'Available for new projects',
  email: 'yessemna1337@gmail.com',
  metrics: [
    { label: 'Years shipping products', value: '3+' },
    { label: 'APIs in production', value: '20+' },
    { label: 'Typical reply time', value: '< 24h' },
    { label: 'Client satisfaction', value: '100%' },
  ],
  social: [
    { label: 'GitHub', url: 'https://github.com/Yeto2', icon: 'github' },
    { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~01e9627c9399e828e0', icon: 'upwork' },
    { label: 'Email', url: 'mailto:yessemna1337@gmail.com', icon: 'mail' },
  ],
};

export const heroServices = [
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'WordPress Development',
  'WooCommerce Development',
  'Shopify Development',
  'Web Application Development',
  'API Development',
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: 'layout',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'Responsive UI', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'Fastify', 'NestJS', 'REST APIs', 'WebSockets', 'PostgreSQL', 'Redis', 'Prisma'],
  },
  {
    category: 'CMS & E-commerce',
    icon: 'shopping',
    skills: ['WordPress', 'WooCommerce', 'Shopify', 'Custom Themes', 'Payment Integration', 'Store Optimization'],
  },
  {
    category: 'AI & Data',
    icon: 'sparkles',
    skills: ['OpenAI API', 'Anthropic Claude', 'RAG Pipelines', 'Vector Search', 'pgvector', 'Streaming LLM'],
  },
  {
    category: 'DevOps & Tools',
    icon: 'terminal',
    skills: ['Docker', 'Git', 'GitHub Actions', 'Nginx', 'Linux', 'CI/CD', 'AWS', 'Vercel'],
  },
];

export const services: Service[] = [
  {
    slug: 'full-stack',
    title: 'Full Stack Development',
    summary: 'End-to-end web applications — polished UI, robust APIs, database design, and deployment.',
    deliverables: ['React/Next.js frontend', 'Node.js API layer', 'Database modeling', 'Docker + CI/CD setup'],
  },
  {
    slug: 'frontend',
    title: 'Frontend Development',
    summary: 'Premium, responsive interfaces with modern React, TypeScript, and performance-first patterns.',
    deliverables: ['Component architecture', 'Design system integration', 'Accessibility (WCAG)', 'Core Web Vitals optimization'],
  },
  {
    slug: 'backend',
    title: 'Backend Development',
    summary: 'Production APIs with auth, validation, rate limiting, and observability built in from day one.',
    deliverables: ['REST/WebSocket APIs', 'JWT + RBAC', 'PostgreSQL/Redis', 'OpenAPI documentation'],
  },
  {
    slug: 'wordpress',
    title: 'WordPress Development',
    summary: 'Custom themes, plugins, and headless WordPress setups tailored to your business needs.',
    deliverables: ['Custom theme development', 'Plugin architecture', 'Performance tuning', 'Security hardening'],
  },
  {
    slug: 'woocommerce',
    title: 'WooCommerce Stores',
    summary: 'High-converting WooCommerce stores with custom checkout flows and payment integrations.',
    deliverables: ['Store setup & customization', 'Payment gateway integration', 'Product catalog UX', 'Speed optimization'],
  },
  {
    slug: 'shopify',
    title: 'Shopify Stores',
    summary: 'Custom Shopify themes, app integrations, and storefront experiences that convert.',
    deliverables: ['Liquid theme development', 'App/API integration', 'Checkout customization', 'Mobile-first design'],
  },
  {
    slug: 'performance',
    title: 'Performance Optimization',
    summary: 'Audit and optimize your stack for speed, Core Web Vitals, and server efficiency.',
    deliverables: ['Performance audit report', 'Caching strategy', 'Database query optimization', 'CDN configuration'],
  },
  {
    slug: 'api-integration',
    title: 'API Integration',
    summary: 'Connect your product to third-party services — Stripe, shipping, CRM, AI providers, and more.',
    deliverables: ['Webhook handlers', 'OAuth flows', 'Error handling & retries', 'Integration documentation'],
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
    liveUrl: '',
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
    challenges: [
      'Scaling WebSocket connections across multiple server instances without sticky sessions',
      'Balancing real-time GPS updates with bounded Postgres write load',
      'Enforcing strict lifecycle transitions without race conditions during concurrent driver actions',
    ],
    results: [
      'Horizontally scalable architecture supporting N stateless gateway instances',
      'Sub-second location updates with throttled durable breadcrumbs for audit trails',
      'Production-ready state machine with 409 Conflict on illegal transitions',
    ],
    architecture:
      'A stateless Fastify HTTP API and a WebSocket gateway run behind a load balancer. Live driver coordinates and room membership live in Redis, so any number of instances can serve sockets without sticky sessions. PostgreSQL + PostGIS is the durable source of truth and the authoritative geospatial store.',
    accent: 'blue',
    schema: [
      { name: 'users', purpose: 'Accounts, role-discriminated (customer/driver/admin).', columns: ['id uuid pk', 'email citext unique', 'password_hash', 'role', 'full_name'] },
      { name: 'driver_profiles', purpose: 'Driver vehicle + live availability and last position.', columns: ['user_id uuid pk', 'vehicle_type', 'status', 'last_location geography', 'rating'] },
      { name: 'deliveries', purpose: 'Lifecycle state machine for each delivery.', columns: ['id uuid pk', 'customer_id', 'driver_id', 'status', 'pickup/dropoff geography', 'eta_seconds'] },
      { name: 'location_pings', purpose: 'Append-only GPS breadcrumbs for route replay.', columns: ['id bigserial pk', 'delivery_id', 'driver_id', 'location geography', 'recorded_at'] },
      { name: 'delivery_events', purpose: 'Immutable audit trail of every status transition.', columns: ['id bigserial pk', 'delivery_id', 'from_status', 'to_status', 'actor_id'] },
    ],
    apiGroups: [
      { group: 'Auth', routes: [{ method: 'POST', path: '/auth/login', desc: 'Issue access + refresh token pair' }, { method: 'POST', path: '/auth/refresh', desc: 'Rotate token pair' }] },
      { group: 'Deliveries', routes: [{ method: 'POST', path: '/deliveries', desc: 'Create delivery, returns ETA' }, { method: 'GET', path: '/deliveries/:id', desc: 'Status + assigned driver' }] },
      { group: 'Driver', routes: [{ method: 'PATCH', path: '/driver/status', desc: 'Go online / offline' }, { method: 'POST', path: '/deliveries/:id/deliver', desc: 'Mark delivered' }] },
      { group: 'Admin', routes: [{ method: 'GET', path: '/admin/deliveries', desc: 'All active, filterable' }, { method: 'GET', path: '/admin/metrics', desc: 'Counts, avg time, active drivers' }] },
    ],
    realtime: [
      { name: 'driver:location', direction: 'in', payload: '{ lat, lng, heading, speed }', desc: 'Driver streams GPS; gateway GEOADDs to Redis and recomputes ETA' },
      { name: 'location:update', direction: 'out', payload: '{ deliveryId, lat, lng, etaSeconds }', desc: 'Fanned out via Redis pub/sub to room subscribers' },
      { name: 'delivery:status', direction: 'out', payload: '{ deliveryId, status, at }', desc: 'Lifecycle transition broadcast' },
    ],
    folders: `delivery-tracking/\n├── src/modules/ (auth, deliveries, drivers, admin)\n├── src/realtime/ (ws-gateway, rooms, pubsub)\n├── src/workers/ (heartbeat-reaper, assignment)\n└── admin-dashboard/ (React + Leaflet live map)`,
  },
  {
    slug: 'saas-boilerplate',
    name: 'SaaS Authentication + Subscription Boilerplate',
    icon: 'shield',
    tagline: 'JWT + refresh rotation, RBAC, and webhook-synced Stripe billing.',
    summary:
      'A reusable SaaS foundation: secure auth with rotating refresh tokens, role-based access control, and Stripe subscriptions kept in perfect sync with the database via webhooks. The base I clone to launch SaaS products fast.',
    demo: 'Runnable Fastify backend with a Next.js dashboard: login, tier gating, billing.',
    liveUrl: '',
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
    challenges: [
      'Preventing "paid but no access" bugs when Checkout redirect arrives before webhooks',
      'Detecting stolen refresh tokens without locking out legitimate multi-device users',
      'Ensuring webhook idempotency under Stripe retry storms',
    ],
    results: [
      'Webhook-only subscription writes eliminate billing state drift',
      'Token family reuse detection revokes compromised sessions automatically',
      'Full test coverage on rotation, tier gates (402), and webhook idempotency',
    ],
    architecture:
      'NestJS modules with an auth → roles → tier guard pipeline. Authorization reads a local subscriptions table for speed, but that table is written only by signed Stripe webhooks — so access is never granted on an unverified redirect. An idempotency table prevents replaying the same event twice.',
    accent: 'violet',
    schema: [
      { name: 'users', purpose: 'Accounts with role + Stripe customer link.', columns: ['id uuid pk', 'email citext unique', 'password_hash', 'role', 'stripe_customer_id'] },
      { name: 'refresh_tokens', purpose: 'Rotating refresh tokens with reuse detection.', columns: ['id uuid pk', 'user_id', 'family_id', 'token_hash', 'revoked_at'] },
      { name: 'subscriptions', purpose: 'Local mirror of Stripe state — written only by webhooks.', columns: ['id uuid pk', 'user_id unique', 'tier (free/pro)', 'status', 'current_period_end'] },
      { name: 'processed_webhook_events', purpose: 'Idempotency guard for Stripe events.', columns: ['id text pk (evt_...)', 'type', 'processed_at'] },
    ],
    apiGroups: [
      { group: 'Auth', routes: [{ method: 'POST', path: '/auth/login', desc: 'Access token + httpOnly refresh cookie' }, { method: 'POST', path: '/auth/refresh', desc: 'Rotate token pair (reuse-detected)' }] },
      { group: 'Billing', routes: [{ method: 'POST', path: '/billing/checkout', desc: 'Create Stripe Checkout session' }, { method: 'POST', path: '/webhooks/stripe', desc: 'Signed, idempotent event handler' }] },
      { group: 'Admin', routes: [{ method: 'GET', path: '/admin/users', desc: 'List / search users' }, { method: 'GET', path: '/admin/metrics', desc: 'MRR, active subs, churn' }] },
    ],
    realtime: [],
    folders: `saas-boilerplate/\n├── src/common/guards/ (auth, roles, tier)\n├── src/auth/token.service.ts\n├── src/billing/\n├── src/webhooks/stripe-webhook.controller.ts\n└── frontend/ (Next.js dashboard)`,
  },
  {
    slug: 'ai-support-rag',
    name: 'AI Customer Support System (RAG Chat)',
    icon: 'bot',
    tagline: 'A chatbot grounded in your documents, with streaming answers.',
    summary:
      'An AI support chatbot that answers from your knowledge base, not the open internet. Documents are chunked, embedded, and stored in a vector database; each question retrieves the most relevant context and Claude/OpenAI generates a grounded, streaming answer with citations.',
    demo: 'Runnable Fastify backend with a Next.js console: upload docs, stream grounded answers.',
    liveUrl: '',
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
    challenges: [
      'Grounding LLM responses to prevent hallucinated policies and pricing',
      'Processing large PDF uploads without blocking the API request path',
      'Maintaining strict tenant isolation across vector search and chat history',
    ],
    results: [
      'Similarity threshold + fallback message eliminates out-of-scope hallucinations',
      'BullMQ async ingestion handles 200-page documents with progress reporting',
      'Multi-tenant workspace isolation tested and enforced on every query',
    ],
    architecture:
      'A Fastify API plus a WebSocket gateway for streaming. Document ingestion runs async on a BullMQ queue so large uploads never block. Queries embed the question, run a vector search scoped to the tenant, inject the top chunks into a grounding prompt, and stream the LLM completion back token by token.',
    accent: 'cyan',
    schema: [
      { name: 'workspaces', purpose: 'Multi-tenant boundary; one per client site.', columns: ['id uuid pk', 'name', 'public_key unique'] },
      { name: 'documents', purpose: 'Uploaded knowledge sources with ingestion status.', columns: ['id uuid pk', 'workspace_id', 'title', 'source_type', 'status', 'chunk_count'] },
      { name: 'chunks', purpose: 'Embedded text chunks for vector retrieval.', columns: ['id bigserial pk', 'document_id', 'content', 'embedding vector(1536)'] },
      { name: 'messages', purpose: 'Chat turns with provenance + token usage.', columns: ['id bigserial pk', 'conversation_id', 'role', 'content', 'cited_chunk_ids[]'] },
    ],
    apiGroups: [
      { group: 'Public widget', routes: [{ method: 'WS', path: '/widget/chat', desc: 'Stream Q&A token-by-token' }, { method: 'POST', path: '/widget/conversations', desc: 'Start a conversation' }] },
      { group: 'Admin — knowledge base', routes: [{ method: 'POST', path: '/documents', desc: 'Upload → enqueue ingestion' }, { method: 'DELETE', path: '/documents/:id', desc: 'Remove doc + vectors' }] },
      { group: 'Admin — insight', routes: [{ method: 'GET', path: '/conversations', desc: 'Transcripts, filterable' }, { method: 'GET', path: '/analytics', desc: 'Volume, top questions, token spend' }] },
    ],
    realtime: [
      { name: 'chat:message', direction: 'in', payload: '{ conversationId, content }', desc: 'Visitor asks a question' },
      { name: 'chat:token', direction: 'out', payload: '{ delta }', desc: 'Streamed LLM completion chunk' },
      { name: 'chat:sources', direction: 'out', payload: '{ documents: [{id,title}] }', desc: 'Cited sources sent with answer' },
      { name: 'chat:done', direction: 'out', payload: '{ messageId, usage }', desc: 'Completion finished + token usage' },
    ],
    folders: `ai-support-rag/\n├── src/modules/documents/ingest.processor.ts\n├── src/modules/chat/ (chat.ws.ts, prompt.ts)\n├── src/rag/ (vector-store, chunker, embeddings)\n├── widget/ (embeddable script)\n└── admin/ (React admin panel)`,
  },
];

export const processSteps = [
  { n: '01', title: 'Discovery & Scope', desc: 'We define requirements, architecture, milestones, and an honest timeline before any code is written.' },
  { n: '02', title: 'Build & Iterate', desc: 'Incremental delivery with tests and documentation. You always have something runnable — never a black box.' },
  { n: '03', title: 'Launch & Handoff', desc: 'Deployed, documented, and ready for your team to extend — with support while you go live.' },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
