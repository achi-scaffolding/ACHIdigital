import { isLocale, type Locale } from "../../../../src/i18n/locales"
import { loadCommon } from "../../../../src/i18n/loadTranslations"

const STATIC_LOCALES: Locale[] = ["en", "fr", "lb"]

export async function generateStaticParams(): Promise<Array<{ locale: Locale }>> {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

export default async function GeoLlmSearchOptimizationPage({
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
        <h1>GEO &amp; LLM Search Optimization for AI Visibility and Brand Authority</h1>

        <p style={{ marginTop: 14, fontSize: 18, maxWidth: 880 }}>
          Search Is No Longer Just Google
        </p>

        <p style={{ marginTop: 10, fontSize: 18, maxWidth: 880 }}>
          Get Discovered, Cited, and Recommended by AI Search Engines
        </p>

        <p style={{ marginTop: 16, lineHeight: 1.8, maxWidth: 920 }}>
          In 2026, users increasingly discover businesses through AI-powered search engines such as ChatGPT,
          Google Gemini, Perplexity, and AI Overviews. These systems do not simply rank websites — they
          interpret, summarize, and recommend information. We deliver GEO and LLM Search Optimization services
          that ensure your brand is correctly understood, trusted, and cited by AI engines, while remaining
          fully aligned with traditional SEO best practices.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>The Problem</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Many businesses assume that ranking on Google automatically guarantees AI visibility. This is no
          longer true. Common issues include:
        </p>

        <ul style={{ marginTop: 14, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>AI engines misinterpreting or oversimplifying brand information</li>
          <li>Competitors being cited instead of you, even when you rank well</li>
          <li>Inconsistent brand descriptions across AI answers</li>
          <li>Content that ranks but is not suitable for AI summarization</li>
          <li>No visibility tracking for AI search surfaces</li>
        </ul>

        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Without a dedicated AI visibility strategy, brands lose control over how they appear in AI-generated
          answers.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Our GEO &amp; LLM Optimization Approach</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          We optimize your digital presence so AI engines can clearly understand what your business does,
          trust your expertise and authority, accurately summarize and reference your brand, and recommend
          your services in relevant AI-driven conversations.
        </p>

        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Our approach combines strong SEO foundations, entity-based optimization, structured citation-friendly
          content, and consistent brand signals across the web. This ensures AI systems treat your brand as a
          reliable source, not just another website.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What Is GEO &amp; LLM Search Optimization</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Generative Engine Optimization (GEO) focuses on how AI systems interpret, summarize, and present
          information. LLM Search Optimization ensures large language models recognize your brand as
          authoritative, consistent, and reference-worthy.
        </p>

        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          Together, they optimize for AI-generated answers, conversational search queries, brand citations and
          mentions, and AI summaries and recommendations.
        </p>

        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          This is not traditional SEO, and it is not Answer Engine Optimization. It is the layer that controls
          how AI engines represent your brand.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Why Our GEO &amp; LLM Optimization Is Different</h2>

        <h3 style={{ marginTop: 18 }}>Built on SEO, Not Replacing It</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          AI visibility depends on strong SEO foundations. We build on them rather than bypass them.
        </p>

        <h3 style={{ marginTop: 18 }}>Entity and Authority Focus</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          We reinforce clear entity definitions, relationships, and expertise signals so AI engines understand
          who you are and why you matter.
        </p>

        <h3 style={{ marginTop: 18 }}>Citation-Friendly Content Structure</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          We optimize content formatting, phrasing, and structure to increase the likelihood of being cited by
          AI systems.
        </p>

        <h3 style={{ marginTop: 18 }}>Consistency Across AI Surfaces</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          We align website content, structured data, and external signals to reduce AI confusion or
          hallucinated descriptions.
        </p>

        <h3 style={{ marginTop: 18 }}>Measurable and Ethical</h3>
        <p style={{ marginTop: 10, lineHeight: 1.8, maxWidth: 920 }}>
          No manipulation or risky tactics. All optimization is transparent, ethical, and designed for
          long-term relevance.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Core GEO &amp; LLM Optimization Capabilities</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Entity-based optimization and brand clarity</li>
          <li>AI-friendly content structuring and phrasing</li>
          <li>Semantic reinforcement of expertise and services</li>
          <li>Alignment of on-site and off-site brand signals</li>
          <li>Support for AI summaries, citations, and recommendations</li>
          <li>Monitoring of AI search visibility and mentions</li>
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Our Process</h2>
        <ol style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>AI visibility and brand interpretation audit</li>
          <li>Entity and content gap analysis</li>
          <li>GEO and LLM optimization planning</li>
          <li>Content and structure refinement</li>
          <li>Authority and consistency reinforcement</li>
          <li>Monitoring and iterative improvement</li>
        </ol>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Results You Can Expect</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Increased visibility in AI-generated answers</li>
          <li>More accurate brand representation across AI tools</li>
          <li>Higher likelihood of being cited and recommended</li>
          <li>Stronger authority signals feeding both AI and search engines</li>
          <li>Improved downstream traffic quality and trust</li>
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>How This Service Fits the Bigger Picture</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          GEO &amp; LLM Search Optimization builds on AI Website Development and Search Engine Optimization
          (SEO), and works alongside Answer Engine Optimization (AEO) and Paid Advertising (PPC). It ensures
          your brand is not only ranked, but recognized and trusted by AI systems.
        </p>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>Ready to Take Control of Your AI Visibility</h2>
        <p style={{ marginTop: 12, lineHeight: 1.8, maxWidth: 920 }}>
          AI search is already influencing buying decisions. Make sure your brand is represented clearly,
          accurately, and authoritatively. Request a free AI Visibility Audit to understand how AI engines
          currently interpret your brand and where opportunities exist.
        </p>
      </section>
    </main>
  )
}
