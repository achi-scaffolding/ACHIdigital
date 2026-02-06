import { NextRequest, NextResponse } from "next/server"

const SUPPORTED = new Set(["en", "fr", "ar"])
const DEFAULT_LOCALE = "en"

function pickLocale(req: NextRequest) {
  const accept = req.headers.get("accept-language") || ""
  const lower = accept.toLowerCase()
  if (lower.includes("fr")) return "fr"
  if (lower.includes("ar")) return "ar"
  return DEFAULT_LOCALE
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === "/") {
    const locale = pickLocale(req)
    return NextResponse.redirect(new URL(`/${locale}`, req.url))
  }

  const seg = pathname.split("/")[1]
  if (seg && SUPPORTED.has(seg)) return NextResponse.next()

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
}
