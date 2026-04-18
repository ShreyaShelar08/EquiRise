import { useState, useEffect } from 'react'

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'discover', label: 'Discover' },
  { id: 'due-diligence', label: 'AI Diligence' },
  { id: 'portfolio', label: 'My Portfolio' },
  { id: 'compliance', label: 'SEBI' },
]

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const S = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled ? 'rgba(237,250,244,0.95)' : 'rgba(237,250,244,0.85)',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      borderBottom: scrolled ? '1px solid rgba(0,200,150,0.18)' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 24px rgba(0,200,150,0.12)' : 'none',
      transition: 'all 0.3s ease',
    },
    inner: {
      maxWidth: 1200, margin: '0 auto', padding: '0 24px',
      height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
    },
    logo: {
      display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0,
    },
    logoIcon: {
      width: 38, height: 38,
      background: 'linear-gradient(135deg,#00c896,#00e5b0)',
      borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, boxShadow: '0 4px 14px rgba(0,200,150,0.35)',
    },
    logoText: {
      fontFamily: 'Outfit,sans-serif', fontSize: '1.35rem', fontWeight: 800,
      color: '#0a1f16', letterSpacing: '-0.5px',
    },
    tabs: {
      display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center',
    },
    right: {
      display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
    },
    kycBadge: {
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 14px',
      background: 'rgba(0,200,150,0.1)',
      border: '1px solid rgba(0,200,150,0.28)',
      borderRadius: 9999,
      fontSize: '0.74rem', fontWeight: 700, color: '#009e78',
    },
    dot: {
      width: 7, height: 7, background: '#00c896', borderRadius: '50%',
      animation: 'pulse-dot 1.8s ease-in-out infinite',
    },
    
    burger: {
      display: 'none', background: 'none', border: 'none',
      cursor: 'pointer', padding: 8, color: '#1a2e24', fontSize: 22,
    },
    mobileMenu: {
      display: menuOpen ? 'flex' : 'none',
      flexDirection: 'column', gap: 4,
      padding: '12px 24px 20px',
      borderTop: '1px solid rgba(0,200,150,0.15)',
      background: 'rgba(237,250,244,0.98)',
    },
  }

  const tabStyle = (id) => ({
    padding: '8px 16px',
    borderRadius: 9999, border: 'none',
    background: activeTab === id ? 'linear-gradient(135deg,rgba(0,200,150,0.18),rgba(0,229,176,0.1))' : 'transparent',
    color: activeTab === id ? '#00c896' : '#4a6b5a',
    fontFamily: 'Inter,sans-serif', fontSize: '0.875rem',
    fontWeight: activeTab === id ? 700 : 500,
    cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
    boxShadow: activeTab === id ? 'inset 0 1px 0 rgba(255,255,255,0.6)' : 'none',
    position: 'relative',
  })

  return (
    <nav style={S.nav}>
      <div style={S.inner}>
        <div style={S.logo} onClick={() => setActiveTab('home')}>
          <div style={S.logoIcon}>📈</div>
          <span style={S.logoText}>EquiRise</span>
        </div>

        <div style={S.tabs} className="nav-tabs-desktop">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={tabStyle(t.id)}>
              {t.label}
              {t.id === activeTab && (
                <span style={{
                  position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
                  width: 18, height: 3, background: '#00c896', borderRadius: 4,
                  animation: 'fadeIn 0.2s ease',
                }}/>
              )}
            </button>
          ))}
        </div>

        <div style={S.right}>
          <div style={S.kycBadge}>
            <span style={S.dot}/>
            KYC Verified
          </div>
          
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%,100%{transform:scale(1);opacity:1;}
          50%{transform:scale(1.7);opacity:0.4;}
        }
        @media (max-width:768px) {
          .nav-tabs-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
