/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone is Docker-only. Never on Vercel — breaks serverless routing (404 NOT_FOUND).
  ...(process.env.DOCKER_BUILD === '1' && !process.env.VERCEL
    ? { output: 'standalone' }
    : {}),
};

export default nextConfig;
