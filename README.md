<div align="center">

# 🗳️ BallotBuddy

### AI-Powered Election Education Assistant

*Empowering every Indian citizen to understand, participate in, and own their democratic right to vote.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

**[Live Demo](#) · [Problem Statement](#-problem-statement) · [Features](#-features) · [Setup](#-getting-started)**

</div>

---

## 🎯 Problem Statement

> *"Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way."*
> — **PromptWars: Election Process Education Challenge**

Millions of Indian citizens — especially first-time voters, students, and rural residents — struggle to understand how elections actually work. Official information is dense, scattered, and often inaccessible. **BallotBuddy bridges this gap** by combining Gemini AI with interactive education tools, making civic participation approachable for everyone.

---

## ✨ Features

### 🤖 AI Election Assistant (Core Feature)
The heart of BallotBuddy — a **Gemini 2.0 Flash powered** conversational assistant available on every page:
- **5 AI Personas** — choose your preferred teaching style:
  - 🤝 **Friendly Guide** — casual, emoji-rich explanations
  - 🎓 **Student Guide** — peer-to-peer, relatable language
  - 🛡️ **Election Officer** — formal, authoritative, cites rules
  - 📚 **Teacher** — patient, step-by-step breakdowns
  - ⚖️ **Legal Expert** — detailed legal info, cites the Representation of People Act
- **Voice Input** — speak your question using the Web Speech API
- **Voice Output** — AI responses read aloud automatically
- **Conversation History** — full multi-turn conversations with context retention
- **Floating widget** — accessible from all 8 pages, never more than a click away

### 🛣️ Interactive Election Journey
Step-by-step visual walkthrough of the complete Indian election process:
- **7 stages**: Registration → Verification → Nomination → Campaigning → Voting Day → Counting → Results
- Each stage includes: What happens, What to bring, What to expect, Do's and Don'ts
- Animated sidebar navigation with smooth transitions

### ✅ Voter Eligibility Checker
5-question branching questionnaire that determines your exact eligibility status:
- Smart branching logic (not all questions shown to everyone)
- 4 result types: **Eligible** / **Not Yet Eligible** / **Needs Registration** / **Needs ID**
- Personalised next-step guidance for each result

### 📅 Election Timeline
Interactive vertical timeline of the full election calendar:
- Filter by category: Registration | Nomination | Campaign | Voting | Results
- Color-coded stages with status indicators (past / current / upcoming)
- Expandable cards with detailed descriptions

### 🎯 Election Quiz
10-question knowledge quiz to test civic awareness:
- Difficulty levels: Easy / Medium / Hard
- Instant feedback with detailed explanations
- SVG score circle with performance review
- Full answer review at completion

### 🔍 Myth Buster
6 common election myths debunked with verified facts:
- Tap-to-reveal cards with satisfying flip animation
- Progress tracker + "Reveal All" toggle
- Sources every fact clearly

### 🗳️ Election Simulation
Walk through a real voting experience before you actually do it:
- 7-step mock election (Registration → Booth → EVM → VVPAT → Cast → Counted → Results)
- Interactive inputs at each step
- Tips and Do's/Don'ts per stage
- Completion summary

### 🗺️ Personalised Voting Roadmap
Fill in your profile (age, state, registration status, ID type) and get:
- A custom step-by-step voting action plan
- Estimated time to completion
- What to do next, based specifically on your situation

### 📊 Election Data Dashboard
4-panel interactive data visualisation:
- 📈 **Voter Turnout Trends** — Line chart across 15 election years
- 📊 **2024 Lok Sabha Results** — Bar chart by party, color-coded
- 🥧 **Voter Demographics** — Donut chart with animated breakdown
- 🔀 **Process Flowchart** — React Flow interactive node graph of the election process

---

## 🌐 Multilingual Support

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Full support |
| Hindi | `hi` | ✅ Full support |

Language switcher is available in the navigation bar on all pages.

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | Server + client components, API routes, file-based routing |
| **UI Runtime** | React 19 | Latest concurrent features |
| **Language** | TypeScript 5 (strict) | Type safety across the entire codebase |
| **Styling** | Tailwind CSS v4 + `oklch` colors | Modern color space, utility-first, dark mode |
| **Components** | Shadcn UI (base-nova style) | Accessible, composable, theme-aware |
| **Animations** | Framer Motion 12 | Scroll-triggered, micro-interactions, page transitions |
| **AI** | Google Gemini 2.0 Flash | Fast, accurate, cost-effective LLM via `@google/generative-ai` |
| **Charts** | Recharts 3 | Responsive SVG charts (Line, Bar, Pie) |
| **Flowchart** | React Flow 11 | Interactive node graph |
| **Icons** | Lucide React | Consistent, tree-shakeable icon set |
| **Fonts** | Geist Sans + Geist Mono | Premium, readable typography |
| **Voice** | Web Speech API | Native browser voice I/O, zero dependencies |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- npm
- A Google Gemini API key → [Get one free at Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/pranjal2410719/BallotBuddy.git
cd BallotBuddy/ballotbuddy

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Open .env.local and add your Gemini API key

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the `ballotbuddy/` directory:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Never commit your `.env.local` file.** It is excluded by `.gitignore`.

---

## 📁 Project Structure

```
ballotbuddy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, providers, global chat)
│   │   ├── page.tsx            # Homepage (hero, stats, features, dashboard)
│   │   ├── globals.css         # Tailwind v4 + design tokens
│   │   ├── api/chat/           # POST /api/chat — Gemini AI endpoint
│   │   ├── journey/            # Interactive Election Journey (7 steps)
│   │   ├── eligibility/        # Voter Eligibility Checker
│   │   ├── timeline/           # Election Timeline
│   │   ├── quiz/               # Election Knowledge Quiz
│   │   ├── myths/              # Myth Buster
│   │   ├── simulation/         # Election Simulation
│   │   └── roadmap/            # Personalised Voting Roadmap
│   ├── components/
│   │   ├── ui/                 # 14 Shadcn UI primitives
│   │   ├── chat-assistant.tsx  # AI chat widget (voice + personas)
│   │   ├── election-dashboard.tsx  # Charts + flowchart
│   │   ├── navbar.tsx          # Sticky nav (language + dark mode)
│   │   └── footer.tsx          # Footer
│   ├── lib/
│   │   ├── gemini.ts           # Gemini AI service (conversation history)
│   │   ├── election-data.ts    # All static election data
│   │   ├── i18n.ts             # English + Hindi translations
│   │   ├── language-context.tsx  # Language React Context
│   │   ├── theme-context.tsx   # Dark mode React Context
│   │   └── utils.ts            # cn() class utility
│   └── types/
│       └── speech.d.ts         # Web Speech API type declarations
├── public/                     # Static assets
├── .env.local.example          # Environment variable template
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🏗️ Architecture

```
Browser
  │
  ├── Next.js App Router (Client Components)
  │     ├── 8 Interactive Pages
  │     ├── Global AI Chat (all pages via layout.tsx)
  │     ├── Language Provider (EN / HI)
  │     └── Theme Provider (Light / Dark)
  │
  └── Next.js API Route (Server-side)
        └── POST /api/chat
              └── Google Gemini 2.0 Flash
                    └── Conversation History Support
                    └── 5 AI Personas
```

**Key Design Decisions:**
- **API key is server-side only** — Gemini is called from `/api/chat`, never exposed to the browser
- **All education data is static** — Zero database, instant loads, no external dependencies beyond Gemini
- **Stateless by design** — No auth, no user accounts, works anonymously for everyone
- **Progressive enhancement** — Voice features gracefully degrade if browser doesn't support Web Speech API

---

## 🎨 Design Principles

- **Oklch color space** — Perceptually uniform, vibrant colors across light and dark modes
- **Mobile-first** — Fully responsive from 320px upward
- **Animated** — Framer Motion scroll-triggered reveals, staggered card animations, page transitions
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation via Shadcn UI primitives
- **Dark mode** — System-preference detection + manual toggle, persisted to localStorage

---

## 🔑 Key Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npx tsc --noEmit   # TypeScript type check
```

---

## 🌟 Highlights for Judges

| What to Look At | Where |
|----------------|-------|
| AI assistant in action | Click the chat bubble (bottom-right, any page) |
| Voice input/output | Open chat → click mic icon → speak a question |
| Switch AI persona | Open chat → click person icon → choose a style |
| Election journey | Navigate to `/journey` |
| Interactive timeline | Navigate to `/timeline` |
| Data visualizations | Scroll down on homepage → Election Dashboard |
| Dark mode toggle | Click the moon/sun icon in the navbar |
| Hindi language | Click the globe icon in the navbar → हिंदी |
| Eligibility checker | Navigate to `/eligibility` |
| Quiz | Navigate to `/quiz` |

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ for democracy · PromptWars Hackathon 2026 🚀**

*BallotBuddy — Because every vote counts, and every voter deserves to understand why.*

</div>
