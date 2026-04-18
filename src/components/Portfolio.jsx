import { useState } from 'react'
import { startups } from '../data/startups'

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`
  return `₹${n.toLocaleString('en-IN')}`
}

function scoreColor(s) {
  if (s >= 75) return '#00c896'
  if (s >= 55) return '#ffa726'
  return '#ff4757'
}

// Simulated ROI multiplier per startup (1.2 = 20% gain assumed)
const ROI_MULTIPLIER = {
  1: 1.27,
  2: 1.15,
  3: 1.39,
  4: 1.23,
  5: 1.18,
  6: 1.10,
  7: 1.22,
  8: 1.30,
  9: 1.16,
}

export default function Portfolio({ setActiveTab, investments = [] }) {
  const [activeCard, setActiveCard] = useState(null)

  // Build portfolio positions from the investments prop
  const MY_INVESTMENTS = investments.map(inv => {
    const multiplier = ROI_MULTIPLIER[inv.startupId] ?? 1.1
    const currentVal = Math.round(inv.invested * multiplier)
    const roi = Math.round(((currentVal - inv.invested) / inv.invested) * 100)
    return {
      startupId: inv.startupId,
      invested: inv.invested,
      units: Math.max(1, Math.floor(inv.invested / 25000)),
      entryDate: inv.entryDate,
      currentVal,
      roi,
      status: 'active',
    }
  })

  // Aggregate multiple investments in the same startup
  const MERGED_INVESTMENTS = Object.values(
    MY_INVESTMENTS.reduce((acc, inv) => {
      if (acc[inv.startupId]) {
        acc[inv.startupId].invested += inv.invested
        acc[inv.startupId].currentVal += inv.currentVal
        acc[inv.startupId].units += inv.units
        acc[inv.startupId].roi = Math.round(
          ((acc[inv.startupId].currentVal - acc[inv.startupId].invested) /
            acc[inv.startupId].invested) * 100
        )
      } else {
        acc[inv.startupId] = { ...inv }
      }
      return acc
    }, {})
  )

  const TOTAL_INVESTED = MERGED_INVESTMENTS.reduce((a, x) => a + x.invested, 0)
  const TOTAL_CURRENT  = MERGED_INVESTMENTS.reduce((a, x) => a + x.currentVal, 0)
  const TOTAL_ROI      = TOTAL_INVESTED > 0
    ? Math.round(((TOTAL_CURRENT - TOTAL_INVESTED) / TOTAL_INVESTED) * 100)
    : 0

  const PORTFOLIO_STATS = [
    { label: 'Total Invested',   value: fmt(TOTAL_INVESTED),       icon: '💼', color: '#2196f3' },
    { label: 'Current Value',    value: fmt(TOTAL_CURRENT),        icon: '📈', color: '#00c896' },
    { label: 'Unrealised Gain',  value: fmt(Math.max(0, TOTAL_CURRENT - TOTAL_INVESTED)), icon: '💰', color: '#00c896' },
    { label: 'Overall ROI',      value: TOTAL_INVESTED > 0 ? `+${TOTAL_ROI}%` : '—', icon: '🚀', color: '#00c896' },
    { label: 'Active Startups',  value: MERGED_INVESTMENTS.length, icon: '🏢', color: '#9c27b0' },
  ]

  // Activity feed — dynamically built from investments
  const ACTIVITY = investments.slice().reverse().map(inv => {
    const s = startups.find(x => x.id === inv.startupId)
    return {
      type: 'invest',
      text: `Invested in ${s?.name ?? 'Unknown'} round`,
      amount: `-₹${inv.invested.toLocaleString('en-IN')}`,
      date: inv.entryDate,
      icon: '📥',
    }
  })

  return (
    <section style={{
      paddingTop: 100, paddingBottom: 80,
      background: 'linear-gradient(180deg,#edfaf4 0%,#f5fef9 100%)',
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40, animation: 'fadeInUp 0.5s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.25)',
            borderRadius: 9999, padding: '5px 14px', marginBottom: 16,
            fontSize: '0.78rem', fontWeight: 700, color: '#009e78',
          }}>
            💼 MY PORTFOLIO
          </div>
          <h2 className="section-title">Investment Dashboard</h2>
          <p className="section-sub" style={{ marginTop: 10 }}>
            Real-time portfolio performance, milestone tracking, and escrow transparency — all in one place.
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
          gap: 16, marginBottom: 40,
        }}>
          {PORTFOLIO_STATS.map((s, i) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,200,150,0.15)',
              borderRadius: 20, padding: '20px 22px',
              boxShadow: '0 4px 20px rgba(0,200,150,0.1)',
              animation: `fadeInUp 0.5s ${i * 0.07}s ease both`, opacity: 0,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,200,150,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,200,150,0.1)' }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, fontSize: 20,
                background: `${s.color}14`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: 12,
              }}>{s.icon}</div>
              <div style={{
                fontFamily: 'Outfit,sans-serif', fontSize: '1.4rem',
                fontWeight: 900, color: s.color, letterSpacing: '-0.02em',
              }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#8aada0', marginTop: 3, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, alignItems: 'start' }}>

          {/* Left — Investment cards */}
          <div>
            <h3 style={{
              fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem',
              fontWeight: 800, color: '#0a1f16', marginBottom: 20,
            }}>
              Active Positions
            </h3>

            {MERGED_INVESTMENTS.length === 0 ? (
              /* Empty state */
              <div style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1.5px dashed rgba(0,200,150,0.3)',
                borderRadius: 22, padding: '48px 32px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#0a1f16', marginBottom: 8 }}>
                  No Investments Yet
                </div>
                <p style={{ fontSize: '0.85rem', color: '#4a6b5a', marginBottom: 24 }}>
                  Browse live campaigns and invest in startups to see your portfolio here.
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  style={{
                    background: '#00c896', color: '#fff', border: 'none',
                    borderRadius: 12, padding: '12px 28px', fontSize: '0.9rem',
                    fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  🔍 Discover Startups
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {MERGED_INVESTMENTS.map((inv, idx) => {
                  const s = startups.find(x => x.id === inv.startupId)
                  if (!s) return null
                  const pct = Math.round((s.raised / s.target) * 100)
                  const gain = inv.currentVal - inv.invested
                  const isOpen = activeCard === inv.startupId

                  return (
                    <div key={inv.startupId} style={{
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(12px)',
                      border: `1.5px solid ${isOpen ? 'rgba(0,200,150,0.45)' : 'rgba(0,200,150,0.15)'}`,
                      borderRadius: 22,
                      boxShadow: isOpen ? '0 12px 40px rgba(0,200,150,0.18)' : '0 4px 18px rgba(0,200,150,0.08)',
                      overflow: 'hidden',
                      animation: `fadeInUp 0.55s ${idx * 0.1}s ease both`, opacity: 0,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                      onClick={() => setActiveCard(isOpen ? null : inv.startupId)}
                    >
                      {/* Card header band */}
                      <div style={{
                        background: s.gradient, padding: '18px 24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{
                            width: 46, height: 46, borderRadius: 14, fontSize: 22,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(255,255,255,0.82)', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                          }}>{s.logo}</div>
                          <div>
                            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0a1f16' }}>
                              {s.name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#4a6b5a', marginTop: 2 }}>
                              {s.sector} · {s.stage} · {s.location}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontFamily: 'Outfit,sans-serif', fontWeight: 900,
                            fontSize: '1.1rem', color: '#00c896',
                          }}>+{inv.roi}%</div>
                          <div style={{ fontSize: '0.72rem', color: '#4a6b5a' }}>ROI</div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '18px 24px' }}>
                        <div style={{
                          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                          gap: 16, marginBottom: 16,
                        }}>
                          {[
                            { label: 'Invested', value: fmt(inv.invested), color: '#2196f3' },
                            { label: 'Current Value', value: fmt(inv.currentVal), color: '#00c896' },
                            { label: 'Gain', value: `+${fmt(gain)}`, color: '#00c896' },
                          ].map(m => (
                            <div key={m.label} style={{ textAlign: 'center' }}>
                              <div style={{
                                fontFamily: 'Outfit,sans-serif', fontWeight: 800,
                                fontSize: '0.95rem', color: m.color,
                              }}>{m.value}</div>
                              <div style={{ fontSize: '0.72rem', color: '#8aada0', marginTop: 2 }}>{m.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Campaign progress mini-bar */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: '0.75rem', color: '#4a6b5a' }}>Campaign Progress</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00c896' }}>{pct}%</span>
                          </div>
                          <div className="progress-track" style={{ height: 5 }}>
                            <div className="progress-fill" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isOpen && (
                        <div style={{
                          padding: '0 24px 20px',
                          borderTop: '1px solid rgba(0,200,150,0.12)',
                        }}>
                          <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
                            gap: 12, marginTop: 16,
                          }}>
                            {[
                              { label: 'Units Held', value: inv.units },
                              { label: 'Entry Date', value: inv.entryDate },
                              { label: 'AI Risk Score', value: `${s.riskScore}/100` },
                              { label: 'Status', value: '🟢 Active' },
                            ].map(d => (
                              <div key={d.label} style={{
                                background: 'rgba(0,200,150,0.04)',
                                border: '1px solid rgba(0,200,150,0.12)',
                                borderRadius: 12, padding: '10px 14px',
                              }}>
                                <div style={{ fontSize: '0.72rem', color: '#8aada0', marginBottom: 3 }}>{d.label}</div>
                                <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#0a1f16' }}>
                                  {d.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div style={{
              marginTop: 24, padding: '24px 28px',
              background: 'linear-gradient(135deg,rgba(0,200,150,0.08),rgba(0,229,176,0.04))',
              border: '1.5px dashed rgba(0,200,150,0.3)',
              borderRadius: 20, textAlign: 'center',
              cursor: 'pointer', transition: 'all 0.25s ease',
            }}
              onClick={() => setActiveTab('discover')}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,150,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg,rgba(0,200,150,0.08),rgba(0,229,176,0.04))'}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#0a1f16' }}>
                Discover More Opportunities
              </div>
              <p style={{ fontSize: '0.82rem', color: '#4a6b5a', marginTop: 6 }}>
                Browse live campaigns with AI due diligence scores
              </p>
            </div>
          </div>

          {/* Right — Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Sector Allocation */}
            <div style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,200,150,0.15)', borderRadius: 22,
              padding: '24px', boxShadow: '0 4px 20px rgba(0,200,150,0.1)',
              animation: 'fadeInUp 0.55s 0.2s ease both', opacity: 0,
            }}>
              <h4 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0a1f16', marginBottom: 20 }}>
                📊 Sector Allocation
              </h4>

              {MERGED_INVESTMENTS.length === 0 ? (
                <p style={{ fontSize: '0.82rem', color: '#8aada0', textAlign: 'center', padding: '12px 0' }}>
                  No investments yet
                </p>
              ) : (
                <>
                  {MERGED_INVESTMENTS.map(inv => {
                    const s = startups.find(x => x.id === inv.startupId)
                    const pct = Math.round((inv.invested / TOTAL_INVESTED) * 100)
                    return (
                      <div key={inv.startupId} style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: '0.82rem', color: '#4a6b5a', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span>{s?.logo}</span> {s?.name}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00c896' }}>{pct}%</span>
                        </div>
                        <div className="progress-track" style={{ height: 6 }}>
                          <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}

                  <div style={{
                    marginTop: 20, padding: '14px 16px', borderRadius: 14,
                    background: 'rgba(0,200,150,0.06)', border: '1px solid rgba(0,200,150,0.18)',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { l: 'Avg Risk Score', v: `${Math.round(MERGED_INVESTMENTS.reduce((a, inv) => { const s = startups.find(x => x.id === inv.startupId); return a + (s?.riskScore ?? 50) }, 0) / MERGED_INVESTMENTS.length)}/100`, c: '#ffa726' },
                        { l: 'Startups', v: `${MERGED_INVESTMENTS.length} positions`, c: '#2196f3' },
                        { l: 'Total ROI', v: TOTAL_INVESTED > 0 ? `+${TOTAL_ROI}%` : '—', c: '#9c27b0' },
                      ].map(m => (
                        <div key={m.l} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.78rem', color: '#8aada0' }}>{m.l}</span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: m.c }}>{m.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Activity feed */}
            <div style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,200,150,0.15)', borderRadius: 22,
              padding: '24px', boxShadow: '0 4px 20px rgba(0,200,150,0.1)',
              animation: 'fadeInUp 0.55s 0.3s ease both', opacity: 0,
            }}>
              <h4 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0a1f16', marginBottom: 20 }}>
                🔔 Recent Activity
              </h4>
              {ACTIVITY.length === 0 ? (
                <p style={{ fontSize: '0.82rem', color: '#8aada0', textAlign: 'center', padding: '12px 0' }}>
                  No activity yet
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {ACTIVITY.slice(0, 6).map((a, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      padding: '12px 14px', borderRadius: 12,
                      background: 'rgba(0,200,150,0.03)',
                      border: '1px solid rgba(0,200,150,0.1)',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,150,0.07)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,200,150,0.03)'}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        background: 'rgba(0,200,150,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                      }}>{a.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1a2e24', lineHeight: 1.4 }}>
                          {a.text}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#8aada0', marginTop: 3 }}>{a.date}</div>
                      </div>
                      {a.amount && (
                        <div style={{
                          fontSize: '0.82rem', fontWeight: 800,
                          color: a.amount.startsWith('+') ? '#00c896' : '#ff4757',
                          flexShrink: 0,
                        }}>{a.amount}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tax summary */}
            <div style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,200,150,0.15)', borderRadius: 22,
              padding: '24px', boxShadow: '0 4px 20px rgba(0,200,150,0.1)',
              animation: 'fadeInUp 0.55s 0.4s ease both', opacity: 0,
            }}>
              <h4 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0a1f16', marginBottom: 16 }}>
                🧾 Tax Summary FY 2024-25
              </h4>
              {[
                { l: 'Invested (Section 80C eligible)', v: fmt(TOTAL_INVESTED), c: '#0a1f16' },
                { l: 'Capital Gains (unrealised)', v: fmt(Math.max(0, TOTAL_CURRENT - TOTAL_INVESTED)), c: '#00c896' },
                { l: 'Applicable Rate', v: 'LTCG 10% (after 1 yr)', c: '#ffa726' },
              ].map(t => (
                <div key={t.l} style={{
                  display: 'flex', justifyContent: 'space-between', padding: '8px 0',
                  borderBottom: '1px solid rgba(0,200,150,0.08)',
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#8aada0' }}>{t.l}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: t.c }}>{t.v}</span>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 16, fontSize: '0.85rem' }}>
                📥 Download Tax Statement
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @media (max-width:900px) {
          .portfolio-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}