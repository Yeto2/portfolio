import { z } from 'zod';
import { insertContact } from '@/lib/contact-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('A valid email is required').max(254),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  budget: z.string().trim().max(60).optional(),
});

const rateWindow = new Map<string, { count: number; resetAt: number }>();
const RATE_MAX = Number(process.env.CONTACT_RATE_MAX ?? 5);
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateWindow.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateWindow.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'rate_limit', message: 'Too many requests' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: 'validation_error', fields: { _: ['Invalid JSON body'] } },
      { status: 422 },
    );
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'validation_error', fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { id } = insertContact({
    ...parsed.data,
    budget: parsed.data.budget ?? null,
    ip,
  });

  return Response.json({ ok: true, id }, { status: 201 });
}
