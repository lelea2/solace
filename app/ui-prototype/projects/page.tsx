import Link from "next/link";
import Projects from "@/components/ui-prototype/projects/Projects";

export const metadata = {
  title: "Projects — UI Prototype",
  description: "A showcase of shipped projects with live links and screenshots.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/ui-prototype"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
        >
          ← Back to UI Prototype
        </Link>

        <p className="text-slate-400 text-sm font-mono tracking-widest uppercase mb-4">
          UI Prototype · Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Projects</h1>
        <p className="text-slate-400 text-lg mb-16">
          A few live projects I&apos;ve built, deployed on Vercel. Click a card to open it.
        </p>

        <Projects />
      </div>
    </div>
  );
}
