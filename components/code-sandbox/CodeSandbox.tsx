import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "shiki";
import CodeSandboxViewer, { type SandboxFile } from "./CodeSandboxViewer";

const SOURCE_ROOT = path.join(process.cwd(), "components/ui-prototype");
const CODE_EXTENSIONS = new Set(["tsx", "ts", "jsx", "js", "css"]);

type CodeSandboxProps = {
  /** Folder name inside components/ui-prototype/. */
  folder: string;
  /** File shown first, relative to the folder. */
  entry: string;
};

function directoryOf(filePath: string) {
  return filePath.includes("/") ? filePath.slice(0, filePath.lastIndexOf("/")) : "";
}

/** Folders first, then files, matching an editor's file explorer. */
function compareFilePaths(a: string, b: string) {
  const dirA = directoryOf(a);
  const dirB = directoryOf(b);
  if (dirA !== dirB) {
    if (!dirA) return 1;
    if (!dirB) return -1;
    return dirA.localeCompare(dirB);
  }
  return a.localeCompare(b);
}

async function loadFile(root: string, filePath: string): Promise<SandboxFile> {
  const source = await readFile(path.join(root, filePath), "utf8");
  // Drop the final newline so the viewer doesn't number an empty last line.
  const code = source.replace(/\r?\n$/, "");
  const language = path.extname(filePath).slice(1);
  const html = await codeToHtml(code, { lang: language, theme: "github-dark-default" });
  return { path: filePath, language, lineCount: code.split("\n").length, html };
}

/** Reads a prototype's source at build time and renders it in a read-only editor. */
export default async function CodeSandbox({ folder, entry }: CodeSandboxProps) {
  const root = path.join(SOURCE_ROOT, folder);
  const names = await readdir(root, { recursive: true });
  const filePaths = names
    .map((name) => name.split(path.sep).join("/"))
    .filter((name) => CODE_EXTENSIONS.has(path.extname(name).slice(1)))
    .sort(compareFilePaths);

  if (!filePaths.includes(entry)) {
    throw new Error(`CodeSandbox: "${entry}" not found in components/ui-prototype/${folder}`);
  }

  const files = await Promise.all(filePaths.map((filePath) => loadFile(root, filePath)));

  return <CodeSandboxViewer folder={folder} entry={entry} files={files} />;
}
