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
  {
    title: "AI Collaborative Document Workspace",
    href: "https://ai-workspaces-production.up.railway.app/",
    screenshot: "/ui-prototype/projects/ai-collaboration.png",
    description:
      "A web application where humans and AI agents draft, review, and refine documents together in one editor, with full version history and decision tracking.",
  },
  {
    title: "AI Interview Prep Tracker",
    href: "https://interview-prep-production-1d06.up.railway.app/",
    screenshot: "/ui-prototype/projects/interview-prep.png",
    description:
      "Paste messy job-search notes and get a structured tracker — active opportunities, upcoming interviews, follow-ups due, and high-priority prep topics, all organized into a sortable, filterable table.",
  },
  {
    title: "Learning Radar",
    href: "https://track-learning-resource-production.up.railway.app/",
    screenshot: "/ui-prototype/projects/learning-radar.png",
    description:
      "Turns scattered learning links into a structured, sortable study tracker — paste an article URL or note to auto-parse it into a row, plan today's study time by priority, and track reading progress over the last 14 days.",
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
      <VideoCard
        title="Feature Drift"
        description={
          <>
            A short demo recording — click to play. See the{" "}
            <a
              href="https://project-slide-demo.vercel.app/mlops-observability-demo.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 underline hover:text-white"
            >
              architecture design
            </a>
            .
          </>
        }
        src="/ui-prototype/projects/featuredrift.mov"
      />
    </div>
  );
}
