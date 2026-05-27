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

const MONTHLY_EARNINGS = [18000,24000,31000,28000,36000,42000,38000,45000,51000,47000,38400,0];

const INCENTIVE_SLABS = [
  { component:'Calls Slab',      rule:'≥80% of 50 calls/day',  status:'45/50 (90%)',   earned: 8500 },
  { component:'Enrolment Bonus', rule:'₹6,000 per enrolment',  status:'4 enrolments',  earned:24000 },
  { component:'Revenue Bonus',   rule:'1% of revenue >₹2L',    status:'₹2.1L collected', earned:1000 },
];

const TRAINING_MODULES = [
  { id:'m1', name:'Sales Fundamentals', lessons:3, items:[
    { title:'Cold Calling Mastery',      desc:'Master the art of opening conversations.',    type:'Video'    },
    { title:'Objection Handling Guide',  desc:'Handling common objections with confidence.', type:'Document' },
    { title:'Follow-up Framework',       desc:'A systematic approach to follow-up.',         type:'Link'     },
  ]},
  { id:'m2', name:'Product Knowledge', lessons:3, items:[
    { title:'Course Catalogue 2025',     desc:'Complete overview of all courses & fees.',    type:'Document' },
    { title:'Scholarship Matrix',        desc:'Understanding scholarship eligibility.',       type:'Link'     },
    { title:'Demo Session Walkthrough',  desc:'How to run an effective product demo.',       type:'Video'    },
  ]},
  { id:'m3', name:'CRM & Tools', lessons:2, items:[
    { title:'Using EduCRM Effectively',  desc:'Tips for logging tasks & tracking perf.',     type:'Video'    },
    { title:'WhatsApp Communication SOP',desc:'Standard operating procedure for WA.',       type:'Document' },
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

/* ── Mock students for Priya Sharma (counselor id:1) ── */
const STUDENTS = [
  { id:'U1001', name:'Aarav Mehta',     course:'MBA Finance',      stage:'sti',         followup:'2026-05-25', appDownloaded:true,  lastCallDate:'20 May 2026', lastCallOutcome:'Connected', qualityScore:82, lastConnected:'20 May 2026 11:42 AM',
    whatsappGroups:[{ groupName:'MBA Batch A – Jun 2026', counselorJoined:true, studentJoined:true },{ groupName:'Finance Study Group', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'20 May 11:42 AM', notes:'Discussed fees', outcome:'Connected' }, { label:'Send a WhatsApp message', done:true, timestamp:'20 May 1:00 PM', notes:'Sent brochure', outcome:'Connected' }, { label:'Follow up on payment', done:false }, { label:'Book a session / demo', done:false }, { label:'Update application status', done:false }],
    activity:[{ type:'Call logged', time:'20 May 11:42 AM', notes:'Student interested, follow up on fee waiver' }, { type:'WhatsApp sent', time:'20 May 1:00 PM', notes:'Sent MBA brochure PDF' }] },
  { id:'U1002', name:'Sanya Kapoor',    course:'BBA Marketing',    stage:'application', followup:'2026-05-24', appDownloaded:false, lastCallDate:'19 May 2026', lastCallOutcome:'Not Reachable', qualityScore:65, lastConnected:'18 May 2026 4:15 PM',
    whatsappGroups:[{ groupName:'BBA General – Jun 2026', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'19 May 4:15 PM', notes:'Not reachable', outcome:'Not Reachable' }, { label:'Send a WhatsApp message', done:false }, { label:'Follow up on payment', done:false }, { label:'Book a session / demo', done:false }, { label:'Update application status', done:true, timestamp:'19 May 5:00 PM', notes:'Stage updated to application', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'19 May 4:15 PM', notes:'Not reachable — tried 3 times' }, { type:'Application updated', time:'19 May 5:00 PM', notes:'Marked as application submitted' }] },
  { id:'U1003', name:'Rahul Verma',     course:'B.Tech CSE',       stage:'deposit',     followup:'2026-05-23', appDownloaded:true,  lastCallDate:'21 May 2026', lastCallOutcome:'Promise to Pay', qualityScore:74, lastConnected:'21 May 2026 10:00 AM',
    whatsappGroups:[{ groupName:'CSE Batch Jun 2026', counselorJoined:true, studentJoined:true },{ groupName:'Tech Prep Group', counselorJoined:false, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'21 May 10:00 AM', notes:'Promised to pay by 23rd', outcome:'Promise to Pay' }, { label:'Follow up on payment', done:false }, { label:'Send a WhatsApp message', done:true, timestamp:'21 May 11:00 AM', notes:'Sent payment link', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'21 May 10:00 AM', notes:'Promised deposit by 23 May' }, { type:'WhatsApp sent', time:'21 May 11:00 AM', notes:'Payment link shared' }] },
  { id:'U1004', name:'Prerna Singh',    course:'MBA HR',            stage:'sti',         followup:'2026-05-26', appDownloaded:false, lastCallDate:'22 May 2026', lastCallOutcome:'Callback Requested', qualityScore:55, lastConnected:'22 May 2026 3:00 PM',
    whatsappGroups:[{ groupName:'MBA General – Jun 2026', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:false }, { label:'Send a WhatsApp message', done:false }, { label:'Book a session / demo', done:false }, { label:'Share a document / template', done:false }, { label:'Follow up on payment', done:false }],
    activity:[{ type:'Call logged', time:'22 May 3:00 PM', notes:'Requested callback at 5 PM tomorrow' }] },
  { id:'U1005', name:'Devansh Joshi',   course:'BCA Data Science',  stage:'lockin',      followup:'2026-05-24', appDownloaded:true,  lastCallDate:'21 May 2026', lastCallOutcome:'Connected', qualityScore:90, lastConnected:'21 May 2026 2:30 PM',
    whatsappGroups:[{ groupName:'BCA Batch A', counselorJoined:true, studentJoined:true }],
    subtasks:[{ label:'Follow up on payment', done:true, timestamp:'21 May 2:30 PM', notes:'Received offer, finalizing', outcome:'Connected' }, { label:'Update application status', done:true, timestamp:'21 May 3:00 PM', notes:'Shortlisted — awaiting lock-in payment', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'21 May 2:30 PM', notes:'Shortlisting offer shared, student reviewing' }, { type:'Application updated', time:'21 May 3:00 PM', notes:'Stage: Shortlisted — lock-in pending' }] },
  { id:'U1006', name:'Ishita Rawat',    course:'MBA Finance',       stage:'application', followup:'2026-05-27', appDownloaded:true,  lastCallDate:'20 May 2026', lastCallOutcome:'Connected', qualityScore:68, lastConnected:'20 May 2026 5:00 PM',
    whatsappGroups:[{ groupName:'MBA Batch A – Jun 2026', counselorJoined:true, studentJoined:true }],
    subtasks:[{ label:'Call the student', done:true, timestamp:'20 May 5:00 PM', notes:'Submitted application', outcome:'Connected' }, { label:'Send a WhatsApp message', done:true, timestamp:'20 May 5:30 PM', notes:'Sent next steps doc', outcome:'Connected' }, { label:'Follow up on payment', done:false }],
    activity:[{ type:'Call logged', time:'20 May 5:00 PM', notes:'Application submitted successfully' }, { type:'WhatsApp sent', time:'20 May 5:30 PM', notes:'Next steps document shared' }] },
  { id:'U1007', name:'Karan Tiwari',    course:'B.Com',             stage:'sti',         followup:'2026-05-28', appDownloaded:false, lastCallDate:'22 May 2026', lastCallOutcome:'Not Reachable', qualityScore:40, lastConnected:'19 May 2026 11:00 AM',
    whatsappGroups:[{ groupName:'B.Com General', counselorJoined:true, studentJoined:false },{ groupName:'Finance Study Group', counselorJoined:true, studentJoined:false }],
    subtasks:[{ label:'Call the student', done:false }, { label:'Send a WhatsApp message', done:false }, { label:'Book a session / demo', done:false }],
    activity:[{ type:'Call logged', time:'22 May 9:00 AM', notes:'Not reachable for 3 days' }] },
  { id:'U1008', name:'Meenal Shah',     course:'MBA Marketing',     stage:'deposit',     followup:'2026-05-25', appDownloaded:true,  lastCallDate:'22 May 2026', lastCallOutcome:'Connected', qualityScore:79, lastConnected:'22 May 2026 12:00 PM',
    whatsappGroups:[{ groupName:'MBA Batch B – Jun 2026', counselorJoined:true, studentJoined:true }],
    subtasks:[{ label:'Follow up on payment', done:false }, { label:'Call the student', done:true, timestamp:'22 May 12:00 PM', notes:'Confirming deposit timeline', outcome:'Connected' }],
    activity:[{ type:'Call logged', time:'22 May 12:00 PM', notes:'Deposit expected by 25 May' }] },
];

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
    keywords: ['incentive','slab','bonus','earning','salary','kitna milega','kitna kamaonga','paise','commission','kya milega'],
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
  clarify_before_answering: {
    keywords: ['help me', "i'm stuck", 'im stuck', 'something wrong', "something's wrong", 'i need help'],
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
  drawerSelectedStudent: null,
  drawerPrevMode: null,
  selectedSubtask: null,
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

  // Admin tab
  if (role === 'ops_admin') {
    document.getElementById('adminTabBtn').classList.remove('hidden');
  }

  // Counselor selector
  if (role !== 'counselor') {
    const wrapper = document.getElementById('counselorSelectorWrapper');
    wrapper.classList.remove('hidden');
    const sel = document.getElementById('counselorSelector');
    sel.innerHTML = '';
    let list = (role === 'team_lead')
      ? COUNSELORS.filter(c => c.team === state.currentUser.team)
      : COUNSELORS;
    list.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name + ' (' + c.team + ')';
      sel.appendChild(opt);
    });
    sel.value = state.viewingCounselorId;
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

  // Bot bubble visibility
  if (BOT_SETTINGS.enabled) {
    document.getElementById('botBubble').classList.remove('hidden');
  }

  renderAll();
  switchTab('tab1');
}

function onCounselorChange() {
  state.viewingCounselorId = parseInt(document.getElementById('counselorSelector').value);
  renderAll();
}

function renderAll() {
  renderBadgeStrip();
  renderBoostCards();
  renderWhatsappCoverage();
  renderMetricCards();
  renderHistoryTable();
  renderLeaderboard();
  renderSlabTable();
  renderOffersRow();
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
  renderStandupTable();
  renderAlertIcon();
}

/* ═══════════════ TAB SWITCHING ═══════════════ */

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
  const students = getViewingStudents();
  const boosts = [
    { type:'sti',         label:'Boost STI',         count: students.filter(s => s.stage === 'sti').length,         desc:'No STI yet' },
    { type:'application', label:'Boost Application',  count: students.filter(s => s.stage === 'application').length, desc:'STI done, no app' },
    { type:'deposit',     label:'Boost Deposit',      count: students.filter(s => s.stage === 'deposit').length,     desc:'App done, no deposit' },
    { type:'lockin',      label:'Boost Lock-in',      count: students.filter(s => s.stage === 'lockin').length,      desc:'Offer received, no payment' },
  ];
  const grid = document.getElementById('boostCardsGrid');
  grid.innerHTML = boosts.map(b => `
    <div class="boost-card ${b.type}" onclick="openBoostDrawer('${b.type}')">
      <div class="text-xs font-semibold text-text-muted uppercase tracking-wide">${b.label}</div>
      <div class="boost-count">${b.count}</div>
      <div class="text-xs text-text-muted mb-3">${b.count === 1 ? '1 student' : b.count + ' students'}</div>
      <a class="text-xs font-semibold text-accent hover:underline">View All →</a>
    </div>
  `).join('');
}

function getViewingStudents() {
  // v1: all students are Priya's. In real app, filter by viewingCounselorId
  return STUDENTS;
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
  el.innerHTML = `
    <div class="wa-chip ok">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      Groups counselor joined: ${counselorJoined}/${totalGroups}
    </div>
    <div class="wa-chip ${studentMissing > 0 ? 'warn' : 'ok'}">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      Students NOT in group: ${studentMissing}
    </div>
  `;
}

/* ═══════════════ METRIC CARDS ═══════════════ */

function renderMetricCards() {
  const c = getCounselorData();
  const totalStudents = getViewingStudents().length;
  const convPct = (v) => totalStudents ? Math.round((v / totalStudents) * 100) : 0;

  const volumeMetrics = [
    { label:'STIs Submitted',        value:c.stis,         target:TARGETS.stis,       extra:`${convPct(c.stis)}% of CA`,  unit:'' },
    { label:'Applications Submitted', value:c.applications, target:TARGETS.applications,extra:`${convPct(c.applications)}% of CA`, unit:'' },
    { label:'Deposits Collected',     value:c.deposits,     target:TARGETS.deposits,   extra:`${convPct(c.deposits)}% of CA`,  unit:'' },
    { label:'Lock-ins Achieved',      value:c.lockins,      target:TARGETS.lockins,    extra:`${convPct(c.lockins)}% of CA`,   unit:'' },
    { label:'Tasks Completed',        value:c.tasks,        target:TARGETS.tasks,      extra:`${fmtPct(c.tasks, TARGETS.tasks)}% of daily target`, unit:'' },
  ];

  const qualityMetrics = [
    { label:'Revenue Collected',      value:c.revenueCollected, target:TARGETS.revenue_target, extra:'', unit:'₹', isCurrency:true },
    { label:'F2F Discussions',        value:c.f2f,          target:TARGETS.f2f,        extra:`${fmtPct(c.f2f, TARGETS.f2f)}% of target`, unit:'' },
    { label:'ISL Feedback Rating',    value:c.isl,          target:5,                  extra:`${Math.round((c.isl/5)*100)}%`, unit:'', isRating:true },
    { label:'Referral % from CA',     value:c.referralPct,  target:TARGETS.referral,   extra:`${c.referralPct}% of assigned`, unit:'', isPct:true },
    { label:'Quality Score',          value:null,           target:100,                extra:'', unit:'', isDual:true, q1:c.q1score, q2:c.q2score },
  ];

  renderMetricGrid('volumeMetrics', volumeMetrics);
  renderMetricGrid('qualityMetrics', qualityMetrics);
}

function renderMetricGrid(elId, metrics) {
  const el = document.getElementById(elId);
  el.innerHTML = metrics.map(m => {
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
    const cls = colorClass(m.isDual ? pct : pct);
    return `
      <div class="metric-card ${cls} rounded-xl border p-4 cursor-default">
        <div class="metric-deco"></div>
        <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">${m.label}</p>
        ${m.isDual
          ? `<p class="font-mono text-lg font-bold metric-value" style="line-height:1.2">${m.q1}% <span class="text-text-muted text-sm font-normal">1st</span></p>
             <p class="font-mono text-lg font-bold metric-value" style="line-height:1.2">${m.q2}% <span class="text-text-muted text-sm font-normal">2nd</span></p>`
          : `<p class="font-mono text-2xl font-bold metric-value" id="mv_${elId}_${m.label.replace(/\s/g,'_')}">${displayVal}</p>`}
        <p class="text-xs text-text-muted mt-1">${subText}</p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden mr-2">
            <div class="h-full rounded-full ${cls === 'green' ? 'bg-success' : cls === 'amber' ? 'bg-accent' : 'bg-danger'}" style="width:${Math.min(m.isDual ? pct : pct, 100)}%"></div>
          </div>
          <span class="text-xs font-bold ${cls === 'green' ? 'text-success' : cls === 'amber' ? 'text-accent' : 'text-danger'}">${m.isDual ? pct : pct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

function getCounselorData() {
  const c = COUNSELORS.find(x => x.id === state.viewingCounselorId) || COUNSELORS[0];
  return c.today;
}

/* ═══════════════ LOG TASK ═══════════════ */

function logTask() {
  const type  = document.getElementById('taskType').value;
  const notes = document.getElementById('taskNotes').value.trim();
  const inc = { calls:1, leads:1, enrolments:1, revenue:10000, followups:1, stis:1, applications:1, deposits:1, lockins:1 };
  const c = COUNSELORS.find(x => x.id === state.viewingCounselorId) || COUNSELORS[0];
  if (c.today[type] !== undefined) c.today[type] += inc[type] || 1;
  if (c.today.tasks !== undefined) c.today.tasks += 1;
  showToast(`Task logged: ${document.getElementById('taskType').selectedOptions[0].text}${notes ? ' — ' + notes : ''}`, 'success');
  document.getElementById('taskNotes').value = '';
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

function switchLeader(period, btn) {
  state.leaderPeriod = period;
  document.querySelectorAll('#tab1 .period-btn').forEach((b,i) => { if(i>=3) b.classList.remove('active'); });
  btn.classList.add('active');
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
  grid.innerHTML = metrics.map(m => {
    const ranked = COUNSELORS.map((c,i) => ({
      name: c.name,
      val: Math.round((m.key === 'revenue' ? c.today.revenueCollected : c.today[m.key] || c.today.calls) * offsets[i] * pMult),
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
  tbody.innerHTML = INCENTIVE_SLABS.map(s => `
    <tr>
      <td class="py-2.5 font-medium text-text-main">${s.component}</td>
      <td class="py-2.5 text-text-muted text-xs">${s.rule}</td>
      <td class="py-2.5"><span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-success">${s.status}</span></td>
      <td class="py-2.5 text-right font-mono font-bold text-success">${fmt(s.earned)}</td>
    </tr>
  `).join('');
}

/* ═══════════════ EARNINGS CHART ═══════════════ */

function initEarningsChart() {
  if (state.earningsChart) return;
  const ctx = document.getElementById('earningsChart');
  if (!ctx) return;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const colors = MONTHLY_EARNINGS.map((v,i) => i === 10 ? '#16A34A' : (v === 0 ? '#E2E8F0' : '#1D4ED8'));
  state.earningsChart = new Chart(ctx, {
    type:'bar',
    data:{ labels:months, datasets:[{ data:MONTHLY_EARNINGS, backgroundColor:colors, borderRadius:6, borderSkipped:false }] },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label: ctx => fmt(ctx.parsed.y) } } },
      scales:{
        y:{ ticks:{ callback:v => fmt(v), font:{family:'Fira Code',size:11} }, grid:{color:'#E2E8F0'} },
        x:{ grid:{display:false}, ticks:{font:{family:'Poppins',size:11}} }
      }
    }
  });
}

/* ═══════════════ EARNERS LEADERBOARD ═══════════════ */

function renderEarnersLeaderboard() {
  renderEarnerList('earnerMonthList', EARNER_SEED_MONTH);
  renderEarnerList('earnerAllList', EARNER_SEED_ALLTIME);
}

function renderEarnerList(elId, seeds) {
  const ranked = COUNSELORS.map((c,i) => ({ name:c.name, avatar:c.avatar, val:seeds[i] }))
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

/* ═══════════════ QUICK LINKS V1 (Tab 3) ═══════════════ */

function renderQuickLinks() {
  const links = [
    {
      id:'session', icon:'🎥', color:'bg-blue-50',
      label: detectPlatform(QUICK_LINK_URLS.session) + ' — Join Session',
      desc:`Click to join the configured ${detectPlatform(QUICK_LINK_URLS.session)} session`,
      action:`openQuickLink('session')`
    },
    {
      id:'sheet', icon:'📊', color:'bg-green-50',
      label:'Templates Sheet — Open Templates',
      desc:'Access the shared Google Sheet with all templates and SOPs',
      action:`openQuickLink('sheet')`
    },
    {
      id:'support', icon:'🎫', color:'bg-orange-50',
      label:'Support — Raise a Request',
      desc:'Submit a ticket to the ops team for help with data, incentives, or issues',
      action:`openTicketModal()`
    },
  ];
  const grid = document.getElementById('quickLinksV1');
  grid.innerHTML = links.map(l => `
    <div class="quick-link-v1" onclick="${l.action}">
      <div class="ql-icon ${l.color} text-2xl">${l.icon}</div>
      <p class="font-semibold text-text-main text-sm">${l.label}</p>
      <p class="text-xs text-text-muted">${l.desc}</p>
    </div>
  `).join('');
}

function openQuickLink(type) {
  const url = QUICK_LINK_URLS[type];
  if (url) showToast(`Opening ${type === 'session' ? 'video session' : 'templates sheet'}…`, 'info');
  else showToast('URL not configured. Ask your ops admin.', 'warning');
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

function renderTrainingModules() {
  const el = document.getElementById('trainingModules');
  el.innerHTML = TRAINING_MODULES.map(m => `
    <div class="border border-border rounded-xl overflow-hidden">
      <button onclick="toggleModule('${m.id}')"
        class="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-border/50 transition-colors cursor-pointer">
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span class="font-semibold text-sm text-text-main">${m.name}</span>
          <span class="text-xs text-text-muted">${m.lessons} lessons</span>
        </div>
        <svg id="chevron-${m.id}" class="w-4 h-4 text-text-muted transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div id="module-${m.id}" class="module-body">
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
    </div>
  `).join('');
}

function toggleModule(id) {
  const body = document.getElementById('module-' + id);
  const chev = document.getElementById('chevron-' + id);
  body.classList.toggle('open');
  chev.style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
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
  requestAnimationFrame(() => { drawer.classList.add('open'); });
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

function drawerGoBack() {
  if (state.drawerPrevMode === 'boost') {
    openBoostDrawer(state.drawerBoostType);
  } else if (state.drawerPrevMode === 'offer') {
    openOfferDrawer(state.drawerOfferId);
  } else if (state.drawerPrevMode === 'opportunity') {
    openOpportunityDrawer();
  }
}

/* Boost Drawer */
function openBoostDrawer(type) {
  state.drawerMode     = 'boost';
  state.drawerBoostType = type;
  const students = getViewingStudents().filter(s => s.stage === type);
  const labels   = { sti:'Boost STI', application:'Boost Application', deposit:'Boost Deposit', lockin:'Boost Lock-in' };
  const title    = `${labels[type]} — ${students.length} student${students.length !== 1 ? 's' : ''}`;

  const content = `
    <div class="mb-4">
      <input type="text" placeholder="Search by name or ID…" oninput="filterStudentList(this.value, '${type}')"
        class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
    </div>
    <div id="studentListInner" class="space-y-3">${renderStudentList(students)}</div>
  `;
  openDrawer(title, content, false);
}

function filterStudentList(q, type) {
  const students = getViewingStudents().filter(s => s.stage === type && (
    s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())
  ));
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
  state.drawerPrevMode = state.drawerMode || 'boost';
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
      <textarea placeholder="Notes…" rows="2" class="w-full text-xs px-2 py-1.5 border border-border rounded-lg mb-2 resize-none focus:outline-none"></textarea>
      <div class="flex gap-2">
        <select class="flex-1 text-xs px-2 py-1.5 border border-border rounded-lg bg-white focus:outline-none">
          <option>Connected</option><option>Not Reachable</option><option>Callback Requested</option><option>Promise to Pay</option><option>Closed</option>
        </select>
        <input type="date" class="text-xs px-2 py-1.5 border border-border rounded-lg focus:outline-none" />
      </div>
      <button onclick="saveSubtask('${s.id}',${idx})" class="mt-2 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-lg cursor-pointer">Save</button>
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
  const s = STUDENTS.find(x => x.id === studentId);
  if (!s) return;
  s.subtasks[idx].done = true;
  s.subtasks[idx].timestamp = '23 May 4:00 PM';
  s.subtasks[idx].notes = 'Task completed';
  s.activity.unshift({ type:s.subtasks[idx].label, time:'23 May 4:00 PM', notes:'Task completed' });
  showToast('Subtask saved!', 'success');
  openStudentDetail(studentId);
}

/* Opportunity Drawer */
function openOpportunityDrawer() {
  state.drawerMode     = 'opportunity';
  state.drawerPrevMode = null;
  const students = getViewingStudents();
  const byStage = { sti:[], application:[], deposit:[], lockin:[] };
  students.forEach(s => { if (byStage[s.stage]) byStage[s.stage].push(s); });
  const stageOrder = ['lockin','deposit','application','sti'];
  const stageLabels = { sti:'Boost STI', application:'Boost Application', deposit:'Boost Deposit', lockin:'Boost Lock-in' };
  const totalVal = students.reduce((sum, s) => sum + (s.course.includes('MBA') ? 120000 : s.course.includes('B.Tech') ? 100000 : 80000), 0);

  let content = `<div class="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-xl">
    <p class="text-xs text-text-muted">Total Opportunity</p>
    <p class="font-mono text-2xl font-bold text-accent">${fmt(totalVal)}</p>
  </div>`;

  stageOrder.forEach(stage => {
    const list = byStage[stage];
    if (!list.length) return;
    content += `<div class="mb-4">
      <p class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">${stageLabels[stage]}</p>
      ${list.map(s => {
        const fee = s.course.includes('MBA') ? 120000 : s.course.includes('B.Tech') ? 100000 : 80000;
        return `<div class="flex items-center gap-3 py-2 border-b border-border last:border-0">
          <div class="flex-1">
            <p class="text-sm font-medium text-text-main">${s.name}</p>
            <p class="text-xs text-text-muted">${s.id} · ${s.course}</p>
          </div>
          <span class="font-mono text-sm font-bold text-success">${fmt(fee)}</span>
          <button onclick="openStudentDetail('${s.id}');state.drawerPrevMode='opportunity';" class="text-xs font-semibold text-primary hover:underline cursor-pointer">Go to Task →</button>
        </div>`;
      }).join('')}
    </div>`;
  });

  openDrawer('Opportunity Pipeline', content, false);
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

  document.getElementById('profileAvatar').textContent = u.avatar || initials(u.name);
  document.getElementById('profileName').textContent   = u.name;
  document.getElementById('profileDesig').textContent  = u.designation || 'Counselor';
  document.getElementById('profileJoining').textContent = u.joiningDate || '—';
  document.getElementById('profileTeam').textContent    = u.team || '—';
  document.getElementById('profileManager').textContent = u.manager || '—';
  document.getElementById('profileRatingNum').textContent = `⭐ ${ratingFixed} / 10`;

  // Stars
  const ratingEl = document.getElementById('profileRating');
  ratingEl.innerHTML = Array.from({length:5}, (_,i) =>
    `<span class="text-xl ${i < stars ? 'text-gold' : 'text-gray-300'}">★</span>`).join('');

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
  }
});

['ticketModal','addUserModal','createOfferModal','awardBadgeModal'].forEach(id => {
  document.addEventListener('click', (e) => {
    const el = document.getElementById(id);
    if (el && !el.classList.contains('hidden') && e.target === el) el.classList.add('hidden');
  });
});

function submitTicket() {
  const subj = document.getElementById('ticketSubject').value.trim();
  const desc = document.getElementById('ticketDesc').value.trim();
  if (!subj || !desc) { showToast('Please fill in all fields.', 'error'); return; }
  showToast('Support request submitted! We\'ll get back to you soon.', 'success');
  closeModal('ticketModal');
  document.getElementById('ticketSubject').value = '';
  document.getElementById('ticketDesc').value    = '';
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
    requestAnimationFrame(() => panel.classList.add('open'));
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
  // Check each intent's keywords
  for (const [intent, data] of Object.entries(BOT_INTENT_MAP)) {
    if (intent === 'fallback') continue;
    for (const kw of data.keywords) {
      if (lower.includes(kw)) {
        // Extract entity for college_info
        let entity = '';
        if (intent === 'college_info') {
          entity = INFO_HUB_DATA.find(u => lower.includes(u.name.split(' ')[1]?.toLowerCase() || u.name.toLowerCase()))?.name || '';
          // Try to find any university name mentioned
          for (const uni of INFO_HUB_DATA) {
            const words = uni.name.toLowerCase().split(' ');
            if (words.some(w => w.length > 4 && lower.includes(w))) { entity = uni.name; break; }
          }
        }
        return { intent, entity };
      }
    }
  }
  return { intent: 'fallback', entity: '' };
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

  // Navigation confirm button
  if (data.navLabel && data.navAction) {
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

const FLOW_INTENTS = ['start_my_day', 'connect_business_team', 'clarify_before_answering'];
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
  if (intent === 'start_my_day')            handleStartMyDayStep(null);
  else if (intent === 'connect_business_team') handleConnectBusinessTeamStep(null);
  else if (intent === 'clarify_before_answering') {
    bc.collected.originalMessage = userText;
    handleClarifyStep(null);
  }
}

function handleFlowStep(userText) {
  removeTypingIndicator();
  const flow = state.botConversation.flow;
  if (flow === 'start_my_day')              handleStartMyDayStep(userText);
  else if (flow === 'connect_business_team') handleConnectBusinessTeamStep(userText);
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

  if (bc.step === 0) {
    const c = getCounselorData();
    const metrics = [
      { label:'STIs',         actual:c.stis,         target:TARGETS.stis,         navType:'sti'         },
      { label:'Applications', actual:c.applications, target:TARGETS.applications, navType:'application' },
      { label:'Deposits',     actual:c.deposits,     target:TARGETS.deposits,     navType:'deposit'     },
      { label:'Lock-ins',     actual:c.lockins,      target:TARGETS.lockins,      navType:'lockin'      },
    ];
    metrics.forEach(m => { m.pct = Math.round((m.actual / m.target) * 100); });
    metrics.sort((a, b) => {
      const pri = m => m.pct < 60 ? 0 : m.pct < 100 ? 1 : 2;
      return pri(a) - pri(b);
    });

    const allGreen = metrics.every(m => m.pct >= 100);
    if (allGreen) {
      const msg = "You're doing great across all metrics! Keep the momentum going. Here's your task board:";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => switchTab('tab1'), 400);
      endFlow();
      return;
    }

    const emo = p => p >= 100 ? '🟢' : p >= 60 ? '🟡' : '🔴';
    const sts = p => p >= 100 ? 'great work!' : p >= 60 ? 'on track' : 'needs attention';
    const lines = metrics.map(m => `${emo(m.pct)} ${m.label}: ${m.actual} / ${m.target} (${m.pct}%) — ${sts(m.pct)}`).join('\n');

    const urgent = metrics[0];
    const waitCount = getViewingStudents().filter(s => s.stage === urgent.navType).length;
    const boostLabel = `Boost ${urgent.label}`;

    const msgText = `Good morning! Here's where things stand for you today:\n${lines}\n\nMy suggestion: start with **${boostLabel}** — you have ${waitCount} student${waitCount !== 1 ? 's' : ''} waiting there. Want me to take you there now?`;

    bc.collected.urgentNavType = urgent.navType;
    bc.collected.boostLabel = boostLabel;
    bc.step = 1;

    appendBotMessageLive(`<p>${formatBotText(msgText)}</p>`);
    addToHistory('bot', msgText);
    appendQuickReplies([`→ Yes, take me to ${boostLabel}`, `I'll explore myself`]);

  } else if (bc.step === 1) {
    const lower = userText.toLowerCase();
    const isYes = lower.includes('yes') || lower.includes('take me') || lower.includes('→') || lower.includes('yeah');

    if (isYes) {
      const navType = bc.collected.urgentNavType;
      const msg = "Here you go! This is where you can start. Good luck today. 💪";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => { switchTab('tab1'); setTimeout(() => openBoostDrawer(navType), 300); }, 300);
    } else {
      const msg = "No worries! Tab 1 is your starting point. Have a great day.";
      appendBotMessageLive(`<p>${escHtml(msg)}</p>`);
      addToHistory('bot', msg);
      setTimeout(() => switchTab('tab1'), 300);
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
    } else {
      renderBotResponse(intent, entity);
      maybeAddFollowUp(intent);
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
        if (state.botConversation.flow) handleFlowStep(label);
      }, 400);
    }, { once: true });
    row.appendChild(btn);
  });

  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
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
  state = { role:'counselor', currentUser:null, viewingCounselorId:1, historyPeriod:'7d', leaderPeriod:'today', currentTab:'tab1', currentAdminPanel:'users', loginAttempts:0, lockedUntil:null, earningsChart:null, drawerMode:null, drawerBoostType:null, drawerSelectedStudent:null, drawerPrevMode:null, selectedSubtask:null, botOpen:false, botActiveTab:'chat', chatPanel:{ unreadCount:0, lastOpenedAt:null }, botConversation:{ flow:null, step:0, collected:{}, history:[], lastIntent:null, shownFollowUps:[] } };
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

/* ═══════════════════════════════════════════════════════
   FEATURE F — STAND UP METRICS TABLE
═══════════════════════════════════════════════════════ */

const STANDUP_METRICS = [
  { name:'Total Leads',               key:'leads'        },
  { name:'Total ISL',                 key:'isl_count'    },
  { name:'ISL Pending',               key:'isl_pending'  },
  { name:'Total Lock In',             key:'lockins'      },
  { name:'Total F2F',                 key:'f2f'          },
  { name:'Total Walk In',             key:'walkin'       },
  { name:'Total Q&A Shared',          key:'qa_shared'    },
  { name:'Total College Finalisation',key:'college_fin'  },
  { name:'Total STI',                 key:'stis'         },
  { name:'Total Deposits',            key:'deposits'     },
  { name:'Total Visas',               key:'visas'        },
];

function generateStandupData(filters) {
  const c = getCounselorData();
  // Base daily actuals — use real data where available, mock the rest
  const base = {
    leads: 30, isl_count: Math.round(c.isl * 5), isl_pending: 8,
    lockins: c.lockins, f2f: c.f2f, walkin: 2,
    qa_shared: 12, college_fin: 3, stis: c.stis,
    deposits: c.deposits, visas: 1,
  };
  // Apply lightweight filter noise for realism
  const multiplier = filters.country && filters.country !== '' ? 0.6 : 1;
  const locMult    = filters.location === 'online' ? 0.7 : filters.location === 'branch' ? 0.85 : 1;

  return STANDUP_METRICS.map((m, i) => {
    const daily  = Math.round((base[m.key] || 5) * multiplier * locMult);
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
    const ytdCls = ytdPct >= 100 ? 'standup-ach-green' : ytdPct >= 60 ? 'standup-ach-amber' : 'standup-ach-red';
    const mtdCls = mtdPct >= 100 ? 'standup-ach-green' : mtdPct >= 60 ? 'standup-ach-amber' : 'standup-ach-red';
    return { ...m, tYTD, tMTD, aYTD, aMTD, Y, Y1, Y2, W0, W01, M01, ytdCls, mtdCls };
  });
}

function renderStandupTable(filterData) {
  const filters = filterData || {
    intake:   document.getElementById('standupIntake')?.value   || '',
    location: document.getElementById('standupLocation')?.value || '',
    country:  document.getElementById('standupCountry')?.value  || '',
  };
  const data = generateStandupData(filters);
  const tbody = document.getElementById('standupTableBody');
  const empty = document.getElementById('standupEmpty');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  tbody.innerHTML = data.map((row, i) => `
    <tr class="hover:bg-surface/50 transition-colors">
      <td class="px-3 py-2 font-medium text-text-main sticky left-0 bg-white whitespace-nowrap">${i+1}. ${row.name}</td>
      <td class="px-2 py-2 text-right font-mono text-text-muted">${row.tYTD}</td>
      <td class="px-2 py-2 text-right font-mono text-text-muted">${row.tMTD}</td>
      <td class="px-2 py-2 text-right font-mono font-semibold"><span class="${row.ytdCls} standup-link" onclick="showToast('Drill-down coming soon','info')">${row.aYTD}</span></td>
      <td class="px-2 py-2 text-right font-mono font-semibold"><span class="${row.mtdCls} standup-link" onclick="showToast('Drill-down coming soon','info')">${row.aMTD}</span></td>
      <td class="px-2 py-2 text-right font-mono text-text-main">${row.Y}</td>
      <td class="px-2 py-2 text-right font-mono text-text-muted">${row.Y1}</td>
      <td class="px-2 py-2 text-right font-mono text-text-muted">${row.Y2}</td>
      <td class="px-2 py-2 text-right font-mono text-text-muted">${row.W0}</td>
      <td class="px-2 py-2 text-right font-mono text-text-muted">${row.W01}</td>
      <td class="px-2 py-2 text-right font-mono text-text-muted">${row.M01}</td>
    </tr>
  `).join('');
}

function applyStandupFilters() {
  renderStandupTable();
}

function resetStandupFilters() {
  const fields = ['standupIntake','standupLocation','standupCountry'];
  fields.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  renderStandupTable({ intake:'', location:'', country:'' });
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
  state.drawerPrevMode = state.drawerMode || 'boost';
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
      <textarea placeholder="Notes…" rows="2" class="w-full text-xs px-2 py-1.5 border border-border rounded-lg mb-2 resize-none focus:outline-none"></textarea>
      <div class="flex gap-2">
        <select class="flex-1 text-xs px-2 py-1.5 border border-border rounded-lg bg-white focus:outline-none">
          <option>Connected</option><option>Not Reachable</option><option>Callback Requested</option><option>Promise to Pay</option><option>Closed</option>
        </select>
        <input type="date" class="text-xs px-2 py-1.5 border border-border rounded-lg focus:outline-none" />
      </div>
      <button onclick="saveSubtask('${s.id}',${idx})" class="mt-2 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-lg cursor-pointer">Save</button>
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
    <!-- Call Button Header -->
    <div class="flex items-center justify-between mb-4 p-3 bg-surface rounded-xl border border-border">
      <div>
        <p class="text-xs text-text-muted">Quick Actions</p>
        <p class="text-xs font-medium text-text-main mt-0.5">Call or message ${s.name.split(' ')[0]}</p>
      </div>
      <button id="callBtn-${s.id}" class="call-btn" onclick="callStudent('${s.id}')">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        📞 Call
      </button>
    </div>

    <!-- Stage Bar -->
    <div class="mb-4">
      <p class="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wide">Current Stage</p>
      <div class="stage-bar">${stageBar}</div>
    </div>

    <!-- Info Grid -->
    <div class="grid grid-cols-2 gap-2 mb-4 text-xs">
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">User ID</p><p class="font-semibold">${s.id}</p></div>
      <div class="bg-surface rounded-lg p-2"><p class="text-text-muted">Course</p><p class="font-semibold">${s.course}</p></div>
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

function toggleWaHistory(studentId) {
  const hist = document.getElementById(`waHistory-${studentId}`);
  const chev = document.getElementById(`waChev-${studentId}`);
  if (!hist) return;
  const isHidden = hist.classList.contains('hidden');
  hist.classList.toggle('hidden', !isHidden);
  if (chev) chev.style.transform = isHidden ? 'rotate(180deg)' : '';
}
