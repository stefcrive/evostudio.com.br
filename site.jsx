import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Camera,
  Database,
  FlaskConical,
  Guitar,
  Lock,
  PenTool,
  ShieldCheck,
  Wallet,
} from 'lucide-react';

const guitarVideo = new URL('./images/scroll videos/P2L.mp4', import.meta.url).href;
const financeVideo = new URL('./images/scroll videos/Changing blue planet.mp4', import.meta.url).href;
const gisMapImage = new URL('./images/data analysis/Map v1.1 en.png', import.meta.url).href;

const projects = [
  {
    id: 'guitar',
    icon: Guitar,
    title: 'Adaptive Guitar Training Platform',
    subtitle: 'Custom video/audio learning system',
    client: 'Confidential Product Build',
    problem:
      'Traditional guitar learning lacks structured feedback, phrase-level control, and progression tracking.',
    solution:
      'Modular lesson sequencing, guided playback controls, loop segmentation, tempo adjustment, and progress checkpoints.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Web Audio API', 'Object Storage'],
    flow: ['Media Ingestion', 'Lesson Sequencer', 'Playback Engine', 'Progress State', 'Coach View'],
    decisions: [
      'Phrase segments are metadata records, not duplicated media files.',
      'Tempo controls are non-destructive playback transforms.',
      'Progress transitions are explicit and event-driven.',
    ],
    outcome: 'Clearer learner progression and lower manual coaching overhead.',
    hero: { type: 'video', src: guitarVideo },
    evidence: [
      { title: 'Lesson Interface', type: 'video', src: guitarVideo },
      { title: 'Waveform Trainer', type: 'wave' },
      { title: 'Practice Telemetry', type: 'dash' },
    ],
  },
  {
    id: 'irms',
    icon: FlaskConical,
    title: 'Stable Isotope Mass Spectrometry Data Processing Platform',
    subtitle: 'Scientific processing and quality control engine',
    client: 'Universidade de São Paulo',
    problem:
      'Manual IRMS processing caused scaling errors, QC inconsistency, and slow reporting cycles.',
    solution:
      'Automated d13C / d18O calibration, standard correction logic, drift correction, and reporting export.',
    stack: ['Python', 'Pandas', 'NumPy', 'FastAPI', 'PostgreSQL'],
    flow: ['Raw IRMS Export', 'Calibration Core', 'QC Rules', 'Drift Correction', 'Report Export'],
    decisions: [
      'Scientific formulas are versioned separately from UI code.',
      'Validation checkpoints stop invalid batches early.',
      'Intermediate values are persisted for auditability.',
    ],
    outcome: 'Higher consistency and faster turnaround from raw files to report output.',
    hero: { type: 'cal' },
    evidence: [
      { title: 'Dashboard (Dummy Data)', type: 'dash' },
      { title: 'Processing Flow Diagram', type: 'engine' },
      { title: 'Calibration Graph', type: 'cal' },
    ],
  },
  {
    id: 'risk',
    icon: ShieldCheck,
    title: 'Structure-Based Market Risk Management System',
    subtitle: 'Decision architecture for automated market monitoring',
    client: 'Private Trading Operations',
    problem:
      'Signal and risk logic were tightly coupled, making exposure behavior opaque and hard to govern.',
    solution:
      'Risk-first state machine, explicit exposure guardrails, real-time ingestion, and operations monitoring.',
    stack: ['Python', 'WebSocket', 'Redis', 'PostgreSQL', 'React'],
    flow: ['Market Feed', 'Signal Parser', 'Risk State Machine', 'Exposure Guardrails', 'Realtime Monitor'],
    decisions: [
      'Risk rules are isolated from strategy signals.',
      'State transition guards block invalid mode jumps.',
      'All state mutations are logged for replay and review.',
    ],
    outcome: 'Clearer operational control with explicit risk-state behavior.',
    hero: { type: 'state' },
    evidence: [
      { title: 'Risk Dashboard', type: 'dash' },
      { title: 'Decision Engine Flow', type: 'engine' },
      { title: 'State Transition Model', type: 'state' },
    ],
  },
  {
    id: 'finance',
    icon: Wallet,
    title: 'Personal Financial Intelligence Platform',
    subtitle: 'Unified dashboard with AI concierge integration',
    client: 'Confidential Consumer Product',
    problem:
      'Financial data is fragmented across providers, reducing behavioral awareness and action clarity.',
    solution:
      'Unified dashboard, privacy-aware ingestion, contextual AI concierge, and spending analytics.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'LLM API', 'Encryption at Rest'],
    flow: ['Data Connectors', 'Normalization Layer', 'Privacy Vault', 'AI Context Engine', 'Decision Dashboard'],
    decisions: [
      'Assistant context is built from structured state, not raw transaction dumps.',
      'Sensitive fields are minimized before prompt construction.',
      'Recurring-pattern detection grounds AI guidance in observed behavior.',
    ],
    outcome: 'Better visibility and faster movement from financial data to decisions.',
    hero: { type: 'video', src: financeVideo },
    evidence: [
      { title: 'Dashboard Scroll', type: 'video', src: financeVideo },
      { title: 'AI Concierge Example', type: 'chat' },
      { title: 'Spending Analytics', type: 'chart' },
    ],
  },
  {
    id: 'nr1-compliance',
    icon: BrainCircuit,
    title: 'NR-1 Law Compliance Dashboard',
    subtitle: 'Mental health diagnostics and program management for corporate environments',
    client: 'Confidential Occupational Health Operations',
    problem:
      'Mental health professionals and corporate teams needed one compliant system to track diagnostics, psychosocial risk, and intervention programs.',
    solution:
      'A centralized platform for diagnostic intake, risk classification, care-program tracking, reassessment cadence, and compliance-ready records.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'RBAC', 'Audit Logging'],
    flow: ['Clinical Intake', 'Risk Classification', 'Program Planning', 'Follow-up Tracking', 'Compliance Export'],
    decisions: [
      'Separated clinical views and corporate compliance views through role-based access.',
      'Stored immutable audit trails for diagnostic updates and program changes.',
      'Modeled reassessment cycles as explicit states with reminder logic.',
    ],
    outcome:
      'Stronger continuity between professionals and corporate environments with traceable NR-1 compliance evidence.',
    hero: { type: 'dash' },
    evidence: [
      { title: 'Compliance Dashboard', type: 'dash' },
      { title: 'Program Decision Flow', type: 'engine' },
      { title: 'Psychosocial Risk Trends', type: 'chart' },
    ],
  },
];

const method = [
  ['Problem Decomposition', 'Break fuzzy requests into bounded capabilities and decision points.'],
  ['System Modeling', 'Define states, transitions, and constraints before implementation details.'],
  ['Interface Minimalism', 'Expose only high-signal controls for rapid operator decisions.'],
  ['Constraint-First Thinking', 'Design around risk, compliance, reliability, and privacy boundaries.'],
  ['Automation Logic', 'Automate repetitive decisions with auditable operational traces.'],
];

const useReveal = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, show];
};

const Reveal = ({ children, d = 0, className = '' }) => {
  const [ref, show] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${d}ms` }}
      className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

const Pill = ({ children }) => (
  <span className="rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-neutral-300">
    {children}
  </span>
);

const Visual = ({ type, src }) => {
  if (type === 'video') {
    return <video src={src} className="h-full w-full object-cover pan" autoPlay muted loop playsInline preload="metadata" />;
  }

  if (type === 'wave') {
    return (
      <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3">
        <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">Waveform</div>
        <div className="flex h-24 items-end gap-1">
          {[22, 45, 66, 38, 58, 72, 34, 52, 64, 40, 55, 28].map((h, i) => (
            <span key={`${h}-${i}`} className="wave w-full rounded-t bg-cyan-300/70" style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'cal') {
    return (
      <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3">
        <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">Calibration</div>
        <svg viewBox="0 0 320 180" className="h-36 w-full">
          <line x1="24" y1="156" x2="296" y2="156" stroke="rgba(163,163,163,0.35)" strokeWidth="1" />
          <line x1="24" y1="24" x2="24" y2="156" stroke="rgba(163,163,163,0.35)" strokeWidth="1" />
          <polyline points="30,142 72,124 118,108 162,92 208,68 252,50 294,34" fill="none" stroke="rgba(45,212,191,0.95)" strokeWidth="3" className="line" />
        </svg>
      </div>
    );
  }
  if (type === 'state') {
    return (
      <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3">
        <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">Risk State Machine</div>
        <div className="grid grid-cols-2 gap-2">
          {['Observe', 'Constrain', 'Reduce', 'Lock'].map((s) => (
            <div key={s} className="rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-3 text-center text-[11px] uppercase tracking-[0.16em] text-neutral-200">
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'chat') {
    return (
      <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          <span>AI Concierge</span>
          <Bot className="h-3.5 w-3.5 text-cyan-300" />
        </div>
        <div className="space-y-2 text-xs">
          <div className="max-w-[82%] rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-2 text-neutral-300">
            Subscriptions rose 12% this month.
          </div>
          <div className="ml-auto max-w-[75%] rounded-lg border border-cyan-500/35 bg-cyan-500/10 px-2 py-2 text-cyan-100">
            Which category changed most week over week?
          </div>
          <div className="max-w-[85%] rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-2 text-neutral-300">
            Dining and transport. I can draft new limits.
          </div>
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3">
        <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">Spending Analytics</div>
        <div className="flex h-28 items-end gap-2">
          {[36, 52, 44, 66, 54, 70, 58].map((v, i) => (
            <div key={`${v}-${i}`} className="flex-1 rounded bg-neutral-800">
              <div className="rise w-full rounded bg-gradient-to-t from-emerald-400/40 to-cyan-300/75" style={{ height: `${v}%`, animationDelay: `${i * 80}ms` }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'engine') {
    return (
      <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-xs text-neutral-300">
        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400">Decision Flow</div>
        {[
          'Input Stream',
          'Validation Rules',
          'Decision Core',
          'Output + Monitoring',
        ].map((step) => (
          <div key={step} className="mb-2 rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-2">{step}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3">
      <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">Anonymized Dashboard</div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-10 rounded bg-neutral-800" />
        <div className="h-10 rounded bg-neutral-800" />
        <div className="h-10 rounded bg-neutral-800" />
      </div>
      <div className="mt-3 h-20 rounded bg-gradient-to-br from-cyan-500/20 to-emerald-500/20" />
    </div>
  );
};

const Flow = ({ items }) => (
  <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
    {items.map((item, i) => (
      <React.Fragment key={item}>
        <div className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Step {i + 1}</div>
          <div className="mt-1 text-sm text-neutral-200">{item}</div>
        </div>
        {i < items.length - 1 && <ArrowRight className="mx-auto h-4 w-4 rotate-90 text-neutral-600 md:rotate-0" />}
      </React.Fragment>
    ))}
  </div>
);

const CaseStudy = ({ p, i }) => {
  const Icon = p.icon;
  return (
    <article id={p.id} className="mt-16 border-t border-neutral-900 pt-14">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="rounded-xl border border-neutral-800 bg-neutral-900 p-2 text-neutral-200"><Icon className="h-5 w-5" /></span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Case Study {i + 1}</span>
            </div>
            <h3 className="mt-4 text-3xl tracking-tight text-white md:text-5xl">{p.title}</h3>
            <p className="mt-2 text-neutral-400">{p.subtitle}</p>
            <div className="mt-4"><Pill>Client: {p.client}</Pill></div>
            <div className="mt-5 grid gap-3">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Problem</div>
                <p className="mt-2 text-sm text-neutral-300">{p.problem}</p>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Solution</div>
                <p className="mt-2 text-sm text-neutral-300">{p.solution}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="aspect-[4/3] rounded-2xl border border-neutral-800 bg-neutral-900/40 p-3">
              <Visual type={p.hero.type} src={p.hero.src} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal d={80} className="mt-8">
        <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-neutral-500">Visual Evidence</div>
        <div className="grid gap-4 md:grid-cols-3">
          {p.evidence.map((e) => (
            <div key={e.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-3">
              <div className="aspect-[4/3]"><Visual type={e.type} src={e.src} /></div>
              <h4 className="mt-3 text-sm uppercase tracking-[0.08em] text-neutral-200">{e.title}</h4>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal d={120} className="mt-8 grid gap-4 md:grid-cols-12">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-5 md:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">System Architecture</div>
          <Flow items={p.flow} />
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-5 md:col-span-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500"><Database className="h-3.5 w-3.5" />Stack</div>
          <div className="flex flex-wrap gap-2">{p.stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>
        </div>
      </Reveal>

      <Reveal d={160} className="mt-8 grid gap-4 md:grid-cols-12">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-5 md:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">Key Design Decisions</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">{p.decisions.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-5 md:col-span-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">Outcome</div>
          <p className="mt-3 text-sm text-neutral-300">{p.outcome}</p>
        </div>
      </Reveal>
    </article>
  );
};

export default function App() {
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const hero = Object.values(
    import.meta.glob('./images/hero-carousel-0*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' })
  );
  const websiteShowcase = [
    { title: 'Website 01', kind: 'video', src: guitarVideo, filter: '' },
    { title: 'Website 02', kind: 'video', src: financeVideo, filter: '' },
    { title: 'Graphic Design - GIS Map', kind: 'image', src: gisMapImage, filter: '' },
  ];
  const selectedWorkSequence = ['nr1-compliance', 'risk', 'irms', 'finance', 'guitar'];
  const orderedProjects = selectedWorkSequence
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);

  useEffect(() => {
    if (hero.length < 2) return undefined;
    const id = window.setInterval(() => setActive((v) => (v + 1) % hero.length), 4200);
    return () => window.clearInterval(id);
  }, [hero.length]);

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleContactClick = () => {
    window.location.href = 'mailto:hello@evostudio.com?subject=Website%20contact';
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-neutral-100 selection:bg-cyan-200 selection:text-black">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
            body { font-family: 'Space Grotesk', sans-serif; background: #020202; }
            .mono { font-family: 'IBM Plex Mono', monospace; }
            @keyframes gradient-mesh {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .hero-mesh {
              background: radial-gradient(circle at top left, rgba(79, 70, 229, 0.35), transparent 50%),
                          radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.35), transparent 50%),
                          radial-gradient(circle at center, rgba(14, 165, 233, 0.25), transparent 50%);
              background-size: 200% 200%;
              animation: gradient-mesh 15s ease infinite;
            }
            @keyframes hero-pan-a {
              0% { transform: scale(1.02) translate3d(0, 0, 0); }
              50% { transform: scale(1.06) translate3d(-0.7%, -0.4%, 0); }
              100% { transform: scale(1.02) translate3d(0, 0, 0); }
            }
            @keyframes hero-pan-b {
              0% { transform: scale(1.03) translate3d(0, 0, 0); }
              45% { transform: scale(1.055) translate3d(0.6%, -0.6%, 0); }
              100% { transform: scale(1.03) translate3d(0, 0, 0); }
            }
            @keyframes hero-pan-c {
              0% { transform: scale(1.01) translate3d(0, 0, 0); }
              35% { transform: scale(1.045) translate3d(-0.4%, 0.4%, 0); }
              75% { transform: scale(1.05) translate3d(0.2%, -0.6%, 0); }
              100% { transform: scale(1.01) translate3d(0, 0, 0); }
            }
            .hero-pan-a { animation: hero-pan-a 15s ease-in-out infinite; }
            .hero-pan-b { animation: hero-pan-b 17s ease-in-out infinite; }
            .hero-pan-c { animation: hero-pan-c 19s ease-in-out infinite; }
            .pan { animation: pan 10s ease-in-out infinite; }
            @keyframes pan { 0%{transform:scale(1.01)} 50%{transform:scale(1.04) translate(-1%, -0.7%)} 100%{transform:scale(1.01)} }
            .wave { animation: wave 2.6s ease-in-out infinite; }
            @keyframes wave { 0%{transform:scaleY(0.72)} 50%{transform:scaleY(1)} 100%{transform:scaleY(0.72)} }
            .line { stroke-dasharray: 380; stroke-dashoffset: 380; animation: line 4.3s ease-in-out infinite; }
            @keyframes line { 0%{stroke-dashoffset:380} 40%{stroke-dashoffset:0} 70%{stroke-dashoffset:0} 100%{stroke-dashoffset:380} }
            .rise { animation: rise 2.8s ease-in-out infinite; }
            @keyframes rise { 0%{opacity:.72} 50%{opacity:1} 100%{opacity:.72} }
            .animate-spin-slow { animation: spin-slow 15s linear infinite; }
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @media (prefers-reduced-motion: reduce) { .hero-mesh,.hero-pan-a,.hero-pan-b,.hero-pan-c,.pan,.wave,.line,.rise,.animate-spin-slow { animation: none !important; } }
          `,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-10 mix-blend-screen" style={{ background: `radial-gradient(620px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.05), transparent 42%)` }} />

      <nav className="fixed top-0 z-50 w-full p-6 mix-blend-difference">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-lg tracking-tight">evostudio</span>
          <div className="mono hidden gap-5 text-[11px] uppercase tracking-[0.18em] text-neutral-300 sm:flex">
            <a href="#design" className="hover:text-white">Design</a>
            <a href="#systems" className="hover:text-white">Systems</a>
            <a href="#method" className="hover:text-white">Method</a>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {hero.length > 0 && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            {hero.map((src, i) => {
              const panClass = ['hero-pan-a', 'hero-pan-b', 'hero-pan-c'][i % 3];
              return (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${panClass} ${
                    i === active ? 'opacity-52' : 'opacity-0'
                  }`}
                />
              );
            })}
            <div className="absolute inset-0 bg-black/50"></div>
            {hero.length > 1 && (
              <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {hero.map((_, i) => (
                  <span
                    key={`hero-dot-${i}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? 'w-8 bg-white/80' : 'w-2 bg-white/35'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <div className="hero-mesh absolute inset-0 z-[1] scale-150 rounded-full opacity-80 blur-3xl"></div>

        <div className="relative z-20 mx-auto max-w-5xl py-24 text-center mix-blend-screen">
          <Reveal><p className="mono text-[10px] uppercase tracking-[0.26em] text-cyan-300">Decision-Driven Platforms</p></Reveal>
          <Reveal d={100}><h1 className="mt-4 bg-gradient-to-b from-white to-white/55 bg-clip-text text-5xl leading-[1.02] tracking-tight text-transparent md:text-7xl">Systems architect for decision-driven platforms.</h1></Reveal>
          <Reveal d={180}><p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300">Anonymized case studies with visual evidence and architecture insight, not screenshot-only portfolio pages.</p></Reveal>
          <Reveal d={220}>
            <button
              type="button"
              onClick={handleContactClick}
              className="mt-7 rounded-full border border-white/35 px-5 py-2 text-[10px] uppercase tracking-[0.22em] text-white/80 hover:border-white/60 hover:text-white transition-colors duration-300"
            >
              Contact
            </button>
          </Reveal>
          <Reveal d={240}><div className="mt-8 flex flex-wrap justify-center gap-2"><Pill>Automation Logic</Pill><Pill>State Modeling</Pill><Pill>Interface Minimalism</Pill><Pill>Constraint-First Engineering</Pill></div></Reveal>
        </div>

        <div className="absolute bottom-12 left-6 z-30 md:left-12">
          <div className="flex items-center gap-2">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Status</span>
            <div className="relative flex h-3 w-3 items-center justify-center">
              <div className="absolute h-3 w-3 rounded-full bg-emerald-500 opacity-75 animate-ping"></div>
              <div className="relative h-2 w-2 rounded-full bg-emerald-500"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-6 z-30 hidden cursor-default opacity-55 transition-opacity hover:opacity-100 sm:block md:right-12">
          <svg width="108" height="108" viewBox="0 0 108 108" className="animate-spin-slow">
            <path
              id="hero-scroll-curve"
              d="M 54, 54 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text className="mono text-[9px] uppercase tracking-[0.08em] fill-white font-medium">
              <textPath href="#hero-scroll-curve" startOffset="50%" textAnchor="middle">
                SCROLL TO EXPLORE {'\u2022'} EVOSTUDIO {'\u2022'}
              </textPath>
            </text>
          </svg>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-6 pt-12">
        <Reveal>
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/35 p-8">
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-cyan-300" /><p className="mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">Positioning</p></div>
                <h2 className="mt-4 text-2xl tracking-tight text-white md:text-3xl">Structured decision systems across domains.</h2>
              </div>
              <div className="md:col-span-8 text-sm leading-relaxed text-neutral-300 md:text-base">
                Music training, scientific processing, market risk control, and personal finance are presented through one thread: architecture for high-context decisions.
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="design" className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-neutral-900 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.26em] text-neutral-500">Web & Graphic Design / Photography</p>
              <h2 className="mt-3 text-4xl tracking-tight text-white md:text-5xl">Visual Direction Systems</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
              Curated visual studies combining interface composition, graphic assets, and photography treatment.
            </p>
          </div>
        </Reveal>

        <Reveal d={80} className="mt-8 grid gap-4 md:grid-cols-12">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-6 md:col-span-4">
            <div className="mb-4 flex items-center gap-2">
              <PenTool className="h-4 w-4 text-cyan-300" />
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Design Scope</span>
            </div>
            <h3 className="text-2xl tracking-tight text-white">2 website examples + 1 GIS graphic design.</h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              Two vertical website scroll captures plus one graphic design sample focused on GIS map creation and manipulation.
            </p>
            <div className="mt-6 space-y-2 text-sm text-neutral-300">
              <div className="flex items-center gap-2"><Camera className="h-4 w-4 text-neutral-400" /> Scroll-first homepage composition</div>
              <div className="flex items-center gap-2"><PenTool className="h-4 w-4 text-neutral-400" /> Typography and section pacing</div>
              <div className="flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-neutral-400" /> GIS map creation and manipulation workflow</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:col-span-8 md:grid-cols-3">
            {websiteShowcase.map((site) => (
              <div key={site.title} className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/45 p-3">
                <div className="mono mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-500">{site.title}</div>
                <div className="h-[460px] overflow-hidden rounded-xl border border-neutral-800 bg-black/80">
                  {site.kind === 'video' ? (
                    <video
                      src={site.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover pan"
                      style={{ filter: site.filter }}
                    />
                  ) : (
                    <img
                      src={site.src}
                      alt="GIS map creation and manipulation sample"
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={{ filter: site.filter }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="systems" className="mx-auto max-w-7xl px-6 pb-24 pt-16">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-neutral-900 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.26em] text-neutral-500">Systems & Interfaces</p>
              <h2 className="mt-3 text-4xl tracking-tight text-white md:text-5xl">Selected Works</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-400">Minimal, dense, and architecture-first presentation for custom non-public products.</p>
          </div>
        </Reveal>

        {orderedProjects.map((p, i) => <CaseStudy key={p.id} p={p} i={i} />)}
      </section>

      <section id="method" className="border-t border-neutral-900 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><div className="mb-8 flex items-center gap-2"><Lock className="h-5 w-5 text-cyan-300" /><p className="mono text-[10px] uppercase tracking-[0.26em] text-neutral-500">Method</p></div></Reveal>
          <Reveal d={60}><h2 className="max-w-4xl text-4xl tracking-tight text-white md:text-5xl">Problem decomposition, system modeling, and constraint-first delivery.</h2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {method.map(([title, desc], i) => (
              <Reveal key={title} d={100 + i * 50} className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-5">
                <h3 className="text-sm uppercase tracking-[0.08em] text-neutral-200">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-900 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl tracking-tight text-neutral-300">evostudio</p>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">{new Date().getFullYear()} - Systems & Interfaces</p>
        </div>
      </footer>
    </div>
  );
}
