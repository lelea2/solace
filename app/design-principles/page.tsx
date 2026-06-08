import Link from "next/link";

export const metadata = {
  title: "Design Principles — Real-Time Dashboard at Scale",
  description:
    "Staff engineer level frontend system design principles for building real-time dashboards handling millions of events.",
};

function SectionHeader({
  number,
  title,
  color = "indigo",
}: {
  number: number;
  title: string;
  color?: string;
}) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    sky: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-full border text-xs font-bold shrink-0 ${colors[color]}`}
      >
        {number}
      </span>
      <h2 className="text-lg font-semibold text-white tracking-tight">{title}</h2>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-900 p-6 ${className}`}>
      {children}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-3 rounded-lg bg-slate-950 border border-slate-800 p-4 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre">
      {children}
    </pre>
  );
}

function Badge({ label, variant }: { label: string; variant: "good" | "bad" | "neutral" }) {
  const styles = {
    good: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    bad: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    neutral: "bg-slate-700/50 text-slate-400 border-slate-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium ${styles[variant]}`}>
      {variant === "good" ? "✓" : variant === "bad" ? "✕" : "•"} {label}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-700">
      {children}
    </span>
  );
}

export default function DesignPrinciplesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Home
            </Link>
            <span className="text-slate-700">/</span>
            <span className="text-slate-400 text-sm">Design Principles</span>
          </div>
          <p className="text-indigo-400 text-sm font-mono tracking-widest uppercase mb-3">
            Frontend System Design
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Real-Time Dashboard at Scale
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Design a real-time dashboard handling millions of events, thousands of concurrent users,
            and live updates without impacting performance.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["23.4K events/sec", "98.7K concurrent users", "1,345 dashboards", "p99 < 2s"].map((stat) => (
              <Pill key={stat}>{stat}</Pill>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 1. Requirements */}
          <Card className="md:col-span-2">
            <SectionHeader number={1} title="Requirements Gathering" color="indigo" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Functional</p>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {[
                    "Live metrics & real-time charts",
                    "Alert notifications",
                    "User management",
                    "Search & filtering",
                    "Historical data",
                    "Export reports",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Non-Functional</p>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {[
                    "Page load < 2 seconds",
                    "Updates every second",
                    "10K+ concurrent users",
                    "Responsive UI",
                    "Fault tolerant",
                    "Accessibility (WCAG 2.1)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* 2. Architecture */}
          <Card className="md:col-span-2">
            <SectionHeader number={2} title="High-Level Architecture" color="sky" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                {
                  title: "Backend APIs",
                  sub: "REST / GraphQL",
                  desc: "Initial data, user management, historical queries",
                  color: "border-sky-500/30 bg-sky-500/5",
                },
                {
                  title: "WebSocket Server",
                  sub: "Real-time updates",
                  desc: "Live metrics push, alert notifications, presence",
                  color: "border-indigo-500/30 bg-indigo-500/5",
                },
                {
                  title: "Frontend Dashboard",
                  sub: "React Application",
                  desc: "State management, rendering, caching, charts, tables",
                  color: "border-violet-500/30 bg-violet-500/5",
                },
              ].map(({ title, sub, desc, color }) => (
                <div key={title} className={`rounded-lg border p-4 ${color}`}>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-xs text-slate-400 mb-2">{sub}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              REST/GraphQL handles initial data loads and mutations. WebSocket carries live updates. The frontend
              maintains a unified state store fed by both channels — never duplicate sources of truth.
            </p>
          </Card>

          {/* 3. Folder Structure */}
          <Card>
            <SectionHeader number={3} title="Frontend Folder Structure" color="emerald" />
            <Code>{`src/
  pages/          # Route-based pages
  components/     # Reusable components
  features/       # Feature-based modules
  services/       # API calls, clients
  hooks/          # Custom React hooks
  store/          # Global state (Redux/Zustand)
  utils/          # Utility functions
  layouts/        # Layout components
  charts/         # Chart components
  websocket/      # WebSocket logic`}</Code>
            <p className="text-xs text-slate-500 mt-3">
              Feature-based modules own their own components, hooks, and local state — reducing cross-feature coupling.
            </p>
          </Card>

          {/* 4. Component Hierarchy */}
          <Card>
            <SectionHeader number={4} title="Dashboard Component Hierarchy" color="violet" />
            <div className="text-sm space-y-1 font-mono text-slate-300">
              <p className="text-violet-400 font-semibold">Dashboard</p>
              {[
                ["├─ Header", 1],
                ["├─ Sidebar", 1],
                ["├─ MetricsSection", 1],
                ["│  ├─ RevenueCard", 2],
                ["│  ├─ UsersCard", 2],
                ["│  └─ OrdersCard", 2],
                ["├─ ChartsSection", 1],
                ["│  ├─ RevenueChart", 2],
                ["│  ├─ TrafficChart", 2],
                ["│  └─ CPUChart", 2],
                ["├─ AlertsPanel", 1],
                ["└─ ActivityFeed", 1],
              ].map(([label, depth]) => (
                <p key={label} style={{ paddingLeft: `${(depth as number) * 12}px` }} className="text-xs">
                  {label}
                </p>
              ))}
            </div>
          </Card>

          {/* 5. State Management */}
          <Card className="md:col-span-2">
            <SectionHeader number={5} title="State Management Strategy" color="amber" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                  Global Client State — Redux / Zustand
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["auth", "userPreferences", "webSocketStatus", "alerts"].map((k) => (
                    <Pill key={k}>{k}</Pill>
                  ))}
                </div>
                <Code>{`// Zustand store slice
const useUIStore = create((set) => ({
  webSocketStatus: 'disconnected',
  alerts: [],
  setStatus: (s) => set({ webSocketStatus: s }),
  addAlert: (a) =>
    set((state) => ({ alerts: [...state.alerts, a] })),
}));`}</Code>
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3">
                  Server State — TanStack Query
                </p>
                <ul className="text-sm text-slate-300 space-y-1.5 mb-3">
                  <li className="flex gap-2"><Badge label="use" variant="good" /> useQuery for data fetches</li>
                  <li className="flex gap-2"><Badge label="use" variant="good" /> useInfiniteQuery for tables</li>
                  <li className="flex gap-2"><Badge label="avoid" variant="bad" /> Storing server responses in Redux</li>
                </ul>
                <Code>{`const { data } = useQuery({
  queryKey: ['dashboard', userId],
  queryFn: fetchDashboard,
  staleTime: 5_000,
  refetchInterval: 30_000,
});`}</Code>
              </div>
            </div>
          </Card>

          {/* 6. WebSocket Design */}
          <Card className="md:col-span-2">
            <SectionHeader number={6} title="Real-Time Updates — WebSocket Design" color="rose" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Badge label="Bad — Multiple connections" variant="bad" />
                <p className="text-xs text-slate-400 mt-2 mb-2">
                  Each chart component opens its own WebSocket. Results in high overhead, race conditions, and
                  dropped messages.
                </p>
                <Code>{`// ❌ Each component connects independently
function RevenueChart() {
  const ws = new WebSocket('/ws');
  ws.onmessage = (e) => setData(parse(e));
}
function TrafficChart() {
  const ws = new WebSocket('/ws'); // duplicate!
}`}</Code>
              </div>
              <div>
                <Badge label="Good — Single service + fan-out" variant="good" />
                <p className="text-xs text-slate-400 mt-2 mb-2">
                  One singleton WebSocket service. Distributes events to the state store; components subscribe
                  only to what they need.
                </p>
                <Code>{`// ✓ Singleton service, fan-out via store
class WebSocketService {
  connect() {
    this.ws = new WebSocket('/ws');
    this.ws.onmessage = ({ data }) => {
      const event = JSON.parse(data);
      store.dispatch(handleLiveEvent(event));
    };
  }
}`}</Code>
              </div>
            </div>
          </Card>

          {/* 7. 1000+ updates/sec */}
          <Card className="md:col-span-2">
            <SectionHeader number={7} title="Handling 1000+ Updates / Second" color="rose" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Badge label="Naive — dispatch per event" variant="bad" />
                <Code>{`// ❌ 1000 dispatches/sec → UI freezes
socket.on('metric', (data) => {
  dispatch(updateMetric(data)); // every single event
});`}</Code>
              </div>
              <div>
                <Badge label="Better — buffer + flush" variant="good" />
                <Code>{`// ✓ Buffer updates, flush every 1 sec
const buffer = [];
socket.on('metric', (data) => {
  buffer.push(data);
});

setInterval(() => {
  if (buffer.length === 0) return;
  dispatch(batchUpdateMetrics(buffer.splice(0)));
}, 1000); // one re-render per second`}</Code>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Batching reduces React reconciliations from 1000/sec to 1/sec. Pair with{" "}
              <code className="text-slate-400 bg-slate-800 px-1 rounded">startTransition</code> to keep
              interactions responsive while background updates are pending.
            </p>
          </Card>

          {/* 8. Rendering Optimization */}
          <Card>
            <SectionHeader number={8} title="Rendering Optimization" color="emerald" />
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                ["React.memo", "Skip re-renders for stable props"],
                ["useMemo", "Memoize expensive calculations"],
                ["useCallback", "Stable function references for children"],
                ["Code Splitting", "lazy() + Suspense per route/feature"],
                ["Virtualization", "Only render visible rows/cells"],
                ["Key props", "Stable keys prevent full subtree remounts"],
              ].map(([api, desc]) => (
                <li key={api} className="flex items-start gap-3">
                  <code className="text-emerald-400 text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                    {api}
                  </code>
                  <span className="text-slate-400 text-xs leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
            <Code>{`// Avoid inline functions — new ref every render
// ❌ <Chart onHover={() => setHovered(id)} />
// ✓
const handleHover = useCallback(
  () => setHovered(id), [id]
);
<Chart onHover={handleHover} />`}</Code>
          </Card>

          {/* 9 + 10. Chart & Table Optimization */}
          <Card>
            <SectionHeader number={9} title="Chart & Table Optimization" color="amber" />
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">Charts</p>
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge label="50k points" variant="bad" />
                    <span className="text-slate-400 text-xs">Don&apos;t render all data points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label="Last 1k pts" variant="good" />
                    <span className="text-slate-400 text-xs">Window to visible range</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label="Downsample" variant="good" />
                    <span className="text-slate-400 text-xs">LTTB algorithm → 500 representative pts</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-2">Tables</p>
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge label="60k rows" variant="bad" />
                    <span className="text-slate-400 text-xs">Never render all rows to DOM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label="react-window" variant="good" />
                    <span className="text-slate-400 text-xs">Only visible rows rendered</span>
                  </div>
                </div>
              </div>
              <Code>{`import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={60_000}
  itemSize={40}
  width="100%"
>
  {({ index, style }) => (
    <Row style={style} data={rows[index]} />
  )}
</FixedSizeList>`}</Code>
            </div>
          </Card>

          {/* 11. Data Fetching */}
          <Card className="md:col-span-2">
            <SectionHeader number={11} title="Data Fetching Strategy" color="sky" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3">
                  Initial Load — Parallel Requests
                </p>
                <Code>{`// Fire all requests in parallel, not waterfall
const [summary, settings, history, filters] =
  await Promise.all([
    fetchDashboardSummary(),
    fetchUserSettings(),
    fetchHistoricalData({ range: '7d' }),
    fetchFilterOptions(),
  ]);`}</Code>
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                  Caching Strategy
                </p>
                <div className="space-y-2 text-sm">
                  {[
                    ["High freshness", "5 sec", "Live metrics, alerts"],
                    ["Medium freshness", "30 sec", "User counts, summaries"],
                    ["Low freshness", "60 sec", "Config, filter options"],
                  ].map(([tier, ttl, example]) => (
                    <div key={tier} className="flex items-center gap-3 text-xs">
                      <span className="text-slate-300 w-28">{tier}</span>
                      <code className="text-amber-400 w-14">{ttl}</code>
                      <span className="text-slate-500">{example}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Set <code className="text-slate-400">staleTime</code> per query key — don&apos;t apply a
                  single TTL globally.
                </p>
              </div>
            </div>
          </Card>

          {/* 12. Error Handling */}
          <Card>
            <SectionHeader number={12} title="Error Handling & Resilience" color="rose" />
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  WebSocket Connection States
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["Loading", "text-slate-400"],
                    ["Connected", "text-emerald-400"],
                    ["Reconnecting", "text-amber-400"],
                    ["Disconnected", "text-rose-400"],
                    ["Offline", "text-slate-500"],
                    ["Error", "text-rose-500"],
                  ].map(([state, color]) => (
                    <span key={state} className={`text-xs font-mono ${color}`}>
                      {state}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  Exponential Backoff Reconnect
                </p>
                <p className="text-xs text-slate-400 font-mono">1s → 2s → 4s → 8s → 16s → …</p>
              </div>
              <Code>{`function reconnect(attempt = 0) {
  const delay = Math.min(1000 * 2 ** attempt, 30_000);
  setTimeout(() => {
    ws = new WebSocket(WS_URL);
    ws.onerror = () => reconnect(attempt + 1);
    ws.onopen  = () => { attempt = 0; }; // reset
  }, delay);
}`}</Code>
              <p className="text-xs text-slate-500">
                Show user-friendly status banners. Always expose a manual &ldquo;Retry&rdquo; button — never leave users
                staring at stale data silently.
              </p>
            </div>
          </Card>

          {/* 13. Security */}
          <Card>
            <SectionHeader number={13} title="Security Considerations" color="rose" />
            <ul className="space-y-3 text-sm">
              {[
                {
                  label: "Authentication",
                  detail: "Cookie / JWT / SSO — prefer HttpOnly cookies; never localStorage for tokens",
                },
                {
                  label: "Authorization",
                  detail: "Role-based access (Admin, Operator, Viewer) enforced server-side, not just in UI",
                },
                {
                  label: "XSS Protection",
                  detail: "Sanitize all user input; avoid dangerouslySetInnerHTML; use DOMPurify when HTML is needed",
                },
                {
                  label: "CSP",
                  detail: "Content-Security-Policy headers — restrict script/connect sources",
                },
                {
                  label: "No secrets on client",
                  detail: "Never expose API keys, internal URLs, or sensitive config in browser bundle",
                },
              ].map(({ label, detail }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="text-rose-400 text-xs font-semibold mt-0.5 shrink-0">{label}</span>
                  <span className="text-slate-400 text-xs leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* 14. Monitoring */}
          <Card>
            <SectionHeader number={14} title="Monitoring & Observability" color="violet" />
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">
                  Core Web Vitals
                </p>
                <div className="flex gap-4 text-xs font-mono">
                  {["LCP", "INP", "CLS"].map((v) => (
                    <span key={v} className="text-violet-300 bg-violet-500/10 px-2 py-1 rounded border border-violet-500/20">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Track</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  {[
                    "JS errors & unhandled promise rejections",
                    "WebSocket disconnects & reconnect rate",
                    "API failures & slow queries (p95, p99)",
                    "User-perceived rendering time per chart",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-violet-400 shrink-0">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Sentry", "Datadog", "New Relic", "Grafana"].map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
              </div>
            </div>
          </Card>

          {/* 15. Scaling */}
          <Card className="md:col-span-2">
            <SectionHeader number={15} title="Scaling to Millions of Events" color="emerald" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
                  Frontend Scaling
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  {[
                    "Code splitting — lazy load heavy chart libs",
                    "Virtualization — react-window for all lists",
                    "Chart downsampling — LTTB / min-max",
                    "Memoization — React.memo + useMemo",
                    "Efficient state updates — batch + transition",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3">
                  Backend / Platform Scaling
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  {[
                    "WebSocket clustering via Redis pub/sub",
                    "Event aggregation before push",
                    "Horizontal scaling behind load balancer",
                    "CDN for all static assets",
                    "gzip / Brotli compression",
                    "Database sharding by tenant",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-sky-400 shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 px-4 py-3">
              <p className="text-emerald-400 text-xs font-semibold">Goal</p>
              <p className="text-slate-300 text-sm mt-1">
                Handle <strong>10× more data</strong> without compromising UX — each optimization
                must be measurable, not just theoretical.
              </p>
            </div>
          </Card>

          {/* 16. Senior Engineer Mindset */}
          <Card className="md:col-span-2 border-indigo-500/30 bg-indigo-500/5">
            <SectionHeader number={16} title="Senior Engineer Mindset" color="indigo" />
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-4">
                <p className="text-xs font-semibold text-rose-400 mb-2">Junior Engineer Asks</p>
                <p className="text-sm text-slate-300 italic">
                  &ldquo;How do I build this chart?&rdquo;
                </p>
              </div>
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
                <p className="text-xs font-semibold text-emerald-400 mb-2">Senior Engineer Asks</p>
                <p className="text-sm text-slate-300 italic">
                  &ldquo;How do I keep this dashboard responsive when it receives 1 million events per
                  minute, serves 100,000 users, and continues to work during partial failures?&rdquo;
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-5 leading-relaxed">
              Great dashboards are not built with more components, but with the right architecture,
              performance optimizations, and resilience patterns applied at every layer.
            </p>
          </Card>

        </div>
      </div>
    </div>
  );
}
