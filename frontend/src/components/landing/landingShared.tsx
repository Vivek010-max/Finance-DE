import type { ReactNode } from "react";

interface SourceRow { label: string; amount: string }
interface UpcomingRow { name: string; date: string; amount: string }
interface SolCard { num: string; head: string; desc: string; tag: string }
interface Bubble { role: "user" | "ai"; content: ReactNode }
interface PersonaCard { initial: string; tag: string; name: string; role: string; pain: string; solve: string }
interface PainCell { icon: string; title: string; desc: string }
interface CompareItem { text: string }

export const sources: SourceRow[] = [
  { label: "SBI Savings", amount: "₹22,400" },
  { label: "PhonePe Wallet", amount: "₹1,200" },
  { label: "HDFC Account", amount: "₹8,560" },
];

export const upcoming: UpcomingRow[] = [
  { name: "Rent", date: "Due in 3 days", amount: "−₹12,000" },
  { name: "Student Loan EMI", date: "Due in 5 days", amount: "−₹4,800" },
  { name: "Netflix + Spotify", date: "Due in 8 days", amount: "−₹1,080" },
];

export const solCards: SolCard[] = [
  { num: "01", head: "True Balance™ Engine", tag: "Predictive Liquidity", desc: "Not your account balance. Your real spendable balance — after upcoming rent, EMIs, subs, and bills are automatically subtracted." },
  { num: "02", head: "Unified Aggregation", tag: "Zero Manual Entry", desc: "PhonePe, Google Pay, Paytm, SBI, HDFC — all accounts in one live view. Zero manual entry. One real number." },
  { num: "03", head: "AI Co-pilot", tag: "Gen AI Interface", desc: 'Ask anything in plain language. "Can I afford this?" "Where did my money go?" The AI answers with your full financial context.' },
  { num: "04", head: "Leak Detection", tag: "Invisible Spend Alert", desc: "Surfaces forgotten subscriptions, duplicate charges, and micro-transactions bleeding you invisibly — before they hurt." },
  { num: "05", head: "Calm UI", tag: "Psychological Safety", desc: "No anxiety dashboards. No red alerts. Minimal, intentional design that restores your sense of control, not overwhelm." },
  { num: "06", head: "Predictive Roadmaps", tag: "Future Planning", desc: "See when you can afford a goal purchase, how long savings last, and what a raise actually does to your lifestyle." },
];

export const bubbles: Bubble[] = [
  { role: "user", content: "Can I afford a ₹50 dinner if gym and rent are both due next week?" },
  {
    role: "ai",
    content: (
      <>
        <strong>Yes — go for it.</strong>
        <br />
        <br />
        True Balance: ₹14,280. After gym (₹999, 18th) + rent (₹12,000, 20th) you'll still have ₹1,331. A ₹50 dinner barely registers.
        <br />
        <br />
        <span style={{ opacity: 0.5 }}>Side note: Hotstar sub (₹299) on the 22nd you may have forgotten.</span>
      </>
    ),
  },
  { role: "user", content: "What are my invisible leaks this month?" },
  {
    role: "ai",
    content: (
      <>
        Found <strong>3 forgotten subscriptions:</strong>
        <br />
        <br />
        · Hotstar — ₹299/mo
        <br />
        · LinkedIn Premium — ₹2,399/mo
        <br />
        · Adobe CC (unused) — ₹1,675/mo
        <br />
        <br />
        <strong>₹4,373/mo</strong> — ₹52,476/year. Cancel the unused ones?
      </>
    ),
  },
];

export const personas: PersonaCard[] = [
  { initial: "P", tag: "The Student", name: "Priya, 21", role: "Engineering student · Allowance: ₹15,000/mo", pain: '"I never know if I can say yes to food with friends — the money feels gone before I spend it."', solve: "OnlyFinance shows Priya her exact safe-to-spend after tuition instalments — so she says yes or no with confidence, not anxiety." },
  { initial: "A", tag: "The Young Professional", name: "Arjun, 26", role: "Software engineer · Salary: ₹65,000 · EMI: ₹18,000", pain: '"I earn well but feel broke every month. I can never see rent, EMI, and subscriptions all at once."', solve: "OnlyFinance gives Arjun a single True Balance that accounts for everything — plus a co-pilot to make smarter moves." },
];

export const painCells: PainCell[] = [
  { icon: "🌫️", title: "Financial Fragmentation", desc: "Salary in SBI. Emergency fund in HDFC. Daily spends via Google Pay. No single view of your reality." },
  { icon: "👻", title: "Invisible Leaks", desc: "Subscriptions and micro-transactions bleed you silently. You only notice when your balance shocks you." },
  { icon: "✍️", title: "Manual Entry Fatigue", desc: "Spreadsheets. Notebooks. Decoy bank accounts. Smart people burning energy on financial logistics." },
  { icon: "⏳", title: "No Future Vision", desc: "Banking apps show what you spent. Nobody tells you what's safe to spend after next week's rent." },
];

export const oldItems: CompareItem[] = [
  { text: "Shows raw balance — ignores upcoming bills" },
  { text: "Covers one account only" },
  { text: "Numbers with no context" },
  { text: "Reactive — alerts after overspending" },
  { text: "Silent about forgotten subscriptions" },
  { text: "Anxiety-inducing notification flood" },
];

export const newItems: CompareItem[] = [
  { text: "True Balance™ after all future obligations" },
  { text: "All accounts, UPI apps, wallets unified" },
  { text: "Plain-language AI with full context" },
  { text: "Proactive — warns before overspending" },
  { text: "Surfaces and kills invisible leaks" },
  { text: "Calm UI designed for financial peace" },
];

export const egQuestions = [
  "Can I afford this trip next month?",
  "How long until I hit ₹1L in savings?",
  "Where did I overspend in June?",
  "What if I got a ₹10,000 raise?",
];

export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,100..900;1,100..900&family=Instrument+Serif:ital@0;1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --black: #080807;
  --white: #f7f6f2;
  --off:   #eeece7;
  --dim:   #6b6b63;
  --faint: #b8b8b0;
  --rule:  rgba(8,8,7,.1);
}
html { scroll-behavior: smooth; }
body { background: var(--white); color: var(--black); font-family:'Archivo',sans-serif; overflow-x:hidden; cursor:none; }
.of-cur      { position:fixed; width:9px; height:9px; background:var(--black); border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition:width .2s,height .2s,border-radius .2s; }
.of-cur-ring { position:fixed; width:34px; height:34px; border:1px solid rgba(8,8,7,.25); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:width .28s,height .28s; }
.ht-solid   { display:block; font-family:'Archivo Black',sans-serif; font-size:clamp(58px,7.5vw,108px); line-height:.92; letter-spacing:-0.03em; color:var(--black); }
.ht-outline { display:block; font-family:'Archivo Black',sans-serif; font-size:clamp(58px,7.5vw,108px); line-height:.92; letter-spacing:-0.03em; color:transparent; -webkit-text-stroke:1.5px var(--black); }
.ht-serif   { display:block; font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(44px,5.8vw,84px); line-height:1.05; letter-spacing:-0.01em; color:var(--dim); }
.btn-shadow { position:relative; }
.btn-shadow::after { content:''; position:absolute; inset:0; border:1.5px solid var(--black); transform:translate(4px,4px); transition:transform .2s; }
.btn-shadow:hover::after { transform:translate(6px,6px); }
.sol-h1 { display:block; font-family:'Archivo Black',sans-serif; font-size:clamp(44px,6vw,88px); line-height:.9; letter-spacing:-0.03em; color:var(--white); }
.sol-h2 { display:block; font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(40px,5.5vw,82px); line-height:1; letter-spacing:-0.01em; color:transparent; -webkit-text-stroke:1px rgba(247,246,242,.35); }
.aud-em { font-family:'Instrument Serif',serif; font-style:italic; font-weight:400; color:transparent; -webkit-text-stroke:1px rgba(247,246,242,.35); letter-spacing:-0.01em; }
.p-initial-bg { font-family:'Archivo Black',sans-serif; font-size:120px; line-height:1; letter-spacing:-0.04em; color:transparent; -webkit-text-stroke:1px rgba(247,246,242,.05); position:absolute; top:12px; right:24px; user-select:none; }
.hero-dot-grid::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(8,8,7,.12) 1px,transparent 1px); background-size:22px 22px; mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%); }
.cta-outline { font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(38px,6vw,84px); line-height:1; letter-spacing:-0.01em; color:var(--dim); display:block; }
.s-ghost-num { font-family:'Archivo Black',sans-serif; font-size:clamp(80px,10vw,140px); line-height:.85; letter-spacing:-0.04em; color:transparent; -webkit-text-stroke:1px rgba(8,8,7,.1); margin-right:32px; user-select:none; }
.cmp-head-new { font-family:'Archivo Black',sans-serif; font-size:26px; letter-spacing:-0.02em; line-height:1.15; margin-bottom:28px; color:var(--white); }
@keyframes fadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }
.glass-nav {
  background: rgba(247, 246, 242, 0.52);
  backdrop-filter: saturate(180%) blur(18px);
  -webkit-backdrop-filter: saturate(180%) blur(18px);
  border-bottom: 1px solid rgba(8, 8, 7, 0.12);
  box-shadow: 0 8px 24px rgba(8, 8, 7, 0.06);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass-nav {
    background: rgba(247, 246, 242, 0.9);
  }
}
@-moz-document url-prefix() {
  .glass-nav {
    background: rgba(247, 246, 242, 0.9);
  }
}
.anim-fadeup-1 { opacity:0; animation:fadeUp .8s ease .05s forwards; }
.anim-fadeup-2 { opacity:0; animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .15s forwards; }
.anim-fadeup-3 { opacity:0; animation:fadeUp .8s ease .35s forwards; }
.anim-fadeup-4 { opacity:0; animation:fadeUp .8s ease .5s forwards; }
.anim-fadein-5 { opacity:0; animation:fadeIn .9s ease .6s forwards; }
.anim-float-1  { animation:float 4.2s ease-in-out infinite; }
.anim-float-2  { animation:float 4.2s ease-in-out 2s infinite; }
.anim-pulse    { animation:pulse 2s ease-in-out infinite; }
`;

export const landingStyles = {
  page: { background: "var(--white)", color: "var(--black)", fontFamily: "'Archivo',sans-serif", overflowX: "hidden" as const, maxWidth: 1440, margin: "0 auto", padding: "0 clamp(20px, 4vw, 40px)" },
  navLogo: { fontFamily: "'Archivo Black',sans-serif", fontSize: 15, letterSpacing: "0.04em", color: "var(--black)" },
  navLinks: { display: "flex", gap: 36, listStyle: "none" as const },
  navA: { fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--dim)", textDecoration: "none" },
  navCta: { fontFamily: "'Archivo Black',sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--white)", background: "var(--black)", padding: "11px 24px", textDecoration: "none" },
  hero: { minHeight: "100vh", paddingTop: 0
    , display: "grid", gridTemplateColumns: "55% 45%", position: "relative" as const, overflow: "hidden" as const },
  heroLeft: { padding: "72px 52px 80px", display: "flex", flexDirection: "column" as const, justifyContent: "center", position: "relative" as const, zIndex: 2, borderRight: "1px solid var(--rule)" },
  eyebrowWrap: { display: "flex", alignItems: "center", gap: 14, marginBottom: 40 },
  eyebrowLine: { width: 32, height: 1, background: "var(--faint)" },
  eyebrowTxt: { fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "var(--dim)" },
  heroTitle: { marginBottom: 36 },
  htStack: { display: "flex", alignItems: "flex-end", gap: 14 },
  htStackLabel: { fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--faint)", paddingBottom: 14, lineHeight: "1" },
  heroSub: { fontSize: 13, fontWeight: 300, lineHeight: 1.85, color: "var(--dim)", maxWidth: 400, marginBottom: 48 },
  heroCtas: { display: "flex", alignItems: "center", gap: 20 },
  btnMain: { fontFamily: "'Archivo Black',sans-serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--white)", background: "var(--black)", padding: "16px 32px", textDecoration: "none", position: "relative" as const, transition: "opacity .2s" },
  btnTxt: { fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--dim)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 },
  heroRight: { display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 32px", background: "var(--off)", position: "relative" as const },
  mockup: { width: 310, background: "var(--black)", borderRadius: 18, padding: 24, boxShadow: "0 32px 72px rgba(8,8,7,.22),0 6px 20px rgba(8,8,7,.12)", position: "relative" as const, zIndex: 2 },
  mBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 },
  mLogo: { fontFamily: "'Archivo Black',sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "rgba(247,246,242,.28)" },
  mPill: { fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, background: "rgba(247,246,242,.07)", border: "1px solid rgba(247,246,242,.1)", color: "rgba(247,246,242,.35)", padding: "3px 9px", borderRadius: 99 },
  tbLabel: { fontSize: 8, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(247,246,242,.28)", marginBottom: 5 },
  tbAmt: { fontFamily: "'Archivo Black',sans-serif", fontSize: 48, lineHeight: 1, letterSpacing: "-0.03em", color: "var(--white)", marginBottom: 4 },
  tbSub: { fontSize: 9, fontWeight: 400, color: "rgba(247,246,242,.28)", marginBottom: 20 },
  mdiv: { height: 1, background: "rgba(247,246,242,.07)", marginBottom: 16 },
  srcList: { display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 18 },
  srcRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  srcL: { fontSize: "9.5px", fontWeight: 400, color: "rgba(247,246,242,.36)", display: "flex", alignItems: "center", gap: 7 },
  srcDot: { width: 4, height: 4, borderRadius: "50%", background: "rgba(247,246,242,.22)" },
  srcR: { fontSize: "9.5px", fontWeight: 600, color: "rgba(247,246,242,.62)" },
  upcLabel: { fontSize: 8, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(247,246,242,.2)", marginBottom: 9 },
  upcList: { display: "flex", flexDirection: "column" as const, gap: 6, marginBottom: 18 },
  upcRow: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(247,246,242,.04)", borderRadius: 6, padding: "8px 10px" },
  upcN: { fontSize: 10, fontWeight: 500, color: "rgba(247,246,242,.52)" },
  upcD: { fontSize: 8, fontWeight: 400, color: "rgba(247,246,242,.2)", marginTop: 1 },
  upcA: { fontSize: 10, fontWeight: 600, color: "rgba(247,246,242,.42)" },
  cpBox: { background: "rgba(247,246,242,.05)", border: "1px solid rgba(247,246,242,.08)", borderRadius: 9, padding: "12px 13px" },
  cpQ: { fontFamily: "'Instrument Serif',serif", fontStyle: "italic" as const, fontSize: 12, color: "rgba(247,246,242,.6)", marginBottom: 7, lineHeight: 1.4 },
  cpA: { fontSize: 9, fontWeight: 400, lineHeight: 1.6, color: "rgba(247,246,242,.38)" },
  fc: { position: "absolute" as const, background: "var(--white)", border: "1px solid rgba(8,8,7,.14)", padding: "12px 16px", borderRadius: 10, boxShadow: "0 8px 28px rgba(8,8,7,.08)", zIndex: 3 },
  fcLbl: { fontSize: 8, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--faint)", marginBottom: 3 },
  fcVal: { fontFamily: "'Archivo Black',sans-serif", fontSize: 20, letterSpacing: "-0.02em", color: "var(--black)" },
  fcSub: { fontSize: 8, fontWeight: 400, color: "var(--faint)", marginTop: 2 },
  section: { padding: "112px 52px", borderTop: "1px solid var(--rule)" },
  sectionAlt: { padding: "112px 52px", borderTop: "1px solid var(--rule)", background: "var(--off)" },
  sHeader: { display: "grid", gridTemplateColumns: "auto 1fr", gap: 0, marginBottom: 72, paddingBottom: 28, borderBottom: "1px solid var(--rule)", alignItems: "end" },
  sEyebrow: { fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "var(--faint)", marginBottom: 12 },
  sTitle: { fontFamily: "'Archivo Black',sans-serif", fontSize: "clamp(28px,3.2vw,46px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--black)" },
  painGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--rule)" },
  painCell: { background: "var(--white)", padding: "32px 28px" },
  pIco: { fontSize: 22, marginBottom: 14, display: "block", filter: "grayscale(1)" },
  pTitle: { fontFamily: "'Archivo Black',sans-serif", fontSize: 13, letterSpacing: "-0.01em", color: "var(--black)", marginBottom: 8 },
  pDesc: { fontSize: 11, fontWeight: 300, lineHeight: 1.75, color: "var(--dim)" },
  solSection: { background: "var(--black)", padding: "112px 52px" },
  solEyebrow: { fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(247,246,242,.25)", marginBottom: 16 },
  solGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(247,246,242,.07)", marginTop: 80 },
  solCard: { background: "var(--black)", padding: "44px 32px", borderTop: "1px solid rgba(247,246,242,.07)" },
  solN: { fontFamily: "'Archivo Black',sans-serif", fontSize: 11, letterSpacing: "0.16em", color: "rgba(247,246,242,.15)", marginBottom: 20, display: "block" },
  solHead: { fontFamily: "'Archivo Black',sans-serif", fontSize: 15, letterSpacing: "-0.01em", color: "var(--white)", marginBottom: 12 },
  solDesc: { fontSize: 11, fontWeight: 300, lineHeight: 1.8, color: "rgba(247,246,242,.38)" },
  solTag: { display: "inline-block", marginTop: 16, fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(247,246,242,.2)", border: "1px solid rgba(247,246,242,.09)", padding: "4px 10px" },
  copilotWrap: { padding: "112px 52px", borderTop: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" },
  chatWin: { background: "var(--black)", borderRadius: 18, padding: 24, boxShadow: "0 20px 56px rgba(8,8,7,.1)" },
  chatHdr: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(247,246,242,.07)" },
  chatAv: { width: 28, height: 28, background: "var(--white)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 },
  chatName: { fontFamily: "'Archivo Black',sans-serif", fontSize: 11, color: "var(--white)" },
  chatSt: { fontSize: "8.5px", fontWeight: 400, color: "rgba(247,246,242,.28)" },
  bubblesWrap: { display: "flex", flexDirection: "column" as const, gap: 11 },
  bblUser: { maxWidth: "88%", padding: "10px 13px", borderRadius: "10px 10px 3px 10px", fontSize: 10, fontWeight: 400, lineHeight: 1.65, background: "rgba(247,246,242,.07)", color: "rgba(247,246,242,.52)", alignSelf: "flex-end" as const },
  bblAi: { maxWidth: "88%", padding: "10px 13px", borderRadius: "10px 10px 10px 3px", fontSize: 10, fontWeight: 400, lineHeight: 1.65, background: "rgba(247,246,242,.04)", border: "1px solid rgba(247,246,242,.07)", color: "rgba(247,246,242,.68)", alignSelf: "flex-start" as const },
  chatInp: { marginTop: 16, display: "flex", gap: 8, paddingTop: 13, borderTop: "1px solid rgba(247,246,242,.05)" },
  cinMock: { flex: 1, background: "rgba(247,246,242,.04)", border: "1px solid rgba(247,246,242,.07)", borderRadius: 7, padding: "8px 12px", fontSize: 9, fontWeight: 400, color: "rgba(247,246,242,.2)" },
  csend: { width: 28, height: 28, background: "rgba(247,246,242,.08)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "rgba(247,246,242,.32)" },
  cpTitle: { fontFamily: "'Archivo Black',sans-serif", fontSize: "clamp(30px,3.2vw,46px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--black)", marginBottom: 10 },
  cpBody: { fontSize: 12, fontWeight: 300, lineHeight: 1.85, color: "var(--dim)", marginBottom: 28 },
  egList: { listStyle: "none" as const, display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 36 },
  egItem: { fontFamily: "'Instrument Serif',serif", fontStyle: "italic" as const, fontSize: 16, color: "var(--black)", padding: "10px 16px", borderLeft: "2px solid var(--rule)" },
  audSection: { padding: "112px 52px", background: "var(--black)", color: "var(--white)" },
  audEyebrow: { fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(247,246,242,.25)", marginBottom: 16 },
  audHeadline: { fontFamily: "'Archivo Black',sans-serif", fontSize: "clamp(32px,4vw,58px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--white)", marginBottom: 72 },
  personaGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(247,246,242,.07)" },
  personaCard: { background: "var(--black)", padding: "44px 36px", position: "relative" as const, overflow: "hidden" as const },
  pTag: { fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(247,246,242,.25)", marginBottom: 14 },
  pName: { fontFamily: "'Archivo Black',sans-serif", fontSize: 22, letterSpacing: "-0.02em", color: "var(--white)", marginBottom: 5 },
  pRole: { fontSize: 10, fontWeight: 400, color: "rgba(247,246,242,.3)", marginBottom: 20 },
  pPain: { fontFamily: "'Instrument Serif',serif", fontStyle: "italic" as const, fontSize: 15, color: "rgba(247,246,242,.6)", lineHeight: 1.5, marginBottom: 16 },
  pSolve: { fontSize: "10.5px", fontWeight: 300, lineHeight: 1.75, color: "rgba(247,246,242,.4)" },
  cmpSection: { padding: "112px 52px", borderTop: "1px solid var(--rule)" },
  cmpHeader: { marginBottom: 64 },
  cmpSuper: { fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "var(--faint)", marginBottom: 14 },
  cmpTitle: { fontFamily: "'Archivo Black',sans-serif", fontSize: "clamp(28px,3.2vw,46px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--black)" },
  cmpGrid: { display: "grid", gridTemplateColumns: "1fr 48px 1fr" },
  cmpColOld: { padding: "44px 36px", border: "1px solid var(--rule)", background: "var(--off)" },
  cmpColNew: { padding: "44px 36px", border: "1px solid var(--rule)", background: "var(--black)", color: "var(--white)" },
  cmpBadge: { fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, marginBottom: 20, display: "inline-block", padding: "4px 11px", border: "1px solid currentColor", opacity: 0.4 },
  cmpHead: { fontFamily: "'Archivo Black',sans-serif", fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 28 },
  cmpItems: { listStyle: "none" as const, display: "flex", flexDirection: "column" as const, gap: 12 },
  cmpItemOld: { fontSize: 11, fontWeight: 300, lineHeight: 1.6, paddingLeft: 20, position: "relative" as const, color: "var(--dim)" },
  cmpItemNew: { fontSize: 11, fontWeight: 300, lineHeight: 1.6, paddingLeft: 20, position: "relative" as const, color: "rgba(247,246,242,.48)" },
  cmpVs: { display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif',serif", fontStyle: "italic" as const, fontSize: 26, color: "var(--faint)" },
  ctaSection: { padding: "140px 52px", textAlign: "center" as const, position: "relative" as const, overflow: "hidden" as const, borderTop: "1px solid var(--rule)" },
  ctaBgWord: { position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Archivo Black',sans-serif", fontSize: "clamp(120px,20vw,260px)", letterSpacing: "-0.04em", color: "transparent", WebkitTextStroke: "1px rgba(8,8,7,.05)", whiteSpace: "nowrap" as const, pointerEvents: "none" as const, lineHeight: 1 },
  ctaSuper: { fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "var(--faint)", marginBottom: 20, position: "relative" as const },
  ctaTitle: { fontFamily: "'Archivo Black',sans-serif", fontSize: "clamp(42px,6.5vw,90px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--black)", marginBottom: 12, position: "relative" as const },
  ctaSub: { fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "var(--dim)", maxWidth: 400, margin: "0 auto", marginBottom: 48, position: "relative" as const },
  emailForm: { display: "inline-flex", border: "1.5px solid var(--black)", position: "relative" as const },
  emailIn: { background: "transparent", border: "none", outline: "none", padding: "15px 20px", fontSize: 11, fontWeight: 400, color: "var(--black)", width: 260 },
  emailSub: { background: "var(--black)", color: "var(--white)", border: "none", padding: "15px 24px", fontFamily: "'Archivo Black',sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: "none" },
  ctaTrust: { display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginTop: 24, position: "relative" as const },
  trustI: { fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--faint)", display: "flex", alignItems: "center", gap: 8 },
  footer: { padding: "32px 52px", borderTop: "1px solid rgba(247,246,242,.08)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--black)" },
  fLogo: { fontFamily: "'Archivo Black',sans-serif", fontSize: 13, letterSpacing: "0.04em", color: "var(--white)" },
  fCopy: { fontSize: 9, fontWeight: 400, letterSpacing: "0.1em", color: "rgba(247,246,242,.25)" },
  fLinks: { display: "flex", gap: 24, listStyle: "none" as const },
  fA: { fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(247,246,242,.25)", textDecoration: "none" },
} as const;
