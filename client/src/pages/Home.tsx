import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CloudDownload,
  Code2,
  Database,
  FileCheck2,
  FileText,
  Github,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Play,
  Radar,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  X,
  Zap,
} from "lucide-react";

import { comics, lessons, scenarios } from "@/data/curriculum";

type View = "overview" | "learn" | "comics" | "lab" | "mentor" | "evidence" | "quantum" | "admin";
type Mode = "student" | "company";
type AccountRole = "student" | "company" | "admin";
type Tone = "success" | "warning" | "info";

type Evidence = {
  id: string;
  kind: string;
  title: string;
  timestamp: string;
  status: "pending" | "reviewed";
  detail: string;
  safe: boolean;
};

type Progress = {
  lessons: string[];
  comics: string[];
  scenarios: string[];
  quizScore: number;
};

const initialEvidence: Evidence[] = [];
const initialProgress: Progress = { lessons: [], comics: [], scenarios: [], quizScore: 0 };

function readStorage<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || "null") || fallback; } catch { return fallback; }
}

function stamp() { return new Date().toISOString(); }

function classNames(...items: Array<string | false | null | undefined>) { return items.filter(Boolean).join(" "); }

function Pill({ children, tone = "info" }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={classNames("cq-pill", `cq-pill-${tone}`)}>{children}</span>;
}

function StatCard({ label, value, hint, icon: Icon, tone }: { label: string; value: string; hint: string; icon: React.ComponentType<{ size?: number }>; tone: string }) {
  return <div className={classNames("cq-stat", `cq-stat-${tone}`)}><div className="cq-stat-icon"><Icon size={20} /></div><div><div className="cq-stat-label">{label}</div><div className="cq-stat-value">{value}</div><div className="cq-stat-hint">{hint}</div></div></div>;
}

function AuthLoading() {
  return <div className="cq-auth-shell"><div className="cq-auth-card cq-auth-loading"><div className="cq-brand-mark"><ShieldCheck size={24} /></div><div className="cq-eyebrow">CyberQuest / secure session</div><h1>Opening your security studio.</h1><p>Checking the protected workspace and loading your role policy.</p><div className="cq-auth-pulse"><span /><span /><span /></div></div></div>;
}

function UnifiedLogin({ error }: { error?: string }) {
  return <div className="cq-auth-shell"><div className="cq-auth-visual"><div className="cq-auth-grid" /><div className="cq-auth-orbit auth-orbit-one" /><div className="cq-auth-orbit auth-orbit-two" /><div className="cq-auth-core"><ShieldCheck size={48} /><span>SAFE<br /><b>BY DESIGN</b></span></div><div className="cq-auth-satellite auth-sat-one"><Bot size={17} /></div><div className="cq-auth-satellite auth-sat-two"><Network size={17} /></div><span className="cq-auth-caption">CYBER CITY / ACCESS GATE</span></div><div className="cq-auth-card"><div className="cq-brand"><div className="cq-brand-mark"><ShieldCheck size={21} /></div><div><strong>CyberQuest</strong><span>AI security studio</span></div></div><div className="cq-eyebrow">One secure entry</div><h1>Learn the signal.<br /><span>Defend the story.</span></h1><p>Use one sign-in for every workspace. CyberQuest reads your verified account policy and opens the correct Student, Company, or Admin studio automatically.</p>{error && <div className="cq-auth-error"><Shield size={15} />{error}</div>}<button className="cq-button cq-button-dark cq-auth-login" onClick={() => startLogin()}><LockKeyhole size={16} /> Continue with secure sign-in <ArrowRight size={16} /></button><div className="cq-auth-roles"><div><GraduationCap size={17} /><span><strong>Student</strong><small>Learn, comics, and guided labs</small></span></div><div><Shield size={17} /><span><strong>Company</strong><small>Evidence, reports, and Wazuh review</small></span></div><div><Database size={17} /><span><strong>Admin</strong><small>Policy and content governance</small></span></div></div><div className="cq-auth-foot"><Check size={14} /> No separate passwords stored by CyberQuest <span>·</span> <Check size={14} /> Role policy enforced server-side</div></div></div>;
}

function AdminConsole() {
  return <><PageHeading eyebrow="Admin console / governance" title="Keep the studio trustworthy." copy="Review the content system, role policy, and lab guardrails from one protected control surface." action={<Pill tone="success"><ShieldCheck size={14} /> Admin-only</Pill>} /><div className="cq-admin-grid"><section className="cq-panel"><div className="cq-panel-heading"><div><div className="cq-eyebrow">Content inventory</div><h2>Built for depth</h2></div><Sparkles size={20} color="var(--coral)" /></div><div className="cq-admin-metrics"><StatCard label="Lessons" value={String(lessons.length)} hint="Structured checkpoints" icon={GraduationCap} tone="blue" /><StatCard label="Comics" value={String(comics.length)} hint="10 scenes each" icon={BookOpen} tone="coral" /><StatCard label="Safe labs" value={String(scenarios.length)} hint="Allowlisted validations" icon={TerminalSquare} tone="sky" /></div></section><section className="cq-panel"><div className="cq-panel-heading"><div><div className="cq-eyebrow">Role policy</div><h2>One gate, three workspaces</h2></div><Users size={20} color="var(--sky-deep)" /></div><div className="cq-role-list"><div><Pill tone="success">student</Pill><span>Curriculum, comic archive, Nova mentor, and safe lab.</span></div><div><Pill>company</Pill><span>Student surfaces plus company evidence and reporting.</span></div><div><Pill tone="warning">admin</Pill><span>Governance, role policy, and content inventory.</span></div></div></section></div><section className="cq-panel cq-admin-safety"><ShieldCheck size={20} /><div><strong>Safety contract</strong><p>Admin access never enables autonomous remediation. Real Wazuh enrichment remains a private, read-only receiver workflow.</p></div></section></>;
}

export default function Home() {
  // The useAuth hook provides authentication state.
  // To implement login/logout, call logout(), or start login from an event
  // handler: onClick={() => startLogin()} (imported from "@/const"). Never call
  // startLogin() during render (no href={startLogin()}) — it mints a one-time
  // nonce cookie and must run only at the moment of navigation.
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const accountRole = (user?.role || "student") as AccountRole;

  const [view, setView] = useState<View>("overview");
  const [mode, setMode] = useState<Mode>("student");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState<Progress>(() => readStorage("cq-progress", initialProgress));
  const [evidence, setEvidence] = useState<Evidence[]>(() => readStorage("cq-evidence", initialEvidence));
  const [activeLesson, setActiveLesson] = useState(lessons[0].id);
  const [activeComic, setActiveComic] = useState(comics[0].id);
  const [scene, setScene] = useState(0);
  const [mentorQuestion, setMentorQuestion] = useState("");
  const [mentorAnswer, setMentorAnswer] = useState<{ answer: string; source: string; certainty: string } | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => { localStorage.setItem("cq-progress", JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem("cq-evidence", JSON.stringify(evidence)); }, [evidence]);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(""), 3200); return () => window.clearTimeout(timer); }, [notice]);
  useEffect(() => {
    if (!user) return;
    setMode(accountRole === "student" ? "student" : "company");
  }, [accountRole, user]);

  if (loading) return <AuthLoading />;
  if (!isAuthenticated) return <UnifiedLogin error={error ? "We could not read the session. Please try again." : undefined} />;

  const activeLessonData = lessons.find((lesson) => lesson.id === activeLesson) || lessons[0];
  const activeComicData = comics.find((comic) => comic.id === activeComic) || comics[0];
  const completion = Math.round(((progress.lessons.length + progress.comics.length + progress.scenarios.length) / (lessons.length + comics.length + scenarios.length)) * 100);
  const pending = evidence.filter((item) => item.status === "pending").length;

  const navigate = (next: View) => { setView(next); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toast = (message: string) => setNotice(message);
  const completeLesson = (lessonId: string, correct: boolean) => {
    setProgress((old) => ({ ...old, lessons: old.lessons.includes(lessonId) ? old.lessons : [...old.lessons, lessonId], quizScore: old.quizScore + (correct ? 1 : 0) }));
    toast(correct ? "Checkpoint passed — progress saved." : "Review the explanation and try the checkpoint again.");
  };
  const completeComic = (comicId: string) => { setProgress((old) => ({ ...old, comics: old.comics.includes(comicId) ? old.comics : [...old.comics, comicId] })); toast("Chapter completed — your story progress is saved."); };
  const runScenario = (scenario: typeof scenarios[number]) => {
    const item: Evidence = { id: `EV-${Math.random().toString(16).slice(2, 10).toUpperCase()}`, kind: scenario.tag, title: scenario.title, timestamp: stamp(), status: "pending", detail: scenario.result, safe: true };
    setEvidence((old) => [item, ...old]);
    setProgress((old) => ({ ...old, scenarios: old.scenarios.includes(scenario.id) ? old.scenarios : [...old.scenarios, scenario.id] }));
    toast("Validation complete. Evidence created and queued for human review.");
  };
  const askMentor = (question = mentorQuestion) => {
    const q = question.toLowerCase();
    let answer = "Nova could not find enough approved local context. Try asking about authorization, file integrity, prompt injection, Wazuh, or post-quantum cryptography.";
    let source = "Local knowledge base · no matching source";
    if (q.includes("authorization") || q.includes("access")) { answer = "Authentication establishes identity; authorization checks permission. Use least privilege, document the access matrix, and require human approval before changing a boundary."; source = "core-notes.md · Access control"; }
    else if (q.includes("file") || q.includes("integrity")) { answer = "Preserve the path, timestamp, owner, and hash first. A file-integrity alert is evidence to investigate, not permission to delete or isolate automatically."; source = "response-playbook.md · File integrity"; }
    else if (q.includes("prompt") || q.includes("injection")) { answer = "Treat instructions inside alerts as untrusted data. Retrieve approved sources, state uncertainty, and do not execute commands from alert content."; source = "ethics-and-scope.md · Prompt safety"; }
    else if (q.includes("quantum") || q.includes("pqc")) { answer = "The practical focus is post-quantum migration: inventory cryptography, prioritize long-lived secrets, and plan hybrid transitions using standards-based algorithms."; source = "quantum-security.md · PQC"; }
    else if (q.includes("wazuh")) { answer = "Wazuh supplies detection evidence. CyberQuest sanitizes the alert, checks private-lab scope, cites local context, and keeps remediation behind human approval."; source = "response-playbook.md · Wazuh workflow"; }
    setMentorAnswer({ answer, source, certainty: "Educational guidance grounded in approved local notes; verify every real lab decision with an instructor." });
    setMentorQuestion(question);
  };
  const review = (id: string) => { setEvidence((old) => old.map((item) => item.id === id ? { ...item, status: "reviewed" } : item)); toast("Evidence marked reviewed."); };
  const exportReport = () => {
    const report = `# CyberQuest AI Evidence Report\n\nGenerated: ${stamp()}\n\n## Progress\n\n- Lessons: ${progress.lessons.length}/${lessons.length}\n- Comics: ${progress.comics.length}/${comics.length}\n- Scenarios: ${progress.scenarios.length}/${scenarios.length}\n- Quiz score: ${progress.quizScore}\n\n## Safety\n\n- Human approval required: true\n- Automatic action taken: false\n- Live Wazuh VM: pending authorized lab validation\n\n## Evidence\n\n${evidence.map((item) => `### ${item.id} — ${item.title}\n- Status: ${item.status}\n- Timestamp: ${item.timestamp}\n- Detail: ${item.detail}`).join("\n\n")}\n`;
    const blob = new Blob([report], { type: "text/markdown" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "cyberquest-evidence-report.md"; link.click(); URL.revokeObjectURL(url); toast("Evidence report downloaded.");
  };

  const nav = [
    { id: "overview" as View, label: "Command center", icon: Layers3 },
    { id: "learn" as View, label: "Learning path", icon: GraduationCap, badge: `${progress.lessons.length}/${lessons.length}` },
    { id: "comics" as View, label: "Comic chapters", icon: BookOpen, badge: `${progress.comics.length}/${comics.length}` },
    { id: "lab" as View, label: "Safe lab", icon: TerminalSquare, badge: `${progress.scenarios.length}/${scenarios.length}` },
    { id: "mentor" as View, label: "Nova mentor", icon: Bot },
    { id: "evidence" as View, label: "Evidence center", icon: FileText, badge: pending ? String(pending) : undefined },
    { id: "quantum" as View, label: "Quantum track", icon: Zap },
    ...(accountRole === "admin" ? [{ id: "admin" as View, label: "Admin console", icon: Database }] : []),
  ];

  return <div className="cq-shell">
    <aside className={classNames("cq-sidebar", mobileOpen && "is-open")}>
      <div className="cq-brand"><div className="cq-brand-mark"><ShieldCheck size={21} /></div><div><strong>CyberQuest</strong><span>AI security studio</span></div><button className="cq-icon-button cq-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
      <div className="cq-rail-label">Workspace</div>
      <nav className="cq-nav">{nav.map((item) => <button key={item.id} className={classNames("cq-nav-item", view === item.id && "is-active")} onClick={() => navigate(item.id)}><item.icon size={18} /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button>)}</nav>
      <div className="cq-sidebar-bottom"><div className="cq-safety-card"><div className="cq-safety-top"><span className="cq-live-dot" />Safe by design</div><p>Read-only guidance. Human approval before action.</p><button onClick={() => navigate("evidence")}>View safeguards <ArrowRight size={14} /></button></div><div className="cq-sidebar-foot"><span>v7.0 · local-first</span><a href="https://github.com/Gooichand/cyberquest-ai" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a></div></div>
    </aside>
    {mobileOpen && <div className="cq-backdrop" onClick={() => setMobileOpen(false)} />}
    <main className="cq-main">
      <header className="cq-topbar"><button className="cq-icon-button cq-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button><div className="cq-breadcrumb"><span>CyberQuest</span><ChevronRight size={14} /><strong>{nav.find((item) => item.id === view)?.label}</strong></div><div className="cq-top-actions">{accountRole === "student" ? <Pill><GraduationCap size={13} /> Student workspace</Pill> : <div className="cq-mode-switch"><button className={mode === "student" ? "is-selected" : ""} onClick={() => setMode("student")}><GraduationCap size={14} /> Student</button><button className={mode === "company" ? "is-selected" : ""} onClick={() => setMode("company")}><Shield size={14} /> Company</button></div>}<button className="cq-avatar cq-avatar-button" onClick={() => logout()} title="Sign out">{(user?.name || user?.email || "CQ").slice(0, 2).toUpperCase()}</button></div></header>
      <div className="cq-content">
        {notice && <div className="cq-toast"><Check size={16} />{notice}</div>}
        {view === "overview" && <Overview completion={completion} progress={progress} pending={pending} mode={mode} navigate={navigate} />}
        {view === "learn" && <Learn progress={progress} activeLesson={activeLesson} setActiveLesson={setActiveLesson} completeLesson={completeLesson} />}
        {view === "comics" && <Comics progress={progress} activeComic={activeComic} setActiveComic={(id) => { setActiveComic(id); setScene(0); }} scene={scene} setScene={setScene} completeComic={completeComic} />}
        {view === "lab" && <Lab progress={progress} runScenario={runScenario} />}
        {view === "mentor" && <Mentor question={mentorQuestion} setQuestion={setMentorQuestion} answer={mentorAnswer} ask={askMentor} />}
        {view === "evidence" && <EvidenceCenter evidence={evidence} review={review} exportReport={exportReport} mode={mode} />}
        {view === "quantum" && <Quantum />}
        {view === "admin" && accountRole === "admin" && <AdminConsole />}
      </div>
    </main>
  </div>;
}

function PageHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: React.ReactNode }) {
  return <div className="cq-page-heading"><div><div className="cq-eyebrow">{eyebrow}</div><h1>{title}</h1><p>{copy}</p></div>{action}</div>;
}

function Overview({ completion, progress, pending, mode, navigate }: { completion: number; progress: Progress; pending: number; mode: Mode; navigate: (view: View) => void }) {
  return <>
    <section className="cq-hero"><div className="cq-hero-copy"><Pill tone="success"><span className="cq-live-dot" /> {mode === "student" ? "Student workspace" : "Company workspace"}</Pill><h1>Build judgment.<br /><span>Defend with evidence.</span></h1><p>CyberQuest turns cybersecurity fundamentals, safe lab validation, and AI-assisted analysis into one explainable learning journey.</p><div className="cq-hero-actions"><button className="cq-button cq-button-dark" onClick={() => navigate("learn")}><Play size={16} fill="currentColor" /> Continue path <ArrowRight size={16} /></button><button className="cq-button cq-button-ghost" onClick={() => navigate("lab")}><Radar size={16} /> Open safe lab</button></div><div className="cq-hero-meta"><span><Check size={14} /> No automatic remediation</span><span><Check size={14} /> Private lab scope</span><span><Check size={14} /> Local-first</span></div></div><div className="cq-hero-art"><div className="cq-orbit orbit-one" /><div className="cq-orbit orbit-two" /><div className="cq-orbit orbit-three" /><div className="cq-core"><ShieldCheck size={42} /><span>DEFENSE<br /><b>IN DEPTH</b></span></div><div className="cq-satellite sat-a"><LockKeyhole size={15} /></div><div className="cq-satellite sat-b"><Bot size={15} /></div><div className="cq-satellite sat-c"><Network size={15} /></div><span className="cq-art-caption">CYBER CITY / 07</span></div></section>
    <div className="cq-stat-grid"><StatCard label="Journey progress" value={`${completion}%`} hint={`${progress.lessons.length + progress.comics.length + progress.scenarios.length} checkpoints completed`} icon={Activity} tone="coral" /><StatCard label="Learning path" value={`${progress.lessons.length}/${lessons.length}`} hint="Chapters mastered" icon={GraduationCap} tone="blue" /><StatCard label="Evidence queue" value={String(pending)} hint="Awaiting human review" icon={FileCheck2} tone="sky" /><StatCard label="Safety posture" value="Guarded" hint="Approval gate active" icon={ShieldCheck} tone="mint" /></div>
    <div className="cq-section-grid"><section className="cq-panel cq-next-panel"><div className="cq-panel-heading"><div><div className="cq-eyebrow">Up next</div><h2>Your next checkpoint</h2></div><button className="cq-link-button" onClick={() => navigate("learn")}>View path <ArrowRight size={15} /></button></div><div className="cq-checkpoint"><div className="cq-checkpoint-number">{String(Math.min(progress.lessons.length + 1, lessons.length)).padStart(2, "0")}</div><div className="cq-checkpoint-content"><Pill>Lesson {Math.min(progress.lessons.length + 1, lessons.length)} · {lessons[Math.min(progress.lessons.length, lessons.length - 1)].level}</Pill><h3>{lessons[Math.min(progress.lessons.length, lessons.length - 1)].title}</h3><p>{lessons[Math.min(progress.lessons.length, lessons.length - 1)].simple}</p><button className="cq-button cq-button-small" onClick={() => navigate("learn")}>Start checkpoint <ArrowRight size={14} /></button></div><div className="cq-checkpoint-art"><Sparkles size={38} /><span>04<br />MIN</span></div></div></section><section className="cq-panel cq-signal-panel"><div className="cq-panel-heading"><div><div className="cq-eyebrow">System signal</div><h2>Healthy by design</h2></div><span className="cq-status-dot" /></div><div className="cq-signal-graph"><div className="cq-graph-line" /><div className="cq-graph-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="cq-signal-footer"><span><b>100%</b> local checks</span><span><b>0</b> automatic actions</span></div></section></div>
    <section className="cq-panel cq-quickstart"><div className="cq-quickstart-intro"><div className="cq-eyebrow">Explore the studio</div><h2>Learn it. Test it.<br /><span>Explain it.</span></h2><p>100 chapters, 20 validations, one safe operating model.</p></div><button onClick={() => navigate("comics")}><div className="cq-quick-icon coral"><BookOpen size={22} /></div><strong>Comic chapters</strong><span>50 stories · 500 scenes <ArrowRight size={15} /></span></button><button onClick={() => navigate("mentor")}><div className="cq-quick-icon blue"><Bot size={22} /></div><strong>Nova mentor</strong><span>Ask with context <ArrowRight size={15} /></span></button><button onClick={() => navigate("evidence")}><div className="cq-quick-icon sky"><FileText size={22} /></div><strong>Evidence center</strong><span>Review safely <ArrowRight size={15} /></span></button></section>
  </>;
}

function Learn({ progress, activeLesson, setActiveLesson, completeLesson }: { progress: Progress; activeLesson: string; setActiveLesson: (id: string) => void; completeLesson: (id: string, correct: boolean) => void }) {
  const lesson = lessons.find((item) => item.id === activeLesson) || lessons[0];
  return <><PageHeading eyebrow={`Learning path / ${lessons.length} chapters`} title="Make the fundamentals instinctive." copy="A visual curriculum that moves from security mindset through identity, networks, evidence, AI safety, and quantum migration." action={<Pill tone="success"><Check size={14} /> {progress.lessons.length} completed</Pill>} /><div className="cq-learning-layout"><div className="cq-lesson-list">{lessons.map((item, index) => <button key={item.id} className={classNames("cq-lesson-row", activeLesson === item.id && "is-active")} onClick={() => setActiveLesson(item.id)}><span className={classNames("cq-lesson-index", `tone-${item.color}`)}>{String(index + 1).padStart(2, "0")}</span><item.icon size={17} /><span className="cq-lesson-title"><strong>{item.title}</strong><small>{item.level}</small></span>{progress.lessons.includes(item.id) ? <Check className="cq-completed" size={16} /> : <ChevronRight size={16} />}</button>)}</div><article className="cq-panel cq-lesson-detail"><div className="cq-detail-top"><Pill>{lesson.id} · {lesson.level}</Pill><span className="cq-detail-time"><Activity size={14} /> 4 min checkpoint</span></div><div className={classNames("cq-lesson-illustration", `tone-${lesson.color}`)}><lesson.icon size={64} /><span>FIELD NOTE / {lesson.id}</span></div><h2>{lesson.title}</h2><p className="cq-lead">{lesson.simple}</p><div className="cq-technical"><Code2 size={17} /><div><strong>Technical lens</strong><p>{lesson.technical}</p></div></div><div className="cq-quiz"><div className="cq-quiz-label"><ClipboardCheck size={15} /> Quick checkpoint</div><h3>{lesson.quiz}</h3><div className="cq-option-grid">{lesson.options.map((option) => <button key={option} onClick={() => completeLesson(lesson.id, option === lesson.answer)} className={classNames("cq-option", progress.lessons.includes(lesson.id) && option === lesson.answer && "is-correct")}>{option}{progress.lessons.includes(lesson.id) && option === lesson.answer && <Check size={16} />}</button>)}</div></div></article></div></>;
}

function Comics({ progress, activeComic, setActiveComic, scene, setScene, completeComic }: { progress: Progress; activeComic: string; setActiveComic: (id: string) => void; scene: number; setScene: (scene: number) => void; completeComic: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const comic = comics.find((item) => item.id === activeComic) || comics[0];
  const panel = comic.panels[Math.min(scene, comic.panels.length - 1)];
  const filteredComics = comics.filter((item) => `${item.title} ${item.topic} ${item.id}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading eyebrow={`Comic archive / ${comics.length} chapters`} title="Stories that make safety stick." copy="Follow Byte, Shield, and Nova through 500 illustrated scenes where good judgment matters most." action={<Pill tone="success"><BookOpen size={14} /> {progress.comics.length} chapters complete</Pill>} /><div className="cq-comic-layout"><div className="cq-comic-rail"><div className="cq-content-filter"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a chapter or topic" aria-label="Find a comic chapter" /></div><div className="cq-comic-cards">{filteredComics.map((item, index) => <button key={item.id} className={classNames("cq-comic-card", activeComic === item.id && "is-active")} onClick={() => { setActiveComic(item.id); setScene(0); }}><div className={classNames("cq-comic-number", `tone-${item.accent}`)}>{item.id.slice(1)}</div><div className="cq-comic-card-body"><Pill>{item.topic}</Pill><h3>{item.title}</h3><span>{progress.comics.includes(item.id) ? "Completed · replay" : "10 scenes · 8 min"}</span></div><ArrowRight size={17} /></button>)}</div></div><article className={classNames("cq-panel cq-comic-reader", `tone-${comic.accent}`)}><div className="cq-reader-header"><div><div className="cq-eyebrow">{comic.topic} · {comic.id}</div><h2>{comic.title}</h2><p className="cq-reader-subtitle">{comic.lesson}</p></div><span className="cq-scene-count">Scene {scene + 1} / {comic.panels.length}</span></div><div className="cq-comic-stage"><div className="cq-stage-grid" /><div className="cq-character"><ShieldCheck size={42} /></div><div className="cq-speech"><span>{panel.who}</span><strong>“{panel.line}”</strong></div><div className="cq-stage-note">{panel.body}</div></div><div className="cq-reader-controls"><button className="cq-button cq-button-ghost" disabled={scene === 0} onClick={() => setScene(Math.max(0, scene - 1))}><ChevronLeft size={16} /> Previous</button><div className="cq-scene-dots">{comic.panels.map((_, index) => <button key={index} aria-label={`Go to scene ${index + 1}`} className={index === scene ? "is-active" : ""} onClick={() => setScene(index)} />)}</div>{scene < comic.panels.length - 1 ? <button className="cq-button cq-button-dark" onClick={() => setScene(scene + 1)}>Next scene <ChevronRight size={16} /></button> : <button className="cq-button cq-button-dark" onClick={() => completeComic(comic.id)}><Check size={16} /> Complete chapter</button>}</div></article></div></>;
}

function Lab({ progress, runScenario }: { progress: Progress; runScenario: (scenario: typeof scenarios[number]) => void }) {
  return <><PageHeading eyebrow={`Safe lab / ${scenarios.length} validations`} title="Test the boundary, not the world." copy="Every scenario is deterministic, private-lab scoped, and designed to teach evidence-first defense. No exploit payloads. No automatic remediation." action={<Pill tone="success"><ShieldCheck size={14} /> Guardrail active</Pill>} /><div className="cq-lab-banner"><div className="cq-lab-banner-icon"><Network size={24} /></div><div><strong>Authorized environment</strong><p>192.168.56.0/24 · synthetic targets only · human approval required</p></div><div className="cq-lab-route"><span /> Wazuh bridge <ArrowRight size={14} /> Evidence center</div></div><div className="cq-scenario-grid">{scenarios.map((scenario) => <article className="cq-panel cq-scenario-card" key={scenario.id}><div className="cq-scenario-top"><div className="cq-scenario-icon"><scenario.icon size={21} /></div><Pill>{scenario.id}</Pill></div><div className="cq-eyebrow">{scenario.tag} · {scenario.difficulty}</div><h2>{scenario.title}</h2><p>{scenario.description}</p><div className="cq-tool-line"><TerminalSquare size={14} /> {scenario.tool}</div><button className="cq-button cq-button-dark cq-full" onClick={() => runScenario(scenario)}><Radar size={16} /> Run safe validation <ArrowRight size={16} /></button>{progress.scenarios.includes(scenario.id) && <div className="cq-result-line"><Check size={15} /> {scenario.result}</div>}</article>)}</div><div className="cq-lab-foot"><ShieldCheck size={18} /><span><strong>Safety contract:</strong> the assistant can explain and record. It cannot delete, block, exploit, or change systems.</span></div></>;
}

function Mentor({ question, setQuestion, answer, ask }: { question: string; setQuestion: (value: string) => void; answer: { answer: string; source: string; certainty: string } | null; ask: (question?: string) => void }) {
  const prompts = ["What is authorization?", "How should I handle a file-integrity alert?", "What is prompt injection?", "What is post-quantum cryptography?"];
  return <><PageHeading eyebrow="Nova mentor / grounded guidance" title="Ask better security questions." copy="Nova retrieves from approved local notes, shows its source, and keeps every recommendation behind a human approval gate." action={<Pill tone="success"><Bot size={14} /> Read-only assistant</Pill>} /><div className="cq-mentor-layout"><section className="cq-panel cq-mentor-panel"><div className="cq-mentor-orb"><div className="cq-mentor-ring" /><div className="cq-mentor-face"><Bot size={42} /></div></div><div className="cq-mentor-intro"><div className="cq-eyebrow">Nova / local context</div><h2>Context before confidence.</h2><p>Ask about a lesson, an alert, or a defensive decision. Nova will cite the local note it used and tell you what it cannot prove.</p></div><div className="cq-prompt-grid">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}<ArrowRight size={14} /></button>)}</div><div className="cq-mentor-input"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === "Enter" && ask()} placeholder="Ask Nova about security..." aria-label="Ask Nova a question" /><button className="cq-button cq-button-dark" onClick={() => ask()}><Search size={16} /> Ask Nova</button></div></section>{answer ? <section className="cq-panel cq-answer-panel"><div className="cq-answer-top"><span className="cq-answer-avatar"><Sparkles size={17} /></span><div><strong>Nova's grounded answer</strong><small>Retrieved from approved local knowledge</small></div><Pill tone="success">Human review</Pill></div><p className="cq-answer-copy">{answer.answer}</p><div className="cq-source"><FileText size={16} /><div><strong>Source</strong><span>{answer.source}</span></div></div><div className="cq-uncertainty"><span>Uncertainty</span>{answer.certainty}</div><div className="cq-safety-row"><Check size={15} /> automatic_action_taken = <b>false</b><Check size={15} /> human_approval_required = <b>true</b></div></section> : <section className="cq-panel cq-empty-answer"><Bot size={30} /><h3>Nova is ready</h3><p>Choose a prompt or ask your own question to see a cited, safety-aware answer.</p></section>}</div></>;
}

function EvidenceCenter({ evidence, review, exportReport, mode }: { evidence: Evidence[]; review: (id: string) => void; exportReport: () => void; mode: Mode }) {
  return <><PageHeading eyebrow={`Evidence center / ${mode} mode`} title="Make every decision traceable." copy="A calm review surface for scenario results and sanitized Wazuh evidence. Nothing changes automatically." action={<button className="cq-button cq-button-dark" onClick={exportReport}><CloudDownload size={16} /> Export Markdown report</button>} /><div className="cq-evidence-summary"><StatCard label="Total records" value={String(evidence.length)} hint="Stored locally" icon={Database} tone="blue" /><StatCard label="Pending review" value={String(evidence.filter((item) => item.status === "pending").length)} hint="Needs a human" icon={ClipboardCheck} tone="coral" /><StatCard label="Automatic actions" value="0" hint="Safety contract" icon={ShieldCheck} tone="mint" /></div><section className="cq-panel cq-evidence-panel"><div className="cq-panel-heading"><div><div className="cq-eyebrow">Review queue</div><h2>Evidence records</h2></div><Pill tone="success"><ShieldCheck size={14} /> Sanitized input only</Pill></div>{evidence.length === 0 ? <div className="cq-evidence-empty"><FileText size={28} /><h3>No evidence yet</h3><p>Run a safe lab validation or import a sanitized Wazuh alert to create the first record.</p></div> : <div className="cq-evidence-list">{evidence.map((item) => <div className="cq-evidence-row" key={item.id}><div className="cq-evidence-icon"><FileCheck2 size={18} /></div><div className="cq-evidence-main"><div className="cq-evidence-title"><strong>{item.title}</strong><Pill tone={item.status === "reviewed" ? "success" : "warning"}>{item.status}</Pill></div><p>{item.detail}</p><small>{item.id} · {new Date(item.timestamp).toLocaleString()}</small></div><div className="cq-evidence-action">{item.status === "pending" ? <button className="cq-button cq-button-small" onClick={() => review(item.id)}><Check size={14} /> Mark reviewed</button> : <span className="cq-reviewed"><Check size={14} /> Reviewed</span>}</div></div>)}</div>}</section><div className="cq-disclaimer"><LockKeyhole size={16} /><span>Production note: live Wazuh connectivity is intentionally marked pending until the authorized VirtualBox lab supplies a real alert.</span></div></>;
}

function Quantum() {
  return <><PageHeading eyebrow="Research track / simulated QML" title="Prepare for the post-quantum horizon." copy="A clear distinction between quantum computing, quantum-inspired experiments, and the practical migration work defenders can start today." action={<Pill tone="info"><Zap size={14} /> Research note</Pill>} /><div className="cq-quantum-hero"><div className="cq-quantum-copy"><div className="cq-quantum-symbol">Q</div><div><div className="cq-eyebrow">No quantum advantage claimed</div><h2>Plan the migration before the pressure arrives.</h2><p>CyberQuest uses a dependency-free simulated comparison for education. It does not claim to run on a quantum computer. The practical work is cryptographic inventory, long-lived secret prioritization, and standards-based post-quantum migration.</p></div></div><div className="cq-quantum-metric"><span>01</span><strong>Inventory</strong><small>Know where cryptography lives.</small></div><div className="cq-quantum-metric"><span>02</span><strong>Prioritize</strong><small>Protect long-lived secrets.</small></div><div className="cq-quantum-metric"><span>03</span><strong>Migrate</strong><small>Use hybrid, reviewed transitions.</small></div></div><div className="cq-quantum-grid"><article className="cq-panel"><div className="cq-eyebrow">Three ideas</div><h2>Keep the terms precise.</h2><div className="cq-definition"><span>Quantum computing</span><p>A distinct computing model with implications for some cryptographic assumptions.</p></div><div className="cq-definition"><span>Post-quantum cryptography</span><p>Classical algorithms designed to resist quantum attacks and suitable for migration planning.</p></div><div className="cq-definition"><span>Quantum-inspired ML</span><p>Classical simulation or heuristic exploration—not evidence of quantum advantage.</p></div></article><article className="cq-panel cq-quantum-chart"><div className="cq-panel-heading"><div><div className="cq-eyebrow">Educational simulation</div><h2>Evidence over hype</h2></div><Pill>Classical baseline</Pill></div><div className="cq-bars"><div><span>Classical baseline</span><i style={{ width: "74%" }}><b>0.74</b></i></div><div><span>Simulated QML</span><i className="bar-blue" style={{ width: "78%" }}><b>0.78</b></i></div></div><p className="cq-chart-note">Synthetic comparison only. Dataset, method, and limitations are documented for review.</p></article></div></>;
}
