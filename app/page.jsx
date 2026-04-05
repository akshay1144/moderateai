"use client";
import { useState, useEffect } from "react";

const DEMO_INPUTS = [
  { text: "This product is great, fast delivery!", lang: "Hinglish", safe: true, category: "Positive Review", confidence: 0.97 },
  { text: "Ye log bewakoof banate hain, scam hai sab", lang: "Hinglish", safe: false, category: "Scam / Fraud", confidence: 0.91 },
  { text: "Intha kadai migavum nallathu", lang: "Tamil", safe: true, category: "Positive Review", confidence: 0.95 },
  { text: "Ee sadhanam waste aanu, paisa poyi", lang: "Malayalam", safe: true, category: "Negative Review", confidence: 0.88 },
  { text: "Ivanmar okke naattil ninnu odikkanum", lang: "Malayalam", safe: false, category: "Hate Speech", confidence: 0.93 },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentDemo = DEMO_INPUTS[demoIdx];

  useEffect(function () {
    var timer1 = setTimeout(function () {
      setShowResult(true);
    }, 2000);
    var timer2 = setTimeout(function () {
      setShowResult(false);
      setDemoIdx(function (i) { return (i + 1) % DEMO_INPUTS.length; });
    }, 5000);
    return function () {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [demoIdx]);

  function handleJoin() {
    if (email.includes("@")) {
      setSubmitted(true);
    }
  }

  var greenColor = "#22c55e";
  var darkBg = "#080b12";
  var cardBg = "#0d1117";
  var borderColor = "#1e293b";
  var grayText = "#6b7280";
  var whiteText = "#f0f2f5";
  var monoFont = "monospace";

  return (
    <div style={{ background: darkBg, color: "#c8cdd7", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #ffffff08", position: "sticky", top: 0, zIndex: 100, background: "rgba(8,11,18,0.95)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: greenColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, color: darkBg }}>M</div>
          <span style={{ fontWeight: 700, fontSize: "18px", color: whiteText }}>ModerateAI</span>
        </div>
        <a href="#waitlist" style={{ padding: "8px 20px", borderRadius: "8px", background: greenColor, color: darkBg, fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>Join Waitlist</a>
      </nav>

      <section style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ fontFamily: monoFont, fontSize: "11px", color: greenColor, letterSpacing: "4px", textTransform: "uppercase", marginBottom: "20px" }}>Content Moderation API</div>
        <h1 style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.1, color: whiteText, maxWidth: "700px", margin: "0 auto 20px" }}>
          {"Keep your marketplace "}
          <span style={{ color: greenColor }}>safe</span>
          {", in every "}
          <span style={{ color: greenColor }}>Indian language</span>
        </h1>
        <p style={{ fontSize: "17px", lineHeight: 1.7, color: grayText, maxWidth: "520px", margin: "0 auto 36px" }}>
          AI-powered content moderation that understands Hindi, Malayalam, Tamil, Hinglish, and cultural context that Western tools completely miss.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#waitlist" style={{ padding: "14px 32px", borderRadius: "10px", background: greenColor, color: darkBg, fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>Get Early Access</a>
          <a href="#demo" style={{ padding: "14px 32px", borderRadius: "10px", background: "transparent", border: "1px solid #ffffff15", color: "#c8cdd7", fontSize: "15px", textDecoration: "none" }}>See Live Demo</a>
        </div>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "48px", flexWrap: "wrap" }}>
          <div style={{ fontSize: "12px", color: grayText, fontFamily: monoFont }}>
            <span style={{ color: greenColor }}>{"✓ "}</span>500 free API calls/mo
          </div>
          <div style={{ fontSize: "12px", color: grayText, fontFamily: monoFont }}>
            <span style={{ color: greenColor }}>{"✓ "}</span>{"< 200ms response"}
          </div>
          <div style={{ fontSize: "12px", color: grayText, fontFamily: monoFont }}>
            <span style={{ color: greenColor }}>{"✓ "}</span>IT Act compliant
          </div>
        </div>
      </section>

      <section id="demo" style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontFamily: monoFont, fontSize: "11px", color: greenColor, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Live Demo</div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: whiteText, textAlign: "center", marginBottom: "32px" }}>See it in action</h2>
          <div style={{ background: cardBg, border: "1px solid " + borderColor, borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid " + borderColor, display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}></div>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }}></div>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: greenColor }}></div>
              <span style={{ marginLeft: "12px", fontFamily: monoFont, fontSize: "11px", color: grayText }}>POST /v1/moderate</span>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontFamily: monoFont, fontSize: "10px", color: grayText, marginBottom: "6px", letterSpacing: "1px" }}>{"INPUT TEXT (" + currentDemo.lang + ")"}</div>
                <div style={{ padding: "14px", background: "#161b22", borderRadius: "8px", fontFamily: monoFont, fontSize: "13px", color: "#c8cdd7", minHeight: "52px" }}>{currentDemo.text}</div>
              </div>
              <div style={{ opacity: showResult ? 1 : 0, transition: "opacity 0.4s ease" }}>
                <div style={{ fontFamily: monoFont, fontSize: "10px", color: grayText, marginBottom: "6px", letterSpacing: "1px" }}>{"RESPONSE — 147ms"}</div>
                <div style={{ padding: "14px", background: "#161b22", borderRadius: "8px", fontFamily: monoFont, fontSize: "12px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <span style={{ color: grayText }}>{"safe: "}</span>
                      <span style={{ color: currentDemo.safe ? greenColor : "#ef4444", fontWeight: 700 }}>{currentDemo.safe ? "true" : "false"}</span>
                    </div>
                    <div>
                      <span style={{ color: grayText }}>{"category: "}</span>
                      <span style={{ color: "#eab308" }}>{'"' + currentDemo.category + '"'}</span>
                    </div>
                    <div>
                      <span style={{ color: grayText }}>{"confidence: "}</span>
                      <span style={{ color: "#c8cdd7" }}>{currentDemo.confidence}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: whiteText, textAlign: "center", marginBottom: "12px" }}>The problem with current tools</h2>
          <p style={{ textAlign: "center", color: grayText, fontSize: "15px", marginBottom: "36px" }}>Western moderation tools were not built for India.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "X", title: "No Hinglish understanding", desc: "They cannot parse code-mixed text. They see English + gibberish." },
              { icon: "?", title: "Missing cultural context", desc: "Communalism, caste-based slurs, and regional tensions do not exist in Western taxonomies." },
              { icon: "$", title: "Enterprise pricing", desc: "Azure Content Safety and Utopia AI start at $500+/mo. Indian SMBs cannot afford that." },
              { icon: "!", title: "3-hour compliance gap", desc: "India IT Act mandates unlawful content removal within 3 hours. Without automation, SMBs cannot comply." },
            ].map(function (item, i) {
              return (
                <div key={i} style={{ padding: "20px", background: cardBg, border: "1px solid " + borderColor, borderRadius: "12px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: greenColor, width: "28px", height: "28px", borderRadius: "50%", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: whiteText, fontSize: "15px", marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: "13px", color: grayText, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontFamily: monoFont, fontSize: "11px", color: greenColor, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Features</div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: whiteText, textAlign: "center", marginBottom: "36px" }}>Built for Indian marketplaces</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { title: "4 Languages", desc: "Hindi, Tamil, Malayalam, Hinglish at launch. 8 more coming." },
              { title: "< 200ms API", desc: "Real-time moderation. No publishing delay." },
              { title: "Indian Taxonomies", desc: "Communalism, caste slurs, religious hate, scam patterns." },
              { title: "Dashboard", desc: "Flagged queue, stats, custom rules, audit log." },
              { title: "Simple REST API", desc: "One endpoint. JSON in, JSON out. 5-min integration." },
              { title: "IT Act Ready", desc: "Audit trail + timestamps for 3-hour takedown compliance." },
            ].map(function (f, i) {
              return (
                <div key={i} style={{ padding: "20px", background: cardBg, border: "1px solid " + borderColor, borderRadius: "12px" }}>
                  <div style={{ fontWeight: 600, color: whiteText, fontSize: "14px", marginBottom: "4px" }}>{f.title}</div>
                  <div style={{ fontSize: "12px", color: grayText, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: whiteText, textAlign: "center", marginBottom: "8px" }}>Integrate in 5 minutes</h2>
          <p style={{ textAlign: "center", color: grayText, fontSize: "15px", marginBottom: "28px" }}>One API call. That is it.</p>
          <div style={{ background: cardBg, border: "1px solid " + borderColor, borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid " + borderColor, fontFamily: monoFont, fontSize: "11px", color: grayText }}>example.js</div>
            <pre style={{ padding: "20px", fontFamily: monoFont, fontSize: "12px", lineHeight: 1.8, overflowX: "auto", margin: 0, color: "#c8cdd7" }}>
{`const res = await fetch(
  "https://api.moderateai.in/v1/moderate",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: "yeh product bakwas hai",
      lang: "auto"
    })
  }
);

// Response
// { safe: true, category: "Negative Review",
//   confidence: 0.94, language: "hi-en" }`}
            </pre>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <div style={{ fontFamily: monoFont, fontSize: "11px", color: greenColor, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Pricing</div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: whiteText, textAlign: "center", marginBottom: "36px" }}>Built for Indian budgets</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              { name: "Starter", price: "Rs 2,499", calls: "10,000", features: ["4 languages", "Dashboard", "Email support"], highlight: false },
              { name: "Growth", price: "Rs 6,999", calls: "50,000", features: ["Custom rules", "Webhooks", "Compliance log", "Priority support"], highlight: true },
              { name: "Scale", price: "Rs 14,999", calls: "2,00,000", features: ["Custom taxonomy", "SLA guarantee", "8+ languages", "Dedicated support"], highlight: false },
            ].map(function (plan, i) {
              return (
                <div key={i} style={{ padding: "24px 16px", background: plan.highlight ? "linear-gradient(180deg, rgba(34,197,94,0.08), #0d1117)" : cardBg, border: plan.highlight ? "1px solid rgba(34,197,94,0.2)" : "1px solid " + borderColor, borderRadius: "16px", textAlign: "center", position: "relative" }}>
                  {plan.highlight && <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", background: greenColor, color: darkBg, fontSize: "10px", fontWeight: 700, padding: "3px 12px", borderRadius: "20px" }}>POPULAR</div>}
                  <div style={{ fontWeight: 600, color: "#c8cdd7", fontSize: "14px", marginBottom: "12px" }}>{plan.name}</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: whiteText, marginBottom: "2px" }}>{plan.price}<span style={{ fontSize: "14px", fontWeight: 400, color: grayText }}>/mo</span></div>
                  <div style={{ fontFamily: monoFont, fontSize: "11px", color: grayText, marginBottom: "16px" }}>{plan.calls + " API calls"}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {plan.features.map(function (f, j) {
                      return (
                        <div key={j} style={{ fontSize: "12px", color: grayText, display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                          <span style={{ color: greenColor }}>{"✓"}</span>{" " + f}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#4b5563" }}>Free tier: 500 calls/month, no credit card needed.</p>
        </div>
      </section>

      <section id="waitlist" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: greenColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 800, color: darkBg, margin: "0 auto 20px" }}>M</div>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: whiteText, marginBottom: "10px" }}>Get early access</h2>
          <p style={{ color: grayText, fontSize: "15px", marginBottom: "28px", lineHeight: 1.6 }}>Join the waitlist. First 50 signups get 3 months free on the Growth plan.</p>
          {!submitted ? (
            <div style={{ display: "flex", gap: "8px", maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={function (e) { setEmail(e.target.value); }}
                style={{ flex: 1, padding: "14px 16px", borderRadius: "10px", border: "1px solid " + borderColor, background: cardBg, color: whiteText, fontSize: "14px" }}
              />
              <button
                onClick={handleJoin}
                style={{ padding: "14px 24px", borderRadius: "10px", background: greenColor, color: darkBg, fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}
              >
                Join
              </button>
            </div>
          ) : (
            <div style={{ padding: "20px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "12px" }}>
              <div style={{ color: greenColor, fontWeight: 600, fontSize: "16px", marginBottom: "4px" }}>You are on the list!</div>
              <div style={{ color: grayText, fontSize: "13px" }}>We will reach out when your API key is ready.</div>
            </div>
          )}
          <p style={{ marginTop: "16px", fontSize: "12px", color: "#4b5563" }}>No spam. Just product updates.</p>
        </div>
      </section>

      <footer style={{ padding: "32px 24px", borderTop: "1px solid #ffffff08", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: greenColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: darkBg }}>M</div>
          <span style={{ fontWeight: 600, fontSize: "15px", color: grayText }}>ModerateAI</span>
        </div>
        <p style={{ fontSize: "12px", color: "#4b5563" }}>Built in India, for Indian digital marketplaces.</p>
        <p style={{ fontSize: "11px", color: "#374151", marginTop: "8px" }}>2026 ModerateAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
