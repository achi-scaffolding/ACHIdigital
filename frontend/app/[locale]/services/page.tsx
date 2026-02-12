import Link from "next/link"
import { isLocale, type Locale as RouteLocale } from "../../../src/i18n/locales"
import { loadCommon, t as tt2 } from "../../../src/i18n/loadTranslations"

import {
  Workflow,
  Code2,
  Search,
  PenTool,
  ShoppingCart,
  Layers3,
  Globe,
  LineChart,
  Palette,
  Zap,
} from "lucide-react"

const ICONS = {
  workflow: Workflow,
  code: Code2,
  search: Search,
  pen: PenTool,
  shopping: ShoppingCart,
  layers: Layers3,
  globe: Globe,
  linechart: LineChart,
  palette: Palette,
  zap: Zap,
} as const

const STATIC_LOCALES: RouteLocale[] = ["en", "fr", "lb"]

export async function generateStaticParams(): Promise<Array<{ locale: RouteLocale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}


type ServiceCard = {
  slug: string
  icon: string
}

function pathForLocale(locale: RouteLocale): string {
  if (locale === "fr") return "/fr"
  if (locale === "lb") return "/lb"

  return "/en"
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

type IconKey =
  | "workflow"
  | "code"
  | "search"
  | "pen"
  | "shopping"
  | "layers"
  | "globe"
  | "linechart"
  | "palette"
  | "zap"

type ServiceCard = { slug: string; icon: IconKey }


const cards: ServiceCard[] = [
  { slug: "ai-integrations-automation", icon: "workflow" },
  { slug: "ai-website-development", icon: "code" },
  { slug: "answer-engine-optimization", icon: "search" },
  { slug: "content-professional-writing", icon: "pen" },
  { slug: "ecommerce-solutions", icon: "shopping" },
  { slug: "full-stack-web-app-development", icon: "layers" },
  { slug: "geo-llm-search-optimization", icon: "globe" },
  { slug: "seo", icon: "linechart" },
  { slug: "ux-ui-design-user-experience", icon: "palette" },
  { slug: "website-optimization-performance-engineering", icon: "zap" },
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
  {(() => {
    const Icon = ICONS[c.icon]
    return <Icon className="serviceIcon" aria-hidden="true" />
  })()}
</div>

              </div>

<div className="glass-cardBody">
  <h2 className="glass-cardTitle">
    {t(`services.${c.slug}.title`)}
  </h2>

  {t(`services.${c.slug}.description`) !== t(`services.${c.slug}.title`) && (
    <p className="glass-cardDesc">
      {t(`services.${c.slug}.description`)}
    </p>
  )}
</div>



            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
