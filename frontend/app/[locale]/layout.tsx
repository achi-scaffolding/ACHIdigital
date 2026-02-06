import type { Metadata } from "next"
import type { ReactNode } from "react"
import { isLocale, dirForLocale, type Locale } from "../../src/i18n/locales"
import { loadSeo, t as tt } from "../../src/i18n/loadTranslations"

export const dynamicParams = false

export function generateStaticParams(): Array<{ locale: Locale }> {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }]
}

function withBase(path: string) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")
  if (!base) return path
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale

  const seo = await loadSeo(locale)
  const title = tt(seo, "home.title")
  const description = tt(seo, "home.description")

  return {
    title,
    description,
    alternates: {
      canonical: withBase(`/${locale}/`),
      languages: {
        en: withBase("/en/"),
        fr: withBase("/fr/"),
        ar: withBase("/ar/"),
      },
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale
  const dir = dirForLocale(locale)

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  )
}
