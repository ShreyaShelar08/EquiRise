import { useState, useRef, useEffect } from 'react'

const SUGGESTED = [
  'What is the minimum investment amount?',
  'How does the escrow mechanism work?',
  'Which startups have the best AI score?',
  'How do I withdraw my investment?',
  'Is this SEBI compliant?',
  'What returns can I expect?',
]

const BOT_RESPONSES = {
  'minimum investment': 'The minimum investment on EquiRise is **₹25,000** per startup. For accredited investors (net worth above ₹2 Cr), there is no upper limit per campaign. You can invest in up to **4 live campaigns** simultaneously.',
  'escrow': 'Great question! 🔒 All investor funds are held in an **Axis Bank SEBI-approved escrow account**. Funds are released to the startup only when independent verifiers confirm milestone completion. If a campaign fails to reach its target, 100% of your funds are refunded within 7 working days.',
  'ai score': '🤖 Our AI Due Diligence engine scores each startup across 6 dimensions:\n\n• **Market Opportunity** (0-100)\n• **Team Quality** (0-100)\n• **Financial Health** (0-100)\n• **Traction & Growth** (0-100)\n• **Risk Factors** (0-100)\n• **ESG Score** (0-100)\n\nCurrently, **TileTech Analytics (Morbi)** has the highest composite AI score of **84.3/100**, followed by **AgroVision AI** at 77.2/100.',
  'withdraw': 'Startup equity investments are **illiquid** — there is no guaranteed exit window. Possible exit routes include:\n\n1. **Buyback programs** by the startup (typically after 3 years)\n2. **Secondary market transfers** between registered investors\n3. **IPO / acquisition** events\n\nWe recommend treating these as **5-7 year investments**. Always read the risk factors before investing.',
  'sebi': '✅ Yes, EquiRise is fully SEBI-compliant:\n\n• **AIF Category II License** (Reg. No. IN/AIF2/22-23/1084)\n• All investments structured as **CCPS** (Compulsorily Convertible Preference Shares)\n• Full **KYC/AML** compliance under PMLA 2002\n• Investor grievance redressal within 3 working days\n\nVisit our SEBI Compliance Center for all registration documents.',
  'returns': '📈 Past performance across EquiRise campaigns:\n\n• **Avg. portfolio ROI:** +31% (portfolio hold period 8-16 months)\n• **Top performer:** TileTech Analytics (+39% in 14 months)\n• **Lowest:** SpiceConnect (+23% in 9 months)\n\n⚠️ **Important:** Past returns are NOT indicative of future performance. Startup investing is high-risk and you may lose your entire investment.',
  'default': 'Thanks for your question! 🙏 Our team is reviewing it. For urgent queries:\n\n• **Email:** support@equirise.in\n• **Phone:** 1800-200-300 (toll-free, 9am-6pm Mon-Sat)\n• **WhatsApp:** +91-98765-43210\n\nOr explore our **Help Center** for FAQs about investing, compliance, and portfolio management.',
}

function getResponse(query) {
  const q = query.toLowerCase()
  if (q.includes('minimum') || q.includes('invest amount') || q.includes('how much')) return BOT_RESPONSES['minimum investment']
  if (q.includes('escrow') || q.includes('fund') || q.includes('safe') || q.includes('secure')) return BOT_RESPONSES['escrow']
  if (q.includes('score') || q.includes('ai') || q.includes('diligence') || q.includes('best')) return BOT_RESPONSES['ai score']
  if (q.includes('withdraw') || q.includes('exit') || q.includes('sell') || q.includes('return money')) return BOT_RESPONSES['withdraw']
  if (q.includes('sebi') || q.includes('complian') || q.includes('legal') || q.includes('regulated')) return BOT_RESPONSES['sebi']
  if (q.includes('return') || q.includes('roi') || q.includes('profit') || q.includes('earn')) return BOT_RESPONSES['returns']
  return BOT_RESPONSES['default']
}

function formatMsg(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const formatted = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^•\s/, '<span style="color:#00c896;margin-right:6px">•</span>')
      .replace(/^\d+\.\s/, (m) => `<span style="color:#00c896;font-weight:700;margin-right:4px">${m}</span>`)
    return (
      <div
        key={i}
        dangerouslySetInnerHTML={{ __html: formatted }}
        style={{ lineHeight: 1.65, marginBottom: line === '' ? 8 : 0 }}
      />
    )
  })
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi! 👋 I\'m **EquiBot**, your AI investment assistant.\n\nI can help you with:\n• Investment queries & minimums\n• SEBI compliance questions\n• Portfolio & escrow info\n• Startup due diligence insights\n\nWhat would you like to know?',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(text = input.trim()) {
    if (!text) return
    const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    setMessages(m => [...m, { role: 'user', text, time }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = getResponse(text)
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', text: reply, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }])
      if (!open) setUnread(u => u + 1)
    }, 1200 + Math.random() * 600)
  }

  const W = {
    fab: {
      position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
      width: 58, height: 58, borderRadius: '50%',
      background: 'linear-gradient(135deg,#00c896,#00e5b0)',
      border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, boxShadow: '0 6px 28px rgba(0,200,150,0.5)',
      transition: 'all 0.25s ease',
      animation: 'float 4s ease-in-out infinite',
    },
    window: {
      position: 'fixed', bottom: 98, right: 28, zIndex: 9998,
      width: 380, height: 540,
      background: 'rgba(237,250,244,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(0,200,150,0.22)',
      borderRadius: 24, overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 8px 32px rgba(0,200,150,0.2)',
      display: 'flex', flexDirection: 'column',
      animation: open ? 'chatPop 0.28s cubic-bezier(0.16,1,0.3,1) both' : 'chatClose 0.2s ease both',
    },
    header: {
      background: 'linear-gradient(135deg,#00c896,#009e78)',
      padding: '16px 18px',
      display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0,
    },
    avatar: {
      width: 38, height: 38, borderRadius: '50%',
      background: 'rgba(255,255,255,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 20, flexShrink: 0,
    },
    messages: {
      flex: 1, overflowY: 'auto', padding: '16px 14px',
      display: 'flex', flexDirection: 'column', gap: 12,
    },
    inputRow: {
      padding: '12px 14px', borderTop: '1px solid rgba(0,200,150,0.15)',
      display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0,
      background: 'rgba(255,255,255,0.7)',
    },
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div style={W.window}>
          {/* Header */}
          <div style={W.header}>
            <div style={W.avatar}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>
                EquiBot — AI Assistant
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b2fbe5', display: 'inline-block' }} />
                Online · Typically replies instantly
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: '50%',
              width: 32, height: 32, cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={W.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                gap: 8, alignItems: 'flex-end',
              }}>
                {msg.role === 'bot' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#00c896,#009e78)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  }}>🤖</div>
                )}
                <div style={{ maxWidth: '75%' }}>
                  <div style={{
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg,#00c896,#009e78)'
                      : 'rgba(255,255,255,0.95)',
                    color: msg.role === 'user' ? 'white' : '#1a2e24',
                    padding: '10px 14px', borderRadius: 16,
                    borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                    borderBottomLeftRadius: msg.role === 'bot' ? 4 : 16,
                    fontSize: '0.83rem', lineHeight: 1.55,
                    boxShadow: msg.role === 'bot'
                      ? '0 2px 12px rgba(0,0,0,0.07)'
                      : '0 4px 16px rgba(0,200,150,0.35)',
                    border: msg.role === 'bot' ? '1px solid rgba(0,200,150,0.12)' : 'none',
                  }}>
                    {formatMsg(msg.text)}
                  </div>
                  <div style={{
                    fontSize: '0.65rem', color: '#8aada0', marginTop: 4,
                    textAlign: msg.role === 'user' ? 'right' : 'left',
                  }}>{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#00c896,#009e78)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                }}>🤖</div>
                <div style={{
                  background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,200,150,0.12)',
                  padding: '10px 14px', borderRadius: 16, borderBottomLeftRadius: 4,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#00c896', animation: `typingDot 1.1s ${j * 0.2}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div style={{
              padding: '0 14px 10px',
              display: 'flex', gap: 6, flexWrap: 'wrap',
            }}>
              {SUGGESTED.slice(0, 4).map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} style={{
                  padding: '5px 11px', borderRadius: 9999, border: '1px solid rgba(0,200,150,0.25)',
                  background: 'rgba(0,200,150,0.07)', color: '#009e78',
                  fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'Inter,sans-serif', transition: 'all 0.18s',
                  whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,150,0.16)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,200,150,0.07)'}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div style={W.inputRow}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask EquiBot anything…"
              style={{
                flex: 1, padding: '10px 14px',
                border: '1.5px solid rgba(0,200,150,0.22)', borderRadius: 12,
                background: 'rgba(255,255,255,0.8)',
                fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: '#1a2e24',
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#00c896'}
              onBlur={e => e.target.style.borderColor = 'rgba(0,200,150,0.22)'}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              style={{
                width: 40, height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: input.trim() && !typing ? 'linear-gradient(135deg,#00c896,#009e78)' : 'rgba(0,200,150,0.1)',
                color: input.trim() && !typing ? 'white' : '#8aada0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'all 0.2s',
                boxShadow: input.trim() && !typing ? '0 4px 14px rgba(0,200,150,0.4)' : 'none',
                flexShrink: 0,
              }}
            >➤</button>
          </div>

          <div style={{
            textAlign: 'center', fontSize: '0.65rem', color: '#8aada0',
            padding: '6px 0 10px',
            background: 'rgba(255,255,255,0.6)',
          }}>
            Powered by EquiRise AI · Responses are informational only
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        style={W.fab}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,200,150,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,200,150,0.5)' }}
        title="Chat with EquiBot"
      >
        {open ? '✕' : '🤖'}
        {!open && unread > 0 && (
          <div style={{
            position: 'absolute', top: -3, right: -3,
            width: 18, height: 18, borderRadius: '50%',
            background: '#ff4757', color: 'white',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
          }}>{unread}</div>
        )}
      </button>

      <style>{`
        @keyframes chatPop  { from{opacity:0;transform:scale(0.88) translateY(20px);transform-origin: bottom right;} to{opacity:1;transform:scale(1) translateY(0);} }
        @keyframes chatClose{ from{opacity:1;transform:scale(1);} to{opacity:0;transform:scale(0.88) translateY(20px);} }
        @keyframes float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);} }
        @keyframes typingDot{ 0%,100%{transform:translateY(0);opacity:0.5;} 50%{transform:translateY(-5px);opacity:1;} }
      `}</style>
    </>
  )
}
