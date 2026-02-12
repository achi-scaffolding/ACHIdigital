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
        <h1>UX/UI Design &amp; User Experience</h1>
        <p style={{ marginTop: 16, lineHeight: 1.8, maxWidth: 920 }}>
          UX/UI Design &amp; User Experience transforms a website from "just existing" into a high-converting,
          user-centric experience that builds trust fast and guides visitors to take action. UX/UI is where
          design meets psychology, clarity, and revenue—supporting SEO performance, reducing bounce, and improving
          conversion.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What this service includes</h2>

        <h3 style={{ marginTop: 18 }}>1) UX strategy &amp; user research</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Intent analysis: why visitors leave without action</li>
          <li>Journey mapping for lead gen, onboarding, booking flows</li>
          <li>Personas for B2B, B2C, startups, and corporate audiences</li>
          <li>UX strategy aligned with conversion goals</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>2) Information architecture &amp; flow design</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Logical navigation and content hierarchy</li>
          <li>Funnel-based layouts for marketing and sales pages</li>
          <li>UX aligned with SEO website structure (readable, scannable, indexable)</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>3) UI design (trust-building visual layer)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Brand-aligned design systems (components, typography, layout)</li>
          <li>Consistency across pages and features</li>
          <li>Design built to scale as the product grows</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>4) Conversion-focused UX</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>CTA placement, hierarchy, trust signals, friction removal</li>
          <li>Form optimization and landing page conversion patterns</li>
          <li>UX improvements aligned with CRO services</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>5) Interaction &amp; motion design (performance-safe)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Micro-interactions and subtle animations that respect performance and accessibility</li>
          <li>SEO-safe effects (real text in DOM, no content hidden until scroll)</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>6) Mobile &amp; responsive UX</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Mobile-first layouts and touch-friendly patterns</li>
          <li>Responsive behavior across devices and screen sizes</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>7) AI-ready UX patterns (SEO-safe)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Structure ready for AI-driven UX without dynamic SEO text swaps</li>
          <li>Future-ready layout logic without harming rankings</li>
        </ul>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>Outcomes</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Higher conversion rates and better lead quality</li>
          <li>Stronger trust and credibility signals</li>
          <li>UX that supports performance, SEO, and scalability</li>
          <li>A reusable design system ready for development</li>
        </ul>
      </section>
    </main>
  )
}
