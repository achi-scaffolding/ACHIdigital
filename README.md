Repository root

/ai — Reserved for future AI logic, personalization engines, and agentic workflows.

/backend — Reserved for future backend APIs, services, databases, or server-side logic.

/docs — Project documentation, architecture notes, SEO rules, and technical decisions.

/frontend — The main Next.js frontend application (App Router, SEO-first, multilingual).

/infra — Infrastructure and deployment configuration (CI/CD, hosting, environments).

/packages — Shared, reusable packages used across the monorepo (translations, config, UI).

.editorconfig — Enforces consistent editor formatting rules across all contributors.

.env.example — Template for required environment variables (no secrets committed).

README.md — High-level project overview, goals, and setup instructions.

Frontend application

/frontend/app — Next.js App Router entry point and file-system-based routing layer.

/frontend/public — Static public assets served directly by Next.js.

/frontend/src — Application source code (components, features, utilities).

frontend/next-env.d.ts — Next.js TypeScript type declarations.

frontend/next.config.js — Next.js framework configuration and build behavior.

frontend/package-lock.json — Locked dependency versions for reproducible installs.

frontend/package.json — Frontend dependencies, scripts, and project metadata.

frontend/tsconfig.json — TypeScript compiler configuration for the frontend.

App Router & localization

/frontend/app/[locale] — Dynamic language-based routing (en, fr, ar) for multilingual SEO.

/frontend/app/[locale]/layout.tsx — Root layout wrapper applied to all pages of a locale.

/frontend/app/[locale]/page.tsx — Entry homepage for each locale.

Frontend source structure

/frontend/src/components — Reusable UI components and layout building blocks.

/frontend/src/features — Feature-based modules (SEO, consent, analytics, personalization).

/frontend/src/i18n — Frontend internationalization logic and translation loaders.

Shared packages

/packages/config — Centralized shared configuration for tooling and frameworks.

/packages/translations — Single source of truth for multilingual content and SEO text.

/packages/types — Shared TypeScript types and interfaces across the project.

/packages/ui — Shared UI components and styles reusable across apps.

Shared configuration packages

/packages/config/eslint — Shared ESLint rules for consistent code quality.

/packages/config/tailwind — Shared Tailwind CSS and PostCSS configuration.

/packages/config/typescript — Shared base TypeScript configuration.

/packages/config/eslint/index.js — ESLint configuration entry point.

/packages/config/tailwind/postcss.config.js — PostCSS configuration for Tailwind processing.

/packages/config/tailwind/tailwind.config.js — Tailwind design system and utility configuration.

/packages/config/typescript/tsconfig.base.json — Base TypeScript config extended by all apps.

Translations (multilingual content)

/packages/translations/locales — Root folder for all supported languages.

/packages/translations/locales/ar — Arabic translations.

/packages/translations/locales/en — English translations.

/packages/translations/locales/fr — French translations.

aria.json — Accessibility labels and screen-reader text.

common.json — General UI text and reusable content strings.

seo.json — SEO-specific content (titles, descriptions, structured text).

Shared types

/packages/types/consent.d.ts — Type definitions for cookie consent and privacy logic.

/packages/types/index.d.ts — Shared global TypeScript types.

/packages/types/seo.d.ts — Type definitions for SEO metadata and schema handling.

Shared UI package

/packages/ui/src — Source code for the shared UI library.

/packages/ui/package.json — UI package metadata and dependencies.

/packages/ui/src/components — Reusable UI components.

/packages/ui/src/components/styles — Shared UI styles and design primitives.