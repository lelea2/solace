# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint (next/core-web-vitals + typescript preset)
```

No test runner is configured.

## Architecture

**Stack**: Next.js 16 App Router · React 19 · TypeScript 5 · Tailwind CSS 4

**Path alias**: `@/*` resolves to the repo root (e.g. `@/components/Nav`).

### Route → Component pattern

Every page under `app/ui-prototype/<name>/page.tsx` is a thin Server Component that imports the real component from `components/ui-prototype/<name>/`. The page file owns metadata, the dark card wrapper, and the back-link; the component file owns all interactive logic.

```
app/ui-prototype/modal-dialog/page.tsx   ← route, metadata, shell
components/ui-prototype/modal-dialog/    ← AppModalDialog.tsx, ModalDialog.tsx, styles.module.css
```

To add a new prototype: create `components/ui-prototype/<name>/`, add the route page, and add an entry to the `prototypes` array in `app/ui-prototype/page.tsx` plus a link entry in `components/Nav.tsx`.

### Global shell

`app/layout.tsx` wraps every page with `<ThemeProvider>` then `<Nav>`. Both are Client Components.

- **ThemeProvider** (`components/ThemeProvider.tsx`) — reads `localStorage.theme`, falls back to `prefers-color-scheme`, toggles the `dark` class on `<html>`. Exposes `useTheme()`.
- **Nav** (`components/Nav.tsx`) — the `links` array is the single source of truth for top navigation items.

### Styling

- **Tailwind 4**: `globals.css` uses `@import "tailwindcss"` (not the v3 `@tailwind` directives). Dark-mode variant is declared with `@custom-variant dark (&:where(.dark, .dark *))`.
- **CSS Modules**: class names should be camelCase in the `.module.css` file so JS dot-notation access is unambiguous (e.g. `.modalOverlay`, not `.modal-overlay`). CSS Modules require pure selectors — bare element selectors (`button`, `body`) are not allowed; scope them with a local class.

### ui-prototype-js

`components/ui-prototype-js/` is a plain-JavaScript mirror of `components/ui-prototype/` for interview reading. All TypeScript is stripped; CSS module imports are retained; `className` values use bare strings instead of `styles.*`. These files are not wired to any routes — they are read-only reference copies. CSS files are copied verbatim alongside the JS files.
