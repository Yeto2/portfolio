// Server-side fetches use API_URL (internal/container hostname when dockerized);
// the browser uses NEXT_PUBLIC_API_URL.
const SERVER_BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

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

export interface ProjectCard {
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
  docPath: string;
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

export interface ProjectDetail extends ProjectCard {
  features: string[];
  architecture: string;
  schema: SchemaTable[];
  apiGroups: ApiGroup[];
  realtime: RealtimeEvent[];
  folders: string;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${SERVER_BASE}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const getProfile = () => getJson<Profile>('/api/profile');
export const getServices = () => getJson<Service[]>('/api/services');
export const getProjects = () => getJson<ProjectCard[]>('/api/projects');

export async function getProject(slug: string): Promise<ProjectDetail | null> {
  const res = await fetch(`${SERVER_BASE}/api/projects/${slug}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API project ${slug} failed: ${res.status}`);
  return res.json() as Promise<ProjectDetail>;
}
