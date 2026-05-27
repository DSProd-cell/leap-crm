# EduCRM — Full Project Context

## What This Is

A fully client-side, browser-runnable **Edtech Sales CRM** demo built from the PRD at `/Users/debasish/Downloads/Claude Proj/prd-edtech-crm.md`. No backend, no build step, no npm. All data is mocked in JS. Runs via a Python HTTP server.

---

## Live Server

```bash
# Server is running at:
http://localhost:3090

# To restart manually:
lsof -ti:3090 | xargs kill -9
cd ~/edtech-crm && python3 serve.py
```

**Serve script:** `~/edtech-crm/serve.py`  
**Source of truth files:** `~/edtech-crm/` (copied from `~/Downloads/Claude Proj/edtech-crm/`)

---

## File Structure

```
~/edtech-crm/
├── index.html       # Full app HTML — login screen + app shell + all tab panels + modals
├── styles.css       # Custom CSS — metric cards, sidebar nav, leaderboard, toasts, animations
├── app.js           # All JS — mock data, state, rendering, event handlers (799 lines)
├── serve.py         # Minimal Python HTTP server (uses ~/edtech-crm as root)
└── .claude/
    └── launch.json  # Preview server config

~/Downloads/Claude Proj/
├── .claude/
│   └── launch.json  # Points to ~/edtech-crm/serve.py, port 3090, autoPort: false
└── edtech-crm/      # Original source (keep in sync manually if editing)
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| HTML | Vanilla, single file | No build step, works anywhere |
| CSS | Tailwind CSS v3 CDN + `styles.css` | Utility classes + custom card/animation styles |
| JS | Vanilla ES6, no framework | Zero dependencies, instant load |
| Charts | Chart.js v4 CDN | Bar chart for earnings history |
| Icons | Inline SVGs (Lucide-style) | No emoji, consistent stroke, no extra CDN |
| Fonts | Google Fonts CDN | Righteous (headings), Poppins (body), Fira Code (numbers) |
| Server | Python 3 `http.server` | Already installed on macOS, no npm needed |

---

## Design System (UI/UX Pro Max Output)

Generated via:
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "edtech sales CRM dashboard counselor performance leaderboard bold energetic" \
  --design-system -p "EdTech Sales CRM" --persist
```

**Style:** Sales Intelligence Dashboard (Bold & Energetic)  
**Typography:** Righteous / Poppins / Fira Code  

| Token | Value | Usage |
|---|---|---|
| Sidebar BG | `#0F172A` | Left nav |
| Primary | `#2563EB` | Buttons, active states, links |
| Accent (Success) | `#059669` | Green metric cards, earnings numbers |
| Warning | `#D97706` | Amber metric cards (60–99% target) |
| Danger | `#DC2626` | Red metric cards (<60% target), errors |
| Surface | `#F1F5F9` | Page background |
| Card | `#FFFFFF` | Card backgrounds |
| Text main | `#0F172A` | Headings, primary text |
| Text muted | `#64748B` | Labels, secondary text |
| Border | `#E2E8F0` | Card borders, dividers |
| Gold | `#F59E0B` | Rank #1 badge |

---

## Roles & What They See

### Counselor (default login)
- Sees **only their own** metric cards, history, earnings
- Leaderboard: sees names & scores but **NOT earnings amounts** (relative bars shown instead)
- No Admin Panel link in sidebar
- No counselor selector dropdown

### Team Lead
- Counselor selector dropdown appears (own team only — Alpha or Beta)
- Sees **full earnings amounts** for their team
- No Admin Panel link

### Ops Admin
- Counselor selector shows ALL 8 counselors
- Full earnings visibility
- **Admin Panel** link appears in sidebar
- Access to: User Mgmt, Corrections, Slab Upload, Quick Links, Training, Tickets

---

## Mock Data Reference

### Counselors (8 total, 2 teams)

| # | Name | Team | Today's Calls | Leads | Enrolments | Revenue | Follow-ups |
|---|---|---|---|---|---|---|---|
| 1 | Priya Sharma | Alpha | 45 | 26 | 4 | ₹2.1L | 16 |
| 2 | Rohan Mehta | Alpha | 52 | 31 | 6 | ₹3.4L | 21 |
| 3 | Ananya Singh | Alpha | 28 | 14 | 2 | ₹0.95L | 9 |
| 4 | Karan Nair | Alpha | 50 | 30 | 5 | ₹3.0L | 20 |
| 5 | Divya Reddy | Beta | 38 | 22 | 3 | ₹1.75L | 14 |
| 6 | Sahil Joshi | Beta | 55 | 33 | 7 | ₹3.9L | 24 |
| 7 | Meera Pillai | Beta | 19 | 9 | 1 | ₹0.48L | 6 |
| 8 | Arjun Khanna | Beta | 41 | 24 | 3 | ₹1.65L | 13 |

**Team Leads:** Sneha Kapoor (Alpha), Vijay Kumar (Beta)  
**Ops Admin:** Nisha Agarwal

### Daily Targets
| Metric | Target |
|---|---|
| Calls Made | 50 |
| Leads Contacted | 30 |
| Enrolments | 5 |
| Revenue | ₹3,00,000 |
| Follow-ups Done | 20 |

### Earnings (Priya Sharma — default counselor)
- Earned so far: **₹38,400**
- Projected at 100%: **₹72,000**
- Opportunity ceiling: **₹85,000**

### Incentive Slabs (mock)
| Component | Rule | Status | Earned |
|---|---|---|---|
| Calls Slab | ≥80% of 50 calls/day | 45/50 (90%) | ₹8,500 |
| Enrolment Bonus | ₹6,000 per enrolment | 4 enrolments | ₹24,000 |
| Revenue Bonus | 1% of revenue >₹2L | ₹2.1L collected | ₹1,000 |

### Monthly Earnings Chart (2025)
`[18000, 24000, 31000, 28000, 36000, 42000, 38000, 45000, 51000, 47000, 38400, 0]`  
Current month (May) highlighted in green, previous months in blue, Dec=0 (future).

### Stable Leaderboard Seeds
Leaderboard and earners use fixed offsets (not Math.random) so values don't shuffle on re-render.

---

## Features Built (Tab by Tab)

### Login Screen
- Email + Password + Role dropdown (Counselor / Team Lead / Ops Admin)
- Show/hide password toggle
- Any credentials accepted (demo mode)
- 3 failed attempts → locked message, button disabled
- "Forgot password?" → success toast

### Tab 1 — Tasks & Performance
- **5 metric cards** — green (≥100%), amber (60–99%), red (<60%) with gradient bg + decorative circle
- Count-up animation on metric values (0→value, 600ms, cubic ease)
- **Log Task form** — task type dropdown + optional notes → updates metric card instantly + toast
- **Achievement History table** — 7 Days / This Month / This Year toggle; stable values per cell
- **Top Performers leaderboard** — 5 cards (one per metric), top 3 ranks, gold/silver/bronze badges; Today / This Month / This Year toggle

### Tab 2 — Incentives & Earnings
- **Earnings summary** — 3 cards: Earned / Projected (primary blue bg) / Opportunity (accent)
- **Incentive breakdown table** — component, rule, status badge, earned amount
- **Bar chart** (Chart.js) — 12-month earnings, hover tooltip with ₹ amount; May=green, rest=blue, Dec=empty
- **Top Earners leaderboard** — This Month + All Time side by side; counselor role sees relative bars instead of amounts

### Tab 3 — Learning & Development
- **Course Updates** — pinned banner cards with info icon
- **Training modules** — accordion expand/collapse (CSS max-height transition), lessons with Video/Doc/Link badges + Open button
- **Quick Links grid** — 12 cards, colored icon backgrounds, external link simulation via toast
- **Support ticket button** → modal with category/subject/description, full validation, success toast on submit

### Admin Panel (Ops only)
Sub-nav: Users | Corrections | Incentive Slabs | Quick Links | Training | Tickets

- **Users** — full table of 11 users, Reset pwd / Deactivate actions, Add User modal with form
- **Corrections** — counselor dropdown, date (default=today, max=today), metric, new value, reason field
- **Incentive Slabs** — drag-drop CSV zone + click upload, parse preview table, Confirm Upload
- **Quick Links** — admin table of links with Edit/Deactivate per row
- **Training** — module list with Edit + Add Lesson per module
- **Tickets** — 4 mock tickets, Mark Resolved action updates status in table

---

## Key JS Patterns

### State Object
```js
let state = {
  role: 'counselor',          // 'counselor' | 'team_lead' | 'ops_admin'
  currentUser: null,          // object from COUNSELORS / TEAM_LEADS / OPS_USERS
  viewingCounselorId: 1,      // which counselor's data to show
  historyPeriod: '7d',        // '7d' | 'month' | 'year'
  leaderPeriod: 'today',      // 'today' | 'month' | 'year'
  currentTab: 'tab1',
  currentAdminPanel: 'users',
  loginAttempts: 0,
  lockedUntil: null,
  earningsChart: null,        // Chart.js instance (null = not init yet)
};
```

### Tab Switching
```js
switchTab('tab1' | 'tab2' | 'tab3' | 'admin')
```
- Shows/hides `.tab-panel` divs
- Updates `.nav-item.active` class
- Lazy-inits Chart.js only when tab2 first opened (`!state.earningsChart` guard)

### Role Gating (in bootApp)
```js
if (state.role === 'ops_admin') adminNavItem.classList.remove('hidden')
if (state.role !== 'counselor') counselorSelectorWrapper.classList.remove('hidden')
```

### Toast System
```js
showToast('message', 'success' | 'error' | 'info' | 'warning')
```
- Slides in from right (CSS animation)
- Auto-dismisses after 3.5s
- Manual X close button
- Uses `aria-live="polite"` for accessibility

---

## Known Limitations (v0 Demo)

1. **No real backend** — all state resets on page reload
2. **No actual auth** — any email/password accepted; role chosen from dropdown
3. **Sidebar not visible in narrow preview** — `fixed` positioning + `ml-60` works correctly in full browser window; preview tool renders narrow viewport
4. **CSV upload parses but doesn't persist** — file is read and previewed, "Confirm" shows toast only
5. **Training "Open" buttons** — trigger toast instead of real navigation/playback
6. **No notifications** — v1 feature per PRD
7. **Log task** increments by fixed amounts, not the actual metric value typed by user (no input field for value in v0 per PRD)

---

## What's NOT in v0 (per PRD)

- Email/push notifications
- Counselor ticket status tracking
- Leaderboard trend lines / historical rank changes
- Training completion tracking (progress bars)
- Month-by-month slab earnings breakdown for counselors
- Mobile native app

---

## How to Extend

### Add a new counselor
```js
// In app.js, add to COUNSELORS array:
{ id:9, name:'New Person', team:'Alpha', role:'counselor', email:'new@edu.in', avatar:'NP',
  today:{ calls:40, leads:22, enrolments:3, revenue:180000, followups:15 } }
```

### Change daily targets
```js
// In app.js, update TARGETS and METRIC_TARGETS:
const TARGETS = { calls: 60, leads: 35, enrolments: 6, revenue: 350000, followups: 25 };
```

### Change earnings slab data
```js
// In app.js, update INCENTIVE_SLABS array
```

### Add a new tab
1. Add HTML panel `<div id="tab4" class="tab-panel hidden">...</div>`
2. Add nav button in sidebar with `onclick="switchTab('tab4')"`
3. Add to `titles` object in `switchTab()`
4. Add `renderTab4()` call in `bootApp()`

### Add backend
Replace mock data arrays with `fetch()` calls to a REST API. The render functions are already separated from data — just swap the data source.

---

## Design Skill Used

**UI/UX Pro Max** (installed at `~/.claude/skills/ui-ux-pro-max/`)  
- Design system generated via `scripts/search.py --design-system`
- Style: Sales Intelligence Dashboard
- Pre-delivery checklist: all items checked (SVG icons, cursor-pointer, contrast, focus states, reduced-motion, responsive breakpoints)

---

## QA Results

| Check | Status |
|---|---|
| JS brace balance (254/254) | ✅ |
| Paren balance (462/462) | ✅ |
| Backtick balance (92, even) | ✅ |
| All `getElementById` IDs exist in HTML | ✅ |
| All `onclick` handler functions defined | ✅ |
| Admin panels wired to nav buttons | ✅ |
| Stable leaderboard (no Math.random re-shuffle) | ✅ |
| Stable history table | ✅ |
| Chart lazy-init guard | ✅ |
| INR formatting (₹ + lakhs shorthand) | ✅ |
| Role-based visibility (counselor/lead/ops) | ✅ |
| Toast aria-live | ✅ |
| ESC key closes modals | ✅ |
| Overlay click closes modals | ✅ |
| Mobile responsive (2-col grid, bottom nav) | ✅ |
| prefers-reduced-motion | ✅ |
