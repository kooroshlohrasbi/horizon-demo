# Innovation Bay — Background Documentation for Agent
> **Purpose:** This document gives a design agent everything it needs to build a product that authentically reflects the Innovation Bay / Horizon brand. Screenshots were captured live from the site on 27 Feb 2026. Treat this as the single source of truth.

---

## 1. Organisation Overview

**Innovation Bay** is Australia and New Zealand's leading community for technology founders and investors, founded in 2003 by **Ian Gardiner** and **Phaedon Stough**, headquartered in Sydney, NSW. ~22 employees.

**Mission:** "Accelerating the success of visionary tech founders and investors in Australia and New Zealand through community, connection and education."

**Taglines in use:**
- "Accelerating the success of visionary tech founders and investors"
- "Not your typical angel network" *(Horizon-specific)*
- "For high-net-worth, like-minded angel investors" *(Horizon hero headline)*
- "Empowering the disruptors of today and tomorrow"

**Credibility signals:** Featured in Forbes Australia. Partners include Blackbird, Airtree, Square Peg, OneVentures, Goldman Sachs, Google Cloud, ASX.

---

## 2. Four Communities

Innovation Bay runs four distinct, curated sub-communities. Each has its own colour, photography style, and audience:

| Community | Colour | Audience | Stage |
|---|---|---|---|
| **Canopy** | Teal green `~#3A8C7A` | Early-stage Founders & CEOs | Seed |
| **Summit** | Steel blue `~#7B8FA0` | Later-stage Founders & CEOs | Series A+ |
| **Horizon** | Warm orange `#FF9D6E` | Angel investors, ex-founders, HNWIs | Pre-seed → Series A |
| **Aurora** | Lavender `~#9B89C4` | Venture Capitalists, GPs | Series A+ |

**The demo app is for Horizon.** Always use `#FF9D6E` as the Horizon accent.

---

## 3. Horizon — Deep Context

### What it is
Horizon is Innovation Bay's exclusive angel investor community. It is deliberately small (max 25 members per city), intimate, and curated. Members sit around one table. The network is about **relationship depth, not volume**.

### Members
Experienced angel investors, ex-founders, CEOs, and high-net-worth individuals. Mix of active and new-to-angel-investing participants. The network does **not** publish its member list publicly.

### Investment model
- Quarterly events: sector deep-dive panel (exited founder + active investor + industry expert) → 3 curated founder pitches
- Dual-track deal access: full pipeline via member platform OR trust the selection committee's top-3 picks
- 30%+ investment rate for founders who pitch — high-signal curation
- Innovation Bay steps aside at investment point; angels invest directly with founders

### Horizon differentiators
1. **Tight community** — ≤25 members, one conversation, one table
2. **Founder-friendly** — candid feedback at all stages + 2 pitch training sessions
3. **Facilitated due diligence** — curated deal flow, not a fire hose
4. **Active angels** — members invest directly, not through a fund structure

### Geographic presence
Sydney, Melbourne, Adelaide, Brisbane (Feb 2023), Darwin (Sep 2024, NT Government-backed)

### Community Manager
**Eleanor Salt** — day-to-day operations, event facilitation, member onboarding

### Key language / vocabulary
Use this language in UI copy — it mirrors how Innovation Bay talks:
- "Deal flow" not "investments"
- "Founders" not "startups" or "companies"
- "Tight-knit community"
- "Curated" (used constantly)
- "Sector deep-dive"
- "Selection committee"
- "Early-stage" not "startup"
- "Empower" and "impact" appear frequently
- "ANZ tech ecosystem"

---

## 4. Design System (Live Site — Verified)

### 4.1 Colours

```
HORIZON ACCENT (primary)  #FF9D6E   rgb(255, 157, 110)   warm orange/salmon
IB GOLD / HERO            #F5C549   (approx)             warm golden yellow — homepage hero bg
PURE BLACK                #000000   rgb(0, 0, 0)         buttons, nav text, logo
PURE WHITE                #FFFFFF   rgb(255, 255, 255)   backgrounds, button text
DARK TEXT                 #313131   rgb(49, 49, 49)      body copy
LIGHT SECTION BG          #EDEDEC   (approx)             alternating section bg (light grey)
WP SYSTEM PURPLE          #7A00DF   (CSS var only)       internal WP admin, NOT used in UI
```

**Colour usage rules:**
- Horizon badge / pill: `#FF9D6E` fill, white text
- Primary CTA ("Apply Now", "Membership"): black fill `#000`, white text
- Secondary CTA ("Apply to Pitch"): black border, white/transparent fill, black text
- Geometric accent shapes (triangles): orange `#FF9D6E` and gold/yellow `#F5C549`
- Section backgrounds alternate white → light grey (`#EDEDEC`)
- **Never use purple in Horizon-facing UI** — that is a WP admin variable

### 4.2 Typography

```
Font family:   Agrandir   (Pangram Pangram Foundry — geometric sans-serif)
CDN / source:  Must be self-hosted or use Google Fonts fallback (Inter is closest match if Agrandir unavailable)
Fallback:      Inter, system-ui, sans-serif

Display / Hero H1:    56–72px,  weight 400 (regular — deliberately light for elegance)
Section H2:           36px,     weight 400
Sub-heading H3:       24–28px,  weight 400
Body:                 16px,     weight 400
Small / label:        13–14px,  weight 400 or 600 (all-caps labels)
Line height:          1.2 (snug) for headings; 1.6 for body

Key note: Agrandir uses weight 400 for headings — NOT bold. This is intentional and creates the brand's elegant, editorial feel. Do not use font-weight 700 for headings.
```

**All-caps labels** (e.g. "HORIZON", "INNOVATION BAY", "WHAT WE OFFER") appear as small tracking-widened uppercase text, typically `font-size: 12–14px; letter-spacing: 0.15em; font-weight: 600`.

### 4.3 Logo

The Innovation Bay logo is a **thin-line geometric mark** (angular bracket/hexagon-like shape) in black, paired with "INNOVATION BAY" wordmark in Agrandir. The mark uses animated SVG stroke on the web. For the demo app:
- Use text wordmark: **"INNOVATION BAY"** in Agrandir, weight 400, black
- Paired with: **"HORIZON"** pill badge in `#FF9D6E`, white text

### 4.4 Buttons

```css
/* Primary (solid black) */
.btn-primary {
  background: #000000;
  color: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 9999px;          /* full pill */
  padding: 0.75rem 1.75rem;
  font-family: Agrandir, Inter, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}

/* Secondary (outlined) */
.btn-secondary {
  background: transparent;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 9999px;
  padding: 0.75rem 1.75rem;
  font-family: Agrandir, Inter, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Horizon accent button */
.btn-horizon {
  background: #FF9D6E;
  color: #FFFFFF;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1.5rem;
}
```

### 4.5 Cards

Cards on the Horizon page follow this pattern:
- **Large atmospheric sky/horizon photography** at top (full-width within card)
- **Thin border** outline (`1px solid #E0E0E0` or `#000`)
- White background below image
- Title in Agrandir, 20–24px, weight 400
- Small orange triangle accent (`▶` or CSS triangle) in top-right of text area
- Body text: 14–16px, `#313131`

Example card titles: "Quarterly physical events", "Quality deal flow", "Community & conversation"

### 4.6 Photography / Imagery Style

Horizon uses **atmospheric sky and horizon photographs** consistently:
- Above-cloud aerial shots with warm golden-hour tones (peach, orange, pink, blue)
- Moody dusk/dawn skies
- Landscape orientation, high quality
- Grayscale filter applied to **portrait/headshot** photos (for speaker grids, member cards)
- **Do not** use generic stock startup photos (laptops, handshakes, etc.)
- For dummy data in the demo: use `https://source.unsplash.com/` with sky/horizon/aerial queries

### 4.7 Decorative / Motion Elements

- **Rotating circular background gradient** (very subtle, slow 120s rotation) — used on investor pages
- **Triangle/arrow shapes** in orange and gold — used as decorative accents near section headings
- **Floating animation** on certain elements (10s ease-in-out, subtle vertical movement)
- Overall motion is **subtle and slow** — this is a premium, calm brand, not a SaaS growth tool

### 4.8 Layout & Spacing

```
Max content width:    1200px (centered)
Section padding:      80–120px vertical
Card grid:            3-column on desktop, 1-column on mobile
Column gap:           2rem (32px)
Mobile breakpoint:    42rem (672px)
Section alternation:  white → #EDEDEC → white
Nav height:           ~64px, sticky, white bg, bottom border
```

---

## 5. Navigation Structure (Reference)

```
[Logo + "INNOVATION BAY"]    Founders | Investors | Insights | Events | Job Board | Partners | About Us    [Apply to Pitch] [Membership] [🔍]
```

- "Apply to Pitch" = outlined secondary button (for founders)
- "Membership" = solid black primary button (for investors)
- Clean white nav, no background colour, thin bottom separator

---

## 6. Horizon App — Feature Suggestions for Demo

The demo app should feel like **Horizon's private member portal**. Suggested features (build with dummy data):

### Core screens
1. **Dashboard** — Member home: upcoming events, active deals, community activity feed
2. **Deal Flow** — Pipeline of curated startups; card per company with sector tag, stage, ask amount, brief thesis
3. **Company Profile** — Full startup card: founder names, problem/solution, traction metrics, deck link, investor interest tracker
4. **Events** — Upcoming quarterly events: date, sector focus, 3 featured founders, RSVP
5. **Members** — Member directory (grayscale portraits, name, background e.g. "Ex-Atlassian, now angel")
6. **Portfolio** — Personal investment log: companies invested in, amount, date, current status
7. **Notifications** — New deal added, event reminder, co-investor expressed interest

### Dummy data to use
```
COMPANIES (deal flow):
- Luma Health — HealthTech, Pre-seed, $500K, "AI-powered triage for rural GPs"
- Fieldstack — AgTech, Seed, $1.2M, "IoT soil monitoring for broadacre farms"
- Voxa AI — B2B SaaS, Seed, $800K, "Voice analytics for call centre compliance"
- CarbonLedger — Climate/Fintech, Pre-seed, $400K, "Real-time Scope 3 carbon tracking"
- Skipper — Logistics, Seed, $1M, "Last-mile routing for regional Australia"

MEMBERS:
- Yash Varma — Empress Capital, Sydney
- Sarah Chen — Ex-Canva, Melbourne
- Marcus Webb — Ex-Afterpay CFO, Sydney
- Priya Nair — Healthcare operator, Brisbane
- James Thornton — Family office, Melbourne

EVENTS:
- "HealthTech Deep Dive" — 18 Mar 2026, Sydney, 3 founders
- "Climate & Cleantech" — 22 May 2026, Melbourne, 3 founders
- "AI & Automation" — 17 Jul 2026, Sydney, 3 founders
```

---

## 7. Tone of Voice for UI Copy

Innovation Bay / Horizon copy is:
- **Warm but authoritative** — not corporate, not startup-casual
- **Exclusive without being elitist** — "intimate" and "curated" over "elite" or "exclusive"
- **Mission-driven** — always frames things in terms of ecosystem impact
- **Plain English** — no jargon, no buzzword stacking
- Avoids: "leverage", "synergy", "disruptive" (used sparingly), "ecosystem" overuse

Example microcopy:
- Empty state: "No upcoming events. Check back soon — we're always curating the next session."
- CTA: "Express Interest" (not "Invest Now")
- Onboarding: "Welcome to Horizon. You're joining 23 other investors who believe the next great ANZ startup is one conversation away."

---

## 8. Tech Constraints for Demo

- Deploy to **Vercel** (static or Next.js)
- Build must be completable live in ~10 minutes of coding time (so architecture should be: single `index.html` or single-file React/Next with mock data)
- **Dummy/sanitised data only** — no real member information
- Must work on a laptop screen (1280×800 minimum)
- No backend needed — all data as JSON constants in the app
- Should have at least one "wow" interaction (e.g. animated deal card flip, live filtering of deal flow, real-time member interest toggle)

---

## 9. Quick-Reference Cheat Sheet

```
Brand:         Innovation Bay / Horizon
Font:          Agrandir (fallback: Inter)
Heading weight: 400 (regular — NOT bold)
Horizon color: #FF9D6E
IB Gold:       #F5C549
Black:         #000000
Dark text:     #313131
Light grey bg: #EDEDEC
Button radius: 9999px (full pill)
Image style:   Atmospheric skies, aerial, grayscale portraits
Copy tone:     Warm, exclusive, mission-driven, plain English
Max width:     1200px
```

---

*Compiled 27 February 2026 from live site observation (innovationbay.com / innovationbay.com/investors/horizon/). All colours verified via DevTools computed styles.*
