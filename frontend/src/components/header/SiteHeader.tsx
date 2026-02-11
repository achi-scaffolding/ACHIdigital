"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import type { Locale } from "../../i18n/locales"

type HeaderBrand = {
  name: string
  logoAlt: string
}

type HeaderNav = {
  home: string
  about: string
  services: string
  blog?: string
  contact: string
}

type HeaderServicesItems = {
  aiWebsiteDevelopment?: string
  seoAiVisibility?: string
  uxuiDesign?: string
  performanceOptimization?: string
}

type HeaderServicesDropdown = {
  viewAll: string
  items: HeaderServicesItems
}

type HeaderLang = {
  en: string
  fr: string
  ar: string
}

type HeaderText = {
  brand: HeaderBrand
  nav: HeaderNav
  servicesDropdown: HeaderServicesDropdown
  cta: string
  lang: HeaderLang
}

type HeaderAria = {
  mainNav: string
  openMenu: string
  closeMenu: string
  openServices: string
  closeServices: string
  languageSwitcher: string
  brandHome: string
}

type SiteHeaderProps = {
  locale: Locale
  text: HeaderText
  aria?: Partial<HeaderAria>
}

const serviceSlugByKey: Record<keyof HeaderServicesItems, string> = {
  aiWebsiteDevelopment: "ai-website-development",
  seoAiVisibility: "seo-ai-visibility",
  uxuiDesign: "ux-ui-design",
  performanceOptimization: "performance-optimization",
}

const languageRouteByKey: Record<keyof HeaderLang, Locale> = {
  en: "en",
  fr: "fr",
  ar: "lb",
}

const ariaFallback: HeaderAria = {
  mainNav: "",
  openMenu: "",
  closeMenu: "",
  openServices: "",
  closeServices: "",
  languageSwitcher: "",
  brandHome: "",
}

function withBase(path: string) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")
  if (!base) return path
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`
}

function localePrefix(locale: Locale): "" | "/fr" | "/lb" {
  if (locale === "en") return ""
  if (locale === "fr") return "/fr"
  return "/lb"
}

function normalizePathname(p: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")
  if (!base) return p
  if (p === base) return "/"
  return p.startsWith(base + "/") ? p.slice(base.length) : p
}

function stripLocaleFromPath(p: string): string {
  const normalized = p.startsWith("/") ? p : `/${p}`
  if (normalized === "/") return "/"
  if (normalized === "/fr" || normalized === "/lb") return "/"
  if (normalized.startsWith("/fr/")) return normalized.slice(3) || "/"
  if (normalized.startsWith("/lb/")) return normalized.slice(3) || "/"
  return normalized
}

function pathFor(locale: Locale, path: string): string {
  const prefix = localePrefix(locale)
  const normalized = path.startsWith("/") ? path : `/${path}`
  if (normalized === "/") return withBase(prefix ? `${prefix}/` : "/")
  return withBase(`${prefix}${normalized}`)
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function SiteHeader({ locale, text, aria }: SiteHeaderProps) {
  const a: HeaderAria = { ...ariaFallback, ...(aria ?? {}) }

  const rawPathname = usePathname() || "/"
  const pathname = normalizePathname(rawPathname)
  const cleanPath = stripLocaleFromPath(pathname)

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const headerRef = useRef<HTMLElement | null>(null)
  const ctaRef = useRef<HTMLAnchorElement | null>(null)

  const closeAll = () => {
    setIsMobileNavOpen(false)
    setIsDesktopServicesOpen(false)
    setIsMobileServicesOpen(false)
  }

  useEffect(() => {
    closeAll()
  }, [pathname])

  useEffect(() => {
    let lastY = 0
    let ticking = false

    const onScroll = () => {
      const y = window.scrollY || 0
      const goingDown = y > lastY
      const nearTop = y < 12

      const doc = document.documentElement
      const max = (doc.scrollHeight || 1) - (window.innerHeight || 1)
      const progress = max > 0 ? y / max : 0

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollProgress(clamp(progress, 0, 1))
          setIsHeaderHidden(!nearTop && goingDown && y > 140)
          lastY = y
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const el = ctaRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 180
      const strength = 0.22
      if (dist > maxDist) {
        el.style.transform = ""
        return
      }
      const t = (1 - dist / maxDist) * strength
      const tx = dx * t
      const ty = dy * t
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    }

    const onLeave = () => {
      el.style.transform = ""
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    el.addEventListener("mouseleave", onLeave, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  const homeHref = useMemo(() => pathFor(locale, "/"), [locale])
  const servicesHref = useMemo(() => pathFor(locale, "/services"), [locale])
  const ctaHref = useMemo(() => pathFor(locale, "/contact"), [locale])

  const isPathActive = (href: string): boolean => {
    const h = stripLocaleFromPath(normalizePathname(href))
    if (h === "/") return cleanPath === "/"
    if (h === "/services") return cleanPath === "/services" || cleanPath.startsWith("/services/")
    return cleanPath === h
  }

  const primaryLinks: { key: keyof HeaderNav; label: string; href: string }[] = useMemo(
    () => [
      { key: "home", label: text.nav.home, href: pathFor(locale, "/") },
      { key: "about", label: text.nav.about, href: pathFor(locale, "/about") },
      { key: "services", label: text.nav.services, href: pathFor(locale, "/services") },
      ...(text.nav.blog ? [{ key: "blog" as const, label: text.nav.blog, href: pathFor(locale, "/blog") }] : []),
      { key: "contact", label: text.nav.contact, href: pathFor(locale, "/contact") },
    ],
    [locale, text.nav.about, text.nav.blog, text.nav.contact, text.nav.home, text.nav.services],
  )

  const serviceItems: { key: keyof HeaderServicesItems; label: string; href: string }[] = useMemo(() => {
    const keys = Object.keys(text.servicesDropdown.items) as (keyof HeaderServicesItems)[]
    return keys
      .filter((k) => !!text.servicesDropdown.items[k])
      .map((k) => ({
        key: k,
        label: text.servicesDropdown.items[k] as string,
        href: pathFor(locale, `/services/${serviceSlugByKey[k]}`),
      }))
  }, [locale, text.servicesDropdown.items])

  const languageKeys: (keyof HeaderLang)[] = ["en", "fr", "ar"]

  const langLinks = useMemo(() => {
    return languageKeys.map((k) => {
      const targetLocale = languageRouteByKey[k]
      return {
        key: k,
        label: text.lang[k],
        href: pathFor(targetLocale, cleanPath),
        isActive: targetLocale === locale,
      }
    })
  }, [cleanPath, locale, text.lang.ar, text.lang.en, text.lang.fr])

  return (
    <header
      ref={(n) => {
        headerRef.current = n
      }}
      className={[
        "sticky top-0 z-50",
        "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        "border-b border-slate-100",
        "transition-transform motion-safe:duration-300",
        isHeaderHidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-slate-100/70" aria-hidden="true">
        <div
          className="h-full bg-[#28509E]"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#28509E]/55 to-transparent opacity-90"
        aria-hidden="true"
      />

      <nav aria-label={a.mainNav} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="flex h-16 items-center justify-between gap-3">
          <li className="min-w-0 flex-1">
            <Link
              href={homeHref}
              aria-label={text.brand.logoAlt || a.brandHome}
              className={[
                "group inline-flex max-w-max items-center gap-2 rounded-full",
                "border border-slate-100 bg-white/90 shadow-sm",
                "px-2 py-1 pr-3",
                "transition-colors motion-safe:duration-200",
                "hover:border-[#28509E]/30 hover:bg-white",
              ].join(" ")}
              onClick={closeAll}
            >
              <span
                aria-hidden="true"
                className={[
                  "relative flex h-9 w-9 items-center justify-center rounded-full",
                  "border border-slate-200 bg-white text-sm font-semibold tracking-tight text-[#28509E] shadow-sm",
                  "motion-safe:transition-transform motion-safe:duration-200",
                  "group-hover:-translate-y-0.5 group-hover:shadow-md",
                ].join(" ")}
              >
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(40,80,158,0.18),transparent_55%)] opacity-0 transition-opacity motion-safe:duration-200 group-hover:opacity-100" />
                <span className="relative">{text.brand.name?.charAt(0)}</span>
              </span>
              <span className="hidden truncate text-sm font-semibold tracking-tight text-slate-900 sm:inline">
                {text.brand.name}
              </span>
              <span className="sr-only">{text.brand.logoAlt}</span>
            </Link>
          </li>

          <li className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href={primaryLinks[0]?.href || homeHref}
                  aria-current={isPathActive(primaryLinks[0]?.href || homeHref) ? "page" : undefined}
                  className={[
                    "group relative rounded-full px-3 py-2 text-sm font-medium",
                    isPathActive(primaryLinks[0]?.href || homeHref) ? "text-slate-900" : "text-slate-700",
                    "transition-colors hover:text-slate-900",
                  ].join(" ")}
                  onClick={closeAll}
                >
                  <span>{primaryLinks[0]?.label}</span>
                  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[#28509E]/70 transition-transform motion-safe:duration-200 group-hover:scale-x-100" />
                </Link>
              </li>

              <li>
                <Link
                  href={primaryLinks[1]?.href || pathFor(locale, "/about")}
                  aria-current={isPathActive(primaryLinks[1]?.href || pathFor(locale, "/about")) ? "page" : undefined}
                  className={[
                    "group relative rounded-full px-3 py-2 text-sm font-medium",
                    isPathActive(primaryLinks[1]?.href || pathFor(locale, "/about")) ? "text-slate-900" : "text-slate-700",
                    "transition-colors hover:text-slate-900",
                  ].join(" ")}
                  onClick={closeAll}
                >
                  <span>{primaryLinks[1]?.label}</span>
                  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[#28509E]/70 transition-transform motion-safe:duration-200 group-hover:scale-x-100" />
                </Link>
              </li>

              <li className="relative">
                <div className="flex items-center">
                  <Link
                    href={servicesHref}
                    aria-current={isPathActive(servicesHref) ? "page" : undefined}
                    className={[
                      "group relative rounded-full px-3 py-2 text-sm font-medium",
                      isPathActive(servicesHref) ? "text-slate-900" : "text-slate-700",
                      "transition-colors hover:text-slate-900",
                    ].join(" ")}
                    onClick={closeAll}
                  >
                    <span>{text.nav.services}</span>
                    <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[#28509E]/70 transition-transform motion-safe:duration-200 group-hover:scale-x-100" />
                  </Link>

                  {serviceItems.length > 0 && (
                    <button
                      type="button"
                      aria-label={isDesktopServicesOpen ? a.closeServices : a.openServices}
                      aria-expanded={isDesktopServicesOpen}
                      className="ml-0.5 rounded-full p-2 text-slate-700 transition-colors hover:text-slate-900"
                      onClick={() => setIsDesktopServicesOpen((p) => !p)}
                      onBlur={(e) => {
                        if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                          setIsDesktopServicesOpen(false)
                        }
                      }}
                    >
                      <span aria-hidden="true" className="block h-2 w-2 rotate-45 border-b-2 border-r-2 border-slate-400" />
                    </button>
                  )}
                </div>

                {serviceItems.length > 0 && (
                  <div
                    className={[
                      "absolute left-0 top-full mt-2 w-[320px] overflow-hidden rounded-2xl",
                      "border border-slate-100 bg-white/95 shadow-lg backdrop-blur",
                      "transition-all motion-safe:duration-200",
                      isDesktopServicesOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1",
                    ].join(" ")}
                    role="menu"
                    aria-hidden={!isDesktopServicesOpen}
                  >
                    <div className="p-2">
                      <Link
                        href={servicesHref}
                        className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                        onClick={closeAll}
                      >
                        <span>{text.servicesDropdown.viewAll}</span>
                        <span className="text-[#28509E]/80">→</span>
                      </Link>

                      <div className="my-2 h-px bg-slate-100" />

                      <ul className="grid gap-1">
                        {serviceItems.slice(0, 5).map((it) => (
                          <li key={it.key}>
                            <Link
                              href={it.href}
                              className="group relative flex items-start gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                              onClick={closeAll}
                            >
                              <span
                                aria-hidden="true"
                                className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#28509E]/15 ring-1 ring-[#28509E]/25"
                              />
                              <span className="flex-1">{it.label}</span>
                              <span aria-hidden="true" className="opacity-0 transition-opacity group-hover:opacity-100 text-[#28509E]/80">
                                →
                              </span>
                              <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-[#28509E]/35 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              {text.nav.blog ? (
                <li>
                  <Link
                    href={pathFor(locale, "/blog")}
                    aria-current={isPathActive(pathFor(locale, "/blog")) ? "page" : undefined}
                    className={[
                      "group relative rounded-full px-3 py-2 text-sm font-medium",
                      isPathActive(pathFor(locale, "/blog")) ? "text-slate-900" : "text-slate-700",
                      "transition-colors hover:text-slate-900",
                    ].join(" ")}
                    onClick={closeAll}
                  >
                    <span>{text.nav.blog}</span>
                    <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[#28509E]/70 transition-transform motion-safe:duration-200 group-hover:scale-x-100" />
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  href={pathFor(locale, "/contact")}
                  aria-current={isPathActive(pathFor(locale, "/contact")) ? "page" : undefined}
                  className={[
                    "group relative rounded-full px-3 py-2 text-sm font-medium",
                    isPathActive(pathFor(locale, "/contact")) ? "text-slate-900" : "text-slate-700",
                    "transition-colors hover:text-slate-900",
                  ].join(" ")}
                  onClick={closeAll}
                >
                  <span>{text.nav.contact}</span>
                  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[#28509E]/70 transition-transform motion-safe:duration-200 group-hover:scale-x-100" />
                </Link>
              </li>
            </ul>
          </li>

          <li className="hidden lg:flex items-center gap-2">
            <div className="flex items-center rounded-full border border-slate-100 bg-white/80 px-1 py-1 shadow-sm">
              <div className="sr-only">{a.languageSwitcher}</div>
              {langLinks.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  aria-current={l.isActive ? "page" : undefined}
                  className={[
                    "rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight",
                    "transition-colors motion-safe:duration-200",
                    l.isActive ? "bg-[#28509E] text-white shadow-sm" : "text-slate-700 hover:text-slate-900",
                  ].join(" ")}
                  onClick={closeAll}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link
              ref={ctaRef}
              href={ctaHref}
              className={[
                "group relative inline-flex items-center justify-center rounded-full px-4 py-2",
                "text-sm font-semibold text-white",
                "bg-[#28509E] shadow-sm",
                "transition-transform motion-safe:duration-200",
                "hover:-translate-y-0.5 active:translate-y-0",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28509E]/30 focus-visible:ring-offset-2",
              ].join(" ")}
              onClick={closeAll}
            >
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_55%)] opacity-0 transition-opacity motion-safe:duration-200 group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-full ring-1 ring-white/10" />
              <span className="relative">{text.cta}</span>
            </Link>
          </li>

          <li className="flex items-center gap-2 lg:hidden">
            <Link
              href={ctaHref}
              className="rounded-full bg-[#28509E] px-3 py-2 text-xs font-semibold text-white shadow-sm transition-transform motion-safe:duration-200 active:scale-[0.98]"
              onClick={closeAll}
            >
              {text.cta}
            </Link>

            <button
              type="button"
              aria-label={isMobileNavOpen ? a.closeMenu : a.openMenu}
              aria-expanded={isMobileNavOpen}
              className={[
                "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
                "border border-slate-100 bg-white/90 shadow-sm",
                "text-slate-800 transition-colors hover:bg-white",
              ].join(" ")}
              onClick={() => setIsMobileNavOpen((p) => !p)}
            >
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(40,80,158,0.12),transparent_60%)] opacity-0 transition-opacity motion-safe:duration-200 hover:opacity-100" />
              <span aria-hidden="true" className="relative flex h-4 w-5 flex-col justify-between">
                <span
                  className={[
                    "block h-0.5 w-full rounded-full bg-slate-800 transition-transform motion-safe:duration-200",
                    isMobileNavOpen ? "translate-y-[7px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-0.5 w-full rounded-full bg-slate-800 transition-opacity motion-safe:duration-200",
                    isMobileNavOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-0.5 w-full rounded-full bg-slate-800 transition-transform motion-safe:duration-200",
                    isMobileNavOpen ? "-translate-y-[7px] -rotate-45" : "",
                  ].join(" ")}
                />
              </span>
            </button>
          </li>
        </ul>

        <div
          className={[
            "lg:hidden overflow-hidden transition-all motion-safe:duration-200",
            isMobileNavOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="pb-4 pt-2">
            <div className="rounded-2xl border border-slate-100 bg-white/90 shadow-sm">
              <ul className="p-2">
                {primaryLinks.map((l) => {
                  if (l.key === "services") return null
                  return (
                    <li key={l.key}>
                      <Link
                        href={l.href}
                        aria-current={isPathActive(l.href) ? "page" : undefined}
                        className={[
                          "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold",
                          isPathActive(l.href) ? "text-slate-900" : "text-slate-800",
                          "transition-colors hover:bg-slate-50",
                        ].join(" ")}
                        onClick={closeAll}
                      >
                        <span>{l.label}</span>
                        <span className="text-[#28509E]/70 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                      </Link>
                    </li>
                  )
                })}

                <li className="mt-1">
                  <div className="flex items-center justify-between rounded-xl px-3 py-2">
                    <Link
                      href={servicesHref}
                      aria-current={isPathActive(servicesHref) ? "page" : undefined}
                      className="text-sm font-semibold text-slate-900"
                      onClick={closeAll}
                    >
                      {text.nav.services}
                    </Link>
                    {serviceItems.length > 0 && (
                      <button
                        type="button"
                        aria-label={isMobileServicesOpen ? a.closeServices : a.openServices}
                        aria-expanded={isMobileServicesOpen}
                        className="rounded-full p-2 text-slate-700"
                        onClick={() => setIsMobileServicesOpen((p) => !p)}
                      >
                        <span
                          aria-hidden="true"
                          className={[
                            "block h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-slate-400 transition-transform motion-safe:duration-200",
                            isMobileServicesOpen ? "rotate-[225deg]" : "rotate-45",
                          ].join(" ")}
                        />
                      </button>
                    )}
                  </div>

                  {serviceItems.length > 0 && (
                    <div
                      className={[
                        "grid gap-1 px-2 pb-2 transition-all motion-safe:duration-200",
                        isMobileServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
                      ].join(" ")}
                    >
                      <Link
                        href={servicesHref}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                        onClick={closeAll}
                      >
                        <span>{text.servicesDropdown.viewAll}</span>
                        <span className="text-[#28509E]/80">→</span>
                      </Link>

                      {serviceItems.slice(0, 5).map((it) => (
                        <Link
                          key={it.key}
                          href={it.href}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                          onClick={closeAll}
                        >
                          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28509E]/15 ring-1 ring-[#28509E]/25" />
                          <span className="flex-1">{it.label}</span>
                          <span aria-hidden="true" className="text-[#28509E]/70">→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>

                <li className="mt-2">
                  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2">
                    <div className="text-xs font-semibold text-slate-700">{a.languageSwitcher}</div>
                    <div className="flex items-center gap-1">
                      {langLinks.map((l) => (
                        <Link
                          key={l.key}
                          href={l.href}
                          aria-current={l.isActive ? "page" : undefined}
                          className={[
                            "rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight",
                            "transition-colors motion-safe:duration-200",
                            l.isActive ? "bg-[#28509E] text-white shadow-sm" : "text-slate-700 hover:text-slate-900",
                          ].join(" ")}
                          onClick={closeAll}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pointer-events-none mt-3 h-px bg-gradient-to-r from-transparent via-[#28509E]/25 to-transparent" aria-hidden="true" />
          </div>
        </div>
      </nav>
    </header>
  )
}
