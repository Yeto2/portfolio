/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone is only for Docker — never on Vercel (breaks serverless routing → 404).
  ...(process.env.DOCKER_BUILD === '1' ? { output: 'standalone' } : {}),
};

export default nextConfig;
