import type { ReactNode } from "react"
import { isLocale, type Locale } from "../../src/i18n/locales"

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps): Promise<ReactNode> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : "en"

  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Home ({locale})</h1>
        <p className="mt-4 text-base text-black/70">
          Tailwind is working. This is the locale home route.
        </p>
      </div>
    </section>
  )
}
