import { useState } from 'react'

const FRAMEWORK_ITEMS = [
  {
    icon: '⚖️',
    title: 'CCPS Framework (Compulsorily Convertible Preference Shares)',
    status: 'compliant',
    desc: 'All equity issuances structured as CCPS in compliance with RBI Master Directions on Startup Issuances. Auto-conversion trigger embedded in SHA.',
    detail: 'Per RBI/2019-20/218 and SEBI Circular SEBI/HO/CFD/DIL1/CIR/P/2021/47',
  },
  {
    icon: '🏦',
    title: 'SEBI (Alternative Investment Funds) Regulations, 2012',
    status: 'compliant',
    desc: 'Platform operates under AIF Category II license. All pooled vehicles are AIF-registered.',
    detail: 'Registration No. IN/AIF2/22-23/1084 · Category II AIF',
  },
  {
    icon: '🔒',
    title: 'Escrow Mechanism (Payment Aggregator Guidelines)',
    status: 'compliant',
    desc: 'Investor funds held in SEBI-approved escrow with Axis Bank. Released only upon verified milestone completion.',
    detail: 'Escrow Agreement per Regulation 5(2) of SEBI ILDS Regs, 2008',
  },
  {
    icon: '📋',
    title: 'KYC / AML under PMLA 2002',
    status: 'compliant',
    desc: 'Full CKYC & video KYC verification for all investors. Aadhaar-PAN linkage mandatory. UBO declaration collected.',
    detail: 'In line with PMLA Rules 2005 & SEBI Master Circular on AML/CFT',
  },
  {
    icon: '💰',
    title: 'Minimum Investment & Accredited Investor Norms',
    status: 'compliant',
    desc: 'Minimum ticket size ₹25,000. Accredited Investor onboarding enforced for rounds above ₹25L per company.',
    detail: 'Per SEBI (Issue of Capital and Disclosure Requirements) Regulations 2018',
  },
  {
    icon: '📊',
    title: 'Offer Document & Disclosure Requirements',
    status: 'compliant',
    desc: 'Standardized SEBI-format Offer Document published for each campaign. Independent auditor risk certification required.',
    detail: 'SEBI Consultation Paper on Crowdfunding (CF-2014) compliance framework',
  },
]

const DOCUMENTS = [
  { name: 'Platform SEBI Registration Certificate', size: '2.1 MB', type: 'PDF', date: 'Jan 2024', icon: '🏛️', category: 'Registration' },
  { name: 'AIF Category II License', size: '1.4 MB', type: 'PDF', date: 'Mar 2023', icon: '📜', category: 'Registration' },
  { name: 'Axis Bank Escrow Agreement', size: '3.8 MB', type: 'PDF', date: 'Nov 2023', icon: '🏦', category: 'Escrow' },
  { name: 'AML / KYC Policy Document', size: '1.2 MB', type: 'PDF', date: 'Feb 2024', icon: '🛡️', category: 'Compliance' },
  { name: 'Investor Grievance Redressal Policy', size: '0.9 MB', type: 'PDF', date: 'Dec 2023', icon: '📝', category: 'Policy' },
  { name: 'Annual Compliance Audit FY 2023-24', size: '5.2 MB', type: 'PDF', date: 'Apr 2024', icon: '✅', category: 'Audit' },
  { name: 'Privacy Policy (PDPB 2023)', size: '0.7 MB', type: 'PDF', date: 'Jan 2024', icon: '🔐', category: 'Policy' },
  { name: 'CCPS Term Sheet Template', size: '0.5 MB', type: 'PDF', date: 'Oct 2023', icon: '📄', category: 'Legal' },
]

const ALERTS = [
  { severity: 'info', icon: '📌', text: 'SEBI has released updated crowdfunding consultation draft (Apr 2024). EquiRise is reviewing implications — no immediate platform changes required.', date: '15 Apr 2024' },
  { severity: 'success', icon: '✅', text: 'Annual KYC refresh completed for 98.6% of active investors. Remaining 1.4% sent re-KYC notices.', date: '10 Apr 2024' },
  { severity: 'warning', icon: '⚠️', text: 'ChargePoint Deccan campaign ends in 23 days. Extension request must be filed 7 days prior if target not met.', date: '5 Apr 2024' },
  { severity: 'info', icon: '🔔', text: 'RBI Master Direction on Startup CCPS updated. Platform CCPS clause auto-updated across all active SHA templates.', date: '28 Mar 2024' },
]

const RISK_DISCLOSURES = [
  { title: 'Illiquidity Risk', level: 'High', desc: 'Startup equity investments are unlisted and illiquid. Exit possible only via buyback programs, secondary transfers, or IPO — none guaranteed.' },
  { title: 'Total Loss Risk', level: 'High', desc: 'Investing in early-stage startups carries substantial risk of total capital loss. Past performance of other startups is not indicative.' },
  { title: 'Dilution Risk', level: 'Medium', desc: 'Future funding rounds may dilute your equity stake. Anti-dilution provisions exist only for accredited investors above ₹10L.' },
  { title: 'Regulatory Risk', level: 'Medium', desc: 'Equity crowdfunding regulations are evolving. Changes in SEBI/RBI rules may affect platform operations and investment terms.' },
  { title: 'Escrow Release Risk', level: 'Low', desc: 'Milestone-linked escrow reduces misuse risk. Independent verifiers audit milestones before fund release.' },
]

const STATS = [
  { label: 'Compliance Score', value: '98.2%', icon: '📈', color: '#00c896', sub: 'As of FY 2023-24' },
  { label: 'Grievances Resolved', value: '100%', icon: '✅', color: '#00c896', sub: 'Avg. 2.1 days resolution' },
  { label: 'KYC Verified Investors', value: '12,387', icon: '👥', color: '#2196f3', sub: 'Active on platform' },
  { label: 'Escrow Accounts', value: '4 Active', icon: '🔒', color: '#9c27b0', sub: 'Axis Bank, HDFC' },
]

const severityStyle = {
  info:    { border: 'rgba(33,150,243,0.25)',  bg: 'rgba(33,150,243,0.06)',  text: '#1565c0' },
  success: { border: 'rgba(0,200,150,0.28)',   bg: 'rgba(0,200,150,0.06)',   text: '#007a5a' },
  warning: { border: 'rgba(255,167,38,0.32)',  bg: 'rgba(255,167,38,0.07)', text: '#b25900' },
}

export default function SEBICompliance() {
  const [openItem, setOpenItem] = useState(null)
  const [activeTab, setActiveTab] = useState('framework')
  const [docFilter, setDocFilter] = useState('All')

  const docCategories = ['All', ...new Set(DOCUMENTS.map(d => d.category))]
  const filteredDocs = docFilter === 'All' ? DOCUMENTS : DOCUMENTS.filter(d => d.category === docFilter)

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
            background: 'rgba(33,150,243,0.1)', border: '1px solid rgba(33,150,243,0.25)',
            borderRadius: 9999, padding: '5px 14px', marginBottom: 16,
            fontSize: '0.78rem', fontWeight: 700, color: '#1565c0',
          }}>
            ⚖️ SEBI COMPLIANCE CENTER
          </div>
          <h2 className="section-title">Regulatory Framework &amp; Disclosures</h2>
          <p className="section-sub" style={{ marginTop: 10 }}>
            Full SEBI compliance, AIF registration, escrow protection, and risk disclosures — complete transparency for every rupee invested.
          </p>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
          gap: 16, marginBottom: 36,
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,200,150,0.15)', borderRadius: 20,
              padding: '20px 22px', boxShadow: '0 4px 20px rgba(0,200,150,0.08)',
              animation: `fadeInUp 0.5s ${i * 0.07}s ease both`, opacity: 0,
              transition: 'transform 0.25s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, fontSize: 20,
                background: `${s.color}14`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: 12,
              }}>{s.icon}</div>
              <div style={{
                fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem',
                fontWeight: 900, color: s.color, letterSpacing: '-0.02em',
              }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#0a1f16', marginTop: 2, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '0.7rem', color: '#8aada0', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Compliance Alert Banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'linear-gradient(135deg,rgba(0,200,150,0.1),rgba(0,229,176,0.06))',
          border: '1px solid rgba(0,200,150,0.25)', borderRadius: 16,
          padding: '16px 22px', marginBottom: 32,
          animation: 'fadeInUp 0.5s 0.1s ease both', opacity: 0,
        }}>
          <div style={{ fontSize: 28 }}>🛡️</div>
          <div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: '#0a1f16', fontSize: '0.95rem' }}>
              SEBI Compliance Score: 98.2% · AIF Category II Registered · Escrow Protected
            </div>
            <div style={{ fontSize: '0.8rem', color: '#4a6b5a', marginTop: 2 }}>
              EquiRise maintains full regulatory compliance with SEBI, RBI, and MCA frameworks. All campaigns undergo mandatory legal audit before launch.
            </div>
          </div>
          <div style={{
            marginLeft: 'auto', flexShrink: 0,
            background: '#00c896', color: 'white',
            padding: '6px 14px', borderRadius: 9999,
            fontSize: '0.75rem', fontWeight: 700,
          }}>COMPLIANT</div>
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { id: 'framework', label: '⚖️ Framework' },
            { id: 'documents', label: '📁 Document Vault' },
            { id: 'alerts', label: '🔔 Alerts' },
            { id: 'risk', label: '⚠️ Risk Disclosures' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '9px 20px', borderRadius: 9999, border: 'none', cursor: 'pointer',
                background: activeTab === t.id ? '#00c896' : 'rgba(255,255,255,0.85)',
                color: activeTab === t.id ? 'white' : '#4a6b5a',
                fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', fontWeight: 600,
                boxShadow: activeTab === t.id ? '0 4px 16px rgba(0,200,150,0.35)' : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.22s ease',
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* ── FRAMEWORK TAB ── */}
        {activeTab === 'framework' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FRAMEWORK_ITEMS.map((item, i) => {
              const isOpen = openItem === i
              return (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                  border: `1.5px solid ${isOpen ? 'rgba(0,200,150,0.4)' : 'rgba(0,200,150,0.15)'}`,
                  borderRadius: 18, overflow: 'hidden',
                  boxShadow: isOpen ? '0 8px 32px rgba(0,200,150,0.15)' : '0 2px 10px rgba(0,200,150,0.06)',
                  animation: `fadeInUp 0.45s ${i * 0.06}s ease both`, opacity: 0,
                  transition: 'all 0.28s ease',
                }}>
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px',
                      cursor: 'pointer', userSelect: 'none',
                    }}
                    onClick={() => setOpenItem(isOpen ? null : i)}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                      background: 'rgba(0,200,150,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: '#0a1f16', fontSize: '0.95rem' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#4a6b5a', marginTop: 3 }}>{item.desc}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.25)',
                        borderRadius: 9999, padding: '4px 12px',
                        fontSize: '0.72rem', fontWeight: 700, color: '#009e78',
                      }}>
                        ✓ COMPLIANT
                      </div>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,200,150,0.08)',
                        fontSize: 14, transition: 'transform 0.2s',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}>▾</div>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 20px',
                      borderTop: '1px solid rgba(0,200,150,0.12)',
                      animation: 'fadeIn 0.2s ease',
                    }}>
                      <div style={{
                        marginTop: 14, padding: '12px 16px',
                        background: 'rgba(33,150,243,0.06)',
                        border: '1px solid rgba(33,150,243,0.18)',
                        borderRadius: 12,
                        fontSize: '0.82rem', color: '#1565c0', fontWeight: 500,
                        display: 'flex', gap: 10, alignItems: 'center',
                      }}>
                        <span style={{ fontSize: 16 }}>📌</span>
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: 2 }}>Regulatory Reference</div>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── DOCUMENTS TAB ── */}
        {activeTab === 'documents' && (
          <div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {docCategories.map(cat => (
                <button key={cat} onClick={() => setDocFilter(cat)} style={{
                  padding: '7px 16px', borderRadius: 9999, border: 'none', cursor: 'pointer',
                  background: docFilter === cat ? '#00c896' : 'rgba(255,255,255,0.85)',
                  color: docFilter === cat ? 'white' : '#4a6b5a',
                  fontFamily: 'Inter,sans-serif', fontSize: '0.8rem', fontWeight: 600,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease',
                }}>{cat}</button>
              ))}
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16,
            }}>
              {filteredDocs.map((doc, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0,200,150,0.15)', borderRadius: 16,
                  padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center',
                  boxShadow: '0 4px 16px rgba(0,200,150,0.07)',
                  animation: `fadeInUp 0.4s ${i * 0.05}s ease both`, opacity: 0,
                  transition: 'all 0.25s ease', cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,200,150,0.16)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,200,150,0.07)' }}
                >
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                    background: 'linear-gradient(135deg,#e8faf4,#c8f5e9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    boxShadow: '0 2px 8px rgba(0,200,150,0.14)',
                  }}>{doc.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0a1f16', lineHeight: 1.3 }}>
                      {doc.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#8aada0', marginTop: 4, display: 'flex', gap: 8 }}>
                      <span>{doc.type} · {doc.size}</span>
                      <span>·</span>
                      <span>{doc.date}</span>
                    </div>
                    <div style={{
                      display: 'inline-block', marginTop: 6,
                      fontSize: '0.68rem', fontWeight: 700, color: '#009e78',
                      background: 'rgba(0,200,150,0.1)', padding: '2px 8px', borderRadius: 9999,
                    }}>{doc.category}</div>
                  </div>
                  <button style={{
                    flexShrink: 0, width: 34, height: 34, borderRadius: 9999,
                    background: 'rgba(0,200,150,0.1)', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, color: '#009e78',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,150,0.22)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,200,150,0.1)'}
                  >⬇</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ALERTS TAB ── */}
        {activeTab === 'alerts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ALERTS.map((a, i) => {
              const s = severityStyle[a.severity]
              return (
                <div key={i} style={{
                  background: s.bg, border: `1.5px solid ${s.border}`,
                  borderRadius: 16, padding: '18px 22px',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  animation: `fadeInUp 0.4s ${i * 0.07}s ease both`, opacity: 0,
                  transition: 'transform 0.2s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{a.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0a1f16', lineHeight: 1.5 }}>
                      {a.text}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#8aada0', marginTop: 6 }}>{a.date}</div>
                  </div>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 700, color: s.text,
                    background: `${s.border}`, padding: '3px 10px', borderRadius: 9999,
                    flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{a.severity}</div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── RISK DISCLOSURES TAB ── */}
        {activeTab === 'risk' && (
          <div>
            <div style={{
              padding: '16px 20px', borderRadius: 14,
              background: 'rgba(255,71,87,0.06)', border: '1.5px solid rgba(255,71,87,0.2)',
              marginBottom: 24, fontSize: '0.85rem', color: '#b71c1c',
              lineHeight: 1.6, animation: 'fadeInUp 0.4s ease both', opacity: 0,
            }}>
              <strong>⚠️ Important Risk Warning:</strong> Investing in startups is high risk and speculative. You may lose some or all of the money you invest. Please read all risk factors carefully and invest only what you can afford to lose. Past returns are not indicative of future performance. EquiRise is not a bank and investments are not protected by any government deposit insurance scheme.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {RISK_DISCLOSURES.map((r, i) => {
                const levelColor = { High: '#ff4757', Medium: '#ffa726', Low: '#00c896' }[r.level]
                return (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0,200,150,0.12)', borderRadius: 16,
                    padding: '20px 22px', display: 'flex', gap: 18, alignItems: 'flex-start',
                    animation: `fadeInUp 0.4s ${i * 0.07}s ease both`, opacity: 0,
                    transition: 'transform 0.22s ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                  >
                    <div style={{
                      width: 6, borderRadius: 4, alignSelf: 'stretch',
                      background: levelColor, flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#0a1f16' }}>
                          {r.title}
                        </span>
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 700, color: levelColor,
                          background: `${levelColor}18`, border: `1px solid ${levelColor}44`,
                          padding: '3px 10px', borderRadius: 9999,
                          textTransform: 'uppercase', letterSpacing: '0.04em',
                        }}>{r.level} Risk</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#4a6b5a', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{
              marginTop: 24, padding: '20px 24px',
              background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,200,150,0.15)',
              borderRadius: 18, textAlign: 'center',
              animation: 'fadeInUp 0.5s 0.35s ease both', opacity: 0,
            }}>
              <div style={{ fontSize: '0.85rem', color: '#4a6b5a', lineHeight: 1.7 }}>
                By investing on EquiRise, you confirm that you have read, understood, and accepted all risk disclosures above.
                For queries, contact our Compliance Officer at{' '}
                <a href="mailto:compliance@equirise.in" style={{ color: '#00c896', fontWeight: 600 }}>compliance@equirise.in</a>
                {' '}or call{' '}
                <a href="tel:+911800200300" style={{ color: '#00c896', fontWeight: 600 }}>1800-200-300</a> (toll-free).
              </div>
              <button className="btn btn-primary" style={{ marginTop: 14, fontSize: '0.85rem' }}>
                📥 Download Full Risk Disclosure Document
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
      `}</style>
    </section>
  )
}
