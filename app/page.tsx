import Link from "next/link";

const values = [
  {
    icon: "📖",
    title: "Continuous Learning",
    body: "Learning is a continuous process that must be executed on a single-day basis — to grow as a person and advance in a career path. Every day is a chance to pick up something new.",
  },
  {
    icon: "🎵",
    title: "Discipline from Classical Music",
    body: "As a kid studying classical music, I learned that it might take an hour to finish a scale, months to master a baroque piece — and it will take equal time and effort to build a stable technology stack. Hard work and self-discipline transfer directly into engineering.",
  },
  {
    icon: "⚡",
    title: "Hack to Learn, Build to Ship",
    body: "I enjoy hacking on various prototypes to prove my points of view and pitch ideas. But I also follow the rules when building production-ready features — knowing when to move fast and when to be methodical is the craft.",
  },
  {
    icon: "🛠️",
    title: "Technology Debates & POCs",
    body: "I enjoy coding, solving problems, and debating over technology choices. The best way to resolve a debate? Build a proof-of-concept and let the results speak.",
  },
];

const highlights = [
  { value: "14+", label: "Years of Engineering" },
  { value: "LinkedIn & Meta", label: "Recent Employers" },
  { value: "Staff → EM", label: "IC & Leadership Track" },
  { value: "3 Languages", label: "English · Vietnamese · French" },
];

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
          <p className="text-slate-400 text-sm font-mono tracking-widest uppercase mb-5">
            Introduction
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-5">
            Hi, I&apos;m Khanh Dao
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
            Staff Software Engineer and Engineering Manager with 14+ years of experience
            leading high-impact engineering organizations at{" "}
            <span className="text-[#70B5F9] font-medium">LinkedIn</span> and{" "}
            <span className="text-[#6EA8FE] font-medium">Meta</span>.
          </p>

          {/* Dr. Seuss quote */}
          <blockquote className="border-l-2 border-slate-600 pl-5 mb-10">
            <p className="text-slate-300 text-base sm:text-lg italic leading-relaxed">
              &ldquo;The more that you read, the more things you will know.
              The more that you learn, the more places you&apos;ll go.&rdquo;
            </p>
            <cite className="block text-slate-500 text-sm mt-2 not-italic">
              — Dr. Seuss
            </cite>
          </blockquote>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              View Résumé →
            </Link>
            <a
              href="mailto:kareendao88@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 text-slate-300 px-5 py-2.5 text-sm font-semibold hover:border-slate-500 hover:text-white transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </header>

      {/* ── AT A GLANCE ──────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {highlights.map((h) => (
            <div key={h.label} className="text-center">
              <div className="text-lg font-bold text-slate-900 tracking-tight">{h.value}</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        {/* ── PHILOSOPHY ─────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading>Philosophy & Values</SectionHeading>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-slate-100 bg-slate-50 p-6 hover:border-slate-200 transition-colors"
              >
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ──────────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeading>About Me</SectionHeading>
          <div className="mt-8 space-y-5 text-base text-slate-600 leading-7 max-w-2xl">
            <p>
              I enjoy coding, solving problems, and debating over choices of technologies —
              then doing various prototypes to prove my points of view. Learning is indeed
              a continuous process that must be executed on a single-day basis, in order to
              grow as a person and advance in a career path.
            </p>
            <p>
              One thing I&apos;ve learned from studying classical music as a kid was the
              importance of hard work and self-discipline. It might take an hour to finish
              a scale, yet it might take months to master a &ldquo;baroque,&rdquo; and it
              will take time and effort to build a stable stack.
            </p>
            <p>
              Hack (a lot) to learn and practice new things, to pitch your ideas. And follow
              the rules to build a prod-ready feature.
            </p>
            <p className="text-slate-400 italic text-sm">
              Random fact: coding and classical music are related :)
            </p>
          </div>
        </section>

        {/* ── CONNECT ────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading>Connect</SectionHeading>
          <div className="mt-8 flex flex-wrap gap-4">
            <ContactCard
              label="Email"
              value="kareendao88@gmail.com"
              href="mailto:kareendao88@gmail.com"
            />
            <ContactCard
              label="Phone"
              value="(408) 693-0409"
              href="tel:4086930409"
            />
            <ContactCard
              label="LinkedIn"
              value="khanh-dao-23062119"
              href="https://linkedin.com/in/khanh-dao-23062119"
              external
            />
            <ContactCard
              label="GitHub"
              value="github.com/lelea2"
              href="https://github.com/lelea2"
              external
            />
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 Khanh Dao &mdash; Staff Software Engineer
          </p>
          <div className="flex gap-5 text-sm">
            <a href="mailto:kareendao88@gmail.com" className="text-slate-400 hover:text-slate-900 transition-colors">
              Email
            </a>
            <a href="https://linkedin.com/in/khanh-dao-23062119" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/lelea2" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── SHARED COMPONENTS ──────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">{children}</h2>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function ContactCard({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex flex-col rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 hover:border-slate-300 hover:bg-white transition-all min-w-[160px]"
    >
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-800 break-all">{value}</span>
    </a>
  );
}
