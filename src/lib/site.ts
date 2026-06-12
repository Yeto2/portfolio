/** Canonical site URL for SEO (sitemap, robots, Open Graph). Set in Vercel/Render env. */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (url) {
    return url.startsWith('http') ? url : `https://${url}`;
  }
  return 'http://localhost:3000';
}
