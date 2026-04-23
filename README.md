<div align="center">

<br/>

```
███████╗ ██████╗ ██╗   ██╗██╗██████╗ ██╗███████╗███████╗
██╔════╝██╔═══██╗██║   ██║██║██╔══██╗██║██╔════╝██╔════╝
█████╗  ██║   ██║██║   ██║██║██████╔╝██║███████╗█████╗  
██╔══╝  ██║▄▄ ██║██║   ██║██║██╔══██╗██║╚════██║██╔══╝  
███████╗╚██████╔╝╚██████╔╝██║██║  ██║██║███████║███████╗
╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
```

### *Equity for Every Indian. One Rupee at a Time.*

<br/>

[![License](https://img.shields.io/badge/License-MIT-02C39A?style=for-the-badge)](LICENSE)
[![SEBI](https://img.shields.io/badge/SEBI-Compliant%20Framework-028090?style=for-the-badge)](docs/sebi.md)
[![AI Powered](https://img.shields.io/badge/AI-NLP%20Due%20Diligence-00B4D8?style=for-the-badge)](#ai-due-diligence)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-02C39A?style=for-the-badge)](CONTRIBUTING.md)

[🚀 Live Demo](https://equi-rise.vercel.app/)


<br/>

> **EquiRise** is a regulated crowdfunding platform that bridges the funding gap between Tier-2/3 city startups and local community investors — enabling micro-investments starting at just ₹500, powered by AI-driven due diligence and built on a SEBI-compliant regulatory foundation.

<br/>

---

</div>

## 🌏 The Problem We're Solving

India's startup ecosystem has a geography problem.

Over **90% of angel and VC funding** flows into Delhi, Mumbai, and Bengaluru. Tier-2 and Tier-3 city startups — the bakery owner in Nashik, the AgriTech founder in Aurangabad, the ceramic manufacturer in Morbi — struggle to raise even ₹5–10 lakh in seed capital. They have traction, they have community trust, but no access to structured capital.

At the same time, millions of local residents who believe in these very businesses have **no regulated, transparent platform** to invest even ₹500 into the growth of a startup they visit every week.

**EquiRise closes this gap.**

---

## ✨ What EquiRise Does

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   STARTUP  ──▶  Pitch + Business Plan Upload                        │
│                         │                                           │
│                         ▼                                           │
│              AI Due Diligence Scoring                               │
│         (Market · Team · Financials · Traction · Risk)              │
│                         │                                           │
│                         ▼                                           │
│           SEBI-Compliant Campaign Goes Live                         │
│                         │                                           │
│                         ▼                                           │
│   INVESTORS ──▶  Browse · KYC · Invest (₹500+)                     │
│                         │                                           │
│                         ▼                                           │
│           Escrow Holds Funds Until Milestones Met                   │
│                         │                                           │
│                         ▼                                           │
│   RETURNS  ──▶  Transparent Distribution + Dashboard               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Core Feature Modules

### 🔍 Discover — Browse Live Campaigns

Explore four fully-realized startup campaigns from across India's Tier-2/3 cities:

| Startup | City | Sector | Status |
|---------|------|--------|--------|
| **SolarHaat** | Nashik, MH | Clean Energy | 🟢 69% Funded |
| **GrainLink** | Aurangabad, MH | AgriTech | 🟡 53% Funded |
| **CeramoHub** | Morbi, GJ | Manufacturing | 🟢 78% Funded |
| **FreshRoute** | Guntur, AP | FoodTech | 🔴 36% Funded |

Each campaign card expands into a **full detail modal** with:
- 📊 **Milestones tab** — live escrow release schedule with verification status
- 👥 **Investor tab** — anonymised investor list and participation stats
- ⚠️ **Risk Profile tab** — sector benchmarking and red flag summary
- Action buttons that pipe directly into the AI due diligence workflow

---

### 🤖 AI Due Diligence — The Centrepiece

EquiRise's most powerful feature: a live NLP scoring engine that evaluates any business plan in seconds.

```
INPUT: Business Plan Text / PDF
         │
         ▼
  ┌──────────────────────────────────────┐
  │         NLP Scoring Pipeline         │
  │                                      │
  │  Market Size    ████████░░  82/100   │
  │  Team Strength  ███████░░░  74/100   │
  │  Financials     ██████░░░░  68/100   │
  │  Traction       █████░░░░░  55/100   │
  │  Risk Profile   ███████░░░  71/100   │
  │                                      │
  │  Overall Score: 70 / 100             │
  │  Rating: MODERATE RISK               │
  └──────────────────────────────────────┘
         │
         ▼
OUTPUT: Plain-English Summary + Red Flags + Green Signals
```

**How to use it:**
1. Click **"Load sample plan"** to pre-fill GrainLink's business description
2. Hit **"Score this plan"** — the Claude API runs live NLP analysis
3. Or paste *any* business description and score it yourself
4. Get dimensioned scores, risk rating, AI summary, and signal badges instantly

---

### 📈 My Portfolio — Investor Dashboard

A real-time view of your investment activity:

- **Holdings table** with per-startup performance (amount, returns, milestone completion)
- **Unrealised returns** tracker with colour-coded P&L
- **SEBI Annual Investment Limit Tracker** — visualises how much of your ₹10L non-accredited cap you've used
- KYC verification status integrated into the portfolio header

---

### ⚖️ SEBI Compliance — Regulatory Backbone

Full regulatory checklist with live CLEARED / PENDING status for every compliance requirement:

| Requirement | Status |
|-------------|--------|
| KYC / PAN Verification | ✅ Cleared |
| Investment Limit Gate (₹10L/yr) | ✅ Cleared |
| Startup Disclosure Document Filed | ✅ Cleared |
| Escrow Account Setup | ✅ Cleared |
| GRO Appointment | ⏳ Pending |
| Annual Audit Report Filed | ⏳ Pending |
| Investor Grievance Portal Live | ✅ Cleared |
| Risk Disclosure Acknowledged | ✅ Cleared |

Built on SEBI's **CCPS (Compulsorily Convertible Preference Share)** framework with maximum ₹10 Lakh/year investment cap for non-accredited investors.

---

## 📁 Project Structure

```
equirise/
├── src/
│   ├── components/
│   │   ├── Discover.jsx
│   │   │   
│   │   ├── DueDiligence.jsx
│   │   │  
│   │   ├── Portfolio.jsx
│   │   │  
│   │   ├── Compliance.jsx
│   │   │  
│   │   └── Navbar.jsx
│   │       
│   ├── pages/
│   │   ├── DiscoverPage.jsx
│   │   ├── DueDiligencePage.jsx
│   │   ├── PortfolioPage.jsx
│   │   └── CompliancePage.jsx
│   ├── hooks/
│   │   ├── useClaudeAPI.js               # Claude API integration
│   │   ├── usePortfolio.js               # Portfolio state management
│   │   └── useKYCStatus.js              # KYC verification hook
│   ├── services/
│   │   ├── claude.js                     # Anthropic API client
│   │   ├── escrow.js                     # Razorpay escrow calls
│   │   └── kyc.js                        # DigiLocker KYC service
│   ├── data/
│   │   └── startups.js                  # Seed data for 4 startup campaigns
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── equirise-logo.svg
├── .env.example
├── index.html
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key (for the live AI due diligence feature)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/equirise.git
cd equirise

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
# .env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here

```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎯 Using the Platform

### As an Investor

1. **Browse campaigns** on the Discover tab — filter by sector, city, or risk level
2. **Click any campaign card** to open the detail modal
3. Switch between **Milestones**, **Investors**, and **Risk Profile** tabs
4. Hit **"Deep Due Diligence"** to auto-load the business plan into the AI scorer
5. Complete **KYC** (simulated in prototype) before investing
6. Track your holdings in **My Portfolio**

### As a Startup Founder *(prototype simulation)*

1. Navigate to the **AI Due Diligence** tab
2. Click **"Load sample plan"** or paste your own business description
3. Hit **"Score this plan"** to get your NLP-powered investability score
4. Review AI feedback on Market, Team, Financials, Traction, and Risk
5. Address red flags before submitting your campaign

---

## 🔌 Claude API Integration

The AI Due Diligence engine calls the **Anthropic Claude API** directly from the browser (prototype mode) or via a backend proxy (production):

```javascript
// src/services/claude.js
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: `Score this business plan across 5 dimensions (Market Size, Team, 
                Financials, Traction, Risk) on a 0-100 scale. Return JSON with 
                scores, an overall rating, a 3-sentence summary, red flags, and 
                green signals.\n\nBusiness Plan:\n${businessPlanText}`
    }]
  })
});
```

> ⚠️ **Production Note**: For production deployment, proxy Claude API calls through your backend to protect your API key. Never expose `VITE_ANTHROPIC_API_KEY` in a public deployment.

---

## 🗺️ Roadmap

- [x] Discover module with 4 campaign cards + detail modal
- [x] AI Due Diligence with live Claude API scoring
- [x] Investor portfolio dashboard + SEBI limit tracker
- [x] SEBI compliance checklist (Cleared / Pending)
- [ ] Real KYC flow via DigiLocker API
- [ ] Backend escrow management with Razorpay
- [ ] Founder campaign submission portal
- [ ] Email/SMS milestone notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, Marathi, Telugu, Gujarati)

---


```bash
# Fork → Clone → Branch → PR
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## ⚖️ Regulatory Disclaimer

EquiRise is a **prototype** built for educational and demonstration purposes. It is not a registered crowdfunding platform under SEBI regulations. Any real deployment would require:

- Registration under SEBI (Alternative Investment Funds) Regulations
- SEBI CCPS compliant documentation
- RBI payment aggregator license for escrow operations
- Full KYC/AML compliance via a licensed KYC Registration Agency (KRA)

---

