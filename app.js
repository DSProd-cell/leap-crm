/* ═══════════════════════════════════════════════════════════
   EduCRM v1 — app.js   (vanilla JS, no dependencies beyond CDNs)
═══════════════════════════════════════════════════════════ */

/* ── Mock Data ── */

const TARGETS = {
  calls: 50, leads: 30, enrolments: 5, revenue: 300000, followups: 20,
  stis: 10, applications: 8, deposits: 6, lockins: 4,
  revenue_target: 300000, f2f: 5, isl: 5, referral: 30, tasks: 20
};

const COUNSELORS = [
  { id:1, name:'Priya Sharma',  team:'Alpha', role:'counselor', email:'priya@edu.in',  avatar:'PS', designation:'Senior Counselor', joiningDate:'12 Mar 2023', manager:'Sneha Kapoor', photoUrl:'',
    today:{ calls:45, leads:26, enrolments:4, revenue:210000, followups:16, stis:7, applications:5, deposits:3, lockins:2, f2f:3, isl:4.2, referralPct:25, tasks:14, q1score:78, q2score:82, revenueCollected:210000 } },
  { id:2, name:'Rohan Mehta',   team:'Alpha', role:'counselor', email:'rohan@edu.in',  avatar:'RM', designation:'Counselor', joiningDate:'05 Aug 2022', manager:'Sneha Kapoor', photoUrl:'',
    today:{ calls:52, leads:31, enrolments:6, revenue:340000, followups:21, stis:9, applications:7, deposits:5, lockins:4, f2f:5, isl:4.5, referralPct:35, tasks:18, q1score:84, q2score:88, revenueCollected:340000 } },
  { id:3, name:'Ananya Singh',  team:'Alpha', role:'counselor', email:'ananya@edu.in', avatar:'AS', designation:'Counselor', joiningDate:'20 Jan 2024', manager:'Sneha Kapoor', photoUrl:'',
    today:{ calls:28, leads:14, enrolments:2, revenue:95000,  followups:9,  stis:4, applications:2, deposits:1, lockins:0, f2f:1, isl:3.8, referralPct:10, tasks:8,  q1score:62, q2score:58, revenueCollected:95000 } },
  { id:4, name:'Karan Nair',    team:'Alpha', role:'counselor', email:'karan@edu.in',  avatar:'KN', designation:'Senior Counselor', joiningDate:'14 Jun 2022', manager:'Sneha Kapoor', photoUrl:'',
    today:{ calls:50, leads:30, enrolments:5, revenue:300000, followups:20, stis:10, applications:8, deposits:6, lockins:4, f2f:5, isl:4.4, referralPct:32, tasks:20, q1score:80, q2score:85, revenueCollected:300000 } },
  { id:5, name:'Divya Reddy',   team:'Beta',  role:'counselor', email:'divya@edu.in',  avatar:'DR', designation:'Counselor', joiningDate:'09 Sep 2023', manager:'Vijay Kumar', photoUrl:'',
    today:{ calls:38, leads:22, enrolments:3, revenue:175000, followups:14, stis:6, applications:4, deposits:2, lockins:1, f2f:2, isl:4.0, referralPct:20, tasks:12, q1score:70, q2score:72, revenueCollected:175000 } },
  { id:6, name:'Sahil Joshi',   team:'Beta',  role:'counselor', email:'sahil@edu.in',  avatar:'SJ', designation:'Team Lead', joiningDate:'01 Mar 2021', manager:'Vijay Kumar', photoUrl:'',
    today:{ calls:55, leads:33, enrolments:7, revenue:390000, followups:24, stis:12, applications:10, deposits:8, lockins:6, f2f:7, isl:4.7, referralPct:45, tasks:22, q1score:91, q2score:93, revenueCollected:390000 } },
  { id:7, name:'Meera Pillai',  team:'Beta',  role:'counselor', email:'meera@edu.in',  avatar:'MP', designation:'Counselor', joiningDate:'14 Feb 2025', manager:'Vijay Kumar', photoUrl:'',
    today:{ calls:19, leads:9,  enrolments:1, revenue:48000,  followups:6,  stis:2, applications:1, deposits:0, lockins:0, f2f:1, isl:3.5, referralPct:5,  tasks:5,  q1score:50, q2score:45, revenueCollected:48000 } },
  { id:8, name:'Arjun Khanna',  team:'Beta',  role:'counselor', email:'arjun@edu.in',  avatar:'AK', designation:'Counselor', joiningDate:'22 Oct 2023', manager:'Vijay Kumar', photoUrl:'',
    today:{ calls:41, leads:24, enrolments:3, revenue:165000, followups:13, stis:6, applications:5, deposits:3, lockins:2, f2f:3, isl:4.1, referralPct:22, tasks:13, q1score:74, q2score:76, revenueCollected:165000 } },
];

const TEAM_LEADS = [
  { id:9,  name:'Sneha Kapoor', team:'Alpha', role:'team_lead', email:'sneha@edu.in',  avatar:'SK', designation:'Team Lead', joiningDate:'01 Jan 2021', manager:'Nisha Agarwal' },
  { id:10, name:'Vijay Kumar',  team:'Beta',  role:'team_lead', email:'vijay@edu.in',  avatar:'VK', designation:'Team Lead', joiningDate:'15 Mar 2021', manager:'Nisha Agarwal' },
];

const OPS_USERS = [
  { id:11, name:'Nisha Agarwal', team:'Ops', role:'ops_admin', email:'nisha@edu.in', avatar:'NA', designation:'Ops Admin', joiningDate:'01 Jun 2020', manager:'—' },
];

// FY 2026-27: Apr 2026 → Mar 2027 (current month = May 2026 = index 1)
const MONTHLY_EARNINGS = [42000, 38400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const INCENTIVE_SLABS = [
  {
    component:'STI', rule:'₹2,500 per STI converted', status:'7 STIs (100%)', earned:17500,
    drivePeriod:'01 May – 31 May 2026',
    earners:[
      { name:'Sahil Joshi',   count:'12 STIs', earned:30000 },
      { name:'Karan Nair',    count:'10 STIs', earned:25000 },
      { name:'Rohan Mehta',   count:'9 STIs',  earned:22500 },
      { name:'Priya Sharma',  count:'7 STIs',  earned:17500 },
      { name:'Divya Reddy',   count:'6 STIs',  earned:15000 },
    ],
  },
  {
    component:'Deposits', rule:'₹5,000 per deposit collected', status:'3 deposits (75%)', earned:15000,
    drivePeriod:'15 May – 31 May 2026',
    earners:[
      { name:'Sahil Joshi',   count:'8 deposits', earned:40000 },
      { name:'Rohan Mehta',   count:'5 deposits', earned:25000 },
      { name:'Karan Nair',    count:'4 deposits', earned:20000 },
      { name:'Priya Sharma',  count:'3 deposits', earned:15000 },
    ],
  },
  {
    component:'Paid Service Revenue', rule:'2% of paid service revenue', status:'₹4.8L collected', earned:9600,
    drivePeriod:'01 May – 31 May 2026',
    earners:[
      { name:'Sahil Joshi',   count:'₹8.2L', earned:16400 },
      { name:'Karan Nair',    count:'₹6.1L', earned:12200 },
      { name:'Rohan Mehta',   count:'₹5.5L', earned:11000 },
      { name:'Priya Sharma',  count:'₹4.8L', earned:9600  },
      { name:'Arjun Khanna',  count:'₹3.2L', earned:6400  },
    ],
  },
  {
    component:'Lock In', rule:'₹8,000 per lock-in achieved', status:'2 lock-ins (80%)', earned:16000,
    drivePeriod:'23 May – 29 May 2026',
    earners:[
      { name:'Sahil Joshi',  count:'6 lock-ins', earned:48000 },
      { name:'Rohan Mehta', count:'4 lock-ins', earned:32000 },
      { name:'Priya Sharma',count:'2 lock-ins', earned:16000 },
    ],
  },
  {
    component:'Referrals', rule:'₹3,000 per successful referral enrolment', status:'1 referral (50%)', earned:3000,
    drivePeriod:'01 May – 31 May 2026',
    earners:[
      { name:'Sahil Joshi',  count:'5 referrals', earned:15000 },
      { name:'Karan Nair',   count:'3 referrals', earned:9000  },
      { name:'Rohan Mehta',  count:'2 referrals', earned:6000  },
      { name:'Priya Sharma', count:'1 referral',  earned:3000  },
    ],
  },
];

const TRAINING_MODULES = [
  { id:'m1', name:'Soft Training', lessons:3, items:[
    { title:'Cold Calling Mastery',      desc:'Master the art of opening conversations.',    type:'Video'    },
    { title:'Objection Handling Guide',  desc:'Handling common objections with confidence.', type:'Document' },
    { title:'Follow-up Framework',       desc:'A systematic approach to follow-up.',         type:'Link'     },
  ]},
  { id:'m2', name:'Domain Training', lessons:3, items:[
    { title:'Course Catalogue 2025',     desc:'Complete overview of all courses & fees.',    type:'Document' },
    { title:'Scholarship Matrix',        desc:'Understanding scholarship eligibility.',       type:'Link'     },
    { title:'Demo Session Walkthrough',  desc:'How to run an effective product demo.',       type:'Video'    },
  ]},
  { id:'m3', name:'System Training', lessons:2, items:[
    { title:'Using EduCRM Effectively',  desc:'Tips for logging tasks & tracking perf.',     type:'Video'    },
    { title:'WhatsApp Communication SOP',desc:'Standard operating procedure for WA.',       type:'Document' },
  ]},
  { id:'m4', name:'New Features', lessons:2, items:[
    { title:'Latest Platform Updates',   desc:'Overview of new features rolled out recently.', type:'Video'    },
    { title:'Feature Adoption Guide',    desc:'Step-by-step guide to using new features.',     type:'Document' },
  ]},
];

const COURSE_UPDATES = [
  'New MBA batch starting June 2026 — update your pitch deck!',
  'BBA scholarship deadline extended to 30 May 2026.',
  'Engineering counselor certification exam — register by 25 May.',
  'Q1 fee structure revision — check updated catalogue.',
  'Alumni referral bonus increased to ₹2,000 per enrolment.',
];

const SUPPORT_TICKETS = [
  { id:'TKT-001', subject:'Revenue figure mismatch for April', counselor:'Priya Sharma',   category:'Data Correction', status:'Open'     },
  { id:'TKT-002', subject:'Incentive slab not applied correctly', counselor:'Rohan Mehta', category:'Incentive Query', status:'Open'     },
  { id:'TKT-003', subject:'Cannot access training module 3',     counselor:'Meera Pillai', category:'Training Access', status:'Resolved' },
  { id:'TKT-004', subject:'App crash on task log submit',        counselor:'Divya Reddy',  category:'Technical Issue', status:'Open'     },
];

/* ── Counsellor-facing ticket data (rich, with date/desc/update) ── */
const COUNSELLOR_TICKETS = [
  { id:'TKT-001', dateRaised:'20 Jun 2026', category:'Incentive Query',    status:'Resolved', description:'My April incentive slab was not applied correctly. The amount shown is Rs. 12,000 but based on my paid service revenue it should be Rs. 15,500.',                           update:'Incentive recalculated and updated by ops team. Rs. 15,500 has been applied to your account as of 25 June 2026.' },
  { id:'TKT-002', dateRaised:'01 Jul 2026', category:'CRM Issues',         status:'Open',     description:'Unable to log task completion for student U1003. The Save button is unresponsive after filling all details. Happens consistently on Chrome.',                           update:'Issue escalated to the tech team. Under investigation — expected fix in 48 hours.' },
  { id:'TKT-003', dateRaised:'05 Jul 2026', category:'SOP Issue',          status:'Open',     description:'The SOP document for Canadian university applications is outdated — it still shows 2025 deadline dates and old fee structures.',                                          update:'SOP team has been notified. Updated document will be shared within 48 hours.' },
  { id:'TKT-004', dateRaised:'15 Jun 2026', category:'University Support', status:'Resolved', description:'Brock University has not responded to my student\'s (U1006) application for 3 weeks. Need escalation support from the LEAP university relations team.',                update:'LEAP university relations team followed up with Brock directly. Application reviewed and moved to shortlisting stage as of 22 June.' },
  { id:'TKT-005', dateRaised:'07 Jul 2026', category:'APP Issue',          status:'Open',     description:'The Boost Output cards are not loading on mobile view. All four cards appear blank. Tested on Chrome mobile and Safari — same issue on both.',                         update:'Logged with dev team. Fix expected in the next release cycle.' },
];

/* ── Mock students for Priya Sharma (counselor id:1) ── */
const STUDENTS = [
  { id:'U1001', counselorId:1, name:'Aarav Mehta',     course:'MBA Finance',      stage:'sti',         followup:'2026-06-02', appDownloaded:true,  lastCallDate:'20 May 2026', lastCallOutcome:'Connected', qualityScore:82, lastConnected:'20 May 2026 11:42 AM', country:'UK',
    whatsappGroups:[{ groupName:'MBA Batch A – Jun 2026', counselorJoined:true, studentJoined:true },{ groupName:'Finance Study Group', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'20 May 11:42 AM', notes:'Discussed fees', outcome:'Connected' }, { label:'Send a WhatsApp message', done:true, timestamp:'20 May 1:00 PM', notes:'Sent brochure', outcome:'Connected' }, { label:'Follow up on payment', done:false }, { label:'Book a session / demo', done:false }, { label:'Update application status', done:false }],
    activity:[{ type:'Call logged', time:'20 May 11:42 AM', notes:'Student interested, follow up on fee waiver' }, { type:'WhatsApp sent', time:'20 May 1:00 PM', notes:'Sent MBA brochure PDF' }] },
  { id:'U1002', counselorId:2, name:'Sanya Kapoor',    course:'BBA Marketing',    stage:'application', followup:'2026-06-10', appDownloaded:false, lastCallDate:'19 May 2026', lastCallOutcome:'Not Reachable', qualityScore:65, lastConnected:'18 May 2026 4:15 PM', country:'Canada',
    whatsappGroups:[{ groupName:'BBA General – Jun 2026', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'19 May 4:15 PM', notes:'Not reachable', outcome:'Not Reachable' }, { label:'On Hold Application Drafts', done:false }, { label:'Send a WhatsApp message', done:false }, { label:'Follow up on payment', done:false }],
    activity:[{ type:'Call logged', time:'19 May 4:15 PM', notes:'Not reachable — tried 3 times' }, { type:'Application updated', time:'19 May 5:00 PM', notes:'Marked as application submitted' }] },
  { id:'U1003', counselorId:1, name:'Rahul Verma',     course:'B.Tech CSE',       stage:'deposit',     followup:'2026-06-02', appDownloaded:true,  lastCallDate:'21 May 2026', lastCallOutcome:'Promise to Pay', qualityScore:74, lastConnected:'21 May 2026 10:00 AM', country:'Australia',
    whatsappGroups:[{ groupName:'CSE Batch Jun 2026', counselorJoined:true, studentJoined:true },{ groupName:'Tech Prep Group', counselorJoined:false, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'21 May 10:00 AM', notes:'Promised to pay by 23rd', outcome:'Promise to Pay' }, { label:'Follow up on payment', done:false }, { label:'Send a WhatsApp message', done:true, timestamp:'21 May 11:00 AM', notes:'Sent payment link', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'21 May 10:00 AM', notes:'Promised deposit by 23 May' }, { type:'WhatsApp sent', time:'21 May 11:00 AM', notes:'Payment link shared' }] },
  { id:'U1004', counselorId:3, name:'Prerna Singh',    course:'MBA HR',            stage:'sti',         followup:'2026-06-10', appDownloaded:false, lastCallDate:'22 May 2026', lastCallOutcome:'Callback Requested', qualityScore:55, lastConnected:'22 May 2026 3:00 PM', country:'USA',
    whatsappGroups:[{ groupName:'MBA General – Jun 2026', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:false }, { label:'Send a WhatsApp message', done:false }, { label:'Book a session / demo', done:false }, { label:'Share a document / template', done:false }, { label:'Follow up on payment', done:false }],
    activity:[{ type:'Call logged', time:'22 May 3:00 PM', notes:'Requested callback at 5 PM tomorrow' }] },
  { id:'U1005', counselorId:4, name:'Devansh Joshi',   course:'BCA Data Science',  stage:'lockin',      followup:'2026-06-02', appDownloaded:true,  lastCallDate:'21 May 2026', lastCallOutcome:'Connected', qualityScore:90, lastConnected:'21 May 2026 2:30 PM', country:'Germany',
    whatsappGroups:[{ groupName:'BCA Batch A', counselorJoined:true, studentJoined:true }],
    subtasks:[{ label:'Follow up on payment', done:true, timestamp:'21 May 2:30 PM', notes:'Received offer, finalizing', outcome:'Connected' }, { label:'Update application status', done:true, timestamp:'21 May 3:00 PM', notes:'Shortlisted — awaiting lock-in payment', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'21 May 2:30 PM', notes:'Shortlisting offer shared, student reviewing' }, { type:'Application updated', time:'21 May 3:00 PM', notes:'Stage: Shortlisted — lock-in pending' }] },
  { id:'U1006', counselorId:1, name:'Ishita Rawat',    course:'MBA Finance',       stage:'application', followup:'2026-06-10', appDownloaded:true,  lastCallDate:'20 May 2026', lastCallOutcome:'Connected', qualityScore:68, lastConnected:'20 May 2026 5:00 PM', country:'Ireland',
    whatsappGroups:[{ groupName:'MBA Batch A – Jun 2026', counselorJoined:true, studentJoined:true }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'20 May 5:00 PM', notes:'Documents pending QC', outcome:'Connected' }, { label:'QC Cleared: Filing Pending', done:false }, { label:'Send a WhatsApp message', done:true, timestamp:'20 May 5:30 PM', notes:'Sent next steps doc', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'20 May 5:00 PM', notes:'QC cleared — awaiting filing' }, { type:'WhatsApp sent', time:'20 May 5:30 PM', notes:'Next steps document shared' }] },
  { id:'U1007', counselorId:2, name:'Karan Tiwari',    course:'B.Com',             stage:'sti',         followup:'2026-06-10', appDownloaded:false, lastCallDate:'22 May 2026', lastCallOutcome:'Not Reachable', qualityScore:40, lastConnected:'19 May 2026 11:00 AM', country:'Singapore',
    whatsappGroups:[{ groupName:'B.Com General', counselorJoined:true, studentJoined:false },{ groupName:'Finance Study Group', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:false }, { label:'Send a WhatsApp message', done:false }, { label:'Book a session / demo', done:false }],
    activity:[{ type:'Call logged', time:'22 May 9:00 AM', notes:'Not reachable for 3 days' }] },
  { id:'U1008', counselorId:3, name:'Meenal Shah',     course:'MBA Marketing',     stage:'deposit',     followup:'2026-06-02', appDownloaded:true,  lastCallDate:'22 May 2026', lastCallOutcome:'Connected', qualityScore:79, lastConnected:'22 May 2026 12:00 PM', country:'New Zealand',
    whatsappGroups:[{ groupName:'MBA Batch B – Jun 2026', counselorJoined:true, studentJoined:true }],
    subtasks:[{ label:'Follow up on payment', done:false }, { label:'Call the student', done:true, timestamp:'22 May 12:00 PM', notes:'Confirming deposit timeline', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'22 May 12:00 PM', notes:'Deposit expected by 25 May' }] },

  /* ── New demo students added for full card coverage ── */
  { id:'U1009', counselorId:4, name:'Arjun Sharma',    course:'MBA Operations',    stage:'lockin',      followup:'2026-06-10', appDownloaded:true,  lastCallDate:'08 Jun 2026', lastCallOutcome:'Connected',      qualityScore:85, lastConnected:'08 Jun 2026 10:00 AM', country:'UK',
    whatsappGroups:[{ groupName:'MBA Ops Batch Jun 2026', counselorJoined:false, studentJoined:false }],
    subtasks:[{ label:'Follow up on payment', done:false }, { label:'Book a session / demo', done:false }, { label:'Send STI confirmation', done:false }],
    activity:[{ type:'Call logged', time:'08 Jun 10:00 AM', notes:'Student ready to lock in — pending STI confirmation' }] },

  { id:'U1010', counselorId:1, name:'Kavya Nair',      course:'B.Tech IT',         stage:'deposit',     followup:'2026-06-10', appDownloaded:false, lastCallDate:'09 Jun 2026', lastCallOutcome:'Not Reachable',  qualityScore:62, lastConnected:'07 Jun 2026 3:00 PM',  country:'Australia',
    whatsappGroups:[{ groupName:'Tech Batch Jun 2026', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:false }, { label:'Send a WhatsApp message', done:false }, { label:'Follow up on payment', done:false }],
    activity:[{ type:'Call logged', time:'09 Jun 11:00 AM', notes:'Not reachable — tried twice today' }] },

  { id:'U1011', counselorId:2, name:'Rohan Gupta',     course:'BBA International', stage:'application', followup:'2026-06-10', appDownloaded:false, lastCallDate:'09 Jun 2026', lastCallOutcome:'Not Reachable',  qualityScore:58, lastConnected:'06 Jun 2026 4:00 PM',  country:'Canada',
    whatsappGroups:[],
    subtasks:[{ label:'Call the student', done:false }, { label:'QC Rejected and On Hold', done:false }, { label:'Send a WhatsApp message', done:false }],
    activity:[{ type:'Call logged', time:'09 Jun 2:00 PM', notes:'QC rejected — application on hold' }] },

  { id:'U1012', counselorId:4, name:'Sneha Patel',     course:'MBA Marketing',     stage:'lockin',      followup:'2026-06-10', appDownloaded:true,  lastCallDate:'09 Jun 2026', lastCallOutcome:'Connected',      qualityScore:91, lastConnected:'09 Jun 2026 11:00 AM', country:'Germany',
    whatsappGroups:[{ groupName:'MBA Europe Jun 2026', counselorJoined:true, studentJoined:true }],
    subtasks:[{ label:'Follow up on payment', done:true, timestamp:'09 Jun 11:00 AM', notes:'Payment confirmed', outcome:'Connected' }, { label:'Lock-in confirmation', done:false }],
    activity:[{ type:'Call logged', time:'09 Jun 11:00 AM', notes:'Lock-in almost done — awaiting final confirmation' }] },
];

/* ── ISL / F2F / UC / Lead Status per student ── */
const STUDENT_PIPELINE_DATA = {
  // islSharedDate, secondCallDate, leadStatus, ucAssigned, englishTestGiven (IELTS/TOEFL/Duolingo/PTE)
  U1001: { islSharedDate:'2026-06-01', secondCallDate:null,         leadStatus:null,       ucAssigned:false, englishTestGiven:false, casI20Raised:false },
  U1002: { islSharedDate:'2026-06-03', secondCallDate:null,         leadStatus:null,       ucAssigned:true,  englishTestGiven:false, casI20Raised:false },
  U1003: { islSharedDate:'2026-05-20', secondCallDate:'2026-05-25', leadStatus:null,       ucAssigned:true,  englishTestGiven:true,  casI20Raised:false },
  U1004: { islSharedDate:'2026-06-05', secondCallDate:null,         leadStatus:null,       ucAssigned:false, englishTestGiven:false, casI20Raised:false },
  U1005: { islSharedDate:'2026-05-15', secondCallDate:'2026-05-22', leadStatus:null,       ucAssigned:true,  englishTestGiven:true,  casI20Raised:false },
  U1006: { islSharedDate:'2026-06-04', secondCallDate:null,         leadStatus:null,       ucAssigned:true,  englishTestGiven:true,  casI20Raised:false },
  U1007: { islSharedDate:'2026-05-28', secondCallDate:null,         leadStatus:'Drop off', ucAssigned:false, englishTestGiven:false, casI20Raised:false },
  U1008: { islSharedDate:'2026-05-18', secondCallDate:'2026-05-30', leadStatus:null,       ucAssigned:true,  englishTestGiven:true,  casI20Raised:false },
  U1009: { islSharedDate:'2026-06-07', secondCallDate:'2026-06-08', leadStatus:null,       ucAssigned:false, englishTestGiven:false, casI20Raised:false },
  U1010: { islSharedDate:'2026-06-02', secondCallDate:'2026-06-06', leadStatus:null,       ucAssigned:true,  englishTestGiven:false, casI20Raised:false },
  U1011: { islSharedDate:null,         secondCallDate:null,         leadStatus:null,       ucAssigned:false, englishTestGiven:false, casI20Raised:false },
  U1012: { islSharedDate:'2026-06-08', secondCallDate:'2026-06-09', leadStatus:null,       ucAssigned:true,  englishTestGiven:true,  casI20Raised:false },
};
STUDENTS.forEach(s => Object.assign(s, STUDENT_PIPELINE_DATA[s.id] || { islSharedDate:null, secondCallDate:null, leadStatus:null, ucAssigned:false }));

/* ── Application Status (determines when student leaves Boost STI) ── */
const STI_TERMINAL_STATUSES = ['Submitted to Institute', 'Application Dropped'];
const ON_HOLD_TASK_LABELS   = ['qc cleared: filing pending', 'on hold application drafts', 'qc rejected and on hold'];

const STUDENT_APP_STATUS = {
  // Students whose application is submitted or dropped — should NOT appear in Boost STI
  // U1007: 'Submitted to Institute',  // example: uncomment to test removal
};
STUDENTS.forEach(s => { s.applicationStatus = STUDENT_APP_STATUS[s.id] || null; });

function isBoostSTIActive(s) {
  return !STI_TERMINAL_STATUSES.includes(s.applicationStatus);
}

/* Revenue & services data per student */
const STUDENT_REVENUE_DATA = {
  U1001: { isQlPremium: true,  hasFinalisedUniversity: false, hasDocs: true,  specialServices: [],            hasPaidPremium: false, amountPaid: 0,      servicingType: 'partner',     nonPartnerSubType: null                    },
  U1002: { isQlPremium: false, hasFinalisedUniversity: false, hasDocs: false, specialServices: ['SOP'],        hasPaidPremium: false, amountPaid: 0,      servicingType: 'non-partner', nonPartnerSubType: 'specialised-services'  },
  U1003: { isQlPremium: true,  hasFinalisedUniversity: true,  hasDocs: true,  specialServices: [],            hasPaidPremium: true,  amountPaid: 85000,  servicingType: 'partner',     nonPartnerSubType: null                    },
  U1004: { isQlPremium: false, hasFinalisedUniversity: false, hasDocs: false, specialServices: ['Visa'],       hasPaidPremium: false, amountPaid: 0,      servicingType: 'non-partner', nonPartnerSubType: 'specialised-services'  },
  U1005: { isQlPremium: true,  hasFinalisedUniversity: true,  hasDocs: true,  specialServices: [],            hasPaidPremium: true,  amountPaid: 120000, servicingType: 'partner',     nonPartnerSubType: null                    },
  U1006: { isQlPremium: false, hasFinalisedUniversity: false, hasDocs: false, specialServices: ['SOP','Visa'], hasPaidPremium: false, amountPaid: 0,      servicingType: 'non-partner', nonPartnerSubType: 'premium-universities'  },
  U1007: { isQlPremium: false, hasFinalisedUniversity: false, hasDocs: false, specialServices: [],              hasPaidPremium: false, amountPaid: 0,      servicingType: 'non-partner', nonPartnerSubType: 'paid-application'      },
  U1008: { isQlPremium: true,  hasFinalisedUniversity: false, hasDocs: false, specialServices: [],              hasPaidPremium: true,  amountPaid: 60000,  servicingType: 'partner',     nonPartnerSubType: null                   },
  U1009: { isQlPremium: true,  hasFinalisedUniversity: true,  hasDocs: true,  specialServices: [],              hasPaidPremium: true,  amountPaid: 95000,  servicingType: 'partner',     nonPartnerSubType: null                   },
  U1010: { isQlPremium: false, hasFinalisedUniversity: false, hasDocs: false, specialServices: ['IELTS'],       hasPaidPremium: false, amountPaid: 0,      servicingType: 'non-partner', nonPartnerSubType: 'premium-universities' },
  U1011: { isQlPremium: false, hasFinalisedUniversity: false, hasDocs: false, specialServices: ['SOP','IELTS'], hasPaidPremium: false, amountPaid: 0,      servicingType: 'non-partner', nonPartnerSubType: 'specialised-services' },
  U1012: { isQlPremium: true,  hasFinalisedUniversity: true,  hasDocs: true,  specialServices: [],              hasPaidPremium: true,  amountPaid: 110000, servicingType: 'partner',     nonPartnerSubType: null                   },
};
STUDENTS.forEach(s => Object.assign(s, STUDENT_REVENUE_DATA[s.id] || { isQlPremium:false, hasFinalisedUniversity:false, hasDocs:false, specialServices:[], hasPaidPremium:false }));

/* ISL rating (out of 10) + escalation flag per student — used for Unhappy Cohort */
const STUDENT_ISL = {
  U1001: { islRating: 8.5, hasEscalation: false },
  U1002: { islRating: 6.2, hasEscalation: false },
  U1003: { islRating: 7.4, hasEscalation: false },
  U1004: { islRating: 5.8, hasEscalation: true  },
  U1005: { islRating: 9.1, hasEscalation: false },
  U1006: { islRating: 7.0, hasEscalation: false },
  U1007: { islRating: 4.3, hasEscalation: true  },
  U1008: { islRating: 8.0, hasEscalation: false },
  U1009: { islRating: 8.7, hasEscalation: false },
  U1010: { islRating: 6.0, hasEscalation: false },
  U1011: { islRating: 7.0, hasEscalation: true  },
  U1012: { islRating: 9.2, hasEscalation: false },
};
STUDENTS.forEach(s => Object.assign(s, STUDENT_ISL[s.id] || { islRating: 8.0, hasEscalation: false }));

/* Counsellor Assigned Date per student */
const STUDENT_CA_DATES = {
  U1001: '2026-04-10', U1002: '2026-04-15', U1003: '2026-03-20',
  U1004: '2026-05-01', U1005: '2026-03-05', U1006: '2026-04-22',
  U1007: '2026-05-10', U1008: '2026-04-28',
  U1009: '2026-05-15', U1010: '2026-05-20', U1011: '2026-05-25', U1012: '2026-05-18',
};
STUDENTS.forEach(s => { s.caDate = STUDENT_CA_DATES[s.id] || ''; });

/* WA unanswered messages — student asked in group, counsellor hasn't replied */
const WA_UNANSWERED = {
  U1002: [
    { question: 'Can you share details about the BBA admission process?', date: '2026-05-28', leadStatus: 'Application' },
    { question: 'What scholarship options are available for BBA Marketing?', date: '2026-05-29', leadStatus: 'Application' },
  ],
  U1004: [
    { question: 'I wanted to know more about the visa process for the USA intake.', date: '2026-05-27', leadStatus: 'STI' },
  ],
  U1007: [
    { question: 'What documents do I need to submit for B.Com admission?', date: '2026-05-26', leadStatus: 'STI' },
    { question: 'Is hostel accommodation available on campus?', date: '2026-05-28', leadStatus: 'STI' },
  ],
  U1010: [
    { question: 'When is the last date to pay the deposit?', date: '2026-06-08', leadStatus: 'Deposit' },
  ],
  U1011: [
    { question: 'Can you review my SOP draft before submission?', date: '2026-06-09', leadStatus: 'Application' },
    { question: 'What is the deadline for the IELTS waiver?', date: '2026-06-09', leadStatus: 'Application' },
  ],
};

/* Deferrals opportunity — admits with no deposit, or deposit with no visa */
const DEFERRAL_DATA = {
  U1002: { hasAdmitPrevIntake: true,  admitUniversity: 'London Business School',  admitIntake: 'Jan 2026', depositPaid: false, visaDone: false },
  U1006: { hasAdmitPrevIntake: true,  admitUniversity: 'Trinity College Dublin',   admitIntake: 'Sep 2025', depositPaid: false, visaDone: false },
  U1003: { hasAdmitPrevIntake: false, admitUniversity: 'Deakin University',        admitIntake: 'Feb 2026', depositPaid: true,  visaDone: false },
  U1008: { hasAdmitPrevIntake: false, admitUniversity: 'Massey University NZ',     admitIntake: 'Mar 2026', depositPaid: true,  visaDone: false },
  U1009: { hasAdmitPrevIntake: true,  admitUniversity: 'Warwick Business School',  admitIntake: 'Jan 2026', depositPaid: false, visaDone: false },
  U1012: { hasAdmitPrevIntake: false, admitUniversity: 'TU Munich',               admitIntake: 'Oct 2026', depositPaid: true,  visaDone: false },
};
STUDENTS.forEach(s => { s.deferral = DEFERRAL_DATA[s.id] || null; });

const BADGE_TYPES = [
  { id:'b1', icon:'🏆', name:'Top Performer',  desc:'Achieved #1 rank in any metric for a month',  color:'#F97316' },
  { id:'b2', icon:'🔥', name:'On Fire',         desc:'7-day streak above 100% on all metrics',       color:'#EF4444' },
  { id:'b3', icon:'💎', name:'Diamond Closer',  desc:'Achieved 10+ lock-ins in a single month',      color:'#8B5CF6' },
  { id:'b4', icon:'⭐', name:'Star Counselor',  desc:'Average rating above 8.5 for the month',       color:'#F59E0B' },
  { id:'b5', icon:'🚀', name:'Revenue Rocket',  desc:'Exceeded revenue target by 20%+',              color:'#10B981' },
  { id:'b6', icon:'🤝', name:'Referral King',   desc:'Generated 5+ referrals in a month',            color:'#3B82F6' },
];

/* Badges awarded to Priya Sharma (counselor id:1) */
const AWARDED_BADGES = [
  { counselorId:1, badgeId:'b1', awardedBy:'Sneha Kapoor', date:'15 Apr 2026', note:'Top in STI conversions for April!' },
  { counselorId:1, badgeId:'b4', awardedBy:'Sneha Kapoor', date:'01 May 2026', note:'Excellent rating all month!' },
  { counselorId:2, badgeId:'b5', awardedBy:'Sneha Kapoor', date:'01 May 2026', note:'Rohan smashed revenue targets!' },
  { counselorId:6, badgeId:'b2', awardedBy:'Vijay Kumar',  date:'10 May 2026', note:'Sahil on a 10-day streak!' },
];

let OFFERS = [
  { id:'o1', title:'Double Bonus on Lock-ins this week!', desc:'Close any lock-in between May 23–29 and earn ₹2,000 extra bonus per lock-in.', bucket:'lockin', expiry:'2026-05-29', active:true },
  { id:'o2', title:'STI Sprint — Top 3 get gift vouchers', desc:'Submit the most STIs between May 23–25. Top 3 win Amazon vouchers.', bucket:'sti', expiry:'2026-05-25', active:true },
  { id:'o3', title:'Application Accelerator Offer', desc:'Convert 5 applications this week and unlock a bonus slab upgrade.', bucket:'application', expiry:'2026-05-30', active:true },
];

/* Counsellor-specific live offers */
const COUNSELLOR_OFFERS = [
  {
    id:'co1', icon:'🏆', tag:'Performance Sprint',
    title:'Top Depositor of the Week!',
    desc:'Collect the highest deposits this week (May 27–31) and win a ₹3,000 Amazon voucher + profile badge.',
    reward:'₹3,000 Gift Voucher', expiry:'2026-05-31', active:true,
    gradFrom:'#1d4ed8', gradTo:'#1e3a8a',
    calcRows:[
      { rank:'1st Place',        prize:'₹3,000 Gift Voucher + 🏅 Profile Badge' },
      { rank:'2nd Place',        prize:'₹1,500 Gift Voucher' },
      { rank:'3rd Place',        prize:'₹500 Gift Voucher' },
      { rank:'All (5+ deposits)',prize:'₹500 bonus per deposit above target' },
    ],
    targetBucket:'deposit',
    targetDesc:'Students in Deposit stage — call and push them to complete fee payment this week.',
  },
  {
    id:'co2', icon:'🚀', tag:'Revenue Challenge',
    title:'Non-Partner Revenue Blitz',
    desc:'Collect ₹5L+ in paid service revenue before June 5 and unlock an extra 0.5% commission on your full month revenue.',
    reward:'+0.5% Commission Upgrade', expiry:'2026-06-05', active:true,
    gradFrom:'#1d4ed8', gradTo:'#1e3a8a',
    calcRows:[
      { rank:'Threshold',       prize:'₹5L paid service revenue' },
      { rank:'Reward',          prize:'+0.5% commission on entire May revenue' },
      { rank:'Example payout',  prize:'₹8L × 2.5% = ₹20,000 total commission' },
      { rank:'Bonus',           prize:'₹1,000 per additional ₹50K above ₹5L' },
    ],
    targetBucket:'lockin',
    targetDesc:'Students with finalised universities — push for paid service enrolment closures.',
  },
  {
    id:'co3', icon:'⭐', tag:'Referral Boost',
    title:'Referral King — Earn Extra ₹1,000',
    desc:'Get 3+ confirmed referrals from your existing students this week. Every referral that converts earns ₹1,000 extra on top of your slab.',
    reward:'₹1,000 per referral', expiry:'2026-06-02', active:true,
    gradFrom:'#2563eb', gradTo:'#1e40af',
    calcRows:[
      { rank:'Base Slab',    prize:'Standard referral bonus applies' },
      { rank:'Sprint Bonus', prize:'+₹1,000 per referral that converts' },
      { rank:'3 referrals',  prize:'Extra ₹3,000 bonus this week' },
      { rank:'5+ referrals', prize:'Extra ₹5,000 + Special Recognition Badge' },
    ],
    targetBucket:'sti',
    targetDesc:'Engaged students (ISL > 8, app downloaded) — highest referral probability. Ask after positive touchpoints.',
  },
];

/* ── Info Hub Data (12 universities) ── */
const INFO_HUB_DATA = [
  /* UK */
  { id:'u1', name:'University of Manchester', country:'UK', flag:'🇬🇧', city:'Manchester', type:'Public', desc:'Top 25 global university with world-class research programs across business, science and engineering.',
    website:'https://www.manchester.ac.uk', intake:['Sep 2026','Jan 2027'], depositInr:85000, depositCcy:'£800', depositDeadline:'2026-07-15', refundPolicy:'Full refund if visa refused', paymentNotes:'Bank transfer or card',
    scholarship:{ name:'Manchester Global Scholarship', eligibility:['First-class degree or equivalent','IELTS 6.5+','Letter of motivation'], amount:'20% tuition fee waiver', deadline:'2026-05-31' },
    courses:[{ name:'MSc Data Science', duration:'1 year', fee:'£28,000/yr', entry:'IELTS 6.5, 2.1 degree' },{ name:'MBA', duration:'1 year', fee:'£32,000/yr', entry:'GMAT 600+, 3 yrs exp' }],
    docs:['SOP','2 LORs','Transcripts','IELTS/TOEFL','CV','Degree Certificate'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'20 May 2026' },

  { id:'u2', name:'University of Edinburgh', country:'UK', flag:'🇬🇧', city:'Edinburgh', type:'Public', desc:'Ancient research university ranked in the global top 30, known for its vibrant campus and diverse programs.',
    website:'https://www.ed.ac.uk', intake:['Sep 2026'], depositInr:90000, depositCcy:'£850', depositDeadline:'2026-06-30', refundPolicy:'50% refund if withdrawn 60 days before start', paymentNotes:'Online payment portal',
    scholarship:{ name:'Edinburgh Global Online Learning Scholarship', eligibility:['Academic excellence','Demonstrated financial need','Strong references'], amount:'₹1,00,000 off tuition', deadline:'2026-06-01' },
    courses:[{ name:'MSc Artificial Intelligence', duration:'1 year', fee:'£30,500/yr', entry:'IELTS 6.5, CS background' },{ name:'MSc Finance', duration:'1 year', fee:'£27,500/yr', entry:'GMAT 650+' }],
    docs:['SOP','2 LORs','Transcripts','IELTS','Portfolio (if applicable)','CV'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'18 May 2026' },

  { id:'u3', name:"King's College London", country:'UK', flag:'🇬🇧', city:'London', type:'Public', desc:'Russell Group university in the heart of London, one of the largest and oldest in the UK.',
    website:'https://www.kcl.ac.uk', intake:['Sep 2026','Jan 2027'], depositInr:95000, depositCcy:'£900', depositDeadline:'2026-08-01', refundPolicy:'Non-refundable except visa refusal', paymentNotes:'Bank transfer only',
    scholarship:{ name:"King's International Postgraduate Scholarship", eligibility:['Outstanding academic record','Non-EU international student','Unconditional offer holder'], amount:'£5,000 off first year', deadline:'2026-06-15' },
    courses:[{ name:'MSc International Management', duration:'1 year', fee:'£31,500/yr', entry:'IELTS 7.0, 2.1 degree' },{ name:'MSc Computer Science', duration:'1 year', fee:'£33,500/yr', entry:'IELTS 7.0, CS degree' }],
    docs:['SOP','2 LORs','Transcripts','IELTS/TOEFL','CV','Research proposal (for research programs)'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'15 May 2026' },

  { id:'u4', name:'University of Birmingham', country:'UK', flag:'🇬🇧', city:'Birmingham', type:'Public', desc:'Russell Group research university offering more than 300 taught postgraduate programs.',
    website:'https://www.birmingham.ac.uk', intake:['Sep 2026'], depositInr:75000, depositCcy:'£700', depositDeadline:'2026-07-31', refundPolicy:'Full refund if visa refused', paymentNotes:'Card or bank transfer',
    scholarship:{ name:'Birmingham Global Masters Scholarship', eligibility:['Merit-based','First-class or high second-class degree','Research statement required'], amount:'15% tuition waiver', deadline:'2026-05-30' },
    courses:[{ name:'MSc Business Analytics', duration:'1 year', fee:'£24,500/yr', entry:'IELTS 6.5, quantitative background' },{ name:'MBA', duration:'1 year', fee:'£28,000/yr', entry:'GMAT 550+, 2 yrs exp' }],
    docs:['SOP','2 LORs','Transcripts','IELTS','CV'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'12 May 2026' },

  /* USA */
  { id:'u5', name:'University of Illinois Urbana-Champaign', country:'USA', flag:'🇺🇸', city:'Champaign, IL', type:'Public', desc:'Top-10 engineering school and one of the largest universities in the US, globally ranked for tech programs.',
    website:'https://illinois.edu', intake:['Jan 2027','Sep 2026'], depositInr:60000, depositCcy:'$700', depositDeadline:'2026-12-01', refundPolicy:'Non-refundable', paymentNotes:'Online portal only',
    scholarship:{ name:'Illinois Graduate College Fellowship', eligibility:['GPA 3.5+','GRE 320+ recommended','Research experience preferred'], amount:'$5,000/year stipend', deadline:'2026-07-01' },
    courses:[{ name:'MS Computer Science', duration:'2 years', fee:'$18,000/yr', entry:'GRE 320+, CS background' },{ name:'MBA iMBA', duration:'2 years', fee:'$22,000 total', entry:'GMAT 600+' }],
    docs:['SOP','3 LORs','Transcripts','GRE/GMAT','TOEFL/IELTS','CV'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'19 May 2026' },

  { id:'u6', name:'Northeastern University', country:'USA', flag:'🇺🇸', city:'Boston, MA', type:'Private', desc:'Co-op focused research university with exceptional industry placement and a global campus network.',
    website:'https://www.northeastern.edu', intake:['Sep 2026','Jan 2027'], depositInr:55000, depositCcy:'$650', depositDeadline:'2026-06-15', refundPolicy:'Refundable within 30 days', paymentNotes:'Credit card or wire transfer',
    scholarship:{ name:'Northeastern Merit Scholarship', eligibility:['GPA 3.7+','TOEFL 100+ or IELTS 7.0','Strong work experience'], amount:'Up to $15,000/year', deadline:'2026-05-31' },
    courses:[{ name:'MS Data Analytics Engineering', duration:'1.5 years', fee:'$33,000/yr', entry:'GRE 310+, quant background' },{ name:'MS Information Systems', duration:'1.5 years', fee:'$31,000/yr', entry:'TOEFL 100+' }],
    docs:['SOP','2 LORs','Transcripts','GRE/GMAT','TOEFL','CV','Portfolio'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'17 May 2026' },

  { id:'u7', name:'University of Massachusetts Amherst', country:'USA', flag:'🇺🇸', city:'Amherst, MA', type:'Public', desc:'Flagship campus of the UMass system, known for strong STEM programs and research output.',
    website:'https://www.umass.edu', intake:['Sep 2026'], depositInr:50000, depositCcy:'$600', depositDeadline:'2026-07-01', refundPolicy:'50% refund within 45 days', paymentNotes:'Online or bank transfer',
    scholarship:{ name:'UMass International Graduate Award', eligibility:['Academic merit','First-time enrollee','Full-time status'], amount:'$3,000 one-time award', deadline:'2026-06-01' },
    courses:[{ name:'MS Computer Science', duration:'2 years', fee:'$16,500/yr', entry:'GRE 315+' },{ name:'MBA', duration:'2 years', fee:'$19,500/yr', entry:'GMAT 580+, 2 yrs exp' }],
    docs:['SOP','3 LORs','Transcripts','GRE','TOEFL','CV'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'14 May 2026' },

  /* Canada */
  { id:'u8', name:'University of Toronto', country:'Canada', flag:'🇨🇦', city:'Toronto, ON', type:'Public', desc:'Canada\'s #1 university and a global top-20, offering world-class research and a vibrant international community.',
    website:'https://www.utoronto.ca', intake:['Sep 2026','Jan 2027'], depositInr:70000, depositCcy:'CA$1,000', depositDeadline:'2026-06-30', refundPolicy:'Full refund if visa refused within 30 days', paymentNotes:'Bank draft or online',
    scholarship:{ name:'UofT International Student Award', eligibility:['Academic excellence','IELTS 7.0+','Full-time masters enrollment'], amount:'CA$5,000 per year', deadline:'2026-05-15' },
    courses:[{ name:'MEng in Engineering', duration:'1 year', fee:'CA$28,000/yr', entry:'IELTS 7.0, relevant undergrad' },{ name:'MBA Rotman', duration:'2 years', fee:'CA$45,000/yr', entry:'GMAT 650+, 3 yrs exp' }],
    docs:['SOP','2 LORs','Transcripts','IELTS/TOEFL','CV','Proof of funding'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'21 May 2026' },

  { id:'u9', name:'York University', country:'Canada', flag:'🇨🇦', city:'Toronto, ON', type:'Public', desc:'One of Canada\'s largest universities with strong business, arts, and science programs, known for diversity.',
    website:'https://www.yorku.ca', intake:['Sep 2026','Jan 2027'], depositInr:52000, depositCcy:'CA$750', depositDeadline:'2026-08-01', refundPolicy:'Non-refundable but deferral available', paymentNotes:'Online payment only',
    scholarship:{ name:'York University International Entrance Scholarship', eligibility:['80%+ in last 2 years of study','IELTS 6.5+','Full-time enrollment'], amount:'CA$3,000 one-time', deadline:'2026-06-30' },
    courses:[{ name:'MBA Full-Time', duration:'2 years', fee:'CA$35,000/yr', entry:'GMAT 570+, 3 yrs exp' },{ name:'MSc Management', duration:'2 years', fee:'CA$22,000/yr', entry:'IELTS 7.0' }],
    docs:['SOP','2 LORs','Transcripts','GMAT/GRE','IELTS','CV'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'16 May 2026' },

  { id:'u10', name:'University of Waterloo', country:'Canada', flag:'🇨🇦', city:'Waterloo, ON', type:'Public', desc:'Canada\'s top tech and engineering university, globally renowned for co-op programs and startup ecosystem.',
    website:'https://uwaterloo.ca', intake:['Sep 2026'], depositInr:65000, depositCcy:'CA$900', depositDeadline:'2026-07-15', refundPolicy:'Full refund if visa refused', paymentNotes:'Bank transfer or certified cheque',
    scholarship:{ name:'Waterloo International Masters Award of Excellence', eligibility:['90%+ GPA equivalent','Research background','Strong references'], amount:'CA$10,000/year', deadline:'2026-05-01' },
    courses:[{ name:'MEng Systems Design', duration:'16 months', fee:'CA$30,000 total', entry:'IELTS 7.0, engineering background' },{ name:'MDS Data Science', duration:'12 months', fee:'CA$26,000 total', entry:'GRE 315+' }],
    docs:['SOP','2 LORs','Transcripts','GRE','IELTS','CV','Research statement'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'13 May 2026' },

  /* Australia */
  { id:'u11', name:'University of Melbourne', country:'Australia', flag:'🇦🇺', city:'Melbourne, VIC', type:'Public', desc:'Australia\'s #1 university and global top-35, offering research-led graduate programs across all disciplines.',
    website:'https://www.unimelb.edu.au', intake:['Feb 2027','Jul 2026'], depositInr:80000, depositCcy:'A$1,200', depositDeadline:'2026-10-15', refundPolicy:'Refundable if cancelled 4 weeks before start', paymentNotes:'ePayment via portal',
    scholarship:{ name:'Melbourne International Undergraduate Scholarship', eligibility:['Academic excellence','Strong English proficiency','Non-Australian citizen'], amount:'Up to 100% tuition waiver', deadline:'2026-06-01' },
    courses:[{ name:'Master of Data Science', duration:'2 years', fee:'A$42,000/yr', entry:'IELTS 6.5, quant degree' },{ name:'Master of Business Administration', duration:'2 years', fee:'A$55,000/yr', entry:'GMAT 620+, 3 yrs exp' }],
    docs:['SOP','2 LORs','Transcripts','IELTS/TOEFL','CV','Academic reference'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'22 May 2026' },

  { id:'u12', name:'University of Sydney', country:'Australia', flag:'🇦🇺', city:'Sydney, NSW', type:'Public', desc:'Australia\'s first university, consistently ranked in the global top 50 with a vibrant city campus and strong alumni network.',
    website:'https://www.sydney.edu.au', intake:['Jul 2026','Feb 2027'], depositInr:75000, depositCcy:'A$1,100', depositDeadline:'2026-09-01', refundPolicy:'Full refund if visa refused', paymentNotes:'Credit card or bank transfer',
    scholarship:{ name:'Sydney Scholars International Award', eligibility:['Top 10% of graduating cohort','IELTS 7.0+','Academic achievement statement'], amount:'A$5,000 per year', deadline:'2026-07-01' },
    courses:[{ name:'Master of Information Technology', duration:'1.5 years', fee:'A$38,000/yr', entry:'IELTS 7.0, IT background' },{ name:'MBA', duration:'2 years', fee:'A$52,000/yr', entry:'GMAT 600+, 5 yrs exp' }],
    docs:['SOP','2 LORs','Transcripts','IELTS','CV','GMAT/GRE (optional)'], lastUpdatedBy:'Nisha Agarwal', lastUpdatedDate:'20 May 2026' },
];

/* ── Bot Intent Map ── */
const BOT_INTENT_MAP = {
  boost_sti: {
    keywords: ['sti','submission','how to get sti','sti low','increase sti','no sti','sti nahi'],
    answer: `📋 **Boost STI** — Students who haven't submitted their STI yet are in this pipeline.\n\n**Top actions to get more STIs:**\n1. Call the student and walk them through the STI form step by step\n2. Share the STI template via WhatsApp\n3. Book a 15-min Zoom session to complete it together\n4. Set a follow-up date and log it in the subtask panel`,
    navLabel: '→ Go to Boost STI',
    navAction: () => { switchTab('tab1'); setTimeout(() => openBoostDrawer('sti'), 300); },
  },
  boost_application: {
    keywords: ['application','app stuck','application nahi','apply','submit application','no application','boost app'],
    answer: `📝 **Boost Application** — Students who have an STI but haven't submitted a full application.\n\n**Key actions:**\n1. Send the application checklist document via WhatsApp\n2. Schedule a session to walk through the form\n3. Follow up on pending documents (transcripts, LORs)\n4. Use the Activity Log to track every touchpoint`,
    navLabel: '→ Go to Boost Application',
    navAction: () => { switchTab('tab1'); setTimeout(() => openBoostDrawer('application'), 300); },
  },
  boost_deposit: {
    keywords: ['deposit','payment nahi','fee','deposit low','collect deposit','no deposit','boost deposit','deposit stuck'],
    answer: `💳 **Boost Deposit** — Students who applied but haven't paid a deposit.\n\n**Deposit follow-up strategy:**\n1. Create urgency — mention limited seats and fee deadlines\n2. Share the exact payment link + bank details\n3. Offer a call with the finance team if student is hesitant\n4. Log a "Promise to Pay" in the subtask outcome if they commit`,
    navLabel: '→ Go to Boost Deposit',
    navAction: () => { switchTab('tab1'); setTimeout(() => openBoostDrawer('deposit'), 300); },
  },
  boost_lockin: {
    keywords: ['lock','lockin','lock-in','lock in','lock nahi','closing','close deal','lock nahi ho','seal the deal'],
    answer: `🔒 **Boost Lock-in** — Students who have a shortlisting offer but haven't paid any amount for any service.\n\n**Lock-in closing tactics:**\n1. Share the offer letter and congratulate them genuinely\n2. Break down the payment into simple steps\n3. Highlight the ROI — salary data, alumni success stories\n4. Set a 48-hour deadline to maintain urgency`,
    navLabel: '→ Go to Boost Lock-in',
    navAction: () => { switchTab('tab1'); setTimeout(() => openBoostDrawer('lockin'), 300); },
  },
  raise_ticket: {
    keywords: ['ticket','raise ticket','support','issue','problem','complaint','koi problem'],
    answer: `🎫 **Raising a Support Ticket** — Here's how:\n\n1. Go to **Learning & Development** tab\n2. Click "Raise a Support Request" at the bottom\n3. Select a category, add subject + description\n4. Submit — ops team responds within 4 working hours\n\nUse tickets for: data corrections, incentive queries, training access, or technical issues.`,
    navLabel: '→ Go to Support',
    navAction: () => { switchTab('tab3'); setTimeout(openTicketModal, 400); },
  },
  find_student: {
    keywords: ['student list','where student','find student','search student','my students','kaun kaun','pipeline'],
    answer: `👥 **Finding your students:**\n\nYour full pipeline is organized in the **4 Boost Task Cards** at the top of the Tasks & Performance tab.\n\n- Each card shows students at a specific stage (STI → Application → Deposit → Lock-in)\n- Click any card to see the full student list\n- Use the search bar inside the drawer to find a specific student by name or ID`,
    navLabel: '→ Go to Tasks & Performance',
    navAction: () => { switchTab('tab1'); setTimeout(() => { const el = document.getElementById('boostCardsGrid'); if(el) el.classList.add('nav-pulse'); setTimeout(() => el.classList.remove('nav-pulse'), 900); }, 300); },
  },
  read_metrics: {
    keywords: ['metric','conversion','what is ca','conversion %','ka matlab','mean','% kya','kya hai metric','explain metric','10 metric'],
    answer: `📊 **Your 10 Metrics explained:**\n\n**Volume:**\n• STIs, Applications, Deposits, Lock-ins — actual count + % of students assigned (CA)\n• Tasks Completed — vs daily target\n\n**Quality:**\n• Revenue Collected — ₹ earned vs target\n• F2F Discussions — face-to-face meetings done\n• ISL Feedback Rating — post-F2F score out of 5\n• Referral % from CA — % of your students who referred someone\n• Quality Score — 1st Call + 2nd Call scores separately`,
    navLabel: null,
    navAction: null,
  },
  incentive_slabs: {
    keywords: ['incentive details', 'incentive','slab','bonus','earning','salary','kitna milega','kitna kamaonga','paise','commission','kya milega'],
    answer: `💰 **How your incentives work:**\n\n1. **Calls Slab** — Bonus for hitting ≥80% of daily call target\n2. **Enrolment Bonus** — Fixed ₹6,000 per confirmed enrolment\n3. **Revenue Bonus** — 1% of revenue above ₹2 Lakh threshold\n\nYour current earning: ₹38,400 this month. Projected at 100%: ₹72,000.\n\nSee the full breakdown in the Incentives tab.`,
    navLabel: '→ See Incentive Breakdown',
    navAction: () => { switchTab('tab2'); },
  },
  opportunity_size: {
    keywords: ['opportunity','pipeline value','potential','max earn','kitna earn','opportunity size','how much can i earn'],
    answer: `🎯 **Opportunity Size** is the total revenue possible from all students in your current pipeline who haven't fully locked in yet.\n\nIt's calculated as the sum of course fees for all assigned students who haven't paid the final lock-in amount.\n\nClick the orange Opportunity Size card on the Incentives tab to see a student-by-student breakdown.`,
    navLabel: '→ View Opportunity Pipeline',
    navAction: () => { switchTab('tab2'); setTimeout(openOpportunityDrawer, 400); },
  },
  quick_links: {
    keywords: ['join session','video','meet','zoom','template','sheet','template kahan','quick link','session link'],
    answer: `🔗 **Quick Links** in your L&D tab:\n\n1. **Join Session** — Opens the configured video call (Google Meet / Zoom / 100ms)\n2. **Open Templates** — Opens the shared Google Sheet with all templates and SOPs\n3. **Raise a Request** — Opens the support ticket form\n\nYour ops team sets the actual URLs from the Admin Panel.`,
    navLabel: '→ Go to Quick Links',
    navAction: () => { switchTab('tab3'); },
  },
  contact_business_head: {
    keywords: ['business head','contact','training contact','escalate','manager contact','head kaise','reach business head'],
    answer: null, // dynamic — filled in at render time from bot settings
    navLabel: null,
    navAction: null,
  },
  give_feedback: {
    keywords: ['feedback','product feedback','suggestion','improve','kya sahi nahi','bug','feature request','dena chahta'],
    answer: `💬 **Giving product feedback:**\n\n1. Go to **Learning & Development** tab\n2. Click "Raise a Support Request"\n3. Select **Category: Product Feedback** from the dropdown\n4. Describe your suggestion in the description field\n\nAll feedback goes directly to the ops team and is reviewed weekly.`,
    navLabel: '→ Raise a Feedback Ticket',
    navAction: () => { switchTab('tab3'); setTimeout(() => { openTicketModal(); const sel = document.getElementById('ticketCategory'); if(sel) sel.value = 'Product Feedback'; }, 400); },
  },
  college_info: {
    keywords: ['university','college','manchester','edinburgh','kings','birmingham','illinois','northeastern','umass','toronto','york','waterloo','melbourne','sydney','uni','deposit for','course','scholarship','intake','fees'],
    answer: null, // dynamic lookup
    navLabel: '→ Browse Info Hub',
    navAction: () => { switchTab('tab3'); setTimeout(() => { const el = document.getElementById('infoHubSection'); if (el) { el.scrollIntoView({ behavior:'smooth', block:'start' }); if (!document.getElementById('infoHubBody').classList.contains('block')) toggleInfoHub(); } }, 400); },
  },
  greeting: {
    keywords: ['good morning', 'good afternoon', 'good evening', 'good night', 'hello there', 'hi there', 'hey there', 'namaste', 'hello', 'hi', 'hey', 'hii', 'helo', 'heyy'],
    answer: null, navLabel: null, navAction: null,
  },
  training_help: {
    keywords: ['training / i want to learn', 'i want to learn', 'how to get training', 'need training', 'want training', 'training chahiye', 'training karo', 'sikha do', 'learn something', 'skill improve', 'improve my skill', 'training'],
    answer: null, navLabel: null, navAction: null,
  },
  live_offers_query: {
    keywords: ['live offers running?', 'live offers running', 'what live offer', 'offers running', 'live offer running', 'kya offer chal raha', 'offer kya hai', 'what offers are running', 'current live offer'],
    answer: null, navLabel: null, navAction: null,
  },
  earn_more_guide: {
    keywords: ['how can i earn more', 'earn more money', 'increase my earnings', 'how to earn more', 'zyada earn', 'more paise', 'earn kaise karu', 'boost my income'],
    answer: null, navLabel: null, navAction: null,
  },
  target_today_guide: {
    keywords: ['target for today', 'what is target for today', 'aaj ka target', 'target today', 'what are my targets today'],
    answer: null, navLabel: null, navAction: null,
  },
  who_to_call_guide: {
    keywords: ['who should i call today', 'whom should i call', 'who to call today', 'call list today', 'aaj kise call'],
    answer: null, navLabel: null, navAction: null,
  },
  start_my_day: {
    keywords: ['start my day', 'what should i do today', 'where do i begin', 'morning routine', 'start kahan', 'how do i start', 'what to do today', 'morning'],
    answer: null,
    navLabel: null,
    navAction: null,
  },
  connect_business_team: {
    keywords: ['connect with business', 'business team', 'talk to business', 'business head', 'business se baat', 'connect with manager', 'business team se baat'],
    answer: null,
    navLabel: null,
    navAction: null,
  },
  need_help: {
    keywords: ['i need help', 'need help', 'help chahiye', 'help karo', 'mujhe help', 'help please', 'koi help', 'help karna'],
    answer: null,
    navLabel: null,
    navAction: null,
  },
  top_performer: {
    keywords: ['top performer in my cluster', 'top performer in org', 'top performer in the org', 'top performing counsellor', 'top performing counselor', 'who is the top performing', 'top performing', 'top performer', 'best performer', 'who is top', 'top kaun', 'highest performer', 'cluster top', 'org top', 'who performed best', 'best counsellor', 'top counsellor', 'highest calls', 'highest revenue', 'best this month', 'performing counsellor', 'performing counselor'],
    answer: null,
    navLabel: null,
    navAction: null,
  },
  incentive_clarify: {
    keywords: ['understand my incentive', 'incentive calculation', 'incentive samajhna', 'explain my incentive', 'how is incentive calculated', 'incentive kaise', 'incentive clarity', 'incentive explain', 'incentive details', 'how incentive works', 'mera incentive'],
    answer: null,
    navLabel: null,
    navAction: null,
  },
  my_targets: {
    keywords: ['my target', 'what is my target', 'target kya hai', 'today target', 'target batao', 'daily target', 'what are my targets', 'target for today', 'kitna target'],
    answer: null, // dynamic
    navLabel: '→ Go to My Dashboard',
    navAction: () => { switchTab('tab1'); },
  },
  who_to_call: {
    keywords: ['who to call', 'call list', 'priority students', 'should i call', 'call karo', 'whom to call', 'which student to call', 'call priority', 'kaun call', 'call sequence'],
    answer: null, // dynamic
    navLabel: '→ View My Pipeline',
    navAction: () => { switchTab('tab1'); },
  },
  my_performance_today: {
    keywords: ['how am i doing', 'today performance', 'aaj ka status', 'my stats today', 'performance today', 'mera performance', 'kya status', 'how is my performance', 'aaj kitna'],
    answer: null, // dynamic
    navLabel: '→ Go to My Dashboard',
    navAction: () => { switchTab('tab1'); },
  },
  live_offers_for_me: {
    keywords: ['live offers for me', 'what offers', 'current offers', 'counsellor offers', 'live for counsellor', 'koi offer', 'offer hai kya', 'earn more', 'sprint', 'performance sprint', 'referral offer'],
    answer: `🎁 **Live offers for you are in the Incentives tab!**\n\nThe **Live for Counsellors** section shows all active performance drives — with the full incentive structure and exactly which students to target to earn from each.\n\nClick any offer card to see:\n• The earning milestones & prizes\n• Specific students in your pipeline to focus on`,
    navLabel: '→ See Live Offers for Me',
    navAction: () => { switchTab('tab2'); setTimeout(() => { const el = document.getElementById('counsellorOffersRow'); if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); }, 400); },
  },
  view_leaderboard: {
    keywords: ['show me the leaderboard', 'show leaderboard', 'view leaderboard', 'open leaderboard', 'leaderboard dekhna', 'top performers table', 'top performers list', 'leaderboard'],
    answer: `🏆 **Taking you to the Top Performers leaderboard!**\n\nYou can switch between **Today**, **This Month**, and **This Year** to compare across the team.`,
    navLabel: '→ View Top Performers',
    navAction: () => {
      switchTab('tab1');
      setTimeout(() => {
        const body = document.getElementById('body-topPerformers');
        if (body && body.classList.contains('hidden')) {
          toggleSection('topPerformers');
        }
        const el = document.getElementById('leaderboardGrid');
        const mc = document.getElementById('mainContent');
        if (el && mc) mc.scrollTo({ top: el.getBoundingClientRect().top + mc.scrollTop - 80, behavior: 'smooth' });
      }, 400);
    },
  },
  clarify_before_answering: {
    keywords: ['help me', "i'm stuck", 'im stuck', 'something wrong', "something's wrong"],
    answer: null,
    navLabel: null,
    navAction: null,
  },
  fallback: {
    keywords: [],
    answer: `🤔 I'm not sure about that one. Here's how you can get help:\n\n• Try rephrasing your question\n• Browse the relevant tab directly\n• Raise a support ticket for ops team help`,
    navLabel: '→ Raise a Support Ticket',
    navAction: () => { switchTab('tab3'); setTimeout(openTicketModal, 400); },
  },
};

/* ── Action Items (Feature C) ── */
let ACTION_ITEMS = [
  {
    id: 'ai_001',
    title: 'Complete IELTS training module',
    description: 'Mandatory before your next cohort intake. All counselors must finish by 31 May.',
    links: [
      { label: 'Training Module', url: 'https://example.com/ielts-training' },
      { label: 'FAQ Doc', url: 'https://example.com/faq' },
    ],
    sentAt: '2026-05-21T14:30:00Z',
    completed: false,
    completedAt: null,
  },
  {
    id: 'ai_002',
    title: 'Update your student pipeline — May intake',
    description: 'Ensure all STI statuses are updated before the 29 May deadline.',
    links: [
      { label: 'Pipeline Template', url: 'https://docs.google.com/spreadsheets/d/example' },
    ],
    sentAt: '2026-05-23T09:00:00Z',
    completed: false,
    completedAt: null,
  },
  {
    id: 'ai_003',
    title: 'Attend team standup — 28 May 10 AM',
    description: 'Monthly metrics review with the business head. Attendance is mandatory.',
    links: [
      { label: 'Join Google Meet', url: 'https://meet.google.com/abc-defg-hij' },
    ],
    sentAt: '2026-05-24T08:00:00Z',
    completed: true,
    completedAt: '2026-05-24T10:45:00Z',
  },
];

/* ── Unhappy Alerts (Feature D) ── */
let UNHAPPY_ALERTS = [
  {
    id: 'ua_001',
    leadId: 'U1001',
    studentName: 'Aarav Mehta',
    reason: 'Shortlist misalignment — student requested lower-budget universities not added',
    raisedAt: '2026-05-27T08:15:00Z',
    resolved: false,
  },
  {
    id: 'ua_002',
    leadId: 'U1004',
    studentName: 'Prerna Singh',
    reason: 'Follow-up missed — student flagged lack of response after callback request',
    raisedAt: '2026-05-27T09:00:00Z',
    resolved: false,
  },
];

/* ── Bot Settings state ── */
let BOT_SETTINGS = {
  enabled: true,
  businessHead: { name:'Rajesh Sharma', designation:'Business Head — EdTech Division', contact:'+91 98765 43210 · rajesh@edu.in' },
  faqs: [],
};

/* ── Info Hub filter state ── */
let infoHubState = {
  expanded: false,
  search: '',
  filters: { country:'All', courseType:'All', deposit:'All', intake:'All' },
  searchTimer: null,
};

let QUICK_LINK_URLS = {
  session: 'https://meet.google.com/abc-defg-hij',
  sheet:   'https://docs.google.com/spreadsheets/d/example',
};

/* ── Stable seeds for leaderboard ── */
const EARNER_SEED_MONTH   = [88400,72000,45000,91000,63500,55000,38000,79000];
const EARNER_SEED_ALLTIME = [720000,540000,380000,810000,495000,430000,290000,670000];
const EARNER_TL_SEED_MONTH   = [142000, 118000];
const EARNER_TL_SEED_ALLTIME = [1240000, 980000];
const offsets = [0.95,1.08,0.72,1.00,0.88,1.15,0.62,0.91];
const histMults = [0.82,0.91,0.74,0.88,0.95,0.79,1.00,0.86,0.93,0.77,0.90,0.84];

/* ── State ── */
let state = {
  role: 'counselor',
  currentUser: null,
  viewingCounselorId: 1,
  historyPeriod: '7d',
  leaderPeriod: 'today',
  currentTab: 'tab1',
  currentAdminPanel: 'users',
  loginAttempts: 0,
  lockedUntil: null,
  earningsChart: null,
  drawerMode: null,
  drawerBoostType: null,
  drawerBoostSubType: null,
  drawerBoostSubCardId: null,
  drawerVolumeMetricKey: null,
  drawerRevenueSubCardId: null,
  drawerSelectedStudent: null,
  drawerPrevMode: null,
  selectedSubtask: null,
  ownTasks: [],
  boostAcknowledged: {},
  botOpen: false,
  botActiveTab: 'chat',
  chatPanel: { unreadCount: 0, lastOpenedAt: null },
  botConversation: {
    flow: null,
    step: 0,
    collected: {},
    history: [],
    lastIntent: null,
    shownFollowUps: [],
  },
};

/* ═══════════════ UTILS ═══════════════ */

function fmt(n) {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
  if (n >= 1000)   return '₹' + (n / 1000).toFixed(0) + 'K';
  return '₹' + n.toLocaleString('en-IN');
}

function fmtPct(actual, target) {
  return target ? Math.round((actual / target) * 100) : 0;
}

function colorClass(pct) {
  if (pct >= 100) return 'green';
  if (pct >= 60)  return 'amber';
  return 'red';
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}

function detectPlatform(url) {
  if (!url) return 'Session';
  if (url.includes('meet.google')) return 'Google Meet';
  if (url.includes('zoom.us'))    return 'Zoom';
  if (url.includes('100ms'))      return '100ms';
  return 'Video Session';
}

function platformIcon(url) {
  if (!url) return '📹';
  if (url.includes('meet.google')) return '🎥';
  if (url.includes('zoom.us'))    return '📹';
  if (url.includes('100ms'))      return '📡';
  return '🔗';
}

function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const now = new Date('2026-05-23');
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function bucketLabel(bucket) {
  const map = { sti:'Boost STI', application:'Boost Application', deposit:'Boost Deposit', lockin:'Boost Lock-in' };
  return map[bucket] || bucket;
}

function bucketEmoji(bucket) {
  const map = { sti:'📋', application:'📝', deposit:'💳', lockin:'🔒' };
  return map[bucket] || '🎯';
}

/* ═══════════════ LOGIN ═══════════════ */

function togglePwd() {
  const inp = document.getElementById('loginPwd');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

function forgotPwd() { showToast('Password reset link sent to your email.', 'info'); }

function handleLogin() {
  const btn = document.getElementById('loginBtn');
  if (state.lockedUntil && Date.now() < state.lockedUntil) {
    showError('Account locked. Try again after 10 minutes.'); return;
  }
  const email = document.getElementById('loginEmail').value.trim();
  const pwd   = document.getElementById('loginPwd').value;
  if (!email || !pwd) { showError('Please enter email and password.'); return; }
  state.loginAttempts++;
  if (state.loginAttempts >= 3) {
    state.lockedUntil = Date.now() + 10 * 60 * 1000;
    btn.disabled = true;
    showError('Too many failed attempts. Account locked for 10 minutes.'); return;
  }
  const role = document.getElementById('loginRole').value;
  state.role = role;
  bootApp(role, email);
}

function showError(msg) {
  const el = document.getElementById('loginError');
  el.textContent = msg;
  el.classList.remove('hidden');
}

/* ═══════════════ BOOT ═══════════════ */

function bootApp(role, email) {
  // Determine current user
  if (role === 'counselor') {
    state.currentUser = COUNSELORS.find(c => c.email === email) || COUNSELORS[0];
    state.viewingCounselorId = state.currentUser.id;
  } else if (role === 'team_lead') {
    state.currentUser = TEAM_LEADS.find(u => u.email === email) || TEAM_LEADS[0];
    state.viewingCounselorId = 1;
  } else {
    state.currentUser = OPS_USERS.find(u => u.email === email) || OPS_USERS[0];
    state.viewingCounselorId = 1;
  }

  // Restore chat history for this user
  restoreHistory();

  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('appShell').classList.remove('hidden');

  // Header
  const u = state.currentUser;
  document.getElementById('headerAvatar').textContent = u.avatar || initials(u.name);
  document.getElementById('headerName').textContent   = u.name.split(' ')[0];

  // Reset all role-gated elements before applying role-specific visibility
  ['counselorSelectorWrapper', 'tlCounsellorFilterBar', 'adminTabBtn',
   'leaderViewToggleWrap', 'earnerViewToggleWrap'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  // Admin tab
  if (role === 'ops_admin') {
    document.getElementById('adminTabBtn').classList.remove('hidden');
  }

  // Counselor selector in header — visible for TL and ops_admin, NEVER for counselor
  if (role === 'team_lead' || role === 'ops_admin') {
    const wrapper = document.getElementById('counselorSelectorWrapper');
    wrapper.classList.remove('hidden');
    const sel = document.getElementById('counselorSelector');
    sel.innerHTML = '';
    // TL sees only their team's counsellors; ops_admin sees all
    const cList = (role === 'team_lead')
      ? COUNSELORS.filter(c => c.team === state.currentUser.team)
      : COUNSELORS;
    cList.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = role === 'ops_admin' ? c.name + ' (' + c.team + ')' : c.name;
      sel.appendChild(opt);
    });
    sel.value = state.viewingCounselorId;
  }

  // TL: also show the Tab 1 filter bar as a persistent "you are viewing" indicator
  if (role === 'team_lead') {
    const bar = document.getElementById('tlCounsellorFilterBar');
    if (bar) bar.classList.remove('hidden');
    // Keep the Tab 1 dropdown in sync with the header selector
    const tlSel = document.getElementById('tlCounsellorSelect');
    if (tlSel) {
      tlSel.innerHTML = '';
      const cList = COUNSELORS.filter(c => c.team === state.currentUser.team);
      cList.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name;
        tlSel.appendChild(opt);
      });
      tlSel.value = state.viewingCounselorId;
    }
    // Show the leaderboard view toggle (tab1 Top Performers)
    const lvw = document.getElementById('leaderViewToggleWrap');
    if (lvw) lvw.classList.remove('hidden');
    // Show the earner view toggle (tab2 Top Earners)
    const evw = document.getElementById('earnerViewToggleWrap');
    if (evw) evw.classList.remove('hidden');
  }

  if (role === 'ops_admin') {
    // Show earner view toggle for ops too
    const evw = document.getElementById('earnerViewToggleWrap');
    if (evw) evw.classList.remove('hidden');
  }

  // Role-aware Scorecard & Performance Summary visibility
  const reportCardSection = document.getElementById('reportCardSection');
  const standupScoreStrip = document.getElementById('standupScoreStrip');
  if (role === 'counselor') {
    // Counsellor: hide standalone scorecard, show scorecard strip inside Performance Summary
    if (reportCardSection) reportCardSection.classList.add('hidden');
    if (standupScoreStrip) standupScoreStrip.classList.remove('hidden');
  } else if (role === 'team_lead') {
    // TL: hide scorecard and scorecard strip
    if (reportCardSection) reportCardSection.classList.add('hidden');
    if (standupScoreStrip) standupScoreStrip.classList.add('hidden');
  }

  // Standup manager-only filters (Counsellor Name + TL Name)
  if (role !== 'counselor') {
    const cfSel = document.getElementById('standupCounsellorFilter');
    const tlSel = document.getElementById('standupTLFilter');
    if (cfSel) {
      cfSel.classList.remove('hidden');
      cfSel.innerHTML = '<option value="">All Counsellors</option>';
      const cList = (role === 'team_lead')
        ? COUNSELORS.filter(c => c.team === state.currentUser.team)
        : COUNSELORS;
      cList.forEach(c => {
        const o = document.createElement('option');
        o.value = c.id; o.textContent = c.name;
        cfSel.appendChild(o);
      });
    }
    if (tlSel && role === 'ops_admin') {
      tlSel.classList.remove('hidden');
      tlSel.innerHTML = '<option value="">All TLs</option>';
      const tlList = COUNSELORS.filter(c => c.designation === 'Team Lead');
      tlList.forEach(c => {
        const o = document.createElement('option');
        o.value = c.id; o.textContent = c.name;
        tlSel.appendChild(o);
      });
    }
  }

  // Correction counselor dropdown
  const corrSel = document.getElementById('corrCounselor');
  COUNSELORS.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = c.name;
    corrSel.appendChild(opt);
  });
  // Award badge counselor dropdown
  const awardSel = document.getElementById('awardBadgeCounselor');
  COUNSELORS.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = c.name;
    awardSel.appendChild(opt);
  });

  // Set corrections date default
  document.getElementById('corrDate').valueAsDate = new Date('2026-05-23');

  // Bot & WA bubbles are always visible (sticky FABs)

  // Tab 3 — counsellor sees "My Tickets" instead of Info Hub
  const ldInfoHubBtn = document.getElementById('ldTabInfoHub');
  if (ldInfoHubBtn) {
    ldInfoHubBtn.textContent = role === 'counselor' ? 'My Tickets' : 'Info Hub';
  }
  // Ensure correct panel is visible on load for counsellor
  const ticketsPanel = document.getElementById('ldPanelCounsellorTickets');
  const infoHubPanel = document.getElementById('ldPanelInfohub');
  if (role === 'counselor') {
    if (ticketsPanel) ticketsPanel.classList.remove('hidden');
    if (infoHubPanel) infoHubPanel.classList.add('hidden');
  } else {
    if (ticketsPanel) ticketsPanel.classList.add('hidden');
    if (infoHubPanel) infoHubPanel.classList.remove('hidden');
  }

  renderAll();
  switchTab('tab1');
  // Show 10x banner immediately on every page after login
  show10xBanner();
  // Clear chat and show IST time-based greeting on every fresh login
  setTimeout(initBotWithGreeting, 300);
}

function initBotWithGreeting() {
  // Reset bot state completely
  state.botConversation = { flow: 'greeting', step: 1, collected: {}, history: [], lastIntent: null, shownFollowUps: [] };
  if (state.currentUser) localStorage.removeItem(`bot_history_${state.currentUser.id}`);

  // Determine IST greeting by offset (UTC+5:30)
  const now = new Date();
  const istHour = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (5.5 * 3600000)).getHours();
  const greet = istHour >= 5 && istHour < 12 ? 'Good Morning'
              : istHour >= 12 && istHour < 17 ? 'Good Afternoon'
              : istHour >= 17 && istHour < 21 ? 'Good Evening'
              : 'Good Night';

  const firstName = (state.currentUser?.name || 'there').split(' ')[0];
  const msg = `${greet}, ${firstName}! 👋 How are you doing today?`;

  const container = document.getElementById('botMessages');
  if (!container) return;
  container.innerHTML = '';

  const div = document.createElement('div');
  div.className = 'flex gap-2';
  div.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <div class="bot-msg-bubble">
      <p class="text-sm font-semibold text-text-main mb-0.5">Leap CRM Assistant</p>
      <p class="text-sm">${escHtml(msg)}</p>
    </div>
  `;
  container.appendChild(div);
  addToHistory('bot', msg);

  // Update input placeholder
  const inp = document.getElementById('botInput');
  if (inp) inp.placeholder = 'Type "Hi" or "Hello" to Start the Chat';
}

function onCounselorChange() {
  state.viewingCounselorId = parseInt(document.getElementById('counselorSelector').value);
  renderAll();
}

function renderAll() {
  renderBadgeStrip();
  renderBoostCards();
  renderTeamChat();
  renderWhatsappCoverage();
  renderMetricCards();
  renderHistoryTable();
  renderLeaderboard();
  renderSlabTable();
  renderOffersRow();
  renderCounsellorOffersRow();
  renderEarnersLeaderboard();
  renderQuickLinks();
  renderCourseUpdates();
  renderTrainingModules();
  renderUsersTable();
  renderAdminTraining();
  renderTicketsTable();
  renderAdminOffers();
  renderAdminBadges();
  renderInfoHub();
  renderAdminInfoHub();
  renderFaqList();
  renderReportCard();
  renderSummaryScoreStrip();
  renderStandupTable();
  renderAlertIcon();
}

/* ═══════════════ TAB SWITCHING ═══════════════ */

function toggleSection(id) {
  const body = document.getElementById('body-' + id);
  const chev = document.getElementById('chevron-' + id);
  if (!body) return;
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
}

function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');

  document.querySelectorAll('.htab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  if (tab === 'tab2' && !state.earningsChart) {
    setTimeout(initEarningsChart, 50);
  }
  if (tab === 'tab2') {
    setTimeout(() => renderReferralCards('visa'), 80);
  }
  if (tab === 'tab3') {
    renderQuickLinks();
  }
}

/* ═══════════════ REFERRAL COHORTS ═══════════════ */

function getReferralCohort(type) {
  return STUDENTS.filter(s => {
    if (type === 'visa')    return (s.specialServices || []).includes('Visa') || s.stage === 'lockin';
    if (type === 'premium') return s.hasPaidPremium === true;
    if (type === 'sti')     return ['application','deposit','lockin'].includes(s.stage);
    return false;
  });
}

function switchReferralTab(type) {
  const tabs = ['visa','premium','sti'];
  tabs.forEach(t => {
    const btn = document.getElementById(`refTab-${t}`);
    if (!btn) return;
    const isActive = t === type;
    btn.classList.toggle('border-purple-600', isActive);
    btn.classList.toggle('text-purple-700', isActive);
    btn.classList.toggle('bg-purple-50/40', isActive);
    btn.classList.toggle('border-transparent', !isActive);
    btn.classList.toggle('text-text-muted', !isActive);
    btn.classList.toggle('bg-transparent', !isActive);
    const badge = document.getElementById(`refCount-${t}`);
    if (badge) {
      badge.className = isActive
        ? 'ml-0.5 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full'
        : 'ml-0.5 bg-gray-300 text-gray-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full';
    }
  });
  renderReferralCards(type);
}

function renderReferralCards(type) {
  const container = document.getElementById('referralCards');
  if (!container) return;

  // Update all count badges
  ['visa','premium','sti'].forEach(t => {
    const el = document.getElementById(`refCount-${t}`);
    if (el) el.textContent = getReferralCohort(t).length;
  });

  const students = getReferralCohort(type);
  const stageLabel = { sti:'STI', application:'Application', deposit:'Deposit', lockin:'Lock-in' };
  const stageCls   = {
    sti:         'bg-orange-100 text-orange-700 border-orange-200',
    application: 'bg-blue-100 text-blue-700 border-blue-200',
    deposit:     'bg-green-100 text-green-700 border-green-200',
    lockin:      'bg-purple-100 text-purple-700 border-purple-200',
  };
  const countryFlag = { UK:'🇬🇧', Canada:'🇨🇦', Australia:'🇦🇺', USA:'🇺🇸', Germany:'🇩🇪', Ireland:'🇮🇪', Singapore:'🇸🇬', 'New Zealand':'🇳🇿' };
  const cohortTag  = {
    visa:    { label:'Visa Approved', cls:'bg-emerald-50 text-emerald-700 border-emerald-200' },
    premium: { label:'Premium Paid',  cls:'bg-amber-50 text-amber-700 border-amber-200' },
    sti:     { label:'STI Done',      cls:'bg-sky-50 text-sky-700 border-sky-200' },
  };

  if (!students.length) {
    container.innerHTML = `<p class="text-center text-text-muted text-sm py-8">No students in this cohort yet</p>`;
    return;
  }

  container.innerHTML = students.map(s => {
    const initials = s.name.split(' ').map(w => w[0]).join('').slice(0,2);
    const flag     = countryFlag[s.country] || '🌍';
    const sClsKey  = stageCls[s.stage] || 'bg-gray-100 text-gray-600 border-gray-200';
    const tag      = cohortTag[type];
    const amtHtml  = s.hasPaidPremium && s.amountPaid
      ? `<span class="text-xs font-semibold text-success">₹${(s.amountPaid/1000).toFixed(0)}K paid</span>`
      : '';
    return `
    <div class="flex items-center gap-3 px-4 py-3 hover:bg-purple-50/30 transition-colors cursor-pointer group" onclick="openStudentDetail('${s.id}')">
      <!-- Avatar -->
      <div class="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
        ${initials}
      </div>
      <!-- Main info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <p class="font-semibold text-sm text-text-main">${s.name}</p>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sClsKey}">${stageLabel[s.stage] || s.stage}</span>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tag.cls}">${tag.label}</span>
        </div>
        <p class="text-xs text-text-muted mt-0.5 truncate">${s.course} &nbsp;·&nbsp; ${flag} ${s.country}</p>
        <div class="flex items-center gap-3 mt-1 text-[11px] text-text-muted">
          <span>Follow-up: <strong class="text-text-main">${s.followup}</strong></span>
          <span>ISL: <strong class="text-text-main">${s.islRating}/10</strong></span>
          <span>QS: <strong class="text-text-main">${s.qualityScore}</strong></span>
          ${amtHtml}
        </div>
      </div>
      <!-- Action -->
      <button onclick="event.stopPropagation(); showToast('Referral noted for ${s.name} 👍', 'success')"
        class="flex-shrink-0 text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1.5 rounded-lg hover:bg-purple-100 transition-colors whitespace-nowrap">
        Ask Referral →
      </button>
    </div>`;
  }).join('');
}

/* ═══════════════ BADGE STRIP ═══════════════ */

function renderBadgeStrip() {
  const myBadges = getMyBadges();
  const countEl  = document.getElementById('badgeStripCount');
  const iconsEl  = document.getElementById('badgeStripIcons');
  if (!myBadges.length) { countEl.textContent = ''; iconsEl.innerHTML = ''; return; }
  const recent = myBadges.slice(0, 3);
  iconsEl.innerHTML = recent.map(ab => {
    const bt = BADGE_TYPES.find(b => b.id === ab.badgeId);
    return bt ? `<span title="${bt.name}" class="text-base">${bt.icon}</span>` : '';
  }).join('');
  countEl.textContent = `🏅 ${myBadges.length} Badge${myBadges.length > 1 ? 's' : ''}`;
}

function getMyBadges() {
  const cid = (state.role === 'counselor') ? state.currentUser.id : state.viewingCounselorId;
  return AWARDED_BADGES.filter(ab => ab.counselorId === cid);
}

/* ═══════════════ BOOST CARDS ═══════════════ */

function renderBoostCards() {
  const students  = getViewingStudents();
  const todayStr  = new Date().toISOString().split('T')[0];
  const grid      = document.getElementById('boostCardsGrid');

  function dueToday(arr) {
    return arr.filter(s => s.followup <= todayStr && !s.subtasks.every(t => t.done)).length;
  }
  function urgency(due) {
    if (due > 5)  return { pri:0, bg:'linear-gradient(135deg,#fef2f2,#fee2e2)', border:'#fca5a5', textClr:'#dc2626', badgeBg:'#fee2e2' };
    if (due >= 1) return { pri:1, bg:'linear-gradient(135deg,#fff7ed,#ffedd5)', border:'#fdba74', textClr:'#ea580c', badgeBg:'#ffedd5' };
    return               { pri:2, bg:'linear-gradient(135deg,#f0fdf4,#dcfce7)', border:'#bbf7d0', textClr:'#16a34a', badgeBg:'#dcfce7' };
  }

  const stiStu  = students.filter(s => s.stage === 'sti');
  const depStu  = students.filter(s => s.stage === 'deposit');
  const revStu  = students.filter(s => s.servicingType === 'partner' || s.servicingType === 'non-partner');
  const refStu  = [...new Map(
    [...getReferralCohort('visa'), ...getReferralCohort('premium'), ...getReferralCohort('sti')]
    .map(s => [s.id, s])
  ).values()];

  const cardDefs = [
    { label:'Boost STI',       icon:'🎯', count:stiStu.length, due:dueToday(stiStu), sub: stiStu.length + ' students need attention', onClick:"openBoostFunnelDrawer()" },
    { label:'Boost Deposit',   icon:'💳', count:depStu.length, due:dueToday(depStu), sub: depStu.length + ' students need attention', onClick:"openBoostDrawer('deposit')" },
    { label:'Boost Revenue',   icon:'💰', count:revStu.length, due:dueToday(revStu), sub:'Revenue opportunities',                     onClick:"openBoostRevenueDrawer()" },
    { label:'Boost Referrals', icon:'🤝', count:refStu.length, due:dueToday(refStu), sub: refStu.length + ' students can refer',      onClick:"openBoostReferralsDrawer()" },
  ];

  cardDefs.sort((a, b) => urgency(a.due).pri - urgency(b.due).pri);

  grid.innerHTML = cardDefs.map(c => {
    const u = urgency(c.due);
    const dueTxt = c.due > 0
      ? `<span style="background:${u.badgeBg};color:${u.textClr}" class="text-[10px] font-bold px-2 py-0.5 rounded-full">${c.due} due today</span>`
      : `<span style="background:${u.badgeBg};color:${u.textClr}" class="text-[10px] font-bold px-2 py-0.5 rounded-full">✓ All clear</span>`;
    return `
      <div class="boost-card relative cursor-pointer"
        style="background:${u.bg};border:1px solid ${u.border};box-shadow:0 2px 8px ${u.border}55;"
        onclick="${c.onClick}">
        <button class="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 z-10 transition-colors"
          onclick="event.stopPropagation(); renderBoostCards()" title="Refresh" aria-label="Refresh">
          <svg class="w-3 h-3" style="color:${u.textClr}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
        <div class="text-[11px] font-bold uppercase tracking-wide mb-1" style="color:${u.textClr};opacity:0.8">${c.icon} ${c.label}</div>
        <div class="font-mono leading-none mb-1" style="font-size:2.4rem;font-weight:800;color:${u.textClr}">${c.count}</div>
        <div class="text-xs mb-2" style="color:${u.textClr};opacity:0.7">${c.sub}</div>
        <div class="mb-2">${dueTxt}</div>
        <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full mt-auto"
          style="color:${u.textClr};background:${u.badgeBg}">View Pipeline →</span>
      </div>`;
  }).join('');
}

/* ── Boost Referrals Drawer ── */
function openBoostReferralsDrawer() {
  state.drawerMode = 'boostReferrals';
  state.drawerPrevMode = null;

  const todayStr    = new Date().toISOString().split('T')[0];
  const acked       = _boostIsAcknowledged('referrals');
  const countryFlag = { UK:'🇬🇧', Canada:'🇨🇦', Australia:'🇦🇺', USA:'🇺🇸', Germany:'🇩🇪', Ireland:'🇮🇪', Singapore:'🇸🇬', 'New Zealand':'🇳🇿' };
  const stageLabelMap = { sti:'STI', application:'Application', deposit:'Deposit', lockin:'Lock-in' };
  const stageClsMap   = { sti:'bg-orange-100 text-orange-700', application:'bg-blue-100 text-blue-700', deposit:'bg-green-100 text-green-700', lockin:'bg-purple-100 text-purple-700' };

  const allCohorts = [
    { key:'visa',    label:'Visa Approved',  icon:'✅', tagCls:'bg-emerald-100 text-emerald-700 border-emerald-200', students: getReferralCohort('visa')    },
    { key:'premium', label:'Premium Paid',   icon:'⭐', tagCls:'bg-amber-100 text-amber-700 border-amber-200',     students: getReferralCohort('premium') },
    { key:'sti',     label:'STI Done',       icon:'🎯', tagCls:'bg-sky-100 text-sky-700 border-sky-200',           students: getReferralCohort('sti')     },
  ];

  // Apply today filter when not acknowledged (isPendingToday = followup today + subtasks not all done)
  const cohorts = allCohorts.map(c => ({
    ...c,
    students: acked ? c.students : c.students.filter(s => isPendingToday(s, todayStr)),
    allStudents: c.students,
  }));

  // Deduplicate displayed students for count in header
  const displayStudents = cohorts.flatMap(c => c.students);
  const allUnique = [...new Map(displayStudents.map(s => [s.id, s])).values()];

  // All students due today (regardless of done state) — to detect allDone
  const allCohortStudents = [...new Map(allCohorts.flatMap(c => c.students).map(s => [s.id,s])).values()];
  const allRefStudents    = allCohortStudents; // all referral students (for All Tasks section)
  const todayDueRef = allCohortStudents.filter(s => s.followup === todayStr);
  const allTodayDone = !acked && todayDueRef.length > 0 && todayDueRef.every(s => s.subtasks.every(t => t.done));

  let content = `
    ${!acked ? _renderBoostTodayHeader(allUnique.length) : _renderBoostAckHeader()}
    <div class="mb-4 p-3.5 bg-purple-50 border border-purple-200 rounded-xl">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-lg">🤝</span>
        <p class="font-bold text-sm text-purple-800">Referral Boost Pipeline</p>
      </div>
      <p class="text-xs text-purple-600">${allUnique.length} student${allUnique.length !== 1 ? 's' : ''} ${acked ? 'identified as high-potential referrers' : 'due today across all cohorts'}</p>
    </div>
    <div class="space-y-2.5">
  `;

  cohorts.forEach(({ key, label, icon, tagCls, students }) => {
    content += `
      <div class="border border-border rounded-xl overflow-hidden shadow-sm">
        <button onclick="toggleBoostRefCard('${key}')" class="w-full flex items-center justify-between p-3.5 bg-white hover:bg-surface transition-colors text-left">
          <div class="flex items-center gap-3">
            <span class="text-xl leading-none">${icon}</span>
            <div>
              <p class="font-semibold text-sm text-text-main">${label}</p>
              <p class="text-xs text-text-muted">${students.length} student${students.length !== 1 ? 's' : ''}${!acked ? ' due today' : ''}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagCls}">${label}</span>
            <svg id="bref-chev-${key}" class="w-4 h-4 text-text-muted transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </button>
        <div id="bref-body-${key}" class="hidden border-t border-border">
          ${students.length === 0
            ? `<p class="text-xs text-text-muted text-center py-5">No students due today in this cohort</p>`
            : `<div class="divide-y divide-border/40">${students.map(s => {
                const initials = s.name.split(' ').map(w => w[0]).join('').slice(0,2);
                const flag = countryFlag[s.country] || '🌍';
                return `
                  <div class="px-3.5 py-3 hover:bg-surface/60 transition-colors">
                    <div class="flex items-center gap-3 mb-2.5">
                      <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">${initials}</div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-text-main">${s.name} <span class="text-sm">${flag}</span></p>
                        <p class="text-[11px] text-text-muted">${s.course}</p>
                      </div>
                      <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${stageClsMap[s.stage] || 'bg-gray-100 text-gray-600'}">${stageLabelMap[s.stage] || s.stage}</span>
                    </div>
                    <div class="flex gap-2">
                      <button onclick="openReferralWAMessage('${s.id}')" class="flex-1 text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                        <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.118.555 4.107 1.523 5.832L0 24l6.335-1.524A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 11.999 0zM12 22c-1.943 0-3.779-.517-5.376-1.428l-.387-.226-3.993.96.994-3.866-.253-.4A9.975 9.975 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                        Ask for Referral
                      </button>
                      <button onclick="openStudentDetail('${s.id}');state.drawerPrevMode='boostReferrals';" class="text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">Take to Task →</button>
                    </div>
                  </div>`;
              }).join('')}</div>`
          }
        </div>
      </div>
    `;
  });

  content += `</div>`;
  if (allTodayDone) content += _renderBoostAckPrompt('referrals');
  content += _renderAllTasksSection(acked, allRefStudents, 'referrals');
  openDrawer('Boost Referrals', content, false);
}

function toggleBoostRefCard(key) {
  const body    = document.getElementById(`bref-body-${key}`);
  const chevron = document.getElementById(`bref-chev-${key}`);
  if (!body) return;
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
}

/* ── Boost Referrals Drawer ── */
function openBoostReferralsDrawer() {
  state.drawerMode = 'boostReferrals';
  state.drawerPrevMode = null;

  const todayStr    = new Date().toISOString().split('T')[0];
  const acked       = _boostIsAcknowledged('referrals');
  const countryFlag = { UK:'🇬🇧', Canada:'🇨🇦', Australia:'🇦🇺', USA:'🇺🇸', Germany:'🇩🇪', Ireland:'🇮🇪', Singapore:'🇸🇬', 'New Zealand':'🇳🇿' };
  const stageLabelMap = { sti:'STI', application:'Application', deposit:'Deposit', lockin:'Lock-in' };
  const stageClsMap   = { sti:'bg-orange-100 text-orange-700', application:'bg-blue-100 text-blue-700', deposit:'bg-green-100 text-green-700', lockin:'bg-purple-100 text-purple-700' };

  const allCohorts = [
    { key:'visa',    label:'Visa Approved',  icon:'✅', tagCls:'bg-emerald-100 text-emerald-700 border-emerald-200', students: getReferralCohort('visa')    },
    { key:'premium', label:'Premium Paid',   icon:'⭐', tagCls:'bg-amber-100 text-amber-700 border-amber-200',     students: getReferralCohort('premium') },
    { key:'sti',     label:'STI Done',       icon:'🎯', tagCls:'bg-sky-100 text-sky-700 border-sky-200',           students: getReferralCohort('sti')     },
  ];

  // Apply today filter when not acknowledged (isPendingToday = followup today + subtasks not all done)
  const cohorts = allCohorts.map(c => ({
    ...c,
    students: acked ? c.students : c.students.filter(s => isPendingToday(s, todayStr)),
    allStudents: c.students,
  }));

  // Deduplicate displayed students for count in header
  const displayStudents = cohorts.flatMap(c => c.students);
  const allUnique = [...new Map(displayStudents.map(s => [s.id, s])).values()];

  // All students due today (regardless of done state) — to detect allDone
  const allCohortStudents = [...new Map(allCohorts.flatMap(c => c.students).map(s => [s.id,s])).values()];
  const allRefStudents    = allCohortStudents; // all referral students (for All Tasks section)
  const todayDueRef = allCohortStudents.filter(s => s.followup === todayStr);
  const allTodayDone = !acked && todayDueRef.length > 0 && todayDueRef.every(s => s.subtasks.every(t => t.done));

  let content = `
    ${!acked ? _renderBoostTodayHeader(allUnique.length) : _renderBoostAckHeader()}
    <div class="mb-4 p-3.5 bg-purple-50 border border-purple-200 rounded-xl">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-lg">🤝</span>
        <p class="font-bold text-sm text-purple-800">Referral Boost Pipeline</p>
      </div>
      <p class="text-xs text-purple-600">${allUnique.length} student${allUnique.length !== 1 ? 's' : ''} ${acked ? 'identified as high-potential referrers' : 'due today across all cohorts'}</p>
    </div>
    <div class="space-y-2.5">
  `;

  cohorts.forEach(({ key, label, icon, tagCls, students }) => {
    content += `
      <div class="border border-border rounded-xl overflow-hidden shadow-sm">
        <button onclick="toggleBoostRefCard('${key}')" class="w-full flex items-center justify-between p-3.5 bg-white hover:bg-surface transition-colors text-left">
          <div class="flex items-center gap-3">
            <span class="text-xl leading-none">${icon}</span>
            <div>
              <p class="font-semibold text-sm text-text-main">${label}</p>
              <p class="text-xs text-text-muted">${students.length} student${students.length !== 1 ? 's' : ''}${!acked ? ' due today' : ''}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagCls}">${label}</span>
            <svg id="bref-chev-${key}" class="w-4 h-4 text-text-muted transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </button>
        <div id="bref-body-${key}" class="hidden border-t border-border">
          ${students.length === 0
            ? `<p class="text-xs text-text-muted text-center py-5">No students due today in this cohort</p>`
            : `<div class="divide-y divide-border/40">${students.map(s => {
                const initials = s.name.split(' ').map(w => w[0]).join('').slice(0,2);
                const flag = countryFlag[s.country] || '🌍';
                return `
                  <div class="px-3.5 py-3 hover:bg-surface/60 transition-colors">
                    <div class="flex items-center gap-3 mb-2.5">
                      <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">${initials}</div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-text-main">${s.name} <span class="text-sm">${flag}</span></p>
                        <p class="text-[11px] text-text-muted">${s.course}</p>
                      </div>
                      <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${stageClsMap[s.stage] || 'bg-gray-100 text-gray-600'}">${stageLabelMap[s.stage] || s.stage}</span>
                    </div>
                    <div class="flex gap-2">
                      <button onclick="openReferralWAMessage('${s.id}')" class="flex-1 text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                        <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.118.555 4.107 1.523 5.832L0 24l6.335-1.524A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 11.999 0zM12 22c-1.943 0-3.779-.517-5.376-1.428l-.387-.226-3.993.96.994-3.866-.253-.4A9.975 9.975 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                        Ask for Referral
                      </button>
                      <button onclick="openStudentDetail('${s.id}');state.drawerPrevMode='boostReferrals';" class="text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">Take to Task →</button>
                    </div>
                  </div>`;
              }).join('')}</div>`
          }
        </div>
      </div>
    `;
  });

  content += `</div>`;
  if (allTodayDone) content += _renderBoostAckPrompt('referrals');
  content += _renderAllTasksSection(acked, allRefStudents, 'referrals');
  openDrawer('Boost Referrals', content, false);
}

function toggleBoostRefCard(key) {
  const body    = document.getElementById(`bref-body-${key}`);
  const chevron = document.getElementById(`bref-chev-${key}`);
  if (!body) return;
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
}

function openOwnTaskDrawer() {
  state.drawerMode = 'ownTasks';
  const tasks = state.ownTasks;
  const typeIcons = {
    call:    `<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
    message: `<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-4z"/></svg>`,
    payment: `<svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    custom:  `<svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
  };
  const typeBadge = { call:'Call to User', message:'Send Message', payment:'Payment Follow Up', custom:'Custom Task' };

  const content = `
    <div class="space-y-3">
      <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-3">Your Pending Reminders</p>
      ${tasks.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <svg class="w-14 h-14 text-text-muted/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
          <p class="font-semibold text-text-main mb-1">All caught up!</p>
          <p class="text-sm text-text-muted">No pending reminders. Add one from Tasks &amp; Performance.</p>
        </div>
      ` : tasks.map((t, idx) => {
        const dateLabel = t.date ? new Date(t.date).toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) : '—';
        const isPast = t.date && new Date(t.date) < new Date();
        const isToday = t.date && new Date(t.date).toDateString() === new Date().toDateString();
        const urgencyColor = t.done ? 'border-l-green-400' : isPast ? 'border-l-red-400' : isToday ? 'border-l-orange-400' : 'border-l-indigo-300';
        const urgencyBg   = t.done ? 'bg-green-50' : isPast ? 'bg-red-50' : isToday ? 'bg-orange-50' : 'bg-white';
        return `
        <div class="border border-border rounded-xl p-3.5 border-l-4 ${urgencyColor} ${urgencyBg} ${t.done ? 'opacity-60' : ''}">
          <div class="flex items-start gap-3">
            <div class="mt-0.5 flex-shrink-0">${typeIcons[t.type] || typeIcons.custom}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <p class="font-semibold text-sm text-text-main ${t.done ? 'line-through' : ''}">${t.title}</p>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold">${typeBadge[t.type] || 'Task'}</span>
                ${t.userId ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold flex items-center gap-1"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>${t.userId}</span>` : ''}
                ${isPast && !t.done ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">Overdue</span>' : ''}
                ${isToday && !t.done ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-semibold">Due Today</span>' : ''}
              </div>
              ${t.notes ? `<p class="text-xs text-text-muted mb-1">${t.notes}</p>` : ''}
              <p class="text-xs text-text-muted flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                ${dateLabel}
              </p>
            </div>
            <button onclick="markOwnTaskDone(${idx})" class="flex-shrink-0 w-7 h-7 rounded-full border-2 ${t.done ? 'bg-green-500 border-green-500 text-white' : 'border-border hover:border-green-400'} flex items-center justify-center cursor-pointer transition-all" title="${t.done ? 'Done' : 'Mark as done'}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </button>
          </div>
        </div>`;
      }).join('')}
    </div>`;

  openDrawer('Own Tasks', content, false);
}

function markOwnTaskDone(idx) {
  if (state.ownTasks[idx]) {
    state.ownTasks[idx].done = !state.ownTasks[idx].done;
    renderBoostCards();
    openOwnTaskDrawer(); // re-render drawer
  }
}

/* Funnel drawer: STI → Application → Lock-in all in one view */
/* helpers shared by funnel + sub-card */
function _boostMetricCard(id, label, students, todayStr, onclickFn, todayOnly) {
  const dueToday     = students.filter(s => s.followup === todayStr).length;
  const totalPending = students.length;
  const clickHandler = onclickFn || `openBoostSubCard('${id}')`;

  if (todayOnly) {
    // students is already today-filtered; count = students.length
    const count   = students.length;
    const allDone = count === 0;
    return `
    <div class="boost-metric-card ${allDone ? 'opacity-70 cursor-default' : ''}" ${allDone ? '' : `onclick="${clickHandler}"`}>
      <div class="flex items-center justify-between mb-3">
        <span class="font-semibold text-sm text-text-main leading-snug">${label}</span>
        ${allDone
          ? `<span class="text-green-500 text-base ml-2">✓</span>`
          : `<svg class="w-4 h-4 flex-shrink-0 text-indigo-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>`}
      </div>
      <div class="flex items-end gap-3">
        <div>
          <p class="text-2xl font-bold ${allDone ? 'text-green-500' : 'text-orange-500'} leading-none">${count}</p>
          <p class="text-[11px] text-text-muted mt-1">${allDone ? 'All done today ✓' : 'Pending Today'}</p>
        </div>
      </div>
    </div>`;
  }

  return `
    <div class="boost-metric-card" onclick="${clickHandler}">
      <div class="flex items-center justify-between mb-3">
        <span class="font-semibold text-sm text-text-main leading-snug">${label}</span>
        <svg class="w-4 h-4 flex-shrink-0 text-indigo-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
      <div class="flex justify-between items-end">
        <div>
          <p class="text-2xl font-bold text-indigo-500 leading-none">${dueToday}</p>
          <p class="text-[11px] text-text-muted mt-1">Due Today</p>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-indigo-500 leading-none">${totalPending}</p>
          <p class="text-[11px] text-text-muted mt-1">Total Pending</p>
        </div>
      </div>
    </div>`;
}

/* ── Boost Today-Only UX helpers ── */

/* ── Metric Definition + Task Closure banner (used in all subcards) ── */
function _metricDefBanner(defText, closureText) {
  return `
    <div class="mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <div class="px-3 py-2.5 bg-blue-50 border-b border-blue-100">
        <p class="text-[10px] font-bold text-blue-700 mb-0.5">ℹ️ Definition</p>
        <p class="text-[10px] text-blue-600 leading-relaxed">${defText}</p>
      </div>
      <div class="px-3 py-2.5 bg-green-50">
        <p class="text-[10px] font-bold text-green-700 mb-0.5">✅ Task Closure</p>
        <p class="text-[10px] text-green-600 leading-relaxed">${closureText}</p>
      </div>
    </div>`;
}

function _boostIsAcknowledged(drawerType) {
  return !!(state.boostAcknowledged && state.boostAcknowledged[drawerType]);
}

function acknowledgeBoostComplete(drawerType) {
  if (!state.boostAcknowledged) state.boostAcknowledged = {};
  state.boostAcknowledged[drawerType] = true;
  if      (drawerType === 'funnel')    openBoostFunnelDrawer();
  else if (drawerType === 'revenue')   openBoostRevenueDrawer();
  else if (drawerType === 'referrals') openBoostReferralsDrawer();
  else                                 openBoostDrawer(drawerType); // deposit, sti, etc.
}

function _renderBoostTodayHeader(count) {
  return `
    <div class="flex items-center gap-2 mb-3">
      <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        Today's Tasks Only
      </span>
      <span class="text-xs text-text-muted">${count} student${count !== 1 ? 's' : ''} due today</span>
    </div>`;
}

function _renderBoostAckHeader() {
  return `
    <div class="flex items-center gap-2 mb-3">
      <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        Acknowledged — Full Pipeline View
      </span>
    </div>`;
}

function _renderBoostAckPrompt(drawerType) {
  return `
    <div class="mt-4 p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-center shadow-sm">
      <div class="text-3xl mb-2">🎉</div>
      <p class="font-bold text-base text-green-800 mb-1">All Today's Tasks Complete!</p>
      <p class="text-xs text-green-600 mb-4">Great work! You've cleared all tasks due today.<br>Acknowledge to unlock the full pipeline view.</p>
      <button onclick="acknowledgeBoostComplete('${drawerType}')"
        class="bg-green-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-green-700 active:bg-green-800 transition-colors w-full shadow-sm">
        ✓ Mark Acknowledged &amp; View All Tasks
      </button>
    </div>`;
}

/* ── Servicing Type helpers ── */
function updateServicingType(studentId) {
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  const val = document.getElementById(`st-type-${studentId}`)?.value || null;
  s.servicingType = val;
  if (val !== 'non-partner') { s.nonPartnerSubType = null; }
  const subDiv = document.getElementById(`st-sub-${studentId}`);
  if (subDiv) subDiv.classList.toggle('hidden', val !== 'non-partner');
  renderBoostCards();
}

function updateServicingSubType(studentId) {
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  s.nonPartnerSubType = document.getElementById(`st-subtype-${studentId}`)?.value || null;
  renderBoostCards();
}

/* Returns true when a student has a follow-up today AND still has pending subtasks */
function isPendingToday(s, todayStr) {
  const hasOpenTasks = !s.subtasks.every(t => t.done);
  if (s.applicationStatus !== undefined) {
    // Student persists in Boost STI until Lead Status = Submitted to Institute / Application Dropped
    // BUT on refresh, only show if they still have open tasks
    return s.followup <= todayStr && isBoostSTIActive(s) && hasOpenTasks;
  }
  return s.followup === todayStr && hasOpenTasks;
}

/* Toggle the collapsible "All Tasks" section inside boost drawers */
function toggleAllTasksSection(sectionId) {
  const body    = document.getElementById(`all-tasks-body-${sectionId}`);
  const chevron = document.getElementById(`all-tasks-chev-${sectionId}`);
  if (!body) return;
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
}

/* Renders the "All Tasks" card at the bottom of every boost drawer.
   Locked (🔒) when not yet acknowledged; collapsible green card when acknowledged. */
function _renderAllTasksSection(acked, allStudents, sectionId) {
  const total = allStudents.length;
  if (!acked) {
    return `
      <div class="mt-4 flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
        <span class="text-xl flex-shrink-0">🔒</span>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm text-gray-500">All Tasks</p>
          <p class="text-xs text-gray-400">Complete today's tasks to unlock</p>
        </div>
        <span class="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full flex-shrink-0">${total} total</span>
      </div>`;
  }
  return `
    <div class="mt-4 border border-green-200 rounded-2xl overflow-hidden shadow-sm">
      <button onclick="toggleAllTasksSection('${sectionId}')"
        class="w-full flex items-center justify-between px-4 py-3 bg-green-50 hover:bg-green-100 transition-colors text-left">
        <div class="flex items-center gap-2.5">
          <span class="text-lg leading-none">✅</span>
          <div>
            <p class="font-semibold text-sm text-green-800">All Tasks</p>
            <p class="text-xs text-green-600">${total} total lead${total !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <svg id="all-tasks-chev-${sectionId}" class="w-4 h-4 text-green-600 transition-transform duration-200 flex-shrink-0"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div id="all-tasks-body-${sectionId}" class="hidden border-t border-green-200 p-3">
        ${total === 0
          ? `<p class="text-xs text-text-muted italic text-center py-4">No leads in this category.</p>`
          : `<div class="space-y-2">${renderStudentList(allStudents)}</div>`}
      </div>
    </div>`;
}

/* ── STI cohort tab state & helpers ── */
let stiCohortTab = 'all';

function _getSTIBuckets(all) {
  const islAll  = getViewingStudents();
  // Build on-hold set first so other buckets can exclude those students
  const onholdIds = new Set(
    all.filter(s => s.subtasks.some(t => ON_HOLD_TASK_LABELS.some(lbl => t.label.toLowerCase().includes(lbl)) && !t.done))
       .map(s => s.id)
  );
  return {
    lockin:  all.filter(s => s.stage === 'lockin' && s.subtasks.some(t => !t.done)),
    onhold:  all.filter(s => onholdIds.has(s.id)),
    f2f:     all.filter(s => !onholdIds.has(s.id) && s.secondCallDate && !s.hasPaidPremium && (!s.amountPaid || s.amountPaid === 0) && s.leadStatus !== 'Drop off' && !STI_TERMINAL_STATUSES.includes(s.applicationStatus)),
    // ISL → F2F: exclude any student who is on hold — they belong only in On Hold
    isl:     islAll.filter(s => !onholdIds.has(s.id) && s.islSharedDate && !s.secondCallDate && s.leadStatus !== 'Drop off'),
  };
}

function getSTIActionables(s, buckets) {
  const actions = [];
  const isOnHold = buckets.onhold.some(x => x.id === s.id);
  if (buckets.lockin.some(x => x.id === s.id))
    actions.push({ label:'Submit STI', badgeCls:'bg-violet-100 text-violet-700', closure:'Student was locked in but hasn\'t done the STI yet. Please speak to the student and process the application as per the student\'s choice. Guide them through the next steps and mark STI as submitted once done.' });
  if (isOnHold)
    actions.push({ label:'Clear Application Hold', badgeCls:'bg-orange-100 text-orange-700', closure:'File the application or resolve the QC rejection — move status forward in the pipeline.' });
  if (buckets.f2f.some(x => x.id === s.id))
    actions.push({ label:'Lock the Student In', badgeCls:'bg-blue-100 text-blue-700', closure:'Student attended the F2F but hasn\'t locked in yet. Please lock in the student by enrolling them for Prime / C2I / Premium / Paid Application. Collect the payment and record it in the system.' });
  // Only show Schedule F2F if student is NOT on hold
  if (!isOnHold && buckets.isl.some(x => x.id === s.id))
    actions.push({ label:'Schedule F2F Call', badgeCls:'bg-teal-100 text-teal-700', closure:'Great job sharing the ISL! Now please make the student visit the branch or schedule a call for an F2F / online discussion. Explain the ISL in detail, address all Q&A, and make the student feel confident and happy about their university choices.' });
  return actions;
}

function _renderSTIStudentCard(s, buckets) {
  const actions = getSTIActionables(s, buckets);
  const badgesHtml = actions.map(a =>
    `<span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${a.badgeCls}">${a.label}</span>`
  ).join(' ');
  const closureHtml = actions.map(a =>
    `<div class="flex items-start gap-1.5 mt-1">
      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${a.badgeCls} flex-shrink-0 whitespace-nowrap">${a.label}</span>
      <p class="text-[10px] text-text-muted leading-snug">${a.closure}</p>
    </div>`
  ).join('');
  const waIssue = (s.whatsappGroups||[]).some(g => !g.studentJoined);
  const stageCls = s.stage === 'lockin' ? 'bg-green-100 text-green-700' : s.stage === 'deposit' ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-600';
  return `<div class="student-card cursor-pointer" onclick="openStudentDetail('${s.id}')">
    <div class="flex items-start justify-between gap-2 mb-2">
      <div class="min-w-0">
        <p class="font-semibold text-sm text-text-main truncate">${s.name}</p>
        <p class="text-xs text-text-muted">${s.id} · ${s.course} · <span class="font-medium text-primary/80">${s.country || '—'}</span></p>
      </div>
      <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ${stageCls}">${(s.stage||'').toUpperCase()}</span>
    </div>
    <div class="flex flex-wrap gap-1 mb-2">${badgesHtml}</div>
    ${s.followup ? `<p class="text-[10px] text-text-muted mb-2">📅 Follow-up: ${s.followup}${waIssue ? ' · <span class="text-accent font-semibold">WA group issue</span>' : ''}</p>` : ''}
    <div class="bg-surface rounded-lg px-3 py-2 mt-1">
      <p class="text-[10px] font-bold text-text-muted uppercase tracking-wide mb-1">How to close</p>
      ${closureHtml || '<p class="text-[10px] text-text-muted">Complete all pending subtasks for this student.</p>'}
    </div>
    <button class="mt-2 text-xs font-semibold text-accent hover:underline">Open student →</button>
  </div>`;
}

const STI_TAB_META = [
  { key:'all',    label:'All',            activeCls:'bg-primary text-white',          inactiveCls:'bg-surface text-text-muted hover:text-text-main' },
  { key:'lockin', label:'Lock-in → STI',  activeCls:'bg-violet-600 text-white',        inactiveCls:'bg-violet-50 text-violet-700 hover:bg-violet-100' },
  { key:'onhold', label:'On Hold',         activeCls:'bg-orange-500 text-white',        inactiveCls:'bg-orange-50 text-orange-700 hover:bg-orange-100' },
  { key:'f2f',    label:'F2F → Lock',     activeCls:'bg-blue-600 text-white',           inactiveCls:'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  { key:'isl',    label:'ISL → F2F',      activeCls:'bg-teal-600 text-white',           inactiveCls:'bg-teal-50 text-teal-700 hover:bg-teal-100' },
];

function _renderSTITabs(allFunnelStudents, buckets) {
  const counts = {
    all:    allFunnelStudents.length,
    lockin: buckets.lockin.length,
    onhold: buckets.onhold.length,
    f2f:    buckets.f2f.length,
    isl:    buckets.isl.length,
  };
  return `<div class="flex flex-wrap gap-1.5 mb-3">
    ${STI_TAB_META.map(t => {
      const isActive = stiCohortTab === t.key;
      return `<button onclick="switchSTICohortTab('${t.key}')"
        class="sti-cohort-tab flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all ${isActive ? t.activeCls : t.inactiveCls}">
        ${t.label}
        <span class="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] rounded-full px-1
          ${isActive ? 'bg-white/30 text-white' : 'bg-white/80 text-text-muted'}">${counts[t.key]}</span>
      </button>`;
    }).join('')}
  </div>`;
}

function _getSTITabStudents(allFunnelStudents, buckets) {
  if (stiCohortTab === 'all')    return allFunnelStudents;
  if (stiCohortTab === 'lockin') return buckets.lockin;
  if (stiCohortTab === 'onhold') return buckets.onhold;
  if (stiCohortTab === 'f2f')    return buckets.f2f;
  if (stiCohortTab === 'isl')    return buckets.isl;
  return allFunnelStudents;
}

function switchSTICohortTab(key) {
  stiCohortTab = key;
  const all     = getViewingStudents().filter(isBoostSTIActive);
  const acked   = _boostIsAcknowledged('funnel');
  const todayStr = new Date().toISOString().split('T')[0];
  const buckets  = _getSTIBuckets(all);
  const allFunnel = [...new Map([...buckets.lockin,...buckets.onhold,...buckets.f2f,...buckets.isl].map(s=>[s.id,s])).values()];
  const base      = acked ? allFunnel : allFunnel.filter(s => isPendingToday(s, todayStr));

  const tabsEl = document.getElementById('stiCohortTabs');
  if (tabsEl) tabsEl.innerHTML = _renderSTITabs(acked ? allFunnel : allFunnel.filter(s=>isPendingToday(s,todayStr)), {
    lockin: acked ? buckets.lockin : buckets.lockin.filter(s=>isPendingToday(s,todayStr)),
    onhold: acked ? buckets.onhold : buckets.onhold.filter(s=>isPendingToday(s,todayStr)),
    f2f:    acked ? buckets.f2f    : buckets.f2f.filter(s=>isPendingToday(s,todayStr)),
    isl:    acked ? buckets.isl    : buckets.isl.filter(s=>isPendingToday(s,todayStr)),
  });

  const q = document.getElementById('stiSearchInput')?.value || '';
  _applySTIFilters(base, buckets, q);
}

function _applySTIFilters(baseStudents, buckets, q) {
  let students = _getSTITabStudents(baseStudents, buckets);
  if (q) students = students.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())
  );
  const el = document.getElementById('stiStudentList');
  if (el) el.innerHTML = students.length
    ? students.map(s => _renderSTIStudentCard(s, buckets)).join('')
    : `<div class="flex flex-col items-center justify-center py-10 text-center">
        <div class="text-3xl mb-2">✅</div>
        <p class="font-semibold text-text-main text-sm mb-1">No students here</p>
        <p class="text-xs text-text-muted">Try a different tab or check back tomorrow.</p>
      </div>`;
}

function filterSTIStudents(q) {
  const all     = getViewingStudents().filter(isBoostSTIActive);
  const acked   = _boostIsAcknowledged('funnel');
  const todayStr = new Date().toISOString().split('T')[0];
  const buckets  = _getSTIBuckets(all);
  const allFunnel = [...new Map([...buckets.lockin,...buckets.onhold,...buckets.f2f,...buckets.isl].map(s=>[s.id,s])).values()];
  const base      = acked ? allFunnel : allFunnel.filter(s => isPendingToday(s, todayStr));
  _applySTIFilters(base, buckets, q);
}

function openBoostFunnelDrawer() {
  state.drawerMode     = 'boostFunnel';
  state.drawerPrevMode = null;
  stiCohortTab         = 'all';
  const all      = getViewingStudents().filter(isBoostSTIActive);
  const todayStr = new Date().toISOString().split('T')[0];
  const acked    = _boostIsAcknowledged('funnel');

  const buckets = _getSTIBuckets(all);
  const allFunnelStudents = [...new Map([...buckets.lockin,...buckets.onhold,...buckets.f2f,...buckets.isl].map(s=>[s.id,s])).values()];

  const baseBuckets = acked ? buckets : {
    lockin: buckets.lockin.filter(s => isPendingToday(s, todayStr)),
    onhold: buckets.onhold.filter(s => isPendingToday(s, todayStr)),
    f2f:    buckets.f2f.filter(s => isPendingToday(s, todayStr)),
    isl:    buckets.isl.filter(s => isPendingToday(s, todayStr)),
  };
  const baseStudents = acked ? allFunnelStudents : allFunnelStudents.filter(s => isPendingToday(s, todayStr));
  const displayStudents = _getSTITabStudents(baseStudents, baseBuckets);

  const todayStudents = allFunnelStudents.filter(s => isPendingToday(s, todayStr));
  const dueStudents   = allFunnelStudents.filter(s => s.followup === todayStr);
  const allDone       = dueStudents.length > 0 && dueStudents.every(s => s.subtasks.every(t => t.done));

  const listHtml = displayStudents.length
    ? `<div id="stiStudentList" class="space-y-3">${displayStudents.map(s => _renderSTIStudentCard(s, baseBuckets)).join('')}</div>`
    : `<div id="stiStudentList"><div class="flex flex-col items-center justify-center py-12 text-center">
        <div class="text-4xl mb-3">✅</div>
        <p class="font-semibold text-text-main mb-1">All clear today!</p>
        <p class="text-xs text-text-muted">No students with pending STI actions due today.</p>
      </div></div>`;

  const content = `<div class="space-y-3">
    ${!acked ? _renderBoostTodayHeader(todayStudents.length) : _renderBoostAckHeader()}
    ${!acked && allDone ? _renderBoostAckPrompt('funnel') : ''}
    <div id="stiCohortTabs">${_renderSTITabs(baseStudents, baseBuckets)}</div>
    <div class="mb-1">
      <input id="stiSearchInput" type="text" placeholder="Search by name or ID…"
        oninput="filterSTIStudents(this.value)"
        class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
    </div>
    ${listHtml}
    ${_renderAllTasksSection(acked, allFunnelStudents, 'funnel')}
  </div>`;

  openDrawer('Boost STI', content, false);
}

/* ── Sub-card opener (handles all three action cards + nested F2F card) ── */
function openBoostSubCard(type) {
  const all      = getViewingStudents();
  const todayStr = new Date().toISOString().split('T')[0];
  const acked    = _boostIsAcknowledged('funnel');

  const configs = {
    'lockin-sti-not-done': {
      title:   'Lock-in Done and STI Not Done',
      filter:  s => s.stage === 'lockin' && s.subtasks.some(t => !t.done),
      nested:  null,
      prevMode: 'boostFunnel',
      def:     'Student has completed the Lock-in payment but STI (Study Abroad Training/Submission) is still pending.',
      closure: 'STI is submitted and marked done in the system.',
    },
    'on-hold-drafts': {
      title:   'On Hold Application Drafts',
      filter:  s => s.subtasks.some(t =>
                    ON_HOLD_TASK_LABELS.some(lbl => t.label.toLowerCase().includes(lbl)) && !t.done),
      nested:  null,
      prevMode: 'boostFunnel',
      def:     'Student\'s application is on hold — QC cleared the documents and filing is pending, or the draft was rejected and needs revision (QC Rejected / On Hold).',
      closure: 'Application is filed and status moves forward in the pipeline.',
    },
    'f2f-not-locked': {
      title:   'F2F Done but Not Locked In',
      filter:  s => s.secondCallDate &&
                    !s.hasPaidPremium &&
                    (!s.amountPaid || s.amountPaid === 0) &&
                    s.leadStatus !== 'Drop off' &&
                    !STI_TERMINAL_STATUSES.includes(s.applicationStatus),
      nested:  null,
      prevMode: 'boostFunnel',
      def:     'Student attended the 2nd F2F/online discussion but hasn\'t paid any amount (Prime / Premium / C2I). Lead is active and not dropped.',
      closure: 'Student makes a payment — Prime, Premium, or C2I amount is recorded in the system.',
    },
    'isl-shared-f2f-pending': {
      title:   'ISL Shared but F2F not Done',
      filter:  s => s.islSharedDate && !s.secondCallDate && s.leadStatus !== 'Drop off',
      nested:  null,
      prevMode: 'boostFunnel',
      def:     'ISL (Institute Shortlisting) has been shared with the student but they haven\'t attended the 2nd discussion call yet. Lead is not dropped.',
      closure: 'Student attends the 2nd discussion and second call date is recorded in the system.',
    },
    'c-to-uc-deposit-pending': {
      title:   'C to UC / UC Received — Deposit Not Paid',
      filter:  s => s.stage === 'deposit' && s.ucAssigned === true &&
                    !s.subtasks.every(t => t.done),
      nested:  null,
      prevMode: 'boost-deposit',
      def:     'Student has been assigned a University Counsellor (UC) but the deposit payment has not yet been collected.',
      closure: 'Deposit is paid and recorded in the system.',
    },
    'cas-i20-review': {
      title:   'CAS/I20 - Counsellor Review Needed',
      filter:  s => ['deposit','lockin'].includes(s.stage) &&
                    ['UK','USA'].includes(s.country) &&
                    s.leadStatus !== 'Drop off' &&
                    s.casI20Raised !== true,
      nested:  null,
      prevMode: 'boost-deposit',
      def:     'Students going to the UK require a CAS (Confirmation of Acceptance for Studies) and students going to the USA require an I20 — both must be raised by the counsellor with the university after the offer is confirmed.',
      closure: 'CAS or I20 is successfully raised with the university and updated in the system. Mark the subtask done to close this task.',
    },
    'c2i-enrolment': {
      title:   'C2I Enrolment',
      filter:  s => !s.englishTestGiven &&
                    ['sti','application'].includes(s.stage) &&
                    s.leadStatus !== 'Drop off',
      nested:  null,
      prevMode: 'boostRevenue',
      def:     'Students eligible for English Proficiency Test (IELTS / TOEFL / Duolingo / PTE) — test not yet given and lead status is not beyond Admit Received.',
      closure: 'English Proficiency Test is completed and updated in the system.',
    },
  };

  const cfg = configs[type];
  if (!cfg) return;

  /* set back-nav state BEFORE opening drawer */
  state.drawerMode          = 'boostSubCardView';
  state.drawerBoostSubCardId = type;
  state.drawerPrevMode      = cfg.prevMode;
  state.drawerBoostSubType  = (cfg.prevMode === 'boostSubCard') ? 'f2f-not-locked' : null;

  let students = all.filter(cfg.filter);
  if (!acked) students = students.filter(s => isPendingToday(s, todayStr));

  /* nested card shown inside F2F drawer — no student list when a nested card exists */
  if (cfg.nested) {
    let nestedStudents = all.filter(cfg.nested.filter);
    if (!acked) nestedStudents = nestedStudents.filter(s => isPendingToday(s, todayStr));
    const nestedHTML = `
      <div class="space-y-3">
        ${!acked ? _renderBoostTodayHeader(nestedStudents.length) : _renderBoostAckHeader()}
        <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted">Priority Actions</p>
        ${_boostMetricCard(cfg.nested.id, cfg.nested.label, nestedStudents, todayStr, null, !acked)}
      </div>`;
    openDrawer(cfg.title, nestedHTML, true);
    return;
  }

  const banner    = cfg.def ? _metricDefBanner(cfg.def, cfg.closure || '') : '';
  const todayLabel = !acked ? `<div class="mb-3">${_renderBoostTodayHeader(students.length)}</div>` : `<div class="mb-3">${_renderBoostAckHeader()}</div>`;
  const listHTML = students.length
    ? `${banner}${todayLabel}<div class="space-y-2">${renderStudentList(students)}</div>`
    : `${banner}${todayLabel}<p class="text-xs text-text-muted italic text-center py-6">No students due today for this criteria.</p>`;

  openDrawer(cfg.title, listHTML, true);
}

function getViewingStudents() {
  if (state.role === 'team_lead' || state.role === 'ops_admin') {
    return STUDENTS.filter(s => s.counselorId === state.viewingCounselorId);
  }
  return STUDENTS.filter(s => s.counselorId === state.currentUser.id);
}

/* ═══════════════ TEAM CHAT ═══════════════ */

const TEAM_CHAT_SEED = [
  { author: 'Anjali M.', avatar: 'AM', time: '9:02 AM', text: 'Good morning team! Let\'s crush today\'s STI targets 💪', self: false },
  { author: 'Rahul S.',  avatar: 'RS', time: '9:08 AM', text: 'I have 3 students ready for document review — anyone free at 11?', self: false },
  { author: 'You',       avatar: 'P',  time: '9:15 AM', text: 'I can join at 11! Also just had a great STI call with Arjun Sharma', self: true },
  { author: 'Manager',   avatar: 'MG', time: '9:30 AM', text: '📊 Reminder: Stand-up at 10 AM. Bring your MTD numbers!', self: false },
];

let teamChatMessages = [...TEAM_CHAT_SEED];

let _internalChatOpen = false;
let _internalChatUnread = 0;

function toggleInternalChat() {
  _internalChatOpen = !_internalChatOpen;
  const panel = document.getElementById('internalChatPanel');
  if (panel) {
    panel.classList.toggle('hidden', !_internalChatOpen);
    if (_internalChatOpen) {
      _internalChatUnread = 0;
      const badge = document.getElementById('internalChatBadge');
      if (badge) badge.classList.add('hidden');
      renderTeamChat();
    }
  }
}

function renderTeamChat() {
  const container = document.getElementById('teamChatMessages');
  if (!container) return;
  container.innerHTML = teamChatMessages.map(msg => `
    <div class="flex items-start gap-2.5 ${msg.self ? 'flex-row-reverse' : ''}">
      <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white
        ${msg.self ? 'bg-accent' : msg.author === 'Manager' ? 'bg-slate-600' : 'bg-primary'}">
        ${msg.avatar}
      </div>
      <div class="max-w-[75%] ${msg.self ? 'items-end' : 'items-start'} flex flex-col gap-0.5">
        <div class="flex items-baseline gap-1.5 ${msg.self ? 'flex-row-reverse' : ''}">
          <span class="text-[11px] font-semibold text-text-main">${msg.author}</span>
          <span class="text-[10px] text-text-muted">${msg.time}</span>
        </div>
        <div class="px-3 py-2 rounded-2xl text-sm leading-relaxed
          ${msg.self
            ? 'bg-accent text-white rounded-tr-sm'
            : msg.author === 'Manager'
              ? 'bg-amber-50 border border-amber-200 text-amber-900 rounded-tl-sm'
              : 'bg-surface border border-border text-text-main rounded-tl-sm'}">
          ${msg.text}
        </div>
      </div>
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

function sendTeamChat() {
  const input = document.getElementById('teamChatInput');
  const text = (input.value || '').trim();
  if (!text) return;
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  teamChatMessages.push({ author: 'You', avatar: 'P', time, text, self: true });
  input.value = '';
  renderTeamChat();
  // Simulate a reply after a short delay
  const replies = [
    { author: 'Anjali M.', avatar: 'AM', text: '👍 Got it!', self: false },
    { author: 'Rahul S.',  avatar: 'RS', text: 'Thanks for the update!', self: false },
    { author: 'Manager',   avatar: 'MG', text: 'Noted ✅', self: false },
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  setTimeout(() => {
    const t = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    teamChatMessages.push({ ...reply, time: t });
    renderTeamChat();
    if (!_internalChatOpen) {
      _internalChatUnread++;
      const badge = document.getElementById('internalChatBadge');
      if (badge) { badge.textContent = _internalChatUnread; badge.classList.remove('hidden'); }
    }
  }, 1200 + Math.random() * 800);
}

/* ═══════════════ WHATSAPP COVERAGE ═══════════════ */

function renderWhatsappCoverage() {
  const students = getViewingStudents();
  let totalGroups = 0, counselorJoined = 0, studentMissing = 0;
  students.forEach(s => {
    s.whatsappGroups.forEach(g => {
      totalGroups++;
      if (g.counselorJoined) counselorJoined++;
      if (!g.studentJoined) studentMissing++;
    });
  });
  const el = document.getElementById('whatsappCoverage');
  if (!el) return;
  el.innerHTML = `
    <div class="wa-chip ok cursor-pointer hover:opacity-80 transition-opacity" onclick="openGroupsDetail('counselor')" title="Click to see group membership details">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      Groups counselor joined: ${counselorJoined}/${totalGroups} ↗
    </div>
    <div class="wa-chip ${studentMissing > 0 ? 'warn' : 'ok'} cursor-pointer hover:opacity-80 transition-opacity" onclick="openGroupsDetail('students')" title="Click to see which students are missing from groups">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      Students NOT in group: ${studentMissing} ↗
    </div>
  `;
}

/* ═══════════════ METRIC CARDS ═══════════════ */

function getWANotRepliedStudents() {
  return getViewingStudents().filter(s => (WA_UNANSWERED[s.id] || []).length > 0);
}

function getDeferralOpportunityStudents() {
  return getViewingStudents().filter(s => s.deferral && (
    (s.deferral.hasAdmitPrevIntake && !s.deferral.depositPaid) ||
    (!s.deferral.hasAdmitPrevIntake && s.deferral.depositPaid && !s.deferral.visaDone)
  ));
}

function getBestPerformer(field) {
  // Returns { name, value } for the counselor with highest value in given field
  let best = null;
  COUNSELORS.forEach(c => {
    const v = c.today[field];
    if (v !== undefined && (best === null || v > best.value)) {
      best = { name: c.name.split(' ')[0], value: v };
    }
  });
  return best;
}

function getWAGroupStats() {
  const students = getViewingStudents();
  let active = 0, inactive = 0, notJoined = 0, notReplied = getWANotRepliedStudents().length;
  students.forEach(s => {
    s.whatsappGroups.forEach(g => {
      if (g.counselorJoined && g.studentJoined) active++;
      else if (!g.counselorJoined) inactive++;
      if (!g.studentJoined) notJoined++;
    });
  });
  return { active, inactive, notJoined, notReplied };
}

function renderMetricCards() {
  const c = getCounselorData();
  const totalStudents = getViewingStudents().length;

  const allStudents = getViewingStudents();
  const unhappyCount = allStudents.filter(s => s.islRating < 8 || s.hasEscalation).length;
  const deferralCount = getDeferralOpportunityStudents().length;
  const ownCount = state.ownTasks.filter(t => !t.done).length;
  const waStats = getWAGroupStats();

  // Best performers for quality metrics
  const bestISL      = getBestPerformer('isl');
  const bestQ1       = getBestPerformer('q1score');

  const ownTasksCard = {
    label:'Own Tasks', value:ownCount, target:TARGETS.tasks,
    extra:`${ownCount === 1 ? '1 pending reminder' : ownCount + ' pending reminders'}`,
    unit:'', key:'ownTasks',
    overrideColor: ownCount === 0 ? 'green' : 'red',
  };

  const qualityMetrics = [
    { label:'ISL Feedback Rating',       value:c.isl,             target:5,                  extra:`${Math.round((c.isl/5)*100)}%`, unit:'', isRating:true,
      bestLabel: bestISL ? `🏆 Best: ${bestISL.name} · ${bestISL.value.toFixed(1)}/5` : '' },
    { label:'Quality Score',             value:null,              target:100,                extra:'', unit:'', isDual:true, q1:c.q1score, q2:c.q2score,
      bestLabel: bestQ1 ? `🏆 Best: ${bestQ1.name} · ${bestQ1.value}%` : '' },
    { label:'WA Group Details',          value:null,              target:0,                  extra:'', unit:'', isWAGroups:true, waStats, unhappyCount },
  ];

  // Own Tasks: Red+First if pending, Green+Last if clear
  const orderedMetrics = ownCount > 0
    ? [ownTasksCard, ...qualityMetrics]
    : [...qualityMetrics, ownTasksCard];
  renderMetricGrid('volumeMetrics', orderedMetrics);
}

function renderMetricGrid(elId, metrics) {
  const el = document.getElementById(elId);
  el.innerHTML = metrics.map(m => {
    // ── Special: WA Group Details card ──
    if (m.isWAGroups) {
      const ws = m.waStats;
      const uh = m.unhappyCount || 0;

      function subRow(label, count, urgency) {
        // urgency: 'good'=green, 'warn'=amber, 'danger'=red, 'info'=blue
        const cfg = {
          good:   { bg:'bg-emerald-50', border:'border-emerald-200', numCls:'text-emerald-700 bg-emerald-100', lbl:'text-emerald-700' },
          warn:   { bg:'bg-amber-50',   border:'border-amber-200',   numCls:'text-amber-700 bg-amber-100',     lbl:'text-amber-700' },
          danger: { bg:'bg-red-50',     border:'border-red-200',     numCls:'text-red-700 bg-red-100',         lbl:'text-red-700' },
          info:   { bg:'bg-blue-50',    border:'border-blue-200',    numCls:'text-blue-700 bg-blue-100',       lbl:'text-blue-700' },
        }[urgency] || {};
        return `<div class="flex items-center justify-between px-2.5 py-1.5 rounded-lg border ${cfg.bg} ${cfg.border} mb-1 last:mb-0">
          <span class="text-[10px] font-semibold ${cfg.lbl}">${label}</span>
          <span class="text-[11px] font-bold px-1.5 py-0.5 rounded-full ${cfg.numCls}">${count}</span>
        </div>`;
      }

      return `
        <div class="metric-card rounded-xl border p-3 cursor-pointer hover:shadow-md transition-shadow"
          style="background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%);border-color:#6ee7b7;"
          onclick="openWAGroupDetailsDrawer()">
          <div class="metric-deco"></div>
          <p class="text-xs font-semibold uppercase tracking-wide mb-2 text-emerald-700">⭐ User Experience <span class="ml-1 text-[9px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">IMP</span></p>
          <div class="space-y-0.5">
            ${subRow('Student Not Happy', uh,          uh > 0 ? 'danger' : 'good')}
            ${subRow('WA Active',         ws.active,   ws.active > 0 ? 'good' : 'warn')}
            ${subRow('WA Inactive',       ws.inactive, ws.inactive > 0 ? 'warn' : 'good')}
            ${subRow('Not Joined',        ws.notJoined,  ws.notJoined > 0 ? 'danger' : 'good')}
            ${subRow('Not Replied',       ws.notReplied, ws.notReplied > 0 ? 'danger' : 'good')}
          </div>
          <div class="mt-2 flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            View all groups →
          </div>
        </div>`;
    }

    let pct, displayVal, subText;
    if (m.isDual) {
      pct = Math.round((m.q1 + m.q2) / 2);
      displayVal = '';
      subText = `1st: ${m.q1}% &nbsp;|&nbsp; 2nd: ${m.q2}%`;
    } else if (m.isCurrency) {
      pct = fmtPct(m.value, m.target);
      displayVal = fmt(m.value);
      subText = `${pct}% of target`;
    } else if (m.isRating) {
      pct = Math.round((m.value / m.target) * 100);
      displayVal = m.value.toFixed(1) + ' / 5';
      subText = m.extra;
    } else if (m.isPct) {
      pct = fmtPct(m.value, m.target);
      displayVal = m.value + '%';
      subText = m.extra;
    } else {
      pct = fmtPct(m.value, m.target);
      displayVal = m.value;
      subText = m.extra;
    }
    const cls = m.overrideColor ? m.overrideColor
      : m.isOpportunity ? 'opportunity'
      : m.isNegative
        ? (m.value === 0 ? 'green' : m.target === 0 ? 'red' : pct < 30 ? 'amber' : 'red')
        : colorClass(m.isDual ? pct : pct);
    return `
      <div class="metric-card ${cls} rounded-xl border p-4 ${m.key ? 'cursor-pointer hover:shadow-md transition-shadow' : 'cursor-default'}" ${m.key ? `onclick="openVolumeMetricDrawer('${m.key}')"` : ''}
        ${m.isOpportunity ? 'style="background:linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%);border-color:#c4b5fd;"' : ''}>
        <div class="metric-deco"></div>
        <p class="text-xs font-semibold uppercase tracking-wide mb-1 ${m.isOpportunity ? 'text-violet-600' : 'text-text-muted'}">${m.label}</p>
        ${m.isDual
          ? `<p class="font-mono text-lg font-bold metric-value" style="line-height:1.2">${m.q1}% <span class="text-text-muted text-sm font-normal">1st</span></p>
             <p class="font-mono text-lg font-bold metric-value" style="line-height:1.2">${m.q2}% <span class="text-text-muted text-sm font-normal">2nd</span></p>`
          : `<p class="font-mono text-2xl font-bold ${m.isOpportunity ? 'text-violet-700' : 'metric-value'}" id="mv_${elId}_${m.label.replace(/\s/g,'_')}">${displayVal}</p>`}
        <p class="text-xs mt-1 ${m.isOpportunity ? 'text-violet-500' : 'text-text-muted'}">${subText}</p>
        ${m.isOpportunity
          ? `<div class="mt-2 flex items-center gap-1 text-xs font-semibold text-violet-600"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>View list →</div>`
          : `<div class="flex items-center justify-between mt-2">
              <div class="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden mr-2">
                <div class="h-full rounded-full ${cls === 'green' ? 'bg-success' : cls === 'amber' ? 'bg-accent' : 'bg-danger'}" style="width:${Math.min(m.isDual ? pct : pct, 100)}%"></div>
              </div>
              <span class="text-xs font-bold ${cls === 'green' ? 'text-success' : cls === 'amber' ? 'text-accent' : 'text-danger'}">${m.isDual ? pct : pct}%</span>
            </div>`
        }
        ${m.bestLabel ? `<div class="mt-1.5 pt-1.5 border-t border-white/40"><p class="text-[10px] text-text-muted font-medium truncate">${m.bestLabel}</p></div>` : ''}
      </div>
    `;
  }).join('');
}

function openVolumeMetricDrawer(key) {
  if (key === 'ownTasks') { openOwnTaskDrawer(); return; }
  const all = getViewingStudents();
  const configs = {
    stis:         { title: 'STIs Submitted',         filter: s => true },
    applications: { title: 'Applications Submitted',  filter: s => ['application','deposit','lockin'].includes(s.stage) },
    deposits:     { title: 'Deposits Collected',      filter: s => ['deposit','lockin'].includes(s.stage) },
    lockins:      { title: 'Lock-ins Achieved',       filter: s => s.stage === 'lockin' },
    tasks:        { title: 'Tasks Completed',         filter: s => s.subtasks.some(t => t.done) },
    revenue:      { title: 'Revenue Collected',       filter: s => s.hasPaidPremium, showAmount: true },
    unhappy:      { title: 'Unhappy Cohort',          filter: s => s.islRating < 8 || s.hasEscalation },
    deferrals:    { title: 'Deferrals Opportunity',   filter: s => s.deferral && ((s.deferral.hasAdmitPrevIntake && !s.deferral.depositPaid) || (!s.deferral.hasAdmitPrevIntake && s.deferral.depositPaid && !s.deferral.visaDone)) },
    waNotReplied: { title: 'WA Messages Not Replied', filter: s => (WA_UNANSWERED[s.id] || []).length > 0 },
  };
  const cfg = configs[key];
  if (!cfg) return;

  state.drawerMode = 'volumeMetric';
  state.drawerVolumeMetricKey = key;
  // Set prevMode so back button knows where to return
  state.drawerPrevMode = key === 'deferrals' ? 'boost-deposit' : null;

  const students = all.filter(cfg.filter);

  /* ── WA Not Replied drawer ── */
  let listHTML;
  if (key === 'waNotReplied') {
    listHTML = students.length
      ? `<div class="space-y-3">${students.map(s => {
          const msgs = WA_UNANSWERED[s.id] || [];
          return `<div class="bg-white rounded-xl border border-border p-4 shadow-sm">
            <div class="flex items-start justify-between mb-2">
              <div>
                <p class="font-semibold text-sm text-text-main">${s.name}</p>
                <p class="text-xs text-text-muted">${s.id} · ${s.course} · <span class="font-medium text-primary/80">${s.country || '—'}</span></p>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">${msgs.length} unanswered</span>
            </div>
            <div class="space-y-2 mt-2">${msgs.map(m => `
              <div class="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wide">💬 Student Question</span>
                  <span class="text-[10px] text-text-muted">${m.date}</span>
                </div>
                <p class="text-xs text-text-main italic">"${m.question}"</p>
                <div class="flex items-center gap-2 mt-1.5">
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">Lead: ${m.leadStatus}</span>
                </div>
              </div>`).join('')}
            </div>
            <button class="mt-2 text-xs text-primary font-semibold hover:underline cursor-pointer" onclick="openStudentDetail('${s.id}')">Open Student Profile →</button>
          </div>`;
        }).join('')}</div>`
      : `<p class="text-xs text-text-muted italic text-center py-6">No unanswered WA messages 🎉</p>`;
  }
  /* ── Deferrals Opportunity drawer ── */
  else if (key === 'deferrals') {
    listHTML = students.length
      ? `<div class="space-y-3">
           <div class="px-3 py-2 bg-violet-50 border border-violet-200 rounded-lg text-xs text-violet-700 font-medium">
             ${students.length} student${students.length !== 1 ? 's' : ''} with deferral opportunity identified
           </div>
           ${students.map(s => {
             const d = s.deferral;
             const isAdmitType = d.hasAdmitPrevIntake && !d.depositPaid;
             return `<div class="bg-white rounded-xl border border-border p-4 shadow-sm">
               <div class="flex items-start justify-between mb-2">
                 <div>
                   <p class="font-semibold text-sm text-text-main">${s.name}</p>
                   <p class="text-xs text-text-muted">${s.id} · ${s.course} · <span class="font-medium text-primary/80">${s.country || '—'}</span></p>
                 </div>
                 <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isAdmitType ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}">
                   ${isAdmitType ? '🎓 Admit · No Deposit' : '💳 Deposit · No Visa'}
                 </span>
               </div>
               <div class="bg-surface rounded-lg px-3 py-2 mt-1 space-y-1">
                 <div class="flex items-center gap-2 text-xs">
                   <span class="text-text-muted font-medium w-28">University</span>
                   <span class="text-text-main font-semibold">${d.admitUniversity}</span>
                 </div>
                 <div class="flex items-center gap-2 text-xs">
                   <span class="text-text-muted font-medium w-28">Previous Intake</span>
                   <span class="text-text-main">${d.admitIntake}</span>
                 </div>
                 <div class="flex items-center gap-2 text-xs">
                   <span class="text-text-muted font-medium w-28">Status</span>
                   <span class="font-semibold ${isAdmitType ? 'text-orange-600' : 'text-blue-600'}">
                     ${isAdmitType ? 'Admit received — deposit pending' : 'Deposit paid — visa process pending'}
                   </span>
                 </div>
               </div>
               <button class="mt-2 text-xs text-primary font-semibold hover:underline cursor-pointer" onclick="openStudentDetail('${s.id}')">Open Student Profile →</button>
             </div>`;
           }).join('')}
         </div>`
      : `<p class="text-xs text-text-muted italic text-center py-6">No deferral opportunities right now.</p>`;
  }
  /* ── Unhappy cohort ── */
  else if (key === 'unhappy') {
    listHTML = students.length
      ? `<div class="space-y-2">${students.map(s => {
          const badge = s.hasEscalation
            ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600 ml-1">⚠ Escalation</span>`
            : '';
          const islBadge = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">ISL ${s.islRating}/10</span>`;
          return `<div class="student-card" onclick="openStudentDetail('${s.id}')">
            <div class="flex items-start justify-between mb-2">
              <div>
                <p class="font-semibold text-sm text-text-main">${s.name}</p>
                <p class="text-xs text-text-muted">${s.id} · ${s.course} · <span class="font-medium text-primary/80">${s.country || '—'}</span></p>
              </div>
              <div class="flex gap-1 flex-wrap justify-end">${islBadge}${badge}</div>
            </div>
            <div class="flex items-center gap-3 text-xs text-text-muted">
              <span>📅 Follow-up: ${s.followup}</span>
              <span class="${s.islRating < 6 ? 'text-danger font-semibold' : 'text-amber-600'}">${s.islRating < 8 ? 'Low ISL rating' : ''}${s.islRating < 8 && s.hasEscalation ? ' · ' : ''}${s.hasEscalation ? 'Escalation raised' : ''}</span>
            </div>
            <p class="text-xs text-primary font-semibold mt-2 cursor-pointer">Open →</p>
          </div>`;
        }).join('')}</div>`
      : `<p class="text-xs text-text-muted italic text-center py-6">No unhappy students right now 🎉</p>`;
  } else if (cfg.showAmount) {
    const total = students.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
    const fmtAmt = v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}K`;
    listHTML = students.length
      ? `<div class="mb-3 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
           <span class="text-xs font-semibold text-emerald-700">Total Collected</span>
           <span class="text-base font-bold text-emerald-700">${fmtAmt(total)}</span>
         </div>
         <div class="space-y-2">${students.map(s => `
           <div class="student-card" onclick="openStudentDetail('${s.id}')">
             <div class="flex items-start justify-between mb-2">
               <div>
                 <p class="font-semibold text-sm text-text-main">${s.name}</p>
                 <p class="text-xs text-text-muted">${s.id} · ${s.course} · <span class="font-medium text-primary/80">${s.country || '—'}</span></p>
               </div>
               <span class="text-sm font-bold text-emerald-600">${fmtAmt(s.amountPaid)}</span>
             </div>
             <div class="text-xs text-text-muted">📅 Follow-up: ${s.followup} · ${s.stage.toUpperCase()} stage</div>
             <p class="text-xs text-primary font-semibold mt-2 cursor-pointer">Open →</p>
           </div>`).join('')}</div>`
      : `<p class="text-xs text-text-muted italic text-center py-6">No revenue collected yet.</p>`;
  } else {
    listHTML = students.length
      ? `<div class="space-y-2">${renderStudentList(students)}</div>`
      : `<p class="text-xs text-text-muted italic text-center py-6">No students match this criteria right now.</p>`;
  }

  openDrawer(cfg.title, listHTML, state.drawerPrevMode !== null);
}

/* ═══════════════ BOOST REVENUE ═══════════════ */

/* Determine all revenue actionables for a student */
function getRevenueActionables(s) {
  const actions = [];
  if (!s.englishTestGiven && ['sti','application'].includes(s.stage) && s.leadStatus !== 'Drop off') {
    actions.push({
      label:   'Pitch for C2I',
      badgeCls:'bg-violet-100 text-violet-700',
      closure: 'Register student for an English Proficiency Test (IELTS / TOEFL / Duolingo / PTE) and mark updated in system.'
    });
  }
  if (s.servicingType === 'partner' && !s.hasPaidPremium) {
    actions.push({
      label:   'Enrol for Free Service',
      badgeCls:'bg-blue-100 text-blue-700',
      closure: 'Student enrols under Free Service — confirm enrolment and record in system.'
    });
  }
  if (s.servicingType === 'non-partner' && s.nonPartnerSubType === 'specialised-services') {
    const svcs = (s.specialServices || []).join(' + ') || 'Specialised Service';
    actions.push({
      label:   `Pitch for ${svcs}`,
      badgeCls:'bg-amber-100 text-amber-700',
      closure: `Student pays for ${svcs} — service fee recorded and confirmed in system.`
    });
  }
  if (s.servicingType === 'non-partner' && s.nonPartnerSubType === 'premium-universities') {
    actions.push({
      label:   'Pitch for Premium Uni Servicing',
      badgeCls:'bg-purple-100 text-purple-700',
      closure: 'Student agrees to Paid Service — Premium University servicing package. Collect payment and record in system.'
    });
  }
  if (s.servicingType === 'non-partner' && s.nonPartnerSubType === 'paid-application') {
    actions.push({
      label:   'Pitch for Paid Application',
      badgeCls:'bg-emerald-100 text-emerald-700',
      closure: 'Student opts for Paid Application filing service — collect the application fee and record it in the system.'
    });
  }
  return actions;
}

/* Flat revenue student list (all actionable students, deduped) */
function getRevenueStudents() {
  return getViewingStudents().filter(s => getRevenueActionables(s).length > 0);
}

function _renderRevenueStudentCard(s) {
  const actions = getRevenueActionables(s);
  const badgesHtml = actions.map(a =>
    `<span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${a.badgeCls}">${a.label}</span>`
  ).join(' ');
  const closureHtml = actions.map(a =>
    `<div class="flex items-start gap-1.5 mt-1">
      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${a.badgeCls} flex-shrink-0">${a.label.split(' ')[2] || a.label}</span>
      <p class="text-[10px] text-text-muted leading-snug">${a.closure}</p>
    </div>`
  ).join('');
  const waIssue = (s.whatsappGroups||[]).some(g => !g.studentJoined);

  return `<div class="student-card cursor-pointer" onclick="openStudentDetail('${s.id}')">
    <div class="flex items-start justify-between gap-2 mb-2">
      <div class="min-w-0">
        <p class="font-semibold text-sm text-text-main truncate">${s.name}</p>
        <p class="text-xs text-text-muted">${s.id} · ${s.course} · <span class="font-medium text-primary/80">${s.country || '—'}</span></p>
      </div>
      <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ${s.stage === 'deposit' ? 'bg-orange-100 text-orange-700' : s.stage === 'lockin' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'}">${s.stage?.toUpperCase()}</span>
    </div>
    <div class="flex flex-wrap gap-1 mb-2">${badgesHtml}</div>
    ${s.followup ? `<p class="text-[10px] text-text-muted mb-2">📅 Follow-up: ${s.followup}${waIssue ? ' · <span class="text-accent font-semibold">WA group issue</span>' : ''}</p>` : ''}
    <div class="bg-surface rounded-lg px-3 py-2 mt-1">
      <p class="text-[10px] font-bold text-text-muted uppercase tracking-wide mb-1">How to close</p>
      ${closureHtml}
    </div>
    <button class="mt-2 text-xs font-semibold text-accent hover:underline">Open student →</button>
  </div>`;
}

let revenueCohortTab = 'all'; // 'all'|'c2i'|'freeservice'|'premiumuni'|'specialised'|'paidapp'

const REVENUE_COHORT_FILTERS = {
  all:          s => true,
  c2i:          s => !s.englishTestGiven && ['sti','application'].includes(s.stage) && s.leadStatus !== 'Drop off',
  freeservice:  s => s.servicingType === 'partner' && !s.hasPaidPremium,
  premiumuni:   s => s.servicingType === 'non-partner' && s.nonPartnerSubType === 'premium-universities',
  specialised:  s => s.servicingType === 'non-partner' && s.nonPartnerSubType === 'specialised-services',
  paidapp:      s => s.servicingType === 'non-partner' && s.nonPartnerSubType === 'paid-application',
};

const REVENUE_TAB_META = [
  { key:'all',         label:'All',                  activeCls:'bg-primary text-white',         inactiveCls:'bg-surface text-text-muted hover:text-text-main' },
  { key:'c2i',         label:'C2I',                  activeCls:'bg-violet-600 text-white',       inactiveCls:'bg-violet-50 text-violet-700 hover:bg-violet-100' },
  { key:'freeservice', label:'Free Service',          activeCls:'bg-blue-600 text-white',         inactiveCls:'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  { key:'premiumuni',  label:'Premium Universities',  activeCls:'bg-purple-600 text-white',       inactiveCls:'bg-purple-50 text-purple-700 hover:bg-purple-100' },
  { key:'specialised', label:'Specialised Services',  activeCls:'bg-amber-500 text-white',        inactiveCls:'bg-amber-50 text-amber-700 hover:bg-amber-100' },
  { key:'paidapp',     label:'Paid Application',      activeCls:'bg-emerald-600 text-white',      inactiveCls:'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
];

function _getRevenueTabStudents(baseStudents) {
  return baseStudents.filter(REVENUE_COHORT_FILTERS[revenueCohortTab] || (() => true));
}

function _renderRevenueTabs(baseStudents) {
  return `<div class="flex flex-wrap gap-1.5 mb-3">
    ${REVENUE_TAB_META.map(t => {
      const count = baseStudents.filter(REVENUE_COHORT_FILTERS[t.key]).length;
      const isActive = revenueCohortTab === t.key;
      return `<button onclick="switchRevenueCohortTab('${t.key}')"
        class="rev-cohort-tab flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all ${isActive ? t.activeCls : t.inactiveCls}">
        ${t.label}
        <span class="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] rounded-full px-1
          ${isActive ? 'bg-white/30 text-white' : 'bg-white/80 text-text-muted'}">${count}</span>
      </button>`;
    }).join('')}
  </div>`;
}

function switchRevenueCohortTab(key) {
  revenueCohortTab = key;
  const acked    = _boostIsAcknowledged('revenue');
  const todayStr = new Date().toISOString().split('T')[0];
  const allRevStudents = getRevenueStudents();
  const baseStudents   = acked ? allRevStudents : allRevStudents.filter(s => isPendingToday(s, todayStr));

  // Re-render tabs (update active state)
  const tabsEl = document.getElementById('revenueCohortTabs');
  if (tabsEl) tabsEl.innerHTML = _renderRevenueTabs(baseStudents);

  // Re-render student list
  const q = document.getElementById('revenueSearchInput')?.value || '';
  _applyRevenueFilters(baseStudents, q);
}

function _applyRevenueFilters(baseStudents, q) {
  let students = _getRevenueTabStudents(baseStudents);
  if (q) students = students.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())
  );
  const el = document.getElementById('revenueStudentList');
  if (el) el.innerHTML = students.length
    ? students.map(_renderRevenueStudentCard).join('')
    : `<div class="flex flex-col items-center justify-center py-10 text-center">
        <div class="text-3xl mb-2">✅</div>
        <p class="font-semibold text-text-main text-sm mb-1">No students here</p>
        <p class="text-xs text-text-muted">Try a different tab or check back tomorrow.</p>
      </div>`;
}

function openBoostRevenueDrawer() {
  state.drawerMode     = 'boostRevenue';
  state.drawerPrevMode = null;
  revenueCohortTab     = 'all'; // reset tab on open
  const todayStr = new Date().toISOString().split('T')[0];
  const acked    = _boostIsAcknowledged('revenue');

  const allRevStudents = getRevenueStudents();
  const todayStudents  = allRevStudents.filter(s => isPendingToday(s, todayStr));
  const dueStudents    = allRevStudents.filter(s => s.followup === todayStr);
  const allDone        = dueStudents.length > 0 && dueStudents.every(s => s.subtasks.every(t => t.done));

  const baseStudents    = acked ? allRevStudents : todayStudents;
  const displayStudents = _getRevenueTabStudents(baseStudents);

  const listHtml = displayStudents.length
    ? `<div id="revenueStudentList" class="space-y-3">${displayStudents.map(_renderRevenueStudentCard).join('')}</div>`
    : `<div id="revenueStudentList"><div class="flex flex-col items-center justify-center py-12 text-center">
        <div class="text-4xl mb-3">✅</div>
        <p class="font-semibold text-text-main mb-1">All clear today!</p>
        <p class="text-xs text-text-muted">No students with pending revenue actions due today.</p>
      </div></div>`;

  const content = `<div class="space-y-3">
    ${!acked ? _renderBoostTodayHeader(todayStudents.length) : _renderBoostAckHeader()}
    ${!acked && allDone ? _renderBoostAckPrompt('revenue') : ''}
    <div id="revenueCohortTabs">${_renderRevenueTabs(baseStudents)}</div>
    <div class="mb-1">
      <input id="revenueSearchInput" type="text" placeholder="Search by name or ID…"
        oninput="filterRevenueStudents(this.value)"
        class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
    </div>
    ${listHtml}
    ${_renderAllTasksSection(acked, allRevStudents, 'revenue')}
  </div>`;

  openDrawer('Lock the User and Generate Revenue', content, false);
}

function filterRevenueStudents(q) {
  const acked    = _boostIsAcknowledged('revenue');
  const todayStr = new Date().toISOString().split('T')[0];
  const allRevStudents = getRevenueStudents();
  const baseStudents   = acked ? allRevStudents : allRevStudents.filter(s => isPendingToday(s, todayStr));
  _applyRevenueFilters(baseStudents, q);
}

function openRevenueSubCard(type) {
  const all = getViewingStudents();
  const todayStr = new Date().toISOString().split('T')[0];

  const configs = {
    'non-partner-revenue': {
      title:   'Paid Service Revenue',
      filter:  s => s.servicingType === 'non-partner',
      badge:   s => `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Paid Service</span>${s.nonPartnerSubType === 'specialised-services' ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 ml-1">Specialised</span>` : s.nonPartnerSubType === 'premium-universities' ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 ml-1">Premium Uni</span>` : s.nonPartnerSubType === 'paid-application' ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 ml-1">Paid App</span>` : ''}`,
      def:     'Students under Paid Service — includes Premium Universities, Specialised Services, and Paid Application tracks where the service fee has not yet been collected.',
      closure: 'Full Paid Service fee is collected and recorded in the system.',
    },
    'prime-enrolments': {
      title:   'Free Service Enrolment',
      filter:  s => s.servicingType === 'partner',
      badge:   s => `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Free Service</span>`,
      def:     'Students enrolled under Free Service (partner university servicing) where enrolment confirmation is pending or outstanding.',
      closure: 'Student enrolment is confirmed under Free Service and recorded in the system.',
    },
    'specialised-services': {
      title:   'Specialised Services',
      filter:  s => s.servicingType === 'non-partner' && s.nonPartnerSubType === 'specialised-services',
      badge:   s => `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Specialised Services</span>`,
      def:     'Students availing Paid Service — Specialised Services (SOP, Visa, IELTS prep etc.) where the service fee payment is pending.',
      closure: 'Specialised service fee is paid and recorded in the system.',
    },
  };

  const cfg = configs[type];
  if (!cfg) return;

  state.drawerMode = 'revenueSubCardView';
  state.drawerRevenueSubCardId = type;
  state.drawerPrevMode = 'boostRevenue';

  const acked    = _boostIsAcknowledged('revenue');
  let students   = all.filter(cfg.filter);
  if (!acked) students = students.filter(s => isPendingToday(s, todayStr));

  const headerHtml = !acked ? `<div class="mb-3">${_renderBoostTodayHeader(students.length)}</div>` : `<div class="mb-3">${_renderBoostAckHeader()}</div>`;

  const revBanner = cfg.def ? _metricDefBanner(cfg.def, cfg.closure || '') : '';
  const listHTML = students.length
    ? `${revBanner}${headerHtml}<div class="space-y-2">${students.map(s => `
        <div class="student-card" onclick="openStudentDetail('${s.id}')">
          <div class="flex items-start justify-between mb-2">
            <div>
              <p class="font-semibold text-sm text-text-main">${s.name}</p>
              <p class="text-xs text-text-muted">${s.id} · ${s.course} · <span class="font-medium text-primary/80">${s.country || '—'}</span></p>
            </div>
            <div class="flex gap-1 flex-wrap justify-end">${cfg.badge(s)}</div>
          </div>
          <div class="text-xs text-text-muted">📅 Follow-up: ${s.followup}</div>
          <p class="text-xs text-primary font-semibold mt-2 cursor-pointer">Open →</p>
        </div>`).join('')}</div>`
    : `${revBanner}${headerHtml}<p class="text-xs text-text-muted italic text-center py-6">No students due today for this category.</p>`;

  openDrawer(cfg.title, listHTML, true);
}

function getCounselorData() {
  const c = COUNSELORS.find(x => x.id === state.viewingCounselorId) || COUNSELORS[0];
  return c.today;
}

/* ═══════════════ LOG TASK ═══════════════ */

let _reminderType = 'call';

function selectReminderType(type) {
  _reminderType = type;
  // Update button styles
  document.querySelectorAll('.reminder-type-btn').forEach(btn => {
    btn.classList.remove('active', 'border-accent', 'bg-accent/5', 'text-accent');
    btn.classList.add('border-border', 'text-text-muted');
  });
  const active = document.getElementById('rtype-' + type);
  if (active) {
    active.classList.add('border-accent', 'bg-accent/5', 'text-accent');
    active.classList.remove('border-border', 'text-text-muted');
  }
  // Show/hide custom name
  const customName = document.getElementById('reminderCustomName');
  if (customName) customName.classList.toggle('hidden', type !== 'custom');
}

function logTask() {
  const typeLabels = { call:'Call to User', message:'Send Message to User', payment:'Payment Follow Up', custom:'Custom Task' };
  const label = typeLabels[_reminderType] || 'Reminder';
  const customName = document.getElementById('taskCustomName')?.value.trim();
  const notes    = document.getElementById('taskNotes').value.trim();
  const date     = document.getElementById('taskDate')?.value;
  const userId   = document.getElementById('taskUserId')?.value.trim();
  const taskTitle = (_reminderType === 'custom' && customName) ? customName : label;

  // Validate User ID — required
  if (!userId) {
    const el = document.getElementById('taskUserId');
    if (el) { el.classList.add('border-danger'); el.focus(); }
    showToast('⚠️ Please enter a User ID before saving.', 'warning');
    return;
  }
  // Remove error styling if present
  document.getElementById('taskUserId')?.classList.remove('border-danger');

  // Bump counselor metrics (followups as proxy)
  const c = COUNSELORS.find(x => x.id === state.viewingCounselorId) || COUNSELORS[0];
  if (c.today.followups !== undefined) c.today.followups += 1;
  if (c.today.tasks    !== undefined) c.today.tasks += 1;

  const dateStr = date ? ` · ${new Date(date).toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}` : '';
  showToast(`✅ Reminder saved for ${userId}: ${taskTitle}${dateStr}`, 'success');

  // Save to own tasks
  state.ownTasks.push({
    id: Date.now(),
    type: _reminderType,
    title: taskTitle,
    userId: userId,
    notes: notes || '',
    date: date || '',
    done: false,
    createdAt: new Date().toISOString()
  });

  // Reset form
  document.getElementById('taskNotes').value = '';
  document.getElementById('taskUserId').value = '';
  if (document.getElementById('taskCustomName')) document.getElementById('taskCustomName').value = '';
  if (document.getElementById('taskDate')) document.getElementById('taskDate').value = '';
  selectReminderType('call');
  renderMetricCards();
  renderBoostCards();
}

/* ═══════════════ HISTORY TABLE ═══════════════ */

function switchHistory(period, btn) {
  state.historyPeriod = period;
  document.querySelectorAll('#tab1 .period-btn').forEach((b,i) => { if(i<3) b.classList.remove('active'); });
  btn.classList.add('active');
  renderHistoryTable();
}

function renderHistoryTable() {
  const tbody = document.getElementById('historyTableBody');
  if (!tbody) return;  // Achievement History replaced by Stand Up table (Feature F)
  const c = getCounselorData();
  const mults = { '7d': histMults[0], 'month': histMults[4], 'year': histMults[8] };
  const mult = mults[state.historyPeriod] || 1;
  const rows = [
    { metric:'Calls Made',    actual: Math.round(c.calls * mult * 7), target: TARGETS.calls * 7 },
    { metric:'STIs Submitted',actual: Math.round(c.stis * mult * 7),  target: TARGETS.stis * 7 },
    { metric:'Applications',  actual: Math.round(c.applications * mult * 7), target: TARGETS.applications * 7 },
    { metric:'Deposits',      actual: Math.round(c.deposits * mult * 7), target: TARGETS.deposits * 7 },
    { metric:'Lock-ins',      actual: Math.round(c.lockins * mult * 7), target: TARGETS.lockins * 7 },
    { metric:'Revenue',       actual: Math.round(c.revenueCollected * mult * 7), target: TARGETS.revenue_target * 7, isCurrency:true },
  ];
  const period = { '7d':1, 'month':4.3, 'year':52 };
  const p = period[state.historyPeriod] || 1;
  const adjustedRows = rows.map(r => ({ ...r, actual: Math.round(r.actual * p / 7), target: Math.round(r.target * p / 7) }));

  tbody.innerHTML = adjustedRows.map(r => {
    const pct = r.target ? Math.round((r.actual / r.target) * 100) : 0;
    const cls = pct >= 100 ? 'text-success' : pct >= 60 ? 'text-accent' : 'text-danger';
    const dispA = r.isCurrency ? fmt(r.actual) : r.actual;
    const dispT = r.isCurrency ? fmt(r.target) : r.target;
    return `<tr>
      <td class="py-2 font-medium text-text-main">${r.metric}</td>
      <td class="py-2 text-right font-mono">${dispA}</td>
      <td class="py-2 text-right font-mono text-text-muted">${dispT}</td>
      <td class="py-2 text-right font-bold ${cls}">${pct}%</td>
    </tr>`;
  }).join('');
}

/* ═══════════════ LEADERBOARD (Tab 1) ═══════════════ */

let leaderViewMode = 'counsellor'; // 'counsellor' | 'teamlead'

function switchLeader(period, btn) {
  state.leaderPeriod = period;
  document.querySelectorAll('#tab1 .period-btn').forEach((b,i) => { if(i>=3) b.classList.remove('active'); });
  btn.classList.add('active');
  renderLeaderboard();
}

function switchLeaderView(mode, btn) {
  leaderViewMode = mode;
  document.querySelectorAll('.leader-view-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderLeaderboard();
}

function onTLCounsellorChange() {
  const sel = document.getElementById('tlCounsellorSelect');
  if (!sel) return;
  state.viewingCounselorId = parseInt(sel.value);
  // Sync header selector if visible
  const hdrSel = document.getElementById('counselorSelector');
  if (hdrSel) hdrSel.value = state.viewingCounselorId;
  renderBoostCards();
  renderMetricCards();
  renderLeaderboard();
}

function renderLeaderboard() {
  const metrics = [
    { key:'stis',         label:'STIs Submitted' },
    { key:'applications', label:'Applications' },
    { key:'deposits',     label:'Deposits' },
    { key:'lockins',      label:'Lock-ins' },
    { key:'revenue',      label:'Revenue',      isCurrency:true },
  ];
  const pMult = { today:1, month:22, year:264 }[state.leaderPeriod] || 1;
  const grid  = document.getElementById('leaderboardGrid');

  // Choose pool based on toggle
  const pool = (leaderViewMode === 'teamlead')
    ? TEAM_LEADS.map((c, i) => ({ ...c, today: { stis: 18+i*4, applications: 14+i*3, deposits: 10+i*2, lockins: 7+i*2, revenueCollected: 520000+i*80000, calls: 60+i*10 } }))
    : COUNSELORS;

  grid.innerHTML = metrics.map(m => {
    const ranked = pool.map((c, i) => ({
      name: c.name,
      val: Math.round((m.key === 'revenue' ? c.today.revenueCollected : c.today[m.key] || c.today.calls) * (leaderViewMode === 'teamlead' ? 1 : offsets[i]) * pMult),
    })).sort((a,b) => b.val - a.val).slice(0, 3);

    const rows = ranked.map((r,i) => {
      const cls = ['r1','r2','r3'][i];
      const badge = ['🥇','🥈','🥉'][i];
      const disp = m.isCurrency ? fmt(r.val) : r.val;
      return `<div class="flex items-center gap-2 py-1 text-sm">
        <span class="rank-badge ${cls}">${badge}</span>
        <span class="flex-1 font-medium text-text-main truncate">${r.name}</span>
        <span class="font-mono font-bold text-text-main">${disp}</span>
      </div>`;
    }).join('');

    return `<div class="leader-card">
      <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">${m.label}</p>
      ${rows}
    </div>`;
  }).join('');
}

/* ═══════════════ SLAB TABLE ═══════════════ */

function renderSlabTable() {
  const tbody = document.getElementById('slabTableBody');
  tbody.innerHTML = INCENTIVE_SLABS.map((s, idx) => {
    const pctMatch = s.status.match(/(\d+)%/);
    const pct = pctMatch ? parseInt(pctMatch[1]) : 100;
    const badgeCls = pct >= 100 ? 'bg-orange-100 text-accent border border-orange-200'
                   : pct >= 75  ? 'bg-blue-50 text-primary border border-blue-200'
                   : 'bg-red-50 text-danger border border-red-200';
    const earnCls  = pct >= 100 ? 'text-accent' : 'text-primary';
    const earnersId = `slab-earners-${idx}`;
    const medal = ['🥇','🥈','🥉'];
    const earnersHTML = s.earners.map((e, i) => `
      <div class="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
        <div class="flex items-center gap-2">
          <span class="text-sm">${medal[i] || ''}</span>
          <span class="text-xs font-semibold text-text-main">${e.name}</span>
          <span class="text-[10px] text-text-muted">(${e.count})</span>
        </div>
        <span class="text-xs font-bold text-accent font-mono">${fmt(e.earned)}</span>
      </div>`).join('');
    return `
    <tr class="hover:bg-surface/30 transition-colors cursor-pointer" onclick="toggleSlabEarners('${earnersId}')">
      <td class="py-3">
        <p class="font-semibold text-text-main text-sm">${s.component}</p>
        <p class="text-[10px] text-text-muted mt-0.5">📅 ${s.drivePeriod}</p>
      </td>
      <td class="py-3 text-text-muted text-xs">${s.rule}</td>
      <td class="py-3">
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${badgeCls}">${s.status}</span>
      </td>
      <td class="py-3 text-right">
        <span class="font-mono font-bold ${earnCls} text-sm">${fmt(s.earned)}</span>
        <p class="text-[10px] text-text-muted mt-0.5">👥 ${s.earners.length} earned ▾</p>
      </td>
    </tr>
    <tr id="${earnersId}" class="hidden">
      <td colspan="4" class="pb-3 px-2">
        <div class="bg-surface rounded-xl border border-border px-4 py-3">
          <p class="text-[10px] font-bold text-text-muted uppercase tracking-wide mb-2">Counsellors who earned — ${s.drivePeriod}</p>
          ${earnersHTML}
        </div>
      </td>
    </tr>`;
  }).join('');
}

function toggleSlabEarners(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
}

function openCounsellorOfferDrawer(offerId) {
  const o = COUNSELLOR_OFFERS.find(x => x.id === offerId);
  if (!o) return;

  // Get target students based on bucket
  const all = getViewingStudents();
  const bucketMap = {
    deposit: all.filter(s => ['deposit'].includes(s.stage)),
    lockin:  all.filter(s => s.hasFinalisedUniversity || s.stage === 'lockin'),
    sti:     all.filter(s => s.islRating >= 8 && s.appDownloaded),
  };
  const targets = bucketMap[o.targetBucket] || all.slice(0, 4);

  const calcHTML = `
    <div class="mb-5">
      <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">💰 Incentive Structure</p>
      <div class="bg-surface rounded-xl border border-border overflow-hidden">
        <table class="w-full text-xs">
          <thead><tr class="bg-surface border-b border-border">
            <th class="text-left px-4 py-2 font-semibold text-text-muted">Milestone</th>
            <th class="text-right px-4 py-2 font-semibold text-text-muted">Reward</th>
          </tr></thead>
          <tbody class="divide-y divide-border">
            ${o.calcRows.map(r => `
              <tr class="hover:bg-white/60">
                <td class="px-4 py-2.5 font-semibold text-text-main">${r.rank}</td>
                <td class="px-4 py-2.5 text-right font-medium" style="color:#ea580c">${r.prize}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;

  const targetsHTML = targets.length
    ? `<div>
        <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">🎯 Students to Target</p>
        <p class="text-xs text-text-muted mb-3 italic">${o.targetDesc}</p>
        <div class="space-y-2">
          ${targets.map(s => `
            <div class="student-card cursor-pointer" onclick="openStudentDetail('${s.id}')">
              <div class="flex items-start justify-between mb-1">
                <div>
                  <p class="font-semibold text-sm text-text-main">${s.name}</p>
                  <p class="text-xs text-text-muted">${s.id} · ${s.course} · ${s.country || '—'}</p>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-accent uppercase">${s.stage}</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-text-muted">
                <span>📅 Follow-up: ${s.followup}</span>
                <span>⭐ ISL: ${s.islRating}/10</span>
              </div>
              <p class="text-xs text-primary font-semibold mt-1.5 cursor-pointer">Open profile →</p>
            </div>`).join('')}
        </div>
       </div>`
    : `<p class="text-xs text-text-muted italic text-center py-4">No matching students for this offer right now.</p>`;

  const content = calcHTML + targetsHTML;
  openDrawer(`${o.icon} ${o.title}`, content, false);
}

/* ═══════════════ EARNINGS CHART ═══════════════ */

function initEarningsChart() {
  if (state.earningsChart) return;
  const ctx = document.getElementById('earningsChart');
  if (!ctx) return;
  // FY 2026-27: Apr 2026 → Mar 2027; current month = May 2026 (index 1)
  const months = ['Apr 26','May 26','Jun 26','Jul 26','Aug 26','Sep 26','Oct 26','Nov 26','Dec 26','Jan 27','Feb 27','Mar 27'];
  const colors = MONTHLY_EARNINGS.map((v, i) =>
    i === 1 ? '#16A34A'      // current month → green
    : v === 0 ? '#E2E8F0'    // future → light grey
    : '#1D4ED8'              // past months → blue
  );
  state.earningsChart = new Chart(ctx, {
    type:'bar',
    data:{ labels:months, datasets:[{ data:MONTHLY_EARNINGS, backgroundColor:colors, borderRadius:6, borderSkipped:false }] },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ display:false },
        tooltip:{ callbacks:{ label: ctx => fmt(ctx.parsed.y) } },
        annotation:{}
      },
      scales:{
        y:{ ticks:{ callback:v => fmt(v), font:{family:'Fira Code',size:11} }, grid:{color:'#E2E8F0'} },
        x:{ grid:{display:false}, ticks:{font:{family:'Poppins',size:11}} }
      }
    }
  });
}

/* ═══════════════ EARNERS LEADERBOARD ═══════════════ */

let earnerViewMode = 'counsellor'; // 'counsellor' | 'teamlead'

function switchEarnerView(mode, btn) {
  earnerViewMode = mode;
  document.querySelectorAll('.earner-view-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderEarnersLeaderboard();
}

function renderEarnersLeaderboard() {
  if (earnerViewMode === 'teamlead') {
    renderEarnerList('earnerMonthList', EARNER_TL_SEED_MONTH, TEAM_LEADS);
    renderEarnerList('earnerAllList', EARNER_TL_SEED_ALLTIME, TEAM_LEADS);
  } else {
    renderEarnerList('earnerMonthList', EARNER_SEED_MONTH, COUNSELORS);
    renderEarnerList('earnerAllList', EARNER_SEED_ALLTIME, COUNSELORS);
  }
}

function renderEarnerList(elId, seeds, pool) {
  const ranked = (pool || COUNSELORS).map((c,i) => ({ name:c.name, avatar:c.avatar, val:seeds[i] || 0 }))
    .sort((a,b) => b.val - a.val);
  const max = ranked[0].val;
  const el = document.getElementById(elId);
  el.innerHTML = ranked.map((r,i) => {
    const badge = i === 0 ? `<span class="rank-badge r1">🥇</span>` : i === 1 ? `<span class="rank-badge r2">🥈</span>` : i === 2 ? `<span class="rank-badge r3">🥉</span>` : `<span class="w-6 h-6 flex items-center justify-center text-xs text-text-muted">${i+1}</span>`;
    const valPart = (state.role !== 'counselor')
      ? `<span class="font-mono text-xs font-bold text-text-main">${fmt(r.val)}</span>`
      : `<div class="earner-bar-track"><div class="earner-bar-fill" style="width:${Math.round((r.val/max)*100)}%"></div></div>`;
    return `<div class="flex items-center gap-2 py-1.5">
      ${badge}
      <div class="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">${r.avatar}</div>
      <span class="flex-1 text-sm font-medium text-text-main truncate">${r.name}</span>
      ${valPart}
    </div>`;
  }).join('');
}

/* ═══════════════ OFFERS ROW (Tab 2) ═══════════════ */

function renderOffersRow() {
  const activeOffers = OFFERS.filter(o => o.active).slice(0, 5);
  const row = document.getElementById('offersRow');
  if (!row) return;
  if (!activeOffers.length) {
    row.innerHTML = '<p class="text-sm text-text-muted">No live offers at the moment.</p>';
    return;
  }
  row.innerHTML = activeOffers.map(o => {
    const d = daysUntil(o.expiry);
    const expiryClass = d <= 3 ? 'text-yellow-200 font-bold' : 'text-white/70';
    const expiryText = d <= 0 ? 'Expires today!' : d === 1 ? 'Expires tomorrow' : `Expires ${o.expiry.split('-').reverse().join(' ').replace('-', ' ')}`;
    return `
      <div class="offer-banner">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs px-2 py-0.5 bg-white/20 rounded-full font-semibold">${bucketEmoji(o.bucket)} ${bucketLabel(o.bucket)}</span>
        </div>
        <h3 class="font-bold text-base mb-1 leading-tight">${o.title}</h3>
        <p class="text-white/80 text-xs mb-3 leading-relaxed">${o.desc}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs ${expiryClass}">${expiryText}</span>
          <button onclick="openOfferDrawer('${o.id}')" class="text-xs font-semibold bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg cursor-pointer transition-colors">See Students →</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderCounsellorOffersRow() {
  const row = document.getElementById('counsellorOffersRow');
  const section = document.getElementById('counsellorOffersSection');
  if (!row || !section) return;

  // Show section only for counsellors and team leads (not ops)
  const role = state.user?.role || '';
  section.classList.toggle('hidden', role === 'ops_admin');

  const activeOffers = COUNSELLOR_OFFERS.filter(o => o.active);
  if (!activeOffers.length) {
    row.innerHTML = '<p class="text-sm text-text-muted">No live offers for counsellors right now.</p>';
    return;
  }
  row.innerHTML = activeOffers.map(o => {
    const d = daysUntil(o.expiry);
    const expiryClass = d <= 3 ? 'text-yellow-200 font-bold' : 'text-white/70';
    const expiryText = d <= 0 ? 'Expires today!' : d === 1 ? 'Expires tomorrow' : `Expires ${o.expiry.split('-').reverse().join(' ').replace('-',' ')}`;
    return `
      <div class="flex-shrink-0 w-72 rounded-2xl text-white p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-transform"
           style="background:linear-gradient(135deg,${o.gradFrom} 0%,${o.gradTo} 100%);min-height:175px;box-shadow:0 8px 28px rgba(0,0,0,0.22)"
           onclick="openCounsellorOfferDrawer('${o.id}')">
        <div class="absolute inset-0 opacity-10" style="background:radial-gradient(circle at 80% 20%, white 0%, transparent 60%)"></div>
        <div class="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-2.5">
            <span class="text-lg">${o.icon}</span>
            <span class="text-xs px-2 py-0.5 bg-white/20 rounded-full font-semibold">${o.tag}</span>
          </div>
          <h3 class="font-bold text-base mb-1.5 leading-tight">${o.title}</h3>
          <p class="text-white/80 text-xs leading-relaxed">${o.desc}</p>
        </div>
        <div class="flex items-center justify-between mt-3">
          <div>
            <span class="text-[10px] ${expiryClass} block">${expiryText}</span>
            <span class="text-xs font-bold text-yellow-200 mt-0.5 block">🎁 ${o.reward}</span>
          </div>
          <div class="text-xs font-semibold bg-white/25 hover:bg-white/40 text-white px-3 py-1.5 rounded-lg transition-colors">
            View Details →
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ═══════════════ QUICK LINKS V1 (Tab 3) ═══════════════ */

function renderQuickLinks() {
  const links = [
    {
      id:'session', icon:'🚀', color:'bg-indigo-50', iconColor:'text-indigo-600',
      label: 'Join 10x',
      desc:'Click to join your 10x session and boost your performance',
      action:`joinTenX()`
    },
    {
      id:'sheet', icon:'📊', color:'bg-green-50', iconColor:'text-green-600',
      label:'Templates Sheet — Open Templates',
      desc:'Access the shared Google Sheet with all templates and SOPs',
      action:`openQuickLink('sheet')`
    },
    {
      id:'support', icon:'🎫', color:'bg-orange-50', iconColor:'text-orange-600',
      label:'Support — Raise a Request',
      desc:'Submit a ticket to the ops team for help with data, incentives, or issues',
      action:`openTicketModal()`
    },
  ];
  const grid = document.getElementById('ldTopCards');
  if (!grid) return;
  grid.innerHTML = links.map(l => `
    <div onclick="${l.action}" class="bg-white border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group">
      <div class="w-12 h-12 rounded-xl ${l.color} flex items-center justify-center text-2xl flex-shrink-0">${l.icon}</div>
      <div class="min-w-0">
        <p class="font-bold text-text-main text-sm group-hover:text-primary transition-colors">${l.label}</p>
        <p class="text-xs text-text-muted mt-0.5 leading-snug">${l.desc}</p>
      </div>
      <svg class="w-4 h-4 text-text-muted group-hover:text-primary flex-shrink-0 ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </div>
  `).join('');
}

function openQuickLink(type) {
  const url = QUICK_LINK_URLS[type];
  if (url) showToast(`Opening ${type === 'session' ? 'video session' : 'templates sheet'}…`, 'info');
  else showToast('URL not configured. Ask your ops admin.', 'warning');
}

/* ═══════════════ IDLE 10X BANNER ═══════════════ */
// Banner is shown immediately on login and stays visible on all tabs until dismissed.

/* ═══════════════ JOIN 10X ═══════════════ */

const TEN_X_URL = '#'; // Replace with actual 10x URL

function joinTenX() {
  if (TEN_X_URL && TEN_X_URL !== '#') {
    window.open(TEN_X_URL, '_blank');
  } else {
    showToast('10x URL not configured yet. Ask your ops admin.', 'warning');
  }
  dismiss10xBanner();
}

function dismiss10xBanner() {
  const banner = document.getElementById('join10xBanner');
  const main = document.getElementById('mainContent');
  if (banner) banner.classList.add('hidden');
  if (main) main.style.marginTop = '104px';
}

function show10xBanner() {
  const banner = document.getElementById('join10xBanner');
  const main = document.getElementById('mainContent');
  if (banner) banner.classList.remove('hidden');
  if (main) main.style.marginTop = '126px'; // slim banner ~22px
  // Also send bot notification message
  setTimeout(() => {
    appendBotMessageLive(`<p>🚀 <strong>Hey! Your 10x session is live.</strong> Don't miss it — click <strong>Join 10x</strong> in the purple banner at the top to jump in now with your team! 💪</p>`);
    // Increment unread badge
    state.chatPanel.unreadCount = (state.chatPanel.unreadCount || 0) + 1;
    const badge = document.getElementById('botUnreadBadge');
    if (badge) {
      badge.textContent = state.chatPanel.unreadCount;
      badge.classList.remove('hidden');
    }
  }, 1500);
}

/* ═══════════════ L&D INFO HUB SECTIONS ═══════════════ */

function switchLDTab(tab) {
  // Update tab button styles
  document.querySelectorAll('.ld-subtab').forEach(btn => {
    btn.classList.remove('border-primary', 'text-primary', 'bg-primary/5');
    btn.classList.add('border-transparent', 'text-text-muted');
  });
  const activeBtn = document.getElementById(tab === 'infohub' ? 'ldTabInfoHub' : 'ldTabNewsletter');
  if (activeBtn) {
    activeBtn.classList.add('border-primary', 'text-primary', 'bg-primary/5');
    activeBtn.classList.remove('border-transparent', 'text-text-muted');
  }
  // Show/hide panels — counsellors get ticket summary instead of info hub
  const isCounsellor = state.currentUser && state.currentUser.role === 'counselor';
  document.getElementById('ldPanelInfohub').classList.toggle('hidden', tab !== 'infohub' || isCounsellor);
  document.getElementById('ldPanelCounsellorTickets').classList.toggle('hidden', tab !== 'infohub' || !isCounsellor);
  if (tab === 'infohub' && isCounsellor) renderCounsellorTicketSummary();
}

function openTicketDetailPage(filter) {
  const page = document.getElementById('ticketDetailPage');
  const titleEl = document.getElementById('ticketDetailTitle');
  const countEl = document.getElementById('ticketDetailCount');
  const tickets = filter === 'all'
    ? COUNSELLOR_TICKETS
    : COUNSELLOR_TICKETS.filter(t => t.status === filter);

  const label = filter === 'all' ? 'All Tickets' : filter === 'Resolved' ? 'Resolved Tickets' : 'Not Resolved';
  titleEl.textContent = label;
  countEl.textContent = tickets.length;

  const list = document.getElementById('ticketDetailList');
  if (!tickets.length) {
    list.innerHTML = `<div class="text-center py-16 text-text-muted text-sm">No tickets in this category.</div>`;
  } else {
    list.innerHTML = tickets.map(t => {
      const isResolved = t.status === 'Resolved';
      const badge = isResolved
        ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-200">Resolved</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">Not Resolved</span>`;
      return `
        <div class="bg-white rounded-xl border border-border p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono font-semibold text-text-muted bg-surface px-2 py-0.5 rounded">${t.id}</span>
              <span class="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">${t.category}</span>
              ${badge}
            </div>
            <span class="text-xs text-text-muted flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Raised: ${t.dateRaised}
            </span>
          </div>
          <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">Issue Description</p>
          <p class="text-sm text-text-main leading-relaxed mb-3">${t.description}</p>
          <div class="bg-surface rounded-lg p-3 border-l-4 ${isResolved ? 'border-green-400' : 'border-orange-400'}">
            <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">Latest Update</p>
            <p class="text-sm text-text-main">${t.update}</p>
          </div>
        </div>`;
    }).join('');
  }

  page.classList.remove('hidden');
  page.scrollTop = 0;
}

function closeTicketDetailPage() {
  document.getElementById('ticketDetailPage').classList.add('hidden');
}

function renderCounsellorTicketSummary() {
  const total    = COUNSELLOR_TICKETS.length;
  const resolved = COUNSELLOR_TICKETS.filter(t => t.status === 'Resolved').length;
  const open     = COUNSELLOR_TICKETS.filter(t => t.status === 'Open').length;
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('ticketCountAll',      total);
  setEl('ticketCountResolved', resolved);
  setEl('ticketCountOpen',     open);
  filterCounsellorTickets('all');
}

function filterCounsellorTickets(filter) {
  const list = document.getElementById('counsellorTicketList');
  if (!list) return;
  const tickets = filter === 'all'
    ? COUNSELLOR_TICKETS
    : COUNSELLOR_TICKETS.filter(t => t.status === filter);

  if (!tickets.length) {
    list.innerHTML = `<div class="text-center py-12 text-text-muted text-sm">No tickets found.</div>`;
    return;
  }

  list.innerHTML = tickets.map(t => {
    const isResolved = t.status === 'Resolved';
    const badge = isResolved
      ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-200">Resolved</span>`
      : `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">Not Resolved</span>`;
    const updateBorder = isResolved ? 'border-green-400' : 'border-orange-400';
    return `
      <div class="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-semibold text-text-muted bg-surface px-2 py-0.5 rounded">${t.id}</span>
            <span class="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">${t.category}</span>
            ${badge}
          </div>
          <span class="text-xs text-text-muted flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Raised: ${t.dateRaised}
          </span>
        </div>
        <div class="mb-1">
          <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">Issue Description</p>
          <p class="text-sm text-text-main leading-relaxed">${t.description}</p>
        </div>
        <div class="mt-3 bg-surface rounded-lg p-3 border-l-4 ${updateBorder}">
          <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">Latest Update</p>
          <p class="text-sm text-text-main">${t.update}</p>
        </div>
      </div>`;
  }).join('');
}

function switchInfoHubSection(section, btn) {
  // Update nav button styles
  document.querySelectorAll('.ih-nav-btn').forEach(b => {
    b.classList.remove('active', 'bg-primary/10', 'text-primary', 'border-primary');
    b.classList.add('hover:bg-surface', 'text-text-main', 'border-transparent');
  });
  if (btn) {
    btn.classList.add('active', 'bg-primary/10', 'text-primary', 'border-primary');
    btn.classList.remove('hover:bg-surface', 'text-text-main', 'border-transparent');
  }
  // Show/hide sections
  document.querySelectorAll('.ih-section').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById('ihSection-' + section);
  if (el) el.classList.remove('hidden');
  if (section === 'training-guidelines') renderTGGrid();
}

/* ── Training and Guidelines ── */
const TG_DOCS = [
  { university: 'Brock University',                                          country: 'Canada',    category: 'training',      docType: 'University Training Document', filename: 'Brock University Viewbook (1).pdf',                                  ext: 'pdf'  },
  { university: 'California State University Fullerton',                     country: 'USA',       category: 'consent',       docType: 'Consent Form',                 filename: '1770204673502-CSU_Fullerton_FERPA_advising_release_Consent_Form.pdf', ext: 'pdf'  },
  { university: 'University of the West of Scotland',                        country: 'UK',        category: 'consent',       docType: 'Application Form',             filename: 'UWS international applicant personal statement template.docx',        ext: 'docx' },
  { university: 'Newcastle University',                                      country: 'UK',        category: 'authorisation', docType: 'Authorisation',                filename: 'Newcastle University Agent Authorisation Form 2026.docx',            ext: 'docx' },
  { university: 'TEG - University of the West of Scotland - London Campus',  country: 'UK',        category: 'training',      docType: 'University Training Document', filename: 'UWS London_slidedeck.pdf',                                           ext: 'pdf'  },
  { university: 'Abu Dhabi University',                                      country: 'UAE',       category: 'training',      docType: 'University Training Document', filename: 'International Brochure 2025-2026 PG.pdf',                            ext: 'pdf'  },
  { university: 'University of East London',                                 country: 'UK',        category: 'authorisation', docType: 'Authorisation',                filename: 'Representation Authorisation.docx',                                  ext: 'docx' },
  { university: 'Coventry University - London',                              country: 'UK',        category: 'authorisation', docType: 'Authorisation',                filename: 'AGENT AUTHORISATION and CONSENT FORM (1).pdf',                       ext: 'pdf'  },
  { university: 'University of Exeter',                                      country: 'UK',        category: 'authorisation', docType: 'Authorisation',                filename: 'New Agent form - Jan 26 - Exeter.pdf',                               ext: 'pdf'  },
  { university: 'University of Manchester',                                  country: 'UK',        category: 'training',      docType: 'University Training Document', filename: 'UoM Partner Training Deck 2025.pdf',                                 ext: 'pdf'  },
  { university: 'Northeastern University',                                   country: 'USA',       category: 'consent',       docType: 'Consent Form',                 filename: 'NEU_Agent_Consent_Form_2025.pdf',                                    ext: 'pdf'  },
  { university: 'University of Toronto',                                     country: 'Canada',    category: 'authorisation', docType: 'Authorisation',                filename: 'UofT_Agent_Authorisation_2026.docx',                                 ext: 'docx' },
];

let tgActiveCategory = 'all';

function renderTGGrid() {
  const grid = document.getElementById('tgGrid');
  if (!grid) return;
  const country = (document.getElementById('tgFilterCountry')?.value || '').toLowerCase();
  const uni     = (document.getElementById('tgFilterUniversity')?.value || '').toLowerCase();
  const filtered = TG_DOCS.filter(d => {
    if (tgActiveCategory !== 'all' && d.category !== tgActiveCategory) return false;
    if (country && !d.country.toLowerCase().includes(country)) return false;
    if (uni && !d.university.toLowerCase().includes(uni)) return false;
    return true;
  });
  if (!filtered.length) {
    grid.innerHTML = `<div class="col-span-3 flex flex-col items-center justify-center py-16 text-center">
      <svg class="w-16 h-16 text-text-muted/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      <p class="font-semibold text-text-main mb-1">No documents found</p>
      <p class="text-sm text-text-muted">Try adjusting the filters or selecting a different category.</p>
    </div>`;
    return;
  }
  grid.innerHTML = filtered.map(d => {
    const isPdf  = d.ext === 'pdf';
    const fileIcon = isPdf
      ? `<svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17v-2h8v2H8zm0-4v-2h8v2H8z"/></svg>`
      : `<svg class="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17v-2h8v2H8zm0-4v-2h8v2H8z"/></svg>`;
    return `<div class="bg-white rounded-xl border border-border p-4 hover:shadow-sm transition-shadow">
      <div class="flex items-start justify-between gap-2 mb-1">
        <p class="font-semibold text-sm text-text-main leading-snug">${d.university}</p>
        <button class="flex-shrink-0 text-primary hover:text-primary-light" title="Download">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        </button>
      </div>
      <p class="text-xs text-text-muted mb-3">${d.docType}</p>
      <div class="flex items-center gap-2 bg-surface rounded-lg px-3 py-2">
        ${fileIcon}
        <span class="text-xs text-text-main truncate">${d.filename}</span>
      </div>
    </div>`;
  }).join('');
}

function switchTGCategory(cat, btn) {
  tgActiveCategory = cat;
  document.querySelectorAll('.tg-cat-btn').forEach(b => {
    b.classList.remove('bg-primary/10', 'text-primary', 'border-primary');
    b.classList.add('border-border', 'text-text-muted', 'hover:bg-surface');
  });
  if (btn) {
    btn.classList.add('bg-primary/10', 'text-primary', 'border-primary');
    btn.classList.remove('border-border', 'text-text-muted', 'hover:bg-surface');
  }
  renderTGGrid();
}

function filterTrainingGuidelines() { renderTGGrid(); }

function resetTrainingGuidelines() {
  document.getElementById('tgFilterCountry').value    = '';
  document.getElementById('tgFilterUniversity').value = '';
  tgActiveCategory = 'all';
  document.querySelectorAll('.tg-cat-btn').forEach((b, i) => {
    if (i === 0) { b.classList.add('bg-primary/10','text-primary','border-primary'); b.classList.remove('border-border','text-text-muted','hover:bg-surface'); }
    else         { b.classList.remove('bg-primary/10','text-primary','border-primary'); b.classList.add('border-border','text-text-muted','hover:bg-surface'); }
  });
  renderTGGrid();
}

function switchDeadlineTab(tab, btn) {
  document.querySelectorAll('.deadline-tab-btn').forEach(b => {
    b.classList.remove('bg-primary', 'text-white');
    b.classList.add('border', 'border-border', 'text-text-muted', 'hover:bg-surface');
  });
  if (btn) {
    btn.classList.add('bg-primary', 'text-white');
    btn.classList.remove('border', 'border-border', 'text-text-muted', 'hover:bg-surface');
  }
}

/* ═══════════════ NEWSLETTER TABLE ═══════════════ */

const NEWSLETTER_DATA = [
  { id:1,  country:'USA', date:'21 Aug 2025', related:'Pending Deferral Applications - Fall 2025', category:'Important Update', summary:'Deferral requests need to be submitted before August 31, 2025. Applications deferred beyond this date will be re-evaluated, and scholarships will not be carried forward as it will go for re-evaluation.', link:'https://docs.google.com/spreadsheets/sample1', remarks:'', admitProb:'', imRelated:'No' },
  { id:2,  country:'USA', date:'21 Aug 2025', related:'Bangor University', category:'Important Update', summary:'Please find enclosed our January 2026 intake flyer. I would be grateful if you could circulate the flyer to your colleagues. Should you have any questions or require any further information or advice about the January intake please do not hesitate to contact me.', link:'https://docs.google.com/document/sample2', remarks:'Circulate to all counsellors', admitProb:'High', imRelated:'Yes' },
  { id:3,  country:'UK',  date:'21 Aug 2025', related:'London South Bank University', category:'Important Update', summary:'We are pleased to inform you that applications for the January 2026 intake are now open. Please find attached the list of courses available for this intake for your reference.', link:'https://docs.google.com/document/sample3', remarks:'', admitProb:'Medium', imRelated:'Yes' },
  { id:4,  country:'UK',  date:'21 Aug 2025', related:'Swansea University', category:'Important Update', summary:'We are aware that there was an issue with deposit payments. This has now been resolved, and you should be able to make your payment as normal. Many of you have already paid your deposit — thank you.', link:'https://docs.google.com/document/sample4', remarks:'Payment issue resolved', admitProb:'', imRelated:'No' },
  { id:5,  country:'Canada', date:'15 Aug 2025', related:'University of Toronto', category:'Scholarship Alert', summary:'University of Toronto has announced the Global Excellence Scholarship for 2026 intake. Eligibility: 85%+ in last 2 years, IELTS 7.0+. Deadline: October 31, 2025.', link:'https://docs.google.com/document/sample5', remarks:'High priority — share with all UG students', admitProb:'High', imRelated:'Yes' },
  { id:6,  country:'Australia', date:'10 Aug 2025', related:'University of Melbourne', category:'Deadline Reminder', summary:'Reminder: The application deadline for Semester 1 2026 at University of Melbourne is approaching. All applications must be submitted by September 30, 2025.', link:'https://docs.google.com/document/sample6', remarks:'', admitProb:'Medium', imRelated:'No' },
  { id:7,  country:'Germany', date:'05 Aug 2025', related:'TU Munich', category:'Important Update', summary:'TU Munich has introduced a new English-medium MBA program starting Winter 2026. No tuition fee for admitted students. IELTS 6.5+ required.', link:'https://docs.google.com/document/sample7', remarks:'Great for budget-conscious students', admitProb:'Medium', imRelated:'Yes' },
  { id:8,  country:'Ireland', date:'01 Aug 2025', related:'University College Dublin', category:'Event', summary:'UCD will host a virtual counsellor webinar on August 20, 2025 covering 2026 intake updates, scholarship opportunities and application tips.', link:'https://docs.google.com/document/sample8', remarks:'Register counsellors before Aug 18', admitProb:'', imRelated:'Yes' },
  { id:9,  country:'Singapore', date:'28 Jul 2025', related:'NUS Business School', category:'Important Update', summary:'NUS Business School has revised its English proficiency requirements. IELTS minimum is now 6.5 (from 6.0). Existing applicants with 6.0 must retest.', link:'https://docs.google.com/document/sample9', remarks:'Inform all Singapore-bound students', admitProb:'Low', imRelated:'No' },
  { id:10, country:'UK',  date:'25 Jul 2025', related:'University of Hertfordshire', category:'Scholarship Alert', summary:'Hertfordshire International Scholarship offering up to £3,000 for September 2026 intake. Merit-based. Applications open from September 1, 2025.', link:'https://docs.google.com/document/sample10', remarks:'', admitProb:'High', imRelated:'Yes' },
  { id:11, country:'USA', date:'20 Jul 2025', related:'Northeastern University', category:'Deadline Reminder', summary:'Final reminder: Northeastern Early Action deadline is November 1, 2025. Students applying under Early Action receive decisions by December 15, 2025.', link:'https://docs.google.com/document/sample11', remarks:'Prioritise NU applicants', admitProb:'Medium', imRelated:'Yes' },
  { id:12, country:'Canada', date:'15 Jul 2025', related:'York University', category:'Important Update', summary:'York University has updated its conditional admission policy. Students with IELTS 6.0 overall (no band below 5.5) can now receive conditional offers with English pathway.', link:'https://docs.google.com/document/sample12', remarks:'Good for borderline students', admitProb:'High', imRelated:'No' },
];

function renderNewsletterTable() {
  const tbody = document.getElementById('newsletterTableBody');
  if (!tbody) return;
  // Apply filters
  const country = document.getElementById('nlFilterCountry')?.value || '';
  const related  = document.getElementById('nlFilterRelated')?.value  || '';
  const category = document.getElementById('nlFilterCategory')?.value || '';
  const from = document.getElementById('nlFilterDateFrom')?.value || '';
  const to   = document.getElementById('nlFilterDateTo')?.value   || '';

  let rows = NEWSLETTER_DATA;
  if (country) rows = rows.filter(r => r.country === country);
  if (related)  rows = rows.filter(r => r.related.toLowerCase().includes(related.toLowerCase()));
  if (category) rows = rows.filter(r => r.category === category);

  tbody.innerHTML = rows.map(r => `
    <tr class="hover:bg-surface/50 transition-colors">
      <td class="px-3 py-3 text-text-muted font-mono">${r.id}</td>
      <td class="px-3 py-3 font-medium">${r.country}</td>
      <td class="px-3 py-3 text-text-muted whitespace-nowrap">${r.date}</td>
      <td class="px-3 py-3 text-text-main">${r.related}</td>
      <td class="px-3 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${r.category==='Scholarship Alert'?'bg-green-100 text-green-700':r.category==='Deadline Reminder'?'bg-red-100 text-red-700':r.category==='Event'?'bg-blue-100 text-blue-700':'bg-orange-100 text-orange-700'}">${r.category}</span></td>
      <td class="px-3 py-3 text-text-muted max-w-[300px]"><p class="line-clamp-3">${r.summary}</p></td>
      <td class="px-3 py-3"><a href="${r.link}" target="_blank" class="text-primary text-[10px] hover:underline break-all">${r.link ? 'View Doc →' : '—'}</a></td>
      <td class="px-3 py-3 text-text-muted">${r.remarks || '—'}</td>
      <td class="px-3 py-3"><span class="font-semibold ${r.admitProb==='High'?'text-success':r.admitProb==='Medium'?'text-amber-600':r.admitProb==='Low'?'text-danger':'text-text-muted'}">${r.admitProb || '—'}</span></td>
      <td class="px-3 py-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${r.imRelated==='Yes'?'bg-accent/10 text-accent':'bg-surface text-text-muted'}">${r.imRelated}</span></td>
    </tr>
  `).join('');
}

function resetNewsletterFilters() {
  ['nlFilterCountry','nlFilterRelated','nlFilterCategory','nlFilterDateFrom','nlFilterDateTo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  renderNewsletterTable();
}

/* ═══════════════ COURSE UPDATES ═══════════════ */

function renderCourseUpdates() {
  const el = document.getElementById('courseUpdates');
  el.innerHTML = COURSE_UPDATES.map(u => `
    <div class="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
      <svg class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <p class="text-sm text-text-main">${u}</p>
    </div>
  `).join('');
}

/* ═══════════════ TRAINING MODULES ═══════════════ */

function _buildModuleHTML(modules, prefix) {
  return modules.map(m => {
    const pid = prefix + m.id;
    return `
    <div class="border border-border rounded-xl overflow-hidden">
      <button onclick="toggleModule('${pid}')"
        class="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-border/50 transition-colors cursor-pointer">
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span class="font-semibold text-sm text-text-main">${m.name}</span>
          <span class="text-xs text-text-muted">${m.lessons} lessons</span>
        </div>
        <svg id="chevron-${pid}" class="w-4 h-4 text-text-muted transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div id="module-${pid}" class="module-body">
        <div class="divide-y divide-border">
          ${m.items.map(item => {
            const typeColors = { Video:'bg-red-100 text-red-700', Document:'bg-blue-100 text-primary', Link:'bg-green-100 text-success' };
            const tc = typeColors[item.type] || 'bg-gray-100 text-gray-700';
            return `<div class="flex items-center gap-3 px-4 py-3">
              <div class="flex-1">
                <p class="text-sm font-medium text-text-main">${item.title}</p>
                <p class="text-xs text-text-muted mt-0.5">${item.desc}</p>
              </div>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${tc}">${item.type}</span>
              <button onclick="openLesson('${item.title}')" class="text-xs font-semibold text-accent hover:underline cursor-pointer">Open</button>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderTrainingModules() {
  const el = document.getElementById('trainingModules');
  if (el) el.innerHTML = _buildModuleHTML(TRAINING_MODULES, '');
  const elLD = document.getElementById('trainingModulesLD');
  if (elLD) elLD.innerHTML = _buildModuleHTML(TRAINING_MODULES, 'ld-');
}

function toggleModule(id) {
  const body = document.getElementById('module-' + id);
  const chev = document.getElementById('chevron-' + id);
  if (!body || !chev) return;
  const isOpening = !body.classList.contains('open');
  // Collapse all modules first (accordion behaviour)
  document.querySelectorAll('.module-body').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('[id^="chevron-"]').forEach(el => el.style.transform = '');
  // Then open the clicked one if it was closed
  if (isOpening) {
    body.classList.add('open');
    chev.style.transform = 'rotate(180deg)';
  }
}

function openLesson(title) {
  showToast(`Opening: ${title}`, 'info');
}

/* ═══════════════ ADMIN PANEL ═══════════════ */

function switchAdmin(panel, btn) {
  state.currentAdminPanel = panel;
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById('adminPanel-' + panel).classList.remove('hidden');
  document.querySelectorAll('.adm-nav').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* Users */
function renderUsersTable() {
  const all = [...COUNSELORS, ...TEAM_LEADS, ...OPS_USERS];
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = all.map(u => `
    <tr class="hover:bg-surface transition-colors">
      <td class="px-4 py-3">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">${u.avatar}</div>
          <span class="font-medium text-sm">${u.name}</span>
        </div>
      </td>
      <td class="px-4 py-3 text-sm text-text-muted capitalize">${u.role.replace('_',' ')}</td>
      <td class="px-4 py-3 text-sm text-text-muted">${u.team}</td>
      <td class="px-4 py-3 text-sm text-text-muted">${u.email}</td>
      <td class="px-4 py-3 text-right">
        <div class="flex gap-2 justify-end">
          <button onclick="showToast('Password reset sent to ${u.email}','info')" class="text-xs text-primary hover:underline cursor-pointer">Reset Pwd</button>
          <button onclick="showToast('${u.name} deactivated.','warning')" class="text-xs text-danger hover:underline cursor-pointer">Deactivate</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddUserModal() { document.getElementById('addUserModal').classList.remove('hidden'); }

function submitAddUser() {
  const name  = document.getElementById('newUserName').value.trim();
  const email = document.getElementById('newUserEmail').value.trim();
  if (!name || !email) { showToast('Please fill in name and email.', 'error'); return; }
  showToast(`User "${name}" added successfully!`, 'success');
  closeModal('addUserModal');
  document.getElementById('newUserName').value = '';
  document.getElementById('newUserEmail').value = '';
}

function submitCorrection() {
  const cid    = document.getElementById('corrCounselor').value;
  const metric = document.getElementById('corrMetric').value;
  const val    = document.getElementById('corrValue').value;
  const reason = document.getElementById('corrReason').value.trim();
  if (!cid || !metric || !val || !reason) { showToast('All fields are required.', 'error'); return; }
  showToast('Correction submitted successfully!', 'success');
}

/* Slabs */
function handleCsvFile(e) { processCsv(e.target.files[0]); }
function handleCsvDrop(e) { e.preventDefault(); document.getElementById('csvDropZone').classList.remove('drag-over'); processCsv(e.dataTransfer.files[0]); }
function processCsv(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const lines = e.target.result.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',');
    const rows = lines.slice(1,6).map(l => l.split(','));
    const table = document.getElementById('csvPreviewTable');
    table.innerHTML = `<thead class="bg-surface border-b border-border"><tr>${headers.map(h => `<th class="px-3 py-2 text-left font-semibold text-text-muted">${h.trim()}</th>`).join('')}</tr></thead>
      <tbody class="divide-y divide-border">${rows.map(r => `<tr>${r.map(c => `<td class="px-3 py-2">${c.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;
    document.getElementById('csvPreview').classList.remove('hidden');
  };
  reader.readAsText(file);
}
function confirmCsvUpload() { showToast('Incentive slabs uploaded and applied!', 'success'); document.getElementById('csvPreview').classList.add('hidden'); }

/* Quick Links (Admin) */
function saveQuickLinks() {
  QUICK_LINK_URLS.session = document.getElementById('qlSessionUrl').value || QUICK_LINK_URLS.session;
  QUICK_LINK_URLS.sheet   = document.getElementById('qlSheetUrl').value   || QUICK_LINK_URLS.sheet;
  showToast('Quick links saved!', 'success');
  renderQuickLinks();
}

/* Admin Training */
function renderAdminTraining() {
  const tbody = document.getElementById('adminTrainingBody');
  tbody.innerHTML = TRAINING_MODULES.map(m => `
    <tr class="hover:bg-surface">
      <td class="px-4 py-3 font-medium text-sm">${m.name}</td>
      <td class="px-4 py-3 text-sm text-text-muted text-right">${m.lessons}</td>
      <td class="px-4 py-3 text-right">
        <div class="flex gap-2 justify-end">
          <button onclick="showToast('Edit module: ${m.name}','info')" class="text-xs text-primary hover:underline cursor-pointer">Edit</button>
          <button onclick="showToast('Add lesson to: ${m.name}','info')" class="text-xs text-accent hover:underline cursor-pointer">+ Lesson</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* Tickets */
function renderTicketsTable() {
  const tbody = document.getElementById('ticketsTableBody');
  tbody.innerHTML = SUPPORT_TICKETS.map(t => `
    <tr class="hover:bg-surface">
      <td class="px-4 py-3 text-sm">
        <p class="font-medium text-text-main">${t.id}</p>
        <p class="text-xs text-text-muted">${t.subject}</p>
      </td>
      <td class="px-4 py-3 text-sm text-text-muted">${t.counselor}</td>
      <td class="px-4 py-3 text-sm text-text-muted">${t.category}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${t.status === 'Open' ? 'bg-orange-100 text-accent' : 'bg-green-100 text-success'}">${t.status}</span>
      </td>
      <td class="px-4 py-3 text-right">
        ${t.status === 'Open'
          ? `<button onclick="resolveTicket('${t.id}')" class="text-xs font-semibold text-success hover:underline cursor-pointer">Mark Resolved</button>`
          : `<span class="text-xs text-text-muted">—</span>`}
      </td>
    </tr>
  `).join('');
}

function resolveTicket(id) {
  const t = SUPPORT_TICKETS.find(x => x.id === id);
  if (t) { t.status = 'Resolved'; renderTicketsTable(); showToast(`Ticket ${id} resolved!`, 'success'); }
}

/* Offers Admin */
function renderAdminOffers() {
  const tbody = document.getElementById('offersTableBody');
  tbody.innerHTML = OFFERS.map(o => {
    const d = daysUntil(o.expiry);
    return `
      <tr class="hover:bg-surface">
        <td class="px-4 py-3 text-sm font-medium text-text-main">${o.title}</td>
        <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 bg-orange-100 text-accent rounded-full">${bucketLabel(o.bucket)}</span></td>
        <td class="px-4 py-3 text-sm ${d <= 3 ? 'text-danger font-semibold' : 'text-text-muted'}">${o.expiry}</td>
        <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full font-semibold ${o.active ? 'bg-green-100 text-success' : 'bg-gray-100 text-text-muted'}">${o.active ? 'Active' : 'Inactive'}</span></td>
        <td class="px-4 py-3 text-right">
          <div class="flex gap-2 justify-end">
            <button onclick="toggleOffer('${o.id}')" class="text-xs ${o.active ? 'text-danger' : 'text-success'} hover:underline cursor-pointer">${o.active ? 'Deactivate' : 'Activate'}</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openCreateOfferModal() {
  const activeCount = OFFERS.filter(o => o.active).length;
  if (activeCount >= 5) { showToast('Maximum 5 active offers allowed. Deactivate one first.', 'error'); return; }
  document.getElementById('createOfferModal').classList.remove('hidden');
}

function submitCreateOffer() {
  const title  = document.getElementById('offerTitle').value.trim();
  const desc   = document.getElementById('offerDesc').value.trim();
  const bucket = document.getElementById('offerBucket').value;
  const expiry = document.getElementById('offerExpiry').value;
  if (!title || !desc || !expiry) { showToast('Please fill in all fields.', 'error'); return; }
  OFFERS.push({ id:'o' + Date.now(), title, desc, bucket, expiry, active:true });
  showToast('Offer published!', 'success');
  closeModal('createOfferModal');
  renderAdminOffers();
  renderOffersRow();
}

function toggleOffer(id) {
  const o = OFFERS.find(x => x.id === id);
  if (!o) return;
  if (!o.active) {
    const activeCount = OFFERS.filter(x => x.active).length;
    if (activeCount >= 5) { showToast('Maximum 5 active offers reached.', 'error'); return; }
  }
  o.active = !o.active;
  renderAdminOffers();
  renderOffersRow();
  showToast(`Offer ${o.active ? 'activated' : 'deactivated'}.`, o.active ? 'success' : 'warning');
}

/* Badges Admin */
function renderAdminBadges() {
  const el = document.getElementById('adminBadgeList');
  el.innerHTML = BADGE_TYPES.map(b => `
    <div class="flex items-center gap-3 p-3 border border-border rounded-xl">
      <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl" style="background:${b.color}20">${b.icon}</div>
      <div class="flex-1">
        <p class="font-semibold text-sm text-text-main">${b.name}</p>
        <p class="text-xs text-text-muted">${b.desc}</p>
      </div>
      <button onclick="openAwardModal('${b.id}')" class="text-xs font-semibold text-accent hover:underline cursor-pointer">Award</button>
    </div>
  `).join('');

  const logEl = document.getElementById('awardLogList');
  logEl.innerHTML = AWARDED_BADGES.map(ab => {
    const bt = BADGE_TYPES.find(b => b.id === ab.badgeId);
    const c  = COUNSELORS.find(c => c.id === ab.counselorId);
    return `<div class="flex items-center gap-2 py-2 border-b border-border last:border-0">
      <span class="text-xl">${bt ? bt.icon : '🏅'}</span>
      <div class="flex-1">
        <p class="font-medium text-sm">${c ? c.name : '—'}</p>
        <p class="text-xs text-text-muted">${bt ? bt.name : '—'} • ${ab.date} • by ${ab.awardedBy}</p>
      </div>
    </div>`;
  }).join('');
}

let currentAwardBadgeId = null;
function openAwardModal(badgeId) {
  currentAwardBadgeId = badgeId;
  const bt = BADGE_TYPES.find(b => b.id === badgeId);
  document.getElementById('awardBadgeTitle').textContent = `Award: ${bt ? bt.icon + ' ' + bt.name : 'Badge'}`;
  document.getElementById('awardBadgeNote').value = '';
  document.getElementById('awardBadgeModal').classList.remove('hidden');
}

function submitAwardBadge() {
  const cid  = parseInt(document.getElementById('awardBadgeCounselor').value);
  const note = document.getElementById('awardBadgeNote').value.trim();
  if (!cid || !currentAwardBadgeId) { showToast('Select a counselor.', 'error'); return; }
  const c  = COUNSELORS.find(x => x.id === cid);
  const bt = BADGE_TYPES.find(b => b.id === currentAwardBadgeId);
  AWARDED_BADGES.push({ counselorId:cid, badgeId:currentAwardBadgeId, awardedBy:state.currentUser.name, date:'23 May 2026', note });
  showToast(`${bt ? bt.icon + ' ' + bt.name : 'Badge'} awarded to ${c ? c.name : 'counselor'}!`, 'success');
  closeModal('awardBadgeModal');
  renderAdminBadges();
  renderBadgeStrip();
}

/* ═══════════════ DRAWER ═══════════════ */

function openDrawer(title, content, showBack) {
  document.getElementById('drawerTitle').textContent   = title;
  document.getElementById('drawerContent').innerHTML   = content;
  document.getElementById('drawerBack').classList.toggle('hidden', !showBack);
  document.getElementById('drawerBackdrop').classList.remove('hidden');
  const drawer = document.getElementById('rightDrawer');
  drawer.classList.remove('hidden');
  void drawer.offsetWidth; // force reflow so CSS transition fires (fixes Vercel)
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  const drawer = document.getElementById('rightDrawer');
  drawer.classList.remove('open');
  setTimeout(() => {
    drawer.classList.add('hidden');
    document.getElementById('drawerBackdrop').classList.add('hidden');
    document.body.style.overflow = '';
    state.drawerMode = null;
    state.drawerSelectedStudent = null;
    state.drawerPrevMode = null;
  }, 300);
}

function closeDrawerAndGoHome() {
  closeDrawer();
  setTimeout(() => switchTab('tab1'), 50);
}

function refreshCurrentDrawer() {
  const mode = state.drawerMode;
  if (!mode) return;
  if (mode === 'boost')            openBoostDrawer(state.drawerBoostType);
  else if (mode === 'boostFunnel') openBoostFunnelDrawer();
  else if (mode === 'boostSubCard' || mode === 'boostSubCardView') openBoostSubCard(state.drawerBoostSubCardId || state.drawerBoostSubType);
  else if (mode === 'boostRevenue') openBoostRevenueDrawer();
  else if (mode === 'revenueSubCardView') openRevenueSubCard(state.drawerRevenueSubCardId);
  else if (mode === 'boostReferrals') openBoostReferralsDrawer();
  else if (mode === 'opportunity')  openOpportunityDrawer();
  else if (mode === 'waGroup')      openWAGroupDetailsDrawer();
  else if (mode === 'standupDrillDown') { closeDrawer(); renderStandupTable(); }
  else showToast('Refreshed', 'success');
}

function drawerGoBack() {
  if (state.drawerPrevMode === 'boost') {
    openBoostDrawer(state.drawerBoostType);
  } else if (state.drawerPrevMode === 'boostFunnel') {
    openBoostFunnelDrawer();
  } else if (state.drawerPrevMode === 'boostSubCard') {
    openBoostSubCard(state.drawerBoostSubType);
  } else if (state.drawerPrevMode === 'boostSubCardView') {
    openBoostSubCard(state.drawerBoostSubCardId);
  } else if (state.drawerPrevMode === 'boostRevenue') {
    openBoostRevenueDrawer();
  } else if (state.drawerPrevMode === 'revenueSubCardView') {
    openRevenueSubCard(state.drawerRevenueSubCardId);
  } else if (state.drawerPrevMode === 'offer') {
    openOfferDrawer(state.drawerOfferId);
  } else if (state.drawerPrevMode === 'opportunity') {
    openOpportunityDrawer();
  } else if (state.drawerPrevMode === 'boostReferrals') {
    openBoostReferralsDrawer();
  } else if (state.drawerPrevMode === 'waGroup') {
    openWAGroupDetailsDrawer();
  } else if (state.drawerPrevMode === 'standup') {
    closeDrawer();
  } else if (state.drawerPrevMode === 'boost-deposit') {
    openBoostDrawer('deposit');
  }
}

/* Boost Drawer */
function openBoostDrawer(type) {
  state.drawerMode      = 'boost';
  state.drawerBoostType = type;
  state.drawerPrevMode  = null;
  const todayStr = new Date().toISOString().split('T')[0];
  const all      = getViewingStudents().filter(s => s.stage === type);
  const labels   = { sti:'Boost STI', application:'Boost Application', deposit:'Boost Deposit', lockin:'Boost Lock-in' };
  const acked    = _boostIsAcknowledged(type);

  // ── Boost Deposit: show only subcards (no flat student list) ──
  if (type === 'deposit') {
    const cToUcStudents  = getViewingStudents().filter(s => s.stage === 'deposit' && s.ucAssigned === true);
    const casI20Students = getViewingStudents().filter(s =>
      ['deposit','lockin'].includes(s.stage) &&
      ['UK','USA'].includes(s.country) &&
      s.leadStatus !== 'Drop off' &&
      s.casI20Raised !== true
    );
    const content = `
      <div class="space-y-3">
        <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Priority Actions</p>
        ${_boostMetricCard('c-to-uc-deposit-pending', 'C to UC / UC Received — Deposit Not Paid', cToUcStudents, todayStr)}
        ${_boostMetricCard('cas-i20-review', 'CAS/I20 - Counsellor Review Needed', casI20Students, todayStr)}
        <p class="text-[11px] font-bold uppercase tracking-widest text-text-muted mt-4 mb-2">Less Efforts High Output</p>
        ${_boostMetricCard('deferrals-opp', 'Deferrals Opportunity', getDeferralOpportunityStudents(), todayStr,
          "openVolumeMetricDrawer('deferrals')")}
      </div>`;
    openDrawer('Boost Deposit', content, false);
    return;
  }

  let content;
  if (!acked) {
    const pendingToday  = all.filter(s => isPendingToday(s, todayStr));
    const dueToday      = all.filter(s => s.followup === todayStr);
    const allDone       = dueToday.length > 0 && dueToday.every(s => s.subtasks.every(t => t.done));
    const title = `${labels[type] || type} — Today (${pendingToday.length})`;

    content = `
      ${_renderBoostTodayHeader(pendingToday.length)}
      ${allDone ? _renderBoostAckPrompt(type) : pendingToday.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-10 text-center">
          <div class="text-4xl mb-3">✅</div>
          <p class="font-semibold text-text-main mb-1">No tasks due today!</p>
          <p class="text-xs text-text-muted">All caught up — no students have a follow-up today.</p>
        </div>` : `
        <div class="mb-3">
          <input type="text" placeholder="Search by name or ID…" oninput="filterStudentList(this.value, '${type}')"
            class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div id="studentListInner" class="space-y-3">${renderStudentList(pendingToday)}</div>`}
      ${_renderAllTasksSection(false, all, type)}
    `;
    openDrawer(title, content, false);
  } else {
    const title = `${labels[type] || type} — All Tasks (${all.length})`;
    content = `
      ${_renderBoostAckHeader()}
      <div class="mb-3">
        <input type="text" placeholder="Search by name or ID…" oninput="filterStudentList(this.value, '${type}')"
          class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>
      <div id="studentListInner" class="space-y-3">${renderStudentList(all)}</div>
      ${_renderAllTasksSection(true, all, type)}
    `;
    openDrawer(title, content, false);
  }
}

function filterStudentList(q, type) {
  const todayStr = new Date().toISOString().split('T')[0];
  const acked    = _boostIsAcknowledged(type);
  let students   = getViewingStudents().filter(s => s.stage === type);
  if (!acked) students = students.filter(s => isPendingToday(s, todayStr));
  students = students.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())
  );
  document.getElementById('studentListInner').innerHTML = renderStudentList(students);
}

function renderStudentList(students) {
  if (!students.length) return '<p class="text-text-muted text-sm text-center py-8">No students found.</p>';
  return students.map(s => {
    const waIssue = s.whatsappGroups.some(g => !g.studentJoined);
    const waSummary = `${s.whatsappGroups.length} group${s.whatsappGroups.length !== 1 ? 's' : ''} — student missing from ${s.whatsappGroups.filter(g => !g.studentJoined).length}`;
    return `<div class="student-card" onclick="openStudentDetail('${s.id}')">
      <div class="flex items-start justify-between mb-2">
        <div>
          <p class="font-semibold text-sm text-text-main">${s.name}</p>
          <p class="text-xs text-text-muted">${s.id} · ${s.course}</p>
        </div>
        <span class="app-badge ${s.appDownloaded ? 'downloaded' : 'not-downloaded'}">${s.appDownloaded ? '📱 Downloaded' : '📵 Not Downloaded'}</span>
      </div>
      <div class="flex items-center gap-4 text-xs text-text-muted">
        ${s.followup ? `<span>📅 Follow-up: ${s.followup}</span>` : ''}
        <span class="${waIssue ? 'text-accent' : 'text-success'}">${waSummary}</span>
      </div>
      <button class="mt-2 text-xs font-semibold text-accent hover:underline">Open →</button>
    </div>`;
  }).join('');
}

/* Student Detail */
function openStudentDetail(studentId) {
  // Only update prevMode when navigating INTO student detail for the first time.
  // Do NOT overwrite it when re-rendering from saveSubtask / toggleSubtask (already 'student').
  if (state.drawerMode !== 'student') {
    state.drawerPrevMode = state.drawerMode || null;
  }
  state.drawerMode = 'student';
  state.drawerOfferId = state.drawerOfferId || null;
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  state.drawerSelectedStudent = s;

  const stageOrder = ['sti','application','deposit','lockin'];
  const stageIdx   = stageOrder.indexOf(s.stage);
  const stageLabels = ['STI','Application','Deposit','Lock-in'];
  const stageBar = stageLabels.map((l,i) => `
    <div class="flex-1">
      <div class="stage-step ${i < stageIdx ? 'done' : i === stageIdx ? 'current' : ''}"></div>
      <p class="text-[10px] text-center mt-1 ${i <= stageIdx ? 'font-semibold text-text-main' : 'text-text-muted'}">${l}</p>
    </div>
  `).join('');

  const waRows = s.whatsappGroups.map(g => `
    <div class="text-xs flex gap-4 py-1 border-b border-border last:border-0">
      <span class="font-medium text-text-main flex-1">${g.groupName}</span>
      <span>${g.counselorJoined ? '✅ You' : '❌ You'}</span>
      <span>${g.studentJoined ? '✅ Student' : '❌ Student'}</span>
    </div>
  `).join('');

  const activityHtml = `
    <div class="activity-log pl-5">
      ${s.activity.map(a => `
        <div class="activity-item">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <p class="activity-time">${a.time}</p>
            <p class="activity-action">${a.type}</p>
            ${a.notes ? `<p class="activity-notes">${a.notes}</p>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const subtaskHtml = s.subtasks.map((t,idx) => `
    <div class="subtask-item ${t.done ? 'done' : ''}" onclick="toggleSubtask('${s.id}',${idx})">
      <input type="checkbox" ${t.done ? 'checked' : ''} onclick="event.stopPropagation();toggleSubtask('${s.id}',${idx})" />
      <div class="flex-1">
        <p class="text-sm font-medium ${t.done ? 'line-through text-text-muted' : 'text-text-main'}">${t.label}</p>
        ${t.done && t.timestamp ? `<p class="text-xs text-text-muted">${t.timestamp}${t.notes ? ' — ' + t.notes : ''}</p>` : ''}
      </div>
    </div>
    <div id="stform-${s.id}-${idx}" class="subtask-form hidden">
      <textarea id="stnotes-${s.id}-${idx}" placeholder="Notes… (required)" rows="2" class="w-full text-xs px-2 py-1.5 border border-border rounded-lg mb-2 resize-none focus:outline-none"></textarea>
      <div class="flex gap-2 mb-2">
        <select id="stoutcome-${s.id}-${idx}" class="flex-1 text-xs px-2 py-1.5 border border-border rounded-lg bg-white focus:outline-none">
          <option>Connected</option><option>Not Reachable</option><option>Callback Requested</option><option>Promise to Pay</option><option>Closed</option>
        </select>
        <input id="stdate-${s.id}-${idx}" type="date" placeholder="Follow-up date (required)" class="text-xs px-2 py-1.5 border border-border rounded-lg focus:outline-none" />
      </div>
      <p class="text-[10px] text-red-500 mb-1">* Notes and Follow-up Date are required</p>
      <button onclick="saveSubtask('${s.id}',${idx})" class="mt-1 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-lg cursor-pointer">Save</button>
    </div>
  `).join('');

  const content = `
    <!-- Stage Bar -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Current Stage</p>
      <div class="stage-bar">${stageBar}</div>
    </div>

    <!-- Info Grid -->
    <div class="grid grid-cols-2 gap-2 mb-4 text-xs">
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">User ID</p><p class="font-semibold">${s.id}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Course</p><p class="font-semibold">${s.course}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Country</p><p class="font-semibold text-primary">${s.country || '—'}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Last Call</p><p class="font-semibold">${s.lastCallDate} — ${s.lastCallOutcome}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Follow-up</p>
        <p class="font-semibold ${s.followup <= '2026-05-23' ? 'text-danger' : 'text-text-main'}">${s.followup}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">App Status</p>
        <p><span class="app-badge ${s.appDownloaded ? 'downloaded' : 'not-downloaded'}">${s.appDownloaded ? '📱 Downloaded' : '📵 Not Downloaded'}</span></p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Quality Score</p><p class="font-semibold">${s.qualityScore}/100</p></div>
      <div class="bg-surface rounded-lg p-2 col-span-2"><p class="text-text-muted">Last Connected</p><p class="font-semibold">${s.lastConnected}</p></div>
    </div>

    <!-- WhatsApp Groups -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-1 font-semibold uppercase tracking-wide">WhatsApp Groups</p>
      <div class="bg-surface rounded-lg p-2">${waRows}</div>
    </div>

    <!-- Servicing Type -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Servicing Type</p>
      <div class="bg-surface rounded-xl p-3 space-y-2">
        <div>
          <label class="text-[11px] text-text-muted font-medium">Type <span class="text-red-500">*</span></label>
          <select id="st-type-${s.id}" onchange="updateServicingType('${s.id}')"
            class="w-full mt-1 text-sm px-3 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent">
            <option value="">-- Select Servicing Type --</option>
            <option value="partner"     ${s.servicingType === 'partner'     ? 'selected' : ''}>Free Service</option>
            <option value="non-partner" ${s.servicingType === 'non-partner' ? 'selected' : ''}>Paid Service</option>
          </select>
        </div>
        <div id="st-sub-${s.id}" class="${s.servicingType === 'non-partner' ? '' : 'hidden'}">
          <label class="text-[11px] text-text-muted font-medium">Sub Type <span class="text-red-500">*</span></label>
          <select id="st-subtype-${s.id}" onchange="updateServicingSubType('${s.id}')"
            class="w-full mt-1 text-sm px-3 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent">
            <option value="">-- Select Sub Type --</option>
            <option value="premium-universities"  ${s.nonPartnerSubType === 'premium-universities'  ? 'selected' : ''}>Premium Universities</option>
            <option value="specialised-services"  ${s.nonPartnerSubType === 'specialised-services'  ? 'selected' : ''}>Specialised Services</option>
            <option value="paid-application"      ${s.nonPartnerSubType === 'paid-application'      ? 'selected' : ''}>Paid Application</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Subtask Checklist -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Subtasks</p>
      <div id="subtaskList">${subtaskHtml}</div>
    </div>

    <!-- Activity Log -->
    <div>
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Activity Log</p>
      ${activityHtml}
    </div>
  `;

  openDrawer(s.name, content, true);
}

function toggleSubtask(studentId, idx) {
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  const t = s.subtasks[idx];
  const formEl = document.getElementById(`stform-${studentId}-${idx}`);
  if (!t.done) {
    formEl.classList.toggle('hidden');
  } else {
    t.done = false;
    t.timestamp = null;
    openStudentDetail(studentId);
  }
}

function saveSubtask(studentId, idx) {
  const notes   = document.getElementById(`stnotes-${studentId}-${idx}`)?.value.trim();
  const date    = document.getElementById(`stdate-${studentId}-${idx}`)?.value;
  const outcome = document.getElementById(`stoutcome-${studentId}-${idx}`)?.value || '';

  // Validation — both notes and follow-up date are mandatory
  if (!notes && !date) {
    showToast('⚠️ Mark Follow Up Date and Fill the Notes', 'warning');
    document.getElementById(`stnotes-${studentId}-${idx}`)?.classList.add('border-red-400');
    document.getElementById(`stdate-${studentId}-${idx}`)?.classList.add('border-red-400');
    return;
  }
  if (!notes) {
    showToast('⚠️ Please fill in the Notes before saving.', 'warning');
    document.getElementById(`stnotes-${studentId}-${idx}`)?.classList.add('border-red-400');
    return;
  }
  if (!date) {
    showToast('⚠️ Please mark a Follow Up Date before saving.', 'warning');
    document.getElementById(`stdate-${studentId}-${idx}`)?.classList.add('border-red-400');
    return;
  }

  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  const now = new Date().toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });

  s.subtasks[idx].done      = true;
  s.subtasks[idx].timestamp = now;
  s.subtasks[idx].notes     = notes;
  s.subtasks[idx].outcome   = outcome;
  s.followup                = date;       // update lead follow-up date
  s.lastCallOutcome         = outcome;
  s.activity.unshift({ type: s.subtasks[idx].label, time: now, notes });

  showToast('Subtask saved!', 'success');
  openStudentDetail(studentId);
}

/* Opportunity Drawer */
function openOpportunityDrawer() {
  state.drawerMode     = 'opportunity';
  state.drawerPrevMode = null;
  const students = getViewingStudents();
  const courseFeeLocal = s => s.course.includes('MBA') ? 120000 : s.course.includes('B.Tech') ? 100000 : 80000;
  const totalVal = students.reduce((sum, s) => sum + courseFeeLocal(s), 0);
  const byStage = { lockin:[], deposit:[], application:[], sti:[] };
  students.forEach(s => { if (byStage[s.stage]) byStage[s.stage].push(s); });
  const countryFlag = { UK:'🇬🇧', Canada:'🇨🇦', Australia:'🇦🇺', USA:'🇺🇸', Germany:'🇩🇪', Ireland:'🇮🇪', Singapore:'🇸🇬', 'New Zealand':'🇳🇿' };

  const stageConfig = [
    { key:'lockin',      label:'Boost Lock-in',    icon:'🔒', accentCls:'bg-purple-600' },
    { key:'deposit',     label:'Boost Deposit',     icon:'💰', accentCls:'bg-green-600'  },
    { key:'application', label:'Boost Application', icon:'📋', accentCls:'bg-blue-600'   },
    { key:'sti',         label:'Boost STI',         icon:'⚡', accentCls:'bg-orange-500' },
  ];

  let content = `
    <div class="mb-4 p-3.5 bg-accent/10 border border-accent/20 rounded-xl">
      <p class="text-xs text-text-muted mb-0.5">Total Pipeline Opportunity</p>
      <p class="font-mono text-2xl font-bold text-accent">${fmt(totalVal)}</p>
      <p class="text-xs text-text-muted mt-1">${students.length} students across all stages</p>
    </div>
    <div class="space-y-2.5">
  `;

  stageConfig.forEach(({ key, label, icon }) => {
    const list = byStage[key];
    const stageVal = list.reduce((sum, s) => sum + courseFeeLocal(s), 0);
    content += `
      <div class="border border-border rounded-xl overflow-hidden shadow-sm">
        <button onclick="toggleOppCard('${key}')" class="w-full flex items-center justify-between p-3.5 bg-white hover:bg-surface transition-colors text-left">
          <div class="flex items-center gap-3">
            <span class="text-xl leading-none">${icon}</span>
            <div>
              <p class="font-semibold text-sm text-text-main">${label}</p>
              <p class="text-xs text-text-muted">${list.length} student${list.length !== 1 ? 's' : ''} · <span class="font-mono font-semibold text-success">${fmt(stageVal)}</span></p>
            </div>
          </div>
          <svg id="chevron-opp-${key}" class="w-4 h-4 text-text-muted transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="oppBody-${key}" class="hidden border-t border-border bg-surface/30">
          ${list.length === 0
            ? `<p class="text-xs text-text-muted text-center py-5">No students at this stage</p>`
            : `<div class="divide-y divide-border/40">${list.map(s => {
                const fee = courseFeeLocal(s);
                const flag = countryFlag[s.country] || '🌍';
                const initials = s.name.split(' ').map(w => w[0]).join('').slice(0,2);
                return `
                  <div class="flex items-center gap-3 px-3.5 py-3 hover:bg-surface/60 transition-colors">
                    <div class="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center flex-shrink-0">${initials}</div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-text-main">${s.name} <span class="text-sm">${flag}</span></p>
                      <p class="text-[11px] text-text-muted">${s.course}</p>
                    </div>
                    <div class="flex flex-col items-end gap-1.5">
                      <span class="text-xs font-bold font-mono text-success">${fmt(fee)}</span>
                      <button onclick="openStudentDetail('${s.id}');state.drawerPrevMode='opportunity';" class="text-[10px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-full transition-colors whitespace-nowrap">Take to Task →</button>
                    </div>
                  </div>`;
              }).join('')}</div>`
          }
        </div>
      </div>
    `;
  });

  // Generate More Referrals accordion card
  const allRefStudents = [...new Map(
    [...getReferralCohort('visa'), ...getReferralCohort('premium'), ...getReferralCohort('sti')]
    .map(s => [s.id, s])
  ).values()];
  const stageLabelMap = { sti:'STI', application:'Application', deposit:'Deposit', lockin:'Lock-in' };
  const stageClsMap   = { sti:'bg-orange-100 text-orange-700', application:'bg-blue-100 text-blue-700', deposit:'bg-green-100 text-green-700', lockin:'bg-purple-100 text-purple-700' };

  content += `
    <div class="border border-purple-200 rounded-xl overflow-hidden shadow-sm">
      <button onclick="toggleOppCard('referral')" class="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-purple-50 to-white hover:from-purple-100 transition-colors text-left">
        <div class="flex items-center gap-3">
          <span class="text-xl leading-none">🤝</span>
          <div>
            <p class="font-semibold text-sm text-text-main">Generate More Referrals</p>
            <p class="text-xs text-text-muted">${allRefStudents.length} students most likely to refer</p>
          </div>
        </div>
        <svg id="chevron-opp-referral" class="w-4 h-4 text-text-muted transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div id="oppBody-referral" class="hidden border-t border-purple-100">
        ${allRefStudents.length === 0
          ? `<p class="text-xs text-text-muted text-center py-5">No referral candidates yet</p>`
          : `<div class="divide-y divide-border/40">${allRefStudents.map(s => {
              const initials = s.name.split(' ').map(w => w[0]).join('').slice(0,2);
              const flag = countryFlag[s.country] || '🌍';
              return `
                <div class="px-3.5 py-3 bg-purple-50/30 hover:bg-purple-50/60 transition-colors">
                  <div class="flex items-center gap-3 mb-2.5">
                    <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">${initials}</div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-text-main">${s.name} <span class="text-sm">${flag}</span></p>
                      <p class="text-[11px] text-text-muted">${s.course}</p>
                    </div>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${stageClsMap[s.stage] || 'bg-gray-100 text-gray-600'}">${stageLabelMap[s.stage] || s.stage}</span>
                  </div>
                  <div class="flex gap-2">
                    <button onclick="openReferralWAMessage('${s.id}')" class="flex-1 text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                      <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.118.555 4.107 1.523 5.832L0 24l6.335-1.524A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 11.999 0zM12 22c-1.943 0-3.779-.517-5.376-1.428l-.387-.226-3.993.96.994-3.866-.253-.4A9.975 9.975 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                      Ask for Referral
                    </button>
                    <button onclick="openStudentDetail('${s.id}');state.drawerPrevMode='opportunity';" class="text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">Take to Task →</button>
                  </div>
                </div>`;
            }).join('')}</div>`
        }
      </div>
    </div>
  `;

  content += `</div>`; // close space-y-2.5
  openDrawer('Opportunity Size', content, false);
}

function toggleOppCard(key) {
  const body    = document.getElementById(`oppBody-${key}`);
  const chevron = document.getElementById(`chevron-opp-${key}`);
  if (!body) return;
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
}

function openReferralWAMessage(studentId) {
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  const counselorName = (state.currentUser && state.currentUser.name) ? state.currentUser.name : 'Your Counselor';
  const msgTemplate = `Hi ${s.name}! 👋\n\nThis is ${counselorName} from Leap. I hope your journey with us has been great so far! 🎓\n\nWe'd love to help your friends and family who are also planning to study abroad. If you know anyone who might be interested, please do share our details with them!\n\nFor every successful referral, you and your friend both get special benefits. 🎁\n\nThank you for being an amazing part of the Leap family! 🙏`;
  const encodedMsg = encodeURIComponent(msgTemplate);
  const groups = s.whatsappGroups || [];

  const groupsHtml = groups.length ? `
    <div class="mb-4">
      <p class="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">WhatsApp Groups</p>
      <div class="space-y-2">
        ${groups.map(g => `
          <div class="flex items-center justify-between p-2.5 bg-green-50 border border-green-200 rounded-xl">
            <div>
              <p class="text-xs font-semibold text-text-main">${g.groupName}</p>
              <p class="text-[10px] text-text-muted mt-0.5">${g.studentJoined ? '✅ Student joined' : '⏳ Student not in group'}</p>
            </div>
            <a href="https://wa.me/?text=${encodedMsg}" target="_blank"
               class="text-[10px] font-bold bg-green-600 text-white px-2.5 py-1.5 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
              Send to Group
            </a>
          </div>`).join('')}
      </div>
    </div>` : '';

  const safeMsg = msgTemplate.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const content = `
    <div class="mb-4 flex items-center gap-3 p-3.5 bg-purple-50 border border-purple-200 rounded-xl">
      <div class="w-10 h-10 rounded-full bg-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center flex-shrink-0">
        ${s.name.split(' ').map(w => w[0]).join('').slice(0,2)}
      </div>
      <div>
        <p class="font-bold text-sm text-text-main">${s.name}</p>
        <p class="text-xs text-text-muted">${s.course} · Stage: ${s.stage.toUpperCase()}</p>
      </div>
    </div>
    ${groupsHtml}
    <div class="mb-4">
      <p class="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Message Template</p>
      <div class="p-3.5 bg-surface border border-border rounded-xl text-[11px] text-text-main whitespace-pre-wrap leading-relaxed font-mono">${msgTemplate}</div>
    </div>
    <div class="flex gap-2">
      <button onclick="navigator.clipboard.writeText(\`${safeMsg}\`).then(()=>showToast('✅ Message copied to clipboard!','success'))"
        class="flex-1 text-sm font-semibold bg-surface border border-border text-text-main hover:bg-gray-100 px-4 py-2.5 rounded-xl transition-colors">
        📋 Copy Message
      </button>
      <a href="https://wa.me/?text=${encodedMsg}" target="_blank"
         class="flex-1 text-sm font-semibold bg-green-600 text-white hover:bg-green-700 px-4 py-2.5 rounded-xl transition-colors text-center flex items-center justify-center gap-2">
        <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.118.555 4.107 1.523 5.832L0 24l6.335-1.524A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 11.999 0zM12 22c-1.943 0-3.779-.517-5.376-1.428l-.387-.226-3.993.96.994-3.866-.253-.4A9.975 9.975 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        Open WhatsApp
      </a>
    </div>
  `;
  state.drawerPrevMode = 'opportunity';
  openDrawer('Ask for Referral — ' + s.name, content, true);
}

/* Offer Drawer */
function openOfferDrawer(offerId) {
  const o = OFFERS.find(x => x.id === offerId);
  if (!o) return;
  state.drawerMode   = 'offer';
  state.drawerOfferId = offerId;
  const students = getViewingStudents().filter(s => s.stage === o.bucket || (o.bucket === 'lockin' && s.stage === 'lockin') || s.stage === o.bucket);
  const content = `
    <div class="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-xl">
      <p class="font-semibold text-sm text-accent">${bucketEmoji(o.bucket)} ${o.title}</p>
      <p class="text-xs text-text-muted mt-1">${o.desc}</p>
    </div>
    <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Eligible Students (${students.length})</p>
    <div class="space-y-3">${renderStudentList(students)}</div>
  `;
  openDrawer('Eligible Students', content, false);
}

/* ═══════════════ PROFILE PAGE ═══════════════ */

function openProfile() {
  closeProfileDropdown();
  const u = state.role === 'counselor' ? state.currentUser : COUNSELORS.find(c => c.id === state.viewingCounselorId) || state.currentUser;

  // Rating
  const d = COUNSELORS.find(c => c.id === (state.role === 'counselor' ? state.currentUser.id : state.viewingCounselorId));
  let rating = 7.0;
  if (d && d.today) {
    const t = d.today;
    const scores = [
      t.stis / TARGETS.stis, t.applications / TARGETS.applications, t.deposits / TARGETS.deposits,
      t.lockins / TARGETS.lockins, t.revenueCollected / TARGETS.revenue_target, t.f2f / TARGETS.f2f,
      t.isl / 5, t.referralPct / TARGETS.referral, t.q1score / 100, t.q2score / 100,
    ].map(v => Math.min(v, 1));
    rating = (scores.reduce((a,b) => a+b, 0) / scores.length * 10);
  }
  const ratingFixed = rating.toFixed(1);
  const stars = Math.round(rating / 2);

  // Avatar — show uploaded photo if available, else initials
  const avEl = document.getElementById('profileAvatar');
  if (u.photoUrl) {
    avEl.innerHTML = `<img src="${u.photoUrl}" class="w-full h-full object-cover rounded-full" alt="" />`;
    avEl.style.background = 'transparent';
  } else {
    avEl.textContent = u.avatar || initials(u.name);
    avEl.style.background = '';
  }

  document.getElementById('profileName').textContent   = u.name;
  document.getElementById('profileDesig').textContent  = u.designation || 'Counselor';

  // Login number + email under name
  const loginId = `LEAP-${String(u.id || 1).padStart(4,'0')}`;
  const loginInfoEl = document.getElementById('profileLoginInfo');
  if (loginInfoEl) loginInfoEl.textContent = `ID: ${loginId}  ·  ${u.email || '—'}`;

  document.getElementById('profileJoining').textContent = u.joiningDate || '—';
  document.getElementById('profileTeam').textContent    = u.team || '—';
  document.getElementById('profileManager').textContent = u.manager || '—';

  // Customer Rating — based on ISL feedback (out of 5) minus escalation penalty
  const myStudents = STUDENTS; // all students for this counsellor
  const escalationCount = myStudents.filter(s => s.hasEscalation).length;
  const avgISL = d && d.today ? d.today.isl : 4.0; // already out of 5
  const customerRating = Math.max(0, Math.min(5, avgISL - (escalationCount * 0.2))).toFixed(1);
  document.getElementById('profileRatingNum').textContent = `⭐ ${customerRating} / 5`;

  // Overall performance stars (out of 5 stars)
  const ratingEl = document.getElementById('profileRating');
  ratingEl.innerHTML = Array.from({length:5}, (_,i) =>
    `<span class="text-xl ${i < stars ? 'text-gold' : 'text-gray-300'}">★</span>`).join('');

  // Star rating definition
  const defEl = document.getElementById('profileRatingDef');
  if (defEl) {
    defEl.textContent = `★ Performance Rating (${ratingFixed}/10): Based on STI, Applications, Deposits, Lock-ins, Revenue, F2F, ISL, Referrals & Quality Scores relative to targets. ${stars}/5 stars.`;
  }

  // Best counsellor by performance rating
  const bestEl = document.getElementById('profileBestCounsellor');
  if (bestEl) {
    let bestC = null, bestR = -1;
    COUNSELORS.forEach(c => {
      if (!c.today) return;
      const t = c.today;
      const sc = [t.stis/TARGETS.stis, t.applications/TARGETS.applications, t.deposits/TARGETS.deposits,
        t.lockins/TARGETS.lockins, t.revenueCollected/TARGETS.revenue_target, t.f2f/TARGETS.f2f,
        t.isl/5, t.referralPct/TARGETS.referral, t.q1score/100, t.q2score/100
      ].map(v => Math.min(v,1));
      const r = sc.reduce((a,b) => a+b,0) / sc.length * 10;
      if (r > bestR) { bestR = r; bestC = c; }
    });
    if (bestC) {
      bestEl.innerHTML = `<div class="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 w-fit">
        <span class="text-sm">🏆</span>
        <span class="text-xs font-semibold text-amber-800">Top Rated: ${bestC.name} · ${bestR.toFixed(1)}/10</span>
      </div>`;
    }
  }

  // Badges
  const myBadges  = getMyBadges();
  const titleEl   = document.getElementById('profileBadgesTitle');
  titleEl.textContent = `${myBadges.length} Badge${myBadges.length !== 1 ? 's' : ''} Earned`;

  const grid = document.getElementById('profileBadgeGrid');
  grid.innerHTML = BADGE_TYPES.map(bt => {
    const earned = myBadges.find(ab => ab.badgeId === bt.id);
    const date   = earned ? AWARDED_BADGES.find(ab => ab.badgeId === bt.id && ab.counselorId === (d ? d.id : 0))?.date : null;
    return `<div class="badge-card ${earned ? '' : 'locked'}">
      <div class="badge-icon ${earned ? '' : 'locked'} mx-auto" style="${earned ? `background:${bt.color}20` : ''}">${bt.icon}</div>
      <p class="text-xs font-semibold text-text-main">${bt.name}</p>
      ${earned ? `<p class="text-[10px] text-text-muted mt-0.5">${date || 'Earned'}</p>` : `<p class="text-[10px] text-text-muted mt-0.5">${bt.desc.slice(0,30)}…</p>`}
    </div>`;
  }).join('');

  document.getElementById('profilePage').classList.remove('hidden');
}

function closeProfile() {
  document.getElementById('profilePage').classList.add('hidden');
}

/* ═══════════════ PROFILE DROPDOWN ═══════════════ */

function toggleProfileDropdown() {
  const dd = document.getElementById('profileDropdown');
  dd.classList.toggle('hidden');
}

function closeProfileDropdown() {
  document.getElementById('profileDropdown').classList.add('hidden');
}

document.addEventListener('click', (e) => {
  const dd = document.getElementById('profileDropdown');
  if (dd && !dd.classList.contains('hidden') && !e.target.closest('[aria-haspopup]') && !e.target.closest('#profileDropdown')) {
    closeProfileDropdown();
  }
});

/* ═══════════════ MODALS ═══════════════ */

function openTicketModal()  { document.getElementById('ticketModal').classList.remove('hidden'); }

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    ['ticketModal','addUserModal','createOfferModal','awardBadgeModal'].forEach(id => {
      document.getElementById(id)?.classList.add('hidden');
    });
    // Close student detail page → home
    const sdp = document.getElementById('studentDetailPage');
    if (sdp && !sdp.classList.contains('hidden')) {
      sdp.classList.add('hidden');
      closeDrawer();
      setTimeout(() => switchTab('tab1'), 50);
      return;
    }
    // Close drawer → home
    const drawer = document.getElementById('rightDrawer');
    if (drawer && !drawer.classList.contains('hidden')) {
      closeDrawerAndGoHome();
    }
  }
});

['ticketModal','addUserModal','createOfferModal','awardBadgeModal'].forEach(id => {
  document.addEventListener('click', (e) => {
    const el = document.getElementById(id);
    if (el && !el.classList.contains('hidden') && e.target === el) el.classList.add('hidden');
  });
});

function handleTicketScreenshot(input) {
  const nameEl = document.getElementById('ticketScreenshotName');
  if (input.files && input.files[0]) {
    nameEl.textContent = '✓ ' + input.files[0].name;
    nameEl.classList.add('text-accent');
  }
}

function submitTicket() {
  const cat  = document.getElementById('ticketCategory').value;
  const desc = document.getElementById('ticketDesc').value.trim();
  if (!cat)  { showToast('Please select a ticket type.', 'error'); return; }
  if (!desc) { showToast('Please describe your issue.', 'error'); return; }

  // Add to counsellor tickets if counsellor role
  const today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
  const newTicket = {
    id: 'TKT-' + String(COUNSELLOR_TICKETS.length + 1).padStart(3, '0'),
    dateRaised: today,
    category: cat,
    status: 'Open',
    description: desc,
    update: 'Your ticket has been received. Our ops team will respond within 4 working hours.',
  };
  COUNSELLOR_TICKETS.push(newTicket);

  showToast('Ticket raised! Ops team will respond within 4 working hours.', 'success');
  closeModal('ticketModal');

  // Reset form
  document.getElementById('ticketCategory').value = '';
  document.getElementById('ticketDesc').value = '';
  document.getElementById('ticketScreenshot').value = '';
  document.getElementById('ticketScreenshotName').textContent = 'Click to upload or drag & drop';
  document.getElementById('ticketScreenshotName').classList.remove('text-accent');

  // Refresh ticket summary if visible
  renderCounsellorTicketSummary();
}

/* ═══════════════ TOAST ═══════════════ */

function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="flex-1">${msg}</span>
    <button onclick="this.parentElement.remove()" class="ml-2 opacity-70 hover:opacity-100 cursor-pointer font-bold text-lg leading-none">×</button>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ═══════════════ LOGOUT ═══════════════ */

/* ═══════════════ BOT ═══════════════ */

function toggleBot() {
  state.botOpen = !state.botOpen;
  const panel = document.getElementById('botPanel');
  if (state.botOpen) {
    panel.classList.remove('hidden');
    void panel.offsetWidth; // force reflow so CSS transition fires correctly (fixes Vercel)
    panel.classList.add('open');
    // Reset unread badge
    state.chatPanel.unreadCount = 0;
    state.chatPanel.lastOpenedAt = Date.now();
    updateUnreadBadge();
    // Restore history on open
    if (state.botActiveTab === 'chat') {
      if (state.botConversation.history.length > 0) renderChatHistory();
      document.getElementById('botInput').focus();
    } else {
      renderActionItems();
    }
  } else {
    panel.classList.remove('open');
    setTimeout(() => panel.classList.add('hidden'), 250);
    cancelClearChat();
  }
}

function updateUnreadBadge() {
  const badge = document.getElementById('botUnreadBadge');
  if (!badge) return;
  const count = state.chatPanel.unreadCount;
  if (count > 0) {
    badge.textContent = count > 9 ? '9+' : String(count);
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.botOpen) toggleBot();
});

function sendBotMessage() {
  const input = document.getElementById('botInput');
  const msg   = input.value.trim();
  if (!msg) return;
  input.value = '';

  appendUserMessage(msg);
  appendTypingIndicator();
  const delay = state.botConversation.flow ? 400 : 800;
  setTimeout(() => {
    removeTypingIndicator();
    handleBotMessage(msg);
  }, delay);
}

function appendUserMessage(msg) {
  const container = document.getElementById('botMessages');
  const div = document.createElement('div');
  div.className = 'flex justify-end';
  div.innerHTML = `<div class="user-msg-bubble">${escHtml(msg)}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById('botMessages');
  const div = document.createElement('div');
  div.className = 'flex gap-2';
  div.id = 'botTyping';
  div.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <div id="botTypingContent" class="bot-typing"><span></span><span></span><span></span></div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  // 5s fallback
  state._typingTimer5 = setTimeout(() => {
    const el = document.getElementById('botTypingContent');
    if (el) { el.className = 'bot-msg-bubble text-xs text-text-muted py-2 px-3'; el.innerHTML = 'Still thinking…'; }
  }, 5000);
}

function removeTypingIndicator() {
  clearTimeout(state._typingTimer5);
  document.getElementById('botTyping')?.remove();
}

function classifyIntent(msg) {
  const lower = msg.toLowerCase();
  // Find the BEST match = longest keyword that appears in the message
  // This ensures specific phrases (e.g. "incentive calculation") win over generic ones ("incentive")
  let bestIntent = 'fallback';
  let bestKeywordLen = 0;

  for (const [intent, data] of Object.entries(BOT_INTENT_MAP)) {
    if (intent === 'fallback') continue;
    for (const kw of data.keywords) {
      if (lower.includes(kw) && kw.length > bestKeywordLen) {
        bestIntent = intent;
        bestKeywordLen = kw.length;
      }
    }
  }

  let entity = '';
  if (bestIntent === 'college_info') {
    for (const uni of INFO_HUB_DATA) {
      const words = uni.name.toLowerCase().split(' ');
      if (words.some(w => w.length > 4 && lower.includes(w))) { entity = uni.name; break; }
    }
  }
  return { intent: bestIntent, entity };
}

function renderBotResponse(intent, entity) {
  const container = document.getElementById('botMessages');
  const data = BOT_INTENT_MAP[intent] || BOT_INTENT_MAP.fallback;

  let answerHtml = '';

  // Special: contact_business_head
  if (intent === 'contact_business_head') {
    const bh = BOT_SETTINGS.businessHead;
    answerHtml = `📞 **Contact Business Head:**\n\n**${bh.name}**\n${bh.designation}\n📱 ${bh.contact}`;
  }
  // Special: my_targets — show today's targets dynamically
  else if (intent === 'my_targets') {
    const c = getCounselorData();
    answerHtml = `🎯 **Your targets for today:**\n\n• STIs: ${c.stis} / ${TARGETS.stis} (${Math.round(c.stis/TARGETS.stis*100)}%)\n• Applications: ${c.applications} / ${TARGETS.applications} (${Math.round(c.applications/TARGETS.applications*100)}%)\n• Deposits: ${c.deposits} / ${TARGETS.deposits} (${Math.round(c.deposits/TARGETS.deposits*100)}%)\n• Lock-ins: ${c.lockins} / ${TARGETS.lockins} (${Math.round(c.lockins/TARGETS.lockins*100)}%)\n• Calls: ${c.calls} / ${TARGETS.calls} (${Math.round(c.calls/TARGETS.calls*100)}%)\n• Revenue: ₹${(c.revenue/1000).toFixed(0)}K / ₹${(TARGETS.revenue/1000).toFixed(0)}K\n\nHead to the dashboard to see the full picture!`;
  }
  // Special: who_to_call — show students by urgency
  else if (intent === 'who_to_call') {
    const students = getViewingStudents();
    const today = new Date('2026-05-31');
    const overdue = students.filter(s => s.followup && new Date(s.followup) < today).slice(0, 3);
    const dueToday = students.filter(s => s.followup === '2026-05-31').slice(0, 3);
    const priority = [...overdue, ...dueToday].slice(0, 4);
    if (priority.length) {
      const lines = priority.map(s => `• **${s.name}** (${s.stage}) — Follow-up: ${s.followup}`).join('\n');
      answerHtml = `📞 **Priority students to call today:**\n\n${lines}\n\nClick any student in the pipeline to open their profile and make notes.`;
    } else {
      answerHtml = `📞 No overdue follow-ups right now — you're on top of it! Check the pipeline for students whose follow-up is coming up soon.`;
    }
  }
  // Special: my_performance_today — live snapshot
  else if (intent === 'my_performance_today') {
    const c = getCounselorData();
    const emo = (a, t) => a >= t ? '🟢' : a >= t * 0.6 ? '🟡' : '🔴';
    answerHtml = `📊 **Your performance today:**\n\n${emo(c.calls,TARGETS.calls)} Calls: ${c.calls}/${TARGETS.calls}\n${emo(c.stis,TARGETS.stis)} STIs: ${c.stis}/${TARGETS.stis}\n${emo(c.applications,TARGETS.applications)} Applications: ${c.applications}/${TARGETS.applications}\n${emo(c.deposits,TARGETS.deposits)} Deposits: ${c.deposits}/${TARGETS.deposits}\n${emo(c.lockins,TARGETS.lockins)} Lock-ins: ${c.lockins}/${TARGETS.lockins}\n${emo(c.revenue,TARGETS.revenue)} Revenue: ₹${(c.revenue/1000).toFixed(0)}K / ₹${(TARGETS.revenue_target/1000).toFixed(0)}K\n\n🟢 = On target  🟡 = Getting there  🔴 = Needs focus`;
  }
  // Special: college_info
  else if (intent === 'college_info') {
    const uni = entity ? INFO_HUB_DATA.find(u => u.name.toLowerCase().includes(entity.toLowerCase().split(' ')[0])) : null;
    if (uni) {
      answerHtml = `🎓 Found **${uni.name}** in the Info Hub!`;
    } else {
      answerHtml = `I couldn't find that university in the Info Hub. Try browsing the directory directly.`;
    }
  } else {
    answerHtml = data.answer || '';
  }

  const msgDiv = document.createElement('div');
  msgDiv.className = 'flex gap-2';

  // Format markdown-like text
  const formatted = answerHtml.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

  let extraHtml = '';

  // College card inline
  if (intent === 'college_info') {
    const uni = entity ? INFO_HUB_DATA.find(u => u.name.toLowerCase().includes(entity.toLowerCase().split(' ')[0])) : null;
    if (uni) {
      const urgent = daysUntil(uni.depositDeadline) <= 14;
      extraHtml += `<div class="bot-college-card">
        <p class="font-bold text-xs text-text-main">${uni.name}</p>
        <p class="text-text-muted">${uni.flag} ${uni.country} · ${uni.city}</p>
        <p class="text-xs mt-1">💰 Deposit: <strong>₹${(uni.depositInr/1000).toFixed(0)}K</strong>${urgent ? `<span class="deposit-urgent ml-2">Due: ${uni.depositDeadline}</span>` : ''}</p>
        <p class="text-xs">📅 Intake: ${uni.intake.join(' · ')}</p>
        ${uni.scholarship ? `<p class="text-xs text-success mt-1">🎓 ${uni.scholarship.name}</p>` : ''}
        <button onclick="openUniversityDetail('${uni.id}')" class="mt-2 text-xs font-semibold text-accent hover:underline cursor-pointer">See Full Profile →</button>
      </div>`;
    }
  }

  // Auto-navigate for view_leaderboard — no button needed, just go there
  if (intent === 'view_leaderboard' && data.navAction) {
    setTimeout(() => data.navAction(), 800);
  }

  // Navigation confirm button (for all other intents with navAction)
  if (data.navLabel && data.navAction && intent !== 'view_leaderboard') {
    extraHtml += `<button class="bot-nav-btn" onclick="confirmBotNav('${intent}')">
      ${data.navLabel}
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </button>`;
  }

  msgDiv.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <div class="bot-msg-bubble flex-1">
      <p>${formatted}</p>
      ${extraHtml}
    </div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
  // Save to history (text only)
  addToHistory('bot', answerHtml || '');
}

function confirmBotNav(intent) {
  const data = BOT_INTENT_MAP[intent];
  if (data && data.navAction) data.navAction();
  showToast('Navigating…', 'info');
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ═══════════════════════════════════════════════════════
   BOT V3 — CONVERSATION ENGINE
═══════════════════════════════════════════════════════ */

const FLOW_INTENTS = ['greeting', 'start_my_day', 'connect_business_team', 'clarify_before_answering', 'need_help', 'top_performer', 'incentive_clarify', 'training_help', 'live_offers_query', 'earn_more_guide', 'target_today_guide', 'who_to_call_guide'];
const CANCEL_PHRASES = ['cancel', 'stop', 'nevermind', 'never mind'];

const FOLLOW_UP_CONFIG = {
  boost_sti:       { msg: 'Want me to show you which students need STI first?',           yesNav: () => { switchTab('tab1'); setTimeout(() => openBoostDrawer('sti'), 300); } },
  boost_deposit:   { msg: 'Shall I highlight students whose deposit deadline is closest?', yesNav: () => { switchTab('tab1'); setTimeout(() => openBoostDrawer('deposit'), 300); } },
  boost_lockin:    { msg: 'Want tips on what works best to close lock-ins?',              yesText: "3 proven lock-in tactics:\n\n1. **Share the offer letter early** — congratulate them and create excitement\n2. **Break down the payment** — 'Just ₹5,000 now secures your seat' lowers the barrier\n3. **Set a 48-hour deadline** — maintains urgency without pressure" },
  incentive_slabs: { msg: 'Want to see how close you are to the next slab right now?',   yesNav: () => switchTab('tab2') },
  read_metrics:    { msg: 'Which metric do you want to improve most? I can take you there.', needsInput: true },
};

const CLARIFY_QUESTIONS_MAP = {
  'help me':         "Sure! What do you need help with? (e.g. tasks, metrics, earnings, training, or connecting with someone)",
  "im stuck":        "What are you stuck on? Tell me a bit more and I'll point you in the right direction.",
  "i'm stuck":       "What are you stuck on? Tell me a bit more and I'll point you in the right direction.",
  'something wrong': "What's the issue? Is it with your metrics, a student, the system, or something else?",
  'i need help':     "Of course! What specifically do you need help with?",
};

/* ── History ── */

function addToHistory(role, text) {
  state.botConversation.history.push({ role, text, timestamp: new Date().toISOString() });
  saveHistory();
}

function saveHistory() {
  if (!state.currentUser) return;
  try {
    const key = `bot_history_${state.currentUser.id}`;
    localStorage.setItem(key, JSON.stringify(state.botConversation.history.slice(-30)));
  } catch (e) {
    try {
      state.botConversation.history = state.botConversation.history.slice(-15);
      localStorage.setItem(`bot_history_${state.currentUser.id}`, JSON.stringify(state.botConversation.history));
    } catch (e2) { /* silent */ }
  }
}

function restoreHistory() {
  if (!state.currentUser) return;
  const saved = localStorage.getItem(`bot_history_${state.currentUser.id}`);
  if (saved) {
    try { state.botConversation.history = JSON.parse(saved); } catch (e) { /* noop */ }
  }
}

function renderChatHistory() {
  const hist = state.botConversation.history;
  if (!hist.length) return;
  const container = document.getElementById('botMessages');
  container.innerHTML = '';
  let lastDateStr = null;
  hist.forEach(msg => {
    const date = new Date(msg.timestamp);
    const dateStr = formatDateSep(date);
    if (dateStr !== lastDateStr) {
      lastDateStr = dateStr;
      const sep = document.createElement('div');
      sep.className = 'bot-date-sep';
      sep.innerHTML = `<span>${escHtml(dateStr)}</span>`;
      container.appendChild(sep);
    }
    if (msg.role === 'user') {
      const d = document.createElement('div');
      d.className = 'flex justify-end';
      d.innerHTML = `<div class="user-msg-bubble">${escHtml(msg.text)}</div>`;
      container.appendChild(d);
    } else {
      const d = document.createElement('div');
      d.className = 'flex gap-2';
      d.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div class="bot-msg-bubble"><p>${formatBotText(msg.text)}</p></div>
      `;
      container.appendChild(d);
    }
  });
  container.scrollTop = container.scrollHeight;
}

function formatDateSep(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (d.getTime() === today.getTime()) return 'Today';
  if (d.getTime() === yesterday.getTime()) return 'Yesterday';
  return date.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' });
}

function formatBotText(text) {
  return escHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}

/* ── Clear Chat ── */

function showClearChatConfirm() {
  document.getElementById('botClearConfirm').classList.remove('hidden');
  document.getElementById('botClearBtn').classList.add('hidden');
}

function cancelClearChat() {
  const el = document.getElementById('botClearConfirm');
  if (el) el.classList.add('hidden');
  const btn = document.getElementById('botClearBtn');
  if (btn) btn.classList.remove('hidden');
}

function clearChatHistory() {
  state.botConversation = { flow:null, step:0, collected:{}, history:[], lastIntent:null, shownFollowUps:[] };
  if (state.currentUser) localStorage.removeItem(`bot_history_${state.currentUser.id}`);
  document.getElementById('botMessages').innerHTML = `
    <div class="flex gap-2">
      <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <div class="bot-msg-bubble">
        <p class="text-sm">Hi! I'm your Leap CRM assistant. Ask me about your tasks, metrics, incentives, or any university in the Info Hub. 👋</p>
      </div>
    </div>
  `;
  cancelClearChat();
  showToast('Chat history cleared.', 'info');
}

/* ── Flow Engine ── */

function handleBotMessage(userText) {
  const bc = state.botConversation;
  addToHistory('user', userText);

  if (bc.flow) {
    const lower = userText.toLowerCase().trim();
    if (CANCEL_PHRASES.some(p => lower.includes(p))) {
      endFlow();
      const msg = "No problem, I've cancelled that. What else can I help with?";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      return;
    }
    handleFlowStep(userText);
    return;
  }

  const { intent, entity } = classifyIntent(userText);
  bc.lastIntent = intent;

  if (FLOW_INTENTS.includes(intent)) {
    startFlow(intent, userText);
  } else if (intent === 'fallback') {
    // Unknown intent → route through clarify flow before showing fallback
    startFlow('clarify_before_answering', userText);
  } else {
    renderBotResponse(intent, entity);
    maybeAddFollowUp(intent);
  }
}

function startFlow(intent, userText) {
  const bc = state.botConversation;
  bc.flow = intent;
  bc.step = 0;
  bc.collected = {};
  removeTypingIndicator();
  if (intent === 'greeting')               handleGreetingStep(null);
  else if (intent === 'start_my_day')      handleStartMyDayStep(null);
  else if (intent === 'connect_business_team') handleConnectBusinessTeamStep(null);
  else if (intent === 'need_help')         handleNeedHelpStep(null);
  else if (intent === 'top_performer')     handleTopPerformerStep(null);
  else if (intent === 'incentive_clarify') handleIncentiveClarifyStep(null);
  else if (intent === 'training_help')     handleTrainingStep(null);
  else if (intent === 'live_offers_query') handleLiveOffersQueryStep(null);
  else if (intent === 'earn_more_guide')   handleEarnMoreStep(null);
  else if (intent === 'target_today_guide') handleTargetTodayGuideStep(null);
  else if (intent === 'who_to_call_guide') handleWhoToCallGuideStep(null);
  else if (intent === 'clarify_before_answering') {
    bc.collected.originalMessage = userText;
    handleClarifyStep(null);
  }
}

function handleFlowStep(userText) {
  removeTypingIndicator();
  const flow = state.botConversation.flow;
  if (flow === 'greeting')                  handleGreetingStep(userText);
  else if (flow === 'start_my_day')         handleStartMyDayStep(userText);
  else if (flow === 'connect_business_team') handleConnectBusinessTeamStep(userText);
  else if (flow === 'need_help')            handleNeedHelpStep(userText);
  else if (flow === 'top_performer')        handleTopPerformerStep(userText);
  else if (flow === 'incentive_clarify')    handleIncentiveClarifyStep(userText);
  else if (flow === 'training_help')        handleTrainingStep(userText);
  else if (flow === 'live_offers_query')    handleLiveOffersQueryStep(userText);
  else if (flow === 'earn_more_guide')      handleEarnMoreStep(userText);
  else if (flow === 'target_today_guide')   handleTargetTodayGuideStep(userText);
  else if (flow === 'who_to_call_guide')    handleWhoToCallGuideStep(userText);
  else if (flow === 'clarify_before_answering') handleClarifyStep(userText);
}

function endFlow() {
  state.botConversation.flow = null;
  state.botConversation.step = 0;
  state.botConversation.collected = {};
}

/* ── Flow 1: start_my_day ── */

function handleStartMyDayStep(userText) {
  const bc = state.botConversation;
  const firstName = (state.currentUser?.name || 'there').split(' ')[0];

  if (bc.step === 0) {
    const c = getCounselorData();
    const today = new Date();

    // Metrics report card
    const metrics = [
      { label:'STIs',         actual:c.stis,         target:TARGETS.stis,         navType:'sti'         },
      { label:'Deposits',     actual:c.deposits,     target:TARGETS.deposits,     navType:'deposit'     },
      { label:'Applications', actual:c.applications, target:TARGETS.applications, navType:'application' },
      { label:'Lock-ins',     actual:c.lockins,      target:TARGETS.lockins,      navType:'lockin'      },
    ];
    metrics.forEach(m => { m.pct = Math.round((m.actual / m.target) * 100); });
    metrics.sort((a, b) => a.pct - b.pct); // weakest first
    const weakest = metrics[0];

    const emo = p => p >= 100 ? '🟢' : p >= 60 ? '🟡' : '🔴';
    const reportLines = metrics.map(m => `${emo(m.pct)} **${m.label}:** ${m.actual}/${m.target} (${m.pct}%)`).join('\n');

    // Priority students: overdue follow-ups + high-value stage
    const stagePriority = { lockin:4, deposit:3, application:2, sti:1 };
    const priorityStudents = getViewingStudents()
      .filter(s => s.stage !== 'joined')
      .map(s => {
        const fDate = s.followup ? new Date(s.followup) : null;
        const daysOverdue = fDate ? Math.floor((today - fDate) / 86400000) : -99;
        return { ...s, daysOverdue, stagePri: stagePriority[s.stage] || 0 };
      })
      .sort((a, b) => {
        if (a.daysOverdue > 0 && b.daysOverdue <= 0) return -1;
        if (b.daysOverdue > 0 && a.daysOverdue <= 0) return 1;
        if (a.daysOverdue > 0 && b.daysOverdue > 0) return b.daysOverdue - a.daysOverdue;
        return b.stagePri - a.stagePri;
      });

    const top1 = priorityStudents[0];
    const top2 = priorityStudents[1];

    let actionLines = [];
    if (top1) {
      const od1 = top1.daysOverdue > 0 ? ` _(${top1.daysOverdue}d overdue)_` : '';
      actionLines.push(`📞 **Call ${top1.name}** — ${top1.stage.toUpperCase()} · ${top1.course}${od1}`);
    }
    if (top2) {
      const od2 = top2.daysOverdue > 0 ? ` _(${top2.daysOverdue}d overdue)_` : '';
      actionLines.push(`📋 **Follow up with ${top2.name}** — ${top2.stage.toUpperCase()} · ${top2.course}${od2}`);
    }
    actionLines.push(`🎯 **Boost ${weakest.label}** — at ${weakest.pct}% of target, needs focus today`);

    const msgText = `Good morning, ${firstName}! Here's your day plan 📋\n\n**Yesterday's Report Card:**\n${reportLines}\n\n**Top Actions for Today:**\n${actionLines.join('\n')}\n\nWhere do you want to start?`;

    bc.collected.top1Id   = top1?.id;
    bc.collected.top1Name = top1?.name;
    bc.collected.top2Id   = top2?.id;
    bc.collected.top2Name = top2?.name;
    bc.collected.urgentNavType  = weakest.navType;
    bc.collected.urgentLabel    = weakest.label;
    bc.step = 1;

    appendBotMessageLive(`<p>${formatBotText(msgText)}</p>`);
    addToHistory('bot', msgText);

    const qrs = [];
    if (top1) qrs.push(`📞 Call ${top1.name}`);
    if (top2) qrs.push(`📋 Follow up ${top2.name}`);
    qrs.push(`🎯 Boost ${weakest.label}`);
    qrs.push(`📑 Open Task List`);
    appendQuickReplies(qrs);

  } else if (bc.step === 1) {
    const lower = (userText || '').toLowerCase();
    const top1Id   = bc.collected.top1Id;
    const top1Name = bc.collected.top1Name || '';
    const top2Id   = bc.collected.top2Id;
    const top2Name = bc.collected.top2Name || '';
    const navType  = bc.collected.urgentNavType;
    const navLabel = bc.collected.urgentLabel;

    if (top1Id && (lower.includes('call') || lower.includes(top1Name.toLowerCase()))) {
      const msg = `Taking you to ${top1Name}'s profile. Make it count! 💪`;
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => { switchTab('tab1'); setTimeout(() => openStudentDetail(top1Id), 350); }, 300);
    } else if (top2Id && (lower.includes('follow') || lower.includes(top2Name.toLowerCase()))) {
      const msg = `Opening ${top2Name}'s profile. Good luck! 💪`;
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => { switchTab('tab1'); setTimeout(() => openStudentDetail(top2Id), 350); }, 300);
    } else if (lower.includes('task')) {
      const msg = "Here's your full task list — let's clear those to-dos! ✅";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => { switchTab('tab1'); setTimeout(() => openOwnTaskDrawer(), 350); }, 300);
    } else {
      const msg = `Heading to **Boost ${navLabel}** — ${getViewingStudents().filter(s => s.stage === navType).length} students waiting. Go get it! 🎯`;
      appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => { switchTab('tab1'); setTimeout(() => openBoostDrawer(navType), 350); }, 300);
    }
    endFlow();
  }
}

/* ── Flow 2: connect_business_team ── */

function handleConnectBusinessTeamStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const msg = "Sure! Before I pass this on — what's the reason you'd like to connect?\n(e.g. training query, process issue, product feedback, escalation)";
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg);
    appendQuickReplies(['Training Query', 'Process Issue', 'Product Feedback', 'Other']);

  } else if (bc.step === 1) {
    bc.collected.purpose = userText;
    bc.step = 2;
    const msg = `Got it — **${userText}**. What's a good time for the business team to reach out to you?`;
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g, ''));
    appendQuickReplies(['This morning', 'This afternoon', 'Tomorrow morning', 'Anytime this week']);

  } else if (bc.step === 2) {
    bc.collected.preferredTime = userText;
    const purpose = bc.collected.purpose.slice(0, 200);
    const time = bc.collected.preferredTime;
    const name = state.currentUser?.name || 'Counselor';

    const msg = `Perfect. I've passed this on to the business team:\n📋 **Purpose:** ${purpose}\n🕐 **Preferred time:** ${time}\n📛 **Your name:** ${name}\n\nThey'll reach out to you. Is there anything else I can help with?`;
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g, ''));
    createBotTicket(purpose, time);
    endFlow();
  }
}

/* ── Flow 3: clarify_before_answering ── */

function handleClarifyStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const original = (bc.collected.originalMessage || '').toLowerCase();
    let question = "Could you tell me a bit more about what you need help with?";
    for (const [trigger, q] of Object.entries(CLARIFY_QUESTIONS_MAP)) {
      if (original.includes(trigger)) { question = q; break; }
    }
    appendBotMessageLive(`<p>${escHtml(question)}</p>`);
    addToHistory('bot', question);

  } else if (bc.step === 1) {
    const combined = (bc.collected.originalMessage || '') + ' ' + userText;
    const { intent, entity } = classifyIntent(combined);
    endFlow();

    if (intent === 'fallback' || intent === 'clarify_before_answering') {
      const msg = "I still couldn't quite get that — here's how you can get help:";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      renderBotResponse('fallback', '');
    } else if (FLOW_INTENTS.includes(intent) && intent !== 'clarify_before_answering') {
      // Flow intent matched — start that flow properly instead of calling renderBotResponse
      startFlow(intent, combined);
    } else {
      renderBotResponse(intent, entity);
      maybeAddFollowUp(intent);
    }
  }
}

/* ── Helper: post-help quick replies ── */
function showPostHelpQuickReplies() {
  setTimeout(() => appendQuickReplies([
    'How to Start my Day',
    'Training / I want to Learn',
    'Top Performer in Org',
    'Top Performer in Cluster',
    'Target for Today',
    'Who Should I Call Today',
    'Live Offers Running?',
    'Incentive Details',
    'How Can I Earn More',
  ]), 400);
}

/* ── Flow 0: greeting ── */
function handleGreetingStep(userText) {
  const bc = state.botConversation;
  const firstName = (state.currentUser?.name || 'there').split(' ')[0];

  if (bc.step === 0) {
    bc.step = 1;
    const msg = `Hello ${firstName}! 👋 How are you doing today?`;
    appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
    addToHistory('bot', msg);

  } else if (bc.step === 1) {
    const lower = (userText || '').toLowerCase();
    endFlow();

    // Check negative FIRST — "not good" contains "good" at word boundary so must not match positive
    const isNegative = /\b(not good|not well|not great|not ok|not okay|bad|sad|tired|stressed|upset|down|struggling|rough|tough|horrible|terrible|nahi|bura|thaka|tension|feeling low|not feeling|exhausted|overwhelmed)\b/.test(lower);
    const isPositive = !isNegative && /\b(good|great|well|fine|amazing|awesome|fantastic|excellent|wonderful|happy|perfect|nice|okay|ok|not bad|alright|doing well|doing good|sahi|badhiya|mast|accha)\b/.test(lower);

    if (isNegative) {
      const msg = `Oops! Sorry to hear that, ${firstName} 😔 How can I help?`;
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
    } else if (isPositive) {
      const msg = `Great to hear that, ${firstName}! 😊 Please tell me — how can I help you today?`;
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
    } else {
      const msg = `Got it, ${firstName}! 😊 How can I help you today?`;
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
    }
    showPostHelpQuickReplies();
  }
}

/* ── Flow: training_help ── */
function handleTrainingStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const msg = 'Sure! What type of training are you looking for?';
    appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
    addToHistory('bot', msg);
    appendQuickReplies(['Domain Training', 'Soft Skills', 'Objection Handling', 'System Training']);

  } else if (bc.step === 1) {
    endFlow();
    const lower = (userText || '').toLowerCase();
    let label = userText;
    if (lower.includes('domain'))    label = 'Domain Training';
    if (lower.includes('soft'))      label = 'Soft Skills';
    if (lower.includes('objection')) label = 'Objection Handling';
    if (lower.includes('system'))    label = 'System Training';

    const msg = `Got it! Taking you to the **${label}** modules in the Learning & Development tab 📚`;
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    setTimeout(() => {
      switchTab('tab3');
      setTimeout(() => {
        const el = document.getElementById('trainingModulesLD') || document.getElementById('trainingModules');
        const mc = document.getElementById('mainContent');
        if (el && mc) mc.scrollTo({ top: el.getBoundingClientRect().top + mc.scrollTop - 80, behavior: 'smooth' });
      }, 400);
    }, 700);
  }
}

/* ── Flow: live_offers_query ── */
function handleLiveOffersQueryStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const msg = 'Are you looking for offers for your **Students** or offers **For You** (Counsellor)?';
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    appendQuickReplies(['Offers for Students', 'Offers for Me (Counsellor)']);

  } else if (bc.step === 1) {
    endFlow();
    const lower = (userText || '').toLowerCase();
    const forCounsellor = lower.includes('me') || lower.includes('counsellor') || lower.includes('counselor') || lower.includes('for me');
    const msg = forCounsellor
      ? '🎁 Taking you to the **Live for Counsellors** section!'
      : '🎁 Taking you to the **Live Offers for Students** section!';
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    setTimeout(() => {
      switchTab('tab2');
      setTimeout(() => {
        const elId = forCounsellor ? 'counsellorOffersRow' : 'offersRow';
        const el = document.getElementById(elId);
        const mc = document.getElementById('mainContent');
        if (el && mc) mc.scrollTo({ top: el.getBoundingClientRect().top + mc.scrollTop - 80, behavior: 'smooth' });
      }, 400);
    }, 700);
  }
}

/* ── Flow: earn_more_guide ── */
function handleEarnMoreStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const msg = '💰 Great question! The fastest way to earn more is to open your **Opportunity Pipeline** — it shows exactly which students are ready to convert.\n\nShould I take you to the Opportunity Pipeline now?';
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    appendQuickReplies(['Yes, take me there!', 'No, tell me more']);

  } else if (bc.step === 1) {
    endFlow();
    const lower = (userText || '').toLowerCase();
    if (lower.includes('yes') || lower.includes('take') || lower.includes('there')) {
      const msg = '📊 Opening the Opportunity Pipeline for you!';
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => { switchTab('tab2'); setTimeout(() => openOpportunityDrawer(), 500); }, 700);
    } else {
      const msg = '📌 **3 ways to earn more right now:**\n\n• 🎯 Convert students with pending deposits — check **Boost Deposit** on your dashboard\n• 💡 Check **Live for Counsellors** offers in the Incentives tab for active performance sprints\n• 📞 Call students in your deferral list — they already have admits!';
      appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
      addToHistory('bot', msg.replace(/\*\*/g,''));
      showPostHelpQuickReplies();
    }
  }
}

/* ── Flow: target_today_guide ── */
function handleTargetTodayGuideStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const c = getCounselorData();
    const msg = `🎯 **Your targets for today:**\n\n• STIs: ${c.stis}/${TARGETS.stis} · Applications: ${c.applications}/${TARGETS.applications}\n• Deposits: ${c.deposits}/${TARGETS.deposits} · Lock-ins: ${c.lockins}/${TARGETS.lockins}\n• Calls: ${c.calls}/${TARGETS.calls}\n\nShould I take you to the **Action Required — Boost Tasks** section?`;
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    appendQuickReplies(['Yes, take me there!', 'No thanks']);

  } else if (bc.step === 1) {
    endFlow();
    const lower = (userText || '').toLowerCase();
    if (lower.includes('yes') || lower.includes('take') || lower.includes('there')) {
      const msg = '📋 Taking you to Action Required — Boost Tasks!';
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => {
        switchTab('tab1');
        setTimeout(() => {
          const el = document.getElementById('boostCardsGrid');
          const mc = document.getElementById('mainContent');
          if (el && mc) mc.scrollTo({ top: el.getBoundingClientRect().top + mc.scrollTop - 80, behavior: 'smooth' });
        }, 400);
      }, 600);
    } else {
      const msg = '👍 No problem! Your dashboard is always the best place to start — just look at the **Action Required** cards at the top for today\'s priorities.';
      appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
      addToHistory('bot', msg.replace(/\*\*/g,''));
    }
  }
}

/* ── Flow: who_to_call_guide ── */
function handleWhoToCallGuideStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const students = getViewingStudents();
    const today = new Date('2026-05-31');
    const overdue = students.filter(s => s.followup && new Date(s.followup) < today).slice(0,3);
    const lines = overdue.length
      ? overdue.map(s => `• **${s.name}** (${s.stage}) — overdue since ${s.followup}`).join('\n')
      : '• No overdue follow-ups — you\'re all caught up! ✅';
    const msg = `📞 **Priority students to call today:**\n\n${lines}\n\nShould I take you to **Action Required — Boost Tasks** for the full list?`;
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    appendQuickReplies(['Yes, take me there!', 'No thanks']);

  } else if (bc.step === 1) {
    endFlow();
    const lower = (userText || '').toLowerCase();
    if (lower.includes('yes') || lower.includes('take') || lower.includes('there')) {
      const msg = '📋 Taking you to Action Required — Boost Tasks!';
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => {
        switchTab('tab1');
        setTimeout(() => {
          const el = document.getElementById('boostCardsGrid');
          const mc = document.getElementById('mainContent');
          if (el && mc) mc.scrollTo({ top: el.getBoundingClientRect().top + mc.scrollTop - 80, behavior: 'smooth' });
        }, 400);
      }, 600);
    } else {
      const msg = '👍 Got it! Your **Boost STI** and **Boost Deposit** cards on the dashboard show exactly who needs attention first.';
      appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
      addToHistory('bot', msg.replace(/\*\*/g,''));
    }
  }
}

/* ── Flow 4: need_help ── */

function handleNeedHelpStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const msg = "Of course! What kind of help do you need?\n\n• **Connect with Business Team** — for escalations, campaigns, or training queries\n• **Connect with your Manager** — to reach your Team Lead directly";
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    appendQuickReplies(['Connect with Business Team', 'Connect with my Manager', 'Something else']);

  } else if (bc.step === 1) {
    const lower = userText.toLowerCase();
    endFlow();

    if (lower.includes('business team') || lower.includes('business')) {
      // Hand off to the connect_business_team flow
      const msg = "Sure, let me connect you with the Business Team!";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => {
        bc.flow = 'connect_business_team';
        bc.step = 0;
        bc.collected = {};
        handleConnectBusinessTeamStep(null);
      }, 400);

    } else if (lower.includes('manager') || lower.includes('team lead') || lower.includes('tl')) {
      const u = state.currentUser;
      const tl = COUNSELORS.find(c => c.name === u?.manager) || TEAM_LEADS.find(t => t.name === u?.manager);
      const tlName = u?.manager || 'your Team Lead';
      const tlEmail = tl?.email || 'Check with Ops for contact details';
      const msg = `👤 **Your Manager: ${tlName}**\n\n📧 Email: ${tlEmail}\n\nYou can also message them directly in the **Chat in Internal Team** panel (the green bubble on the right).`;
      appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
      addToHistory('bot', msg.replace(/\*\*/g,''));

    } else {
      // Reroute to clarify
      const msg = "Got it! Can you tell me a bit more about what you need? I can help with metrics, students, incentives, training, or connecting with someone.";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      appendQuickReplies(['Metrics help', 'Student pipeline', 'Incentives', 'Training resources']);
    }
  }
}

/* ── Flow 5: top_performer ── */

function handleTopPerformerStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const msg = "Great question! Which metric are you asking about?";
    appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
    addToHistory('bot', msg);
    appendQuickReplies(['Calls', 'Revenue', 'Enrolments', 'STIs', 'Deposits', 'Lock-ins']);

  } else if (bc.step === 1) {
    const lower = userText.toLowerCase().trim();
    endFlow();

    // Map input to metric key
    const metricMap = {
      'calls':      { key:'calls',       label:'Calls',       target:TARGETS.calls },
      'call':       { key:'calls',       label:'Calls',       target:TARGETS.calls },
      'revenue':    { key:'revenue',     label:'Revenue',     target:TARGETS.revenue_target },
      'enrolment':  { key:'enrolments',  label:'Enrolments',  target:TARGETS.enrolments },
      'enrolments': { key:'enrolments',  label:'Enrolments',  target:TARGETS.enrolments },
      'sti':        { key:'stis',        label:'STIs',        target:TARGETS.stis },
      'stis':       { key:'stis',        label:'STIs',        target:TARGETS.stis },
      'deposit':    { key:'deposits',    label:'Deposits',    target:TARGETS.deposits },
      'deposits':   { key:'deposits',    label:'Deposits',    target:TARGETS.deposits },
      'lock':       { key:'lockins',     label:'Lock-ins',    target:TARGETS.lockins },
      'lock-in':    { key:'lockins',     label:'Lock-ins',    target:TARGETS.lockins },
      'lock-ins':   { key:'lockins',     label:'Lock-ins',    target:TARGETS.lockins },
      'lockins':    { key:'lockins',     label:'Lock-ins',    target:TARGETS.lockins },
    };

    let match = null;
    for (const [keyword, cfg] of Object.entries(metricMap)) {
      if (lower.includes(keyword)) { match = cfg; break; }
    }

    if (!match) {
      const msg = "I'm not sure which metric you meant. Please pick one:";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      appendQuickReplies(['Calls', 'Revenue', 'Enrolments', 'STIs', 'Deposits', 'Lock-ins']);
      bc.flow = 'top_performer'; bc.step = 1; // stay in flow
      return;
    }

    // Rank all counsellors
    const ranked = [...COUNSELORS].sort((a, b) => (b.today[match.key] || 0) - (a.today[match.key] || 0));
    const top3 = ranked.slice(0, 3);
    const medals = ['🥇', '🥈', '🥉'];
    const fmt = match.key === 'revenue'
      ? v => `₹${(v/1000).toFixed(0)}K`
      : v => v.toString();

    const lines = top3.map((c, i) => {
      const val = c.today[match.key] || 0;
      const pct = Math.round((val / match.target) * 100);
      return `${medals[i]} **${c.name}** — ${fmt(val)} (${pct}% of target)`;
    }).join('\n');

    const winner = top3[0];
    const winnerVal = winner.today[match.key] || 0;
    const msg = `📊 **Top performers for ${match.label}:**\n\n${lines}\n\n**${winner.name}** is leading the cluster with ${fmt(winnerVal)} ${match.key === 'revenue' ? 'in revenue' : match.label.toLowerCase() + ' this month'}. 🔥`;

    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    setTimeout(() => appendQuickReplies(['Who is top for Revenue?', 'Who is top for Calls?', 'Show me the leaderboard']), 600);
  }
}

/* ── Flow 6: incentive_clarify ── */

function handleIncentiveClarifyStep(userText) {
  const bc = state.botConversation;

  if (bc.step === 0) {
    bc.step = 1;
    const msg = "Let me take you to your **Incentives & Earnings** tab right now — you can see your full breakdown there!\n\nI'll wait here while you review it. Let me know if you still need help after.";
    appendBotMessageLive(`<p>${formatBotText(msg)}</p>`);
    addToHistory('bot', msg.replace(/\*\*/g,''));
    setTimeout(() => switchTab('tab2'), 500);
    setTimeout(() => {
      const q = "Did that help? Do you still need clarity on your incentive calculation?";
      appendBotMessageLive(`<p>${escHtml(q)}</p>`);
      addToHistory('bot', q);
      appendQuickReplies(['Yes, still need help', 'No, I got it! Thanks']);
    }, 2000);

  } else if (bc.step === 1) {
    const lower = userText.toLowerCase();
    if (lower.includes('yes') || lower.includes('still') || lower.includes('help') || lower.includes('need') || lower.includes('clarity') || lower.includes('nahi samjha')) {
      bc.step = 2;
      const msg = "No problem! The best way to get this sorted is to raise a ticket — our Ops team will walk you through your specific calculation.\n\nShall I open the ticket form for you?";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      appendQuickReplies(['Yes, open the ticket form', 'No thanks']);

    } else {
      endFlow();
      const msg = "Great! Glad that helped. Let me know if you have any other questions. 💪";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
    }

  } else if (bc.step === 2) {
    endFlow();
    const lower = userText.toLowerCase();
    if (lower.includes('yes') || lower.includes('open') || lower.includes('ticket') || lower.includes('form')) {
      const msg = "Opening the ticket form now! Describe your specific query and Ops will get back to you within 4 working hours.";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => { switchTab('tab3'); setTimeout(openTicketModal, 400); }, 300);
    } else {
      const msg = "No worries! If you need help later, just come back here and I'll point you in the right direction.";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
    }
  }
}

/* ── Follow-ups ── */

function maybeAddFollowUp(intent) {
  const bc = state.botConversation;
  const cfg = FOLLOW_UP_CONFIG[intent];
  if (!cfg || bc.shownFollowUps.includes(intent)) return;
  bc.shownFollowUps.push(intent);

  setTimeout(() => {
    const fuId = 'fu-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = fuId;
    msgDiv.className = 'flex gap-2';
    msgDiv.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-accent/60 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <div class="bot-followup-bubble flex-1">
        <p class="mb-2">${escHtml(cfg.msg)}</p>
        <div class="flex gap-2">
          <button onclick="handleFollowUpYes('${intent}','${fuId}')" class="bot-nav-btn-sm">Yes, show me</button>
          <button onclick="document.getElementById('${fuId}')?.remove()" class="bot-nav-btn-sm muted">No thanks</button>
        </div>
      </div>
    `;
    const container = document.getElementById('botMessages');
    if (container) { container.appendChild(msgDiv); container.scrollTop = container.scrollHeight; }
  }, 800);
}

function handleFollowUpYes(intent, fuId) {
  document.getElementById(fuId)?.remove();
  const cfg = FOLLOW_UP_CONFIG[intent];
  if (!cfg) return;
  if (cfg.yesText) {
    appendBotMessageLive(`<p>${formatBotText(cfg.yesText)}</p>`);
    addToHistory('bot', cfg.yesText);
  } else if (cfg.yesNav) {
    cfg.yesNav();
    showToast('Navigating…', 'info');
  }
}

/* ── Append Bot Message (live) ── */

function appendBotMessageLive(htmlContent, isFollowUp = false) {
  const container = document.getElementById('botMessages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'flex gap-2';
  msgDiv.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <div class="${isFollowUp ? 'bot-followup-bubble' : 'bot-msg-bubble'} flex-1">
      ${htmlContent}
    </div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
  return msgDiv;
}

/* ── Quick Replies ── */

function appendQuickReplies(buttons) {
  const container = document.getElementById('botMessages');
  const row = document.createElement('div');
  row.className = 'quick-reply-row';

  buttons.forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'quick-reply-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      row.querySelectorAll('button').forEach(b => { b.disabled = true; });
      row.remove();
      appendUserMessage(label);
      addToHistory('user', label);
      appendTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        if (state.botConversation.flow) {
          handleFlowStep(label);
        } else {
          // No active flow — route through intent classifier
          processBotInput(label);
        }
      }, 400);
    }, { once: true });
    row.appendChild(btn);
  });

  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
}

/* Route a message without re-adding user history (already added by quick reply handler) */
function processBotInput(userText) {
  const { intent, entity } = classifyIntent(userText);
  state.botConversation.lastIntent = intent;
  if (FLOW_INTENTS.includes(intent)) {
    startFlow(intent, userText);
  } else if (intent === 'fallback') {
    startFlow('clarify_before_answering', userText);
  } else {
    renderBotResponse(intent, entity);
    maybeAddFollowUp(intent);
  }
}

/* ── Create Bot Ticket ── */

function createBotTicket(purpose, preferredTime) {
  const name = state.currentUser?.name || 'Counselor';
  const catMap = { 'Training Query':'HR Query', 'Process Issue':'Process Question', 'Product Feedback':'Product Feedback' };
  let category = 'Other';
  for (const [k, v] of Object.entries(catMap)) {
    if (purpose.includes(k)) { category = v; break; }
  }
  SUPPORT_TICKETS.push({
    id: 'TKT-' + String(SUPPORT_TICKETS.length + 1).padStart(3, '0'),
    subject: `Business Team Connection Request — ${name}`,
    counselor: name,
    category,
    status: 'Open',
  });
  const tbody = document.getElementById('ticketsTableBody');
  if (tbody) renderTicketsTable();
}

/* ── Bot Settings Admin ── */
function saveBotSettings() {
  BOT_SETTINGS.businessHead.name        = document.getElementById('bhName').value.trim() || BOT_SETTINGS.businessHead.name;
  BOT_SETTINGS.businessHead.designation = document.getElementById('bhDesig').value.trim() || BOT_SETTINGS.businessHead.designation;
  BOT_SETTINGS.businessHead.contact     = document.getElementById('bhContact').value.trim() || BOT_SETTINGS.businessHead.contact;
  showToast('Bot settings saved!', 'success');
}

function toggleBotEnabled() {
  BOT_SETTINGS.enabled = !BOT_SETTINGS.enabled;
  const btn   = document.getElementById('botToggleBtn');
  const knob  = document.getElementById('botToggleKnob');
  const bubble = document.getElementById('botBubble');
  btn.style.background  = BOT_SETTINGS.enabled ? '' : '#94A3B8';
  knob.style.transform  = BOT_SETTINGS.enabled ? 'translateX(24px)' : 'translateX(4px)';
  bubble.classList.toggle('hidden', !BOT_SETTINGS.enabled);
  if (!BOT_SETTINGS.enabled && state.botOpen) toggleBot();
  showToast(`Bot ${BOT_SETTINGS.enabled ? 'enabled' : 'disabled'} for all users.`, BOT_SETTINGS.enabled ? 'success' : 'warning');
}

function addFaqEntry() {
  BOT_SETTINGS.faqs.push({ keywords:'', answer:'', nav:'' });
  renderFaqList();
}

function renderFaqList() {
  const el = document.getElementById('faqList');
  if (!el) return;
  if (!BOT_SETTINGS.faqs.length) {
    el.innerHTML = '<p class="text-xs text-text-muted">No custom FAQs yet. Click "+ Add FAQ Entry" to create one.</p>';
    return;
  }
  el.innerHTML = BOT_SETTINGS.faqs.map((f,i) => `
    <div class="bg-surface rounded-lg border border-border p-3 space-y-2">
      <input type="text" placeholder="Keywords (comma-separated)" value="${escHtml(f.keywords)}"
        oninput="BOT_SETTINGS.faqs[${i}].keywords=this.value"
        class="w-full text-xs px-2 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent" />
      <textarea placeholder="Answer (max 300 chars)" maxlength="300" rows="2"
        oninput="BOT_SETTINGS.faqs[${i}].answer=this.value"
        class="w-full text-xs px-2 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent resize-none">${escHtml(f.answer)}</textarea>
      <button onclick="BOT_SETTINGS.faqs.splice(${i},1);renderFaqList()" class="text-xs text-danger hover:underline cursor-pointer">Remove</button>
    </div>
  `).join('');
}

/* ═══════════════ INFO HUB ═══════════════ */

function toggleInfoHub() {
  infoHubState.expanded = !infoHubState.expanded;
  const body   = document.getElementById('infoHubBody');
  const chev   = document.getElementById('infoHubChevron');
  const search = document.getElementById('infoHubSearchWrap');
  body.classList.toggle('hidden', !infoHubState.expanded);
  chev.style.transform = infoHubState.expanded ? 'rotate(180deg)' : '';
  search.classList.toggle('hidden', !infoHubState.expanded);
  if (infoHubState.expanded) renderInfoHub();
}

function debounceInfoHubSearch(val) {
  clearTimeout(infoHubState.searchTimer);
  infoHubState.search = val;
  infoHubState.searchTimer = setTimeout(() => renderInfoHub(), 300);
}

function renderInfoHub() {
  renderInfoHubFilters();
  renderInfoHubDirectory();
}

function renderInfoHubFilters() {
  const el = document.getElementById('infoHubFilters');
  if (!el) return;
  const f = infoHubState.filters;
  const countries  = ['All','UK','USA','Canada','Australia'];
  const courseTypes = ['All','MBA','MS','UG','Medicine','Law'];
  const deposits   = ['All','Under ₹50K','₹50K–₹1L','Above ₹1L'];
  const intakes    = ['All','Jul 2026','Sep 2026','Jan 2027','Feb 2027'];

  function pillGroup(label, options, key) {
    return options.map(opt => {
      const active = f[key] === opt;
      return `<button class="filter-pill ${active ? 'active' : ''}" onclick="setInfoFilter('${key}','${opt}')">${opt}${active && opt !== 'All' ? '<span class="remove-x" onclick="event.stopPropagation();setInfoFilter(\''+key+'\',\'All\')">×</span>' : ''}</button>`;
    }).join('');
  }

  el.innerHTML = `
    <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide mr-1">Country</span>
    ${pillGroup('Country', countries, 'country')}
    <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide ml-2 mr-1">Course</span>
    ${pillGroup('Course', courseTypes, 'courseType')}
    <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide ml-2 mr-1">Deposit</span>
    ${pillGroup('Deposit', deposits, 'deposit')}
    <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide ml-2 mr-1">Intake</span>
    ${pillGroup('Intake', intakes, 'intake')}
    ${Object.values(f).some(v => v !== 'All') ? `<button onclick="clearInfoFilters()" class="ml-2 text-xs text-danger hover:underline cursor-pointer">Clear All</button>` : ''}
  `;
}

function setInfoFilter(key, val) {
  infoHubState.filters[key] = val;
  renderInfoHub();
}

function clearInfoFilters() {
  infoHubState.filters = { country:'All', courseType:'All', deposit:'All', intake:'All' };
  renderInfoHub();
}

function getFilteredUniversities() {
  const { search, filters } = infoHubState;
  return INFO_HUB_DATA.filter(u => {
    // Search
    if (search) {
      const q = search.toLowerCase();
      const haystack = [u.name, u.country, u.city, ...u.courses.map(c=>c.name), u.scholarship?.name || ''].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    // Country filter
    if (filters.country !== 'All' && u.country !== filters.country) return false;
    // Course type filter
    if (filters.courseType !== 'All') {
      const hasType = u.courses.some(c => c.name.toLowerCase().includes(filters.courseType.toLowerCase()) ||
        (filters.courseType === 'MS' && c.name.toLowerCase().startsWith('ms')) ||
        (filters.courseType === 'MBA' && c.name.toLowerCase().includes('mba')));
      if (!hasType) return false;
    }
    // Deposit filter
    if (filters.deposit !== 'All') {
      if (filters.deposit === 'Under ₹50K'  && u.depositInr >= 50000) return false;
      if (filters.deposit === '₹50K–₹1L'    && (u.depositInr < 50000 || u.depositInr > 100000)) return false;
      if (filters.deposit === 'Above ₹1L'   && u.depositInr <= 100000) return false;
    }
    // Intake filter
    if (filters.intake !== 'All' && !u.intake.includes(filters.intake)) return false;
    return true;
  });
}

function renderInfoHubDirectory() {
  const el = document.getElementById('infoHubDirectory');
  if (!el) return;
  const unis = getFilteredUniversities();
  if (!unis.length) {
    el.innerHTML = `<div class="text-center py-10">
      <svg class="w-10 h-10 text-text-muted mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      <p class="text-sm text-text-muted">No universities match these filters.</p>
      <button onclick="clearInfoFilters()" class="mt-2 text-xs font-semibold text-accent hover:underline cursor-pointer">Clear Filters</button>
    </div>`;
    return;
  }

  const countries = [...new Set(unis.map(u => u.country))];
  const countryMeta = { UK: { flag:'🇬🇧', cls:'uk' }, USA: { flag:'🇺🇸', cls:'usa' }, Canada: { flag:'🇨🇦', cls:'canada' }, Australia: { flag:'🇦🇺', cls:'australia' } };

  el.innerHTML = countries.map(country => {
    const group = unis.filter(u => u.country === country);
    const meta  = countryMeta[country] || { flag:'🌍', cls:'' };
    const cards = group.map(u => renderUniversityCard(u, meta.cls)).join('');
    return `<div>
      <p class="ih-country-label">${meta.flag} ${country} <span class="text-text-muted font-normal">(${group.length})</span></p>
      <div class="ih-scroll-row">${cards}</div>
    </div>`;
  }).join('');
}

function highlight(text, query) {
  if (!query) return escHtml(text);
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return escHtml(text).replace(re, '<span class="ih-highlight">$1</span>');
}

function renderUniversityCard(u, cls) {
  const urgent = daysUntil(u.depositDeadline) <= 14;
  const q = infoHubState.search;
  return `<div class="uni-card ${cls}" onclick="openUniversityDetail('${u.id}')">
    <p class="font-bold text-sm text-text-main mb-1 leading-tight">${highlight(u.name, q)}</p>
    <p class="text-xs text-text-muted mb-2">${u.flag} ${u.country} · ${u.city}</p>
    <div class="flex flex-wrap gap-1 mb-2">
      ${u.intake.map(i => `<span class="text-[10px] px-1.5 py-0.5 bg-blue-100 text-primary rounded font-semibold">${i}</span>`).join('')}
    </div>
    <p class="text-xs mb-1">💰 ₹${(u.depositInr/1000).toFixed(0)}K deposit ${urgent ? `<span class="deposit-urgent">· Due: ${u.depositDeadline.split('-').reverse().join(' ')}</span>` : ''}</p>
    ${u.scholarship ? `<span class="text-[10px] px-2 py-0.5 bg-green-100 text-success rounded-full font-semibold">🎓 Scholarship</span>` : ''}
    <button class="mt-2 w-full text-xs font-semibold text-primary hover:underline cursor-pointer text-left">View Details →</button>
  </div>`;
}

function openUniversityDetail(uniId) {
  const u = INFO_HUB_DATA.find(x => x.id === uniId);
  if (!u) return;
  state.drawerPrevMode = null;

  const intakeHtml = u.intake.map(i => `<div class="flex items-center gap-2 py-1">
    <span class="text-xs px-2 py-0.5 bg-blue-100 text-primary rounded font-semibold">${i}</span>
    <span class="text-xs text-text-muted">${daysUntil(i + '-01') > 0 ? 'Open' : 'Closed'}</span>
  </div>`).join('');

  const coursesHtml = u.courses.map(c => `<tr class="border-b border-border">
    <td class="py-2 text-xs font-medium text-text-main">${c.name}</td>
    <td class="py-2 text-xs text-text-muted">${c.duration}</td>
    <td class="py-2 text-xs text-text-muted">${c.fee}</td>
    <td class="py-2 text-xs text-text-muted">${c.entry}</td>
  </tr>`).join('');

  const docsHtml = u.docs.map(d => `<div class="flex items-center gap-2 py-1 text-xs text-text-main">
    <svg class="w-3 h-3 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/></svg>${d}
  </div>`).join('');

  const urgent = daysUntil(u.depositDeadline) <= 14;

  const content = `
    <div class="uni-detail-section">
      <h4>University Profile</h4>
      <p class="text-sm font-semibold text-text-main">${u.name}</p>
      <p class="text-xs text-text-muted mt-0.5">${u.flag} ${u.country} · ${u.city} · ${u.type}</p>
      <p class="text-xs text-text-muted mt-2 leading-relaxed">${u.desc}</p>
      <a href="${u.website}" target="_blank" class="text-xs text-primary hover:underline mt-1 inline-block">🌐 Official Website →</a>
    </div>
    <div class="uni-detail-section">
      <h4>Intake &amp; ETA</h4>
      ${intakeHtml}
    </div>
    <div class="uni-detail-section">
      <h4>Courses Offered</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="border-b border-border text-text-muted">
            <th class="text-left py-1">Course</th><th class="text-left py-1">Duration</th><th class="text-left py-1">Fee/yr</th><th class="text-left py-1">Entry</th>
          </tr></thead>
          <tbody>${coursesHtml}</tbody>
        </table>
      </div>
    </div>
    <div class="uni-detail-section">
      <h4>Deposit Details</h4>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Amount</p><p class="font-semibold">₹${u.depositInr.toLocaleString('en-IN')} (${u.depositCcy})</p></div>
        <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Deadline</p><p class="font-semibold ${urgent ? 'deposit-urgent' : ''}">${u.depositDeadline}</p></div>
        <div class="bg-surface rounded-lg p-2 col-span-2"><p class="text-text-muted">Refund Policy</p><p class="font-semibold">${u.refundPolicy}</p></div>
        <div class="bg-surface rounded-lg p-2 col-span-2"><p class="text-text-muted">Payment Method</p><p class="font-semibold">${u.paymentNotes}</p></div>
      </div>
    </div>
    ${u.scholarship ? `<div class="uni-detail-section">
      <h4>Scholarship</h4>
      <p class="text-xs font-semibold text-success mb-2">🎓 ${u.scholarship.name}</p>
      <p class="text-xs text-text-muted mb-1">Amount: <strong class="text-text-main">${u.scholarship.amount}</strong></p>
      <p class="text-xs text-text-muted mb-2">Deadline: <strong class="text-text-main">${u.scholarship.deadline}</strong></p>
      <p class="text-xs font-semibold text-text-muted mb-1">Eligibility:</p>
      ${u.scholarship.eligibility.map(e => `<div class="flex items-start gap-1.5 text-xs text-text-main py-0.5"><span class="text-success mt-0.5">•</span>${e}</div>`).join('')}
    </div>` : ''}
    <div class="uni-detail-section">
      <h4>Required Documents</h4>
      ${docsHtml}
    </div>
    <p class="text-[10px] text-text-muted mt-4">Last updated by ${u.lastUpdatedBy} on ${u.lastUpdatedDate}</p>
  `;

  openDrawer(u.name, content, false);
}

/* ── Admin Info Hub ── */
function renderAdminInfoHub() {
  const tbody = document.getElementById('adminInfoHubBody');
  if (!tbody) return;
  tbody.innerHTML = INFO_HUB_DATA.map(u => `
    <tr class="hover:bg-surface">
      <td class="px-4 py-3 text-sm font-medium text-text-main">${u.name}</td>
      <td class="px-4 py-3 text-sm text-text-muted">${u.flag} ${u.country}</td>
      <td class="px-4 py-3 text-sm font-mono">₹${(u.depositInr/1000).toFixed(0)}K</td>
      <td class="px-4 py-3 text-sm text-text-muted">${u.intake.join(', ')}</td>
      <td class="px-4 py-3 text-right">
        <div class="flex gap-2 justify-end">
          <button onclick="showToast('Editing ${u.name}','info')" class="text-xs text-primary hover:underline cursor-pointer">Edit</button>
          <button onclick="showToast('${u.name} hidden from counselors','warning')" class="text-xs text-danger hover:underline cursor-pointer">Hide</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function logout() {
  if (state.earningsChart) { state.earningsChart.destroy(); state.earningsChart = null; }
  if (state.botOpen) { document.getElementById('botPanel').classList.remove('open'); document.getElementById('botPanel').classList.add('hidden'); }
  // Hide 10x banner
  const b10x = document.getElementById('join10xBanner');
  if (b10x) b10x.classList.add('hidden');
  const mc = document.getElementById('mainContent');
  if (mc) mc.style.marginTop = '104px';
  state = { role:'counselor', currentUser:null, viewingCounselorId:1, historyPeriod:'7d', leaderPeriod:'today', currentTab:'tab1', currentAdminPanel:'users', loginAttempts:0, lockedUntil:null, earningsChart:null, drawerMode:null, drawerBoostType:null, drawerBoostSubType:null, drawerBoostSubCardId:null, drawerVolumeMetricKey:null, drawerRevenueSubCardId:null, drawerSelectedStudent:null, drawerPrevMode:null, selectedSubtask:null, ownTasks:[], boostAcknowledged:{}, botOpen:false, botActiveTab:'chat', chatPanel:{ unreadCount:0, lastOpenedAt:null }, botConversation:{ flow:null, step:0, collected:{}, history:[], lastIntent:null, shownFollowUps:[] } };
  document.getElementById('appShell').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPwd').value   = '';
  document.getElementById('loginError').classList.add('hidden');
  document.getElementById('counselorSelectorWrapper').classList.add('hidden');
  document.getElementById('adminTabBtn').classList.add('hidden');
  document.getElementById('mainTabBar').querySelectorAll('.htab').forEach(b => b.classList.remove('active'));
  document.querySelector('.htab[data-tab="tab1"]').classList.add('active');
}

/* ═══════════════════════════════════════════════════════
   FEATURE C — BOT PANEL TWO-TAB LAYOUT
═══════════════════════════════════════════════════════ */

function switchBotTab(tab) {
  state.botActiveTab = tab;
  const chatBtn    = document.getElementById('botTabChat');
  const actionsBtn = document.getElementById('botTabActions');
  const msgs       = document.getElementById('botMessages');
  const actItems   = document.getElementById('botActionItems');
  const inputRow   = document.querySelector('#botPanel .flex.items-center.gap-2.px-3');

  if (tab === 'chat') {
    chatBtn.classList.add('active','border-accent','text-accent');
    chatBtn.classList.remove('border-transparent','text-text-muted');
    actionsBtn.classList.remove('active','border-accent','text-accent');
    actionsBtn.classList.add('border-transparent','text-text-muted');
    msgs.classList.remove('hidden');
    actItems.classList.add('hidden');
    if (inputRow) inputRow.style.display = '';
    document.getElementById('botInput')?.focus();
  } else {
    actionsBtn.classList.add('active','border-accent','text-accent');
    actionsBtn.classList.remove('border-transparent','text-text-muted');
    chatBtn.classList.remove('active','border-accent','text-accent');
    chatBtn.classList.add('border-transparent','text-text-muted');
    msgs.classList.add('hidden');
    actItems.classList.remove('hidden');
    if (inputRow) inputRow.style.display = 'none';
    // Mark action items as seen — reduce badge
    const aiUnread = ACTION_ITEMS.filter(a => !a.completed && !a._seen).length;
    ACTION_ITEMS.forEach(a => a._seen = true);
    updateActionItemsBadge();
    renderActionItems();
  }
}

function renderActionItems() {
  const el = document.getElementById('botActionItems');
  if (!el) return;
  const pending   = ACTION_ITEMS.filter(a => !a.completed);
  const completed = ACTION_ITEMS.filter(a => a.completed);
  const all = [...pending, ...completed];

  if (!all.length) {
    el.innerHTML = `<div class="flex flex-col items-center justify-center h-full py-10 text-center">
      <svg class="w-10 h-10 text-text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
      <p class="text-xs text-text-muted">No action items right now.<br>Check back later.</p>
    </div>`;
    return;
  }

  el.innerHTML = all.map(item => {
    if (item.completed) {
      const d = new Date(item.completedAt);
      const ds = d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
      return `<div class="action-item-card completed flex items-center justify-between gap-2 py-2 px-3">
        <div class="flex-1 min-w-0">
          <p class="ai-title truncate">${escHtml(item.title)}</p>
          <p class="ai-meta">Completed on ${ds}</p>
        </div>
        <span class="ai-badge completed flex-shrink-0">Done</span>
      </div>`;
    }
    const sentD = new Date(item.sentAt);
    const sentStr = sentD.toLocaleDateString('en-IN', { day:'numeric', month:'short' }) + ', ' +
      sentD.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    const linksHtml = (item.links || []).map(l => {
      const isValid = l.url && l.url.startsWith('http');
      return isValid
        ? `<a href="${escHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="ai-link">${escHtml(l.label)} →</a>`
        : `<span class="text-xs text-text-muted">${escHtml(l.label)}</span>`;
    }).join('');
    return `<div class="action-item-card" id="ai-card-${item.id}">
      <div class="flex items-start justify-between gap-2 mb-1">
        <p class="ai-title flex-1">${escHtml(item.title)}</p>
        <span class="ai-badge pending flex-shrink-0">Pending</span>
      </div>
      <p class="ai-desc">${escHtml(item.description)}</p>
      ${linksHtml}
      <div class="flex items-center justify-between mt-2">
        <p class="ai-meta">Sent ${sentStr}</p>
        <button class="ai-complete-btn" onclick="markActionItemComplete('${item.id}')">Mark Done</button>
      </div>
    </div>`;
  }).join('');
}

function markActionItemComplete(id) {
  const item = ACTION_ITEMS.find(a => a.id === id);
  if (!item || item.completed) return;
  const btn = document.querySelector(`#ai-card-${id} .ai-complete-btn`);
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  // Simulate PATCH /action-items/{id}/complete
  setTimeout(() => {
    item.completed = true;
    item.completedAt = new Date().toISOString();
    showToast('Action item marked as completed!', 'success');
    renderActionItems();
    updateActionItemsBadge();
  }, 500);
}

function updateActionItemsBadge() {
  const badge = document.getElementById('actionItemsBadge');
  if (!badge) return;
  const unseen = ACTION_ITEMS.filter(a => !a.completed && !a._seen).length;
  if (unseen > 0) {
    badge.textContent = unseen;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

/* ═══════════════════════════════════════════════════════
   FEATURE D — PRIORITY ALERT (UNHAPPY CASES)
═══════════════════════════════════════════════════════ */

function renderAlertIcon() {
  const wrap  = document.getElementById('alertIconWrap');
  const badge = document.getElementById('alertBadge');
  const unresolved = UNHAPPY_ALERTS.filter(a => !a.resolved);
  if (!unresolved.length) {
    wrap.classList.add('hidden');
    return;
  }
  wrap.classList.remove('hidden');
  if (unresolved.length > 1) {
    badge.textContent = unresolved.length > 9 ? '9+' : String(unresolved.length);
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function toggleAlertDrawer() {
  const drawer  = document.getElementById('alertDrawer');
  const overlay = document.getElementById('alertDrawerOverlay');
  const isOpen  = !drawer.classList.contains('hidden');
  if (isOpen) {
    drawer.classList.add('hidden');
    overlay.classList.add('hidden');
  } else {
    drawer.classList.remove('hidden');
    overlay.classList.remove('hidden');
    renderAlertDrawer();
  }
}

function renderAlertDrawer() {
  const el = document.getElementById('alertDrawerList');
  if (!el) return;
  const sorted = [...UNHAPPY_ALERTS].sort((a,b) => new Date(b.raisedAt) - new Date(a.raisedAt));
  if (!sorted.length) {
    el.innerHTML = '<p class="text-sm text-text-muted text-center py-6">No unhappy cases right now.</p>';
    return;
  }
  el.innerHTML = sorted.map(alert => {
    const d = new Date(alert.raisedAt);
    const ds = d.toLocaleDateString('en-IN', { day:'numeric', month:'short' }) + ', ' +
      d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    const statusCls = alert.resolved ? 'bg-green-100 text-success' : 'bg-red-100 text-danger';
    const statusTxt = alert.resolved ? 'Resolved' : 'Unresolved';
    return `<div class="border border-border rounded-xl p-3 ${alert.resolved ? 'opacity-60' : ''}">
      <div class="flex items-start justify-between gap-2 mb-1">
        <p class="font-bold text-sm text-text-main">${escHtml(alert.studentName)}</p>
        <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusCls}">${statusTxt}</span>
      </div>
      <p class="text-xs text-text-muted mb-2 leading-snug">${escHtml(alert.reason)}</p>
      <p class="text-[10px] text-text-muted mb-2">Raised: ${ds}</p>
      <button onclick="openStudentDetail('${alert.leadId}');toggleAlertDrawer()"
        class="text-xs font-semibold text-primary hover:underline cursor-pointer">View Lead →</button>
      ${!alert.resolved ? `<button onclick="resolveAlert('${alert.id}')" class="ml-3 text-xs font-semibold text-success hover:underline cursor-pointer">Mark Resolved</button>` : ''}
    </div>`;
  }).join('');
}

function resolveAlert(id) {
  const alert = UNHAPPY_ALERTS.find(a => a.id === id);
  if (!alert) return;
  alert.resolved = true;
  renderAlertDrawer();
  renderAlertIcon();
  showToast('Alert marked as resolved.', 'success');
}

/* ═══════════════════════════════════════════════════════
   FEATURE E — DAILY REPORT CARD
═══════════════════════════════════════════════════════ */

function renderReportCard() {
  const c = getCounselorData();

  const REPORT_METRICS = [
    { name:'1st Call Quality Score', actual: c.q1score,      target: 80,  unit:'%' },
    { name:'2nd Call Quality Score', actual: c.q2score,      target: 80,  unit:'%' },
    { name:'CA to ISLs — 48H',       actual: 42,             target: 75,  unit:'%' },
    { name:'CA to F2F — 15D',        actual: c.f2f,          target: TARGETS.f2f,  unit:'' },
    { name:'LinkedIn (Last 2D)',      actual: 3,              target: 5,   unit:'' },
    { name:'CA to STI — 15D',        actual: c.stis,         target: TARGETS.stis, unit:'' },
    { name:'Admit to Deposit — 30D', actual: c.deposits,     target: TARGETS.deposits, unit:'' },
    { name:'Deposit via LeapPay (Y)', actual: 2,              target: 4,   unit:'' },
  ];

  REPORT_METRICS.forEach(m => {
    const pct = m.target ? Math.round((m.actual / m.target) * 100) : 0;
    m.pct = pct;
    m.status = pct >= 100 ? 'green' : pct >= 60 ? 'amber' : 'red';
  });

  const green = REPORT_METRICS.filter(m => m.status === 'green').length;
  const amber = REPORT_METRICS.filter(m => m.status === 'amber').length;
  const red   = REPORT_METRICS.filter(m => m.status === 'red').length;

  // Summary line
  const summaryEl = document.getElementById('reportCardSummary');
  if (summaryEl) {
    const lines = red > 0 ? `${red} metric${red > 1 ? 's' : ''} in the red zone — focus here first.` : 'Great job — all metrics on track!';
    summaryEl.textContent = lines;
  }

  // Score summary row
  const scoreEl = document.getElementById('reportScoreSummary');
  if (scoreEl) {
    scoreEl.innerHTML = `
      <div class="scorecard-col green"><p class="sc-count">${green}</p><p class="sc-label">Working Well</p></div>
      <div class="scorecard-col amber"><p class="sc-count">${amber}</p><p class="sc-label">Improving</p></div>
      <div class="scorecard-col red"><p class="sc-count">${red}</p><p class="sc-label">Needs Focus</p></div>`;
  }

  // Metric table
  const tableEl = document.getElementById('reportMetricTable');
  if (tableEl) {
    tableEl.innerHTML = REPORT_METRICS.map(m => {
      const statusBg = m.status === 'green' ? 'bg-green-100 text-success' : m.status === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-danger';
      const unit = m.unit === '%' ? '%' : '';
      return `<tr>
        <td class="py-2 font-medium text-text-main text-xs">${m.name}</td>
        <td class="py-2 text-center text-xs font-mono">T — ${m.target}${unit} · A — ${m.actual}${unit}</td>
        <td class="py-2 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBg}">${m.status === 'green' ? '✓ Good' : m.status === 'amber' ? '~ On Track' : '! Focus'}</span></td>
      </tr>`;
    }).join('');
  }

  // Recommended next steps (red only)
  const nextEl = document.getElementById('reportNextSteps');
  if (nextEl) {
    const redMetrics = REPORT_METRICS.filter(m => m.status === 'red');
    if (!redMetrics.length) { nextEl.innerHTML = ''; return; }
    const WHY = {
      'CA to ISLs — 48H':       'Early ISLs set the tone for the counselling relationship.',
      '2nd Call Quality Score':  'Second call quality drives conversion to application stage.',
      'Deposit via LeapPay (Y)': 'LeapPay deposits confirm commitment and unlock revenue tracking.',
      'LinkedIn (Last 2D)':      'LinkedIn engagement builds trust and keeps leads warm.',
    };
    const HOW = {
      'CA to ISLs — 48H':       'Call new leads within 48 hours — set a morning reminder.',
      '2nd Call Quality Score':  'Review your call script; focus on discovery questions.',
      'Deposit via LeapPay (Y)': 'Share the LeapPay link in WhatsApp with payment-ready students.',
      'LinkedIn (Last 2D)':      'Send 3 LinkedIn messages today to warm leads.',
    };
    const rows = redMetrics.map(m => `<tr class="border-b border-border">
      <td class="py-2 text-xs font-medium text-danger">${m.name} (T: ${m.target} · A: ${m.actual})</td>
      <td class="py-2 text-xs text-text-muted">${WHY[m.name] || 'Impacts your overall conversion rate.'}</td>
      <td class="py-2 text-xs text-text-main">${HOW[m.name] || 'Focus on daily follow-ups for this metric.'}</td>
    </tr>`).join('');
    nextEl.innerHTML = `
      <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Recommended Next Steps</p>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="border-b border-border bg-surface">
            <th class="text-left py-2 font-semibold text-text-muted">Metric</th>
            <th class="text-left py-2 font-semibold text-text-muted">Why It Matters</th>
            <th class="text-left py-2 font-semibold text-text-muted">How to Improve</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  // Top performers
  const topEl = document.getElementById('reportTopPerformers');
  if (topEl) {
    const topOrg     = COUNSELORS.reduce((best, c) => (c.today.stis > (best?.today?.stis || 0) ? c : best), null);
    const teamCounselors = COUNSELORS.filter(c => c.team === (state.currentUser?.team || 'Alpha'));
    const topCluster = teamCounselors.reduce((best, c) => (c.today.stis > (best?.today?.stis || 0) ? c : best), null);
    topEl.innerHTML = `
      <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Top Performers (STIs)</p>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="bg-surface rounded-lg p-2">
          <p class="text-text-muted font-semibold mb-0.5">Org Wide</p>
          <p class="font-bold text-text-main">${topOrg?.name || '—'}</p>
          <p class="text-text-muted">${topOrg?.today?.stis || 0} STIs</p>
        </div>
        <div class="bg-surface rounded-lg p-2">
          <p class="text-text-muted font-semibold mb-0.5">Your Cluster</p>
          <p class="font-bold text-text-main">${topCluster?.name || '—'}</p>
          <p class="text-text-muted">${topCluster?.today?.stis || 0} STIs</p>
        </div>
      </div>`;
  }
}

/* ── TL: change counsellor viewed in Scorecard ── */
function changeScorecardCounsellor(id) {
  if (!id) return;
  state.viewingCounselorId = parseInt(id);
  renderReportCard();
}

/* ── Counsellor: render scorecard strip inside Performance Summary ── */
function renderSummaryScoreStrip() {
  const countsEl = document.getElementById('summaryScoreCounts');
  const tableEl  = document.getElementById('summaryScoreTable');
  if (!countsEl || !tableEl) return;

  const c = getCounselorData();
  const METRICS = [
    { name:'1st Call Quality',      actual: c.q1score,   target: 80,              unit:'%' },
    { name:'2nd Call Quality',      actual: c.q2score,   target: 80,              unit:'%' },
    { name:'CA to ISLs — 48H',      actual: 42,          target: 75,              unit:'%' },
    { name:'CA to F2F — 15D',       actual: c.f2f,       target: TARGETS.f2f,     unit:''  },
    { name:'CA to STI — 15D',       actual: c.stis,      target: TARGETS.stis,    unit:''  },
    { name:'Admit to Deposit — 30D',actual: c.deposits,  target: TARGETS.deposits,unit:''  },
    { name:'LinkedIn (Last 2D)',     actual: 3,           target: 5,               unit:''  },
    { name:'LeapPay Deposits (Y)',   actual: 2,           target: 4,               unit:''  },
  ];
  METRICS.forEach(m => {
    const pct = m.target ? Math.round((m.actual / m.target) * 100) : 0;
    m.status = pct >= 100 ? 'green' : pct >= 60 ? 'amber' : 'red';
  });
  const green = METRICS.filter(m => m.status === 'green').length;
  const amber = METRICS.filter(m => m.status === 'amber').length;
  const red   = METRICS.filter(m => m.status === 'red').length;

  countsEl.innerHTML = `
    <div class="scorecard-col green"><p class="sc-count">${green}</p><p class="sc-label">Working Well</p></div>
    <div class="scorecard-col amber"><p class="sc-count">${amber}</p><p class="sc-label">Improving</p></div>
    <div class="scorecard-col red"><p class="sc-count">${red}</p><p class="sc-label">Needs Focus</p></div>`;

  tableEl.innerHTML = METRICS.map(m => {
    const statusBg = m.status === 'green' ? 'bg-green-100 text-success' : m.status === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-danger';
    const unit = m.unit;
    return `<tr>
      <td class="py-1.5 font-medium text-text-main">${m.name}</td>
      <td class="py-1.5 text-center font-mono">T — ${m.target}${unit} · A — ${m.actual}${unit}</td>
      <td class="py-1.5 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBg}">${m.status === 'green' ? '✓ Good' : m.status === 'amber' ? '~ On Track' : '! Focus'}</span></td>
    </tr>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════
   FEATURE F — STAND UP METRICS TABLE
═══════════════════════════════════════════════════════ */

const STANDUP_METRICS = [
  { name:'Total Leads',               key:'leads'             },
  { name:'ISL in 24 hrs',            key:'isl_24h',  tooltip:'Leads assigned → ISL done within 24 hrs' },
  { name:'ISL Pending',               key:'isl_pending'       },
  { name:'Total Lock In',             key:'lockins'           },
  { name:'Total F2F',                 key:'f2f'               },
  { name:'Total Walk In',             key:'walkin'            },
  { name:'Total STI',                 key:'stis'              },
  { name:'Total Deposits',            key:'deposits'          },
  { name:'Total Visas',               key:'visas'             },
  { name:'Revenue Collected',         key:'revenue_collected', isCurrency:true },
  { name:'Referral % from CA',        key:'referral_pct',      isPctMetric:true, tooltip:'% of assigned students who referred someone' },
];

function generateStandupData(filters) {
  const c = getCounselorData();
  // Base daily actuals — use real data where available, mock the rest
  const leadsBase = 30;
  // ISL in 24 hrs = ~72% of leads assigned get an ISL call within 24 hours
  const isl24hBase = Math.round(leadsBase * 0.72);
  const base = {
    leads: leadsBase, isl_24h: isl24hBase, isl_pending: Math.round(leadsBase * 0.28),
    lockins: c.lockins, f2f: c.f2f, walkin: 2,
    stis: c.stis, deposits: c.deposits, visas: 1,
    revenue_collected: c.revenueCollected,
    referral_pct: c.referralPct,
  };
  // Apply lightweight filter noise for realism
  const multiplier  = filters.country    && filters.country    !== '' ? 0.6  : 1;
  const locMult     = filters.location   === 'online'  ? 0.7  : filters.location === 'branch' ? 0.85 : 1;
  const counselMult = filters.counsellor && filters.counsellor !== '' ? 0.5  : 1;
  const tlMult      = filters.tl         && filters.tl         !== '' ? 0.75 : 1;
  // Servicing type filter — Partner ≈ 55% of pipeline, Non-Partner ≈ 45%
  const servMult    = filters.servicingType === 'partner'     ? 0.55
                    : filters.servicingType === 'non-partner' ? 0.45 : 1;
  // CA date filter — count students within range and scale
  let caDateMult = 1;
  if (filters.caDateFrom || filters.caDateTo) {
    const from = filters.caDateFrom ? new Date(filters.caDateFrom) : new Date('2020-01-01');
    const to   = filters.caDateTo   ? new Date(filters.caDateTo)   : new Date('2099-12-31');
    const matched = STUDENTS.filter(s => {
      if (!s.caDate) return false;
      const d = new Date(s.caDate);
      return d >= from && d <= to;
    }).length;
    caDateMult = STUDENTS.length ? matched / STUDENTS.length : 1;
  }

  return STANDUP_METRICS.map((m, i) => {
    // Percentage metrics (e.g. Referral %) — show % directly, not day-multiplied
    if (m.isPctMetric) {
      const pctVal  = base[m.key] || 0;
      const target  = TARGETS.referral;
      const ytdPct  = target ? Math.round((pctVal / target) * 100) : 0;
      const mtdPct  = ytdPct;
      const ytdCls  = ytdPct >= 100 ? 'standup-ach-green' : 'standup-ach-red';
      const mtdCls  = mtdPct >= 100 ? 'standup-ach-green' : 'standup-ach-red';
      return { ...m,
        tYTD: target, tMTD: target, aYTD: pctVal, aMTD: pctVal,
        Y: pctVal, Y1: pctVal, Y2: pctVal, W0: pctVal, W01: pctVal, M01: pctVal,
        ytdCls, mtdCls, isPct: true,
      };
    }
    const daily  = Math.round((base[m.key] || 5) * multiplier * locMult * counselMult * tlMult * caDateMult * servMult);
    const tYTD   = daily * 264;   // 264 working days
    const tMTD   = daily * 22;
    const aYTD   = Math.round(tYTD * [0.78,0.82,0.65,0.91,0.74,0.88,0.60,0.85,0.93,0.70,0.77][i % 11]);
    const aMTD   = Math.round(tMTD * [0.82,0.88,0.70,0.95,0.78,0.91,0.65,0.88,0.96,0.74,0.80][i % 11]);
    const Y      = Math.max(0, daily - Math.floor(Math.random() * 2));
    const Y1     = Math.max(0, daily - Math.floor(Math.random() * 3));
    const Y2     = Math.max(0, daily - Math.floor(Math.random() * 4));
    const W0     = daily * 5;
    const W01    = Math.round(daily * 5 * 0.9);
    const M01    = Math.round(daily * 22 * 0.88);
    const ytdPct = tYTD ? Math.round((aYTD / tYTD) * 100) : 0;
    const mtdPct = tMTD ? Math.round((aMTD / tMTD) * 100) : 0;
    const ytdCls = ytdPct >= 100 ? 'standup-ach-green' : 'standup-ach-red';
    const mtdCls = mtdPct >= 100 ? 'standup-ach-green' : 'standup-ach-red';
    return { ...m, tYTD, tMTD, aYTD, aMTD, Y, Y1, Y2, W0, W01, M01, ytdCls, mtdCls };
  });
}

function renderStandupTable(filterData) {
  const filters = filterData || {
    intake:         document.getElementById('standupIntake')?.value            || '',
    location:       document.getElementById('standupLocation')?.value          || '',
    country:        document.getElementById('standupCountry')?.value           || '',
    counsellor:     document.getElementById('standupCounsellorFilter')?.value  || '',
    tl:             document.getElementById('standupTLFilter')?.value           || '',
    caDateFrom:     document.getElementById('standupCADateFrom')?.value        || '',
    caDateTo:       document.getElementById('standupCADateTo')?.value          || '',
    servicingType:  document.getElementById('standupServicingType')?.value     || '',
  };
  const tbody = document.getElementById('standupTableBody');
  const empty = document.getElementById('standupEmpty');
  if (!tbody) return;
  if (empty) empty.classList.add('hidden');

  const c = getCounselorData();
  const allData = generateStandupData(filters);

  // ── SECTION 1: VOLUME METRICS ──────────────────────────────
  // New order: Leads → ISL 24h → F2F → Lock In → STI → Admits → Deposits → Visa → Revenue → Pre ISL Drop → Total Drop
  const VOLUME_MAP = {
    leads:             'Leads',
    isl_24h:           'ISL Shared within 24 Hours',
    f2f:               'F2F Done',
    lockins:           'Lock In Done',
    stis:              'STI Done',
    deposits:          'Deposits',
    visas:             'Visa Approved',
    revenue_collected: 'Revenue Generated',
  };
  const VOLUME_ORDER = ['leads','isl_24h','f2f','lockins','stis','deposits','visas','revenue_collected'];

  const volumeRows = VOLUME_ORDER.map(key => {
    const row = allData.find(r => r.key === key);
    return row ? { ...row, name: VOLUME_MAP[key] } : null;
  }).filter(Boolean);

  // Insert "Admits" after STI Done (now at index 4 → splice at 5)
  const admitsBase = Math.max(1, Math.round((c.lockins || 2) * 0.4));
  const admitsMTD  = admitsBase * 22;
  const admitsYTD  = admitsBase * 264;
  volumeRows.splice(5, 0, {
    name:'Admits', key:'admits', isCurrency:false, isPct:false,
    tYTD: admitsYTD,                         tMTD: admitsMTD,
    aYTD: Math.round(admitsYTD * 0.82),      aMTD: Math.round(admitsMTD * 0.82),
    Y: admitsBase,     Y1: Math.max(0, admitsBase - 1),  Y2: admitsBase,
    W0: admitsBase * 5, W01: admitsBase * 4, M01: Math.round(admitsMTD * 0.88),
  });

  // Add Pre ISL Drop and Total Drop at end of Volume Metrics
  volumeRows.push({
    name:'Pre ISL Drop', key:'pre_isl_drop', isCurrency:false, isPct:false, isDropRate:true,
    tYTD:10, tMTD:10,
    aYTD:8,  aMTD:7,
    Y:8, Y1:9, Y2:7,
    W0:8, W01:9, M01:7,
  });
  volumeRows.push({
    name:'Total Drop', key:'post_isl_drop', isCurrency:false, isPct:false, isDropRate:true,
    tYTD:25, tMTD:25,
    aYTD:22, aMTD:20,
    Y:22, Y1:24, Y2:21,
    W0:22, W01:23, M01:21,
  });

  // ── SECTION 2: CONVERSION FUNNEL ───────────────────────────
  const FUNNEL_DEF = [
    { name:'ISL Shared in 24 Hours',              target:75,  actual:72, offsets:[1,3,2,2,4,3] },
    { name:'CA to ISL',                           target:80,  actual:65, offsets:[3,5,4,4,6,5] },
    { name:'CA to STI — 14 Days',                target:30,  actual:18, offsets:[2,4,3,3,5,4] },
    { name:'CA to F2F — 14 Days',                target:25,  actual:22, offsets:[0,2,1,1,3,2] },
    { name:'CA to Lock In Done — 14 Days',       target:20,  actual:15, offsets:[1,2,1,1,2,1] },
    { name:'STI to Admits — 30 Days',            target:40,  actual:35, offsets:[2,3,2,3,4,3] },
    { name:'Admit to Deposits — 14 Days',        target:50,  actual:28, offsets:[4,6,5,5,7,6] },
    { name:'CA to Visa',                          target:20,  actual:12, offsets:[1,2,1,2,3,2] },
    { name:'CA to Revenue (Excl. Partner Visa)', target:15,  actual:11, offsets:[2,3,2,2,4,3] },
    { name:'Deposit to Leap Pay %',              target:60,  actual:42, offsets:[3,5,4,4,6,5] },
    { name:'CA → Pre ISL Drop %',               target:10,  actual:8,  offsets:[1,2,1,1,2,1], isDropRate:true },
    { name:'CA → Total Drop %',                 target:35,  actual:30, offsets:[2,4,2,2,3,2], isDropRate:true },
  ];
  const funnelRows = FUNNEL_DEF.map((m, i) => ({
    name: m.name, key: `funnel_${i}`, isPct: true, isCurrency: false,
    isDropRate: m.isDropRate || false,
    tYTD: m.target, tMTD: m.target,
    aYTD: m.actual, aMTD: m.actual,
    Y:   m.actual,
    Y1:  Math.max(0, m.actual - m.offsets[0]),
    Y2:  Math.max(0, m.actual - m.offsets[1]),
    W0:  m.actual,
    W01: Math.max(0, m.actual - m.offsets[2]),
    M01: Math.max(0, m.actual - m.offsets[3]),
  }));

  // ── STATUS COMPUTATION ─────────────────────────────────────
  function addStatus(rows) {
    rows.forEach(r => {
      const aMTD = typeof r.aMTD === 'string' ? parseFloat(r.aMTD.replace(/[^0-9.]/g,'')) : r.aMTD;
      const tMTD = typeof r.tMTD === 'string' ? parseFloat(r.tMTD.replace(/[^0-9.]/g,'')) : r.tMTD;
      r.mtdPct = tMTD > 0 ? Math.round((aMTD / tMTD) * 100) : (aMTD > 0 ? 100 : 0);
      if (r.isDropRate) {
        // Lower is better: actual ≤ target = good, ≤ 1.5× target = ontrack, > 1.5× = focus
        r.status = aMTD <= tMTD ? 'good' : aMTD <= tMTD * 1.5 ? 'ontrack' : 'focus';
      } else {
        r.status = r.mtdPct >= 80 ? 'good' : r.mtdPct >= 50 ? 'ontrack' : 'focus';
      }
    });
  }
  addStatus(volumeRows);
  addStatus(funnelRows);

  // ── STATUS SUMMARY ─────────────────────────────────────────
  const allRows    = [...volumeRows, ...funnelRows];
  const goodCnt    = allRows.filter(r => r.status === 'good').length;
  const ontrackCnt = allRows.filter(r => r.status === 'ontrack').length;
  const focusCnt   = allRows.filter(r => r.status === 'focus').length;

  // Last Updated At
  const lastUpdEl = document.getElementById('standupLastUpdated');
  if (lastUpdEl) {
    const now = new Date();
    lastUpdEl.textContent = `Last updated: ${now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})} at ${now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}`;
  }

  const summaryEl = document.getElementById('standupStatusSummary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="flex items-center gap-3 flex-wrap">
        <span class="text-[10px] font-bold text-text-muted uppercase tracking-widest">Summary:</span>
        <div class="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
          <span class="w-2 h-2 rounded-full bg-success inline-block"></span>
          <span class="font-bold text-success text-sm">${goodCnt}</span>
          <span class="text-[10px] text-success font-medium ml-0.5">Good</span>
        </div>
        <div class="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
          <span class="w-2 h-2 rounded-full bg-accent inline-block"></span>
          <span class="font-bold text-accent text-sm">${ontrackCnt}</span>
          <span class="text-[10px] text-accent font-medium ml-0.5">On Track</span>
        </div>
        <div class="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
          <span class="w-2 h-2 rounded-full bg-danger inline-block"></span>
          <span class="font-bold text-danger text-sm">${focusCnt}</span>
          <span class="text-[10px] text-danger font-medium ml-0.5">Focus</span>
        </div>
      </div>`;
  }

  // ── RENDER HELPERS ─────────────────────────────────────────
  function fmtV(val, isPct, isCurrency) {
    if (isCurrency) return fmt(val);
    if (isPct) return `${val}%`;
    return val;
  }

  function statusBadge(status) {
    if (status === 'good')    return `<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-success whitespace-nowrap">✓ Good</span>`;
    if (status === 'ontrack') return `<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 whitespace-nowrap">~ On Track</span>`;
    return `<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-danger whitespace-nowrap">! Focus</span>`;
  }

  function statusDotRow(status) {
    const color = status === 'good' ? 'bg-success' : status === 'ontrack' ? 'bg-accent' : 'bg-danger';
    return `<span class="w-2 h-2 rounded-full ${color} inline-block mr-1.5 flex-shrink-0"></span>`;
  }

  function perfCell(val, isPct, isCurrency, target, isDropRate) {
    const fval = fmtV(val, isPct, isCurrency);
    const numV = typeof val    === 'string' ? parseFloat(val.replace(/[^0-9.]/g,''))    : val;
    const numT = typeof target === 'string' ? parseFloat(target.replace(/[^0-9.]/g,'')) : target;
    let cls;
    if (isDropRate) {
      cls = numV <= numT ? 'text-success' : numV <= numT * 1.5 ? 'text-accent' : 'text-danger';
    } else {
      const pct = numT > 0 ? Math.round((numV / numT) * 100) : (numV > 0 ? 100 : 0);
      cls = pct >= 80 ? 'text-success' : pct >= 50 ? 'text-accent' : 'text-danger';
    }
    return `<span class="font-semibold ${cls}">${fval}</span>`;
  }

  function trendArrow(current, prev) {
    if (current > prev) return `<span class="text-success text-[10px] ml-0.5">↑</span>`;
    if (current < prev) return `<span class="text-danger text-[10px] ml-0.5">↓</span>`;
    return `<span class="text-text-muted text-[10px] ml-0.5">→</span>`;
  }

  function sectionHeader(title, groupId, count, goodN, ontrackN, focusN) {
    return `<tr onclick="togglePerfSection('${groupId}')" class="cursor-pointer hover:bg-slate-200/60 transition-colors select-none">
      <td colspan="12" class="px-3 py-2.5 bg-slate-100 border-y border-border">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">${title}</span>
            <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-500 font-semibold">${count} metrics</span>
            <span class="text-[9px] text-success font-semibold">${goodN}✓</span>
            <span class="text-[9px] text-accent font-semibold">${ontrackN}~</span>
            <span class="text-[9px] text-danger font-semibold">${focusN}!</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-[9px] text-slate-400 font-medium">tap to expand</span>
            <svg id="chevron-perf-${groupId}" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
      </td>
    </tr>`;
  }

  function dataRow(row, idx, i, groupId) {
    const rowBg = i % 2 === 0 ? '' : 'bg-surface/30';
    return `<tr class="hover:bg-primary/5 transition-colors ${rowBg} perf-row-${groupId} hidden">
      <td class="px-3 py-2.5 font-medium text-text-main sticky left-0 ${rowBg || 'bg-white'} whitespace-nowrap">
        <div class="flex items-center">${statusDotRow(row.status)}${idx + 1}. ${row.name}</div>
      </td>
      <td class="px-3 py-2.5 text-right font-mono text-text-muted bg-blue-50/40">${fmtV(row.tYTD, row.isPct, row.isCurrency)}</td>
      <td class="px-3 py-2.5 text-right font-mono text-text-muted bg-blue-50/40">${fmtV(row.tMTD, row.isPct, row.isCurrency)}</td>
      <td class="px-3 py-2.5 text-right font-mono bg-emerald-50/40 cursor-pointer hover:bg-emerald-100/60" onclick="showStandupDrillDown('${row.key}','${row.name}','YTD',${JSON.stringify(row.aYTD)},${JSON.stringify(row.tYTD)},${row.isPct||false},${row.isCurrency||false})">${perfCell(row.aYTD, row.isPct, row.isCurrency, row.tYTD || 1, row.isDropRate)}<span class="text-[9px] text-emerald-600 ml-1">↗</span></td>
      <td class="px-3 py-2.5 text-right font-mono bg-emerald-50/40 cursor-pointer hover:bg-emerald-100/60" onclick="showStandupDrillDown('${row.key}','${row.name}','MTD',${JSON.stringify(row.aMTD)},${JSON.stringify(row.tMTD)},${row.isPct||false},${row.isCurrency||false})">${perfCell(row.aMTD, row.isPct, row.isCurrency, row.tMTD || 1, row.isDropRate)}<span class="text-[9px] text-emerald-600 ml-1">↗</span></td>
      <td class="px-3 py-2.5 text-right font-mono text-text-muted cursor-pointer hover:bg-blue-50/60" onclick="showStandupDrillDown('${row.key}','${row.name}','Yesterday',${JSON.stringify(row.Y)},${JSON.stringify(row.tMTD)},${row.isPct||false},${row.isCurrency||false})">${fmtV(row.Y,row.isPct,row.isCurrency)}<span class="text-[9px] text-blue-400 ml-0.5">↗</span></td>
      <td class="px-3 py-2.5 text-right font-mono text-text-muted cursor-pointer hover:bg-blue-50/60" onclick="showStandupDrillDown('${row.key}','${row.name}','2 Days Ago',${JSON.stringify(row.Y1)},${JSON.stringify(row.tMTD)},${row.isPct||false},${row.isCurrency||false})">${fmtV(row.Y1,row.isPct,row.isCurrency)}<span class="text-[9px] text-blue-400 ml-0.5">↗</span></td>
      <td class="px-3 py-2.5 text-right font-mono text-text-muted cursor-pointer hover:bg-blue-50/60" onclick="showStandupDrillDown('${row.key}','${row.name}','3 Days Ago',${JSON.stringify(row.Y2)},${JSON.stringify(row.tMTD)},${row.isPct||false},${row.isCurrency||false})">${fmtV(row.Y2,row.isPct,row.isCurrency)}<span class="text-[9px] text-blue-400 ml-0.5">↗</span></td>
      <td class="px-3 py-2.5 text-right font-mono bg-amber-50/40 text-text-muted cursor-pointer hover:bg-amber-100/60" onclick="showStandupDrillDown('${row.key}','${row.name}','This Week',${JSON.stringify(row.W0)},${JSON.stringify(row.tMTD)},${row.isPct||false},${row.isCurrency||false})">${fmtV(row.W0,row.isPct,row.isCurrency)}${trendArrow(row.W0,row.W01)}<span class="text-[9px] text-blue-400 ml-0.5">↗</span></td>
      <td class="px-3 py-2.5 text-right font-mono bg-amber-50/40 text-text-muted cursor-pointer hover:bg-amber-100/60" onclick="showStandupDrillDown('${row.key}','${row.name}','Last Week',${JSON.stringify(row.W01)},${JSON.stringify(row.tMTD)},${row.isPct||false},${row.isCurrency||false})">${fmtV(row.W01,row.isPct,row.isCurrency)}<span class="text-[9px] text-blue-400 ml-0.5">↗</span></td>
      <td class="px-3 py-2.5 text-right font-mono bg-amber-50/40 text-text-muted cursor-pointer hover:bg-amber-100/60" onclick="showStandupDrillDown('${row.key}','${row.name}','Last Month',${JSON.stringify(row.M01)},${JSON.stringify(row.tMTD)},${row.isPct||false},${row.isCurrency||false})">${fmtV(row.M01,row.isPct,row.isCurrency)}<span class="text-[9px] text-blue-400 ml-0.5">↗</span></td>
      <td class="px-3 py-2.5 text-center">${statusBadge(row.status)}</td>
    </tr>`;
  }

  // Per-section status counts for header badges
  const vGood = volumeRows.filter(r => r.status === 'good').length;
  const vOn   = volumeRows.filter(r => r.status === 'ontrack').length;
  const vFoc  = volumeRows.filter(r => r.status === 'focus').length;
  const fGood = funnelRows.filter(r => r.status === 'good').length;
  const fOn   = funnelRows.filter(r => r.status === 'ontrack').length;
  const fFoc  = funnelRows.filter(r => r.status === 'focus').length;

  tbody.innerHTML =
    sectionHeader('📊 Volume Metrics',    'volume', volumeRows.length, vGood, vOn, vFoc) +
    volumeRows.map((r, i) => dataRow(r, i, i, 'volume')).join('') +
    sectionHeader('🔁 Conversion Funnel', 'funnel', funnelRows.length, fGood, fOn, fFoc) +
    funnelRows.map((r, i) => dataRow(r, i, i, 'funnel')).join('');
}

function togglePerfSection(groupId) {
  const rows = document.querySelectorAll(`.perf-row-${groupId}`);
  const chevron = document.getElementById(`chevron-perf-${groupId}`);
  if (!rows.length) return;
  const isCollapsed = rows[0].classList.contains('hidden');
  rows.forEach(r => r.classList.toggle('hidden', !isCollapsed));
  if (chevron) chevron.style.transform = isCollapsed ? 'rotate(180deg)' : '';
}

function toggleStandupAdvancedFilter() {
  const panel = document.getElementById('standupAdvancedFilter');
  const btn   = document.getElementById('advFilterBtn');
  if (!panel) return;
  const isOpen = !panel.classList.contains('hidden');
  panel.classList.toggle('hidden', isOpen);
  // Make sure the table section is open so filter makes sense
  if (!isOpen) {
    const body = document.getElementById('body-standup');
    const chev = document.getElementById('chevron-standup');
    if (body && body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      if (chev) chev.style.transform = 'rotate(180deg)';
    }
  }
  if (btn) {
    btn.classList.toggle('bg-primary/10', !isOpen);
    btn.classList.toggle('text-primary',  !isOpen);
    btn.classList.toggle('border-primary/30', !isOpen);
  }
}

function applyStandupFilters() {
  renderStandupTable();
  // Show CA date filter info if set
  const from = document.getElementById('standupCADateFrom')?.value;
  const to   = document.getElementById('standupCADateTo')?.value;
  if (from || to) {
    const label = `CA Date: ${from || '…'} → ${to || '…'}`;
    showToast(`Filter applied — ${label}`, 'info');
  }
}

function resetStandupFilters() {
  const fields = ['standupIntake','standupCountry','standupCounsellorFilter','standupTLFilter','standupCADateFrom','standupCADateTo','standupServicingType'];
  fields.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  renderStandupTable({ intake:'', location:'', country:'', counsellor:'', tl:'', caDateFrom:'', caDateTo:'', servicingType:'' });
}

/* ── Standup Achv drill-down ── */
function showStandupDrillDown(key, name, period, achv, target, isPct, isCurrency) {
  function fv(v) { if (isCurrency) return '₹' + Number(v).toLocaleString('en-IN'); if (isPct) return v + '%'; return v; }
  const numA = parseFloat(String(achv).replace(/[^0-9.]/g,''));
  const numT = parseFloat(String(target).replace(/[^0-9.]/g,''));
  const pct  = numT > 0 ? Math.round((numA / numT) * 100) : (numA > 0 ? 100 : 0);
  const cls  = pct >= 80 ? 'text-success' : pct >= 50 ? 'text-accent' : 'text-danger';
  const breakdown = COUNSELORS.slice(0, 5).map((c, i) => {
    const factor = [1, 0.87, 0.72, 0.61, 0.45][i];
    const val = isCurrency ? Math.round(numA * factor) : isPct ? Math.round(numA * factor) : Math.round(numA * factor);
    const pctOf = numT > 0 ? Math.round((val / numT) * 100) : 0;
    const bc = pctOf >= 80 ? 'bg-green-100 text-success' : pctOf >= 50 ? 'bg-amber-100 text-accent' : 'bg-red-100 text-danger';
    return `<div class="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">${c.avatar}</div>
        <span class="text-sm font-medium text-text-main">${c.name}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-mono font-bold text-sm ${cls.replace('text-','text-')}">${fv(val)}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${bc}">${pctOf}%</span>
      </div>
    </div>`;
  }).join('');
  const content = `
    <div class="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
      <p class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">${name} — ${period}</p>
      <p class="font-mono text-3xl font-extrabold ${cls}">${fv(achv)}</p>
      <p class="text-xs text-text-muted mt-1">vs Target ${fv(target)} · <span class="${cls} font-semibold">${pct}% achieved</span></p>
    </div>
    <p class="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Counsellor Breakdown</p>
    <div>${breakdown}</div>
    <p class="text-[10px] text-text-muted mt-4 text-center italic">* Breakdown is indicative based on proportional distribution</p>`;
  state.drawerMode     = 'standupDrillDown';
  state.drawerPrevMode = 'standup';
  openDrawer(`${name} · ${period} Drill-Down`, content, true);
}

/* ── DP Upload ── */
function updateProfileDP(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const av = document.getElementById('profileAvatar');
    if (!av) return;
    av.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover rounded-full" alt="DP" />`;
    av.style.background = 'transparent';
    // Store on user
    if (state.currentUser) state.currentUser.photoUrl = e.target.result;
    // Update header avatar too
    const ha = document.getElementById('headerAvatar');
    if (ha) { ha.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover rounded-full" alt="" />`; ha.style.background = 'transparent'; }
    showToast('Profile photo updated!', 'success');
  };
  reader.readAsDataURL(file);
}

/* ═══════════════════════════════════════════════════════
   FEATURE H — SUMMARY TABLE FILTERS
═══════════════════════════════════════════════════════ */

function applySummaryFilters() {
  const intake  = document.getElementById('summaryIntake')?.value  || '';
  const country = document.getElementById('summaryCountry')?.value || '';
  // Reflect in URL
  const url = new URL(window.location.href);
  if (intake)  url.searchParams.set('intake',  intake);  else url.searchParams.delete('intake');
  if (country) url.searchParams.set('country', country); else url.searchParams.delete('country');
  window.history.replaceState({}, '', url.toString());
  // Re-render metric cards with filter label
  const label = [intake, country].filter(Boolean).join(' · ');
  showToast(label ? `Filters applied: ${label}` : 'All filters cleared — showing full data.', 'info');
  // In a real app this would re-query; here we just refresh metric cards
  renderMetricCards();
}

function resetSummaryFilters() {
  const fields = ['summaryIntake','summaryCountry'];
  fields.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const url = new URL(window.location.href);
  url.searchParams.delete('intake');
  url.searchParams.delete('country');
  window.history.replaceState({}, '', url.toString());
  renderMetricCards();
  showToast('Filters reset.', 'info');
}

/* ═══════════════════════════════════════════════════════
   FEATURE G — WHATSAPP HISTORY + CALL BUTTON
═══════════════════════════════════════════════════════ */

// Mock WhatsApp message history per student
const WA_MESSAGES = {
  U1001: [
    { dir:'sent',     text:'Hi Aarav! Just wanted to check in — have you had a chance to look at the MBA brochure I shared?', ts:'20 May, 11:45 AM', status:'read' },
    { dir:'received', text:'Yes! It looks great. I had a few questions about the fee structure.', ts:'20 May, 12:10 PM', status:'read' },
    { dir:'sent',     text:'Of course! Happy to walk you through it. Should I send the detailed fee breakdown?', ts:'20 May, 12:15 PM', status:'read' },
    { dir:'received', text:'Yes please, that would help a lot!', ts:'20 May, 12:20 PM', status:'read' },
    { dir:'sent',     text:'Sending it now. Also, I\'ve added you to the MBA Batch A group on WhatsApp — check it out! 🎓', ts:'20 May, 12:22 PM', status:'delivered' },
  ],
  U1002: [
    { dir:'sent',     text:'Hi Sanya, this is your counselor. We spoke yesterday. I\'m sending over the BBA application checklist.', ts:'19 May, 2:00 PM', status:'delivered' },
    { dir:'sent',     text:'📎 BBA_Application_Checklist_2026.pdf', ts:'19 May, 2:01 PM', status:'delivered' },
  ],
  U1003: [
    { dir:'sent',     text:'Rahul, sharing the payment link for your deposit here: https://pay.leap.in/xyz', ts:'21 May, 11:05 AM', status:'read' },
    { dir:'received', text:'Thanks! I\'ll make the payment by 23rd as discussed.', ts:'21 May, 11:30 AM', status:'read' },
    { dir:'sent',     text:'Perfect! Let me know if you face any issue. Looking forward to having you on board! 🎉', ts:'21 May, 11:32 AM', status:'read' },
  ],
};

function callStudent(studentId) {
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  const btn = document.getElementById(`callBtn-${studentId}`);
  if (btn) { btn.disabled = true; btn.textContent = 'Calling…'; }

  // Log call in activity
  const timestamp = new Date().toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
  s.activity.unshift({ type:'Call logged', time: timestamp, notes:'Outgoing — Initiated via Leap CRM' });

  // Resolve matching unhappy alert
  const alert = UNHAPPY_ALERTS.find(a => a.leadId === studentId && !a.resolved);
  if (alert) {
    setTimeout(() => {
      alert.resolved = true;
      renderAlertIcon();
      showToast(`Alert for ${s.name} auto-resolved — call logged.`, 'success');
    }, 1500);
  }

  setTimeout(() => {
    showToast(`Calling ${s.name}…`, 'info');
    // Open tel: link as fallback
    window.location.href = `tel:+919876543210`;
    if (btn) { btn.disabled = false; btn.textContent = '📞 Call'; }
  }, 300);
}

// Override openStudentDetail to include call button + WhatsApp history
const _origOpenStudentDetail = openStudentDetail;
function openStudentDetail(studentId) {
  // Only update prevMode when navigating INTO student detail for the first time.
  // Do NOT overwrite it when re-rendering from saveSubtask / toggleSubtask (already 'student').
  if (state.drawerMode !== 'student') {
    state.drawerPrevMode = state.drawerMode || null;
  }
  state.drawerMode = 'student';
  state.drawerOfferId = state.drawerOfferId || null;
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  state.drawerSelectedStudent = s;

  const stageOrder  = ['sti','application','deposit','lockin'];
  const stageIdx    = stageOrder.indexOf(s.stage);
  const stageLabels = ['STI','Application','Deposit','Lock-in'];
  const stageBar    = stageLabels.map((l,i) => `
    <div class="flex-1">
      <div class="stage-step ${i < stageIdx ? 'done' : i === stageIdx ? 'current' : ''}"></div>
      <p class="text-[10px] text-center mt-1 ${i <= stageIdx ? 'font-semibold text-text-main' : 'text-text-muted'}">${l}</p>
    </div>
  `).join('');

  const waRows = s.whatsappGroups.map(g => `
    <div class="text-xs flex gap-4 py-1 border-b border-border last:border-0">
      <span class="font-medium text-text-main flex-1">${g.groupName}</span>
      <span>${g.counselorJoined ? '✅ You' : '❌ You'}</span>
      <span>${g.studentJoined ? '✅ Student' : '❌ Student'}</span>
    </div>
  `).join('');

  const activityHtml = `
    <div class="activity-log pl-5">
      ${s.activity.map(a => `
        <div class="activity-item">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <p class="activity-time">${a.time}</p>
            <p class="activity-action">${a.type}</p>
            ${a.notes ? `<p class="activity-notes">${a.notes}</p>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const subtaskHtml = s.subtasks.map((t,idx) => `
    <div class="subtask-item ${t.done ? 'done' : ''}" onclick="toggleSubtask('${s.id}',${idx})">
      <input type="checkbox" ${t.done ? 'checked' : ''} onclick="event.stopPropagation();toggleSubtask('${s.id}',${idx})" />
      <div class="flex-1">
        <p class="text-sm font-medium ${t.done ? 'line-through text-text-muted' : 'text-text-main'}">${t.label}</p>
        ${t.done && t.timestamp ? `<p class="text-xs text-text-muted">${t.timestamp}${t.notes ? ' — ' + t.notes : ''}</p>` : ''}
      </div>
    </div>
    <div id="stform-${s.id}-${idx}" class="subtask-form hidden">
      <textarea id="stnotes-${s.id}-${idx}" placeholder="Notes… (required)" rows="2" class="w-full text-xs px-2 py-1.5 border border-border rounded-lg mb-2 resize-none focus:outline-none"></textarea>
      <div class="flex gap-2 mb-2">
        <select id="stoutcome-${s.id}-${idx}" class="flex-1 text-xs px-2 py-1.5 border border-border rounded-lg bg-white focus:outline-none">
          <option>Connected</option><option>Not Reachable</option><option>Callback Requested</option><option>Promise to Pay</option><option>Closed</option>
        </select>
        <input id="stdate-${s.id}-${idx}" type="date" placeholder="Follow-up date (required)" class="text-xs px-2 py-1.5 border border-border rounded-lg focus:outline-none" />
      </div>
      <p class="text-[10px] text-red-500 mb-1">* Notes and Follow-up Date are required</p>
      <button onclick="saveSubtask('${s.id}',${idx})" class="mt-1 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-lg cursor-pointer">Save</button>
    </div>
  `).join('');

  // WhatsApp history
  const waMsgs = WA_MESSAGES[studentId] || [];
  let waHistoryHtml = '';
  if (waMsgs.length) {
    const bubbles = waMsgs.map(m => {
      const cls = m.dir === 'sent' ? 'sent' : 'received';
      const wrap = m.dir === 'sent' ? 'wa-msg-sent' : 'wa-msg-received';
      const statusIcon = m.status === 'read' ? '✓✓' : m.status === 'delivered' ? '✓✓' : '✓';
      const statusColor = m.status === 'read' ? 'color:#34B7F1' : 'color:#94A3B8';
      return `<div class="${wrap}">
        <div class="wa-bubble ${cls}">
          <span>${escHtml(m.text)}</span>
          <span class="wa-ts">${m.ts} <span style="${statusColor}">${statusIcon}</span></span>
        </div>
      </div>`;
    }).join('');
    waHistoryHtml = `<div class="bg-[#ECE5DD] rounded-xl p-3 max-h-48 overflow-y-auto space-y-1">${bubbles}</div>`;
  } else {
    waHistoryHtml = `<p class="text-xs text-text-muted italic">No WhatsApp conversations yet.</p>`;
  }

  const content = `
    <!-- Stage Bar -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Current Stage</p>
      <div class="stage-bar">${stageBar}</div>
    </div>

    <!-- Info Grid -->
    <div class="grid grid-cols-2 gap-2 mb-4 text-xs">
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">User ID</p><p class="font-semibold">${s.id}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Course</p><p class="font-semibold">${s.course}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Country</p><p class="font-semibold text-primary">${s.country || '—'}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Last Call</p><p class="font-semibold">${s.lastCallDate} — ${s.lastCallOutcome}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Follow-up</p>
        <p class="font-semibold ${s.followup <= '2026-05-23' ? 'text-danger' : 'text-text-main'}">${s.followup}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">App Status</p>
        <p><span class="app-badge ${s.appDownloaded ? 'downloaded' : 'not-downloaded'}">${s.appDownloaded ? '📱 Downloaded' : '📵 Not Downloaded'}</span></p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Quality Score</p><p class="font-semibold">${s.qualityScore}/100</p></div>
      <div class="bg-surface rounded-lg p-2 col-span-2"><p class="text-text-muted">Last Connected</p><p class="font-semibold">${s.lastConnected}</p></div>
    </div>

    <!-- WhatsApp Groups -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-1 font-semibold uppercase tracking-wide">WhatsApp Groups</p>
      <div class="bg-surface rounded-lg p-2">${waRows}</div>
    </div>

    <!-- WhatsApp Message History -->
    <div class="mb-4">
      <button onclick="toggleWaHistory('${s.id}')" class="w-full flex items-center justify-between text-xs font-semibold text-text-muted uppercase tracking-wide mb-2 hover:text-text-main transition-colors cursor-pointer">
        <span>WhatsApp Messages${waMsgs.length ? ` (${waMsgs.length})` : ''}</span>
        <svg id="waChev-${s.id}" class="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div id="waHistory-${s.id}" class="hidden">${waHistoryHtml}</div>
    </div>

    <!-- Servicing Type -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Servicing Type</p>
      <div class="bg-surface rounded-xl p-3 space-y-2">
        <div>
          <label class="text-[11px] text-text-muted font-medium">Type <span class="text-red-500">*</span></label>
          <select id="st-type-${s.id}" onchange="updateServicingType('${s.id}')"
            class="w-full mt-1 text-sm px-3 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent">
            <option value="">-- Select Servicing Type --</option>
            <option value="partner"     ${s.servicingType === 'partner'     ? 'selected' : ''}>Free Service</option>
            <option value="non-partner" ${s.servicingType === 'non-partner' ? 'selected' : ''}>Paid Service</option>
          </select>
        </div>
        <div id="st-sub-${s.id}" class="${s.servicingType === 'non-partner' ? '' : 'hidden'}">
          <label class="text-[11px] text-text-muted font-medium">Sub Type <span class="text-red-500">*</span></label>
          <select id="st-subtype-${s.id}" onchange="updateServicingSubType('${s.id}')"
            class="w-full mt-1 text-sm px-3 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent">
            <option value="">-- Select Sub Type --</option>
            <option value="premium-universities"  ${s.nonPartnerSubType === 'premium-universities'  ? 'selected' : ''}>Premium Universities</option>
            <option value="specialised-services"  ${s.nonPartnerSubType === 'specialised-services'  ? 'selected' : ''}>Specialised Services</option>
            <option value="paid-application"      ${s.nonPartnerSubType === 'paid-application'      ? 'selected' : ''}>Paid Application</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Subtask Checklist -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Subtasks</p>
      <div id="subtaskList">${subtaskHtml}</div>
    </div>

    <!-- Activity Log -->
    <div>
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Activity Log</p>
      ${activityHtml}
    </div>
  `;

  // Open as full-page overlay instead of drawer
  const page = document.getElementById('studentDetailPage');
  if (!page) { openDrawer(s.name, content, true); return; }

  document.getElementById('sdpName').textContent = s.name;
  document.getElementById('sdpCallWrap').innerHTML = `
    <button id="callBtn-${s.id}" class="call-btn flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold" onclick="callStudent('${s.id}')">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
      Call
    </button>`;
  document.getElementById('sdpBody').innerHTML = content;
  page.classList.remove('hidden');
  page.scrollTop = 0;
}

function closeStudentDetailPage() {
  const page = document.getElementById('studentDetailPage');
  if (page) page.classList.add('hidden');
  // Restore the drawer the user came from
  const prev = state.drawerPrevMode;
  if (prev === 'boostSubCardView') {
    openBoostSubCard(state.drawerBoostSubCardId);
  } else if (prev === 'boostFunnel') {
    openBoostFunnelDrawer();
  } else if (prev === 'boost') {
    // Guard: only reopen if drawerBoostType is valid (avoid "null — Today(0)")
    if (state.drawerBoostType) {
      openBoostDrawer(state.drawerBoostType);
    }
  } else if (prev === 'volumeMetric') {
    openVolumeMetricDrawer(state.drawerVolumeMetricKey);
  } else if (prev === 'revenueSubCardView') {
    openRevenueSubCard(state.drawerRevenueSubCardId);
  } else if (prev === 'boostRevenue') {
    openBoostRevenueDrawer();
  } else if (prev === 'boostReferrals') {
    openBoostReferralsDrawer();
  } else if (prev === 'waGroup') {
    openWAGroupDetailsDrawer();
  } else if (prev === 'offer') {
    openOfferDrawer(state.drawerOfferId);
  } else if (prev === 'opportunity') {
    openOpportunityDrawer();
  }
  // If prev is null/unknown (e.g. opened from main screen), just close the page — no drawer to restore
}

/* ═══════════════════════════════════════════════════════
   WHATSAPP GROUPS DETAIL DRAWER
═══════════════════════════════════════════════════════ */

function openGroupsDetail(mode) {
  // mode: 'counselor' → show all groups, counselor join status
  //       'students'  → show groups where student is missing
  const students = getViewingStudents();

  // Collect all unique group entries across students
  const groupMap = {}; // groupName → { counselorJoined, students: [{name, joined}] }
  students.forEach(s => {
    s.whatsappGroups.forEach(g => {
      if (!groupMap[g.groupName]) {
        groupMap[g.groupName] = { groupName: g.groupName, counselorJoined: g.counselorJoined, students: [] };
      }
      groupMap[g.groupName].students.push({ name: s.name, id: s.id, joined: g.studentJoined });
      // Counselor join status — use latest value
      if (g.counselorJoined) groupMap[g.groupName].counselorJoined = true;
    });
  });

  const groups = Object.values(groupMap);

  if (mode === 'counselor') {
    const joined    = groups.filter(g => g.counselorJoined);
    const notJoined = groups.filter(g => !g.counselorJoined);

    const renderGroup = (g, cls) => `
      <div class="border border-border rounded-xl p-3 mb-2">
        <div class="flex items-center justify-between mb-1">
          <p class="font-semibold text-sm text-text-main">${escHtml(g.groupName)}</p>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${cls}">${g.counselorJoined ? '✅ You joined' : '❌ You not joined'}</span>
        </div>
        <p class="text-xs text-text-muted">${g.students.length} student${g.students.length !== 1 ? 's' : ''} in this group</p>
      </div>`;

    const content = `
      ${notJoined.length ? `<div class="mb-4">
        <p class="text-xs font-semibold text-danger uppercase tracking-wide mb-2">❌ Groups you haven't joined (${notJoined.length})</p>
        ${notJoined.map(g => renderGroup(g, 'bg-red-100 text-danger')).join('')}
      </div>` : ''}
      <div>
        <p class="text-xs font-semibold text-success uppercase tracking-wide mb-2">✅ Groups you've joined (${joined.length})</p>
        ${joined.map(g => renderGroup(g, 'bg-green-100 text-success')).join('')}
      </div>`;

    openDrawer('Your WhatsApp Groups', content, false);

  } else {
    // Students missing from groups
    const missingRows = [];
    groups.forEach(g => {
      const missing = g.students.filter(s => !s.joined);
      if (missing.length) {
        missingRows.push({ group: g.groupName, counselorJoined: g.counselorJoined, missing });
      }
    });

    const content = missingRows.length ? missingRows.map(r => `
      <div class="border border-border rounded-xl p-3 mb-3">
        <div class="flex items-center justify-between mb-2">
          <p class="font-semibold text-sm text-text-main">${escHtml(r.group)}</p>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${r.counselorJoined ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'}">${r.counselorJoined ? '✅ You joined' : '❌ You not joined'}</span>
        </div>
        <p class="text-xs font-semibold text-danger mb-1">${r.missing.length} student${r.missing.length !== 1 ? 's' : ''} not in group:</p>
        ${r.missing.map(s => `
          <div class="flex items-center justify-between py-1 border-t border-border text-xs">
            <span class="font-medium text-text-main">${escHtml(s.name)}</span>
            <button onclick="openStudentDetail('${s.id}')" class="text-accent font-semibold hover:underline cursor-pointer">View Lead →</button>
          </div>`).join('')}
      </div>`) .join('')
    : '<p class="text-sm text-success text-center py-8">All students are in their groups! 🎉</p>';

    openDrawer('Students Not in Groups', content, false);
  }
}

/* ═══════════════════════════════════════════════════════
   WA GROUP DETAILS DRAWER  (4 accordion sub-cards)
═══════════════════════════════════════════════════════ */

function openWAGroupDetailsDrawer() {
  const students = getViewingStudents();

  // Build flat list of student-group pairs
  const pairs = [];
  students.forEach(s => {
    s.whatsappGroups.forEach(g => {
      pairs.push({ student: s, group: g });
    });
  });

  // WA Group categories
  const activeGroups       = pairs.filter(p => p.group.counselorJoined && p.group.studentJoined);
  const inactiveGroups     = pairs.filter(p => !p.group.counselorJoined);
  const notJoinedGroups    = pairs.filter(p => !p.group.studentJoined);
  const notRepliedStudents = getWANotRepliedStudents();

  // Group Not Created / Counsellors Not Joined:
  // Students with NO whatsapp groups at all + students in groups where counselor hasn't joined
  const noGroupStudents   = students.filter(s => s.whatsappGroups.length === 0);
  const counselorNotJoined = inactiveGroups; // reuse: pairs where counselor hasn't joined
  // Build unique student list combining both
  const groupNotCreatedMap = new Map();
  noGroupStudents.forEach(s => groupNotCreatedMap.set(s.id, { student: s, reason: 'No group created', group: null }));
  counselorNotJoined.forEach(p => {
    if (!groupNotCreatedMap.has(p.student.id)) {
      groupNotCreatedMap.set(p.student.id, { student: p.student, reason: 'Counsellor not joined', group: p.group });
    }
  });
  const groupNotCreatedList = [...groupNotCreatedMap.values()];

  // Voice channel categories
  const missedCallStudents     = students.filter(s => ['Not Reachable', 'Callback Requested'].includes(s.lastCallOutcome));
  const escalationStudents     = students.filter(s => s.hasEscalation);

  /* ── row renderers ── */
  function waGroupRow(p) {
    const waLink = `https://wa.me/?text=${encodeURIComponent('Hi ' + p.student.name + ', joining you on the group now!')}`;
    return `
      <div class="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
        <div>
          <p class="text-xs font-semibold text-text-main">${escHtml(p.student.name)}</p>
          <p class="text-[10px] text-text-muted">${escHtml(p.group.groupName)}</p>
        </div>
        <div class="flex items-center gap-1.5">
          <a href="${waLink}" target="_blank" class="flex items-center gap-1 text-[10px] px-2 py-1 bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 rounded-lg font-semibold hover:bg-[#25D366]/20 transition-colors cursor-pointer">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.104.549 4.08 1.507 5.793L.057 23.25a.75.75 0 00.92.92l5.457-1.45A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.024-1.396l-.36-.215-3.735.99.99-3.735-.215-.36A9.75 9.75 0 1112 21.75z"/></svg>
            Open WA Group
          </a>
          <button onclick="openStudentDetail('${p.student.id}')" class="text-[10px] px-2 py-1 bg-primary/5 text-primary border border-primary/20 rounded-lg font-semibold hover:bg-primary/10 transition-colors cursor-pointer">View Lead →</button>
        </div>
      </div>`;
  }

  function waRepliedRow(s) {
    const msgs = WA_UNANSWERED[s.id] || [];
    const waLink = `https://wa.me/?text=${encodeURIComponent('Hi ' + s.name + ', following up on your question!')}`;
    return `
      <div class="flex items-start justify-between py-2 border-b border-border/50 last:border-0">
        <div class="flex-1 min-w-0 mr-2">
          <p class="text-xs font-semibold text-text-main">${escHtml(s.name)}</p>
          <p class="text-[10px] text-text-muted mb-1">${msgs.length} unanswered question${msgs.length !== 1 ? 's' : ''}</p>
          ${msgs.map(m => `<p class="text-[10px] text-amber-700 italic truncate">"${escHtml(m.question)}"</p>`).join('')}
        </div>
        <div class="flex flex-col gap-1 flex-shrink-0">
          <a href="${waLink}" target="_blank" class="flex items-center gap-1 text-[10px] px-2 py-1 bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 rounded-lg font-semibold hover:bg-[#25D366]/20 transition-colors cursor-pointer">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.104.549 4.08 1.507 5.793L.057 23.25a.75.75 0 00.92.92l5.457-1.45A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.024-1.396l-.36-.215-3.735.99.99-3.735-.215-.36A9.75 9.75 0 1112 21.75z"/></svg>
            Reply on WA
          </a>
          <button onclick="openStudentDetail('${s.id}')" class="text-[10px] px-2 py-1 bg-primary/5 text-primary border border-primary/20 rounded-lg font-semibold hover:bg-primary/10 transition-colors cursor-pointer">View Lead →</button>
        </div>
      </div>`;
  }

  function voiceRow(s, badge) {
    return `
      <div class="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
        <div>
          <p class="text-xs font-semibold text-text-main">${escHtml(s.name)}</p>
          <p class="text-[10px] text-text-muted">${s.id} · ${s.course}</p>
          <span class="inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${badge.cls}">${badge.label}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="openStudentDetail('${s.id}')" class="text-[10px] px-2 py-1 bg-primary/5 text-primary border border-primary/20 rounded-lg font-semibold hover:bg-primary/10 transition-colors cursor-pointer">View Lead →</button>
        </div>
      </div>`;
  }

  /* ── generic inner accordion (WA sub-items & voice sub-items) ── */
  function accordion(id, icon, title, count, colorCls, bgCls, borderCls, rows) {
    return `
      <div class="rounded-xl border ${borderCls} overflow-hidden mb-2">
        <button onclick="toggleWACard('${id}')" class="w-full flex items-center justify-between px-3 py-2.5 ${bgCls} hover:opacity-90 transition-opacity cursor-pointer">
          <div class="flex items-center gap-2">
            <span class="text-sm">${icon}</span>
            <span class="text-xs font-semibold ${colorCls}">${title}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-white/60 ${colorCls} font-bold">${count}</span>
          </div>
          <svg id="chevron-wa-${id}" class="w-3.5 h-3.5 ${colorCls} transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="wa-body-${id}" class="hidden px-3 pb-3 pt-1 bg-white">
          ${rows.length === 0
            ? `<p class="text-xs text-text-muted italic text-center py-3">All good here! 🎉</p>`
            : rows}
        </div>
      </div>`;
  }

  /* ── two top-level channel cards (collapsed by default) ── */
  function channelCard(id, icon, title, badge, borderCls, bgCls, headerColor, innerContent) {
    return `
      <div class="rounded-xl border ${borderCls} mb-3 shadow-sm">
        <button onclick="toggleCommCard('${id}')" class="w-full flex items-center justify-between px-4 py-3.5 ${bgCls} hover:opacity-90 transition-opacity cursor-pointer text-left">
          <div class="flex items-center gap-2.5">
            <span class="text-lg leading-none">${icon}</span>
            <div>
              <p class="text-sm font-bold ${headerColor}">${title}</p>
              <p class="text-[10px] ${headerColor} opacity-70 font-medium">${badge}</p>
            </div>
          </div>
          <svg id="chevron-comm-${id}" class="w-4 h-4 ${headerColor} transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="comm-body-${id}" class="hidden border-t ${borderCls} px-3 pb-3 pt-3 bg-white/60">
          ${innerContent}
        </div>
      </div>`;
  }

  /* ── Group Not Created / Counsellors Not Joined rows ── */
  const groupNotCreatedRows = groupNotCreatedList.map(item => {
    const s = item.student;
    const waLink = item.group
      ? `https://wa.me/?text=${encodeURIComponent('Hi ' + s.name + ', joining your group now!')}`
      : `https://wa.me/?text=${encodeURIComponent('Hi ' + s.name + ', please create a WhatsApp group!')}`;
    return `
      <div class="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
        <div class="flex-1 min-w-0 mr-2">
          <p class="text-xs font-semibold text-text-main">${escHtml(s.name)}</p>
          <p class="text-[10px] text-text-muted">${s.id} · ${s.course}</p>
          ${item.group ? `<p class="text-[10px] text-text-muted">${escHtml(item.group.groupName)}</p>` : ''}
          <span class="inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-200 text-red-800">${item.reason}</span>
        </div>
        <div class="flex flex-col gap-1 flex-shrink-0">
          <a href="${waLink}" target="_blank" class="flex items-center gap-1 text-[10px] px-2 py-1 bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 rounded-lg font-semibold hover:bg-[#25D366]/20 transition-colors cursor-pointer">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.104.549 4.08 1.507 5.793L.057 23.25a.75.75 0 00.92.92l5.457-1.45A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.024-1.396l-.36-.215-3.735.99.99-3.735-.215-.36A9.75 9.75 0 1112 21.75z"/></svg>
            ${item.group ? 'Open WA' : 'Message'}
          </a>
          <button onclick="openStudentDetail('${s.id}');state.drawerPrevMode='waGroup';" class="text-[10px] px-2 py-1 bg-primary/5 text-primary border border-primary/20 rounded-lg font-semibold hover:bg-primary/10 transition-colors cursor-pointer">View Lead →</button>
        </div>
      </div>`;
  }).join('');

  /* ── Info + Closure banners for each WA card ── */
  function waBanner(defText, closureText, defColor, closureColor) {
    return `
      <div class="mb-2.5 rounded-lg overflow-hidden border border-gray-100">
        <div class="px-2.5 py-2 bg-blue-50 border-b border-gray-100">
          <p class="text-[10px] font-bold text-blue-700 mb-0.5">ℹ️ Definition</p>
          <p class="text-[10px] text-blue-600 leading-relaxed">${defText}</p>
        </div>
        ${closureText ? `
        <div class="px-2.5 py-2 bg-green-50">
          <p class="text-[10px] font-bold text-green-700 mb-0.5">✅ Task Closure</p>
          <p class="text-[10px] text-green-600 leading-relaxed">${closureText}</p>
        </div>` : ''}
      </div>`;
  }

  const bannerActive     = waBanner('Counsellor/TL and student are both in the group and actively discussing every 4–5 days. Student is responsive and counsellor is also active.', null);
  const bannerInactive   = waBanner('No one has been responsive for a minimum of 4–5 days, or the student hasn\'t joined yet — excluding leads marked as Lead Drop off.', 'Counsellor sends a message in the group, OR marks the Lead Status as <strong>Permanent Drop off</strong>.');
  const bannerNotJoined  = waBanner('The group has been created but the student hasn\'t joined yet.', 'When the student joins the group.');
  const bannerReplied    = waBanner('Student sent a message in the group but neither the counsellor nor the TL/Manager replied within <strong>1 hour</strong>.', 'When either the counsellor or Manager replies to the student\'s query.');
  const bannerGroupNC    = waBanner('Counsellor is assigned for a lead but the counsellor hasn\'t joined the WhatsApp group yet, or no group has been created.', 'Group is created and the Counsellor has joined.');

  /* ── Non Voice: WA Group inner content ── */
  const nonVoiceInner = `
    <p class="text-[11px] text-text-muted mb-2.5">WhatsApp group activity across your student cohort.</p>
    ${accordion('active',    '✅', 'Active Groups',                         activeGroups.length,        'text-emerald-700', 'bg-emerald-50',  'border-emerald-200', bannerActive  + (activeGroups.length      ? activeGroups.map(p => waGroupRow(p)).join('')      : '<p class="text-xs text-text-muted italic text-center py-2">No active groups yet.</p>'))}
    ${accordion('inactive',  '⚠️', 'Inactive Groups',                       inactiveGroups.length,      'text-amber-700',   'bg-amber-50',    'border-amber-200',   bannerInactive + (inactiveGroups.length    ? inactiveGroups.map(p => waGroupRow(p)).join('')    : '<p class="text-xs text-text-muted italic text-center py-2">All groups are active! 🎉</p>'))}
    ${accordion('notjoined', '🚫', 'Students Not Joined Groups',            notJoinedGroups.length,     'text-orange-700',  'bg-orange-50',   'border-orange-200',  bannerNotJoined + (notJoinedGroups.length  ? notJoinedGroups.map(p => waGroupRow(p)).join('')  : '<p class="text-xs text-text-muted italic text-center py-2">All students have joined! 🎉</p>'))}
    ${accordion('replied',   '💬', 'Messages Not Replied',                  notRepliedStudents.length,  'text-red-700',     'bg-red-50',      'border-red-200',     bannerReplied   + (notRepliedStudents.length ? notRepliedStudents.map(s => waRepliedRow(s)).join('') : '<p class="text-xs text-text-muted italic text-center py-2">All messages replied! 🎉</p>'))}
    ${accordion('group-not-created', '🚨', 'Group Not Created / Counsellors Not Joined', groupNotCreatedList.length, 'text-red-800', 'bg-red-100', 'border-red-400', bannerGroupNC + (groupNotCreatedList.length ? groupNotCreatedRows : '<p class="text-xs text-text-muted italic text-center py-2">All counsellors have joined! 🎉</p>'))}`;


  /* ── Voice: Jerry Call inner content ── */
  const voiceInner = `
    <p class="text-[11px] text-text-muted mb-2.5">Call activity requiring follow-up action.</p>
    ${accordion('missed-calls', '📵', 'Missed Call Details', missedCallStudents.length, 'text-rose-700', 'bg-rose-50', 'border-rose-200',
      missedCallStudents.map(s => voiceRow(s, { label: s.lastCallOutcome, cls: 'bg-rose-100 text-rose-700' })).join(''))}
    ${accordion('escalations', '🚨', 'Escalation Through Support Ticket', escalationStudents.length, 'text-purple-700', 'bg-purple-50', 'border-purple-200',
      escalationStudents.map(s => voiceRow(s, { label: 'Escalation Raised', cls: 'bg-purple-100 text-purple-700' })).join(''))}`;

  /* ── Student Not Happy sub-card ── */
  const lowRatingStudents  = students.filter(s => s.islRating < 8 && !s.hasEscalation);
  const escalationStudents2 = students.filter(s => s.hasEscalation);
  const allUnhappy         = students.filter(s => s.islRating < 8 || s.hasEscalation);

  function _unhappyStudentCard(s) {
    const hasLowRating  = s.islRating < 8;
    const hasTicket     = s.hasEscalation;
    return `<div class="bg-white rounded-xl border border-border p-3 mb-2 last:mb-0">
      <div class="flex items-start justify-between gap-2 mb-2">
        <div>
          <p class="text-xs font-semibold text-text-main">${escHtml(s.name)}</p>
          <p class="text-[10px] text-text-muted">${s.id} · ${s.course}</p>
        </div>
        <button onclick="openStudentDetail('${s.id}');state.drawerPrevMode='waGroup';" class="text-[10px] px-2 py-1 bg-primary/5 text-primary border border-primary/20 rounded-lg font-semibold hover:bg-primary/10 cursor-pointer flex-shrink-0">View →</button>
      </div>
      ${hasLowRating ? `
        <div class="flex items-start gap-2 mb-1.5 p-2 bg-red-50 rounded-lg border border-red-100">
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 flex-shrink-0">ISL ${s.islRating}/10</span>
          <div>
            <p class="text-[10px] font-bold text-red-700 mb-0.5">Actionable</p>
            <p class="text-[10px] text-red-600 leading-snug">Student has given a low rating on ISL / F2F. <strong>Share a revised ISL and speak to the student</strong> to address their concerns and re-align on university choices.</p>
          </div>
        </div>` : ''}
      ${hasTicket ? `
        <div class="flex items-start gap-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 flex-shrink-0">Support Ticket</span>
          <div>
            <p class="text-[10px] font-bold text-purple-700 mb-0.5">Actionable</p>
            <p class="text-[10px] text-purple-600 leading-snug">Student has raised a query via support ticket. <strong>Speak to the student and close their issues</strong> — ensure all concerns are resolved before the next follow-up.</p>
          </div>
        </div>` : ''}
    </div>`;
  }

  const unhappyInner = `
    <p class="text-[11px] text-text-muted mb-2.5">Students who gave a low rating on ISL/F2F or raised a support ticket.</p>
    ${allUnhappy.length === 0
      ? `<p class="text-xs text-text-muted italic text-center py-6">No unhappy students right now 🎉</p>`
      : allUnhappy.map(s => _unhappyStudentCard(s)).join('')}`;

  const content = `
    <p class="text-xs text-text-muted mb-4">Students who need your immediate attention — unhappy cases and WA group activity.</p>
    ${channelCard('unhappy',   '🚨', 'Student Not Happy',   `${allUnhappy.length} students need attention`,  'border-red-200',     'bg-red-50',     'text-red-800',     unhappyInner)}
    ${channelCard('non-voice', '💬', 'WA Summary',          'WhatsApp Group Activity',                       'border-emerald-200', 'bg-emerald-50', 'text-emerald-800', nonVoiceInner)}
  `;

  state.drawerMode = 'waGroup';
  openDrawer('All About User — Immediate Attention Required', content, false);
}

function toggleWACard(id) {
  const body = document.getElementById(`wa-body-${id}`);
  const chevron = document.getElementById(`chevron-wa-${id}`);
  if (!body) return;
  const isHidden = body.classList.contains('hidden');
  body.classList.toggle('hidden', !isHidden);
  if (chevron) chevron.style.transform = isHidden ? 'rotate(180deg)' : '';
}

function toggleCommCard(id) {
  const body    = document.getElementById(`comm-body-${id}`);
  const chevron = document.getElementById(`chevron-comm-${id}`);
  if (!body) return;
  const isHidden = body.classList.contains('hidden');
  body.classList.toggle('hidden', !isHidden);
  if (chevron) chevron.style.transform = isHidden ? 'rotate(180deg)' : '';
}

/* ═══════════════════════════════════════════════════════
   STANDUP TABLE DRILL-DOWN
═══════════════════════════════════════════════════════ */

// Map standup metric keys to relevant student stages / fields
const STANDUP_STAGE_MAP = {
  leads:       null,          // all students
  isl_count:   null,
  isl_pending: 'sti',
  lockins:     'lockin',
  f2f:         null,
  walkin:      null,
  qa_shared:   null,
  college_fin: 'application',
  stis:        'sti',
  deposits:    'deposit',
  visas:       'lockin',
};

function openStandupDrillDown(metricName, metricKey) {
  const students = getViewingStudents();
  const stageFilter = STANDUP_STAGE_MAP[metricKey];
  const filtered = stageFilter ? students.filter(s => s.stage === stageFilter) : students;

  const stageLabel = { sti:'STI', application:'Application', deposit:'Deposit', lockin:'Lock-in' };

  const content = `
    <p class="text-xs text-text-muted mb-3">Students associated with <strong>${escHtml(metricName)}</strong>${stageFilter ? ` — stage: ${stageLabel[stageFilter] || stageFilter}` : ' (all pipeline)'}.</p>
    ${filtered.length === 0
      ? '<p class="text-sm text-text-muted text-center py-10">No students for this metric.</p>'
      : `<div class="space-y-3">${filtered.map(s => {
          const waIssue = s.whatsappGroups.some(g => !g.studentJoined);
          return `<div class="student-card cursor-pointer" onclick="openStudentDetail('${s.id}')">
            <div class="flex items-start justify-between mb-1">
              <div>
                <p class="font-semibold text-sm text-text-main">${escHtml(s.name)}</p>
                <p class="text-xs text-text-muted">${s.id} · ${s.course}</p>
              </div>
              <span class="app-badge ${s.appDownloaded ? 'downloaded' : 'not-downloaded'}">${s.appDownloaded ? '📱 App' : '📵 No App'}</span>
            </div>
            <div class="flex flex-wrap gap-3 text-xs text-text-muted">
              ${s.followup ? `<span>📅 ${s.followup}</span>` : ''}
              <span class="font-medium capitalize">${stageLabel[s.stage] || s.stage} stage</span>
              ${waIssue ? `<span class="text-accent">⚠ WA gap</span>` : ''}
            </div>
            <button class="mt-2 text-xs font-semibold text-accent hover:underline">Open Detail →</button>
          </div>`;
        }).join('')}</div>`
    }`;

  openDrawer(`${metricName} — Student List`, content, false);
}

function toggleWaHistory(studentId) {
  const hist = document.getElementById(`waHistory-${studentId}`);
  const chev = document.getElementById(`waChev-${studentId}`);
  if (!hist) return;
  const isHidden = hist.classList.contains('hidden');
  hist.classList.toggle('hidden', !isHidden);
  if (chev) chev.style.transform = isHidden ? 'rotate(180deg)' : '';
}
