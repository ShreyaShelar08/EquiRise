import { useState } from 'react'
import { startups } from '../data/startups'
import StartupModal from './StartupModal'

const SECTORS = ['All', 'AgriTech', 'CleanTech', 'Manufacturing Tech', 'AgriTech / Trade']
const STAGES  = ['All', 'Seed', 'Pre-Series A', 'Series A']
const RISK    = ['All', 'Low-Medium', 'Medium', 'Medium-High']

function riskColor(r) {
  if (r === 'Low-Medium') return { bg: 'rgba(0,200,150,0.12)', color: '#009e78' }
  if (r === 'Medium')     return { bg: 'rgba(255,167,38,0.12)', color: '#c85a00' }
  return { bg: 'rgba(255,71,87,0.12)', color: '#d32f2f' }
}

function fmt(n) {
  if (n >= 10000000) return `₹${(n/10000000).toFixed(1)}Cr`
  if (n >= 100000)   return `₹${(n/100000).toFixed(1)}L`
  return `₹${n.toLocaleString('en-IN')}`
}

export default function DiscoverSection({ onChatPrompt, setActiveTab, onInvest }) {
  const [sector, setSector] = useState('All')
  const [stage, setStage]   = useState('All')
  const [risk, setRisk]     = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  // ↓ Track which tab to open modal on
  const [modalInitialTab, setModalInitialTab] = useState('overview')

  const filtered = startups.filter(s =>
    (sector === 'All' || s.sector === sector) &&
    (stage  === 'All' || s.stage  === stage)  &&
    (risk   === 'All' || s.riskRating === risk) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.location.toLowerCase().includes(search.toLowerCase()))
  )

  // Open modal on overview tab
  const handleViewCampaign = (e, startup) => {
    e.stopPropagation()
    setModalInitialTab('overview')
    setSelected(startup)
  }

  // Open modal directly on due diligence tab
  const handleDeepDueDiligence = (e, startup) => {
    e.stopPropagation()
    setModalInitialTab('duediligence')
    setSelected(startup)
  }

  return (
    <section style={{ paddingTop:100, paddingBottom:80, background:'linear-gradient(180deg,#edfaf4 0%,#f5fef9 100%)', minHeight:'100vh' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom:48, animation:'fadeInUp 0.5s ease both' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            background:'rgba(0,200,150,0.1)', border:'1px solid rgba(0,200,150,0.25)',
            borderRadius:9999, padding:'5px 14px', marginBottom:16,
            fontSize:'0.78rem', fontWeight:700, color:'#009e78',
          }}>
            🔍 LIVE CAMPAIGNS
          </div>
          <h2 className="section-title">Discover Startups</h2>
          <p className="section-sub" style={{ marginTop:10 }}>
            Vetted, AI-scored companies from India's emerging innovation corridors. Click any card for full due diligence.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:40,
          padding:'20px 24px',
          background:'rgba(255,255,255,0.75)', backdropFilter:'blur(10px)',
          border:'1px solid rgba(0,200,150,0.15)',
          borderRadius:20, boxShadow:'0 4px 20px rgba(0,200,150,0.08)',
          animation:'fadeInUp 0.5s 0.1s ease both', opacity:0,
        }}>
          <input
            className="input"
            placeholder="🔍  Search startup or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth:260, height:42 }}
          />
          {[
            { label:'Sector', opts:SECTORS, val:sector, set:setSector },
            { label:'Stage',  opts:STAGES,  val:stage,  set:setStage  },
            { label:'Risk',   opts:RISK,    val:risk,   set:setRisk   },
          ].map(f => (
            <select
              key={f.label}
              value={f.val}
              onChange={e => f.set(e.target.value)}
              style={{
                padding:'9px 36px 9px 14px',
                border:'1.5px solid rgba(0,200,150,0.22)',
                borderRadius:10, background:'rgba(255,255,255,0.9)',
                fontFamily:'Inter,sans-serif', fontSize:'0.875rem', color:'#1a2e24',
                cursor:'pointer', outline:'none', appearance:'none',
                backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2300c896' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat:'no-repeat', backgroundPosition:'right 12px center',
              }}
            >
              {f.opts.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}

          <div style={{ marginLeft:'auto', fontSize:'0.85rem', color:'#4a6b5a', fontWeight:600 }}>
            {filtered.length} campaign{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Cards grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
          gap:24,
        }}>
          {filtered.map((s, i) => {
            const pct = Math.round((s.raised / s.target) * 100)
            const rc  = riskColor(s.riskRating)
            return (
              <div
                key={s.id}
                onClick={() => { setModalInitialTab('overview'); setSelected(s) }}
                style={{
                  background:'rgba(255,255,255,0.88)',
                  backdropFilter:'blur(12px)',
                  border:'1px solid rgba(0,200,150,0.15)',
                  borderRadius:24,
                  overflow:'hidden',
                  cursor:'pointer',
                  boxShadow:'0 4px 20px rgba(0,200,150,0.1)',
                  transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  animation:`fadeInUp 0.55s ${i * 0.08}s ease both`,
                  opacity:0,
                  display:'flex', flexDirection:'column',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform='translateY(-8px) scale(1.02)'
                  e.currentTarget.style.boxShadow='0 20px 50px rgba(0,200,150,0.22)'
                  e.currentTarget.style.borderColor='rgba(0,200,150,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform=''
                  e.currentTarget.style.boxShadow='0 4px 20px rgba(0,200,150,0.1)'
                  e.currentTarget.style.borderColor='rgba(0,200,150,0.15)'
                }}
              >
                {/* Card header */}
                <div style={{
                  background:s.gradient, padding:'28px 24px 20px',
                  position:'relative', overflow:'hidden',
                }}>
                  <div style={{
                    position:'absolute', top:-20, right:-20, width:100, height:100,
                    borderRadius:'50%', background:'rgba(255,255,255,0.25)',
                  }}/>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                    <div style={{
                      width:54, height:54, borderRadius:16, fontSize:26,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      background:'rgba(255,255,255,0.8)', boxShadow:'0 4px 12px rgba(0,0,0,0.08)',
                    }}>{s.logo}</div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                      <span style={{
                        background:'rgba(255,255,255,0.7)',
                        color:s.accent, padding:'3px 10px',
                        borderRadius:9999, fontSize:'0.72rem', fontWeight:700,
                      }}>{s.stage}</span>
                      <span style={{
                        background:rc.bg, color:rc.color,
                        padding:'3px 10px', borderRadius:9999,
                        fontSize:'0.7rem', fontWeight:700,
                      }}>● {s.riskRating}</span>
                    </div>
                  </div>
                  <div style={{ marginTop:16 }}>
                    <h3 style={{
                      fontFamily:'Outfit,sans-serif', fontSize:'1.15rem',
                      fontWeight:800, color:'#0a1f16', marginBottom:4,
                    }}>{s.name}</h3>
                    <p style={{ fontSize:'0.82rem', color:'#4a6b5a', lineHeight:1.5 }}>{s.tagline}</p>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', flex:1 }}>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
                    <span className="badge badge-green">{s.sector}</span>
                    <span style={{
                      fontSize:'0.72rem', fontWeight:500, color:'#4a6b5a',
                      display:'flex', alignItems:'center', gap:4,
                    }}>📍 {s.location}</span>
                  </div>

                  {/* Progress */}
                  <div style={{ marginBottom:16 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontSize:'0.78rem', color:'#4a6b5a' }}>Raised</span>
                      <span style={{ fontSize:'0.78rem', fontWeight:700, color:'#00c896' }}>{pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width:`${pct}%` }}/>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                      <span style={{ fontSize:'0.8rem', fontWeight:700, color:'#0a1f16' }}>{fmt(s.raised)}</span>
                      <span style={{ fontSize:'0.78rem', color:'#8aada0' }}>of {fmt(s.target)}</span>
                    </div>
                  </div>

                  {/* Key stats */}
                  <div style={{
                    display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:20,
                  }}>
                    {[
                      { l:'Investors', v:s.investors },
                      { l:'Days Left', v:s.daysLeft },
                      { l:'Revenue',   v:s.revenue   },
                    ].map(st => (
                      <div key={st.l} style={{
                        background:'rgba(0,200,150,0.05)', borderRadius:10, padding:'10px 8px',
                        textAlign:'center',
                      }}>
                        <div style={{ fontSize:'0.9rem', fontWeight:800, color:'#0a1f16' }}>{st.v}</div>
                        <div style={{ fontSize:'0.68rem', color:'#8aada0', marginTop:2 }}>{st.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* ↓ Two buttons: View Campaign + Deep Due Diligence */}
                  <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
                    <button
                      className="btn btn-primary"
                      onClick={e => handleViewCampaign(e, s)}
                      style={{ flex:1, justifyContent:'center', padding:'10px 12px', fontSize:'0.82rem' }}
                    >
                      View Campaign →
                    </button>
                    <button
                      onClick={e => handleDeepDueDiligence(e, s)}
                      style={{
                        flex:1,
                        display:'flex', alignItems:'center', justifyContent:'center', gap:4,
                        padding:'10px 12px',
                        background:'rgba(99,60,180,0.08)',
                        border:'1.5px solid rgba(99,60,180,0.2)',
                        borderRadius:12,
                        color:'#5b21b6',
                        fontSize:'0.82rem', fontWeight:700,
                        cursor:'pointer',
                        transition:'all 0.2s ease',
                        fontFamily:'Inter,sans-serif',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background='rgba(99,60,180,0.15)'
                        e.currentTarget.style.borderColor='rgba(99,60,180,0.4)'
                        e.currentTarget.style.transform='translateY(-1px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background='rgba(99,60,180,0.08)'
                        e.currentTarget.style.borderColor='rgba(99,60,180,0.2)'
                        e.currentTarget.style.transform=''
                      }}
                    >
                      🤖 Deep Dive
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'80px 0', color:'#8aada0' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <p style={{ fontWeight:600 }}>No campaigns match your filters</p>
          </div>
        )}
      </div>

      {selected && (
        <StartupModal
          startup={selected}
          onClose={() => setSelected(null)}
          onChatPrompt={onChatPrompt}
          setActiveTab={setActiveTab}
          // ↓ Pass which tab to open on + auto-trigger flag
          initialTab={modalInitialTab}
          autoRunDueDiligence={modalInitialTab === 'duediligence'}
          onInvest={(startup, amount) => {
            if (onInvest) onInvest(startup, amount)
            setSelected(null)
          }}
        />
      )}

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
      `}</style>
    </section>
  )
}