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
app/                  # Next.js App Router pages
components/
  Nav.tsx             # Navigation
  Resume.tsx          # Resume page component
  ui-prototype/       # UI prototype components (Claude chat, Todo, Counter)
```

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Deploy on Vercel

Deploy with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
