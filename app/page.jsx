"use client";
import { useState, useEffect, useRef } from "react";

const DEMO_INPUTS = [
  { text: "\u092F\u0939 \u092A\u094D\u0930\u094B\u0921\u0915\u094D\u091F \u092C\u0939\u0941\u0924 \u092C\u0922\u093C\u093F\u092F\u093E \u0939\u0948, fast delivery!", lang: "Hinglish", safe: true, category: "Positive Review", confidence: 0.97 },
  { text: "\u092F\u0947 \u0932\u094B\u0917 \u092C\u0947\u0935\u0915\u0942\u092B \u092C\u0928\u093E\u0924\u0947 \u0939\u0948\u0902, scam \u0939\u0948 \u0938\u092C", lang: "Hinglish", safe: false, category: "Scam / Fraud", confidence: 0.91 },
  { text: "\u0B87\u0BA8\u0BCD\u0BA4 \u0B95\u0B9F\u0BC8 \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0BA8\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1", lang: "Tamil", safe: true, category: "Positive Review", confidence: 0.95 },
  { text: "\u0D08 \u0D38\u0D3E\u0D27\u0D28\u0D02 \u0D35\u0D47\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4D \u0D06\u0D23\u0D4D, \u0D2A\u0D48\u0D38 \u0D2A\u0D4B\u0D2F\u0D3F", lang: "Malayalam", safe: true, category: "Negative Review", confidence: 0.88 },
  { text: "\u0D07\u0D35\u0D28\u0D4D\u0D2E\u0D3E\u0D30\u0D46 \u0D12\u0D15\u0D4D\u0D15\u0D46 \u0D28\u0D3E\u0D1F\u0D4D\u0D1F\u0D3F\u0D32\u0D4D\u200D \u0D28\u0D3F\u0D28\u0D4D\u0D28\u0D4D \u0D13\u0D1F\u0D3F\u0D15\u0D4D\u0D15\u0D23\u0D02", lang: "Malayalam", safe: false, category: "Hate Speech", confidence: 0.93 },
];

function TypeWriter({ text, speed = 30, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    setDisplayed("");
    idx.current = 0;
    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone]);
  return (
    <span>
      {displayed}
      <span style={{ animation: "blink 1s step-end infinite", color: "#22c55e" }}>|</span>
    </span>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [demoPhase, setDemoPhase] = useState("typing");
  const [visibleSections, setVisibleSections] = useState(new Set());

  const currentDemo = DEMO_INPUTS[demoIdx];

  useEffect(() => {
    if (demoPhase === "result") {
      const t = setTimeout(() => {
        setDemoIdx((i) => (i + 1) % DEMO_INPUTS.length);
        setDemoPhase("typing");
      }, 3200);
      return () => clearTimeout(t);
    }
  }, [demoPhase]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, e.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const animStyle = (id, delay = 0) => ({
    opacity: visibleSections.has(id) ? 1 : 0,
    transform: visibleSections.has(id) ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  return (
    <div
      style={{
        background: "#080b12",
        color: "#c8cdd7",
        minHeight: "100vh",
        fontFamily: "'Outfit', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes grain { 0%,100% { transform: translate(0,0) } 10% { transform: translate(-5%,-10%) } 30% { transform: translate(3%,-15%) } 50% { transform: translate(12%,9%) } 70% { transform: translate(9%,4%) } 90% { transform: translate(-1%,7%) } }
        ::selection { background: #22c55e33; color: #22c55e; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080b12; }
        input:focus { outline: none; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Grain */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: "none", zIndex: 999, opacity: 0.03,
          background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          animation: "grain 8s steps(10) infinite",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: "1px solid #ffffff08",
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(8,11,18,0.85)", backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: 800, color: "#080b12",
            }}
          >
            M
          </div>
          <span style={{ fontWeight: 700, fontSize: "18px", color: "#f0f2f5", letterSpacing: "-0.5px" }}>
            ModerateAI
          </span>
        </div>
        
          href="#waitlist"
          style={{
            padding: "8px 20px", borderRadius: "8px", background: "#22c55e",
            color: "#080b12", fontSize: "13px", fontWeight: 600, textDecoration: "none",
          }}
        >
          Join Waitlist
        </a>
      </nav>

      {/* HERO */}
      <section id="hero" data-animate style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative", ...animStyle("hero") }}>
        <div
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)", width: "500px", height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "11px", color: "#22c55e", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "20px", fontWeight: 500 }}>
          Content Moderation API
        </div>
        <h1 style={{ fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 800, lineHeight: 1.1, color: "#f0f2f5", letterSpacing: "-1.5px", maxWidth: "700px", margin: "0 auto 20px" }}>
          Keep your marketplace <span style={{ color: "#22c55e" }}>safe</span>, in every{" "}
          <span style={{ color: "#22c55e" }}>Indian language</span>
        </h1>
        <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", maxWidth: "520px", margin: "0 auto 36px", fontWeight: 300 }}>
          AI-powered content moderation that understands Hindi, Malayalam, Tamil, Hinglish, and cultural context that Western tools completely miss.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#waitlist" style={{ padding: "14px 32px", borderRadius: "10px", background: "#22c55e", color: "#080b12", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Get Early Access <span style={{ fontSize: "18px" }}>{"\u2192"}</span>
          </a>
          <a href="#demo" style={{ padding: "14px 32px", borderRadius: "10px", background: "transparent", border: "1px solid #ffffff15", color: "#c8cdd7", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
            See Live Demo
          </a>
        </div>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "48px", flexWrap: "wrap" }}>
          {["500 free API calls/mo", "< 200ms response", "IT Act compliant"].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#6b7280", fontFamily: "'JetBrains Mono'" }}>
              <span style={{ color: "#22c55e", fontSize: "14px" }}>{"\u2713"}</span> {t}
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" data-animate style={{ padding: "60px 24px", ...animStyle("demo") }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "11px", color: "#22c55e", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Live Demo</div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#f0f2f5", textAlign: "center", marginBottom: "32px", letterSpacing: "-0.5px" }}>See it in action</h2>
          <div style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ marginLeft: "12px", fontFamily: "'JetBrains Mono'", fontSize: "11px", color: "#6b7280" }}>POST /v1/moderate</span>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "10px", color: "#6b7280", marginBottom: "6px", letterSpacing: "1px" }}>INPUT TEXT ({currentDemo.lang})</div>
                <div style={{ padding: "14px", background: "#161b22", borderRadius: "8px", fontFamily: "'JetBrains Mono'", fontSize: "13px", color: "#c8cdd7", lineHeight: 1.6, minHeight: "52px" }}>
                  <TypeWriter text={currentDemo.text} speed={25} onDone={() => setTimeout(() => setDemoPhase("result"), 600)} />
                </div>
              </div>
              <div style={{ opacity: demoPhase === "result" ? 1 : 0, transform: demoPhase === "result" ? "translateY(0)" : "translateY(10px)", transition: "all 0.4s ease" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "10px", color: "#6b7280", marginBottom: "6px", letterSpacing: "1px" }}>RESPONSE — {demoPhase === "result" ? "147ms" : "..."}</div>
                <div style={{ padding: "14px", background: "#161b22", borderRadius: "8px", fontFamily: "'JetBrains Mono'", fontSize: "12px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    <div><span style={{ color: "#6b7280" }}>safe: </span><span style={{ color: currentDemo.safe ? "#22c55e" : "#ef4444", fontWeight: 700 }}>{currentDemo.safe ? "true" : "false"}</span></div>
                    <div><span style={{ color: "#6b7280" }}>category: </span><span style={{ color: "#eab308" }}>&quot;{currentDemo.category}&quot;</span></div>
                    <div><span style={{ color: "#6b7280" }}>confidence: </span><span style={{ color: "#c8cdd7" }}>{currentDemo.confidence}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" data-animate style={{ padding: "60px 24px", ...animStyle("problem") }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#f0f2f5", textAlign: "center", marginBottom: "12px" }}>The problem with current tools</h2>
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: "15px", marginBottom: "36px" }}>Western moderation tools were not built for India.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "\uD83D\uDEAB", title: "No Hinglish understanding", desc: "They cannot parse code-mixed text. They see English + gibberish." },
              { icon: "\uD83D\uDD73\uFE0F", title: "Missing cultural context", desc: "Communalism, caste-based slurs, and regional tensions do not exist in Western taxonomies." },
              { icon: "\uD83D\uDCB8", title: "Enterprise pricing", desc: "Azure Content Safety and Utopia AI start at $500+/mo. Indian SMBs cannot afford that." },
              { icon: "\u23F0", title: "3-hour compliance gap", desc: "India's IT Act mandates unlawful content removal within 3 hours. Without automation, SMBs cannot comply." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px", background: "#0d1117", border: "1px solid #1e293b", borderRadius: "12px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#f0f2f5", fontSize: "15px", marginBottom: "4px" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" data-animate style={{ padding: "60px 24px", ...animStyle("features") }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "11px", color: "#22c55e", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Features</div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#f0f2f5", textAlign: "center", marginBottom: "36px" }}>Built for Indian marketplaces</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { icon: "\uD83C\uDF10", title: "4 Languages", desc: "Hindi, Tamil, Malayalam, Hinglish at launch. 8 more coming." },
              { icon: "\u26A1", title: "< 200ms API", desc: "Real-time moderation. No publishing delay." },
              { icon: "\uD83D\uDEE1\uFE0F", title: "Indian Taxonomies", desc: "Communalism, caste slurs, religious hate, scam patterns." },
              { icon: "\uD83D\uDCCA", title: "Dashboard", desc: "Flagged queue, stats, custom rules, audit log." },
              { icon: "\uD83D\uDD0C", title: "Simple REST API", desc: "One endpoint. JSON in, JSON out. 5-min integration." },
              { icon: "\uD83D\uDCCB", title: "IT Act Ready", desc: "Audit trail + timestamps for 3-hour takedown compliance." },
            ].map((f, i) => (
              <div key={i} style={{ padding: "20px", background: "#0d1117", border: "1px solid #1e293b", borderRadius: "12px" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>{f.icon}</div>
                <div style={{ fontWeight: 600, color: "#f0f2f5", fontSize: "14px", marginBottom: "4px" }}>{f.title}</div>
                <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API SNIPPET */}
      <section id="api" data-animate style={{ padding: "60px 24px", ...animStyle("api") }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#f0f2f5", textAlign: "center", marginBottom: "8px" }}>Integrate in 5 minutes</h2>
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: "15px", marginBottom: "28px" }}>One API call. That is it.</p>
          <div style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e293b", fontFamily: "'JetBrains Mono'", fontSize: "11px", color: "#6b7280" }}>example.js</div>
            <pre style={{ padding: "20px", fontFamily: "'JetBrains Mono'", fontSize: "12px", lineHeight: 1.8, overflowX: "auto", margin: 0, color: "#c8cdd7" }}>
{`const res = await fetch("https://api.moderateai.in/v1/moderate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: "\u092F\u0939 \u092A\u094D\u0930\u094B\u0921\u0915\u094D\u091F \u092C\u0939\u0941\u0924 \u092C\u0922\u093C\u093F\u092F\u093E \u0939\u0948!",
    lang: "auto"
  })
});

// Response
{
  safe: true,
  category: "Positive Review",
  confidence: 0.97,
  language: "hi"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" data-animate style={{ padding: "60px 24px", ...animStyle("pricing") }}>
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "11px", color: "#22c55e", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Pricing</div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#f0f2f5", textAlign: "center", marginBottom: "36px" }}>Built for Indian budgets</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              { name: "Starter", price: "\u20B92,499", period: "/mo", calls: "10,000", features: ["4 languages", "Dashboard", "Email support"], highlight: false },
              { name: "Growth", price: "\u20B96,999", period: "/mo", calls: "50,000", features: ["Custom rules", "Webhooks", "Compliance log", "Priority support"], highlight: true },
              { name: "Scale", price: "\u20B914,999", period: "/mo", calls: "2,00,000", features: ["Custom taxonomy", "SLA guarantee", "8+ languages", "Dedicated support"], highlight: false },
            ].map((plan, i) => (
              <div key={i} style={{ padding: "24px 16px", background: plan.highlight ? "linear-gradient(180deg, rgba(34,197,94,0.08), #0d1117)" : "#0d1117", border: plan.highlight ? "1px solid #22c55e33" : "1px solid #1e293b", borderRadius: "16px", textAlign: "center", position: "relative" }}>
                {plan.highlight && <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: "#22c55e", color: "#080b12", fontSize: "10px", fontWeight: 700, padding: "3px 12px", borderRadius: "20px" }}>POPULAR</div>}
                <div style={{ fontWeight: 600, color: "#c8cdd7", fontSize: "14px", marginBottom: "12px" }}>{plan.name}</div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#f0f2f5", marginBottom: "2px" }}>{plan.price}<span style={{ fontSize: "14px", fontWeight: 400, color: "#6b7280" }}>{plan.period}</span></div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "11px", color: "#6b7280", marginBottom: "16px" }}>{plan.calls} API calls</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ fontSize: "12px", color: "#6b7280", display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                      <span style={{ color: "#22c55e", fontSize: "12px" }}>{"\u2713"}</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#4b5563" }}>Free tier: 500 calls/month, no credit card needed.</p>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" data-animate style={{ padding: "80px 24px", ...animStyle("waitlist") }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 800, color: "#080b12", margin: "0 auto 20px", animation: "float 3s ease-in-out infinite" }}>M</div>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#f0f2f5", marginBottom: "10px" }}>Get early access</h2>
          <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "28px", lineHeight: 1.6 }}>Join the waitlist. First 50 signups get 3 months free on the Growth plan.</p>
          {!submitted ? (
            <div style={{ display: "flex", gap: "8px", maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, padding: "14px 16px", borderRadius: "10px", border: "1px solid #1e293b", background: "#0d1117", color: "#f0f2f5", fontSize: "14px", fontFamily: "'Outfit'" }}
              />
              <button
                onClick={() => { if (email.includes("@")) setSubmitted(true); }}
                style={{ padding: "14px 24px", borderRadius: "10px", background: "#22c55e", color: "#080b12", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "'Outfit'", whiteSpace: "nowrap" }}
              >
                Join {"\u2192"}
              </button>
            </div>
          ) : (
            <div style={{ padding: "20px", background: "rgba(34,197,94,0.08)", border: "1px solid #22c55e33", borderRadius: "12px" }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>{"\uD83C\uDF89"}</div>
              <div style={{ color: "#22c55e", fontWeight: 600, fontSize: "16px", marginBottom: "4px" }}>You are on the list!</div>
              <div style={{ color: "#6b7280", fontSize: "13px" }}>We will reach out when your API key is ready.</div>
            </div>
          )}
          <p style={{ marginTop: "16px", fontSize: "12px", color: "#4b5563" }}>No spam. Just product updates.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid #ffffff08", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "#080b12" }}>M</div>
          <span style={{ fontWeight: 600, fontSize: "15px", color: "#6b7280" }}>ModerateAI</span>
        </div>
        <p style={{ fontSize: "12px", color: "#4b5563" }}>Built in India, for India&#39;s digital marketplaces.</p>
        <p style={{ fontSize: "11px", color: "#374151", marginTop: "8px" }}>&copy; 2026 ModerateAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
