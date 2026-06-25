import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  if (isDashboardRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Already logged in? Skip the login/register screens.
  if (isAuthRoute && user && !request.nextUrl.pathname.startsWith("/auth/reset-password")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
