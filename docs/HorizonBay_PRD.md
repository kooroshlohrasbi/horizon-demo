# Horizon Bay — Product Requirements Document

**Version:** 1.0
**Date:** 27 February 2026
**Owner:** Koorosh (Predelo)
**Status:** Ready for build

---

## Reference Documents

| Document | Purpose |
|---|---|
| [`InnovationBay_Background_for_Agent.md`](./InnovationBay_Background_for_Agent.md) | **Primary brand + design reference.** Verified hex values, typography (Agrandir font), component patterns, copy tone, dummy data. Read this first. |
| [`Innovation_Bay_Horizon_Research.md`](./Innovation_Bay_Horizon_Research.md) | Community context, Horizon history, key people, geographic presence, investment model. Use for copy and dummy data decisions. |
| [`Innovation_Bay_Horizon_Research.docx`](./Innovation_Bay_Horizon_Research.docx) | Same content as above, formatted Word version. |

---

## 1. Product Summary

**Product name:** Horizon Bay
**Tagline:** "The operating system for ANZ's most connected angel network"

Horizon Bay is a lightweight, invite-only web application for the Horizon angel investor community (run by Innovation Bay). It consolidates deal flow, community coordination, and lightweight governance into a single, beautiful interface—built for high-net-worth investors who have no patience for clunky tools.

This is not a generic CRM. It is purpose-built for the specific dynamics of a curated, ≤25-member-per-city angel network where **relationship depth and signal quality matter more than volume**.

### Demo context

This app will be **live-built in front of Horizon investors** at an Innovation Bay session convened by Ian Gardiner. The demo goal is to show that a production-quality, deployable tool can be built for *them*, themed to *their* brand, in real time. Vercel deploy at the end of the build is the money moment.

---

## 2. Product Name & Branding

**App name:** Horizon Bay
**Logo treatment:** "HORIZON BAY" wordmark in Agrandir (regular/400 weight). Optionally paired with the Innovation Bay geometric mark.
**Colour palette:** Inherits Innovation Bay / Horizon design system exactly. See [`InnovationBay_Background_for_Agent.md §4`](./InnovationBay_Background_for_Agent.md).

```
Primary accent:   #FF9D6E   (Horizon orange/salmon — all CTAs, badges, highlights)
IB Gold:          #F5C549   (decorative accents, hover states)
Black:            #000000   (nav, primary buttons, headings)
Body text:        #313131
White:            #FFFFFF   (card backgrounds, main bg)
Light section bg: #EDEDEC   (alternating sections)
Border:           #E5E5E5
Destructive/Pass: #EF4444   (red — "Pass" action only)
Watching:         #F59E0B   (amber — "Watching" action)
Interested:       #22C55E   (green — "Interested" action)
```

---

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Fastest path to Vercel deploy; React Server Components for speed |
| Styling | **Tailwind CSS v3** | Utility-first; Horizon colour tokens added to `tailwind.config.js` |
| Components | **shadcn/ui** | Radix-based; unstyled primitives reskinned to Horizon brand |
| Icons | **Lucide React** | Consistent, clean line icons |
| Font | **Inter** via Google Fonts | Closest free match to Agrandir; `font-display: swap` |
| Data | **In-memory JSON** (`/lib/data.ts`) | No backend for demo; all state in React + local context |
| Auth (demo) | **Mock auth** | Role switcher (Admin / Investor / Founder) in UI; no real auth |
| Deploy | **Vercel** | One-click from GitHub; show live URL + QR code at end of demo |
| State | **React Context + useState** | No Redux/Zustand needed at demo scale |

### File structure

```
horizon-bay/
├── app/
│   ├── layout.tsx              # Root layout: nav + sidebar + font
│   ├── page.tsx                # Dashboard (redirect to /deals)
│   ├── deals/
│   │   ├── page.tsx            # Deal board
│   │   └── [id]/page.tsx       # Deal detail + Q&A + interest actions
│   ├── events/
│   │   └── page.tsx            # Event calendar + RSVP
│   ├── members/
│   │   └── page.tsx            # Member directory
│   ├── portfolio/
│   │   └── page.tsx            # Portfolio view + heatmap
│   └── admin/
│       └── page.tsx            # Admin console
├── components/
│   ├── ui/                     # shadcn primitives (button, card, badge, dialog, etc.)
│   ├── DealCard.tsx
│   ├── InterestActions.tsx
│   ├── StatusBadge.tsx
│   ├── MemberCard.tsx
│   ├── EventCard.tsx
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   ├── RoleSwitcher.tsx        # Demo: switch between Admin/Investor/Founder
│   └── QRCodeModal.tsx         # Wow feature: show deploy URL as QR
├── lib/
│   ├── data.ts                 # All dummy data (deals, members, events)
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # cn() helper + formatters
├── tailwind.config.js
└── vercel.json
```

### Tailwind config (colour tokens)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        horizon: {
          orange:  '#FF9D6E',
          gold:    '#F5C549',
          dark:    '#313131',
          light:   '#EDEDEC',
          border:  '#E5E5E5',
        },
        interest: {
          in:      '#22C55E',
          watch:   '#F59E0B',
          pass:    '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      }
    }
  }
}
```

---

## 4. Design System

> Full details in [`InnovationBay_Background_for_Agent.md §4`](./InnovationBay_Background_for_Agent.md). Summary below.

### Typography

- **Font:** Inter (Agrandir fallback strategy — Inter is the free equivalent)
- **Headings:** `font-weight: 400` — deliberately regular weight, not bold. This is the brand's editorial elegance.
- **All-caps labels:** `text-xs tracking-widest font-semibold uppercase text-horizon-dark/60`
- **Body:** `text-sm text-horizon-dark leading-relaxed`

### Component patterns

#### Horizon badge / pill

```tsx
<span className="bg-horizon-orange text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-pill">
  HORIZON
</span>
```

#### Primary button (black pill)

```tsx
<Button className="bg-black text-white rounded-pill px-6 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-horizon-dark">
  Apply Now
</Button>
```

#### Deal card

```tsx
<Card className="border border-horizon-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
  {/* Sky photography hero (use Unsplash sky URLs for demo) */}
  <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${deal.heroImage})` }} />
  <CardContent className="p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-horizon-dark/50 mb-1">{deal.sector}</p>
        <h3 className="text-lg font-normal">{deal.name}</h3>
        <p className="text-sm text-horizon-dark/70 mt-1">{deal.oneLiner}</p>
      </div>
      {/* Orange triangle accent (brand element) */}
      <div className="w-0 h-0 border-l-[16px] border-l-transparent border-b-[16px] border-b-horizon-orange" />
    </div>
    <InterestActions dealId={deal.id} />
  </CardContent>
</Card>
```

#### Status badge

```tsx
const statusColours = {
  'New':              'bg-blue-100 text-blue-700',
  'Screening':        'bg-yellow-100 text-yellow-700',
  'Intro Requested':  'bg-purple-100 text-purple-700',
  'Diligence':        'bg-orange-100 text-orange-700',
  'Passed':           'bg-gray-100 text-gray-500',
  'Investing':        'bg-green-100 text-green-700',
}
```

#### Interest action row

```tsx
<div className="flex gap-2 mt-3">
  <button onClick={() => signal('interested')}
    className={`flex items-center gap-1 px-3 py-1 rounded-pill text-xs font-semibold border transition-colors
      ${state === 'interested' ? 'bg-interest-in text-white border-interest-in' : 'border-horizon-border text-horizon-dark hover:border-interest-in hover:text-interest-in'}`}>
    👍 Interested {counts.interested > 0 && <span className="ml-1 opacity-70">{counts.interested}</span>}
  </button>
  <button onClick={() => signal('watching')} /* amber variant */ >
    👀 Watching
  </button>
  <button onClick={() => signal('pass')} /* red variant */ >
    ❌ Pass
  </button>
</div>
```

### Navigation / sidebar

- Left sidebar on desktop (240px wide), collapsible on mobile
- Nav items: Dashboard, Deal Flow, Events, Members, Portfolio, Admin
- Sticky top bar: "HORIZON BAY" wordmark + role switcher + notification bell

---

## 5. Feature Set & Priorities

### Priority tiers

- **P0 — Must have for demo** (build live, ~20–30 min)
- **P1 — Ship in v1** (full feature; not needed for live demo)
- **P2 — Roadmap** (placeholder in UI is fine)

---

### Feature 1: Onboarding & Membership

| Feature | Priority | Notes |
|---|---|---|
| Invite-only magic link flow | P1 | Mock in demo: pre-load 3 member profiles |
| Investor profile (thesis, cheque size, sectors, geo) | P0 | Show on member cards and deal matching |
| "What I look for / don't" field | P1 | Visible to founders on their deal page |
| Availability toggle: "Open to new deals this month" | P0 | Toggle on member card; affects deal routing badge |
| Compliance disclaimer on deal access | P1 | One-time modal per user; store in localStorage |

**Demo behaviour:** Role switcher (top-right dropdown) allows switching between Admin, Investor, Founder — each sees different UI without real auth.

---

### Feature 2: Deal Flow Intake & Scoring

| Feature | Priority | Notes |
|---|---|---|
| Startup intake form | P0 | Admin creates deal; form → deal card |
| Auto deal card (name, one-liner, sector, ask, stage, deck link) | P0 | Core screen |
| Tags + thesis matching (rule-based) | P0 | `deal.sectors` matched against `investor.sectorInterests` |
| Quick scorecard (team/market/traction/risks) | P1 | 1–5 stars per dimension, notes |
| Stage workflow column board | P0 | Kanban: New → Screening → Intro Requested → Diligence → Passed → Investing |

**Dummy deals (from background doc):**

```ts
const DEALS = [
  { id: '1', name: 'Luma Health', sector: 'HealthTech', stage: 'Pre-seed', ask: '$500K',
    oneLiner: 'AI-powered triage for rural GPs', status: 'Screening',
    heroImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800' },
  { id: '2', name: 'Fieldstack', sector: 'AgTech', stage: 'Seed', ask: '$1.2M',
    oneLiner: 'IoT soil monitoring for broadacre farms', status: 'Diligence',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  { id: '3', name: 'Voxa AI', sector: 'B2B SaaS', stage: 'Seed', ask: '$800K',
    oneLiner: 'Voice analytics for call centre compliance', status: 'Intro Requested',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800' },
  { id: '4', name: 'CarbonLedger', sector: 'ClimaTech', stage: 'Pre-seed', ask: '$400K',
    oneLiner: 'Real-time Scope 3 carbon tracking', status: 'New',
    heroImage: 'https://images.unsplash.com/photo-1467375407633-8cbda0b05f8a?w=800' },
  { id: '5', name: 'Skipper', sector: 'Logistics', stage: 'Seed', ask: '$1M',
    oneLiner: 'Last-mile routing for regional Australia', status: 'Investing',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
]
```

---

### Feature 3: Investor Engagement Mechanics

| Feature | Priority | Notes |
|---|---|---|
| Interest signals: 👍 Interested / 👀 Watching / ❌ Pass | P0 | Toggle buttons on deal card + count display |
| Micro-commitments: "I'll take a call / review deck / intro customer" | P1 | Checkbox row under interest signal |
| Follow per startup (updates feed) | P1 | Bell icon on deal card |
| Weekly digest email (dummy) | P2 | Placeholder: "Digest sent to 23 members" in admin |

---

### Feature 4: Syndicate & Round Participation

| Feature | Priority | Notes |
|---|---|---|
| Soft-circle: "I might do $X–$Y" (non-binding) | P0 | Input on deal detail; show running total |
| Commit tracker (dummy) | P1 | Table: investor, amount, status, docs |
| Lead / SPV placeholder | P1 | Dropdown field on deal |
| Portfolio view | P0 | Simple list: "You invested in X, Y, Z" with date + amount |

**Demo soft-circle UX:** Click "Soft Circle" → slider input ($25K–$100K increments) → "Commit (non-binding)" → running total updates live. This is the most impressive 30-second interaction.

---

### Feature 5: Community Events

| Feature | Priority | Notes |
|---|---|---|
| Event calendar (card list) | P0 | Date, sector focus, location, 3 featured founders |
| RSVP + waitlist | P0 | RSVP button → confirmation toast → attendee count updates |
| Attendee list | P1 | Collapsed by default; "Who should I meet" is P2 |
| Post-event recap | P2 | Simple markdown notes field |

**Dummy events:**

```ts
const EVENTS = [
  { id: 'e1', title: 'HealthTech Deep Dive', date: '18 Mar 2026', location: 'Sydney',
    sector: 'HealthTech', capacity: 25, rsvpCount: 18,
    founders: ['Luma Health', 'MedLoop', 'CareAI'],
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' },
  { id: 'e2', title: 'Climate & Cleantech', date: '22 May 2026', location: 'Melbourne',
    sector: 'ClimaTech', capacity: 25, rsvpCount: 11,
    founders: ['CarbonLedger', 'SolarStack', 'GreenGrid'],
    heroImage: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800' },
  { id: 'e3', title: 'AI & Automation', date: '17 Jul 2026', location: 'Sydney',
    sector: 'AI/ML', capacity: 25, rsvpCount: 6,
    founders: ['Voxa AI', 'FlowBot', 'SignalAI'],
    heroImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800' },
]
```

---

### Feature 6: Moderated Q&A

| Feature | Priority | Notes |
|---|---|---|
| Q&A thread per deal | P0 | Simple list; post question + upvote; shown on deal detail page |
| Anonymous questions option | P1 | Checkbox "Post anonymously" on submit |
| Upvote / sort by votes | P0 | Upvote button + count; sort by votes default |
| Moderator: pin, hide, merge | P1 | Admin-only action row per question |

---

### Feature 7: Introductions & Relationship Graph

| Feature | Priority | Notes |
|---|---|---|
| Intro request (founder → investor) | P1 | Button on deal detail: "Request intro to [investor]" |
| Investor offer to intro | P1 | "I can intro X" button on member card |
| Warmth levels (strong/medium/weak) | P2 | Visual indicator only; dummy data |
| Outcome tracking | P2 | Status: intro made → meeting held → outcome |

---

### Feature 8: Trust & Governance

| Feature | Priority | Notes |
|---|---|---|
| Role-based permissions (Admin / Investor / Founder) | P0 | Role switcher in demo; founders see only their deal |
| Audit trail (who changed what) | P1 | Timestamped log on deal detail; "Marcus updated status to Diligence" |
| Room privacy (Horizon-only vs broader) | P2 | Tag on deal card |
| Data retention toggle | P2 | Settings page placeholder |

---

### Feature 9: Admin Console

| Feature | Priority | Notes |
|---|---|---|
| Member management (invite, role, engagement score) | P0 | Table: name, role, last active, engagement score badge |
| Deal moderation (approve intake, request info, archive) | P0 | Bulk actions on deal list |
| Engagement analytics (response time, interest rate, top theses) | P1 | 3 metric cards + simple bar chart (Recharts or CSS bars) |
| Content composer / weekly digest | P1 | Rich text → "Send to all members" button |

---

### Feature 10: "Wow" Demo Features

| Feature | Priority | Notes |
|---|---|---|
| **QR join + live room board** | P0 | QR code modal showing the Vercel deploy URL — close the loop |
| **One-click "Generate IC Memo"** (fake AI) | P0 | Button on deal detail → animated "Generating..." → shows pre-written memo. Highest wow/effort ratio. |
| **Smart matching: "Top 10 investors for this deal"** | P0 | Rule-based: `deal.sectors` ∩ `investor.sectorInterests`, sorted by availability + cheque size overlap |
| **Portfolio heatmap** | P1 | Sectors × stage grid; dummy data; CSS grid coloured by deal count |
| **Vercel deploy button in-app** | P0 | Button linking to Vercel deploy flow for the repo |

---

## 6. Demo Build Sequence (Live ~20–30 min)

Execute in this order for maximum audience impact:

```
Step 1  (3 min)  Scaffold: npx create-next-app horizon-bay + tailwind + shadcn init
Step 2  (5 min)  Deal board: cards + status badges + Horizon brand colours
Step 3  (4 min)  Interest actions: Interested / Watch / Pass + live counts
Step 4  (4 min)  Event page: RSVP button + attendee count update
Step 5  (3 min)  Admin: create deal form + invite member mock
Step 6  (3 min)  IC Memo button: animated → shows pre-written memo
Step 7  (3 min)  Vercel deploy: push to GitHub → paste URL → show QR code
                 → audience scans QR → they're live on their phones
```

**Each step is independently impressive.** If you run out of time, stop after step 5 — it still fully lands.

---

## 7. Data Models (TypeScript)

```ts
// lib/types.ts

export type DealStatus = 'New' | 'Screening' | 'Intro Requested' | 'Diligence' | 'Passed' | 'Investing'
export type InterestSignal = 'interested' | 'watching' | 'pass' | null
export type Role = 'admin' | 'investor' | 'founder'

export interface Deal {
  id: string
  name: string
  sector: string
  stage: 'Pre-seed' | 'Seed' | 'Series A'
  ask: string
  oneLiner: string
  description: string
  status: DealStatus
  heroImage: string
  deckUrl?: string
  founderName: string
  founderEmail: string
  traction?: string
  createdAt: string
  tags: string[]
  interests: { investorId: string; signal: InterestSignal }[]
  softCircles: { investorId: string; amount: number }[]
  questions: Question[]
}

export interface Question {
  id: string
  dealId: string
  text: string
  authorId: string | 'anon'
  upvotes: number
  pinned: boolean
  createdAt: string
}

export interface Member {
  id: string
  name: string
  role: Role
  background: string        // e.g. "Ex-Canva, Melbourne"
  thesisTags: string[]      // e.g. ['HealthTech', 'B2B SaaS']
  chequeMin: number         // AUD
  chequeMax: number
  geo: string
  availableThisMonth: boolean
  avatar: string            // Unsplash portrait URL (will be grayscaled via CSS filter)
  engagementScore: number   // 0–100
}

export interface Event {
  id: string
  title: string
  date: string
  location: string
  sector: string
  capacity: number
  rsvpCount: number
  founders: string[]
  heroImage: string
  rsvpd: string[]           // member IDs
}

export interface PortfolioEntry {
  memberId: string
  dealId: string
  amount: number
  date: string
  status: 'active' | 'exited' | 'written-off'
}
```

---

## 8. Dummy Member Data

```ts
// lib/data.ts (members)
export const MEMBERS: Member[] = [
  {
    id: 'm1', name: 'Yash Varma', role: 'investor',
    background: 'Empress Capital, Sydney',
    thesisTags: ['FinTech', 'B2B SaaS'], chequeMin: 25000, chequeMax: 100000,
    geo: 'Sydney', availableThisMonth: true, engagementScore: 92,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  },
  {
    id: 'm2', name: 'Sarah Chen', role: 'investor',
    background: 'Ex-Canva, Melbourne',
    thesisTags: ['B2B SaaS', 'AI/ML', 'DesignTech'], chequeMin: 50000, chequeMax: 200000,
    geo: 'Melbourne', availableThisMonth: true, engagementScore: 87,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  },
  {
    id: 'm3', name: 'Marcus Webb', role: 'investor',
    background: 'Ex-Afterpay CFO, Sydney',
    thesisTags: ['FinTech', 'ClimaTech'], chequeMin: 100000, chequeMax: 500000,
    geo: 'Sydney', availableThisMonth: false, engagementScore: 74,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  },
  {
    id: 'm4', name: 'Priya Nair', role: 'investor',
    background: 'Healthcare operator, Brisbane',
    thesisTags: ['HealthTech', 'MedTech'], chequeMin: 25000, chequeMax: 75000,
    geo: 'Brisbane', availableThisMonth: true, engagementScore: 81,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200',
  },
  {
    id: 'm5', name: 'James Thornton', role: 'investor',
    background: 'Family office, Melbourne',
    thesisTags: ['AgTech', 'Logistics', 'ClimaTech'], chequeMin: 50000, chequeMax: 250000,
    geo: 'Melbourne', availableThisMonth: true, engagementScore: 68,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  },
]
```

---

## 9. IC Memo Template (pre-written for "AI" wow feature)

When investor clicks **"Generate IC Memo"** on any deal, show a 2-second spinner then render this template (filled with the deal's dummy data):

```
INVESTMENT COMMITTEE MEMO
Generated by Horizon Bay AI  •  {date}

COMPANY:      {deal.name}
SECTOR:       {deal.sector}
STAGE:        {deal.stage}
ASK:          {deal.ask}

ONE-LINE THESIS:
{deal.oneLiner}

WHY NOW:
{deal.sector} is experiencing tailwinds from [sector-specific macro]. The team is early,
but the timing and market structure are compelling.

TEAM SIGNAL:
Founding team shows strong domain expertise. Early customer conversations
indicate product-market fit validation in progress.

TRACTION:
{deal.traction || 'Pre-revenue; 3 LOIs signed. Pilot underway with anchor customer.'}

KEY RISKS:
1. Market education required — category is nascent
2. Regulatory pathway unclear in some states
3. Team needs a strong commercial hire post-raise

HORIZON MEMBER MATCH:
Top 3 matched investors: {topMatchedMembers}
Total soft-circled: ${totalSoftCircled}

RECOMMENDATION: Move to Intro stage. Request full deck + founder call.

─────────────────────────────────────
Generated by Horizon Bay  •  Powered by Predelo
```

---

## 10. Vercel Deployment

### `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Deploy steps (in demo)

1. `git init && git add . && git commit -m "Horizon Bay v1"`
2. `vercel --prod` (or GitHub push + Vercel auto-deploy)
3. Copy live URL → generate QR code (use `qrcode.react` component already in-app)
4. Show QR on screen → audience scans → they're on the live app

### Environment variables (none needed for demo)

All data is in-memory. If extending to real auth, add:

```
NEXTAUTH_SECRET=
DATABASE_URL=
```

---

## 11. Accessibility & Performance

- All interactive elements have `aria-label`
- Colour contrast: all text on `#FF9D6E` orange background uses white (`#FFFFFF`) — contrast ratio 3.2:1 (meets AA for large text/UI components)
- Body text `#313131` on white: contrast ratio 12:1 — passes AAA
- `next/image` for all hero images (automatic optimisation + lazy load)
- No external API calls at runtime — all dummy data is local

---

## 12. Out of Scope (v1 / Demo)

These are **explicitly excluded** from the demo build. Acknowledge as "roadmap" if asked:

- Real authentication (OAuth, magic links, email)
- Database persistence (Postgres, Supabase)
- Real document uploads (deck PDFs)
- Email notifications (digest, RSVP confirmation)
- Actual AI/LLM integration (the IC memo is pre-written)
- Legal/compliance layer (actual disclaimers, KYC)
- Mobile native app
- Multi-tenancy (multiple angel networks)

---

## 13. Success Criteria for the Demo

| Criterion | How to verify |
|---|---|
| App loads in < 2 seconds | Vercel edge deployment |
| All 5 core screens are navigable | Manual walkthrough |
| Interest actions update live (no page reload) | Click Interested → count increments instantly |
| RSVP updates attendee count | Click RSVP → number changes |
| IC Memo generates in < 3 seconds | Spinner → memo render |
| Vercel URL is live and scannable | Audience scans QR and sees the app |
| Matches Horizon brand (orange, clean, sky imagery) | Visual check against screenshots in `InnovationBay_Background_for_Agent.md` |

---

*PRD compiled 27 February 2026. Build with reference to `InnovationBay_Background_for_Agent.md` open at all times.*
