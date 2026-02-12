export const SUPPORTED_LOCALES = ["en", "fr", "lb"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export function isLocale(v: string): v is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(v)
}

export function dirForLocale(locale: Locale) {
  return locale === "lb" ? "rtl" : "ltr"
}
