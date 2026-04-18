import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DiscoverSection from './components/DiscoverSection'
import AIDueDiligence from './components/AIDueDiligence'
import Portfolio from './components/Portfolio'
import SEBICompliance from './components/SEBICompliance'
import ChatWidget from './components/ChatWidget'
import StartupModal from './components/StartupModal'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedStartup, setSelectedStartup] = useState(null)
  const [pageReady, setPageReady] = useState(false)
  const [investments, setInvestments] = useState([])

  const handleInvest = (startup, amount) => {
    console.log('✅ handleInvest called:', startup?.name, amount)
    const now = new Date()
    const entryDate = now.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
    const newEntry = { startupId: startup.id, invested: amount, entryDate }
    setInvestments(prev => {
      const updated = [...prev, newEntry]
      console.log('✅ investments now:', updated)
      return updated
    })
  }

  useEffect(() => {
    console.log('📊 investments changed:', investments)
  }, [investments])

  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedStartup(null)
  }

  return (
    <div style={{
      opacity: pageReady ? 1 : 0,
      transition: 'opacity 0.35s ease',
      minHeight: '100vh',
      background: 'var(--bg)',
    }}>
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />



      <main>
        {activeTab === 'home' && (
          <div style={{ animation: 'pageIn 0.4s ease both' }}>
            <Hero setActiveTab={handleTabChange} />
            <FeatureStrip setActiveTab={handleTabChange} />
            <Footer setActiveTab={handleTabChange} />
          </div>
        )}

        {activeTab === 'discover' && (
          <div style={{ animation: 'pageIn 0.4s ease both' }}>
            <DiscoverSection
              setActiveTab={handleTabChange}
              onInvest={handleInvest}
            />
          </div>
        )}

        {activeTab === 'due-diligence' && (
          <div style={{ animation: 'pageIn 0.4s ease both' }}>
            <AIDueDiligence onChatPrompt={() => {}} />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div style={{ animation: 'pageIn 0.4s ease both' }}>
            <Portfolio
              setActiveTab={handleTabChange}
              investments={investments}
            />
          </div>
        )}

        {activeTab === 'compliance' && (
          <div style={{ animation: 'pageIn 0.4s ease both' }}>
            <SEBICompliance />
          </div>
        )}
      </main>

      {selectedStartup && (
        <StartupModal
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
          onInvest={handleInvest}
        />
      )}

      <ChatWidget />

      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* Mini components rendered inline in App     */
/* ─────────────────────────────────────────── */

const FEATURES = [
  { icon: '🤖', title: 'AI Due Diligence', desc: 'NLP-powered pitch analysis scores startups across 6 dimensions in seconds.', tab: 'due-diligence', cta: 'Try it free →' },
  { icon: '🔒', title: 'Escrow Protection', desc: 'Your money stays locked in Axis Bank escrow until milestones are verified.', tab: 'compliance', cta: 'View compliance →' },
  { icon: '🚀', title: 'Curated Startups', desc: 'Only 4% of applicants make it to EquiRise. Each one is SEBI-vetted.', tab: 'discover', cta: 'Discover startups →' },
  { icon: '📊', title: 'Live Portfolio Tracker', desc: 'Real-time valuation, milestone tracker, and tax summary — all in one view.', tab: 'portfolio', cta: 'My portfolio →' },
]

function FeatureStrip({ setActiveTab }) {
  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg,#f5fef9 0%,#edfaf4 100%)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.25)', borderRadius: 9999, padding: '5px 16px', marginBottom: 16, fontSize: '0.78rem', fontWeight: 700, color: '#009e78' }}>
            ⚡ PLATFORM CAPABILITIES
          </div>
          <h2 className="section-title">
            Everything You Need to{' '}
            <span style={{ background: 'linear-gradient(135deg,#00c896,#00e5b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Invest Smarter</span>
          </h2>
          <p className="section-sub" style={{ textAlign: 'center', margin: '12px auto 0' }}>Institutional-grade tools, built for retail investors.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 22 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} onClick={() => setActiveTab(f.tab)} style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,200,150,0.15)', borderRadius: 22, padding: '28px 24px', boxShadow: '0 4px 20px rgba(0,200,150,0.09)', cursor: 'pointer', transition: 'all 0.28s ease', animation: `fadeInUp 0.55s ${i * 0.1}s ease both`, opacity: 0, position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,200,150,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,200,150,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,200,150,0.09)'; e.currentTarget.style.borderColor = 'rgba(0,200,150,0.15)' }}
            >
              <div style={{ position: 'absolute', top: -24, right: -24, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,200,150,0.12),transparent)', pointerEvents: 'none' }} />
              <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg,#e8faf4,#c8f5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 18, boxShadow: '0 4px 14px rgba(0,200,150,0.2)' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.08rem', color: '#0a1f16', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#4a6b5a', lineHeight: 1.65, marginBottom: 16 }}>{f.desc}</p>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00c896', display: 'flex', alignItems: 'center', gap: 4 }}>{f.cta}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeInUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }`}</style>
    </section>
  )
}



function Footer({ setActiveTab }) {
  const NAV_LINKS = [
    { label: 'Home', tab: 'home' },
    { label: 'Discover Startups', tab: 'discover' },
    { label: 'AI Due Diligence', tab: 'due-diligence' },
    { label: 'My Portfolio', tab: 'portfolio' },
    { label: 'SEBI Compliance', tab: 'compliance' },
  ]
  const linkStyle = { fontSize: '0.85rem', color: '#4a6b5a', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s', background: 'none', border: 'none', padding: 0, fontFamily: 'Inter,sans-serif', display: 'block', marginBottom: 10 }
  return (
    <footer style={{ background: 'linear-gradient(180deg,#edfaf4 0%,#ddf6ed 100%)', borderTop: '1px solid rgba(0,200,150,0.18)', padding: '60px 0 30px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg,#00c896,#00e5b0)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 4px 14px rgba(0,200,150,0.3)' }}>📈</div>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.3rem', fontWeight: 800, color: '#0a1f16', letterSpacing: '-0.5px' }}>EquiRise</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#4a6b5a', lineHeight: 1.7, maxWidth: 280, marginBottom: 18 }}>India's premier AI-powered equity crowdfunding platform. SEBI-registered, escrow-protected, and built for the next generation of retail investors.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.25)', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 700, color: '#009e78' }}>
              <span style={{ width: 7, height: 7, background: '#00c896', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 1.8s ease-in-out infinite' }} />
              AIF Category II Registered
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: '#0a1f16', fontSize: '0.9rem', marginBottom: 16 }}>Platform</div>
            {NAV_LINKS.map(l => (
              <button key={l.tab} onClick={() => setActiveTab(l.tab)} style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = '#00c896'} onMouseLeave={e => e.currentTarget.style.color = '#4a6b5a'}>{l.label}</button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: '#0a1f16', fontSize: '0.9rem', marginBottom: 16 }}>Legal</div>
            {['Privacy Policy', 'Terms of Service', 'Risk Disclosures', 'Grievance Policy', 'Cookie Policy'].map(l => (
              <a key={l} href="#" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = '#00c896'} onMouseLeave={e => e.currentTarget.style.color = '#4a6b5a'}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: '#0a1f16', fontSize: '0.9rem', marginBottom: 16 }}>Contact Us</div>
            {[
              { label: '📧 support@equirise.in', href: 'mailto:support@equirise.in' },
              { label: '📞 1800-200-300', href: 'tel:+911800200300' },
              { label: '💬 WhatsApp Chat', href: '#' },
              { label: '🐦 @EquiRiseIN', href: '#' },
              { label: '💼 LinkedIn', href: '#' },
            ].map(c => (
              <a key={c.label} href={c.href} style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = '#00c896'} onMouseLeave={e => e.currentTarget.style.color = '#4a6b5a'}>{c.label}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,200,150,0.15)', paddingTop: 24, marginBottom: 20, fontSize: '0.72rem', color: '#8aada0', lineHeight: 1.7 }}>
          <strong style={{ color: '#4a6b5a' }}>Regulatory Disclaimer: </strong>
          Investments made on EquiRise are subject to market risks and are illiquid in nature. EquiRise is registered as an Alternative Investment Fund (Category II) with SEBI (Registration No. IN/AIF2/22-23/1084). Equity crowdfunding involves substantial risk of loss. Please read all offer documents carefully before investing. Past performance is not indicative of future results.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '0.78rem', color: '#8aada0' }}>© 2024 EquiRise Technologies Pvt. Ltd. All rights reserved. · CIN: U72900MH2022PTC385710</div>
          <div style={{ display: 'flex', gap: 14 }}>
            {['🔒 SSL Secured', '⚖️ SEBI Compliant', '🏦 Axis Bank Escrow'].map(badge => (
              <div key={badge} style={{ fontSize: '0.7rem', fontWeight: 600, color: '#009e78', background: 'rgba(0,200,150,0.08)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(0,200,150,0.2)' }}>{badge}</div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.6);opacity:0.4;} }`}</style>
    </footer>
  )
}