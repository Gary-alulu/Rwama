import { UserRole } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// ─── Route → required roles map ──────────────────────────────────
const ROUTE_ROLES: Record<string, UserRole[]> = {
  "/dashboard/admin": ["ADMIN", "SUPER_ADMIN"],
  "/dashboard/factory": [
    "ADMIN",
    "SUPER_ADMIN",
    "FACTORY_MANAGER",
    "FACTORY_STAFF",
  ],
  "/dashboard/farmer": ["ADMIN", "SUPER_ADMIN", "FARMER"],
  "/dashboard/buyer": ["ADMIN", "SUPER_ADMIN", "BUYER"],
  "/dashboard/plot-seller": ["ADMIN", "SUPER_ADMIN", "PLOT_SELLER"],
  "/dashboard/cooperative-staff": ["ADMIN", "SUPER_ADMIN", "COOPERATIVE_STAFF"],
};

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Find the most specific route rule that matches
    const routeKey = Object.keys(ROUTE_ROLES).find((route) =>
      pathname.startsWith(route),
    );

    if (!routeKey) return NextResponse.next();

    const allowedRoles = ROUTE_ROLES[routeKey];
    const userRole = token?.role as UserRole | undefined;

    // Authenticated but wrong role — redirect to their own dashboard
    if (userRole && !allowedRoles.includes(userRole)) {
      const redirectMap: Record<UserRole, string> = {
        ADMIN: "/dashboard/admin",
        SUPER_ADMIN: "/dashboard/admin",
        FACTORY_MANAGER: "/dashboard/factory",
        FACTORY_STAFF: "/dashboard/factory",
        FARMER: "/dashboard/farmer",
        BUYER: "/marketplace",
        PLOT_SELLER: "/dashboard/plot-seller",
        COOPERATIVE_STAFF: "/dashboard/cooperative-staff",
      };
      return NextResponse.redirect(
        new URL(redirectMap[userRole] ?? "/", req.url),
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run middleware if user is authenticated;
      // unauthenticated → withAuth automatically redirects to signIn page
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/marketplace/purchase/:path*"],
};
