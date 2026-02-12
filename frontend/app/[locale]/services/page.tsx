import Link from "next/link"
import { isLocale, type Locale as RouteLocale } from "../../../src/i18n/locales"
import { loadCommon, t as tt2 } from "../../../src/i18n/loadTranslations"

const STATIC_LOCALES: RouteLocale[] = ["en", "fr", "lb"]

export async function generateStaticParams(): Promise<Array<{ locale: RouteLocale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

type ServiceCard = {
  slug: string
  icon: string
  titleKey: string
  subtitleKey: string
  descKey: string
  pills: string[]
  eyebrowKey: string
}

function pathForLocale(locale: RouteLocale): string {
  if (locale === "en") return "/en"
  if (locale === "fr") return "/fr"
  return "/lb"
}


function titleFromSlug(slug: string) {
  const words = slug.split("-").filter(Boolean)

  return words
    .map((w) => {
      const lower = w.toLowerCase()
      if (lower === "ai") return "AI"
      if (lower === "seo") return "SEO"
      if (lower === "geo") return "GEO"
      if (lower === "llm") return "LLM"
      if (lower === "ux") return "UX"
      if (lower === "ui") return "UI"
      if (lower === "aeo") return "AEO"
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(" ")
}



export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale: RouteLocale = isLocale(raw) ? raw : "en"

  const dict = await loadCommon(locale)
 const t = (key: string) => {
  const v = tt2(dict, key)
  if (v && v.trim().length > 0) return v

  // fallback: remove last segment (.title / .eyebrow / .subtitle / .pills.0)
  const parts = key.split(".")
  const base = parts.slice(0, -1).pop() || key

  return base
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
}


  const base = pathForLocale(locale)

  const cards: ServiceCard[] = [
    {
      slug: "ai-integrations-automation",
      icon: "flow",
      eyebrowKey: "services.cards.aiIntegrations.eyebrow",
      titleKey: "services.cards.aiIntegrations.title",
      subtitleKey: "services.cards.aiIntegrations.subtitle",
      descKey: "services.cards.aiIntegrations.desc",
      pills: [
        "services.cards.aiIntegrations.pills.0",
        "services.cards.aiIntegrations.pills.1",
        "services.cards.aiIntegrations.pills.2",
        "services.cards.aiIntegrations.pills.3",
      ],
    },
    {
      slug: "ai-website-development",
      icon: "spark",
      eyebrowKey: "services.cards.aiWebDev.eyebrow",
      titleKey: "services.cards.aiWebDev.title",
      subtitleKey: "services.cards.aiWebDev.subtitle",
      descKey: "services.cards.aiWebDev.desc",
      pills: [
        "services.cards.aiWebDev.pills.0",
        "services.cards.aiWebDev.pills.1",
        "services.cards.aiWebDev.pills.2",
        "services.cards.aiWebDev.pills.3",
      ],
    },
    {
      slug: "answer-engine-optimization",
      icon: "chart",
      eyebrowKey: "services.cards.aeo.eyebrow",
      titleKey: "services.cards.aeo.title",
      subtitleKey: "services.cards.aeo.subtitle",
      descKey: "services.cards.aeo.desc",
      pills: [
        "services.cards.aeo.pills.0",
        "services.cards.aeo.pills.1",
        "services.cards.aeo.pills.2",
        "services.cards.aeo.pills.3",
      ],
    },
    {
      slug: "content-professional-writing",
      icon: "db",
      eyebrowKey: "services.cards.content.eyebrow",
      titleKey: "services.cards.content.title",
      subtitleKey: "services.cards.content.subtitle",
      descKey: "services.cards.content.desc",
      pills: [
        "services.cards.content.pills.0",
        "services.cards.content.pills.1",
        "services.cards.content.pills.2",
        "services.cards.content.pills.3",
      ],
    },
    {
      slug: "ecommerce-solutions",
      icon: "db",
      eyebrowKey: "services.cards.ecommerce.eyebrow",
      titleKey: "services.cards.ecommerce.title",
      subtitleKey: "services.cards.ecommerce.subtitle",
      descKey: "services.cards.ecommerce.desc",
      pills: [
        "services.cards.ecommerce.pills.0",
        "services.cards.ecommerce.pills.1",
        "services.cards.ecommerce.pills.2",
        "services.cards.ecommerce.pills.3",
      ],
    },
    {
      slug: "full-stack-web-app-development",
      icon: "db",
      eyebrowKey: "services.cards.fullStack.eyebrow",
      titleKey: "services.cards.fullStack.title",
      subtitleKey: "services.cards.fullStack.subtitle",
      descKey: "services.cards.fullStack.desc",
      pills: [
        "services.cards.fullStack.pills.0",
        "services.cards.fullStack.pills.1",
        "services.cards.fullStack.pills.2",
        "services.cards.fullStack.pills.3",
      ],
    },
    {
      slug: "geo-llm-search-optimization",
      icon: "spark",
      eyebrowKey: "services.cards.geo.eyebrow",
      titleKey: "services.cards.geo.title",
      subtitleKey: "services.cards.geo.subtitle",
      descKey: "services.cards.geo.desc",
      pills: [
        "services.cards.geo.pills.0",
        "services.cards.geo.pills.1",
        "services.cards.geo.pills.2",
        "services.cards.geo.pills.3",
      ],
    },
    {
      slug: "seo",
      icon: "chart",
      eyebrowKey: "services.cards.seo.eyebrow",
      titleKey: "services.cards.seo.title",
      subtitleKey: "services.cards.seo.subtitle",
      descKey: "services.cards.seo.desc",
      pills: [
        "services.cards.seo.pills.0",
        "services.cards.seo.pills.1",
        "services.cards.seo.pills.2",
        "services.cards.seo.pills.3",
      ],
    },
    {
      slug: "ux-ui-design-user-experience",
      icon: "chart",
      eyebrowKey: "services.cards.ux.eyebrow",
      titleKey: "services.cards.ux.title",
      subtitleKey: "services.cards.ux.subtitle",
      descKey: "services.cards.ux.desc",
      pills: [
        "services.cards.ux.pills.0",
        "services.cards.ux.pills.1",
        "services.cards.ux.pills.2",
        "services.cards.ux.pills.3",
      ],
    },
    {
      slug: "website-optimization-performance-engineering",
      icon: "shield",
      eyebrowKey: "services.cards.performance.eyebrow",
      titleKey: "services.cards.performance.title",
      subtitleKey: "services.cards.performance.subtitle",
      descKey: "services.cards.performance.desc",
      pills: [
        "services.cards.performance.pills.0",
        "services.cards.performance.pills.1",
        "services.cards.performance.pills.2",
        "services.cards.performance.pills.3",
      ],
    },
  ]

  return (
    <main className="services-ios-shell" dir={locale === "lb" ? "rtl" : "ltr"}>
      <div className="services-ios-bg" aria-hidden="true" />
      <div className="services-ios-noise" aria-hidden="true" />

      <section className="services-ios-container">
        <div className="services-ios-hero glass-panel">
          <div className="services-ios-heroTop">
            <span className="services-ios-eyebrow">{t("services.hero.eyebrow")}</span>
          </div>

          <h1 className="services-ios-title">{t("services.hero.h1")}</h1>

          <p className="services-ios-sub">{t("services.hero.sub")}</p>

          <div className="services-ios-ctaRow">
            <Link className="glass-button primary" href={`${base}/services/ai-integrations-automation`}>
              {t("services.hero.ctaPrimary")}
            </Link>
            <Link className="glass-button" href={`${base}/`}>
              {t("services.hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="services-ios-grid">
          {cards.map((c) => (
            <Link key={c.slug} href={`${base}/services/${c.slug}`} className="glass-card">
              <div className="glass-cardTop">
                <div className="glass-cardIcon" aria-hidden="true">
                  <span className={`icon-${c.icon}`} />
                </div>
              </div>

              <div className="glass-cardBody">
                <div className="glass-cardEyebrow">{t(c.eyebrowKey)}</div>

                <h2 className="glass-cardTitle">{t(c.titleKey)}</h2>

                <div className="glass-cardSubtitle">{t(c.subtitleKey)}</div>

                <p className="glass-cardDesc">{t(c.descKey)}</p>

                <div className="glass-pillRow" aria-hidden="true">
                  {c.pills.map((p) => (
                    <span key={p} className="glass-pill">
                      {t(p)}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
