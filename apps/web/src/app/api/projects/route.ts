import { projects } from '@portfolio/api/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cards = projects.map(
    ({ architecture, features, schema, apiGroups, realtime, folders, ...card }) => card,
  );
  return Response.json(cards);
}
