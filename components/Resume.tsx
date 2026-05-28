const experience = [
  {
    role: "Staff Software Engineer — ML Observability",
    company: "LinkedIn",
    period: "Aug 2024 – Present",
    color: "#0A66C2",
    tag: "Current",
    highlights: [
      {
        title: "Led 0-to-1 Platform Launch",
        body: "Architected and delivered an enterprise ML Observability platform on Next.js from concept to production in 6 months. Built UX prototypes in Figma and ran user-study surveys; provides real-time monitoring and alerting across TensorFlow, PyTorch, GR, and LLM inference models.",
      },
      {
        title: "Drove 90% Operational Efficiency",
        body: "Unified telemetry data across model training, serving, and product engineering teams — cutting MTTD and MTTR from hours to minutes.",
      },
      {
        title: "Scaled Agentic AI from POC to Production",
        body: "Partnered with a 3-person team to build a Claude-powered agentic proof-of-concept; championed its expansion into Agent Copilot, a production-grade chat interface enabling autonomous feature-drift detection, anomaly analysis, and model lineage tracing. Leveraged LangChain to monitor agent input/output quality.",
      },
      {
        title: "AI Compliance & Risk Leadership",
        body: "Directed engineering audits for EU DMA and AI Act compliance; led cross-functional partnership with Legal and Product to automate 70% of manual compliance validation workflows.",
      },
    ],
  },
  {
    role: "Software Engineer / Tech Lead — Ads Attribution",
    company: "Meta",
    period: "Sep 2021 – Aug 2024",
    color: "#0866FF",
    highlights: [
      {
        title: "AI-Driven Revenue Growth (+0.5%)",
        body: "Partnered with AI Research and Data Science to pioneer a creative diversity framework using embedding models (Hamming distance + normalization) across Python, Hack, and JavaScript, scaling ads creative differentiation.",
      },
      {
        title: "Built 0-to-1 Insights Platform (+1.1% revenue)",
        body: "Conceived and launched a Peer Benchmark CPR insights product from scratch. Iterated with designers on Video Insights metrics and UX in Ads Manager, resulting in an additional 0.57% revenue lift.",
      },
      {
        title: "Rendering Performance Champion",
        body: "Sustained application reliability and latency scores of 98–99.5% across a 3-year tenure, consistently exceeding the 95% organization threshold.",
      },
    ],
  },
  {
    role: "Engineering Manager — LinkedIn Sales Insights (LSI)",
    company: "LinkedIn",
    period: "Nov 2020 – Sep 2021",
    color: "#0A66C2",
    highlights: [
      {
        title: "Redesigned LSI Experience (+40% renewals)",
        body: "Partnered with Product and UX to define a new license renewal and seat approval flow, streamlining the end-to-end process and driving a 40% increase in subscription renewals.",
      },
      {
        title: "Grew & Led Engineering Team",
        body: "Owned end-to-end data platform delivery for LinkedIn Sales Insights; scaled the engineering organization from 6 to 10+ engineers, managing hiring, onboarding, and performance.",
      },
      {
        title: "Cross-functional Alignment",
        body: "Synced technology roadmaps with multi-functional executives across Sales Ops, Marketing, and Product to manage infrastructure budgets and evaluate developer tooling investments.",
      },
    ],
  },
  {
    role: "Staff Software Engineer / Tech Lead — LinkedIn Company Pages",
    company: "LinkedIn",
    period: "Oct 2018 – Nov 2020",
    color: "#0A66C2",
    highlights: [
      {
        title: "Technical Leadership of 10+ Engineers",
        body: "Directed architecture, site redesigns, and performance strategy as Tech Lead; launched flagship 0-to-1 products including LinkedIn Product Pages.",
      },
      {
        title: "50% Timeline Reduction via Custom Tooling",
        body: "Architected an enterprise-wide codemod for a major platform migration, accelerating developer velocity and halving initial delivery estimates across 15 frontend infrastructure teams.",
      },
      {
        title: "Accessibility Champion",
        body: "Cross-team led effort to achieve WCAG Grade C accessibility; authored lint rules, e2e testing standards, and conducted team brown-bags on best practices.",
      },
      {
        title: "People Management & Innovation",
        body: "Served as people manager and mentor for 5+ junior and apprentice engineers. Secured Top 10 finish in a company-wide hackathon building a Next.js Coffee Chat portal with smart Outlook Calendar scheduling.",
      },
    ],
  },
  {
    role: "Principal / Staff Software Engineer — Prosoft",
    company: "Realtor.com (Move Inc.)",
    period: "Mar 2016 – Oct 2018",
    color: "#C8102E",
    highlights: [
      {
        title: "Team Leadership & Serverless Architecture",
        body: "Led 7+ engineers and QA as Tech Lead; architected a serverless transaction-management ecosystem for real estate agency and brokerage onboarding using Rails, React/Redux, and async processing via AWS SNS/SQS on ECS. Built a web app and Chrome extension for broker workflow management.",
      },
      {
        title: "60% Reduction in Engineering Overhead",
        body: "Spearheaded full migration from AngularJS to React (Flux), rewriting build pipelines and establishing strict unit-testing standards; built AWS Lambda (Node.js) API gateway microservices.",
      },
      {
        title: "Shared Component Library",
        body: "Evangelized and built the Prosoft shared UI component library — 30+ components in ~6 months — leveraging Storybook for component management and documentation, adopted across multiple business units.",
      },
    ],
  },
  {
    role: "Senior Software Engineer — Web Core Team",
    company: "Quotient Technology (formerly Coupons.com)",
    period: "Feb 2012 – Feb 2016",
    color: "#2563EB",
    highlights: [
      {
        title: "+20% Pre-IPO Revenue Impact",
        body: "Architected and built the core print-flow engine using HTML5 WebSockets and PDF printing; stabilized and optimized this business-critical pipeline, directly contributing to a +20% revenue increase ahead of IPO.",
      },
      {
        title: "Responsive Framework Lead",
        body: "Led a 4-engineer team to design and launch the foundational Coupons.com responsive framework, built on Node.js, Kraken.js, and Backbone/Marionette.",
      },
      {
        title: "Multi-Tenant Platform",
        body: "Engineered an in-house configuration engine supporting dynamic multi-tenant partner theming across the entire platform. Drove migration of the Coupons AdCaster from a .NET monolith to a high-throughput Java/Handlebars architecture.",
      },
    ],
  },
];

const skills = [
  {
    category: "Frontend Platform",
    items: ["React", "Next.js", "TypeScript", "Flow", "Redux", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Developer Tooling",
    items: ["CI/CD", "Codemods", "Storybook", "Bundle Optimization", "Profiling", "Lint Rules", "Jest", "Playwright", "Selenium"],
  },
  {
    category: "AI / ML Infrastructure",
    items: ["Agentic Workflows", "Claude / GenAI", "Embedding Models", "LangChain", "TensorFlow Monitoring", "PyTorch Monitoring"],
  },
  {
    category: "Cloud & APIs",
    items: ["AWS ECS", "AWS Lambda", "SNS/SQS", "Microservices", "REST", "gRPC", "GraphQL", "Serverless"],
  },
  {
    category: "Languages",
    items: ["JavaScript / TypeScript", "Python", "Hack / PHP", "Java", "Ruby on Rails"],
  },
];

const stats = [
  { value: "14+", label: "Years Experience" },
  { value: "+1.1%", label: "Revenue Lift (Meta)" },
  { value: "90%", label: "Ops Efficiency Gain" },
  { value: "70%", label: "Compliance Automation" },
];

export default function Resume() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* ── RESUME HEADER ────────────────────────────────────── */}
      <header className="bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <p className="text-slate-400 text-sm font-mono tracking-widest uppercase mb-3">
            Résumé
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Khanh Dao
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Staff Software Engineer &middot; UI Platform &middot; Developer Experience
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <a href="mailto:kareendao88@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <MailIcon /> kareendao88@gmail.com
            </a>
            <span className="text-slate-700">·</span>
            <a href="tel:4086930409" className="flex items-center gap-2 hover:text-white transition-colors">
              <PhoneIcon /> (408) 693-0409
            </a>
            <span className="text-slate-700">·</span>
            <a href="https://linkedin.com/in/khanh-dao-23062119" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <LinkedInIcon /> LinkedIn
            </a>
            <span className="text-slate-700">·</span>
            <a href="https://github.com/lelea2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <GitHubIcon /> github.com/lelea2
            </a>
          </div>
        </div>
      </header>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        {/* ── TIMELINE ───────────────────────────────────────── */}
        <section className="mb-24">
          <SectionHeading>Work History</SectionHeading>
          <div className="relative mt-10">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />
            <div className="space-y-14">
              {experience.map((job, i) => (
                <div key={i} className="relative pl-10">
                  <span
                    className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-[3px] border-white shadow-sm"
                    style={{ backgroundColor: job.color }}
                  />
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 leading-snug">{job.role}</h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: job.color }}>{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {job.tag && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {job.tag}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-mono whitespace-nowrap">{job.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {job.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-800">{h.title}: </span>
                        {h.body}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ─────────────────────────────────────────── */}
        <section className="mb-24">
          <SectionHeading>Technical Skills</SectionHeading>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div key={group.category} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ──────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeading>Education</SectionHeading>
          <div className="mt-8 space-y-5">
            <EducationItem
              degree="M.S. in Computer Engineering"
              school="San José State University"
              note="Graduated with Honors, May 2017"
            />
            <EducationItem
              degree="B.S. in Computer Science, Minor in Mathematics"
              school="San José State University"
              note="Graduated with Honors, Dec 2011"
            />
          </div>
        </section>

        {/* ── CERTIFICATIONS ─────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeading>Certifications</SectionHeading>
          <div className="mt-8 space-y-3">
            {[
              { name: "Build Long-Context AI Apps with Jamba", org: "DeepLearning.AI", date: "Mar 2026" },
              { name: "Leadership Foundations", org: "LinkedIn Learning", date: "Aug 2021" },
              { name: "Microservices: Design Patterns", org: "LinkedIn Learning", date: "Jan 2021" },
              { name: "Software Architecture Foundations", org: "LinkedIn Learning", date: "May 2020" },
              { name: "Ethical Hacking with JavaScript", org: "LinkedIn Learning", date: "Jan 2019" },
            ].map((cert) => (
              <div key={cert.name} className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="text-sm font-semibold text-slate-900">{cert.name}</p>
                  <p className="text-sm text-slate-500">{cert.org}</p>
                  <p className="text-xs text-slate-400 font-mono">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">&copy; 2026 Khanh Dao &mdash; Staff Software Engineer</p>
          <div className="flex gap-5 text-sm">
            <a href="mailto:kareendao88@gmail.com" className="text-slate-400 hover:text-slate-900 transition-colors">Email</a>
            <a href="https://linkedin.com/in/khanh-dao-23062119" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">LinkedIn</a>
            <a href="https://github.com/lelea2" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">GitHub</a>
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

function EducationItem({ degree, school, note }: { degree: string; school: string; note: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 w-2 h-2 rounded-full bg-slate-300 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-slate-900">{degree}</p>
        <p className="text-sm text-slate-600">{school}</p>
        <p className="text-xs text-slate-400 mt-0.5 font-mono">{note}</p>
      </div>
    </div>
  );
}

/* ── ICONS ──────────────────────────────────────────────────── */

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
