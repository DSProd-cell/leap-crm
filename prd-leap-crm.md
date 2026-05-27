# Leap CRM — Product Requirements Document (v0)

---

## Objective

Leap CRM is a sales intelligence and performance management platform built for education counsellors and their managers. It replaces disconnected tools — WhatsApp groups, Excel trackers, email chains — with a single, real-time view of every student in the pipeline, every counsellor's performance, and every task that needs to happen today. The product is used daily by counsellors to manage their student pipeline and by managers to run stand-ups and track team performance.

---

## The Problem

Education counsellors managing international study abroad pipelines typically juggle:

- WhatsApp for student communication and follow-up reminders
- Excel sheets or CRMs not built for education sales to track pipeline stages
- Verbal or manual stand-up updates that have no data backing
- No single place to see which students are stuck, which deadlines are approaching, and what each counsellor has done today

The result: students fall through the cracks between key milestones (STI → Application → Deposit → Lock-in), targets are missed without early warning, and managers have no real-time visibility until the damage is done.

---

## Who Uses This

### 1. Counsellor
The primary user. Manages a personal portfolio of students through the study abroad pipeline. Logs tasks daily, tracks pipeline health, views their own performance metrics, attends stand-ups, and earns incentives based on conversions. Uses the product throughout the working day.

### 2. Manager
Views the performance of their entire counsellor team in one place. Uses the stand-up table to run daily team meetings. Can switch between individual counsellors' dashboards to understand blockers. Does not manage individual students directly.

### 3. Admin
Manages the operational configuration of the platform: adding/removing users, uploading training content, creating offers and promotions, managing badges and achievements, configuring the CRM assistant bot, and managing the university information hub. Has access to all counsellor and manager views as well.

### 4. Business Head
Senior leadership contact accessible through the CRM assistant bot for escalation. Not an active product user — their name, contact, and designation are configured by the admin and surfaced when a counsellor asks the bot to escalate.

---

## High-Level Flow

1. Counsellor logs in → lands on the Tasks & Performance dashboard
2. Dashboard shows a prioritised view of which students need attention today (Boost cards), current pipeline health, WhatsApp group coverage, and key metrics
3. Counsellor opens a student's detail page to see their stage, task checklist, call history, and WhatsApp group status
4. Counsellor completes tasks (calls, follow-ups, document shares) and logs them in the Log Task section
5. Metrics update in real time to reflect logged activity
6. At stand-up, the counsellor (or manager) refers to the Stand-Up Table for an at-a-glance breakdown of targets vs. actuals
7. Manager can switch between counsellors to view any individual's dashboard
8. At the end of the day, counsellors can view their Scorecard (yesterday's performance reviewed against targets)
9. Incentives and earnings are tracked under a separate tab with slab-based calculation
10. Training content and development resources are available under a third tab

---

## Features

### Feature 1 — Login and Role-Based Access

Users log in with their email address, password, and role selection (Counsellor, Manager, or Admin). Each role sees a different version of the product:

- Counsellors see only their own data and students
- Managers see a team-wide view and can switch between individual counsellors
- Admins see everything, plus an Admin Panel tab
- A session persists until the user explicitly logs out
- There is a maximum login attempt limit; accounts are temporarily locked after repeated failures
- A "Forgot Password" link is present on the login screen (no functional reset in v0 — placeholder only)

---

### Feature 2 — Student Pipeline Stages

Every student in the system sits in exactly one of four pipeline stages at any given time:

| Stage | What it means |
|-------|---------------|
| STI (Study in India) | Student has been identified and is being counselled |
| Application | Student has submitted an application to a university |
| Deposit | Student has paid or committed to paying a deposit |
| Lock-in | Student is fully committed and the conversion is confirmed |

A student moves forward through these stages manually — the counsellor updates the stage from the student's detail page. Stages do not move backwards in v0.

---

### Feature 3 — Boost Task Cards

The first section of the Tasks & Performance tab shows two priority action cards. These are not reporting widgets — they are action prompts telling the counsellor who needs attention right now.

**Boost STI card:** Displays the count of students currently in the STI stage. Clicking it opens the Boost Pipeline Drawer, which shows all three eligible stages (STI, Application, Lock-in) as a funnel, each with the list of students in that stage.

**Boost Deposit card:** Displays the count of students in the Deposit stage. Clicking it opens a drawer showing those students and their details.

Both cards display:
- Stage label
- Total count of students in that stage
- A CTA button to open the relevant drawer

---

### Feature 4 — Boost Pipeline Drawer

Opened when the counsellor clicks the Boost STI card. Shows three sections stacked vertically as a funnel:

1. Boost STI — students in the STI stage
2. Boost Application — students in the Application stage
3. Boost Lock-in — students in the Lock-in stage

Each section shows the student count and a list of student cards. Each student card is tappable and opens that student's full detail page. If a stage has zero students, that section displays a "No students at this stage" message rather than being hidden.

---

### Feature 5 — WhatsApp Group Coverage

Displayed as two clickable chips beneath the Boost cards:

**Groups counsellor joined:** Shows the number of WhatsApp groups the counsellor has joined out of the total groups associated with their students (e.g. "10/11"). Clicking opens a drawer listing every group, its name, and whether the counsellor has joined it.

**Students NOT in group:** Shows the count of students who are not yet in their assigned WhatsApp groups. Clicking opens a drawer listing each such student and which groups they are missing from.

This gives the counsellor an instant view of WhatsApp coverage gaps without needing to manually check each group.

---

### Feature 6 — Volume and Quality Metrics

Two sets of metric cards displayed after the WhatsApp coverage chips.

**Volume Metrics** track activity counts:
- STIs Submitted
- Applications Submitted
- Deposits Collected
- Lock-ins Achieved
- Calls Made

**Quality Metrics** track conversion efficiency:
- 1st Call Quality Score
- 2nd Call Quality Score
- CA to ISL (Initial Student Lead conversion within 48 hours)
- CA to F2F (Face-to-face meeting conversion within 15 days)
- LinkedIn activity (last 2 days)
- CA to STI (conversion within 15 days)
- Admit to Deposit rate (within 30 days)
- Deposit via LeapPay rate

Each card shows: metric name, current value, percentage of target achieved, and a progress bar. Cards are colour-coded: green when on or above target, red when below.

---

### Feature 7 — Team Chat

A chat panel embedded within the Tasks & Performance tab. Allows the counsellor to send messages to their team. Messages show sender name, avatar initials, and timestamp. The counsellor's own messages appear on the right; others appear on the left. The manager's messages are visually differentiated. Messages are sent by typing and pressing Enter or clicking the Send button.

---

### Feature 8 — Log Task

A simple form on the Tasks & Performance tab for the counsellor to manually record activity. The counsellor selects the task type from a dropdown, adds optional notes, and clicks Log. Logged tasks update the relevant metric cards in real time.

Task types available:
- Call Made
- Lead Contacted
- Enrolment Closed
- Revenue Collected
- Follow-up Done
- STI Submitted
- Application Submitted
- Deposit Collected
- Lock-in Achieved

---

### Feature 9 — Stand-Up Table

A data table designed specifically for use during daily team stand-up meetings. Each row is a metric. Each column is a time period comparison.

**Columns:**
- Metric name (clickable — opens a student drill-down for that metric)
- Target YTD (Year to Date)
- Target MTD (Month to Date)
- Achieved YTD
- Achieved MTD
- Yesterday (Y)
- Day before yesterday (Y-1)
- Two days prior (Y-2)
- This week (W0)
- Last week (W0-1)
- Last month (M0-1)

**Filters available above the table:**
- Intake (All / Sep 2026 / Jan 2027)
- Location (All / Branch / Online)
- Country (All / India / Canada / UK / Australia / USA)

Every number in the table is clickable. Clicking any number opens a drawer showing the list of students that make up that count, with their names, stages, and last activity.

Every metric name in the first column is also clickable, opening the same student drill-down for that metric.

---

### Feature 10 — Leaderboard

A ranked list of top-performing counsellors shown on the Tasks & Performance tab. Three time-period views: Today, This Month, This Year. Displays counsellor name, rank, and performance score for the selected period.

---

### Feature 11 — Daily Scorecard

A read-only summary of the counsellor's performance from the previous working day. Displayed at the bottom of the Tasks & Performance tab.

Includes:
- A headline summary (e.g. "3 metrics in the red zone — focus here first")
- Three score tiles: Working Well, Improving, Needs Focus
- A metric-by-metric table showing Target vs. Actual for each metric with a status indicator
- A "Recommended Next Steps" section listing the top 3 metrics to focus on, with a reason why each matters and a specific recommended action
- A "Top Performers" section showing the org-wide and cluster-level leaders for the previous day

The scorecard is labelled Read-only and cannot be edited.

---

### Feature 12 — Student Detail Page

Opens as a full-screen page (not a side drawer) when any student's name is tapped from anywhere in the product. Contains:

**Header:**
- Student name
- Back button to return to the previous screen
- Call button (initiates a call directly from the page)

**Body:**
- Current pipeline stage with a status badge
- Follow-up date
- Last call date and call outcome
- Quality score
- App download status (yes/no)
- Last connected timestamp

**Task Checklist:** A list of pending and completed subtasks for this student. Each task shows its label, completion status, completion timestamp (if done), any notes logged, and the outcome. Tasks can be marked as done from this page.

**WhatsApp Groups:** Lists all WhatsApp groups this student should be in, with indicators for whether the counsellor has joined each group and whether the student has joined.

The page is scrollable and replaces the drawer pattern for student detail — the full screen is used to give counsellors a complete view without a cramped side panel.

---

### Feature 13 — CRM Assistant Bot

A floating orange chat bubble visible at all times, fixed to the bottom-right corner of the screen on every page. Clicking it opens the CRM Assistant panel, which has three tabs:

**Chat tab:**
The counsellor can type natural language questions or requests. The bot understands and responds to intents including:
- Checking pipeline status ("how many students are in STI?")
- Finding a student ("show me Aarav Mehta")
- Checking today's targets
- Logging motivation or notes
- Asking about incentive slabs
- Requesting escalation to the Business Head
- Asking about training or course content

The bot guides users through multi-step flows using quick-reply buttons (e.g. selecting a student from a list, confirming an action). Responses appear as chat bubbles. The conversation history persists during the session.

**Action Items tab:**
Displays a prioritised list of actions the bot recommends for the day, based on the counsellor's current pipeline — for example, "Call 3 students with overdue follow-ups" or "2 students haven't joined their WhatsApp group."

**Info Hub tab (within the bot panel):**
A searchable directory of universities the counsellor can look up. Each university entry includes country, city, type, intake dates, deposit amount (INR and foreign currency), deposit deadline, refund policy, and payment notes. The counsellor can also filter by country or intake.

The bot panel slides up from the bubble. It can be dismissed by clicking the X button or clicking the bubble again.

The Admin can clear the chat history from within the bot panel. An unread message badge appears on the bubble when the bot has new recommended actions.

---

### Feature 14 — Incentives & Earnings Tab

A dedicated tab showing the counsellor's current earnings picture.

**Earnings Summary:** Three cards showing Total Incentive Earned, Amount Collected, and Pipeline Value.

**Incentive Slab Table:** Shows the counsellor's current slab tier, target for each metric, achievement so far, and the incentive amount unlocked at each slab. Colour-coded to show which slabs have been reached.

**Earnings Chart:** A bar chart comparing the counsellor's month-wise incentive earnings over the current year.

**Top Earners Leaderboard:** A split view showing the org-wide top earner and the cluster-level top earner for the current period.

**Offers & Promotions:** A scrollable row of active promotional offers (e.g. "Earn ₹5,000 extra for 3 deposits this week"). Each offer card shows the offer name, reward, deadline, and a "View Details" button.

---

### Feature 15 — Learning & Development Tab

A dedicated tab for counsellor upskilling.

**Course Updates:** Cards showing recently added or updated course content with the date added and a short description.

**Training Modules:** A list of training modules the counsellor can access. Each module shows a title, a short description, and a duration. Clicking opens a lesson view with the content.

**Quick Links:** A row of shortcut buttons for frequently needed resources — for example, LeapPay link, university portal, application tracker, and other external tools relevant to the counsellor's workflow.

---

### Feature 16 — Profile Page

Accessible by clicking the counsellor's avatar in the top navigation bar. Displays:
- Counsellor name, role, and branch
- Contact details
- Performance summary for the current period
- Badge collection: all badges earned, with name, description, and date awarded
- A button to raise a support ticket

---

### Feature 17 — Badge and Achievement System

Counsellors earn badges for hitting milestones (e.g. "First STI", "10 Lock-ins", "Top Performer — May 2026"). Badges are displayed on the profile page and as a strip in the top navigation bar showing recently earned badges with icons and count.

The Admin panel allows admins to define badge types and manually award badges to specific counsellors.

---

### Feature 18 — Notification Bell

An alert icon in the top navigation bar with an unread count badge. Clicking it opens a drawer listing recent system notifications and alerts — for example, a student's follow-up date passed without a call logged, or a new offer is live.

---

### Feature 19 — Admin Panel

Accessible only to users with the Admin role. A dedicated tab in the navigation bar. Contains the following management sections:

**Users:** A table of all registered counsellors and managers. Admins can add new users (name, email, role, branch) and see the list of existing users. Editing and deletion of users is not in v0 — managed through direct data updates.

**Training Content:** Admins can add, edit, and remove training modules and course updates visible on the Learning & Development tab.

**CSV Import:** Admins can upload a CSV file to bulk-import student data or performance records. A preview of the uploaded data is shown before confirming.

**Support Tickets:** A table of all support tickets raised by counsellors from their profile pages. Shows ticket subject, submitter name, date, and status.

**Offers Management:** Admins can create, edit, and remove promotional offers visible on the Incentives & Earnings tab. Each offer has a name, description, reward amount, and expiry date.

**Badges Management:** Admins can define badge types and award specific badges to specific counsellors. A modal allows them to select the badge type and recipient.

**Info Hub Management:** Admins can add, edit, and remove university entries in the information hub used by the CRM assistant bot.

**Bot & FAQ Settings:** Admins can configure the CRM assistant bot — toggle it on/off for all users, set the Business Head's name, designation, and contact details, and manage the FAQ entries the bot uses to answer common questions. Each FAQ entry has a keyword list, an answer, and an optional navigation target (screen the bot should direct the user to).

---

## Screens

### Screen 1 — Login Screen

**Purpose:** Authenticate the user and direct them to the correct role-based view.

**What the user sees:**
- Leap CRM logo and product name
- "Sales Intelligence Platform" tagline
- Email input field
- Password input field with a show/hide toggle
- Role dropdown (Counsellor / Manager / Admin)
- Log In button
- Forgot Password link (non-functional in v0 — placeholder only)

**What the user can do:**
- Enter credentials and select a role
- Click Log In to authenticate
- Toggle password visibility

**Empty state:** All fields blank on first load.
**Error state:** Inline error message below the form: "Incorrect email, password, or role. Please try again." After multiple failed attempts: "Too many failed attempts. Please try again in a few minutes."

---

### Screen 2 — Tasks & Performance Tab

**Purpose:** The primary daily workspace for the counsellor. Shows everything they need to act on today.

**What the user sees:**
- Navigation bar at the top with the Leap CRM logo, badge strip, notification bell, and profile avatar
- Tab bar below the navigation: Tasks & Performance (active), Incentives & Earnings, Learning & Development, Admin (admin only)
- Boost Task Cards section (two cards: Boost STI, Boost Deposit)
- WhatsApp Coverage chips
- Volume Metrics grid
- Quality Metrics grid
- Team Chat section
- Log Task section
- Stand-Up Table section with filters
- Leaderboard section
- Daily Scorecard section

**What the user can do:**
- Click a Boost card to open the relevant drawer or funnel view
- Click a WhatsApp chip to open a group coverage breakdown
- Click any number in the Stand-Up Table to drill down into the student list
- Log a task using the Log Task form
- Send a message in Team Chat
- Switch leaderboard periods (Today / Month / Year)
- Apply filters to the Stand-Up Table

**Empty state:** If no students are assigned, Boost cards show "0 students" and the Stand-Up Table shows "No data for selected filters."
**Error state:** If data fails to load, each section shows a muted "Unable to load — try refreshing" message in place of its content.

---

### Screen 3 — Incentives & Earnings Tab

**Purpose:** Shows the counsellor how much they have earned and what they need to do to unlock the next incentive tier.

**What the user sees:**
- Earnings summary (three tiles: Total Earned, Collected, Pipeline)
- Slab table with tier progress
- Earnings chart (monthly bar chart)
- Top earners leaderboard (org-wide + cluster)
- Offers and promotions row

**What the user can do:**
- View their incentive breakdown
- Browse active offers
- Click an offer to see its full details in a drawer

**Empty state:** "No earnings data for this period yet."

---

### Screen 4 — Learning & Development Tab

**Purpose:** Central place for counsellors to access training and upskilling content.

**What the user sees:**
- Course Updates section (recent content additions)
- Training Modules list (with title, description, duration)
- Quick Links row

**What the user can do:**
- Click a training module to open the lesson view
- Click a quick link to open the relevant external tool or resource

**Empty state:** "No training content available yet." shown in each empty section.

---

### Screen 5 — Admin Panel Tab

**Purpose:** Back-office configuration for admins only.

**What the user sees:**
- A sub-navigation bar with sections: Users, Training, CSV Import, Tickets, Offers, Badges, Info Hub, Bot Settings
- The active section's content below

**What the user can do:**
- Switch between admin sections using the sub-nav
- Perform CRUD operations on each section (details under Forms section below)

**Access control:** This tab is only visible when the user is logged in with the Admin role. All other roles see no Admin tab.

---

### Screen 6 — Student Detail Page (Full-Screen Overlay)

**Purpose:** Complete view of a single student's profile, pipeline status, and tasks.

**What the user sees:**
- Back button and student name in the header
- Call button to initiate a call
- Pipeline stage badge
- Student information: follow-up date, last call date, last call outcome, quality score, app download status, last connected timestamp
- Task checklist: each task with its label, done/pending status, timestamp and notes (if done)
- WhatsApp groups list with counsellor-joined and student-joined indicators

**What the user can do:**
- Tap the back button to return to the previous screen
- Click the Call button to call the student
- Mark a task as done by clicking on it
- View WhatsApp group coverage at the student level

**Empty state (tasks):** "No tasks assigned for this student yet."

---

### Screen 7 — Bot Panel (Overlay)

**Purpose:** AI assistant for on-demand help, pipeline queries, and information lookup.

**What the user sees:**
- Bot header with name ("Leap CRM Assistant") and close button
- Three tabs: Chat, Action Items, Info Hub
- Chat: message thread with user and bot bubbles, quick-reply buttons, input field
- Action Items: numbered list of today's recommended actions
- Info Hub: searchable list of universities with filter chips by country and intake

**What the user can do:**
- Type a message and receive a bot response
- Tap quick-reply buttons to continue a guided flow
- Switch between the three tabs
- Search the Info Hub by university name
- Filter Info Hub by country or intake period
- Clear the chat history (admin users only)

---

### Screen 8 — Profile Page

**Purpose:** Personal profile and badge showcase for the counsellor.

**What the user sees:**
- Name, role, branch, and contact details
- Performance summary for the current period
- Badge grid showing all earned badges with icons, names, and award dates
- Raise a Ticket button

**What the user can do:**
- View their earned badges
- Click Raise a Ticket to open the ticket submission form

---

## Forms

### Form 1 — Log Task

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Task Type | Dropdown | Yes | Call Made, Lead Contacted, Enrolment Closed, Revenue Collected, Follow-up Done, STI Submitted, Application Submitted, Deposit Collected, Lock-in Achieved |
| Notes | Text | No | Optional free-text field |

**On submit:** The relevant metric card on the dashboard updates immediately. A success toast notification appears ("Task logged successfully").
**Validation:** Task type must be selected. If no type is selected, the Log button does nothing.

---

### Form 2 — Add User (Admin)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | Text | Yes | — |
| Email Address | Email | Yes | Must be a valid email format |
| Role | Dropdown | Yes | Counsellor, Manager, Admin |
| Branch | Text | No | — |

**On submit:** User is added to the users table. A success toast appears. The modal closes.
**Validation:** Name, email, and role are required. If email format is invalid, an inline error appears.

---

### Form 3 — Create Offer (Admin)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Offer Name | Text | Yes | Max 60 characters |
| Description | Textarea | Yes | — |
| Reward Amount | Number | Yes | In INR |
| Expiry Date | Date picker | Yes | Must be a future date |

**On submit:** Offer is added to the offers row on the Incentives tab. Modal closes. Success toast shown.
**Validation:** All fields required. Expiry date must be today or future.

---

### Form 4 — Add FAQ Entry (Admin)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Keywords | Text | Yes | Comma-separated trigger words |
| Answer | Textarea | Yes | The bot's response text |
| Navigation Target | Text | No | Optional screen or section to link to |

**On submit:** FAQ entry is saved and the bot will use it for matching future queries. List updates immediately.

---

### Form 5 — Raise a Ticket (Counsellor)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Subject | Text | Yes | Max 100 characters |
| Description | Textarea | Yes | — |
| Priority | Dropdown | No | Low, Medium, High |

**On submit:** Ticket is submitted and appears in the Admin panel's Tickets section. A success message is shown. Modal closes.

---

### Form 6 — Award Badge (Admin)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Badge Type | Dropdown | Yes | All configured badge types |
| Recipient | Dropdown | Yes | All registered counsellors |

**On submit:** Badge is awarded to the selected counsellor. It appears on their profile and in the badge strip. Success toast shown.

---

## Logic and Rules

**Pipeline Stage Movement**
- A student's stage can be updated by the counsellor from the Student Detail Page
- Stages move forward only: STI → Application → Deposit → Lock-in
- Stage changes are manual — no automatic triggers
- Once a stage is updated, it cannot be reversed in v0

**Role-Based Tab Visibility**
- Counsellor: sees Tasks & Performance, Incentives & Earnings, Learning & Development
- Manager: sees same tabs as Counsellor, plus a Counsellor Selector dropdown in the header to switch views
- Admin: sees all tabs including Admin Panel

**Counsellor Selector (Manager and Admin only)**
- A dropdown appears in the top navigation bar when a Manager or Admin is logged in
- Selecting a different counsellor loads that counsellor's full dashboard view across all tabs
- The selected counsellor's name is shown in the header to make it clear whose data is being viewed

**Boost Card Counts**
- Boost STI count = number of students in the STI stage for the currently viewed counsellor
- Boost Deposit count = number of students in the Deposit stage

**Stand-Up Table Filters**
- Filters are applied independently — Intake, Location, and Country can each be set or left as "All"
- Clicking Apply runs the filter; clicking Reset restores all filters to "All"
- If filtered results return zero rows, an empty message is shown instead of a blank table

**Bot Escalation to Business Head**
- If the counsellor asks to speak to the Business Head, the bot surfaces the Business Head's name, designation, and contact details (as configured by the admin)
- No live connection or transfer occurs — the bot simply displays the contact information

**Login Attempt Lockout**
- After 5 failed login attempts, the account is temporarily locked
- A message informs the user of the lockout and asks them to try again after a set period

**WhatsApp Group Coverage Calculation**
- Counsellor coverage = (groups the counsellor has joined) / (total groups across all their students)
- Student gap count = total instances where a student is not in a group they should be in

---

## Edge Cases

| Situation | What the app does |
|-----------|-------------------|
| Stand-Up Table filtered to show no matching rows | Shows message: "No data for selected filters. Try adjusting Intake, Country, or Location." |
| Counsellor tries to log a task without selecting a type | Log button does nothing; dropdown border highlights to draw attention |
| Student has no tasks assigned | Student Detail Page shows "No tasks assigned for this student yet." |
| Bot receives a query it does not recognise | Bot responds: "I didn't quite get that. You can ask about your pipeline, today's targets, or your students." |
| Admin opens the Counsellor Selector with only one counsellor in the system | Dropdown shows that single counsellor as the default; selector is still visible |
| Offer expiry date is set in the past | Admin form shows inline error: "Expiry date must be today or a future date." |
| A student is in no WhatsApp groups | The WhatsApp Coverage chip shows 0/0 for groups and the student does not appear in the "Students NOT in group" drawer |
| Badge is awarded to the same counsellor twice for the same badge type | No deduplication in v0 — the badge appears twice in their collection |
| User opens the app on a mobile browser | The layout is single-column and all interactions remain accessible. The fixed bottom-right bot bubble remains visible. |
| Login credentials are correct but role selected does not match the user's actual role | Login fails with the standard error message: "Incorrect email, password, or role." |

---

## Admin and Settings

The Admin Panel is a dedicated tab visible only to Admin-role users. It is divided into the following sections, navigated via a sub-tab bar:

**Users** — View all registered users in a table. Add new users via a modal form (Name, Email, Role, Branch).

**Training** — Add and manage training modules and course update cards shown on the Learning & Development tab.

**CSV Import** — Upload a CSV file to bulk-import data. A preview table is shown before confirming the import.

**Tickets** — View all support tickets raised by counsellors. Shows submitter name, subject, date, and priority.

**Offers** — Create and manage promotional offers shown on the Incentives tab. Each offer has a name, description, reward, and expiry date.

**Badges** — Define badge types and manually award them to counsellors. View all badge types configured in the system.

**Info Hub** — Add and manage university entries used by the CRM assistant bot's Info Hub tab. Each entry includes university name, country, city, type, intake dates, deposit amount, deposit deadline, refund policy, and payment notes.

**Bot & FAQ Settings** — Configure the bot: toggle it on or off for all users, set the Business Head's contact details, and manage FAQ entries the bot uses for answering counsellor questions.

---

## FAQs

**What happens when a manager wants to see a specific counsellor's performance?**
The manager uses the Counsellor Selector dropdown in the top navigation bar to switch to that counsellor's view. All tabs — Tasks & Performance, Incentives & Earnings, and Learning & Development — then reflect that counsellor's data.

**Can a counsellor see another counsellor's data?**
No. Counsellors only see their own data. Only Managers and Admins have the Counsellor Selector to switch between views.

**What happens when the admin toggles the bot off?**
The floating orange chat bubble is hidden for all users immediately. Turning it back on makes the bubble reappear.

**How does the Stand-Up Table know which students make up each number?**
Each clickable number in the table is linked to a specific metric. Clicking opens a drawer that filters the student list based on the relevant pipeline stage or activity type for that metric.

**What if a counsellor's follow-up date passes without any action logged?**
The notification bell in the top navigation bar will show an alert for overdue follow-ups. The bot's Action Items tab will also surface this as a recommended action.

**How are incentive slabs calculated?**
Slab tiers are pre-configured in the system. The counsellor's logged activity (STIs, Applications, Deposits, Lock-ins) is compared against the thresholds for each slab, and the highest tier reached determines the incentive amount displayed.

**Can a counsellor edit a task after marking it done?**
Not in v0. Tasks are marked as done with a timestamp and notes. There is no edit or undo action.

---

## What v0 Does Not Include

- **Real-time data sync across devices** — Data reflects the session state. Multi-device live sync is a v1 consideration once a backend is integrated.
- **Automated notifications (SMS or email)** — The notification bell and bot action items are in-app only. No emails or SMS are sent in v0.
- **Password reset functionality** — The Forgot Password link is a placeholder. Password management requires a backend auth system not included in v0.
- **Bulk student import by counsellors** — Counsellors cannot upload their own student lists. Only admins can import data via the CSV import tool.
- **Two-way WhatsApp integration** — WhatsApp group status is tracked within the app but there is no direct connection to WhatsApp's API. Group membership must be updated manually or via import.
- **Mobile native app (iOS / Android)** — v0 is a web application that works on all devices including mobile browsers. A native app is not in scope for v0.
- **Revenue analytics and org-wide reporting dashboards** — Reporting in v0 is per-counsellor and per-team via the stand-up table. Org-wide trend dashboards are a future addition.
- **Student-facing portal** — v0 is entirely internal. Students do not have login access or a self-service view.

---

## How You'll Know It's Working

- Counsellors stop using WhatsApp threads and Excel sheets to track which students need follow-up today — the Boost cards and student detail page replace that entirely
- Managers can run a daily stand-up without asking counsellors to verbally report their numbers — the Stand-Up Table provides the full picture in one screen
- No student falls out of the funnel between STI and Lock-in without the counsellor being prompted — the Boost cards and overdue follow-up alerts surface gaps before they become misses
- Admins can configure the entire product — user access, content, offers, bot responses — without touching code
