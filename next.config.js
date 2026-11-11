const createWithMakeswift = require('@makeswift/runtime/next/plugin')

const withMakeswift = createWithMakeswift()

const MAKESWIFT_APP_ORIGIN = 'https://app.makeswift.com'

function frameAncestorSources() {
  const sources = new Set(["'self'", MAKESWIFT_APP_ORIGIN])
  const configured = process.env.NEXT_PUBLIC_MAKESWIFT_APP_ORIGIN

  if (typeof configured === 'string' && configured.startsWith('https://')) {
    try {
      sources.add(new URL(configured).origin)
    } catch {
      // Ignore an unparsable builder origin and keep the default.
    }
  }

  return [...sources].join(' ')
}

// Report-only so a missing source is logged and not blocked. Enforcing this
// policy would break the inline analytics snippets and the Makeswift builder.
const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://static.ads-twitter.com https://prod.spline.design",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net https://static.ads-twitter.com https://analytics.twitter.com https://prod.spline.design https://*.spline.design https://app.makeswift.com https://api.makeswift.com https://storage.googleapis.com",
  "frame-src 'self' https://app.makeswift.com https://prod.spline.design",
  `frame-ancestors ${frameAncestorSources()}`,
  "worker-src 'self' blob:",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors ${frameAncestorSources()}`,
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: contentSecurityPolicyReportOnly,
          },
        ],
      },
    ]
  },
}

module.exports = withMakeswift(nextConfig)
