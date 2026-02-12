import type { Locale as RouteLocale } from "./locales"
import path from "path"
import { promises as fs } from "fs"

type Dict = Record<string, any>

/**
 * Translation folder locales (content locales):
 * - "lb" in the URL maps to Arabic content folder "ar"
 */
type ContentLocale = "en" | "fr" | "lb"

function repoRootFromFrontend() {
  return path.resolve(process.cwd(), "..")
}

function localeFolder(locale: RouteLocale): ContentLocale {
  if (locale === "lb") return "lb"
  if (locale === "en" || locale === "fr") return locale
  return "en"
}

async function readJson(absPath: string): Promise<Dict> {
  const raw = await fs.readFile(absPath, "utf8")
  return JSON.parse(raw) as Dict
}

function get(obj: any, keyPath: string) {
  return keyPath
    .split(".")
    .reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj)
}

export async function loadCommon(locale: RouteLocale): Promise<Dict> {
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

export async function loadSeo(locale: RouteLocale): Promise<Dict> {
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

export function t(dict: Dict, key: string): string {
  const v = get(dict, key)
  return typeof v === "string" ? v : ""
}

/**
 * Convenience helper: translate by locale + key in one call.
 * Uses file caching in-memory per request runtime.
 */
const COMMON_CACHE = new Map<RouteLocale, Dict>()

export async function loadCommonCached(locale: RouteLocale): Promise<Dict> {
  const cached = COMMON_CACHE.get(locale)
  if (cached) return cached
  const dict = await loadCommon(locale)
  COMMON_CACHE.set(locale, dict)
  return dict
}

export async function tt(locale: RouteLocale, key: string): Promise<string> {
  const dict = await loadCommonCached(locale)
  return t(dict, key)
}
