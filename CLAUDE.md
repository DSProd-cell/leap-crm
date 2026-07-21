# Leap CRM — Progress Notes

## What this project is

Leap CRM is a **static, single-page mock/demo CRM** for an edtech sales org ("Sales Intelligence Platform"). It simulates a counsellor/manager dashboard with mock student, counsellor, and incentive data — there is no real backend; all data lives in JS arrays/objects at the top of `app.js`.

- **Source**: `index.html` (~2100 lines, markup + Tailwind CDN via `<script>`, no build step) and `app.js` (~9200 lines, all logic — rendering, state, the chat bot, everything). `styles.css` has a handful of custom rules.
- **Deploy**: Vercel, live at **https://leap-crm.vercel.app**. `vercel.json` rewrites all paths to `index.html` and sends `Cache-Control: no-cache` on every route. Push to `main` auto-deploys.
- **Local dev**: `.claude/launch.json` defines a preview config (`python3 -m http.server 3090`, no custom cache headers). There's also `serve.py`, but it points at `~/edtech-crm` (a different path) and isn't used by the launch config.
- **Login**: mock auth — any email/password combination works; a **Role** dropdown on the login screen picks which mock user you become (Counselor, Team Lead, POD Leader, Senior Manager, Director, Ops Admin). All mock users/data (`COUNSELORS`, `TEAM_LEADS`, `POD_LEADERS`, `SENIOR_MANAGERS`, `DIRECTORS`, `STUDENTS`, `HIERARCHY`, etc.) are defined near the top of `app.js`.

## ⚠️ Known gotcha: local preview caching

The Browser-pane preview aggressively caches `index.html` and `app.js` for `http://localhost:3090/` even across `navigate(force:true)` reloads. Reliable way to force a fresh load when testing changes locally:
1. Bump the cache-busting query string in `index.html`'s script tag: `<script src="app.js?v=NNNN"></script>` (increment `v`).
2. Navigate to `http://localhost:3090/index.html?nocache=<any-number>` (a different path/query than plain `/`) — plain `/` alone will often still serve the stale cached copy.
3. Confirm via `document.querySelector('script[src*="app.js"]')?.getAttribute('src')` in console before trusting any further test.

## ⚠️ Known gotcha: parallel sessions on `main`

Mid-session, a **separate** Claude session pushed a commit directly to `main` (a competing implementation of the same manager-header feature this session was building), and the resulting merge silently left an unclosed `if` block in `app.js` — the whole script failed to parse, `handleLogin`/`bootApp` were `undefined`, and production login broke entirely (no console error shown; had to bisect via a `<script>`-blob-injection technique to find the "Unexpected end of input" line). This was diagnosed and fixed (commit `cad80bc`). **Always `git fetch origin` and diff against `origin/main` before pushing** — don't assume you're the only session touching this repo.

## What was done this session (confirmed working, verified live in-browser with real clicks, not just JS shortcuts)

1. **Potential Escalations card** (dashboard, all roles): renamed from "User Experience"; rows are Customer Support / Low ISL Feedback / **Messages Not Replied** (was "WA Summary" — renamed per user request, but its color still tracks the full WA aggregate via a shared `computeWAIssueCount()` helper, matching the drawer) / IS Pending and Breached (static placeholder, no real SLA tracking exists yet).
2. **WA Summary drawer**: the 4 "problem" sub-accordions (Inactive Groups, Students Not Joined, Messages Not Replied, Group Not Created) now go green when their count is 0 instead of keeping a misleading fixed warning color.
3. **Manager-tier header redesign** (TL/POD/SM/Director/Ops Admin only): CRM-style header (search by ID/phone/email, "View assigned leads", "For call merge" status — all real/functional, wired to `getFilteredCounselorPool()`), with the POD/SM/TL/Counsellor filter bar relocated to its own row below the header. Ops Admin promoted to the same filter access as Director (`getMyTLIds`/`getMyPodIds`/`buildMgrFilterBar` extended) — but note: Ops Admin's dashboard *content* still renders from a single selected counsellor (`state.viewingCounselorId`), it does **not** yet aggregate over the filtered pool like true manager roles do. The filters are there and populate correctly; wiring them into Ops Admin's content view is unfinished (see Pending below).
4. **Performance Summary** (all roles): the whole scorecard (Volume Metrics + Conversion Funnel, including the two headline goals) is now filter-responsive — it derives from the actual filtered counsellor pool (global bar + this section's own Advanced Filters) instead of static hardcoded numbers, via `buildPerfRows()` / `counselorPerfWeight()` in `app.js`. Redesigned the top strip: "Overall Summary" (Good/On Track/Focus, stacked, left) next to a highlighted "🎯 Important Business Goal" panel (CA→STI/CA→LockIn, right, progress bars, bracketed bold status). Targets: **CA→STI (14D) = 20%, CA→LockIn (14D) = 35%**.
5. **Filter short-forms** (global bar + Advanced Filters, all roles): CL = Counsellor, TL = Team Lead, PL = POD Leader, SM = Senior Manager — applied to labels, default option text, and filter-pill summaries.
6. **Counsellor chat bucketization**: the post-"Good" flat list of 13 quick-reply options is now grouped into 5 topic buckets (📋 My Day & Tasks, 🏆 Performance & Leaderboard, 💰 Incentives & Earnings, 🎓 Learning & Growth, 🛠️ Support & Help) — see `CHAT_OPTION_BUCKETS`, `appendBucketMenu()`, `appendBucketSubOptions()` in `app.js`. Every original option's response script/data logic/redirect is untouched, just one layer deeper behind the bucket. Also fixed a real bug found while testing: `state.botConversation.flow` could linger after a flow's own follow-up buttons were shown, silently hijacking the *next* unrelated quick-reply click; bucket/sub-option clicks now call `endFlow()` first.

Production (`leap-crm.vercel.app`) was verified working end-to-end after the mid-session outage was fixed, and again after each subsequent change.

## What's untested / pending

- **Chat bucketization is only product-verified for the Counsellor role.** The code change (`showPostHelpQuickReplies()`) is *not* role-gated, so it's technically live for every role that reaches that code path, but the user explicitly said "let's fix the counsellor first" — other roles' bucket content/labels haven't been reviewed and may need role-specific adjustments.
- Ops Admin's dashboard content (boost cards, potential escalations, etc.) still reflects a single selected counsellor, not the filtered pool, even though it now has the full POD/SM/TL/Counsellor filter bar like Director. Filters are cosmetically/structurally correct but don't yet drive Ops Admin's own content.
- No automated tests exist in this repo — all verification this session was manual, in-browser, per role.
- Two harmless pre-existing Tailwind CDN production warnings in the console (expected, not a bug — "cdn.tailwindcss.com should not be used in production").

## Next steps

1. Confirm with the user whether/how to extend the chat bucketization to TL/POD/SM/Director/Ops Admin (same 5 buckets, or role-specific option sets).
2. If desired, wire Ops Admin's dashboard content to the filtered pool (like true manager roles) rather than the single-counsellor view.
3. Keep watching for concurrent-session pushes to `main` (see gotcha above) before every push.
