import { useState, useEffect } from "react";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// ↓ Accept initialTab and autoRunDueDiligence from DiscoverSection
export default function StartupModal({ startup, onClose, onChatPrompt, setActiveTab: setParentTab, onInvest, initialTab = "overview", autoRunDueDiligence = false }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [investAmount, setInvestAmount] = useState("");
  const [showInvestForm, setShowInvestForm] = useState(false);
  const [investSuccess, setInvestSuccess] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  if (!startup) return null;

  const pct = Math.round((startup.raised / startup.target) * 100);

  const formatINR = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${(val / 1000).toFixed(0)}K`;
  };

  // ── Auto-run due diligence when opened from card button ──────────────
  useEffect(() => {
    if (autoRunDueDiligence && initialTab === 'duediligence') {
      handleDeepDueDiligence()
    }
  }, [])

  // ── INVEST NOW handler ──────────────────────────────────────────────
  const handleInvestSubmit = () => {
    const amount = parseInt(investAmount);
    if (!amount || amount < startup.minInvestment) {
      alert(`Minimum investment is ${formatINR(startup.minInvestment)}`);
      return;
    }
    if (onInvest) {
      onInvest(startup, amount)
    }
    setInvestSuccess(true);
    setTimeout(() => {
      setInvestSuccess(false);
      setShowInvestForm(false);
      setInvestAmount("");
    }, 3000);
  };

  // ── DEEP DUE DILIGENCE handler ──────────────────────────────────────
  const handleDeepDueDiligence = async () => {
    setAiLoading(true);
    setActiveTab("duediligence");
    setAiAnalysis(null);
    try {
      const prompt = `You are an expert startup due diligence analyst for Indian equity crowdfunding (SEBI regulations).
Analyze this startup and give a structured investment report:

Name: ${startup.name}
Sector: ${startup.sector}
Stage: ${startup.stage}
Location: ${startup.location}
Description: ${startup.description}
Revenue: ${startup.revenue}
Raised: ${formatINR(startup.raised)} of ${formatINR(startup.target)}
Investors: ${startup.investors}
Days Left: ${startup.daysLeft}
Risk Rating: ${startup.riskRating}
Risk Score: ${startup.riskScore}/100
Team Size: ${startup.team}
Founded: ${startup.founded}
Highlights: ${startup.highlights?.join(", ")}
Red Flags: ${startup.redFlags?.join(", ")}
Green Signals: ${startup.greenSignals?.join(", ")}

Provide a detailed due diligence report with:
1. EXECUTIVE SUMMARY (3-4 sentences)
2. INVESTMENT THESIS (why invest / why not)
3. KEY RISKS (top 3, each with mitigation)
4. FINANCIAL ANALYSIS (ARR quality, burn rate assessment, valuation sanity)
5. MARKET OPPORTUNITY (TAM/SAM for this specific startup)
6. VERDICT: Recommended / Cautious / Avoid — with a clear one-line reason

Keep it concise but sharp. Use Indian market context.`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || `Groq error: ${response.status}`);
      }

      const data = await response.json();
      const analysis = data.choices?.[0]?.message?.content;
      setAiAnalysis(analysis || "Analysis unavailable.");
    } catch (err) {
      setAiAnalysis(`❌ Error: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  // ── Risk colour helper ──────────────────────────────────────────────
  const riskColor = (score) => {
    if (score >= 75) return "#22c55e";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "760px",
          maxHeight: "90vh", overflowY: "auto", position: "relative",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background: startup.gradient, padding: "24px", borderRadius: "16px 16px 0 0",
            position: "sticky", top: 0, zIndex: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(255,255,255,0.8)", border: "none",
              borderRadius: "50%", width: 32, height: 32, cursor: "pointer",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12, background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
            }}>
              {startup.logo}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111" }}>{startup.name}</h2>
              <p style={{ margin: 0, color: "#444", fontSize: 14 }}>{startup.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ background: startup.accent, color: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>
              {startup.stage}
            </span>
            <span style={{ background: "rgba(255,255,255,0.7)", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>
              {startup.sector}
            </span>
            <span style={{ background: "rgba(255,255,255,0.7)", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>
              📍 {startup.location}
            </span>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", borderBottom: "1px solid #eee", padding: "0 24px", gap: 4, background: "#fff" }}>
          {["overview", "milestones", "investors", "duediligence"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 16px", border: "none", background: "none", cursor: "pointer",
                fontWeight: activeTab === tab ? 700 : 400,
                color: activeTab === tab ? startup.accent : "#666",
                borderBottom: activeTab === tab ? `2px solid ${startup.accent}` : "2px solid transparent",
                fontSize: 14, textTransform: "capitalize",
              }}
            >
              {tab === "duediligence" ? "🤖 AI Analysis" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ padding: "24px" }}>

          {/* ══ OVERVIEW TAB ══ */}
          {activeTab === "overview" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: "#111" }}>Funding Progress</span>
                  <span style={{ fontWeight: 700, color: startup.accent }}>{pct}%</span>
                </div>
                <div style={{ background: "#f0f0f0", borderRadius: 8, height: 10 }}>
                  <div style={{ width: `${pct}%`, background: "#10b981", borderRadius: 8, height: "100%", transition: "width 0.5s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 13, color: "#555" }}>
                  <span>{formatINR(startup.raised)} raised</span>
                  <span>of {formatINR(startup.target)}</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Investors", value: startup.investors },
                  { label: "Days Left", value: startup.daysLeft },
                  { label: "Revenue", value: startup.revenue },
                  { label: "Team Size", value: startup.team },
                  { label: "Founded", value: startup.founded },
                  { label: "Min Invest", value: formatINR(startup.minInvestment) },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#f8f8f8", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <p style={{ color: "#333", lineHeight: 1.6, marginBottom: 20 }}>{startup.description}</p>

              {startup.highlights?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 10, color: "#111" }}>✅ Key Highlights</h4>
                  {startup.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ color: startup.accent, flexShrink: 0 }}>•</span>
                      <span style={{ fontSize: 14, color: "#444" }}>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {startup.riskFactors?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 10, color: "#111" }}>📊 Risk Analysis</h4>
                  {startup.riskFactors.map((r, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                        <span>{r.factor}</span>
                        <span style={{ fontWeight: 600, color: riskColor(r.score) }}>{r.score}/100</span>
                      </div>
                      <div style={{ background: "#eee", borderRadius: 4, height: 6 }}>
                        <div style={{ width: `${r.score}%`, background: riskColor(r.score), borderRadius: 4, height: "100%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 600, color: "#166534", marginBottom: 8, fontSize: 13 }}>🟢 Green Signals</div>
                  {startup.greenSignals?.map((g, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#15803d", marginBottom: 4 }}>• {g}</div>
                  ))}
                </div>
                <div style={{ background: "#fef2f2", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 600, color: "#991b1b", marginBottom: 8, fontSize: 13 }}>🔴 Red Flags</div>
                  {startup.redFlags?.map((r, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#dc2626", marginBottom: 4 }}>• {r}</div>
                  ))}
                </div>
              </div>

              {startup.useOfFunds?.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ marginBottom: 12, color: "#111" }}>💰 Use of Funds</h4>
                  {startup.useOfFunds.map((u, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                        <span>{u.label}</span>
                        <span style={{ fontWeight: 600 }}>{u.pct}%</span>
                      </div>
                      <div style={{ background: "#eee", borderRadius: 4, height: 8 }}>
                        <div style={{ width: `${u.pct}%`, background: startup.accent, borderRadius: 4, height: "100%", opacity: 0.8 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => setShowInvestForm(true)}
                  style={{
                    flex: 1, minWidth: 160,
                    background: "#10b981", color: "#fff", border: "none",
                    borderRadius: 10, padding: "14px 20px", fontSize: 15,
                    fontWeight: 700, cursor: "pointer",
                  }}
                >
                  💰 Invest Now
                </button>
                <button
                  onClick={handleDeepDueDiligence}
                  style={{
                    flex: 1, minWidth: 160,
                    background: startup.accent, color: "#fff", border: "none",
                    borderRadius: 10, padding: "14px 20px", fontSize: 15,
                    fontWeight: 700, cursor: "pointer",
                  }}
                >
                  🤖 Deep Due Diligence
                </button>
              </div>
            </div>
          )}

          {/* ══ MILESTONES TAB ══ */}
          {activeTab === "milestones" && (
            <div>
              <h3 style={{ marginBottom: 16, color: "#111" }}>🗺️ Funding Milestones</h3>
              {startup.milestones?.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: m.status === "completed" ? "#10b981" : m.status === "in-progress" ? startup.accent : "#ddd",
                    color: "#fff", fontSize: 14, fontWeight: 700,
                  }}>
                    {m.status === "completed" ? "✓" : i + 1}
                  </div>
                  <div style={{ flex: 1, background: "#f8f8f8", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{m.title}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{m.date} · {formatINR(m.amount)}</div>
                    <div style={{
                      display: "inline-block", marginTop: 4,
                      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
                      background: m.status === "completed" ? "#dcfce7" : m.status === "in-progress" ? "#fef3c7" : "#f0f0f0",
                      color: m.status === "completed" ? "#166534" : m.status === "in-progress" ? "#92400e" : "#888",
                    }}>
                      {m.status.replace("-", " ").toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
              {startup.escrow && (
                <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 16, marginTop: 8 }}>
                  <h4 style={{ margin: "0 0 12px", color: "#166534" }}>🔒 Escrow Status</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                    {[
                      { label: "Total Held", value: startup.escrow.held },
                      { label: "Released", value: startup.escrow.released },
                      { label: "Pending", value: startup.escrow.pending },
                    ].map((e) => (
                      <div key={e.label} style={{ textAlign: "center" }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "#166534" }}>{formatINR(e.value)}</div>
                        <div style={{ fontSize: 12, color: "#555" }}>{e.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ INVESTORS TAB ══ */}
          {activeTab === "investors" && (
            <div>
              <h3 style={{ marginBottom: 16, color: "#111" }}>👥 Investor Breakdown</h3>
              {startup.investorList?.map((inv, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 16px", background: "#f8f8f8", borderRadius: 10, marginBottom: 10,
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{inv.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{inv.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: startup.accent }}>{formatINR(inv.amount)}</div>
                    {inv.badge && (
                      <span style={{
                        fontSize: 11, padding: "2px 8px", borderRadius: 10,
                        background: inv.badge === "Lead" ? "#fef3c7" : "#ede9fe",
                        color: inv.badge === "Lead" ? "#92400e" : "#5b21b6",
                      }}>
                        {inv.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => { setActiveTab("overview"); setShowInvestForm(true); }}
                style={{
                  width: "100%", marginTop: 8,
                  background: "#10b981", color: "#fff", border: "none",
                  borderRadius: 10, padding: "14px 20px", fontSize: 15,
                  fontWeight: 700, cursor: "pointer",
                }}
              >
                💰 Join as Investor
              </button>
            </div>
          )}

          {/* ══ AI DUE DILIGENCE TAB ══ */}
          {activeTab === "duediligence" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, color: "#111" }}>🤖 AI Due Diligence Report</h3>
                <button
                  onClick={handleDeepDueDiligence}
                  disabled={aiLoading}
                  style={{
                    background: startup.accent, color: "#fff", border: "none",
                    borderRadius: 8, padding: "8px 14px", fontSize: 13,
                    fontWeight: 600, cursor: aiLoading ? "not-allowed" : "pointer", opacity: aiLoading ? 0.7 : 1,
                  }}
                >
                  {aiLoading ? "Analyzing…" : "🔄 Regenerate"}
                </button>
              </div>

              {aiLoading && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Running deep analysis…</div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Evaluating financials, market fit, and risks</div>
                </div>
              )}

              {!aiLoading && !aiAnalysis && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>No analysis yet</div>
                  <button
                    onClick={handleDeepDueDiligence}
                    style={{
                      background: startup.accent, color: "#fff", border: "none",
                      borderRadius: 10, padding: "12px 24px", fontSize: 14,
                      fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    🤖 Run Deep Due Diligence
                  </button>
                </div>
              )}

              {!aiLoading && aiAnalysis && (
                <div style={{
                  background: "#f8fafc", borderRadius: 12, padding: 20,
                  whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: 14, color: "#222",
                  border: "1px solid #e2e8f0",
                }}>
                  {aiAnalysis}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ══ INVEST FORM OVERLAY ══ */}
        {showInvestForm && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
            padding: 16,
          }}>
            <div style={{
              background: "#fff", borderRadius: 16, padding: 28,
              width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}>
              {investSuccess ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <h3 style={{ color: "#10b981", marginBottom: 8 }}>Investment Initiated!</h3>
                  <p style={{ color: "#555", fontSize: 14 }}>
                    Your investment of {formatINR(parseInt(investAmount))} in {startup.name} has been submitted.
                    You'll receive a confirmation shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ margin: "0 0 4px", color: "#111" }}>Invest in {startup.name}</h3>
                  <p style={{ margin: "0 0 20px", fontSize: 13, color: "#888" }}>
                    Min. investment: {formatINR(startup.minInvestment)} · SEBI-regulated escrow
                  </p>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
                    Investment Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder={`Min ₹${startup.minInvestment.toLocaleString()}`}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 8,
                      border: "1.5px solid #ddd", fontSize: 15, marginBottom: 16,
                      boxSizing: "border-box", outline: "none",
                    }}
                  />
                  <div style={{ background: "#f0fdf4", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#166534" }}>
                    ✅ Funds held in SEBI-regulated escrow · Released milestone-by-milestone
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={() => { setShowInvestForm(false); setInvestAmount(""); }}
                      style={{
                        flex: 1, padding: "12px", borderRadius: 8,
                        border: "1.5px solid #ddd", background: "#fff",
                        color: "#333", fontSize: 14, cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleInvestSubmit}
                      style={{
                        flex: 2, padding: "12px", borderRadius: 8,
                        border: "none", background: "#10b981",
                        color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                      }}
                    >
                      Confirm Investment
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}