import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { env } from '../config/env.js';
import { insertContact } from '../db/index.js';

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('A valid email is required').max(254),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  budget: z.string().trim().max(60).optional(),
});

export async function contactRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    '/api/contact',
    {
      config: {
        rateLimit: {
          max: env.CONTACT_RATE_MAX,
          timeWindow: '1 minute',
        },
      },
    },
    async (req, reply) => {
      const parsed = ContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(422).send({
          error: 'validation_error',
          fields: parsed.error.flatten().fieldErrors,
        });
      }

      const { id } = insertContact({
        ...parsed.data,
        budget: parsed.data.budget ?? null,
        ip: req.ip,
      });

      req.log.info({ contactId: id }, 'contact submission received');
      return reply.code(201).send({ ok: true, id });
    },
  );
}
