import type { FastifyInstance } from 'fastify';
import { profile, services, projects } from '../data/content.js';

export async function contentRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/profile', async () => profile);

  app.get('/api/services', async () => services);

  app.get('/api/projects', async () =>
    projects.map(
      ({ architecture, features, schema, apiGroups, realtime, folders, ...card }) => card,
    ),
  );

  app.get('/api/projects/:slug', async (req, reply) => {
    const { slug } = req.params as { slug: string };
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      return reply.code(404).send({ error: 'not_found', message: 'Project not found' });
    }
    return project;
  });
}
