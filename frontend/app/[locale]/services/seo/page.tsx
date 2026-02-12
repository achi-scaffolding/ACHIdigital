import { isLocale, type Locale } from "../../../../src/i18n/locales"
import { loadCommon } from "../../../../src/i18n/loadTranslations"

const STATIC_LOCALES: Locale[] = ["en", "fr", "lb"]

export async function generateStaticParams(): Promise<Array<{ locale: Locale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

export default async function SeoServicePage({
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
        <h1>Search Engine Optimization Built for Long-Term Rankings and Growth</h1>

        <p style={{ marginTop: 14, fontSize: 18, maxWidth: 880 }}>
          SEO Is Still the Foundation of Online Visibility
        </p>

        <p style={{ marginTop: 10, fontSize: 18, maxWidth: 880 }}>
          Search Engine Optimization That Drives Rankings, Traffic, and Qualified Leads
        </p>

        <p style={{ marginTop: 16, lineHeight: 1.8, maxWidth: 920 }}>
          Search engines remain the primary source of high-intent traffic. In 2026, SEO is no longer about
          tricks or shortcuts — it is about technical excellence, authoritative content, and
          performance-driven user experience. We deliver professional SEO services that improve search
          visibility, build long-term authority, and generate qualified traffic that converts — while creating
          a strong foundation for AI search, GEO, and answer engines.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>The Problem</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Many businesses invest in SEO but see little return because their strategy is fragmented or outdated.
          Common issues include:
        </p>

        <ul style={{ marginTop: 14, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Rankings that fluctuate without clear reasons</li>
          <li>Traffic that does not convert into leads or sales</li>
          <li>Slow websites with poor Core Web Vitals</li>
          <li>Content created without search intent or structure</li>
          <li>SEO treated as an add-on instead of a foundation</li>
        </ul>

        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Without a solid SEO strategy, growth becomes unpredictable and expensive.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Our SEO Approach</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          We treat SEO as a core business system, not a checklist. Our SEO strategy is built on three pillars:
        </p>

        <ul style={{ marginTop: 14, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Technical foundation</li>
          <li>Search intent and content relevance</li>
          <li>Authority and trust signals</li>
        </ul>

        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          This ensures your website ranks consistently for valuable keywords, attracts users with real buying
          intent, and scales without breaking performance or structure.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What Is SEO in 2026</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Search Engine Optimization is the process of making your website easy to crawl, easy to understand,
          and valuable to both users and search engines. Modern SEO focuses on technical quality and
          performance, content aligned with user intent, clear site structure and internal linking, and trust,
          authority, and experience signals.
        </p>

        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Strong SEO not only improves Google rankings — it also feeds AI search engines with reliable,
          structured information.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Why Our SEO Services Are Different</h2>

        <h3 style={{ marginTop: 18 }}>Technical SEO as the Base Layer</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          We start with site speed, Core Web Vitals, crawlability, indexing, and clean architecture. Without
          this, SEO does not scale.
        </p>

        <h3 style={{ marginTop: 18 }}>Intent-Driven Content Strategy</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          We optimize pages based on how real users search, compare, and decide — not just keywords.
        </p>

        <h3 style={{ marginTop: 18 }}>Performance and UX Matter</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          Search engines reward fast, usable, mobile-first websites. We optimize SEO together with
          performance and usability.
        </p>

        <h3 style={{ marginTop: 18 }}>SEO That Supports AI Search</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          Clear structure, schema planning, and authoritative content help AI engines understand and trust
          your brand.
        </p>

        <h3 style={{ marginTop: 18 }}>Long-Term, Ethical SEO</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          No shortcuts, no spam, no risky tactics. Everything is built to last.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Core SEO Services Included</h2>

        <h3 style={{ marginTop: 18 }}>Technical SEO</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Core Web Vitals optimization</li>
          <li>Site speed and performance audits</li>
          <li>Crawlability and indexation fixes</li>
          <li>Mobile-first optimization</li>
          <li>Schema and structured data planning</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>On-Page SEO</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Keyword and search intent research</li>
          <li>Page-level optimization</li>
          <li>Content structure and internal linking</li>
          <li>Title, meta, and heading optimization</li>
          <li>E-E-A-T signal reinforcement</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>Off-Page SEO and Authority</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Backlink strategy and analysis</li>
          <li>Digital PR and brand mentions</li>
          <li>Review and trust signal optimization</li>
          <li>Competitor benchmarking</li>
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Our SEO Process</h2>
        <ol style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>SEO audit and baseline analysis</li>
          <li>Keyword, intent, and opportunity mapping</li>
          <li>Technical fixes and performance optimization</li>
          <li>On-page and content optimization</li>
          <li>Authority building and trust signals</li>
          <li>Monitoring, reporting, and continuous improvement</li>
        </ol>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Results You Can Expect</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Improved rankings for high-value keywords</li>
          <li>More qualified organic traffic</li>
          <li>Better conversion rates from search users</li>
          <li>Stronger technical foundation for future growth</li>
          <li>SEO that supports AI visibility and paid campaigns</li>
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>How SEO Connects to Other Services</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          SEO is the foundation for GEO and LLM Search Optimization, Answer Engine Optimization (AEO), paid
          advertising performance, and AI Website Development scalability. A strong SEO base makes every other
          channel more efficient.
        </p>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>Ready to Build Sustainable Search Visibility</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Stop chasing rankings that disappear. Build a search strategy designed for long-term growth and
          measurable ROI. Request a free SEO audit to identify opportunities, technical issues, and a clear
          roadmap forward.
        </p>
      </section>
    </main>
  )
}
