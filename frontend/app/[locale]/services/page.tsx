import Link from "next/link"
import { isLocale, type Locale } from "../../../src/i18n/locales"
import { loadCommon, t as tt } from "../../../src/i18n/loadTranslations"

const STATIC_LOCALES: Locale[] = ["en", "fr", "lb"]

export async function generateStaticParams(): Promise<Array<{ locale: Locale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

type ServiceCard = {
  slug: string
  icon: string
  titleKey: string
  descKey: string
  pills: string[]
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale

  await loadCommon(locale)
  const t = (key: string) => tt(locale, key)

  const cards: ServiceCard[] = [
    {
      slug: "ai-integrations-automation",
      icon: "flow",
      titleKey: "services.cards.aiIntegrations.title",
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
      titleKey: "services.cards.aiWebDev.title",
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
      titleKey: "services.cards.aeo.title",
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
      titleKey: "services.cards.content.title",
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
      titleKey: "services.cards.ecommerce.title",
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
      titleKey: "services.cards.fullStack.title",
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
      titleKey: "services.cards.geo.title",
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
      titleKey: "services.cards.seo.title",
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
      titleKey: "services.cards.ux.title",
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
      titleKey: "services.cards.performance.title",
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
            <Link className="glass-button primary" href={`/${locale}/contact`}>
              {t("services.hero.ctaPrimary")}
            </Link>
            <Link className="glass-button" href={`/${locale}/about`}>
              {t("services.hero.ctaSecondary")}
            </Link>
          </div>
        </div>

<div className="services-ios-grid">
  {cards.map((c) => (
    <Link key={c.slug} href={`/${locale}/services/${c.slug}`} className="glass-card">
      <div className="glass-cardTop">
        <div className="glass-cardIcon" aria-hidden="true">
          <span className={`icon-${c.icon}`} />
        </div>
      </div>

      <div className="glass-cardBody">
        <h2 className="glass-cardTitle">{t(c.titleKey)}</h2>
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
