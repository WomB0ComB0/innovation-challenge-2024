import pwa from '@ducanh2912/next-pwa';
import MillionLint from '@million/lint';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { NextConfig } from 'next/types';

const withPwa = pwa({
  dest: 'public',
  disable: false,
  register: true,
  sw: '/sw.js',
  publicExcludes: ['!noprecache/**/*'],
});

/**
 * @type {import('next').NextConfig}
 */
const config: NextConfig = {
  env: {
    VAR_ORIGINAL_PATHNAME: process.env.VAR_ORIGINAL_PATHNAME || '/',
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    optimizeCss: {
      preload: true,
    },
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
    ],
  },
  rewrites: async () => {
    return [
      { source: '/healthz', destination: '/api/health' },
      { source: '/api/healthz', destination: '/api/health' },
      { source: '/health', destination: '/api/health' },
      { source: '/ping', destination: '/api/health' },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/v1/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://full-stack-template.vercel.app' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/png',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
  publicRuntimeConfig: {
    basePath: '',
  },
};

const withMillion = MillionLint.next({
  rsc: true,
  filter: {
    include: '**/components/*.{mtsx,mjsx,tsx,jsx}',
  },
});

const finalConfig = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(
  withPwa(
    withMillion(config)
  )
);

const shouldUseSentry = process.env.NODE_ENV === 'production' && process.env.SENTRY_AUTH_TOKEN;

let exportedConfig = finalConfig;

if (shouldUseSentry) {
  exportedConfig = withSentryConfig(finalConfig, {
    org: 'womb0comb0',
    project: 'full-stack-template',
    sentryUrl: 'https://sentry.io/',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  });
}

export default exportedConfig;
