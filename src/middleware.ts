import { NextResponse, type NextRequest } from "next/server";

// Phase 2: once Supabase Auth + role-based dashboards are added, check the
// session/role here and redirect unauthenticated or unauthorized requests
// away from /dashboard, /admin, /operations, /accountant, /warehouse,
// /driver, and /customer routes.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/operations/:path*", "/accountant/:path*", "/warehouse/:path*", "/driver/:path*", "/customer/:path*"],
};
