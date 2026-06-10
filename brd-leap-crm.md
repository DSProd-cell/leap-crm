# Leap CRM — Business Requirements Document (BRD)

**Document Version:** 1.0
**Date:** 31 May 2026
**Prepared by:** Business Team
**Intended Audience:** Product Team

---

## 1. Executive Summary

Leap CRM is an internal sales intelligence and performance management platform built for the counselling and student enrolment teams of an EdTech organisation. The platform gives every person in the sales funnel — from a frontline counsellor to the operations head — a single place to see their targets, track their performance, manage their incentives, access learning resources, and communicate with their team.

The platform is designed as a web application accessible on any device including mobile browsers. It is entirely internal — no student-facing interface exists.

---

## 2. The Problem This Solves

Before Leap CRM, the counselling team operated across disconnected tools with no single source of truth:

- **Daily targets and performance** were tracked in shared Excel sheets that were manually updated, always out of date, and inaccessible during client calls.
- **Standup meetings** required a Team Lead to compile data from multiple sources the night before. If data was missing, the meeting stalled.
- **Incentive tracking** was entirely manual. Counsellors had no visibility into how much they had earned or how close they were to the next earning milestone. They relied on Ops sending a weekly summary on WhatsApp.
- **Student follow-up** had no system behind it. Counsellors relied on memory or personal notes. Students at risk of dropping off were only identified after they went cold.
- **WA group management** had no accountability layer — when a student asked a question in a WhatsApp group and it went unanswered, there was no way to track or report on it.
- **Deferral opportunities** (students who had an admit but hadn't confirmed their deposit, or had paid but hadn't completed their visa) were invisible — no one had a consolidated view.
- **Live offers and campaigns** were communicated through group broadcasts with no structured way to see which students to target or what the incentive structure was.
- **Team Leads** had no way to compare counsellors objectively during a standup without toggling between sheets.
- **Ops Admins** had no self-serve way to configure incentive slabs, publish offers, correct data errors, or manage users — every change required going back to engineering.

---

## 3. Business Objectives

The platform must achieve the following outcomes:

1. **Counsellors start every day with a clear plan.** They open the CRM and immediately know: what their targets are, how they performed yesterday, which students to call today, and what they stand to earn.

2. **Team Leads run standups from the platform.** No external sheets. No pre-meeting data collection. The standup table is always live and filterable.

3. **Incentive earnings are fully transparent.** Every counsellor can see exactly how much they've earned, what the current incentive drives are, what to do to earn more, and which students to target for each drive.

4. **No student falls through the cracks.** Overdue follow-ups, unanswered WA messages, and deferral opportunities are surfaced proactively on the dashboard.

5. **Ops Admin is self-sufficient.** The Ops team can manage users, configure incentive slabs, publish offers, correct data, and view support tickets without engineering involvement.

6. **Learning resources are centralised.** University deadlines, scholarship information, training materials, and newsletters are available in one place — not scattered across email, WhatsApp, and Google Drive.

---

## 4. User Roles

The platform has four distinct user roles. Each role sees a different set of information and can perform different actions.

### 4.1 Counsellor
A frontline admissions advisor responsible for managing a portfolio of students through the full enrolment journey — from first contact to lock-in.

**What they need the platform to do:**
- Show their personal performance metrics against daily and monthly targets
- Surface which students need attention today (overdue follow-ups, pending tasks, WA unanswered)
- Show their current incentive earnings and what active drives are running
- Give them access to university and scholarship information to support student conversations
- Let them log tasks and set reminders for themselves

**Access level:** Sees their own data only. Cannot see other counsellors' individual records. Cannot access Admin Panel.

---

### 4.2 Team Lead
A manager responsible for a team of 4–8 counsellors. Also operates as a counsellor for their own student portfolio.

**What they need the platform to do:**
- Everything a counsellor needs (see above)
- See a team-wide standup table comparing all counsellors under their management
- Identify who is on track, who is falling behind, and who needs intervention — without asking individually
- Filter the standup table by location, team, individual counsellor, and counsellor-assigned date range

**Access level:** Sees their own data + their team's aggregated data. Cannot see counsellors outside their team. Cannot access Admin Panel.

---

### 4.3 Ops Admin
A member of the operations team responsible for configuring and maintaining the platform.

**What they need the platform to do:**
- Manage all user accounts (add, view, and edit users and their roles)
- Configure and update incentive slabs (rules, targets, components)
- Publish live offers for students and counsellors
- Manually correct data points where the source system has an error
- View, manage, and respond to support tickets raised by the team
- Configure quick links, training modules, and bot settings
- Award badges to high performers
- Manage content in the Info Hub (universities, deadlines, scholarships, news)

**Access level:** Full read access across all teams and all counsellors. Full write access to configuration and admin sections. Does NOT see "Live for Counsellors" offer cards (those are for counsellors only).

---

### 4.4 Business Head / Manager
Senior leadership with a read-only view of overall team and individual performance.

**What they need the platform to do:**
- See performance across all teams and all counsellors
- Monitor key metrics at a glance
- No configuration or data entry required

**Access level:** Read-only. Sees all teams and all counsellors. No admin actions.

---

## 5. High-Level Feature Requirements

### Feature 1 — Daily Performance Dashboard (Tasks & Performance Tab)
The primary daily-use screen. Must show every counsellor their performance against targets in real time.

**Requirements:**
- A metric grid showing: Calls, Leads, Enrolments, Revenue, Follow-ups, STIs, Applications, Deposits, Lock-ins, F2F meetings, ISL Rating, Referral %, Quality Score — each with actual value, target, and percentage achievement
- A team standup table (visible to Team Leads and Ops) listing every counsellor with their metrics in a scannable row-by-column format
- Standup table must be filterable by: Location, Team Lead, Individual Counsellor, Counsellor-Assigned Date Range
- Achievement colours in the standup table: Green = target met or exceeded, Red = target not met
- An individual scorecard showing yesterday's performance for the logged-in counsellor
- A Volume Metrics section with: Tasks Completed, Unhappy Cohort, Deferrals Opportunity
- A Quality Metrics section with: ISL Rating, Referral %, Quality Score, WA Not Replied
- WA Not Replied must always display in red when there are any unanswered messages. It must show count of students with unanswered WA questions.
- Deferrals Opportunity must show students who either: (a) received an admit from a previous intake but haven't paid their deposit, OR (b) paid the deposit but haven't completed their visa process
- An Action Required section with two cards: Boost Revenue (orange) and Own Tasks (blue)
- A Top Performers leaderboard with three views: Today, This Month, This Year
- A Reminder & Task Logger where counsellors can log tasks for a student (Call, Send Message, Payment Follow-up, Custom Task)
- A collapsible individual scorecard and top performers section

---

### Feature 2 — Student Detail Page
A full profile view of any individual student. Accessible by clicking a student's name from any list within the platform.

**Requirements:**
- Show student's current stage in the pipeline (STI → Application → Deposit → Lock-in)
- Show: User ID, Course, Country, Last Call date and outcome, Follow-up date, App download status, Quality Score, Last Connected date
- Show which WhatsApp groups the counsellor and student are both part of
- Show any unanswered WA messages from the student in that group
- Show all subtasks logged for the student, with completion status
- A "Call" button to initiate a call action

---

### Feature 3 — Metric Card Drill-Down Drawer
Every metric card on the dashboard must be clickable and open a side drawer showing the underlying data — the specific students driving that metric value.

**Requirements:**
- Clicking any Volume or Quality metric card opens a right-side drawer
- The drawer shows a list of the relevant students with name, stage, follow-up date, and ISL rating
- Each student card in the drawer is clickable and opens the Student Detail Page
- For WA Not Replied: the drawer shows the question asked, the lead status of the student, and the date the question was asked

---

### Feature 4 — Incentives & Earnings Tab
A dedicated tab giving every counsellor full visibility into their incentive earnings and what's available to earn.

**Requirements:**
- An earnings banner at the top showing: Amount earned so far this month, Projected amount at 100% target achievement, and Opportunity size (potential pipeline value)
- A "Live Offers for Students" section showing active promotional offers that counsellors can pitch to students — with offer name, description, expiry date, and a link to see which students to target
- A "Live for Counsellors" section showing performance-based offers that counsellors themselves can earn from. Must only be visible to Counsellors and Team Leads (not Ops Admin). Each offer card must be clickable and open a full detail drawer.
- The counsellor offer detail drawer must show: the full incentive structure (milestones and rewards), a target description explaining which students to focus on, and a list of the specific students to target with their stage, follow-up date, and ISL rating
- An Incentive Breakdown table listing all active incentive components (STI, Deposits, Non Partner Revenue, Lock In) with: the rule, the drive period, the current status, the amount earned, and an expandable section per row showing which counsellors have earned from that component and how much
- The Incentive Breakdown must be collapsible (expandable/collapsible header)
- A Top Earners leaderboard showing This Month and All Time
- A Monthly Earnings chart showing the current Financial Year (April to March). Past months shown in blue, current month in green, future months shown as empty/grey. The section must be collapsible.

---

### Feature 5 — Learning & Development Tab
A resource hub for the counselling team to access information they need to do their job.

**Requirements:**
- **Quick Links** at the top of the tab: Join 10x Session (link), Templates Sheet (link), Raise a Support Ticket
- **Info Hub** sub-tab with five sections:
  - **Key Deadlines**: University application and deposit deadlines, filterable by Today / Tomorrow / Upcoming
  - **Scholarship Finder**: Searchable list of scholarships with eligibility, amount, and deadline
  - **University News**: Latest updates from partner universities
  - **Training & Guidelines**: Training modules with video, document, and link content. Each module is expandable and shows a list of items.
  - **Partnered Institutes**: Directory of partner universities with full details (courses, fees, scholarships, required documents, deposit info, refund policy)
- **Newsletter** sub-tab: A feed of internal newsletters/updates, filterable by category, date range, and tags

---

### Feature 6 — Admin Panel
A configuration and management panel exclusively for Ops Admin users.

**Requirements:**
- **Users**: View all users, add new users (name, email, role, team assignment)
- **Data Corrections**: Manually override a specific metric value for a specific counsellor on a specific date. Corrections must be logged with date, counsellor, metric, and new value.
- **Incentive Slabs**: View and manage the incentive components, rules, targets, and earned amounts
- **Quick Links**: Configure the URLs for Join 10x and Templates Sheet
- **Training**: Add, edit, and remove training modules and their items
- **Support Tickets**: View all tickets raised by the team. Each ticket shows the subject, the user who raised it, and the date.
- **Offers**: Create new live offers for students and counsellors. Each offer must have: title, description, type (student/counsellor), reward description, and expiry date
- **Badges**: Award achievement badges to specific users. Configure badge types.
- **Bot Settings**: Configure the bot's name, greeting message, enable/disable the bot, and manage the FAQ knowledge base
- **Info Hub**: Add and manage university profiles, deadlines, and scholarship data

---

### Feature 7 — Chat with Business Team (Bot)
A floating assistant accessible from all pages of the platform.

**Requirements:**
- A fixed button on the right edge of every page, labelled "Chat with Business Team"
- Clicking opens a chat panel where the counsellor can type questions
- The bot responds based on a configured FAQ knowledge base managed in Admin Panel
- The panel also has an "Action Items" tab showing the counsellor's pending tasks
- The bot panel has two tabs: Chat and Action Items

---

### Feature 8 — Chat in Internal Team
A floating real-time team chat panel accessible from all pages of the platform.

**Requirements:**
- A fixed button on the right edge of every page, labelled "Chat in Internal Team", styled in green to differentiate it from the business team bot
- Clicking opens a chat panel showing messages from the team, with a text input to send messages
- Shows how many team members are currently online
- Unread message count displayed as a badge on the button
- Option to clear chat history (with confirmation step)
- The panel must remain accessible from all tabs and all pages without losing its position or state when the user navigates

---

## 6. Role-Based Access Summary

| Feature Area | Counsellor | Team Lead | Ops Admin | Business Head |
|---|---|---|---|---|
| Own metrics dashboard | ✅ | ✅ | ✅ | ✅ |
| Team standup table | ❌ | ✅ (own team) | ✅ (all teams) | ✅ (all teams) |
| Individual scorecard | ✅ | ✅ | ✅ | ✅ |
| Volume & Quality metrics | ✅ | ✅ | ✅ | ✅ |
| Metric drill-down drawer | ✅ | ✅ | ✅ | ✅ |
| Student detail page | ✅ | ✅ | ✅ | ✅ |
| Reminder & Task Logger | ✅ | ✅ | ✅ | ❌ |
| Incentives & Earnings tab | ✅ | ✅ | ✅ | ✅ |
| Live for Counsellors offers | ✅ | ✅ | ❌ | ❌ |
| Learning & Development tab | ✅ | ✅ | ✅ | ✅ |
| Admin Panel | ❌ | ❌ | ✅ | ❌ |
| Chat with Business Team | ✅ | ✅ | ✅ | ✅ |
| Chat in Internal Team | ✅ | ✅ | ✅ | ✅ |

---

## 7. Out of Scope

The following are explicitly not part of the current version of Leap CRM:

- **Native mobile application (iOS / Android)** — The platform is a web application. It is accessible and usable on mobile browsers but does not require app store installation.
- **Student-facing portal** — Students do not have access to this platform. It is entirely internal.
- **Payment processing** — No financial transactions occur inside the platform. Incentive calculations are shown for visibility only; actual payouts happen through separate payroll processes.
- **Automated WhatsApp / SMS notifications** — The platform surfaces information in-app. Outbound automated messaging to students or counsellors via WhatsApp or SMS is not part of this version.
- **CRM integration with external tools** — There is no sync with Salesforce, HubSpot, or any external CRM in this version. Data is managed within the platform.
- **Reporting and export** — Downloadable reports, CSV exports, or scheduled email summaries are not part of this version.
- **Performance management workflows** — PIP (Performance Improvement Plan), appraisals, or formal review workflows are not included.

---

## 8. Success Criteria

The platform is working as intended when:

1. **Counsellors start every day from the CRM** — they don't need to ask their Team Lead what their target is or what happened yesterday.
2. **Team Leads run the full standup from the platform** — no external sheets, no pre-meeting data preparation.
3. **Counsellors know their incentive earnings without asking Ops** — they can see the number, the drive details, and exactly what to do to earn more.
4. **No student follow-up is missed** — the platform flags overdue tasks, unanswered WA messages, and deferral opportunities before the counsellor asks.
5. **Ops Admin can make configuration changes without engineering** — adding a user, publishing an offer, correcting a data point, or updating an incentive slab takes minutes with no technical support.
6. **Training and university information is found in the CRM, not WhatsApp** — counsellors stop asking TLs for scholarship details or deadline reminders that already exist in the Info Hub.
