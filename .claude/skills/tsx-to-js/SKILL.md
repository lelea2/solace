---
name: tsx-to-js
description: >
  Translates a ui-prototype component folder from TypeScript (.tsx/.ts) to plain
  JavaScript (.js) and mirrors it under components/ui-prototype-js/ for interview
  reading. Use when the user says "translate <folder> to js", "add <component> to
  ui-prototype-js", "convert <name> for interview", or "mirror <folder> to js".
  Takes one input: the component folder name inside components/ui-prototype/.
---

# tsx-to-js

Mirrors a single `components/ui-prototype/<folder>/` into
`components/ui-prototype-js/<folder>/` with all TypeScript stripped and CSS files
copied verbatim.

## Parameter

| Parameter | Example | Description |
|-----------|---------|-------------|
| `folder` | `crypto-converter` | Exact subfolder name under `components/ui-prototype/` |

Ask for `folder` if it is not already given in the user's message.

## What this skill does

1. **List source files** — reads every file in `components/ui-prototype/<folder>/`.
2. **Copy CSS files** — copies `.css` and `.module.css` files unchanged into the
   destination folder.
3. **Translate TS/TSX → JS** — for each `.ts` / `.tsx` file, strips TypeScript
   and writes a `.js` file.
4. **Report** — prints a summary of files written.

## TypeScript stripping rules

Apply all of the following when converting a file. Do not reformat or restructure
the logic — only remove TypeScript syntax.

| What to remove | Example before | Example after |
|---------------|----------------|---------------|
| `"use client"` directive | `"use client";` | *(removed)* |
| `type` declarations | `type Foo = string \| null;` | *(removed)* |
| `interface` declarations | `interface Props { … }` | *(removed)* |
| Inline parameter types | `(x: string, y: number)` | `(x, y)` |
| Variable type annotations | `const n: number = 0;` | `const n = 0;` |
| Generic type params on hooks | `useState<string>("")` | `useState("")` |
| Generic type params on refs | `useRef<HTMLDivElement \| null>(null)` | `useRef(null)` |
| Return type annotations | `): boolean {` | `) {` |
| `as` type assertions | `value as string` | `value` |
| `Readonly<{…}>` wrappers | `Readonly<{ open?: boolean }>` | `{ open?: boolean }` |
| `import type` statements | `import type { FC } from 'react'` | *(removed)* |
| TypeScript-only imports | `import { ComponentProps } from 'react'` when only used in types | *(removed)* |
| Explicit `: React.ReactNode` | `children: React.ReactNode` | `children` (keep the prop, drop the type) |

**Preserve everything else unchanged**: React imports, hook calls, JSX, CSS module
imports, logic, comments (including interview-explanation comments), `key` props,
`aria-*` attributes, and cross-file imports.

**Do not convert `className={styles.foo}` to bare strings.** Keep CSS module
references intact — the imported `styles` object is still valid in `.js` files.

## Workflow

### Step 0 — Resolve folder

If `folder` was not supplied, ask:
```
Which ui-prototype folder should I translate? (e.g. crypto-converter)
```

### Step 1 — Verify source exists

```bash
ls components/ui-prototype/<folder>/
```

If the folder does not exist, stop and tell the user.

### Step 2 — Create destination

```bash
mkdir -p components/ui-prototype-js/<folder>/
```

### Step 3 — Copy CSS files

For each `.css` file in the source folder:
```bash
cp components/ui-prototype/<folder>/<file>.css \
   components/ui-prototype-js/<folder>/<file>.css
```

### Step 4 — Translate each .ts / .tsx file

For each `.ts` / `.tsx` file:

1. Read the file with the Read tool.
2. Apply all stripping rules from the table above.
3. Write the result to `components/ui-prototype-js/<folder>/<filename>.js`
   using the Write tool.

Work through every file before moving to the next step.

### Step 5 — Report

Print a short summary:
```
Translated components/ui-prototype/<folder>/ → components/ui-prototype-js/<folder>/

  Copied  : <n> CSS file(s)
  Converted: <n> TS/TSX → JS file(s)

Files written:
  - <file1>.js
  - <file2>.js
  - …
```
