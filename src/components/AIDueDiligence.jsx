import { useState, useEffect, useRef } from 'react'
import { sampleBusinessPlan } from '../data/startups'

const DIMENSIONS = [
  { key: 'market', label: 'Market Opportunity', icon: '📊', weight: 25 },
  { key: 'team', label: 'Team Strength', icon: '👥', weight: 20 },
  { key: 'financials', label: 'Financial Health', icon: '💰', weight: 25 },
  { key: 'traction', label: 'Traction & Growth', icon: '📈', weight: 20 },
  { key: 'risk', label: 'Risk Assessment', icon: '⚠️', weight: 10 },
]

function scoreColor(s) {
  if (s >= 75) return '#00c896'
  if (s >= 55) return '#ffa726'
  return '#ff4757'
}

function gradeLabel(s) {
  if (s >= 85) return { grade: 'A+', text: 'Exceptional — Strong Buy Signal' }
  if (s >= 75) return { grade: 'A', text: 'Excellent Investment Potential' }
  if (s >= 65) return { grade: 'B+', text: 'Good — Worth Further Diligence' }
  if (s >= 55) return { grade: 'B', text: 'Moderate — Proceed with Caution' }
  if (s >= 40) return { grade: 'C', text: 'Below Average — Significant Risks' }
  return { grade: 'D', text: 'Poor — Not Recommended' }
}

function AnimatedScore({ target, duration = 1800 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return <span>{val}</span>
}

function simulateAnalysis(text) {
  const lower = text.toLowerCase()
  const has = (kw) => lower.includes(kw)

  const market = Math.min(100, 40 +
    (has('market') ? 12 : 0) + (has('billion') || has('crore') ? 10 : 0) +
    (has('growth') ? 8 : 0) + (has('tam') || has('addressable') ? 10 : 0) +
    (has('opportunity') ? 6 : 0) + Math.floor(Math.random() * 8))

  const team = Math.min(100, 35 +
    (has('ceo') || has('founder') ? 10 : 0) + (has('cto') ? 8 : 0) +
    (has('iit') || has('iim') || has('isro') ? 14 : 0) +
    (has('experience') || has('years') ? 8 : 0) +
    (has('advisory') || has('advisor') ? 7 : 0) + Math.floor(Math.random() * 8))

  const financials = Math.min(100, 30 +
    (has('revenue') || has('arr') ? 12 : 0) + (has('profit') ? 14 : 0) +
    (has('gross margin') ? 10 : 0) + (has('burn') ? 6 : 0) +
    (has('runway') ? 8 : 0) + (has('funding') ? 6 : 0) + Math.floor(Math.random() * 8))

  const traction = Math.min(100, 35 +
    (has('user') || has('customer') || has('farmer') ? 12 : 0) +
    (has('nps') || has('retention') ? 10 : 0) + (has('mom') || has('qoq') ? 8 : 0) +
    (has('partnership') || has('pilot') ? 10 : 0) +
    (has('churn') ? 7 : 0) + Math.floor(Math.random() * 8))

  const risk = Math.min(100, 40 +
    (has('risk') ? 8 : 0) + (has('competition') || has('competitor') ? 6 : 0) +
    (has('regulation') || has('sebi') ? 8 : 0) +
    (has('patent') ? 10 : 0) + (has('moat') ? 10 : 0) + Math.floor(Math.random() * 8))

  const scores = { market, team, financials, traction, risk }
  const overall = Math.round(
    market * 0.25 + team * 0.20 + financials * 0.25 + traction * 0.20 + risk * 0.10
  )

  const insights = []
  if (market >= 70) insights.push({ type: 'green', text: 'Large addressable market with strong growth trajectory' })
  else insights.push({ type: 'orange', text: 'Market sizing needs more rigorous validation' })

  if (team >= 70) insights.push({ type: 'green', text: 'Strong founding team with relevant domain expertise' })
  else insights.push({ type: 'orange', text: 'Team depth could be a concern — consider advisory support' })

  if (financials >= 70) insights.push({ type: 'green', text: 'Healthy unit economics and clear path to profitability' })
  else insights.push({ type: 'red', text: 'Financial metrics need improvement — watch burn rate closely' })

  if (traction >= 70) insights.push({ type: 'green', text: 'Strong traction signals — good product-market fit evidence' })
  else insights.push({ type: 'orange', text: 'Moderate traction — needs more growth velocity proof' })

  if (has('patent') || has('moat')) insights.push({ type: 'green', text: 'Defensible technology moat identified' })
  if (has('seasonal') || has('monsoon')) insights.push({ type: 'red', text: 'Revenue seasonality identified — high concentration risk' })
  if (has('competition') || has('competitor')) insights.push({ type: 'orange', text: 'Competitive landscape requires continuous monitoring' })

  return { scores, overall, insights }
}

export default function AIDueDiligence({ onChatPrompt }) {
  const [inputText, setInputText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [phase, setPhase] = useState('')
  const textRef = useRef(null)

  const phases = [
    'Parsing document structure...',
    'Extracting financial metrics...',
    'Analyzing team credentials...',
    'Scoring market opportunity...',
    'Computing traction signals...',
    'Running NLP sentiment analysis...',
    'Generating risk assessment...',
    'Compiling investment memo...',
  ]

  const handleAnalyze = () => {
    if (!inputText.trim()) return
    setAnalyzing(true)
    setResult(null)
    setProgress(0)

    let step = 0
    const interval = setInterval(() => {
      step++
      setProgress(Math.min(step * 12.5, 100))
      setPhase(phases[Math.min(step - 1, phases.length - 1)])
      if (step >= 8) {
        clearInterval(interval)
        const analysis = simulateAnalysis(inputText)
        setTimeout(() => {
          setResult(analysis)
          setAnalyzing(false)
        }, 400)
      }
    }, 450)
  }

  const loadSample = () => {
    setInputText(sampleBusinessPlan)
    setResult(null)
    if (textRef.current) textRef.current.scrollTop = 0
  }

  const S = {
    section: {
      paddingTop: 100, paddingBottom: 80,
      background: 'linear-gradient(180deg,#edfaf4 0%,#f5fef9 100%)',
      minHeight: '100vh',
    },
    container: { maxWidth: 1200, margin: '0 auto', padding: '0 24px' },
    header: { marginBottom: 48, animation: 'fadeInUp 0.5s ease both' },
    badge: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.25)',
      borderRadius: 9999, padding: '5px 14px', marginBottom: 16,
      fontSize: '0.78rem', fontWeight: 700, color: '#009e78',
    },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 },
    card: {
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)',
      border: '1px solid rgba(0,200,150,0.18)', borderRadius: 24,
      boxShadow: '0 8px 32px rgba(0,200,150,0.12)',
      overflow: 'hidden',
    },
    cardTitle: {
      padding: '24px 28px 0', fontFamily: 'Outfit,sans-serif',
      fontSize: '1.15rem', fontWeight: 800, color: '#0a1f16',
      display: 'flex', alignItems: 'center', gap: 10,
    },
    textarea: {
      width: '100%', minHeight: 280, padding: 20, border: 'none',
      background: 'transparent', fontFamily: 'Inter,sans-serif',
      fontSize: '0.85rem', color: '#1a2e24', lineHeight: 1.7,
      outline: 'none', resize: 'vertical',
    },
    actionBar: {
      padding: '16px 28px', borderTop: '1px solid rgba(0,200,150,0.12)',
      display: 'flex', gap: 12, alignItems: 'center',
    },
  }

  return (
    <section style={S.section}>
      <div style={S.container}>

        {/* Header */}
        <div style={S.header}>
          <div style={S.badge}>🤖 AI-POWERED ENGINE</div>
          <h2 className="section-title">AI Due Diligence</h2>
          <p className="section-sub" style={{ marginTop: 10 }}>
            Paste a startup's pitch deck text or business plan, and our NLP engine will score it across 5 investment dimensions — market, team, financials, traction, and risk.
          </p>
        </div>

        <div style={{
          ...S.grid,
          ...(window.innerWidth < 768 ? { gridTemplateColumns: '1fr' } : {}),
        }}>
          {/* Left panel – Input */}
          <div style={{ ...S.card, animation: 'fadeInUp 0.5s 0.1s ease both', opacity: 0 }}>
            <div style={S.cardTitle}>
              <span style={{ fontSize: 20 }}>📄</span>
              Upload Pitch Deck / Business Plan
            </div>
            <div style={{ padding: '0 28px 8px' }}>
              <p style={{ fontSize: '0.82rem', color: '#8aada0', marginTop: 8 }}>
                Paste the text from a pitch deck, investor memo, or executive summary.
              </p>
            </div>
            <div style={{ padding: '0 28px' }}>
              <textarea
                ref={textRef}
                style={S.textarea}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste your startup's pitch deck content here...&#10;&#10;Include sections like: Executive Summary, Market Opportunity, Team, Business Model, Financials, Traction, and Risks."
              />
            </div>
            <div style={S.actionBar}>
              <button className="btn btn-primary" onClick={handleAnalyze}
                disabled={analyzing || !inputText.trim()}
                style={{ opacity: analyzing || !inputText.trim() ? 0.6 : 1 }}>
                {analyzing ? (
                  <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Analyzing...</>
                ) : '🧠 Run AI Analysis'}
              </button>
              <button className="btn btn-ghost" onClick={loadSample} disabled={analyzing}>
                📋 Load Sample
              </button>
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: '#8aada0' }}>
                {inputText.length.toLocaleString()} chars
              </span>
            </div>
          </div>

          {/* Right panel – Results */}
          <div style={{ ...S.card, animation: 'fadeInUp 0.5s 0.2s ease both', opacity: 0 }}>
            <div style={S.cardTitle}>
              <span style={{ fontSize: 20 }}>📊</span>
              Analysis Results
            </div>

            {/* Analyzing state */}
            {analyzing && (
              <div style={{ padding: '40px 28px', textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, margin: '0 auto 24px',
                  border: '3px solid rgba(0,200,150,0.15)',
                  borderTopColor: '#00c896', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#0a1f16', marginBottom: 8 }}>
                  Analyzing Document
                </div>
                <p style={{ fontSize: '0.85rem', color: '#00c896', fontWeight: 600, marginBottom: 20 }}>
                  {phase}
                </p>
                <div className="progress-track" style={{ maxWidth: 320, margin: '0 auto', height: 6 }}>
                  <div className="progress-fill" style={{ width: `${progress}%`, transition: 'width 0.4s ease' }} />
                </div>
                <p style={{ fontSize: '0.78rem', color: '#8aada0', marginTop: 12 }}>
                  {Math.round(progress)}% complete
                </p>
              </div>
            )}

            {/* No results yet */}
            {!analyzing && !result && (
              <div style={{ padding: '80px 28px', textAlign: 'center', color: '#8aada0' }}>
                <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🧠</div>
                <p style={{ fontWeight: 600 }}>Paste a pitch deck and hit "Run AI Analysis"</p>
                <p style={{ fontSize: '0.82rem', marginTop: 8 }}>
                  Our NLP engine will score it across 5 dimensions
                </p>
              </div>
            )}

            {/* Results */}
            {result && !analyzing && (
              <div style={{ padding: '24px 28px', animation: 'fadeIn 0.4s ease' }}>

                {/* Overall score */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28,
                  padding: '20px 24px', borderRadius: 18,
                  background: `linear-gradient(135deg, ${scoreColor(result.overall)}12, ${scoreColor(result.overall)}08)`,
                  border: `2px solid ${scoreColor(result.overall)}44`,
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'Outfit,sans-serif', fontSize: '3rem', fontWeight: 900,
                      color: scoreColor(result.overall), lineHeight: 1,
                    }}>
                      <AnimatedScore target={result.overall} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#8aada0', marginTop: 4 }}>/ 100</div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.6rem',
                      color: scoreColor(result.overall),
                    }}>
                      {gradeLabel(result.overall).grade}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#4a6b5a', marginTop: 4 }}>
                      {gradeLabel(result.overall).text}
                    </div>
                  </div>
                </div>

                {/* Dimension scores */}
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0a1f16', marginBottom: 16 }}>
                  Dimension Breakdown
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                  {DIMENSIONS.map((d, i) => {
                    const score = result.scores[d.key]
                    return (
                      <div key={d.key} style={{ animation: `fadeInUp 0.4s ${0.1 * i}s ease both`, opacity: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a2e24' }}>
                            {d.icon} {d.label}
                            <span style={{ fontSize: '0.7rem', color: '#8aada0', marginLeft: 6 }}>({d.weight}%)</span>
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: scoreColor(score) }}>
                            {score}/100
                          </span>
                        </div>
                        <div className="progress-track" style={{ height: 7 }}>
                          <div style={{
                            height: '100%', width: `${score}%`,
                            background: `linear-gradient(90deg,${scoreColor(score)},${scoreColor(score)}88)`,
                            borderRadius: 9999, transition: 'width 1.2s ease',
                          }} />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Insights */}
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0a1f16', marginBottom: 14 }}>
                  🔍 Key Insights
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {result.insights.map((ins, i) => (
                    <div key={i} style={{
                      padding: '10px 14px', borderRadius: 10,
                      background: ins.type === 'green' ? 'rgba(0,200,150,0.06)' :
                        ins.type === 'orange' ? 'rgba(255,167,38,0.06)' : 'rgba(255,71,87,0.06)',
                      border: `1px solid ${ins.type === 'green' ? 'rgba(0,200,150,0.22)' :
                        ins.type === 'orange' ? 'rgba(255,167,38,0.22)' : 'rgba(255,71,87,0.22)'}`,
                      fontSize: '0.82rem',
                      color: ins.type === 'green' ? '#009e78' : ins.type === 'orange' ? '#c85a00' : '#d32f2f',
                    }}>
                      {ins.type === 'green' ? '✅' : ins.type === 'orange' ? '⚠️' : '🚩'} {ins.text}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => onChatPrompt(`Based on this AI due diligence analysis (overall score: ${result.overall}/100, grade: ${gradeLabel(result.overall).grade}), generate a detailed VC-style investment recommendation memo for this startup.`)}>
                    📝 Generate Full Memo
                  </button>
                  <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => { setResult(null); setInputText('') }}>
                    🔄 Analyze Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @media (max-width:768px) {
          .dd-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}
