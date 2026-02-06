import Link from "next/link"
import { isLocale, type Locale } from "../../src/i18n/locales"
import { loadCommon, t as tt } from "../../src/i18n/loadTranslations"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale

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
      <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>ACHI Digital</div>

        <nav style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href={`/${locale}/services`}>{navServices}</Link>
          <Link href={`/${locale}/about`}>{navAbout}</Link>
          <Link href={`/${locale}/blog`}>{navBlog}</Link>
          <Link href={`/${locale}/careers`}>{navCareers}</Link>
          <Link href={`/${locale}/contact`}>{navContact}</Link>
        </nav>
      </header>

      <section style={{ marginTop: 64 }}>
        <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: 0 }}>{h1}</h1>
        <p style={{ marginTop: 18, fontSize: 18, maxWidth: 760 }}>{subtitle}</p>

        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href={`/${locale}/contact`}
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
            href={`/${locale}/services`}
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
