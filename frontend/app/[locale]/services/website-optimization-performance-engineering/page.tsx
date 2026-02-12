import { isLocale, type Locale } from "../../../../src/i18n/locales"
import { loadCommon } from "../../../../src/i18n/loadTranslations"

const STATIC_LOCALES: Locale[] = ["en", "fr", "lb"]

export async function generateStaticParams(): Promise<Array<{ locale: Locale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale

  await loadCommon(locale)

  const dir = locale === "lb" ? "rtl" : "ltr"

  return (
    <main dir={dir} style={{ maxWidth: 980, margin: "0 auto", padding: "64px 20px" }}>
      <section>
        <h1>Website Optimization &amp; Performance Engineering</h1>
        <p style={{ marginTop: 16, lineHeight: 1.8, maxWidth: 920 }}>
          Website Optimization &amp; Performance Engineering is for businesses that already have a website but are
          losing revenue because it’s slow, not converting, or invisible in search. If you’re dealing with
          “slow website issues,” “poor website performance,” “website SEO problems,” or “website traffic but no sales,”
          this service turns an underperforming site into a fast-loading website with Core Web Vitals optimization,
          stronger technical SEO, and smoother conversion flows.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What this service includes</h2>

        <h3 style={{ marginTop: 18 }}>1) Performance audit &amp; diagnosis</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Rendering/loading analysis and bottleneck detection</li>
          <li>Core Web Vitals review (LCP, CLS, INP) with real-user checks</li>
          <li>Technical SEO health check: crawlability, indexability, audit findings</li>
          <li>Conversion analysis: where users drop and why they don’t convert</li>
          <li>Infrastructure review: hosting, caching, CDN, third-party scripts</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>2) Speed &amp; loading optimization</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Image/font/script optimization and asset strategy</li>
          <li>Code splitting, safe lazy loading, caching strategies</li>
          <li>Server-side / edge optimization where needed</li>
          <li>Removal of render-blocking resources</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>3) SEO-safe performance engineering</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Fix layout shifts and interaction delays</li>
          <li>Performance-first architecture aligned with SEO-first development</li>
          <li>SEO-safe rendering (no delayed/hiding of core content)</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>4) Conversion Rate Optimization (CRO)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Funnel analysis for landing pages and sales journeys</li>
          <li>UX friction removal: forms, CTAs, navigation, trust signals</li>
          <li>A/B testing plan for layout, CTAs, structure, messaging</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>5) SEO + performance alignment</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Technical SEO fixes that improve speed and rankings</li>
          <li>Internal linking optimization and crawl efficiency</li>
          <li>Compatibility with entity-based SEO and AI search optimization</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>6) UX &amp; interaction performance</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Mobile UX optimization (where most conversion loss happens)</li>
          <li>Remove heavy animations that hurt performance</li>
          <li>Keep interactivity smooth without sacrificing speed</li>
        </ul>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>Outcomes</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Faster loading and stronger Core Web Vitals</li>
          <li>Improved rankings through SEO-friendly performance</li>
          <li>Higher conversion rates and lower bounce rate</li>
          <li>A foundation ready for SEO and safe AI-powered UX</li>
        </ul>
      </section>
    </main>
  )
}
