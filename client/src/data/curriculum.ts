import {
  Activity,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  KeyRound,
  LockKeyhole,
  Network,
  Radar,
  ScanLine,
  Shield,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  Waypoints,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ToneName = "coral" | "blue" | "sky" | "mint" | "violet";
export type LessonLevel = "Foundation" | "Core" | "Applied" | "Advanced";

export type Lesson = {
  id: string;
  title: string;
  level: LessonLevel;
  icon: LucideIcon;
  color: ToneName;
  simple: string;
  technical: string;
  quiz: string;
  answer: string;
  options: string[];
};

export type ComicScene = { who: string; line: string; body: string };
export type Comic = {
  id: string;
  title: string;
  topic: string;
  accent: ToneName;
  hook: string;
  lesson: string;
  panels: ComicScene[];
};

export type SafeLab = {
  id: string;
  title: string;
  tag: string;
  tool: string;
  difficulty: "Guided" | "Tactical" | "Expert";
  description: string;
  result: string;
  icon: LucideIcon;
};

const lessonSeeds: Array<Omit<Lesson, "id" | "icon" | "color" | "options"> & { distractors: [string, string] }> = [
  { title: "Security mindset", level: "Foundation", simple: "Security starts with careful questions, not dramatic tools.", technical: "Trust boundaries, assets, actors, assumptions, and the difference between a signal and a conclusion.", quiz: "What should a defender do before choosing a response?", answer: "Understand the asset and evidence", distractors: ["Guess the attacker", "Delete the alert"] },
  { title: "The CIA triad", level: "Foundation", simple: "Confidentiality, integrity, and availability describe what protection must preserve.", technical: "Map controls and events to confidentiality, integrity, availability, and business impact.", quiz: "Which property means data remains accurate and unchanged?", answer: "Integrity", distractors: ["Availability", "Anonymity"] },
  { title: "Asset inventory", level: "Foundation", simple: "You cannot defend what you cannot name, locate, and assign an owner to.", technical: "Asset identity, ownership, lifecycle, criticality, software inventory, and drift detection.", quiz: "What makes an inventory useful during triage?", answer: "Owner, location, and criticality", distractors: ["Only a hostname", "A random label"] },
  { title: "Threat modeling", level: "Foundation", simple: "Threat modeling turns a vague worry into a map of risks and mitigations.", technical: "Assets, entry points, trust boundaries, abuse cases, mitigations, and residual risk.", quiz: "What is a trust boundary?", answer: "A point where assumptions or permissions change", distractors: ["A faster network link", "A password hint"] },
  { title: "Risk scoring", level: "Foundation", simple: "Risk is a reasoned priority, not a scary-sounding label.", technical: "Likelihood, impact, exposure, confidence, uncertainty, and the limits of ordinal scoring.", quiz: "What should a risk score help a team decide?", answer: "What to investigate or improve first", distractors: ["Who to blame", "Whether evidence matters"] },
  { title: "Defense in depth", level: "Foundation", simple: "Layered controls make one missed signal less likely to become a major incident.", technical: "Preventive, detective, corrective, and recovery layers across identity, network, host, and data.", quiz: "Why use multiple defensive layers?", answer: "To reduce single-control failure", distractors: ["To remove documentation", "To guarantee zero risk"] },
  { title: "Least privilege", level: "Foundation", simple: "Give each identity only the access needed for its approved task.", technical: "Role design, permission review, separation of duties, elevation windows, and access evidence.", quiz: "Which principle limits unnecessary permissions?", answer: "Least privilege", distractors: ["Open access", "Shared identity"] },
  { title: "Authentication signals", level: "Foundation", simple: "Authentication establishes who is asking; it does not decide everything they can do.", technical: "Identity proofing, authenticators, assurance levels, recovery paths, and failure handling.", quiz: "What does authentication establish?", answer: "The claimed identity", distractors: ["Every allowed action", "The incident severity"] },
  { title: "Multi-factor thinking", level: "Core", simple: "Strong authentication combines different kinds of proof.", technical: "Knowledge, possession, inherence, phishing resistance, recovery, and step-up authentication.", quiz: "Which is a separate authentication factor?", answer: "A hardware security key", distractors: ["A second copy of the password", "A longer username"] },
  { title: "Authorization boundaries", level: "Core", simple: "Authorization decides which action an authenticated identity may perform.", technical: "RBAC, ABAC, resource ownership, deny-by-default, policy evaluation, and audit trails.", quiz: "What does authorization determine?", answer: "What an identity may access", distractors: ["The network speed", "The model size"] },
  { title: "Password and secret hygiene", level: "Core", simple: "Secrets should be protected, rotated, and kept out of logs and screenshots.", technical: "Secret handling, redaction, vault references, rotation, exposure review, and safe test fixtures.", quiz: "What is the safe response to a secret in an alert?", answer: "Redact and rotate through an approved process", distractors: ["Copy it into the report", "Publish it for training"] },
  { title: "Secure sessions", level: "Core", simple: "Sessions need clear lifetime, renewal, logout, and device boundaries.", technical: "Cookie flags, expiry, revocation, CSRF protection, idle timeout, and session evidence.", quiz: "What should happen after logout?", answer: "The session should be invalidated", distractors: ["The token should remain forever", "The password should be printed"] },
  { title: "Network segmentation", level: "Core", simple: "Segmentation narrows what can talk to what.", technical: "Zones, host-only networks, allowlists, management planes, egress controls, and routing evidence.", quiz: "What does segmentation reduce?", answer: "Unnecessary reachability", distractors: ["The need for monitoring", "The value of asset owners"] },
  { title: "IP scope and address context", level: "Core", simple: "An address is evidence only when interpreted inside the approved network context.", technical: "Private ranges, loopback, NAT, host-only networks, address validation, and out-of-scope rejection.", quiz: "What should happen to a public source address in this lab?", answer: "Reject it as out of scope", distractors: ["Run more commands", "Assume compromise"] },
  { title: "DNS as a security signal", level: "Core", simple: "Name lookups provide context, but a lookup alone is not proof of malicious intent.", technical: "Resolvers, cache behavior, baselines, domain age as context, and privacy-aware logging.", quiz: "What is a DNS alert by itself?", answer: "A signal that needs context", distractors: ["A verdict", "Permission to block everything"] },
  { title: "Logging with purpose", level: "Core", simple: "Good logs answer who, what, when, where, and how confidently.", technical: "Event schemas, timestamps, retention, normalization, clock drift, and access control for logs.", quiz: "Which detail helps reconstruct an event?", answer: "A trustworthy timestamp", distractors: ["A decorative color", "An unverified guess"] },
  { title: "Telemetry and baselines", level: "Core", simple: "A baseline makes unusual behavior visible without turning every difference into an incident.", technical: "Normal ranges, seasonality, change windows, false positives, and baseline ownership.", quiz: "What is a baseline used for?", answer: "Comparing observed behavior with expected behavior", distractors: ["Deleting old alerts", "Replacing evidence"] },
  { title: "File integrity evidence", level: "Core", simple: "A changed file is a clue to preserve and verify, not an automatic deletion order.", technical: "Hashes, ownership, path, timestamp, change control, and evidence preservation.", quiz: "What comes first after an integrity alert?", answer: "Preserve and verify evidence", distractors: ["Delete the file", "Block every IP"] },
  { title: "Process and service context", level: "Applied", simple: "Process names become meaningful when joined with parent, path, owner, and timing.", technical: "Process trees, signed binaries, service accounts, startup paths, and change windows.", quiz: "Which context reduces false positives?", answer: "Parent process and approved change window", distractors: ["A process name alone", "A dramatic headline"] },
  { title: "Alert triage", level: "Applied", simple: "Triage turns noisy signals into explainable next questions.", technical: "Severity, confidence, impact, scope, enrichment, timelines, and analyst notes.", quiz: "Which combination improves triage?", answer: "Evidence and context", distractors: ["Guessing", "Automatic deletion"] },
  { title: "Severity versus confidence", level: "Applied", simple: "A high-severity rule can still have uncertain evidence, and a low-severity signal can matter in a chain.", technical: "Separate rule level, analyst confidence, impact, and uncertainty in reports.", quiz: "What should a careful report separate?", answer: "Severity and confidence", distractors: ["Evidence and fiction", "Facts and timestamps"] },
  { title: "Timeline building", level: "Applied", simple: "A timeline lets a team test what happened before and after an alert.", technical: "UTC storage, clock drift, event ordering, correlation windows, and immutable source references.", quiz: "Why normalize time?", answer: "To compare events across systems", distractors: ["To hide missing evidence", "To change the alert"] },
  { title: "Evidence preservation", level: "Applied", simple: "Preserve the original observation before interpreting or changing anything.", technical: "Chain of custody, hashes, read-only copies, provenance, analyst notes, and reversible actions.", quiz: "What should remain available after enrichment?", answer: "The original alert and sanitized copy", distractors: ["Only the AI summary", "Only a screenshot"] },
  { title: "Incident communication", level: "Applied", simple: "A good update is calm, precise, and clear about what is still unknown.", technical: "Audience, impact statement, confidence, decisions, owners, escalation, and next review time.", quiz: "What belongs in a responsible update?", answer: "Facts, uncertainty, and next owner", distractors: ["Blame and speculation", "Unverified certainty"] },
  { title: "RAG foundations", level: "Applied", simple: "Retrieval grounds an assistant in approved local documents at question time.", technical: "Chunking, embeddings, provenance, top-k retrieval, context limits, and refresh workflows.", quiz: "What does RAG add to a local assistant?", answer: "Retrieved approved context", distractors: ["Automatic authority", "A new network route"] },
  { title: "Prompt injection defense", level: "Applied", simple: "Alert text is data, even when it looks like an instruction.", technical: "Trust boundaries, instruction hierarchy, content isolation, output validation, and adversarial fixtures.", quiz: "How should instruction-shaped alert text be treated?", answer: "As untrusted data", distractors: ["As system instructions", "As executable code"] },
  { title: "Human approval gates", level: "Applied", simple: "A recommendation is not a remediation; a person must review the evidence and impact.", technical: "Approval states, dual control, reversible playbooks, audit records, and deny-by-default actions.", quiz: "What must happen before a real response action?", answer: "Human review and approval", distractors: ["Model confidence alone", "Automatic deletion"] },
  { title: "Wazuh alert enrichment", level: "Advanced", simple: "Enrichment adds explanation without changing the monitored endpoint.", technical: "Sanitization, private-lab scope, selected-rule integrations, receiver health, and audit output.", quiz: "What should the local receiver do first?", answer: "Validate scope and redact data", distractors: ["Execute the alert", "Block the source"] },
  { title: "Post-quantum inventory", level: "Advanced", simple: "Quantum readiness starts with knowing where cryptography is used.", technical: "Algorithms, key lengths, certificates, protocols, vendors, data lifetimes, and dependency mapping.", quiz: "What is the first practical PQC step?", answer: "Create a cryptographic inventory", distractors: ["Buy a quantum computer", "Replace every firewall"] },
  { title: "Migration planning", level: "Advanced", simple: "A safe migration is staged, measured, and tested for compatibility.", technical: "Prioritization, hybrid transitions, crypto agility, testing, rollback, and standards alignment.", quiz: "What makes a migration safer?", answer: "Staged testing with rollback", distractors: ["One irreversible switch", "Ignoring dependencies"] },
];

const lessonIcons: LucideIcon[] = [Shield, ShieldCheck, ScanLine, Waypoints, Radar, Network, LockKeyhole, KeyRound, Users, ClipboardCheck, Sparkles, CheckCircle2, Network, ScanLine, Waypoints, FileText, Activity, FileCheck2, TerminalSquare, Radar, Activity, ClipboardCheck, FileCheck2, Users, Bot, ShieldCheck, CheckCircle2, Radar, Zap, Waypoints];
const lessonColors: ToneName[] = ["coral", "blue", "sky", "mint", "violet"];

export const lessons: Lesson[] = lessonSeeds.map((seed, index) => ({
  ...seed,
  id: `L${String(index + 1).padStart(2, "0")}`,
  icon: lessonIcons[index % lessonIcons.length],
  color: lessonColors[index % lessonColors.length],
  options: [seed.answer, ...seed.distractors],
}));

const comicSeeds: Array<[string, string, ToneName, string, string]> = [
  ["The Signal in the Fog", "Security mindset", "coral", "A quiet dashboard blinks once", "Slow down and define the question before the tool."],
  ["Three Things to Protect", "CIA triad", "blue", "The archive door hums after midnight", "Name the property at risk before selecting a control."],
  ["Map of the City", "Asset inventory", "sky", "Byte finds an unlabeled rooftop", "Owners and criticality make the map actionable."],
  ["The Boundary Line", "Threat modeling", "mint", "A bridge connects two districts", "Trust boundaries reveal where assumptions change."],
  ["The Risk Compass", "Risk scoring", "violet", "A compass spins between two signals", "Priority is reasoned from impact, likelihood, and confidence."],
  ["Layer Cake Protocol", "Defense in depth", "coral", "One shield flickers during a storm", "Independent layers reduce single-control failure."],
  ["The Smallest Key", "Least privilege", "blue", "A master key appears in the school hall", "Smaller permissions make review and recovery safer."],
  ["Name Before Door", "Authentication", "sky", "A visitor knows the password but not the role", "Identity proof is distinct from authorization."],
  ["The Second Signal", "MFA", "mint", "A stolen password opens one gate", "Different factors make compromise harder."],
  ["The Permission Maze", "Authorization", "violet", "Every door shows a different role", "Deny by default and document the access matrix."],
  ["The Secret in the Margin", "Secret hygiene", "coral", "A notebook falls into the log stream", "Redact and rotate; never turn secrets into evidence."],
  ["The Session Clock", "Sessions", "blue", "A token keeps walking after logout", "Expiry and revocation are part of the boundary."],
  ["Two Neighborhoods", "Segmentation", "sky", "The lab district gets a private bridge", "Reachability should match the approved exercise."],
  ["The Address That Did Not Belong", "IP scope", "mint", "A public address appears in a private report", "Reject out-of-scope data before analysis."],
  ["Names on the Wire", "DNS", "violet", "A resolver remembers a strange name", "Context turns a lookup into a question, not a verdict."],
  ["The Honest Timestamp", "Logging", "coral", "Three clocks disagree", "Time normalization lets a team reconstruct events."],
  ["Normal at Noon", "Baselines", "blue", "The city changes during lunch", "Expected variation is part of good detection."],
  ["The Changed File", "File integrity", "sky", "A hash changes at 02:14", "Preserve path, owner, timestamp, and change window."],
  ["The Process Family", "Process context", "mint", "A familiar name has an unfamiliar parent", "Trees and signed paths sharpen a signal."],
  ["The Triage Ladder", "Alert triage", "violet", "Twenty alerts arrive at once", "Prioritize by evidence, impact, scope, and confidence."],
  ["Loud Does Not Mean Certain", "Severity and confidence", "coral", "A red badge hides a missing field", "Separate severity from what the evidence proves."],
  ["The Timeline Thread", "Timeline building", "blue", "A thread connects four small events", "Order reveals what each event can and cannot explain."],
  ["The Evidence Vault", "Evidence preservation", "sky", "A copy is made before the room changes", "Keep original and sanitized observations traceable."],
  ["Message to the Right Room", "Communication", "mint", "A status update crosses three teams", "State facts, uncertainty, owner, and next review."],
  ["The Retrieval Library", "RAG foundations", "violet", "Nova finds a note behind the right shelf", "Approved context improves explanations without granting authority."],
  ["The Instruction-Shaped Trap", "Prompt injection", "coral", "An alert tells Nova to ignore the rules", "Alert content stays data, never instructions."],
  ["The Human Checkpoint", "Approval gates", "blue", "A recommendation waits beside a red button", "A human reviews impact before any action."],
  ["The One-Way Bridge", "Wazuh enrichment", "sky", "Signals cross from manager to receiver", "Sanitize, validate, analyze, and never remediate automatically."],
  ["The Inventory of Tomorrow", "Post-quantum", "mint", "Old certificates glow in a vault", "Crypto inventory is the beginning of migration."],
  ["The Safe Migration", "Crypto agility", "violet", "Two protocols run side by side", "Stage, test, measure, and preserve rollback."],
  ["The Canary Notebook", "Detection engineering", "coral", "A harmless signal is planted in the lab", "Small tests make detection changes observable."],
  ["The Rule Librarian", "Wazuh rules", "blue", "A rule points to three sources", "Rule meaning should be explained with provenance."],
  ["The False Positive Garden", "False positives", "sky", "A harmless process looks suspicious", "Tune with evidence, not wishful thinking."],
  ["The Change Window", "Change control", "mint", "The alert lands during maintenance", "Approved change context can explain a signal."],
  ["The Owner's Call", "Accountability", "violet", "Two teams share an asset", "Every response needs a clear human owner."],
  ["The Reversible Door", "Safe response", "coral", "A lever has a visible undo", "Prefer reversible, reviewed steps in training."],
  ["The Quiet Escalation", "Incident levels", "blue", "A pattern grows without noise", "Escalation follows impact and confidence, not drama."],
  ["The Privacy Filter", "Data minimization", "sky", "A report contains more than the analyst needs", "Minimum necessary data is safer to share."],
  ["The Audit Thread", "Auditability", "mint", "A decision leaves a clean trace", "Record who, what, why, and when."],
  ["The Recovery Map", "Resilience", "violet", "A service returns after a safe pause", "Recovery is tested, measured, and learned from."],
  ["The Training Snapshot", "Lab snapshots", "coral", "A classroom state is saved", "Snapshots make experiments repeatable and reversible."],
  ["The Model With Humility", "AI uncertainty", "blue", "Nova finds two plausible answers", "Uncertainty belongs in the output."],
  ["The Source Card", "Provenance", "sky", "A claim has no citation", "Every important explanation points to an approved source."],
  ["The Boundary Test", "Authorization testing", "mint", "A student reaches for an admin door", "A denied action can be a successful validation."],
  ["The Log That Stayed", "Retention", "violet", "An old event answers a new question", "Retention should match investigative and privacy needs."],
  ["The Signal Relay", "Correlation", "coral", "Two modest signals form a pattern", "Correlation increases context without inventing certainty."],
  ["The Safe Sandbox", "Isolation", "blue", "The city walls close before practice", "Exercise networks must stay private and bounded."],
  ["The Review Circle", "Peer review", "sky", "A second analyst sees the evidence", "Independent review catches assumptions."],
  ["The Clear Handoff", "Runbooks", "mint", "A night shift inherits an alert", "A clear handoff preserves decisions and next steps."],
  ["The Last Lesson", "Continuous improvement", "violet", "The team rewrites the playbook", "Every exercise should improve the next one."],
];

const sceneBeats: Array<[string, string]> = [
  ["Signal", "The team names exactly what was observed before interpreting it."],
  ["Scope", "Shield confirms the event belongs to the private training boundary."],
  ["Baseline", "Byte checks the expected state, owner, and approved change window."],
  ["Evidence", "Nova preserves the timestamp, source, and relevant fields."],
  ["Question", "The team writes the smallest question that the evidence can answer."],
  ["Challenge", "A tempting conclusion is tested against a second source."],
  ["Guardrail", "The assistant rejects instruction-shaped content and unsafe shortcuts."],
  ["Context", "Approved local notes add meaning without becoming authority."],
  ["Review", "A human reviewer checks impact, uncertainty, and reversibility."],
  ["Lesson", "The decision is recorded so the next analyst can learn from it."],
];

export const comics: Comic[] = comicSeeds.map(([title, topic, accent, hook, lesson], index) => ({
  id: `C${String(index + 1).padStart(2, "0")}`,
  title,
  topic,
  accent,
  hook,
  lesson,
  panels: sceneBeats.map(([beat, body], sceneIndex) => ({
    who: sceneIndex % 3 === 0 ? "Byte" : sceneIndex % 3 === 1 ? "Shield" : "Nova",
    line: `${beat}: ${sceneIndex === 0 ? hook : `${title} asks the team to ${beat.toLowerCase()}.`}`,
    body: `${body} ${lesson}`,
  })),
}));

export const scenarios: SafeLab[] = [
  { id: "SEC-LAB-001", title: "Role boundary check", tag: "Access control", tool: "role_permission_check_v1", difficulty: "Guided", description: "Verify that a student role cannot request an admin-only dashboard capability.", result: "Student requesting admin:dashboard is denied as expected.", icon: LockKeyhole },
  { id: "SEC-LAB-002", title: "Controlled file event", tag: "File integrity", tool: "controlled_file_event_v1", difficulty: "Guided", description: "Create a synthetic file event and record its path, timestamp, and expected change window.", result: "Synthetic /opt/wazuh-test/test.txt event is recorded as evidence.", icon: FileCheck2 },
  { id: "SEC-LAB-003", title: "Prompt injection gate", tag: "AI safety", tool: "untrusted_alert_text_v1", difficulty: "Guided", description: "Pass instruction-shaped alert text through the analysis boundary and verify it remains data.", result: "Instruction-shaped alert content is rejected as untrusted data.", icon: Bot },
  { id: "SEC-LAB-004", title: "MFA policy inspection", tag: "Identity", tool: "mfa_policy_check_v1", difficulty: "Guided", description: "Compare a synthetic account policy with the approved second-factor requirement.", result: "Policy requires a separate factor and records the verification state.", icon: KeyRound },
  { id: "SEC-LAB-005", title: "Session expiry review", tag: "Identity", tool: "session_expiry_check_v1", difficulty: "Guided", description: "Validate that an expired training session cannot be reused.", result: "Expired session is rejected and no new permission is granted.", icon: Users },
  { id: "SEC-LAB-006", title: "Private subnet scope", tag: "Network", tool: "private_scope_validator_v1", difficulty: "Guided", description: "Validate that all alert addresses belong to the approved 192.168.56.0/24 lab range.", result: "In-scope addresses pass; public addresses are rejected before analysis.", icon: Network },
  { id: "SEC-LAB-007", title: "Allowlist drift check", tag: "Network", tool: "allowlist_diff_v1", difficulty: "Tactical", description: "Compare a saved lab allowlist with a synthetic changed version.", result: "The changed entry is highlighted for human review without applying it.", icon: Waypoints },
  { id: "SEC-LAB-008", title: "DNS baseline comparison", tag: "Network", tool: "dns_baseline_check_v1", difficulty: "Tactical", description: "Compare synthetic resolver events with a small approved baseline.", result: "New lookup is surfaced as a context question, not an attack verdict.", icon: Radar },
  { id: "SEC-LAB-009", title: "Port exposure inventory", tag: "Network", tool: "service_inventory_v1", difficulty: "Tactical", description: "Read a pre-captured service inventory and mark unexpected listeners for review.", result: "Unexpected listener is reported with owner and evidence fields.", icon: ScanLine },
  { id: "SEC-LAB-010", title: "Hash continuity check", tag: "File integrity", tool: "hash_continuity_v1", difficulty: "Tactical", description: "Compare before and after hashes in a synthetic, read-only record.", result: "Hash mismatch is recorded; no file is deleted or modified.", icon: FileCheck2 },
  { id: "SEC-LAB-011", title: "Log completeness audit", tag: "Observability", tool: "log_completeness_v1", difficulty: "Tactical", description: "Check whether a test event includes timestamp, agent, rule, and source fields.", result: "Missing fields are listed as uncertainty for the analyst.", icon: FileText },
  { id: "SEC-LAB-012", title: "Severity-confidence matrix", tag: "Triage", tool: "triage_matrix_v1", difficulty: "Tactical", description: "Place synthetic alerts on separate severity and confidence axes.", result: "Priority is explained without collapsing severity into certainty.", icon: Radar },
  { id: "SEC-LAB-013", title: "Timeline assembly", tag: "Triage", tool: "timeline_builder_v1", difficulty: "Tactical", description: "Order sanitized UTC events from three lab sources.", result: "A reviewable timeline is created with source references intact.", icon: Activity },
  { id: "SEC-LAB-014", title: "Secret redaction audit", tag: "Privacy", tool: "secret_redaction_v1", difficulty: "Guided", description: "Send a fixture containing secret-like keys through the sanitizer.", result: "Secret-like fields are redacted before the payload reaches analysis.", icon: ShieldCheck },
  { id: "SEC-LAB-015", title: "RAG provenance check", tag: "AI safety", tool: "rag_source_check_v1", difficulty: "Tactical", description: "Verify that an analysis cites only approved local knowledge documents.", result: "Source filenames are present and unsupported claims are marked uncertain.", icon: Bot },
  { id: "SEC-LAB-016", title: "Human approval gate", tag: "Governance", tool: "approval_state_v1", difficulty: "Guided", description: "Check that every recommended action remains pending until a reviewer acts.", result: "human_approval_required=true and automatic_action_taken=false.", icon: ClipboardCheck },
  { id: "SEC-LAB-017", title: "One-way Wazuh bridge", tag: "Integration", tool: "wazuh_receiver_health_v1", difficulty: "Expert", description: "Validate health, payload scope, and response fields for the local receiver.", result: "Receiver returns analyzed status and preserves the original alert boundary.", icon: TerminalSquare },
  { id: "SEC-LAB-018", title: "Rollback rehearsal", tag: "Resilience", tool: "rollback_plan_v1", difficulty: "Expert", description: "Check that an integration backup and removal path are documented.", result: "Rollback steps are present and no endpoint change is executed.", icon: Shield },
  { id: "SEC-LAB-019", title: "Snapshot evidence review", tag: "Resilience", tool: "snapshot_manifest_v1", difficulty: "Tactical", description: "Compare a training snapshot manifest with its expected lab inventory.", result: "Drift is reported for review and the snapshot remains untouched.", icon: CheckCircle2 },
  { id: "SEC-LAB-020", title: "Quantum inventory seed", tag: "Quantum-safe", tool: "crypto_inventory_v1", difficulty: "Expert", description: "Record algorithms, certificate lifetimes, and migration priority from synthetic assets.", result: "Long-lived cryptography is prioritized for staged post-quantum planning.", icon: Zap },
];
