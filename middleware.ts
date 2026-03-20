import { NextResponse } from "next/server";

/** Permite que el layout lea `Sec-CH-Prefers-Color-Scheme` en peticiones posteriores. */
export function middleware() {
  const res = NextResponse.next();
  res.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
