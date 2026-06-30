# Solace

A [Next.js](https://nextjs.org) app bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 

This is hosted in https://solace-seven-tan.vercel.app/

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **CSS**: [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/postcss`
- **Font**: [Geist](https://vercel.com/font) (sans + mono) via `next/font`
- **Component library**: None — custom components built with Tailwind utility classes
- **Language**: TypeScript

## Project Structure

```
app/                        # Next.js App Router pages
components/
  Nav.tsx                   # Navigation
  Resume.tsx                # Resume page component
  ui-prototype/             # TypeScript UI prototype components
  ui-prototype-js/          # Plain-JS mirror of ui-prototype (interview reading)
.claude/skills/tsx-to-js/   # Claude skill — see below
```

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## ui-prototype-js — Interview Reference

`components/ui-prototype-js/` is a plain-JavaScript mirror of `components/ui-prototype/`.
TypeScript is stripped; CSS files and module imports are preserved. These files are not
wired to any routes — they exist for interview reading only.

### Adding a new component to ui-prototype-js

When you create a new component under `components/ui-prototype/<folder>/`, mirror it
with the `tsx-to-js` Claude skill:

```
translate <folder> to js
```

or more explicitly:

```
/tsx-to-js crypto-converter
```

The skill will:
1. Copy all CSS files from `components/ui-prototype/<folder>/` verbatim.
2. Strip TypeScript from every `.ts` / `.tsx` file and write `.js` equivalents.
3. Print a summary of files written.

The skill definition lives at `.claude/skills/tsx-to-js/SKILL.md`.

## Deploy on Vercel

Deploy with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
