/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Image optimisation ────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co'    },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ─── Headers (security + performance) ─────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'DENY'         },
          { key: 'X-Content-Type-Options',  value: 'nosniff'      },
          { key: 'Referrer-Policy',         value: 'strict-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // ─── Redirects ─────────────────────────────────────────────────
  async redirects() {
    return [
      { source: '/dashboard', destination: '/dashboard/admin', permanent: false },
      { source: '/login',     destination: '/auth/login',      permanent: true  },
    ]
  },

  // ─── Server External Packages ──────────────────────────────────
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],

  // ─── TypeScript ────────────────────────────────────────────────
  typescript: { ignoreBuildErrors: false },
}

module.exports = nextConfig
