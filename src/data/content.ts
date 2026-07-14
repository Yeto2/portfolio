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

export interface Service {
  title: string;
  summary: string;
  icon: string;
}

export interface WhyItem {
  title: string;
  summary: string;
  icon: string;
}

export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export type ProjectCategory = 'commerce' | 'systems';

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  summary: string;
  coverLabel: string;
  accent: 'blue' | 'sky' | 'indigo' | 'cyan' | 'violet';
  stack: string[];
  liveUrl: string;
  caseStudyUrl: string;
  repoUrl: string;
  problem: string;
  solution: string;
  features: string[];
  results: string[];
}

export const profile: Profile = {
  name: 'Yassine Essemnaoui',
  role: 'WooCommerce & Next.js E-commerce Developer',
  headline: 'WooCommerce & Next.js\nE-commerce Developer',
  tagline:
    'I build premium online stores with custom Next.js frontends powered by WooCommerce — fast, elegant, and built to convert.',
  bio: [
    'Business owners do not hire me for code dumps — they hire me for stores that look expensive, load instantly, and turn visitors into paying customers.',
    'I specialize in WooCommerce storefronts with modern Next.js experiences where it matters: product discovery, checkout trust, and day-to-day performance. My live commerce work includes Pobmed, alongside production-grade systems (real-time logistics, SaaS billing, AI support).',
    'Whether you need a digital-goods store, a redesigned catalog, or a headless Next.js layer on WooCommerce, you get clear communication, weekly momentum, and a handoff your team can grow from.',
  ],
  location: 'Remote · Worldwide',
  availability: 'Open for new store projects',
  email: 'yessemna1337@gmail.com',
  metrics: [
    { label: 'Focus', value: 'E-commerce' },
    { label: 'Live store', value: 'Pobmed' },
    { label: 'Reply time', value: '< 24h' },
    { label: 'Engagement', value: 'Premium' },
  ],
  social: [
    { label: 'GitHub', url: 'https://github.com/Yeto2', icon: 'github' },
    { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~01e9627c9399e828e0', icon: 'upwork' },
    { label: 'Email', url: 'mailto:yessemna1337@gmail.com', icon: 'mail' },
  ],
};

export const services: Service[] = [
  {
    title: 'Custom WooCommerce Store Development',
    summary: 'End-to-end stores — catalog, cart, checkout, and admin — shaped to your brand and catalog.',
    icon: 'store',
  },
  {
    title: 'Next.js Frontend Development',
    summary: 'Fast headless storefronts that feel like a product, not a stock WordPress theme.',
    icon: 'next',
  },
  {
    title: 'WooCommerce Theme Customization',
    summary: 'Upgrade existing stores into polished, high-converting experiences without a full rebuild.',
    icon: 'palette',
  },
  {
    title: 'Performance Optimization',
    summary: 'Core Web Vitals, image strategy, and caching so shoppers never wait on product pages.',
    icon: 'zap',
  },
  {
    title: 'UI/UX Design Implementation',
    summary: 'Pixel-accurate Figma builds — or collaboration on layouts that protect conversion.',
    icon: 'layout',
  },
  {
    title: 'Responsive Development',
    summary: 'Mobile checkout and desktop browsing that both feel intentional — no broken breakpoints.',
    icon: 'devices',
  },
  {
    title: 'Payment Gateway Integration',
    summary: 'Stripe, PayPal, and regional gateways wired cleanly into WooCommerce checkout.',
    icon: 'card',
  },
  {
    title: 'Store Redesign',
    summary: 'Replace outdated themes with trust-first, premium interfaces that sell.',
    icon: 'sparkles',
  },
  {
    title: 'Maintenance & Improvements',
    summary: 'Ongoing features, security, and polish so the store keeps converting after launch.',
    icon: 'wrench',
  },
];

export const skills: string[] = [
  'Next.js',
  'React',
  'TypeScript',
  'WooCommerce',
  'WordPress',
  'PHP',
  'REST API',
  'MySQL',
  'Docker',
  'Git',
  'Tailwind CSS',
  'SEO',
  'Performance Optimization',
  'Headless Commerce',
  'Stripe',
  'WebSockets',
  'Fastify',
  'Figma Implementation',
];

export const whyItems: WhyItem[] = [
  {
    title: 'Clean Code',
    summary: 'Maintainable structure your next developer — or your team — can extend without fear.',
    icon: 'code',
  },
  {
    title: 'Fast Performance',
    summary: 'Speed is a conversion feature. Pages and checkout that feel instant on real devices.',
    icon: 'zap',
  },
  {
    title: 'Scalable Architecture',
    summary: 'Built to grow with catalog size, campaigns, and traffic spikes.',
    icon: 'layers',
  },
  {
    title: 'Responsive Design',
    summary: 'Most buyers are on phones — every screen is designed, not squeezed.',
    icon: 'devices',
  },
  {
    title: 'SEO Friendly',
    summary: 'Clean URLs, structured data, and fast pages so products get discovered.',
    icon: 'search',
  },
  {
    title: 'Business Focused',
    summary: 'I optimize for trust and purchases — not just beautiful screenshots.',
    icon: 'target',
  },
  {
    title: 'Modern UI',
    summary: 'Restraint, hierarchy, and motion that feels intentional — never cluttered.',
    icon: 'sparkles',
  },
  {
    title: 'Reliable Communication',
    summary: 'Clear updates, honest timelines, and zero black-box development.',
    icon: 'message',
  },
];

export const processSteps: ProcessStep[] = [
  { n: '01', title: 'Discovery', desc: 'Goals, brand, catalog, and conversion targets — clarity before code.' },
  { n: '02', title: 'Planning', desc: 'Scope, architecture, milestones, and a timeline you can share.' },
  { n: '03', title: 'Design', desc: 'Storefront, product, cart, and checkout flows that look premium.' },
  { n: '04', title: 'Development', desc: 'Next.js + WooCommerce with weekly demos you can feel.' },
  { n: '05', title: 'Testing', desc: 'Devices, payments, edge cases, and performance before launch.' },
  { n: '06', title: 'Launch', desc: 'Deploy, docs, and support while the first orders land.' },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Pobmed finally looks like a serious software shop. Checkout is clear, keys arrive by email, and support tickets dropped because the flow makes sense.',
    name: 'Omar B.',
    role: 'Founder · Pobmed',
  },
  {
    quote:
      'He ships like a product team: architecture docs, working demos, and no surprises on billing or launch day. Exactly what we needed for a SaaS MVP.',
    name: 'Daniel K.',
    role: 'Product Owner · SaaS startup',
  },
  {
    quote:
      'Clear communication, weekly progress, and a storefront that feels premium on mobile. Exactly the WooCommerce partner we wanted on Upwork.',
    name: 'Amine R.',
    role: 'Operations · Digital goods brand',
  },
];

/** Featured work: commerce stores + system demos from the root workspace. */
export const projects: Project[] = [
  {
    slug: 'pobmed',
    name: 'Pobmed',
    category: 'commerce',
    tagline: 'Digital licenses · WooCommerce',
    summary:
      'Premium software-licensing storefront for genuine Microsoft and Adobe keys — catalog clarity, secure checkout, and instant email delivery after payment.',
    coverLabel: 'Pobmed',
    accent: 'blue',
    stack: ['WordPress', 'WooCommerce', 'PHP', 'Custom theme', 'SSL checkout'],
    liveUrl: 'https://pobmed.com',
    caseStudyUrl: '/projects/pobmed',
    repoUrl: '',
    problem:
      'License retail lives or dies on trust. Generic themes look risky, slow product grids bury categories (Office, Windows Server, tools), and weak checkout flows kill conversions on digital goods.',
    solution:
      'Built a focused WooCommerce storefront with a custom theme: clear category storytelling, high-trust product pages, SSL checkout, and post-purchase email delivery for license keys — positioned as an independent premium reseller.',
    features: [
      'Category hubs for Office, Windows Server, OS, and Microsoft tools',
      'Product pages with price clarity, stock state, and trust cues',
      'Secure checkout with encrypted payments',
      'Automated license delivery by email after payment',
      'Responsive catalog and promotions modules',
      'Support-oriented FAQ and trust blocks on the homepage',
    ],
    results: [
      'Live storefront at pobmed.com with polished brand presence',
      'Friction reduced between browsing, paying, and receiving a key',
      'Store identity shifted from “theme demo” to premium retailer',
    ],
  },
  {
    slug: 'delivery-tracking',
    name: 'Real-Time Delivery Tracking',
    category: 'systems',
    tagline: 'Logistics · WebSockets',
    summary:
      'Live driver GPS, full delivery lifecycle, distance-based ETAs, and an admin console — horizontally scalable architecture with a runnable Fastify + Next.js demo.',
    coverLabel: 'Delivery',
    accent: 'cyan',
    stack: ['Fastify', 'TypeScript', 'WebSocket', 'Next.js', 'SQLite'],
    liveUrl: process.env.NEXT_PUBLIC_DEMO_DELIVERY_URL ?? '',
    caseStudyUrl: '/projects/delivery-tracking',
    repoUrl: 'https://github.com/Yeto2/delivery-tracking',
    problem:
      'Logistics products need live location, strict lifecycle rules, and multi-role access — naive polling and sticky sessions do not scale.',
    solution:
      'Stateless HTTP API plus WebSocket gateway, role-based JWT auth, and a delivery state machine. Reference build uses SQLite + in-process bus; production design maps to Postgres/PostGIS + Redis.',
    features: [
      'Customer / driver / admin roles with JWT + refresh',
      'Realtime GPS streaming over WebSockets',
      'Lifecycle: created → assigned → delivered (+ cancel)',
      'Nearest-driver style assignment and live ETA',
      'Admin metrics and active-delivery map console',
    ],
    results: [
      'Runnable demo with tests covering lifecycle and WS streaming',
      'Architecture ready for multi-instance gateways',
      'Clear separation between demo runtime and production ports',
    ],
  },
  {
    slug: 'saas-boilerplate',
    name: 'SaaS Auth & Billing Boilerplate',
    category: 'systems',
    tagline: 'SaaS foundation · Stripe',
    summary:
      'Reusable SaaS base: refresh-token rotation with reuse detection, RBAC, and webhook-synced Stripe subscriptions — cloneable foundation for new products.',
    coverLabel: 'SaaS',
    accent: 'violet',
    stack: ['Fastify', 'TypeScript', 'Stripe', 'Next.js', 'JWT'],
    liveUrl: process.env.NEXT_PUBLIC_DEMO_SAAS_URL ?? '',
    caseStudyUrl: '/projects/saas-boilerplate',
    repoUrl: 'https://github.com/Yeto2/saas-boilerplate',
    problem:
      'Most SaaS launches burn weeks on auth and billing edge cases — refresh reuse, tier gates, and webhook idempotency.',
    solution:
      'Hardened auth with rotating refresh tokens and family revocation on reuse, plus Stripe webhooks as the only writer of subscription state. Dashboard demo covers login, tiers, and billing flows.',
    features: [
      'Access + rotating refresh tokens with reuse detection',
      'Role and tier gates (free / pro)',
      'Stripe Checkout, portal, and idempotent webhooks',
      'Next.js dashboard for profile, plan, and billing',
      'Works offline in Stripe-less:dev mode for demos',
    ],
    results: [
      'Test suite on rotation, 402 tier gates, and webhook idempotency',
      'Billing drift eliminated by webhook-only writes',
      'Ready to drop into client SaaS MVPs',
    ],
  },
  {
    slug: 'ai-support-rag',
    name: 'AI Support RAG Chat',
    category: 'systems',
    tagline: 'AI · Grounded answers',
    summary:
      'Document-grounded support chatbot with streaming answers, citations, multi-tenant workspaces, and an admin console — runnable offline or with a real LLM.',
    coverLabel: 'RAG',
    accent: 'indigo',
    stack: ['Fastify', 'RAG', 'WebSocket', 'Next.js', 'Vector search'],
    liveUrl: process.env.NEXT_PUBLIC_DEMO_AI_URL ?? '',
    caseStudyUrl: '/projects/ai-support-rag',
    repoUrl: 'https://github.com/Yeto2/ai-support-rag',
    problem:
      'Generic chatbots invent policies. Support products need retrieval, tenant isolation, and streaming UX clients can trust.',
    solution:
      'Ingest → chunk → embed → retrieve → grounded prompt → stream. Offline mode ships without API keys; Anthropic/OpenAI providers plug into the same interface.',
    features: [
      'Workspace isolation and public widget keys',
      'Document upload and ingestion pipeline',
      'Similarity threshold with “I don’t know” fallback',
      'Token streaming over WebSocket',
      'Citations and conversation history',
    ],
    results: [
      'End-to-end demo with tests for grounding and tenancy',
      'No-key offline path for portfolio demos',
      'Clear path to production LLM + pgvector',
    ],
  },
];

export const commerceProjects = projects.filter((p) => p.category === 'commerce');
export const systemsProjects = projects.filter((p) => p.category === 'systems');

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
