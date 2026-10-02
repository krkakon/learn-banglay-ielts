import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

const protectedStudentRoutes = ["/dashboard", "/listening", "/reading", "/writing", "/speaking", "/lesson", "/pdfs", "/profile", "/change-password"];
const protectedAdminRoutes = ["/admin"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isStudentRoute = protectedStudentRoutes.some((route) => path.startsWith(route));
  const isAdminRoute = protectedAdminRoutes.some((route) => path.startsWith(route));

  if (isStudentRoute || isAdminRoute) {
    const sessionCookie = req.cookies.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session) {
      return NextResponse.redirect(new URL("/login?error=Please log in to access your IELTS course.", req.url));
    }

    if (session.status !== "active") {
      return NextResponse.redirect(new URL("/login?error=Your account is currently inactive. Please contact the administrator.", req.url));
    }

    if (isAdminRoute && session.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard?error=Access denied.", req.url));
    }

    if (isStudentRoute && session.role !== "admin" && session.enrollment_status !== "approved") {
        if (path === "/profile" || path === "/change-password") {
            // allow access to profile and change password
        } else {
            return NextResponse.redirect(new URL("/profile?error=Your course access has not been activated yet.", req.url));
        }
    }
  }

  // Prevent logged-in users from accessing login/register pages
  if (path === "/login" || path === "/register") {
    const sessionCookie = req.cookies.get("session")?.value;
    const session = await decrypt(sessionCookie);
    if (session) {
        if (session.role === "admin") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
