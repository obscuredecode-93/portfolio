/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during production builds — run `next lint` separately.
  // Fixes a FlatCompat serialization error with Next.js 15 flat ESLint configs.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
