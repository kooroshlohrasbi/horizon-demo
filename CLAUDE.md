# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Updated: 2026-02-27 11:53 AEDT

## Project Overview

**Horizon Bay** — an invite-only web app for the Horizon angel investor community (run by Innovation Bay). Consolidates deal flow, community coordination, and lightweight governance for a curated ≤25-member-per-city angel network. This is a **demo app** to be live-built in front of Horizon investors, with a Vercel deploy as the finale.

All data is **in-memory JSON** — no backend, no database, no real auth.

## Tech Stack

- **Next.js 14** (App Router, React Server Components where possible, `"use client"` for interactive pages)
- **Tailwind CSS v3** with custom Horizon colour tokens
- **shadcn/ui** (Radix-based primitives reskinned to Horizon brand)
- **Lucide React** icons
- **Inter** font (Google Fonts via `next/font/google`)
- **React Context + useState** for state management
- **framer-motion** for page transitions and micro-interactions
- **qrcode.react** for QR code generation
- **Playwright** for E2E testing
- **Vercel** deployment

## Common Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test:e2e     # Run Playwright tests
npx playwright test --ui  # Playwright UI mode
npx shadcn-ui@latest add <component>  # Add shadcn component
vercel --prod        # Deploy to Vercel
```

## Architecture

```
app/
  layout.tsx          # Root layout: Inter font, AppProvider, Sidebar + Navbar shell
  page.tsx            # Dashboard — redirects to /deals
  deals/
    page.tsx          # Deal board — grid of DealCards + status filter tabs
    [id]/page.tsx     # Deal detail — full page with Q&A, interest, soft circle
  events/
    page.tsx          # Event list with RSVP actions
  members/
    page.tsx          # Member directory grid (grayscale portraits)
  portfolio/
    page.tsx          # Portfolio table + sector heatmap
  admin/
    page.tsx          # Admin console — member mgmt + deal moderation tabs
  globals.css         # Tailwind directives + custom CSS (triangle accent, animations)

components/
  layout/
    Sidebar.tsx       # Retractable left sidebar — collapsible to icon-only mode
    Navbar.tsx        # Top bar: breadcrumb + search + RoleSwitcher + QR button
    AppShell.tsx      # Combines Sidebar + Navbar + main content area
  ui/                 # shadcn primitives (installed via CLI)
  DealCard.tsx        # Deal card — hero image, sector badge, orange triangle, interest row
  DealDetailPanel.tsx # Sheet side panel for quick deal view from board
  InterestActions.tsx # Interested / Watching / Pass toggle buttons with counts
  StatusBadge.tsx     # Colour-coded deal stage pill
  MemberCard.tsx      # Member card — grayscale portrait, background, thesis tags
  EventCard.tsx       # Event card — date, sector, RSVP button, attendee count
  RoleSwitcher.tsx    # Dropdown: Admin / Investor / Founder (top-right of Navbar)
  QRCodeModal.tsx     # Dialog with QR code of deploy URL
  ICMemoGenerator.tsx # "Generate IC Memo" button with fake AI spinner + template
  SoftCircleSlider.tsx # Slider $25K–$100K, shows running commitment total
  SmartMatching.tsx   # Top matched investors panel for a deal
  SectorHeatmap.tsx   # Portfolio sector × member heatmap grid
  PageTransition.tsx  # framer-motion wrapper for route transitions

lib/
  data.ts             # All dummy data: DEALS, MEMBERS, EVENTS, PORTFOLIO
  types.ts            # TypeScript interfaces
  utils.ts            # cn() helper + formatCurrency + formatDate
  context.tsx         # AppContext: role, sidebar state, deal interests, RSVPs, soft circles

e2e/
  deals.spec.ts       # Deal board loads, cards render, filter works, detail opens
  events.spec.ts      # Events render, RSVP toggles, count updates
  members.spec.ts     # Member grid renders, role filter works
  admin.spec.ts       # Admin panel loads, tabs switch
  navigation.spec.ts  # Sidebar nav works, collapses, role switcher toggles views
  smoke.spec.ts       # All pages load without errors
```

## Definitive Layout & UX Decisions

### App Shell: Sidebar + Top Nav + Content

```
┌──────────────────────────────────────────────────────┐
│  NAVBAR  [breadcrumb]            [search] [role] [QR]│
├────────┬─────────────────────────────────────────────┤
│        │                                             │
│  SIDE  │           MAIN CONTENT AREA                 │
│  BAR   │                                             │
│        │    (pages render here with transitions)     │
│  icon  │                                             │
│  +     │                                             │
│  label │                                             │
│        │                                             │
│  [<<]  │                                             │
├────────┴─────────────────────────────────────────────┤
```

- **Sidebar**: 240px expanded, 64px collapsed (icon-only). Toggle via chevron button at bottom.
- **Navbar**: 64px height, sticky top, white bg, bottom border `border-horizon-border`.
- **Content**: `max-w-7xl mx-auto px-6 py-8` padding. Scroll is on main content only.
- **Side Panels**: shadcn `Sheet` component sliding from the right for deal quick-view, member detail, IC memo output.

### Sidebar Navigation Items

| Icon | Label | Route | Roles |
|------|-------|-------|-------|
| `LayoutDashboard` | Deal Flow | `/deals` | all |
| `Calendar` | Events | `/events` | all |
| `Users` | Members | `/members` | admin, investor |
| `PieChart` | Portfolio | `/portfolio` | admin, investor |
| `Shield` | Admin | `/admin` | admin only |

- Active state: `bg-horizon-orange/10 text-horizon-orange` with left border accent
- Hover: `bg-horizon-light`
- Collapsed mode: tooltips on hover showing label

### Retractable Sidebar Implementation

```tsx
// Sidebar uses AppContext for collapsed state
// localStorage persists preference
// Transition: width 200ms ease
// Collapsed: icons centered, labels hidden, tooltips appear
// Expanded: icon + label, smooth slide
// Toggle button: ChevronLeft/ChevronRight at sidebar bottom
```

### Sheet Side Panels (Key UX Pattern)

Use shadcn `Sheet` (side="right", className="w-[520px] sm:w-[620px]") for:
1. **Deal Quick View** — click deal card on board → Sheet slides in with deal summary, interest actions, Q&A preview, "View Full Detail" link
2. **IC Memo Output** — after generation, memo appears in Sheet with copy button
3. **Smart Matching Results** — matched investors list in Sheet
4. **Member Quick Profile** — click member card → Sheet with full profile

Sheet has: `SheetHeader` (title + close), `SheetContent` (scrollable body), `SheetFooter` (action buttons).

## shadcn/ui Components — Exact Install List

```bash
npx shadcn-ui@latest init
# Then install these components:
npx shadcn-ui@latest add button badge card dialog sheet tabs avatar \
  dropdown-menu separator scroll-area slider tooltip progress \
  input textarea label select switch table
```

### Component Reskinning (in globals.css or tailwind config)

- All `Button` default: `rounded-full` (pill shape)
- `Badge`: horizon-orange bg by default, small text, rounded-full
- `Card`: `border-horizon-border`, subtle `shadow-sm hover:shadow-md transition-shadow`
- `Sheet`: smooth slide animation, overlay with `bg-black/40`
- `Tabs`: underline style (not box), horizon-orange active indicator
- `Dialog`: rounded-2xl, clean white, max-w-md centered

## Page-by-Page Specifications

### 1. Deal Flow `/deals` (P0 — Build First)

**Layout**: Filter tabs at top + 3-column card grid below
**Filter tabs**: shadcn `Tabs` — "All Deals" | "New" | "Screening" | "Diligence" | "Investing"
**Cards**: `DealCard.tsx` in responsive grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**DealCard anatomy**:
```
┌─────────────────────────┐
│  [hero image 16:9]      │
│                     ▲   │  ← orange triangle top-right of text area
├─────────────────────────┤
│  HEALTHTECH             │  ← sector badge (horizon-orange pill)
│  Luma Health            │  ← title: text-lg font-normal
│  AI-powered triage...   │  ← one-liner: text-sm text-horizon-dark/70
│                         │
│  Pre-seed  •  $500K     │  ← stage + ask
│  ────────────────────── │
│  [👍 3] [👀 2] [❌ 1]   │  ← InterestActions row
└─────────────────────────┘
```

**Card click** → opens `Sheet` side panel with deal quick view OR navigates to `/deals/[id]`
**Founder role**: sees only their own deal(s), with an edit-like view

### 2. Deal Detail `/deals/[id]` (P0)

**Layout**: Two-column on desktop (content left, sidebar right)

Left column (60%):
- Hero image (rounded-xl, full width)
- Deal name + sector badge + status badge
- One-liner description
- Full description
- Traction section
- Q&A thread (list of questions, upvote button, pinned badge)
- "Ask a Question" input at bottom

Right column (40%):
- **Interest Actions** card (Interested / Watching / Pass)
- **Soft Circle** card (slider + running total + "Commit" button)
- **Smart Matching** card ("Top Matched Investors" — list of 5 matched members)
- **Generate IC Memo** button (opens Sheet with generated memo)
- **Deal Info** card (stage, ask, founder name, founder email, created date)

### 3. Events `/events` (P0)

**Layout**: Vertical list of `EventCard` components, upcoming first
**EventCard anatomy**:
```
┌─────────────────────────────────────────────┐
│  [hero image left 200px]  │  SECTOR TAG     │
│                           │  Event Title    │
│                           │  📍 Location    │
│                           │  📅 Date        │
│                           │  👥 12/30 spots │
│                           │  [RSVP BUTTON]  │
└─────────────────────────────────────────────┘
```
- RSVP button toggles: "RSVP" (black pill) ↔ "Cancel RSVP" (outlined pill)
- Attendee count updates live on click
- Capacity bar: `Progress` component under spots

### 4. Members `/members` (P0)

**Layout**: Grid of `MemberCard` `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
**MemberCard**:
```
┌─────────────────────────┐
│  [grayscale avatar]     │  ← circular, 80px, filter: grayscale(100%)
│  Sarah Chen             │  ← name
│  Ex-Canva, Melbourne    │  ← background
│  ────────────────────── │
│  B2B SaaS  AI/ML        │  ← thesis tags (small badges)
│  $50K – $200K           │  ← cheque range
│  🟢 Available           │  ← availability dot
└─────────────────────────┘
```
- Card click → Sheet with full member profile
- Admin role: sees engagement score + can toggle member status

### 5. Portfolio `/portfolio` (P0/P1)

**Layout**: Tab group — "My Investments" table + "Sector Heatmap" visualization

**Table tab**: shadcn `Table` with columns: Company | Sector | Amount | Date | Status
- Status badges colour-coded: active=green, exited=gold, written-off=red

**Heatmap tab**: Grid of sectors × members, cell colour intensity = investment amount
- Use CSS grid with `bg-horizon-orange` at varying opacities

### 6. Admin `/admin` (P0)

**Layout**: shadcn `Tabs` — "Members" | "Deals" | "Analytics"

**Members tab**: Table of all members with role badges, engagement scores, availability toggles
**Deals tab**: All deals with status dropdowns (can change deal stage), delete action
**Analytics tab**: Simple stat cards (total deals, active members, total committed, avg engagement)

Admin-only: visible only when role === 'admin'

## State Management: AppContext

```tsx
// lib/context.tsx
interface AppState {
  role: Role                           // 'admin' | 'investor' | 'founder'
  currentUserId: string                // ID of active user (changes with role)
  sidebarCollapsed: boolean
  deals: Deal[]                        // mutable — interests, soft circles update
  members: Member[]
  events: Event[]
  portfolio: PortfolioEntry[]
}

// Actions via dispatch or direct setState:
// - setRole(role)
// - toggleSidebar()
// - setInterest(dealId, investorId, signal)
// - addSoftCircle(dealId, investorId, amount)
// - toggleRSVP(eventId, memberId)
// - addQuestion(dealId, question)
// - upvoteQuestion(dealId, questionId)
// - updateDealStatus(dealId, newStatus)  // admin only
```

## Animation & Transitions

Using **framer-motion** (install: `npm i framer-motion`):

- **Page transitions**: fade + slight upward slide (duration: 0.2s)
- **Card hover**: `scale(1.02)` + shadow elevation, 150ms ease
- **Sheet open/close**: built-in shadcn slide animation (keep default)
- **Interest button toggle**: scale bounce (0.95 → 1.05 → 1.0), 200ms
- **RSVP toggle**: confetti-like micro-burst on RSVP (optional — tiny green dots)
- **IC Memo generation**: pulsing skeleton loader for 2s, then content fades in
- **Sidebar collapse**: width transition 200ms ease, icons crossfade

Keep ALL animations **subtle and fast**. This is a premium, calm brand — no flashy or bouncy animations.

## Playwright E2E Test Strategy

```typescript
// playwright.config.ts
// baseURL: http://localhost:3000
// browsers: chromium only (for speed)
// retries: 0 for dev, 2 for CI

// Test structure:
// e2e/smoke.spec.ts — every page loads, no console errors
// e2e/deals.spec.ts — card renders, filter tabs work, detail page loads, interest toggles
// e2e/events.spec.ts — events render, RSVP toggles count
// e2e/members.spec.ts — member cards render, sheet opens on click
// e2e/navigation.spec.ts — sidebar nav works, collapse toggle, role switcher changes views
// e2e/admin.spec.ts — admin tab content loads, deal status change works
```

Key assertions per page:
- **Smoke**: `page.goto('/')` → redirects to `/deals`, no JS errors
- **Deals**: expect 5 deal cards visible, filter "New" shows subset, click card opens detail
- **Deal Detail**: interest buttons clickable, soft circle slider moves, Q&A input works
- **Events**: 3 event cards, RSVP button changes text, count increments
- **Members**: 5 member cards, grayscale images present
- **Role Switcher**: switch to "Founder" → sidebar hides Members/Portfolio/Admin, deal board shows 1 deal
- **Admin**: only visible when role=admin, tabs switch content

## Brand & Design System

Reference docs in `docs/` — read `InnovationBay_Background_for_Agent.md` first for verified design specs.

### Colour tokens (defined in `tailwind.config.ts`)

| Token | Hex | Usage |
|---|---|---|
| `horizon-orange` | `#FF9D6E` | Primary accent — CTAs, badges, highlights |
| `horizon-gold` | `#F5C549` | Decorative accents, hover states |
| `horizon-dark` | `#313131` | Body text |
| `horizon-light` | `#EDEDEC` | Alternating section backgrounds |
| `horizon-border` | `#E5E5E5` | Card/component borders |
| `interest-in` | `#22C55E` | "Interested" action (green) |
| `interest-watch` | `#F59E0B` | "Watching" action (amber) |
| `interest-pass` | `#EF4444` | "Pass" action (red) |

### Critical design rules

- **Headings use `font-weight: 400`** (regular, NOT bold) — this is the brand's editorial elegance
- **Buttons are full pill** (`rounded-full` / `border-radius: 9999px`)
- **Primary button:** `bg-black text-white uppercase tracking-wider text-sm font-semibold rounded-full px-7 py-3`
- **Secondary button:** `bg-transparent text-black border border-black rounded-full px-7 py-3 uppercase tracking-wider text-sm font-semibold`
- **Accent button:** `bg-horizon-orange text-white rounded-full px-7 py-3`
- **All-caps labels:** `text-xs tracking-widest font-semibold uppercase text-horizon-dark/60`
- **Card hero images:** atmospheric sky/horizon photography (use Unsplash sky URLs: `https://images.unsplash.com/photo-{id}?w=800&h=400&fit=crop`)
- **Portrait photos:** apply `grayscale` CSS filter (`filter: grayscale(100%)`)
- **Orange triangle accent** on deal cards — CSS `::after` pseudo-element, positioned top-right of text area
- **Never use purple** — that's a WordPress admin variable, not the Horizon brand
- **Section backgrounds alternate:** white → `bg-horizon-light` → white

### Typography classes

```
Page title:    text-3xl font-normal text-horizon-dark        (weight 400!)
Section head:  text-2xl font-normal text-horizon-dark
Card title:    text-lg font-normal text-horizon-dark
Body:          text-sm text-horizon-dark leading-relaxed
Label:         text-xs tracking-widest font-semibold uppercase text-horizon-dark/60
Small:         text-xs text-horizon-dark/50
```

### UI copy conventions

Use Horizon vocabulary: "deal flow" not "investments", "founders" not "startups", "curated", "tight-knit community", "sector deep-dive". Tone is warm but authoritative, exclusive without being elitist, plain English. Avoid: "leverage", "synergy", "disruptive".

**Empty states**: "No upcoming events. Check back soon — we're always curating the next session."
**CTAs**: "Express Interest" not "Invest Now"
**Welcome**: "Welcome to Horizon Bay. You've joined 23 other investors shaping the next great ANZ company."

## Key Data Types

Core interfaces in `lib/types.ts`: `Deal`, `Member`, `Event`, `Question`, `PortfolioEntry`. Roles: `'admin' | 'investor' | 'founder'`. Deal statuses flow: New → Screening → Intro Requested → Diligence → Passed → Investing.

## Demo-Specific Features

- **Role Switcher:** shadcn `DropdownMenu` in Navbar, toggles Admin/Investor/Founder views
- **IC Memo Generator:** fake AI — 2-second skeleton pulse then pre-written template filled with deal data, displayed in Sheet side panel
- **Soft Circle:** shadcn `Slider` input ($25K–$500K in $25K increments), running total displayed above, "Commit" button below
- **QR Code Modal:** shadcn `Dialog` with `qrcode.react` QRCodeSVG component, shows Vercel deploy URL
- **Smart Matching:** rule-based `deal.tags ∩ member.thesisTags`, sorted by availability + cheque range overlap, displayed in card on deal detail

## Build Sequence (Optimised for Live Demo)

```
Phase 1: Scaffold + Foundation
  - create-next-app + tailwind + shadcn init
  - Install all shadcn components in one batch
  - Set up tailwind.config.ts with Horizon tokens
  - Create lib/types.ts, lib/data.ts, lib/utils.ts, lib/context.tsx
  - Create AppShell (Sidebar + Navbar + main area)
  - Wire up basic routing

Phase 2: Deal Flow (The Star)
  - DealCard.tsx with hero images, orange triangle, sector badge
  - Deal board page with filter tabs
  - Deal detail page with two-column layout
  - InterestActions.tsx with live toggle + counts
  - Q&A thread with upvote

Phase 3: Community Pages
  - Events page with RSVP
  - Members directory with grayscale portraits
  - Portfolio table + heatmap

Phase 4: Admin + Wow Features
  - Admin console with tabs
  - IC Memo Generator (fake AI)
  - Soft Circle slider
  - Smart Matching panel
  - Role Switcher with view gating
  - QR Code Modal

Phase 5: Polish + Test
  - Page transitions (framer-motion)
  - Playwright E2E tests for all pages
  - Responsive tweaks
  - Final visual polish
```

## Unsplash Image URLs (Pre-selected)

### Deal Hero Images (atmospheric sky/horizon)
```
Luma Health:    https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=400&fit=crop
Fieldstack:     https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop
Voxa AI:        https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=400&fit=crop
CarbonLedger:   https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop
Skipper:        https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop
```

### Event Hero Images
```
HealthTech:     https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&h=400&fit=crop
Climate:        https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop
AI & Auto:      https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop
```

### Member Avatars (from PRD — apply grayscale filter in CSS)
```
Yash Varma:     https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200
Sarah Chen:     https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200
Marcus Webb:    https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200
Priya Nair:     https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200
James Thornton: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200
```

## Package.json Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11",
    "qrcode.react": "^4",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "@radix-ui/react-*": "(installed by shadcn)"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "typescript": "^5",
    "tailwindcss": "^3",
    "autoprefixer": "latest",
    "postcss": "latest"
  }
}
```

## Role-Based Visibility Matrix

| Feature | Admin | Investor | Founder |
|---------|-------|----------|---------|
| Deal Flow (all deals) | yes | yes | no (own deal only) |
| Deal Detail | yes | yes | own deal only |
| Interest Actions | no | yes | no |
| Soft Circle | no | yes | no |
| Events | yes | yes | yes |
| Members | yes | yes | no |
| Portfolio | yes | yes | no |
| Admin Console | yes | no | no |
| Deal Status Change | yes | no | no |
| Q&A (ask) | yes | yes | yes |
| Q&A (moderate/pin) | yes | no | no |
| IC Memo Generate | yes | yes | no |
| Smart Matching | yes | yes | no |

## IC Memo Template

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  INVESTMENT COMMITTEE MEMO
  Generated by Horizon Bay AI  •  {date}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPANY:      {deal.name}
SECTOR:       {deal.sector}
STAGE:        {deal.stage}
ASK:          {deal.ask}

ONE-LINE THESIS
{deal.oneLiner}

WHY NOW
{deal.sector} is experiencing tailwinds from regulatory shifts
and market readiness. The team is early but timing is compelling.

TEAM SIGNAL
Founding team shows strong domain expertise. Early customer
conversations indicate product-market fit validation in progress.

TRACTION
{deal.traction || 'Pre-revenue; 3 LOIs signed. Pilot underway.'}

KEY RISKS
1. Market education required — category is nascent
2. Regulatory pathway unclear in some states
3. Team needs a strong commercial hire post-raise

HORIZON MEMBER MATCH
Top matched: {topMembers}
Total soft-circled: ${totalSoftCircled}

RECOMMENDATION
Move to Intro stage. Request full deck + founder call.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by Horizon Bay  •  Powered by Predelo
```

## Orange Triangle CSS (Deal Cards)

```css
/* In globals.css or as Tailwind @apply */
.deal-card-triangle::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-top: 40px solid #FF9D6E;
}
```

## Dummy Data Constants

All dummy data lives in `lib/data.ts`. Use the exact member data, deal data, and event data from the PRD (`docs/HorizonBay_PRD.md`). The data file exports: `DEALS`, `MEMBERS`, `EVENTS`, `PORTFOLIO_ENTRIES`. IDs use simple prefixes: `d1`–`d5` for deals, `m1`–`m5` for members, `e1`–`e3` for events.

## Playwright Test Patterns

```typescript
// Every test file follows this pattern:
import { test, expect } from '@playwright/test'

test.describe('Page Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/route')
  })

  test('renders key elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /title/i })).toBeVisible()
  })

  test('interactive feature works', async ({ page }) => {
    await page.getByRole('button', { name: /action/i }).click()
    await expect(page.getByText(/expected result/i)).toBeVisible()
  })
})
```

## vercel.json

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```
