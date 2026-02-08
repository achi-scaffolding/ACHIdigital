import Link from "next/link"
import { isLocale, type Locale } from "../../../src/i18n/locales"
import { loadCommon, t as tt } from "../../../src/i18n/loadTranslations"

const STATIC_LOCALES: Locale[] = ["en", "fr", "ar"]

function withBase(path: string) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")
  if (!base) return path
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`
}

export async function generateStaticParams(): Promise<Array<{ locale: Locale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  const dict = await loadCommon(locale)

  const title = tt(dict, "services.title")
  const subtitle = tt(dict, "services.subtitle")
  const backHome = tt(dict, "services.backHome")

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700 }}>ACHI Digital</div>
        <Link href={withBase(`/${locale}/`)} style={{ textDecoration: "none" }}>
          {backHome}
        </Link>
      </header>

      <section style={{ marginTop: 48 }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.05, margin: 0 }}>{title}</h1>
        <p style={{ marginTop: 14, fontSize: 18, maxWidth: 760 }}>{subtitle}</p>
      </section>
    </main>
  )
}
