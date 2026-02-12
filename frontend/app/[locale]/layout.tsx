import type { Metadata } from "next"
import type { ReactNode } from "react"
import { isLocale, dirForLocale, type Locale } from "../../src/i18n/locales"
import { loadSeo, t as tt } from "../../src/i18n/loadTranslations"
import "../globals.css"

const STATIC_LOCALES: Locale[] = ["en", "fr", "lb"]

export const dynamicParams = false

export async function generateStaticParams(): Promise<Array<{ locale: Locale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale

  const seo = await loadSeo(locale)
  const title = tt(seo, "home.title")
  const description = tt(seo, "home.description")

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        ar: "/lb",
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  const dir = dirForLocale(locale)

  return (
    <html lang={locale} dir={dir}>
      <body>
        <div className="services-tunnel-bg" aria-hidden="true" />
        <div className="services-tunnel-sweep" aria-hidden="true" />
        <div className="services-tunnel-vignette2" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
