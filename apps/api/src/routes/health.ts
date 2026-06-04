import type { FastifyInstance } from 'fastify';

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health/live', async () => ({ status: 'ok' }));

  app.get('/health/ready', async () => {
    // Touch the DB so readiness reflects real dependency health.
    const { getDb } = await import('../db/index.js');
    getDb().prepare('SELECT 1').get();
    return { status: 'ready' };
  });
}
