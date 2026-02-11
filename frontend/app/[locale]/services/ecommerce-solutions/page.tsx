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
        <h1>E-commerce Solutions Built for Revenue, SEO, and Scalable Growth</h1>

        <p style={{ marginTop: 16, lineHeight: 1.8, maxWidth: 920 }}>
          E-commerce Solutions is for businesses that want to sell online seriously—not just list products.
          We build conversion-driven, scalable, SEO-friendly e-commerce websites that load fast, build trust,
          and increase revenue through better product structure, smoother checkout, and ongoing optimization.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What This Service Includes</h2>

        <h3 style={{ marginTop: 18 }}>1) E-commerce strategy &amp; architecture</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Business model planning: B2C, B2B, subscriptions, catalogs</li>
          <li>Product/category structure built for SEO-friendly websites and buying intent</li>
          <li>Platform selection: custom headless, Shopify/WooCommerce where relevant</li>
          <li>Funnel planning for repeat purchases and long-term growth</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>2) Custom e-commerce website design &amp; development</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Professional UI/UX designed to sell and build trust</li>
          <li>Mobile-first store layouts optimized for conversion</li>
          <li>Product pages, category pages, cart, and checkout built for speed and clarity</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>3) Product, cart &amp; checkout optimization</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Product page optimization for clarity, trust, and conversion</li>
          <li>Cart/checkout improvements to reduce abandonment</li>
          <li>Upsells, cross-sells, bundles, promotions</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>4) Performance &amp; scalability</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Core Web Vitals optimization for catalogs</li>
          <li>Caching/CDN strategies for high-speed websites</li>
          <li>Stability for traffic spikes and seasonal campaigns</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>5) SEO for e-commerce</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Technical SEO for products and categories</li>
          <li>Clean URLs, schema, internal linking, index control where required</li>
          <li>Product/category ranking strategy, not only the homepage</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>6) Content &amp; trust optimization</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Product descriptions written for conversion + SEO</li>
          <li>Trust signals: reviews, FAQs, shipping/returns clarity, guarantees</li>
          <li>Messaging aligned with professional business websites</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>7) Payments, shipping &amp; integrations</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Secure payment gateways and checkout configuration</li>
          <li>Shipping zones/rules, taxes, regions</li>
          <li>CRM, email automation, consent-aware analytics, abandoned cart recovery</li>
        </ul>

        <h3 style={{ marginTop: 22 }}>8) AI-ready e-commerce (optional, SEO-safe)</h3>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>Personalized recommendations without changing core SEO text</li>
          <li>AI chatbot for product help, order tracking, FAQs</li>
          <li>AI-assisted support and upsell logic implemented safely</li>
        </ul>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>Outcomes</h2>
        <ul style={{ marginTop: 12, paddingInlineStart: 20, lineHeight: 1.9 }}>
          <li>A conversion-driven online store that loads fast and builds trust</li>
          <li>Better SEO rankings for products and categories</li>
          <li>Higher conversion rate and reduced cart abandonment</li>
          <li>A store ready for scale, automation, and future AI features</li>
        </ul>
      </section>
    </main>
  )
}
