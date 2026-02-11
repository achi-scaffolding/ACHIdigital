import "../globals.css"

import type { Metadata } from "next"
import type { ReactNode } from "react"

import SiteHeader from "../../src/components/header/SiteHeader"
import { loadAria, loadCommon, loadSeo, t as tt } from "../../src/i18n/loadTranslations"
import { dirForLocale, isLocale, type Locale } from "../../src/i18n/locales"

function contentLocaleFor(locale: Locale): "en" | "fr" | "ar" {
  if (locale === "lb") return "ar"
  return locale
}

function canonicalFor(locale: Locale): string {
  if (locale === "en") return "/"
  if (locale === "fr") return "/fr/"
  return "/lb/"
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale

  const contentLocale = contentLocaleFor(locale)
  const seo = await loadSeo(contentLocale)

  const title = tt(seo, "home.title")
  const description = tt(seo, "home.description")

  return {
    title,
    description,
    alternates: {
      canonical: canonicalFor(locale),
      languages: {
        en: "/",
        fr: "/fr/",
        "ar-LB": "/lb/",
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
  const contentLocale = contentLocaleFor(locale)

  const common = await loadCommon(contentLocale)
  const aria = await loadAria(contentLocale)

  const headerText = {
    brand: {
      name: tt(common, "header.brand"),
      logoAlt: tt(aria, "header.brandHome"),
    },
    nav: {
      home: tt(common, "header.nav.home"),
      about: tt(common, "header.nav.about"),
      services: tt(common, "header.nav.services"),
      blog: tt(common, "header.nav.blog"),
      contact: tt(common, "header.nav.contact"),
    },
    servicesDropdown: {
      viewAll: tt(common, "header.servicesDropdown.viewAll"),
      items: {
        aiWebsiteDevelopment: tt(common, "header.servicesDropdown.items.aiWebsiteDevelopment"),
        seoAiVisibility: tt(common, "header.servicesDropdown.items.seoAiVisibility"),
        uxuiDesign: tt(common, "header.servicesDropdown.items.uxuiDesign"),
        performanceOptimization: tt(common, "header.servicesDropdown.items.performanceOptimization"),
      },
    },
    cta: tt(common, "header.cta"),
    lang: {
      en: tt(common, "header.lang.en"),
      fr: tt(common, "header.lang.fr"),
      ar: tt(common, "header.lang.ar"),
    },
  }

  const headerAria = {
    mainNav: tt(aria, "header.mainNav"),
    openMenu: tt(aria, "header.openMenu"),
    closeMenu: tt(aria, "header.closeMenu"),
    openServices: tt(aria, "header.openServices"),
    closeServices: tt(aria, "header.closeServices"),
    languageSwitcher: tt(aria, "header.languageSwitcher"),
    brandHome: tt(aria, "header.brandHome"),
  }

  return (
    <div dir={dir} data-locale={locale} className="min-h-screen bg-white">
      <SiteHeader locale={locale} text={headerText} aria={headerAria} />

      <main id="main" className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  )
}
