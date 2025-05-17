import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  distDir: 'dist',
  output: 'standalone'
};

export default nextConfig;
