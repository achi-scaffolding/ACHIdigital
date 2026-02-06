/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

// If you are NOT using a custom domain yet, keep "/ACHIdigital".
// If you ARE using a custom domain later, set NEXT_PUBLIC_BASE_PATH="" (empty) in the workflow/env.
const basePath =
  (process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? "/ACHIdigital" : "")).replace(/\/$/, "")

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  transpilePackages: ["translations"],
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
