import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!session;
  const role = session?.user?.role;

  // Login: redirigir a panel si ya está autenticado
  if (pathname === "/login") {
    if (isLoggedIn) {
      if (role === "ADMIN") return NextResponse.redirect(new URL("/dashboard", nextUrl));
      if (role === "SUBADMIN") return NextResponse.redirect(new URL("/subadmin", nextUrl));
      if (role === "TEAM") return NextResponse.redirect(new URL("/team", nextUrl));
    }
    return NextResponse.next();
  }

  // Dashboard: solo ADMIN
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    if (role !== "ADMIN") return NextResponse.redirect(new URL("/login", nextUrl));
    return NextResponse.next();
  }

  // Subadmin: solo SUBADMIN
  if (pathname.startsWith("/subadmin")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    if (role !== "SUBADMIN") return NextResponse.redirect(new URL("/login", nextUrl));
    return NextResponse.next();
  }

  // Team: solo TEAM
  if (pathname.startsWith("/team")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    if (role !== "TEAM") return NextResponse.redirect(new URL("/login", nextUrl));
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/subadmin/:path*", "/team/:path*"],
};
