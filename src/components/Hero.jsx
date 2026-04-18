import { useEffect, useRef, useState } from 'react'

function CountUp({ end, prefix = '', suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = end / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setVal(end); clearInterval(timer); }
          else setVal(Math.floor(start))
        }, 16)
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{prefix}{val.toLocaleString('en-IN')}{suffix}</span>
}

const stats = [
  { icon: '📈', value: 72, suffix: 'M+', prefix: '₹', label: 'Total Invested', delay: 0 },
  { icon: '👥', value: 12400, suffix: '+', prefix: '', label: 'Active Investors', delay: 0.4 },
  { icon: '🚀', value: 94, suffix: '', prefix: '', label: 'Startups Funded', delay: 0.8 },
]

export default function Hero({ setActiveTab }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingTop: 100, paddingBottom: 80,
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,176,0.18) 0%, transparent 70%), linear-gradient(180deg,#edfaf4 0%,#f5fef9 60%,#edfaf4 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background circles */}
      {[
        { w:420,h:420,top:-80,left:-100,op:0.07 },
        { w:320,h:320,top:200,right:-80,op:0.06 },
        { w:200,h:200,bottom:100,left:'10%',op:0.08 },
      ].map((c,i) => (
        <div key={i} style={{
          position:'absolute', width:c.w, height:c.h,
          top:c.top, left:c.left, right:c.right, bottom:c.bottom,
          borderRadius:'50%',
          background:`radial-gradient(circle, rgba(0,200,150,${c.op*3}) 0%, transparent 70%)`,
          pointerEvents:'none',
        }}/>
      ))}

      {/* Grid pattern */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'radial-gradient(rgba(0,200,150,0.12) 1px, transparent 1px)',
        backgroundSize:'32px 32px',
        pointerEvents:'none', opacity:0.5,
      }}/>

      {/* SEBI tag */}
      <div style={{
        display:'inline-flex', alignItems:'center', gap:8,
        padding:'7px 18px',
        background:'rgba(255,255,255,0.8)',
        border:'1px solid rgba(0,200,150,0.3)',
        borderRadius:9999,
        fontSize:'0.8rem', fontWeight:600, color:'#009e78',
        marginBottom:28,
        backdropFilter:'blur(8px)',
        boxShadow:'0 2px 12px rgba(0,200,150,0.12)',
        animation:'fadeInUp 0.5s ease both',
      }}>
        <span style={{fontSize:14}}>⚖️</span>
        SEBI-Compliant Equity Crowdfunding · CCPS Framework
        <span style={{
          background:'#00c896', color:'white',
          padding:'2px 8px', borderRadius:9999, fontSize:'0.7rem',
        }}>India's #1</span>
      </div>

      {/* Main headline */}
      <h1 style={{
        fontFamily:'Outfit,sans-serif',
        fontSize:'clamp(2.4rem,5.5vw,4.2rem)',
        fontWeight:900, textAlign:'center',
        color:'#0a1f16',
        letterSpacing:'-0.04em', lineHeight:1.1,
        maxWidth:820, marginBottom:24,
        animation:'fadeInUp 0.6s 0.1s ease both', opacity:0,
      }}>
        Own a Piece of{' '}
        <span style={{
          background:'linear-gradient(135deg,#00c896,#00e5b0,#009e78)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text',
        }}>
          India's Next Unicorns
        </span>{' '}
       
      </h1>

      <p style={{
        fontSize:'clamp(1rem,2vw,1.15rem)',
        color:'#4a6b5a', textAlign:'center',
        maxWidth:580, lineHeight:1.8, marginBottom:40,
        animation:'fadeInUp 0.6s 0.2s ease both', opacity:0,
      }}>
        Invest in vetted, AI-scored startups from Nashik, Morbi, Guntur &amp; beyond.
        Full SEBI compliance, escrow-protected milestones, and live AI due diligence.
      </p>

      {/* CTAs */}
      <div style={{
        display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginBottom:80,
        animation:'fadeInUp 0.6s 0.3s ease both', opacity:0,
      }}>
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab('discover')}
          style={{ padding:'14px 32px', fontSize:'1rem' }}
        >
          🚀 Start Investing Today
        </button>
        <button
          className="btn btn-outline"
          onClick={() => setActiveTab('due-diligence')}
          style={{ padding:'14px 32px', fontSize:'1rem' }}
        >
          🤖 Try AI Due Diligence
        </button>
      </div>

      {/* Wave bottom */}
      <svg style={{
        position:'absolute', bottom:0, left:0, right:0,
        width:'100%', overflow:'hidden',
      }} viewBox="0 0 1440 60" preserveAspectRatio="none" height={60}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          fill="rgba(237,250,244,1)"/>
      </svg>

      <style>{`
        @keyframes float  { 0%,100%{transform:translateY(0) rotate(0);} 40%{transform:translateY(-14px) rotate(1.5deg);} 70%{transform:translateY(-7px) rotate(-1deg);} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0);} 40%{transform:translateY(-10px) rotate(-1.5deg);} 70%{transform:translateY(-5px) rotate(1deg);} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
      `}</style>
    </section>
  )
}
