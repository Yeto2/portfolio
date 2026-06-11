/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone is for Docker/Render; Vercel uses its own output.
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  transpilePackages: ['@portfolio/api'],
};

export default nextConfig;
