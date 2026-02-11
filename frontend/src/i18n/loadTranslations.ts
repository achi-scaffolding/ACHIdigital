import type { Locale } from "./locales"
import path from "path"
import { promises as fs } from "fs"

type Dict = Record<string, any>

/**
 * Content locale represents the folder name inside packages/translations/locales/.
 * IMPORTANT:
 * - Route locale "lb" represents Arabic (Lebanon) in the URL
 * - Translation source folder is "ar"
 */
export type ContentLocale = "en" | "fr" | "ar"

function repoRootFromFrontend() {
  return path.resolve(process.cwd(), "..")
}

function localeFolder(locale: Locale | ContentLocale): ContentLocale {
  if (locale === "lb") return "ar"
  if (locale === "en" || locale === "fr" || locale === "ar") return locale
  return "en"
}

async function readJson(absPath: string): Promise<Dict> {
  try {
    const raw = await fs.readFile(absPath, "utf8")
    const trimmed = raw.trim()

    if (!trimmed) {
      console.warn(`[i18n] Empty JSON file at ${absPath}, using empty object`)
      return {}
    }

    try {
      return JSON.parse(trimmed) as Dict
    } catch (err) {
      console.warn(`[i18n] Failed to parse JSON at ${absPath}, using empty object`, err)
      return {}
    }
  } catch (err: any) {
    if (err && err.code === "ENOENT") {
      console.warn(`[i18n] Missing JSON file at ${absPath}, using empty object`)
      return {}
    }

    console.warn(`[i18n] Error reading JSON at ${absPath}, using empty object`, err)
    return {}
  }
}

function get(obj: any, keyPath: string) {
  return keyPath
    .split(".")
    .reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj)
}

/* =========================
   COMMON TEXT (UI)
========================= */
export async function loadCommon(locale: Locale | ContentLocale): Promise<Dict> {
  const folder = localeFolder(locale)
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    folder,
    "common.json"
  )
  return readJson(file)
}

/* =========================
   SEO TEXT (meta, titles)
========================= */
export async function loadSeo(locale: Locale | ContentLocale): Promise<Dict> {
  const folder = localeFolder(locale)
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    folder,
    "seo.json"
  )
  return readJson(file)
}

/* =========================
   ARIA / ACCESSIBILITY
========================= */
export async function loadAria(locale: Locale | ContentLocale): Promise<Dict> {
  const folder = localeFolder(locale)
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    folder,
    "aria.json"
  )
  return readJson(file)
}

/* =========================
   TRANSLATION HELPER
========================= */
export function t(dict: Dict, key: string): string {
  if (!key) return ""
  const v = get(dict, key)
  return typeof v === "string" ? v : ""
}
