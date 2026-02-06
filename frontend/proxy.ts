import { NextRequest, NextResponse } from "next/server"

const SUPPORTED = new Set(["en", "fr", "ar"])
const DEFAULT_LOCALE = "en"

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always force a stable default for the root
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, req.url))
  }

  // Allow valid locale routes
  const seg = pathname.split("/")[1]
  if (seg && SUPPORTED.has(seg)) return NextResponse.next()

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
}
