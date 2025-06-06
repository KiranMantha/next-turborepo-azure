import { NextConfig } from 'next';
import { WebpackAssetsManifest } from 'webpack-assets-manifest';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  reactStrictMode: true,
  distDir: 'dist',
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/api/getNextProps',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      },
      {
        source: '/asset-manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ];
  },
  webpack(config) {
    config.plugins.push(
      new WebpackAssetsManifest({
        output: '../public/asset-manifest.json',
        transform: (assets) => {
          const entrypoints = [];
          for (const file in assets) {
            if (file.includes('server/')) {
              delete assets[file];
            } else if ((assets[file] as string).endsWith('.js') || (assets[file] as string).endsWith('.css')) {
              entrypoints.push(assets[file]);
            }
          }
          return {
            files: assets,
            entrypoints: entrypoints
          };
        }
      })
    );
    return config;
  }
};

export default nextConfig;
