import { projects } from '@portfolio/api/content';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return Response.json(
      { error: 'not_found', message: 'Project not found' },
      { status: 404 },
    );
  }
  return Response.json(project);
}
