import type { Locale } from "./locales"
import path from "path"
import { promises as fs } from "fs"

type Dict = Record<string, any>

function repoRootFromFrontend() {
  return path.resolve(process.cwd(), "..")
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

export async function loadCommon(locale: Locale): Promise<Dict> {
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    locale,
    "common.json"
  )
  return readJson(file)
}

export async function loadSeo(locale: Locale): Promise<Dict> {
  const file = path.join(
    repoRootFromFrontend(),
    "packages",
    "translations",
    "locales",
    locale,
    "seo.json"
  )
  return readJson(file)
}

export function t(dict: Dict, key: string): string {
  const v = get(dict, key)
  return typeof v === "string" ? v : ""
}
