import { bubbles, egQuestions, landingStyles as S, newItems, oldItems, painCells, personas, solCards, sources, upcoming } from "./landingShared";

export function HeroSection() {
  return (
    <section id="hero" style={S.hero}>
      <div style={S.heroLeft}>
        <div style={S.eyebrowWrap} className="anim-fadeup-1">
          <div style={S.eyebrowLine} />
          <span style={S.eyebrowTxt}>AI Financial Co-pilot — Beta Now Open</span>
        </div>

        <h1 style={S.heroTitle} className="anim-fadeup-2">
          <div style={S.htStack}>
            <span className="ht-solid">YOUR</span>
            <span style={S.htStackLabel}>money is</span>
          </div>
          <span className="ht-outline">EVERY-</span>
          <span className="ht-outline">WHERE.</span>
          <span className="ht-serif">your clarity shouldn't be.</span>
        </h1>

        <p style={S.heroSub} className="anim-fadeup-3">
          One intelligent layer that unifies your bank accounts, UPI apps, and subscriptions —
          and shows you your <strong style={{ fontWeight: 700, color: "var(--black)" }}>True Balance™</strong> after every upcoming bill, EMI, and rent.
        </p>

        <div style={S.heroCtas} className="anim-fadeup-4">
          <a href="#cta" style={S.btnMain} className="btn-shadow">Get Free Access</a>
          <a href="#solution" style={S.btnTxt}>See how it works <span>→</span></a>
        </div>
      </div>

      <div style={S.heroRight} className="hero-dot-grid anim-fadein-5">
        <div style={{ ...S.fc, top: "16%", right: "-2%" }} className="anim-float-1">
          <div style={S.fcLbl}>True Balance™</div>
          <div style={S.fcVal}>₹14,280</div>
          <div style={S.fcSub}>After rent, EMI &amp; subs</div>
        </div>

        <div style={S.mockup}>
          <div style={S.mBar}>
            <span style={S.mLogo}>ONLYFINANCE</span>
            <span style={S.mPill}>● Live</span>
          </div>
          <div style={S.tbLabel}>True Balance™</div>
          <div style={S.tbAmt}>₹14,280</div>
          <div style={S.tbSub}>safe to spend right now</div>
          <div style={S.mdiv} />
          <div style={S.srcList}>
            {sources.map((row) => (
              <div key={row.label} style={S.srcRow}>
                <span style={S.srcL}><span style={S.srcDot} />{row.label}</span>
                <span style={S.srcR}>{row.amount}</span>
              </div>
            ))}
          </div>
          <div style={S.mdiv} />
          <div style={S.upcLabel}>Upcoming Obligations</div>
          <div style={S.upcList}>
            {upcoming.map((item) => (
              <div key={item.name} style={S.upcRow}>
                <div>
                  <div style={S.upcN}>{item.name}</div>
                  <div style={S.upcD}>{item.date}</div>
                </div>
                <div style={S.upcA}>{item.amount}</div>
              </div>
            ))}
          </div>
          <div style={S.cpBox}>
            <div style={S.cpQ}>"Can I go to that ₹800 dinner tonight?"</div>
            <div style={S.cpA}><strong style={{ color: "rgba(247,246,242,.75)", fontWeight: 600 }}>Yes, comfortably.</strong> You'll still have ₹13,480 — rent is 3 days out. Go enjoy it.</div>
          </div>
        </div>

        <div style={{ ...S.fc, bottom: "20%", left: "-4%" }} className="anim-float-2">
          <div style={S.fcLbl}>Invisible Leak Found</div>
          <div style={S.fcVal}>₹840/mo</div>
          <div style={S.fcSub}>3 forgotten subscriptions</div>
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section id="problem" style={S.section}>
      <div style={S.sHeader}>
        <div className="s-ghost-num">01</div>
        <div>
          <div style={S.sEyebrow}>The Problem</div>
          <h2 style={S.sTitle}>
            You're not broke. You're in{" "}
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", letterSpacing: 0, color: "var(--dim)" }}>Financial Fog.</em>
          </h2>
        </div>
      </div>
      <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.85, color: "var(--dim)", maxWidth: 600, marginBottom: 52 }}>
        Your money lives in 4 different places. Your brain tries to hold a running total while tracking UPI spends, EMIs due next Tuesday, and the subscription you forgot. No app shows your actual number — what's safe to spend, right now.
      </p>
      <div style={S.painGrid}>
        {painCells.map((cell) => (
          <div key={cell.title} style={S.painCell} className="reveal">
            <span style={S.pIco}>{cell.icon}</span>
            <div style={S.pTitle}>{cell.title}</div>
            <div style={S.pDesc}>{cell.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section id="solution" style={S.solSection}>
      <div style={S.solEyebrow}>The Solution</div>
      <div>
        <span className="sol-h1">FROM REPORTER</span>
        <span className="sol-h2">to co-pilot.</span>
      </div>
      <div style={S.solGrid}>
        {solCards.map((card) => (
          <div key={card.num} style={S.solCard} className="reveal">
            <span style={S.solN}>{card.num}</span>
            <div style={S.solHead}>{card.head}</div>
            <div style={S.solDesc}>{card.desc}</div>
            <span style={S.solTag}>{card.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CopilotSection() {
  return (
    <section id="copilot" style={S.copilotWrap}>
      <div>
        <div style={S.chatWin}>
          <div style={S.chatHdr}>
            <div style={S.chatAv}>🤖</div>
            <div>
              <div style={S.chatName}>FinanceGPT</div>
              <div style={S.chatSt}>● Online · Knows your full financial picture</div>
            </div>
          </div>
          <div style={S.bubblesWrap}>
            {bubbles.map((bubble, index) => (
              <div key={index} style={bubble.role === "user" ? S.bblUser : S.bblAi} className="reveal">
                {bubble.content}
              </div>
            ))}
          </div>
          <div style={S.chatInp}>
            <div style={S.cinMock}>Ask anything about your money…</div>
            <div style={S.csend}>↑</div>
          </div>
        </div>
      </div>
      <div>
        <div style={S.sEyebrow}>AI Co-pilot</div>
        <h2 style={S.cpTitle}>
          Ask your money{" "}
          <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", letterSpacing: 0, color: "var(--dim)" }}>anything.</em>
        </h2>
        <p style={S.cpBody}>
          The co-pilot answers with full context — your balances across all accounts, upcoming obligations, spending patterns, and goals. No more guessing.
        </p>
        <ul style={S.egList}>
          {egQuestions.map((question) => <li key={question} style={S.egItem}>{question}</li>)}
        </ul>
        <a href="#cta" style={S.btnMain} className="btn-shadow">Try the Co-pilot</a>
      </div>
    </section>
  );
}

export function AudienceSection() {
  return (
    <section id="audience" style={S.audSection}>
      <div style={S.audEyebrow}>Who It's For</div>
      <h2 style={S.audHeadline}>
        BUILT FOR THE
        <br />
        <span className="aud-em">generation juggling</span>
        <br />
        EVERYTHING.
      </h2>
      <div style={S.personaGrid}>
        {personas.map((persona) => (
          <div key={persona.name} style={S.personaCard} className="reveal">
            <div className="p-initial-bg">{persona.initial}</div>
            <div style={S.pTag}>{persona.tag}</div>
            <div style={S.pName}>{persona.name}</div>
            <div style={S.pRole}>{persona.role}</div>
            <div style={S.pPain}>{persona.pain}</div>
            <div style={S.pSolve}>{persona.solve}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CompareSection() {
  return (
    <section id="compare" style={S.cmpSection}>
      <div style={S.cmpHeader}>
        <div style={S.cmpSuper}>The Paradigm Shift</div>
        <h2 style={S.cmpTitle}>
          Your bank app is a reporter.
          <br />
          <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", letterSpacing: 0, color: "var(--dim)" }}>We're your co-pilot.</em>
        </h2>
      </div>
      <div style={S.cmpGrid}>
        <div style={S.cmpColOld} className="reveal">
          <span style={S.cmpBadge}>Traditional App</span>
          <div style={{ ...S.cmpHead, color: "var(--black)" }}>Tells you what already happened.</div>
          <ul style={S.cmpItems}>
            {oldItems.map((item) => (
              <li key={item.text} style={S.cmpItemOld}>
                <span style={{ position: "absolute", left: 0, opacity: 0.35 }}>—</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div style={S.cmpVs}>vs</div>
        <div style={S.cmpColNew} className="reveal">
          <span style={S.cmpBadge}>OnlyFinance</span>
          <div className="cmp-head-new">Guides what comes next.</div>
          <ul style={S.cmpItems}>
            {newItems.map((item) => (
              <li key={item.text} style={S.cmpItemNew}>
                <span style={{ position: "absolute", left: 0, color: "rgba(247,246,242,.6)" }}>✓</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="cta" style={S.ctaSection}>
      <div style={S.ctaBgWord}>CLARITY</div>
      <p style={S.ctaSuper}>Limited Beta — Free for Students</p>
      <h2 style={S.ctaTitle}>KNOW YOUR</h2>
      <span className="cta-outline">true balance.</span>
      <p style={S.ctaSub}>
        Join 2,800+ students and young professionals already on the waitlist. Free during beta. No credit card needed.
      </p>
      <div style={S.emailForm}>
        <input type="email" placeholder="your@email.com" style={S.emailIn} />
        <button style={S.emailSub}>Join Waitlist</button>
      </div>
      <div style={S.ctaTrust}>
        {["Free for students", "Bank-grade encryption", "No data sold"].map((item) => (
          <span key={item} style={S.trustI}>{item}</span>
        ))}
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer style={S.footer}>
      <div style={S.fLogo}>ONLYFINANCE</div>
      <span style={S.fCopy}>© 2024 OnlyFinance · Made for India's next generation</span>
      <ul style={S.fLinks}>
        {["Privacy", "Security", "Contact"].map((item) => (
          <li key={item}><a href="#" style={S.fA}>{item}</a></li>
        ))}
      </ul>
    </footer>
  );
}
