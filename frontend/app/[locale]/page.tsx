import Link from "next/link"
import { isLocale, type Locale } from "../../src/i18n/locales"
import { loadCommon, t as tt } from "../../src/i18n/loadTranslations"

function withBase(path: string) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")
  if (!base) return path
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`
}

export default async function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale

  const dict = await loadCommon(locale)

  const h1 = tt(dict, "home.hero.h1")
  const subtitle = tt(dict, "home.hero.subtitle")
  const ctaPrimary = tt(dict, "home.hero.ctaPrimary")
  const ctaSecondary = tt(dict, "home.hero.ctaSecondary")

  const navServices = tt(dict, "nav.services")
  const navAbout = tt(dict, "nav.about")
  const navBlog = tt(dict, "nav.blog")
  const navCareers = tt(dict, "nav.careers")
  const navContact = tt(dict, "nav.contact")

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

        <nav style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href={withBase(`/${locale}/services/`)}>{navServices}</Link>
          <Link href={withBase(`/${locale}/about/`)}>{navAbout}</Link>
          <Link href={withBase(`/${locale}/blog/`)}>{navBlog}</Link>
          <Link href={withBase(`/${locale}/careers/`)}>{navCareers}</Link>
          <Link href={withBase(`/${locale}/contact/`)}>{navContact}</Link>
        </nav>
      </header>

      <section style={{ marginTop: 64 }}>
        <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: 0 }}>{h1}</h1>
        <p style={{ marginTop: 18, fontSize: 18, maxWidth: 760 }}>{subtitle}</p>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Link
            href={withBase(`/${locale}/contact/`)}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #111",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {ctaPrimary}
          </Link>

          <Link
            href={withBase(`/${locale}/services/`)}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #ccc",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {ctaSecondary}
          </Link>
        </div>
      </section>
    </main>
  )
}
