import { isLocale, type Locale } from "../../../../src/i18n/locales"
import { loadCommon } from "../../../../src/i18n/loadTranslations"

const STATIC_LOCALES: Locale[] = ["en", "fr", "ar"]

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

  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <main dir={dir} style={{ maxWidth: 980, margin: "0 auto", padding: "64px 20px" }}>
      <section>
        <h1>Full-Stack Web &amp; App Development</h1>
        <p style={{ marginTop: 16, lineHeight: 1.8, maxWidth: 920 }}>
          Full-Stack Web &amp; App Development is an end-to-end service for businesses that want to get a website
          built (or a web app built) that is not only visually strong, but engineered to be fast, secure,
          scalable, SEO-ready, and conversion-driven. If you’re searching “need a website for my business,”
          “company to build my website,” or “hire website developers,” this is the complete solution: strategy,
          architecture, website design and development, backend logic, integrations, testing, and launch—
          delivered by a web development agency / website development company focused on online business growth.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What this service includes</h2>

        <h3 style={{ marginTop: 18 }}>1) Discovery + strategy (business-first, conversion-first)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Clear goals for lead generation, bookings, sales funnels, onboarding, or e-commerce flows</li>
          <li>Audience + intent mapping (what buyers search and what converts)</li>
          <li>Page and feature planning: marketing pages, landing pages, dashboards, portals, workflows</li>
          <li>Information architecture that supports SEO website structure and a sales-ready narrative</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>2) Front-end development (what users see)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Modern stacks (React, Next.js, Tailwind)</li>
          <li>Responsive, accessible UI across devices</li>
          <li>Conversion patterns: CTAs, trust sections, clear navigation</li>
          <li>SEO-safe interactivity (indexable structure, no hidden content tricks)</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>3) Back-end development (logic + data layer)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>APIs and database design for users, products, bookings, content, forms</li>
          <li>Secure authentication + role-based access for dashboards</li>
          <li>Integrations: CRM, email, payments, analytics, calendars, automation tools</li>
          <li>Architecture choices: API-driven, serverless, or classic backend services</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>4) Full-stack delivery (complete system + operations)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Admin tools to manage content safely</li>
          <li>Forms that work: validation, spam protection, deliverability, consent-aware tracking</li>
          <li>Performance strategy: caching, optimization, stable deployments</li>
          <li>Maintainable codebase: clean structure and handover readiness</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>5) SEO foundation built into development</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Clean URLs, metadata patterns, schema support, internal linking structure</li>
          <li>SSR/SSG foundations for SEO-first web development and long-term growth</li>
          <li>Compatible with technical SEO audits and ongoing SEO expansion</li>
          <li>Compatible with AI search optimization without risky per-user “dynamic SEO text”</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>6) Security + reliability</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>HTTPS-ready, secure headers, input validation, safe storage</li>
          <li>Monitoring hooks, predictable release workflows</li>
          <li>Launch readiness and post-launch stabilization</li>
        </ul>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>Outcomes</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>A fast, stable, secure, scalable website or web app</li>
          <li>Conversion-driven UX designed for leads, bookings, or sales</li>
          <li>SEO-ready structure with schema support and content expansion readiness</li>
          <li>A platform prepared for safe modern features like AI chatbots and lead qualification</li>
        </ul>
      </section>
    </main>
  )
}
