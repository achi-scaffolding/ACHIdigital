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
        <h1>Content &amp; Professional Writing</h1>
        <p style={{ marginTop: 16, lineHeight: 1.8, maxWidth: 920 }}>
          Content &amp; Professional Writing gives your website its voice, clarity, and authority—turning a well-built
          site into a persuasive business asset that ranks, builds trust, and converts. We write content that supports
          SEO-friendly structure, conversion-focused UX, and authority building with clear value proposition,
          scannable sections, and strong CTAs.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What this service includes</h2>

        <h3 style={{ marginTop: 18 }}>1) Content strategy &amp; messaging foundation</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>SEO content strategy aligned with buyer intent and business goals</li>
          <li>Funnel mapping: awareness → trust → conversion</li>
          <li>Positioning that supports trust and differentiation</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>2) Website copywriting (core pages that sell)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Homepage messaging and value proposition</li>
          <li>Service pages and offer positioning</li>
          <li>About page storytelling (credibility and proof)</li>
          <li>CTA writing + microcopy (forms, buttons, errors, guidance)</li>
          <li>Structured headings for scannability and SEO</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>3) Landing pages &amp; funnels</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Landing page copy for offers and campaigns</li>
          <li>Messaging for lead generation and sales funnels</li>
          <li>A/B-test-ready copy variants used safely</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>4) SEO writing (classic + modern)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Keyword-integrated copy aligned with intent</li>
          <li>Entity-based writing foundations</li>
          <li>Writing compatible with AI search optimization without stuffing</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>5) Authority &amp; thought leadership</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Blog and pillar-content planning for topical authority</li>
          <li>Technical writing that explains complex services simply</li>
          <li>Thought leadership that increases decision confidence</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>6) Multilingual &amp; localization-ready content</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Content structure designed to scale across languages</li>
          <li>Localization (not blind translation) for Arabic, English, and French audiences</li>
          <li>Content designed for international SEO and global-ready UX</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>7) AI-assisted, human-approved writing</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>AI used for research and analysis; humans finalize and approve</li>
          <li>No live AI-generated SEO paragraphs on the site</li>
          <li>SEO-safe approach that keeps trust and credibility high</li>
        </ul>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>Outcomes</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Clear messaging that communicates value fast</li>
          <li>Higher conversion rate and stronger lead quality</li>
          <li>Better rankings through structured, intent-based content</li>
          <li>A scalable content system for future growth</li>
        </ul>
      </section>
    </main>
  )
}
