import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;
  const origin = req.nextUrl.origin;

  if (!token && (url.startsWith("/admin") || url.startsWith("/jobs"))) {
    return NextResponse.redirect(new URL("/login", origin));
  }
  // ---- Jika sudah login ----
  if (token) {
    try {
      const verified = await verifyToken(token);
      const role = verified?.payload?.role;

      // Jika user buka login tapi sudah login, arahkan ke dashboard
      if (url.startsWith("/login")) {
        if (role === "admin") {
          return NextResponse.redirect(new URL("/admin", origin));
        }
        if (role === "applicant") {
          return NextResponse.redirect(new URL("/jobs", origin));
        }
      }

      // Cek proteksi role
      if (url.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", origin));
      }

      if (url.startsWith("/jobs") && role !== "applicant") {
        return NextResponse.redirect(new URL("/unauthorized", origin));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/login", origin));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/jobs/:path*", "/login"],
};
