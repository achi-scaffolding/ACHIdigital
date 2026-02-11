import { isLocale, type Locale } from "../../../../src/i18n/locales"
import { loadCommon } from "../../../../src/i18n/loadTranslations"

const STATIC_LOCALES: Locale[] = ["en", "fr", "ar"]

export async function generateStaticParams() {
  return STATIC_LOCALES.map((locale) => ({ locale }))
}

export default async function AIWebsiteDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  await loadCommon(locale) // kept for future translations

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "64px 20px" }}>
      {/* HERO */}
      <section>
        <h1>AI Website Development Built for Growth, Search, and the AI Era</h1>

        <p>
          Websites Are No Longer Pages. They Are Intelligent Systems.
        </p>

        <p>
          AI Website Development That Performs on Google, AI Search Engines, and Real Users
        </p>

        <p>
          In 2026, websites are no longer static brochures or design projects. They are intelligent digital systems that must perform across multiple surfaces: Google Search, AI answers, paid traffic, and real user journeys.
        </p>
      </section>

      {/* PROBLEM */}
      <section>
        <h2>The Problem</h2>
        <ul>
          <li>Websites that look modern but do not convert</li>
          <li>Slow performance and poor Core Web Vitals</li>
          <li>Inconsistent SEO rankings</li>
          <li>AI engines misunderstanding or ignoring the brand</li>
          <li>Costly redesigns every few years</li>
        </ul>
      </section>

      {/* APPROACH */}
      <section>
        <h2>Our AI-First Website Development Approach</h2>
        <p>
          We do not treat AI as a gimmick or shortcut. We treat it as a system-level capability.
        </p>
      </section>

      {/* CAPABILITIES */}
      <section>
        <h2>Key Capabilities</h2>
        <ul>
          <li>Custom website design and development</li>
          <li>Performance engineering and Core Web Vitals</li>
          <li>SEO-friendly architecture</li>
          <li>AI-ready content structure</li>
          <li>Multilingual scalability</li>
        </ul>
      </section>

      {/* CTA */}
      <section>
        <h2>Ready to Build a Future-Proof Website</h2>
        <p>
          Book a free AI Website Strategy Session to receive a clear, actionable roadmap.
        </p>
      </section>
    </main>
  )
}
