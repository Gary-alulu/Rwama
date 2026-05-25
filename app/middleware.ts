import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse }                   from 'next/server'
import { UserRole }                       from '@prisma/client'

// ─── Route → required roles map ──────────────────────────────────
const ROUTE_ROLES: Record<string, UserRole[]> = {
  '/dashboard/admin':   ['ADMIN'],
  '/dashboard/factory': ['ADMIN', 'FACTORY_MANAGER'],
  '/dashboard/farmer':  ['ADMIN', 'FARMER'],
  '/dashboard/buyer':   ['ADMIN', 'BUYER'],
}

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl
    const token        = req.nextauth.token

    // Find the most specific route rule that matches
    const routeKey = Object.keys(ROUTE_ROLES).find((route) =>
      pathname.startsWith(route)
    )

    if (!routeKey) return NextResponse.next()

    const allowedRoles = ROUTE_ROLES[routeKey]
    const userRole     = token?.role as UserRole | undefined

    // Authenticated but wrong role — redirect to their own dashboard
    if (userRole && !allowedRoles.includes(userRole)) {
      const redirectMap: Record<UserRole, string> = {
        ADMIN:           '/dashboard/admin',
        FACTORY_MANAGER: '/dashboard/factory',
        FARMER:          '/dashboard/farmer',
        BUYER:           '/marketplace',
      }
      return NextResponse.redirect(
        new URL(redirectMap[userRole] ?? '/', req.url)
      )
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      // Only run middleware if user is authenticated;
      // unauthenticated → withAuth automatically redirects to signIn page
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/marketplace/purchase/:path*',
  ],
}
