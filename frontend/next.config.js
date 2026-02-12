/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGithubActions ? "/ACHIdigital" : "")
).replace(/\/$/, "")

const nextConfig = {
  experimental: { externalDir: true },
  transpilePackages: ["translations"],

  output: "export",
  trailingSlash: true,

  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  images: { unoptimized: true },
}

module.exports = nextConfig
