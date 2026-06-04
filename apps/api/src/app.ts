import Fastify, { type FastifyInstance, type FastifyError } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { env } from './config/env.js';
import { getDb } from './db/index.js';
import { healthRoutes } from './routes/health.js';
import { contentRoutes } from './routes/content.js';
import { contactRoutes } from './routes/contact.js';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger:
      env.NODE_ENV === 'production'
        ? true
        : { transport: { target: 'pino-pretty', options: { translateTime: 'HH:MM:ss', ignore: 'pid,hostname' } } },
    trustProxy: true,
  });

  // Initialize the database (creates the file + schema if missing).
  getDb();

  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(cors, {
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST'],
  });
  await app.register(rateLimit, {
    global: false, // opt-in per route (only contact is limited)
    max: 100,
    timeWindow: '1 minute',
  });

  app.setErrorHandler((error: FastifyError, req, reply) => {
    req.log.error(error);
    const status = error.statusCode ?? 500;
    reply.code(status).send({
      error: status >= 500 ? 'internal_error' : (error.code ?? 'error'),
      message: status >= 500 ? 'Something went wrong' : error.message,
    });
  });

  app.setNotFoundHandler((req, reply) => {
    reply.code(404).send({ error: 'not_found', message: `Route ${req.method} ${req.url} not found` });
  });

  await app.register(healthRoutes);
  await app.register(contentRoutes);
  await app.register(contactRoutes);

  return app;
}
