import Link from "next/link";

export const metadata = {
  title: "UI Prototype — Khanh Dao",
  description: "A collection of UI prototype components and experiments.",
};

const prototypes = [
  {
    href: "/ui-prototype/counter",
    title: "Counter",
    description: "A simple counter component to verify project setup.",
    icon: "🔢",
  },
  {
    href: "/ui-prototype/analog-clock",
    title: "Analog Clock",
    description: "A simple analog clock component.",
    icon: "⏰",
  },
  {
    href: "/ui-prototype/auth-input",
    title: "Auth Input",
    description: "A simple auth input component.",
    icon: "🔑",
  },
  {
    href: "/ui-prototype/todo",
    title: "Todo List",
    description: "Add tasks, track them, and delete when done.",
    icon: "✅",
  },
  {
    href: "/ui-prototype/claude-chat-clone",
    title: "Claude Chat",
    description: "A simple Claude chat component prototype.",
    icon: "💬",
  },
  {
    href: "/ui-prototype/hacker-news",
    title: "Hacker News",
    description: "View the latest news from the hacker community.",
    icon: "🔥",
  },
  {
    href: "/ui-prototype/file-explorer",
    title: "File Explorer",
    description: "A simple file explorer component prototype.",
    icon: "📁",
  },
  {
    href: "/ui-prototype/accordion",
    title: "Accordion",
    description: "A simple accordion component prototype.",
    icon: "🗂️",
  },
  {
    href: "/ui-prototype/tab",
    title: "Tab",
    description: "A simple tab component prototype.",
    icon: "🏷️",
  },
  {
    href: "/ui-prototype/progress-bar",
    title: "Progress Bar",
    description: "A simple progress bar component prototype.",
    icon: "⏳",
  },
  {
    href: "/ui-prototype/birthyear-histogram",
    title: "Birth Year Histogram",
    description: "A simple birth year histogram component prototype.",
    icon: "📊",
  },
  {
    href: "/ui-prototype/star-rating",
    title: "Star Rating",
    description: "A simple star rating component prototype.",
    icon: "⭐",
  },
  {
    href: "/ui-prototype/pixel-art",
    title: "Pixel Art",
    description: "A simple pixel art component prototype.",
    icon: "🎨",
  },
  {
    href: "/ui-prototype/like-button",
    title: "Like Button",
    description: "A simple like button component prototype.",
    icon: "👍",
  },
  {
    href: "/ui-prototype/stop-watch",
    title: "Stop Watch",
    description: "A simple stop watch component prototype.",
    icon: "⏱️",
  },
  {
    href: "/ui-prototype/memory-game",
    title: "Memory Game",
    description: "A simple memory game component prototype.",
    icon: "🧠",
  },
  {
    href: "/ui-prototype/generate-table",
    title: "Generate Table",
    description: "A simple generate table component prototype.",
    icon: "📊",
  },
  {
    href: "/ui-prototype/signup-form",
    title: "Sign Up Form",
    description: "A simple sign up form component prototype.",
    icon: "📝",
  },
  {
    href: "/ui-prototype/book-flight",
    title: "Book Flight",
    description: "A simple book flight component prototype.",
    icon: "✈️",
  },
  {
    href: "/ui-prototype/mortgage-calculator",
    title: "Mortgage Calculator",
    description: "A simple mortgage calculator component prototype.",
    icon: "💰",
  },
  {
    href: "/ui-prototype/transfer-list",
    title: "Transfer List",
    description: "A simple transfer list form component prototype.",
    icon: "🔄",
  },
  {
    href: "/ui-prototype/tic-tac-toe",
    title: "Tic Tac Toe",
    description: "A simple Tic Tac Toe game component prototype.",
    icon: "❌",
  },
  {
    href: "/ui-prototype/grid-light",
    title: "Grid Light",
    description: "A simple Grid Light component prototype.",
    icon: "💡",
  },
  {
    href: "/ui-prototype/wordle",
    title: "Wordle",
    description: "A simple wordle game component prototype.",
    icon: "🔤",
  },
  {
    href: "/ui-prototype/user-database",
    title: "User Database",
    description: "A simple user database component prototype.",
    icon: "🗄️",
  },
  {
    href: "/ui-prototype/roll-dice",
    title: "Roll Dice",
    description: "A simple dice roller component prototype.",
    icon: "🎲",
  },
  {
    href: "/ui-prototype/traffic-light",
    title: "Traffic Light",
    description: "A simple traffic light component prototype.",
    icon: "🚦",
  },
  {
    href: "/ui-prototype/connect-four",
    title: "Connect Four",
    description: "A simple Connect Four game component prototype.",
    icon: "🎮",
  },
  {
    href: "/ui-prototype/whack-a-mole",
    title: "Whack-a-Mole",
    description: "A simple whack-a-mole game component prototype.",
    icon: "🐹",
  },
  {
    href: "/ui-prototype/holigrail-layout",
    title: "Holigrail Layout",
    description: "A simple holigrail layout component prototype.",
    icon: "🏗️",
  },
  {
    href: "/ui-prototype/draggable-cell",
    title: "Draggable Cell",
    description: "A simple draggable cell component prototype.",
    icon: "🖱️",
  },
  {
    href: "/ui-prototype/nested-checkbox",
    title: "Nested Checkbox",
    description: "A simple nested checkbox component prototype.",
    icon: "☑️",
  }
];

export default function UIPrototypePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-slate-400 text-sm font-mono tracking-widest uppercase mb-4">
          UI Prototype
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Component Lab</h1>
        <p className="text-slate-400 text-lg mb-12">
          A collection of prototype components and experiments. Click a tile to explore.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {prototypes.map(({ href, title, description, icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-600 hover:bg-slate-800/60 transition-all"
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <h2 className="text-base font-semibold text-white group-hover:text-slate-100 mb-1">
                  {title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
