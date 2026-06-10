# Leap CRM — Product Requirements Document (PRD)

**Document Version:** 1.0
**Date:** 31 May 2026
**Prepared by:** Business Team
**Intended Audience:** Product Team

---

## 1. Product Overview

Leap CRM is a web application for the internal counselling and sales team of an EdTech organisation. It gives each user — Counsellor, Team Lead, Ops Admin, or Business Head — a personalised view of performance data, student pipeline health, incentive earnings, and learning resources, all in one place.

The product is role-aware: what a user sees and can do is determined entirely by their assigned role. The same URL serves all roles; the interface adjusts automatically based on who is logged in.

The platform is organised around four main tabs accessible from the top navigation bar:
1. **Tasks & Performance** — Daily metrics, standup table, student pipeline health
2. **Incentives & Earnings** — Earning visibility, live offers, incentive drives
3. **Learning & Development** — Info Hub, training, newsletter, quick links
4. **Admin Panel** — Configuration and management (Ops Admin only)

Two floating communication features are accessible from every page regardless of which tab is active:
- **Chat with Business Team** (Bot assistant)
- **Chat in Internal Team** (Live team chat)

---

## 2. User Roles

| Role | Login | What they see | Admin Panel |
|---|---|---|---|
| Counsellor | Personal login | Own data only | No |
| Team Lead | Personal login | Own data + their team's data | No |
| Ops Admin | Personal login | All teams, all counsellors, all data | Yes |
| Business Head | Personal login | All teams, all counsellors, all data | No |

Role is assigned at the time of account creation by Ops Admin. A user cannot change their own role.

---

## 3. Login Screen

**What the user sees:**
- The Leap CRM logo and product name
- An email input field
- A password input field with a show/hide toggle
- A role selector dropdown (Counsellor / Team Lead / Ops Admin)
- A "Log In" button
- A "Forgot password?" link (shows a placeholder message — not functional in this version)

**What the user can do:**
- Enter credentials and log in
- Toggle password visibility

**On successful login:** User is taken directly to the Tasks & Performance tab.
**On incorrect credentials:** An inline error message appears below the form: "Incorrect email or password. Please try again."
**Empty fields on submit:** Inline error under each empty field. Form does not submit.

---

## 4. Global Navigation (Visible on All Screens After Login)

**Top bar — always visible:**
- Leap CRM logo and name (top left)
- Tab navigation: Tasks & Performance | Incentives & Earnings | Learning & Development | Admin Panel (Ops Admin only)
- Trophy and Star icons showing the user's badge count (clicking opens a badge summary)
- Notification bell with an unread count badge (red circle)
- Logged-in user's avatar and name (top right) — clicking opens a dropdown

**Avatar dropdown options:**
- "View Profile" — opens the Profile Page
- "Log Out" — ends the session and returns to the Login Screen

**10x Session Banner:**
A full-width purple banner below the tab bar reading: "Your 10x session is live! Join now to stay on track with your team." with a "Join 10x →" button. This banner is shown whenever a 10x session is live (URL configured by Ops Admin). Clicking the button opens the session URL in a new tab.

---

## 5. Tab 1 — Tasks & Performance

The default landing tab after login. The primary daily-use screen.

---

### 5.1 Stand Up Table

**Who sees it:** Team Leads (their own team only), Ops Admin (all teams), Business Head (all teams).
Counsellors do NOT see the standup table.

**Purpose:** A single scannable table showing every counsellor's daily and monthly performance against targets — used to run the team standup meeting without any external sheets.

**What the user sees:**

A filter row above the table containing:
- **Location** — dropdown selector
- **Team Lead** — dropdown selector
- **Counsellor** — dropdown selector
- **CA Date (Counsellor Assigned Date)** — two date fields: "From" and "To" with a calendar icon label
- **Apply** button and **Reset** button

A data table:
- One row per counsellor
- Columns: Counsellor Name, Calls, Leads, Enrolments, Revenue, Follow-ups, STIs, Applications, Deposits, Lock-ins, F2F Meetings, ISL Rating, Referral %, Quality Score, Revenue Collected
- Each metric cell shows three stacked values: Daily Actual / MTD Actual / YTD Actual

**Achievement colour logic (for MTD and YTD values):**
- Achievement ≥ 100% of target → cell shown in **Green**
- Achievement < 100% of target → cell shown in **Red**
- There is no amber or yellow middle state. Only Green or Red.

**Filter behaviour:**
- Filters narrow which counsellors appear and scale the displayed values proportionally to the filtered student set
- CA Date filter: shows only counsellors whose students were assigned to them within the chosen date range
- "Apply" refreshes the table with filters active
- "Reset" clears all filters and restores the full unfiltered table

**Empty state (filters return no results):** "No counsellors match the selected filters." shown in the table body.

---

### 5.2 Individual Scorecard (Your Standup)

**Who sees it:** All roles. Each user sees only their own scorecard.

**Purpose:** A personal summary of the logged-in user's performance from the previous day.

**What the user sees:**
- Section header: "Your Standup — Yesterday, [Date]"
- Subheading: "Counsellor at [Location] · [Team Lead name]'s Team"
- A chevron toggle button in the top-right — clicking collapses or expands the section
- When expanded: a row of metric tiles for yesterday's values — Calls, Leads, Enrolments, Revenue, STIs, Applications, Deposits, Lock-ins, Referral %, Quality Score

---

### 5.3 Action Required — Boost Cards

**Who sees it:** All roles.

**Purpose:** Two high-priority action cards prompting the user to take immediate revenue or task-related actions.

**What the user sees:**
Two cards displayed side by side, labelled "ACTION REQUIRED — BOOST TASKS":

**Card 1 — Boost Revenue (orange)**
- Shows total revenue collected this month vs. monthly target
- Count of revenue-generating opportunities available
- Description: "Revenue-generating opportunities"
- "View Pipeline" button

**Card 2 — Own Tasks (blue)**
- Count of pending tasks the user has logged for themselves
- Description: "Tasks you need to complete"
- "View Tasks" button

**On clicking "View Pipeline":** A right-side drawer opens listing students who represent revenue opportunities. Each student card shows: name, ID, course, country, stage, and follow-up date. Clicking a student opens their Student Detail Page.

**On clicking "View Tasks":** A right-side drawer opens listing all pending tasks. Each task shows: student name, task type, and due date. Clicking a student opens their Student Detail Page.

---

### 5.4 Volume Metrics

**Who sees it:** All roles. Data is scoped to the logged-in user's own portfolio for Counsellors; Team Leads and above see aggregated team-level totals.

**Purpose:** Three metrics showing operational volume and pipeline health.

**Metrics:**

**1. Tasks Completed**
- Count of tasks marked complete today
- Shown in Green when at or above target; Red when below target

**2. Unhappy Cohort**
- Count of students with a low ISL rating (below the defined threshold)
- Always shown in Red — this is a negative quality metric

**3. Deferrals Opportunity**
- Count of students who are a deferral opportunity
- Shown in a distinct "opportunity" style (purple-tinted) — this is neither a failure nor a success; it is an actionable pipeline item

A student qualifies as a Deferrals Opportunity if either condition is true:
- They have an admit from a previous intake AND have not yet paid their deposit
- They have paid their deposit AND have not yet completed their visa process

**Clicking any metric card:** Opens a right-side drawer with the list of students driving that metric. Each student card shows: name, ID, course, country, stage, and follow-up date. Clicking a student opens their Student Detail Page.

---

### 5.5 Quality Metrics

**Who sees it:** All roles.

**Purpose:** Four metrics showing the quality of the counsellor's engagement with students.

**Metrics:**

**1. ISL Rating**
- Average ISL score across the counsellor's active students
- Higher is better. Green if above target; Red if below.

**2. Referral %**
- Percentage of students who have referred another student
- Higher is better. Green if above target; Red if below.

**3. Quality Score**
- An overall quality score
- Higher is better. Green if above target; Red if below.

**4. WA Not Replied**
- Count of students who asked a question in a WhatsApp group that has not been answered
- **Always shown in Red when count is greater than 0.** Target for this metric is zero — any positive count is a problem.
- Shown in Green only when count equals 0.

**WA Not Replied drill-down drawer:** When clicked, shows for each student:
- Student name and lead status
- The question they asked
- The date the question was asked

---

### 5.6 Top Performers Leaderboard

**Who sees it:** All roles.

**Purpose:** A ranked list of top-performing counsellors for recognition and benchmarking.

**What the user sees:**
- Section header: "Top Performers"
- Three tab buttons: Today | This Month | This Year — clicking each switches the leaderboard data
- A ranked list with: rank number or medal (🥇 🥈 🥉 for top 3), avatar initials, full name, and a relative progress bar
- The section is collapsible via a chevron toggle

---

### 5.7 Reminder & Task Logger

**Who sees it:** Counsellors and Team Leads only.

**Purpose:** Allows a user to log a task or reminder linked to a specific student.

**What the user sees:**
- Section header: "Add a Reminder for Yourself"
- A chevron toggle to collapse/expand the section
- When expanded: four task type buttons — Call | Send Message | Payment Follow Up | Custom Task
- Selecting a task type reveals the input form below

**Form fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Task Type | Pre-selected from button | Yes | Auto-filled when user clicks task type button |
| Student Name / ID | Text input | Yes | |
| Task Name | Text input | Yes (Custom Task only) | Only visible when Custom Task is selected |
| Due Date & Time | Date and time picker | Yes | |

**On save:** Task is logged and appears in the Own Tasks section of the Action Required boost card.
**Validation:** If Student Name is empty, an inline error appears beneath the field: "Please enter a student name." Form does not save until corrected.

---

### 5.8 Student Detail Page

**Who sees it:** All roles. Accessed by clicking any student name from any list within the platform.

**Purpose:** The full profile and activity record for a single student.

**What the user sees:**
- A "← Back" button in the top-left, returning to whichever screen the user came from
- Student's full name as the page title
- A "📞 Call" button in the top-right

**Current Stage indicator:**
A horizontal progress bar showing the four pipeline stages in sequence: STI → Application → Deposit → Lock-in. The current stage is highlighted in orange. Earlier stages are shown as completed (green). Later stages are greyed out.

**Student information fields:**
- User ID
- Course
- Country
- Last Call (date and outcome note, e.g. "21 May 2026 — Promise to Pay")
- Follow-up Date (shown in red/orange if the date is overdue)
- App Status (Downloaded / Not Downloaded — shown as a green badge if downloaded)
- Quality Score (shown as a number out of 100)
- Last Connected Date

**WhatsApp Groups section:**
- Lists all WhatsApp groups the student is part of
- For each group: whether the counsellor (You) is in the group ✅ or ❌, and whether the student is in the group ✅ or ❌

**WhatsApp Messages section:**
- A collapsible section showing "WhatsApp Messages ([count])"
- When expanded: each message shows the question asked and the date

**Subtasks section:**
- Lists all tasks logged for this student
- Each task shows: task type, date, completion status (completed tasks shown with strikethrough text and a checkbox checked)

---

## 6. Tab 2 — Incentives & Earnings

A dedicated tab giving counsellors and Team Leads full transparency into their incentive earnings, active drives, and what to do to earn more.

---

### 6.1 Earnings Summary Banner

**What the user sees:**
Three metric cards displayed horizontally at the top of the tab:

**Card 1 — Earned So Far**
- Total incentive amount earned in the current month
- White card on dark background

**Card 2 — Projected at 100%**
- The amount the user would earn if they hit 100% of all their targets for the current month
- Blue card

**Card 3 — Opportunity Size**
- The total pipeline value across students who could still convert this month
- Orange card with a clickable arrow — clicking opens a right-side drawer with the list of students making up this pipeline value

---

### 6.2 Live Offers for Students

**Purpose:** Promotional campaigns that counsellors pitch to students to drive conversions. Created and published by Ops Admin.

**What the user sees:**
- Section header: "Live Offers for Students"
- A horizontally scrollable row of offer cards (scroll left/right if more than 3 offers)
- Each offer card (orange/warm coloured) shows:
  - Category badge (e.g. "🔒 Boost Lock-in", "📋 Boost STI")
  - Offer title (bold)
  - Offer description
  - Expiry date (highlighted in yellow if expiry is within 3 days)
  - A "See Students →" button

**On clicking "See Students →":** A right-side drawer opens with the list of students eligible for that offer. Each student card shows: name, ID, course, stage, follow-up date, and ISL rating. Clicking a student opens their Student Detail Page.

**Empty state:** "No live offers for students right now. Check back soon."

---

### 6.3 Live for Counsellors

**Who sees it:** Counsellors and Team Leads only. Ops Admin does NOT see this section — it is hidden entirely when an Ops Admin is logged in.

**Purpose:** Performance-based incentive campaigns that counsellors can personally earn from. Created and published by Ops Admin.

**What the user sees:**
- Section header: "Live for Counsellors" with a "For You" orange badge
- A horizontally scrollable row of offer cards
- All cards use a **blue colour scheme** (no orange, no other colours)
- Each card shows:
  - A small category badge in the top-left (e.g. "Performance Sprint", "Revenue Challenge", "Referral Boost")
  - A small chevron arrow (›) in the top-right corner indicating the entire card is clickable
  - Offer title (bold)
  - Offer description
  - Expiry date (urgency styling if within 3 days)
  - Reward description with a gift icon (e.g. "🎁 ₹3,000 Gift Voucher")
  - A "View Details →" label at the bottom right

**Clicking anywhere on the card** (not just the "View Details" label — the entire card is interactive) opens a right-side drawer.

**Counsellor Offer Drawer — what the user sees:**

*Section 1 — Incentive Structure*
- A table with two columns: Milestone | Reward
- Lists each earning threshold and its corresponding reward
- Example rows: "1st Place → ₹3,000 Gift Voucher + 🏅 Profile Badge", "2nd Place → ₹1,500 Gift Voucher"

*Section 2 — Students to Target*
- A brief italicised description explaining which students to focus on for this offer
- A list of specific students from the counsellor's portfolio who match the offer's target criteria
- Each student card shows: name, ID, course, country, stage badge (orange pill), follow-up date, ISL rating, and an "Open profile →" link
- Clicking any student card opens the Student Detail Page

**Empty state (no matching students):** "No matching students for this offer right now."

---

### 6.4 Incentive Breakdown

**Purpose:** A structured view of all active incentive components showing the rules, the drive period, current achievement status, money earned, and which counsellors have earned.

**What the user sees:**
- Section header: "Incentive Breakdown" (the entire header is a collapsible toggle — clicking collapses or expands the section)
- A chevron icon in the top-right of the header rotates to indicate the state (pointing up = expanded, pointing down = collapsed)
- A hint text in the header: "Click any row to see earners ▾"

**When expanded — a table with four columns:**
- **Component & Drive Period** — Component name (e.g. STI, Deposits, Non Partner Revenue, Lock In) with the drive date range below (e.g. "📅 01 May – 31 May 2026")
- **Rule** — The earning rule in plain text (e.g. "₹2,500 per STI converted")
- **Status** — A badge showing achievement (e.g. "7 STIs (100%)" in orange, "3 deposits (75%)" in blue, overachievement in green)
- **Earned** — The rupee amount earned in bold, with a note showing how many counsellors earned from this component (e.g. "👥 5 earned ▾")

**Components always shown (in this order):**
1. STI
2. Deposits
3. Non Partner Revenue
4. Lock In

**Clicking a row** expands an inline sub-section directly below that row:
- Sub-section header: "Counsellors who earned — [Drive Period]"
- A list of counsellors sorted by amount earned descending
- Top 3 are shown with 🥇 🥈 🥉 medals
- Each entry shows: counsellor name, how many units they converted (e.g. "12 STIs"), and the amount they earned
- Clicking the same row again collapses the sub-section
- Multiple rows can be expanded simultaneously

**Footer row:** "Total" label in the left cell and the combined earned amount across all components in the right cell.

---

### 6.5 Top Earners Leaderboard

**Purpose:** Recognition and visibility for the highest-earning counsellors.

**What the user sees:**
- Section header: "Top Earners"
- Two columns side by side: "This Month" | "All Time"
- Each column shows a ranked list with: rank medal or number, avatar initials circle (coloured by rank — gold for 1st, silver for 2nd, bronze for 3rd, orange for others), counsellor name, and a progress bar showing relative earnings

---

### 6.6 Monthly Earnings Chart

**Purpose:** A bar chart showing the logged-in user's incentive earnings month by month for the current Financial Year.

**What the user sees:**
- Section header: "Monthly Earnings — FY 2026–27" (collapsible — clicking the header toggles open/closed, chevron rotates)
- When expanded: a vertical bar chart with 12 bars, one per month from April to March
- Month labels on the X-axis: Apr 26, May 26, Jun 26, Jul 26, Aug 26, Sep 26, Oct 26, Nov 26, Dec 26, Jan 27, Feb 27, Mar 27

**Bar colour logic:**
- Months before the current month (already passed) → **Blue** bars
- The current month → **Green** bar
- Months after the current month (no data yet) → **Light grey** placeholder bars

**On hover over a bar:** A tooltip shows the exact rupee amount for that month.
**Future month bars:** No tooltip amount shown (no data exists).

---

## 7. Tab 3 — Learning & Development

A centralised resource hub for all counselling team members. Replaces scattered information previously shared via WhatsApp, email, and Google Drive.

---

### 7.1 Quick Links (Top of L&D Tab)

Three action cards displayed horizontally at the top of the tab:

**Card 1 — Join 10x**
- Rocket icon, label "Join 10x →"
- Clicking opens the 10x session URL (configured by Ops Admin) in a new tab
- If no URL is configured: clicking shows a toast message: "No session link configured. Please contact Ops."

**Card 2 — Templates Sheet**
- Spreadsheet icon, label "Open Templates"
- Clicking opens the Templates Google Sheet URL (configured by Ops Admin) in a new tab

**Card 3 — Support**
- Support icon, label "Raise a Request"
- Clicking opens the Support Ticket modal

**Support Ticket Modal:**
| Field | Type | Required | Notes |
|---|---|---|---|
| Subject | Text | Yes | Max 200 characters |
| Description | Textarea | No | Optional detail |

On submit: Ticket is created and appears in Admin Panel → Tickets. A confirmation toast shows: "Your request has been submitted. The Ops team will get back to you."
On submit with empty Subject: Inline error below the field: "Please enter a subject." Modal does not submit.

---

### 7.2 Info Hub Sub-tab

**Navigation:** A horizontal sub-tab bar with five section buttons:
Key Deadlines | Scholarship Finder | University News | Training & Guidelines | Partnered Institutes

Clicking each button switches the content area below. The active section is highlighted.

---

#### Key Deadlines

**What the user sees:**
- Three filter tabs: Today | Tomorrow | Upcoming Deadlines
- A list of deadline cards, each showing: university name, deadline type (Application / Deposit / Visa), and deadline date
- Each card can be clicked to see the full university profile

**Empty state:** "No deadlines for [Today / Tomorrow / Upcoming]. Check back later."

---

#### Scholarship Finder

**What the user sees:**
- A search bar — typing filters the list by university name or scholarship name in real time
- A list of scholarship cards, each showing: university name, scholarship name, eligibility criteria, scholarship amount, and application deadline

**Empty state (no search results):** "No scholarships found for '[search term]'."

---

#### University News

**What the user sees:**
- A list of news cards, each showing: university name, news headline, date published, and a brief summary excerpt

---

#### Training & Guidelines

**What the user sees:**
- A list of training modules, each as a collapsible card
- Each module header shows: module name and lesson count (e.g. "Sales Fundamentals — 3 lessons")
- Clicking a module header expands it to show the list of items within
- Each item shows: item title, brief description, and a type badge (Video / Document / Link)
- Clicking an item opens the associated content

---

#### Partnered Institutes

**What the user sees:**
- A list of university cards showing: university name, country flag emoji, city, and type (Public / Private)
- Clicking a university card opens a full detail panel

**University detail panel shows:**
- University name and country
- Description
- Website link (opens in new tab)
- Available intake dates
- Deposit amount in INR and local currency
- Deposit deadline
- Refund policy
- Payment notes
- Available courses — a list with: course name, duration, fee per year, and entry requirements
- Required documents — a bulleted list
- Scholarship details: scholarship name, eligibility, amount, and deadline
- Last updated by [name] on [date]

---

### 7.3 Newsletter Sub-tab

**What the user sees:**
- A filter bar with: Category (dropdown), Date From, Date To, Tags (multi-select)
- A "Reset Filters" button
- A feed of newsletter entries, each as a card with: headline, date, category badge, and a brief excerpt
- Clicking a card expands it to show the full newsletter content inline

**Empty state:** "No newsletters match the selected filters."

---

## 8. Admin Panel

Accessible only to Ops Admin. The tab is not visible to any other role. If a non-Ops Admin user navigates to the Admin Panel URL directly, they are redirected to the Tasks & Performance tab without an error message.

**Sub-section navigation:** A horizontal row of tabs within the Admin Panel:
Users | Corrections | Incentive Slabs | Quick Links | Training | Tickets | Offers | Badges | Bot Settings | Info Hub

---

### 8.1 Users

**What the user sees:**
- A table of all users with columns: Name, Email, Role, Team, Designation, Joining Date, Manager
- An "Add User" button in the top-right

**Add User form:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | Text | Yes | |
| Email | Email | Yes | Must be valid email format |
| Role | Dropdown | Yes | Counsellor / Team Lead / Ops Admin |
| Team | Text | No | |
| Designation | Text | No | |

On submit: User is added to the system. Confirmation toast: "User added successfully."
On submit with empty required field: Inline error below the empty field. Form does not submit.

---

### 8.2 Data Corrections

**Purpose:** Manually correct a metric value for a specific counsellor on a specific date, to fix data source errors.

**What the user sees:**
- A form at the top to submit a new correction
- A log of all past corrections below the form

**Correction form:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Counsellor | Dropdown | Yes | All counsellors listed |
| Date | Date picker | Yes | |
| Metric | Dropdown | Yes | Calls / Leads / Enrolments / Revenue / STIs / Applications / Deposits / Lock-ins |
| Corrected Value | Number | Yes | The new correct number |

On submit: Correction is logged and the corrected value immediately updates the affected counsellor's dashboard and the standup table. Confirmation toast: "Correction submitted successfully."

**Past corrections log columns:** Date Submitted, Counsellor, Metric, Corrected Value, Submitted By.

---

### 8.3 Incentive Slabs

**What the user sees:**
- A table showing all incentive components: Component Name, Rule, Drive Period, Status, Earned Amount
- Each row is editable — Ops Admin can update the rule, status, and earned amount
- A "Save" button per row applies changes immediately

---

### 8.4 Quick Links

**What the user sees:**
- Two URL input fields: "Join 10x Session URL" and "Templates Sheet URL"
- A "Save Links" button

On save: The URLs go live immediately in the Quick Links section of Tab 3. Confirmation toast: "Links saved."

---

### 8.5 Training

**What the user sees:**
- A list of all training modules with their items (same structure as the counsellor-facing view)
- An "Add Module" button to create a new module
- Within each module: an "Add Item" button and a remove option per item
- Module names are editable inline

---

### 8.6 Support Tickets

**What the user sees:**
- A table of all support tickets raised by users, with columns: Subject, Raised By (user name), Date Submitted, Status
- Clicking a row expands it inline to show the full description of the ticket

---

### 8.7 Offers

**What the user sees:**
- A list of all published offers (both Student and Counsellor offers) with: title, offer type, expiry date, and active status
- A "Create Offer" button in the top-right

**Create Offer form:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Offer Title | Text | Yes | |
| Description | Textarea | Yes | |
| Offer Type | Dropdown | Yes | For Students / For Counsellors |
| Reward Description | Text | Yes | e.g. "₹3,000 Gift Voucher" |
| Expiry Date | Date picker | Yes | |

On submit: Offer is published immediately and appears in the relevant section for the correct audience. Confirmation toast: "Offer published successfully."

---

### 8.8 Badges

**What the user sees:**
- A list of all available badge types with their names and icons
- An "Award Badge" button that opens a small form to select a user and a badge type
- A log of all previously awarded badges with: badge name, awarded to, awarded by, and date awarded

---

### 8.9 Bot Settings

**What the user sees:**
- An on/off toggle to enable or disable the Business Team Bot
- Text fields: Bot Name, Greeting Message
- A FAQ knowledge base section listing all question-answer pairs
- A "+ Add FAQ Entry" button to add a new question and answer pair
- Each existing FAQ entry can be deleted
- A "Save Settings" button

On save: Settings go live immediately. The bot's name and greeting message update for all users. Confirmation toast: "Bot settings saved."

---

### 8.10 Info Hub Management

**What the user sees:**
- An "Add University" button
- A form to add a new university with all fields (name, country, city, type, description, website, intakes, deposit info, courses, documents required, scholarship details)
- Existing university entries listed below with the ability to edit or remove them

---

## 9. Global Features

### 9.1 Chat with Business Team (Bot)

**What it is:** A floating assistant available on every page of the platform.

**Trigger button:** Fixed to the right edge of every page, vertically positioned at approximately 42% from the top. Orange colour. Labelled "Chat with Business Team" in vertical text. Styled distinctly from the Internal Team Chat button. Does not move during scroll — it stays in place.

**On click:** A chat panel opens, anchored to the right side of the screen.

**Panel contents:**
- Panel header: "Chat with Business Team" and a close (×) button
- Two tabs: **Chat** | **Action Items**

**Chat tab:**
- A scrollable message history area showing past exchanges
- The bot's messages appear on the left, the user's messages on the right
- A text input field at the bottom — pressing Enter or clicking Send posts the message
- Bot responds to messages based on the FAQ knowledge base configured in Admin Panel → Bot Settings
- A "Clear chat" option (with a confirmation step before clearing)

**Action Items tab:**
- The same list of pending tasks shown in the Own Tasks boost card
- Shows task type, student name, and due date for each pending task

**Closing the panel:** Clicking the × button in the panel header closes it. The trigger button remains visible.

**Unread badge:** A red circle badge on the trigger button shows the count of unread bot messages. Resets to zero when the panel is opened.

---

### 9.2 Chat in Internal Team

**What it is:** A floating live team chat panel available on every page of the platform.

**Trigger button:** Fixed to the right edge of every page, at the bottom-right corner. Green colour (distinct from the orange Business Team bot). Labelled "Chat in Internal Team" in vertical text. Stays in position during scroll. Stays in position when the user navigates between tabs.

**Unread badge:** A red circle badge shows the count of unread messages from team members. Resets to zero when the panel is opened.

**On click:** A chat panel opens to the left of the trigger button.

**Panel contents:**
- Panel header: "Chat in Internal Team" and a green online count indicator (e.g. "● 3 online")
- A close (×) button in the header
- A scrollable message history area with team messages showing: sender avatar initials, sender name, message text, and timestamp
- A text input at the bottom — pressing Enter or clicking "Send" posts the message
- A "Clear chat" button (requires confirmation before clearing history)

**On opening the panel:** Unread count badge resets to zero and hides.

**State persistence:** If the panel is open and the user navigates to a different tab, the panel remains open and chat history is preserved. If the panel is open and the user opens a student detail page, the panel remains visible.

**Panel with a pulse animation on the trigger button:** The green trigger button has a subtle pulsing ring animation to draw attention when there are unread messages.

---

### 9.3 Notification Bell

**Trigger:** Bell icon in the top navigation bar with a red unread count badge.
**On click:** A dropdown appears below the bell listing recent notifications with notification text and timestamp.

---

### 9.4 Profile Page

**Accessed via:** Top-right avatar dropdown → "View Profile"

**What the user sees:**
- Full name and avatar initials circle
- Designation
- Team name and Manager name
- Joining date
- Email address
- A "← Back" button to return to the previous page

---

## 10. Logic and Rules

**Standup Table — Achievement Colour Logic**
- MTD or YTD achievement ≥ 100% of target → Green
- MTD or YTD achievement < 100% of target → Red
- No amber/yellow state exists anywhere in the standup table

**WA Not Replied — Always Red When Non-Zero**
- Count = 0 → Green card (no problem)
- Count > 0 → Red card, always, regardless of any percentage target calculation
- The target for this metric is always zero — any unanswered message is a failure state

**Deferrals Opportunity — Two-Condition Qualification**
- Condition A: Student has an admit from a prior intake AND deposit not paid → qualifies
- Condition B: Student has paid deposit AND visa not completed → qualifies
- If neither condition is true → student does not appear in this metric
- A student meeting either condition is included in the count and in the drill-down drawer

**Live for Counsellors — Role Visibility**
- Role = Ops Admin → Section is hidden entirely (not just greyed out — not rendered)
- Role = Counsellor or Team Lead → Section is visible

**Counsellor Offer Card — Entire Card Is Clickable**
- Clicking anywhere on the card (background, title, description, reward text, or the "View Details →" label) opens the offer detail drawer
- There is no separate action for just clicking the button vs. the card — the whole card is one clickable unit

**Standup CA Date Filter**
- Applying a CA Date range shows only counsellors whose students were assigned to them between the selected From and To dates
- Data values are scaled proportionally to the filtered student subset
- If the date range returns no matching counsellors: "No counsellors match the selected filters."
- Clicking Reset removes the date filter and restores all counsellors and their original values

**Monthly Earnings Chart — Colour Assignment**
- Months with a completed month index below the current month index → Blue
- Month matching the current month index → Green
- Months with a month index after the current month → Light grey (no value, no tooltip)
- Financial Year runs April (month 1) to March (month 12). Current FY: April 2026 to March 2027.

**Incentive Breakdown — Row Expansion**
- Clicking a row expands the earner sub-section below it
- Clicking the same row again collapses it
- Multiple rows can be expanded at the same time
- Expanding/collapsing a row does not affect other expanded rows

**Admin Panel — Access Restriction**
- If role ≠ Ops Admin → Admin Panel tab is not rendered in the navigation bar
- If a non-Ops Admin user navigates to the Admin Panel URL directly → they are silently redirected to Tasks & Performance

---

## 11. Edge Cases

| Situation | What the platform does |
|---|---|
| Counsellor has no students in their portfolio | All metric cards show 0. Drill-down drawers show: "No students to display." No error states. |
| WA Not Replied count is 0 | Card is shown in Green. |
| Standup filter returns no matching counsellors | "No counsellors match the selected filters." shown in the table body. Reset button is visible. |
| No active Live Offers for Students | Row shows: "No live offers for students right now. Check back soon." |
| No active Live for Counsellors offers | Row shows: "No live offers for counsellors right now." |
| Counsellor offer has no matching target students | Drawer shows: "No matching students for this offer right now." |
| A counsellor's CA date is not set | That counsellor is excluded from CA Date filtered results silently — no error shown |
| Task Logger submitted without a student name | Inline error under the student name field: "Please enter a student name." Form does not save. |
| An offer is created with an already-past expiry date | Offer is published as-is. No validation block. The offer will appear as expired immediately in the counsellor view. Ops Admin is responsible for date accuracy. |
| Non-Ops Admin navigates to Admin Panel URL directly | Silently redirected to Tasks & Performance. No error message shown. |
| Internal Team Chat panel is open while user navigates tabs | Panel remains open. Chat state (message history, scroll position) is preserved. |
| Support ticket submitted without a description | Ticket is submitted successfully with subject only. Description is optional. |
| Ops Admin visits Incentives & Earnings tab | "Live for Counsellors" section is not shown. All other sections are visible (Earned So Far, Live Offers for Students, Incentive Breakdown, Top Earners, Monthly Earnings). |
| Future month bar in Monthly Earnings chart | Bar is light grey. No tooltip. No rupee value shown. |
| Search in Scholarship Finder returns no results | Shows: "No scholarships found for '[search term]'." |
| Key Deadlines section has no deadlines for selected day | Shows: "No deadlines for [Today / Tomorrow / the selected period]." |

---

## 12. Complete Screen Inventory

| Screen / Panel | Accessible To |
|---|---|
| Login Screen | All (unauthenticated) |
| Tasks & Performance — Stand Up Table | Team Lead, Ops Admin, Business Head |
| Tasks & Performance — Individual Scorecard | All roles |
| Tasks & Performance — Action Required (Boost Cards) | All roles |
| Tasks & Performance — Volume Metrics | All roles |
| Tasks & Performance — Quality Metrics | All roles |
| Tasks & Performance — Top Performers Leaderboard | All roles |
| Tasks & Performance — Reminder & Task Logger | Counsellor, Team Lead |
| Student Detail Page | All roles |
| Metric Drill-Down Drawer | All roles |
| Incentives & Earnings — Earnings Summary Banner | All roles |
| Incentives & Earnings — Live Offers for Students | All roles |
| Incentives & Earnings — Live for Counsellors | Counsellor, Team Lead only |
| Counsellor Offer Detail Drawer | Counsellor, Team Lead only |
| Incentives & Earnings — Incentive Breakdown | All roles |
| Incentives & Earnings — Top Earners | All roles |
| Incentives & Earnings — Monthly Earnings Chart | All roles |
| L&D — Quick Links | All roles |
| L&D — Info Hub — Key Deadlines | All roles |
| L&D — Info Hub — Scholarship Finder | All roles |
| L&D — Info Hub — University News | All roles |
| L&D — Info Hub — Training & Guidelines | All roles |
| L&D — Info Hub — Partnered Institutes | All roles |
| L&D — Info Hub — University Detail View | All roles |
| L&D — Newsletter | All roles |
| Support Ticket Modal | All roles |
| Admin Panel — Users | Ops Admin only |
| Admin Panel — Data Corrections | Ops Admin only |
| Admin Panel — Incentive Slabs | Ops Admin only |
| Admin Panel — Quick Links | Ops Admin only |
| Admin Panel — Training | Ops Admin only |
| Admin Panel — Support Tickets | Ops Admin only |
| Admin Panel — Offers | Ops Admin only |
| Admin Panel — Badges | Ops Admin only |
| Admin Panel — Bot Settings | Ops Admin only |
| Admin Panel — Info Hub Management | Ops Admin only |
| Profile Page | All roles |
| Chat with Business Team Panel | All roles |
| Chat in Internal Team Panel | All roles |

---

## 13. What the Next Version Should Consider

The following items are noted for the roadmap. They are NOT part of the current version:

- **Real-time metric sync** — Current data reflects periodically updated snapshots. True sub-second metric updates are a future consideration.
- **Downloadable reports** — Exporting standup data, earnings summaries, or student lists as CSV or PDF.
- **Automated follow-up reminders** — System-triggered alerts to counsellors when a follow-up date passes, sent via email or push notification.
- **Target configuration by Ops** — Ability for Ops Admin to set and update daily and monthly targets per metric without engineering involvement.
- **Performance trend charts** — Week-over-week or month-over-month visual trends for individual counsellors.
- **Counsellor-to-student communication log** — Surfacing all call and WA interaction history for a student directly within the Student Detail Page.
- **Multi-team visibility for Team Leads** — Allowing a Team Lead to compare their team's aggregate performance against other teams (currently only Ops Admin has this view).
