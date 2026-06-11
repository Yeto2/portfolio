import { services } from '@portfolio/api/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(services);
}
