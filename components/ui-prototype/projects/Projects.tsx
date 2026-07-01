import VideoCard from "@/components/ui-prototype/projects/VideoCard";

const projects = [
  {
    title: "Sport Event App",
    href: "https://sport-event-app.vercel.app/",
    screenshot: "/ui-prototype/projects/sport-event-app.png",
    description:
      "Find and register for local sports tournaments — browse soccer, pickleball, and basketball events, join a team or sign up individually, and track registrations in a personal dashboard.",
  },
  {
    title: "Cafe Totoro",
    href: "https://cafe-totoro.vercel.app/",
    screenshot: "/ui-prototype/projects/cafe-totoro.png",
    description:
      "A marketing site for a Totoro-themed specialty coffee shop in Da Lat, Vietnam — menu, customer reviews, directions, and a table reservation form.",
  },
  {
    title: "Viet Local Closet AI",
    href: "https://viet-local-closet-ai.vercel.app/",
    screenshot: "/ui-prototype/projects/viet-local-closet-ai.png",
    description:
      "An AI styling assistant for Vietnamese womenswear — builds a profile from style and fit preferences, then recommends outfits sourced from local brands and learns from feedback over time.",
  },
  {
    title: "Vietnam Sightseeing",
    href: "https://vietnam-sightseeing.vercel.app/",
    screenshot: "/ui-prototype/projects/vietnam-sightseeing.png",
    description:
      "A mobile-first travel guide for Saigon and Hanoi — curated, district-organized recommendations with a voice agent that narrates the history and highlights of each spot.",
  },
];

export default function Projects() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {projects.map((project) => (
        <a
          key={project.href}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-slate-600 transition-colors"
        >
          <div
            className="relative w-full bg-slate-800 overflow-hidden"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={`Screenshot of ${project.title}`}
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-semibold text-white group-hover:text-slate-100 mb-2">
              {project.title} ↗
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {project.description}
            </p>
          </div>
        </a>
      ))}
      <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div
          className="relative w-full bg-slate-800 overflow-hidden"
          style={{ aspectRatio: "16 / 9" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ui-prototype/projects/ai-collaboration.png"
            alt="Preview of AI Document Collaboration"
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "top", opacity: 0.5 }}
          />
          <span className="absolute top-3 right-3 rounded-full bg-amber-400 text-slate-900 text-xs font-semibold px-3 py-1">
            Coming Soon
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-white mb-2">
            AI Document Collaboration
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            A real-time workspace where AI agents draft, review, and suggest
            edits inline alongside human collaborators. In progress.
          </p>
        </div>
      </div>
      <VideoCard
        title="Feature Drift"
        description="A short demo recording — click to play."
        src="/ui-prototype/projects/featuredrift.mov"
      />
    </div>
  );
}
