import resumePdf from '../../resume/ayush_kumar_full_stack_developer.pdf?url'

export const profile = {
  name: 'Ayush Kumar',
  role: 'Software Engineer',
  subrole: 'Backend & Full-Stack Developer',
  location: 'Noida, India',
  email: 'ayush.kumar.devmail@gmail.com',
  phone: '+91-8434332269',
  heroLine1: 'I engineer reliable',
  heroLine2Plain: 'backend systems',
  heroLine2Accent: 'built to scale.',
  heroSummary:
    "Full-stack engineer at DS Group with 2.5+ years shipping production software — payment and payout platforms handling 10L+ daily transactions, 250+ REST APIs, and microservices serving 100K+ customers. I care about clean architecture, fast APIs and code that's easy to trust.",
  resumeUrl: resumePdf,
  resumeFileName: 'Ayush_Kumar_Full_Stack_Developer_Resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ayushkumar1240' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-kumar-b66a42221/' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Ayushkumar1240/' },
  ],
}

export const heroStats = [
  { value: 100, suffix: 'K+', label: 'customers served' },
  { value: 10, suffix: 'L+', label: 'daily payouts processed' },
  { value: 250, suffix: '+', label: 'REST APIs shipped' },
  { value: 2.5, suffix: '+ yrs', label: 'building production systems' },
]

export const principles = [
  {
    index: '01',
    title: 'Simple systems scale further.',
    detail:
      'I reach for proven, well-understood tools before clever ones. Fewer moving parts means faster debugging, easier handovers and fewer surprises in production — and that matters more than elegance when real customers depend on it.',
  },
  {
    index: '02',
    title: 'If it touches money, it gets tested twice.',
    detail:
      "Payment and payout code doesn't get the benefit of the doubt. Not after building the kind of systems where a rounding bug isn't a bug report, it's a reconciliation meeting.",
  },
  {
    index: '03',
    title: 'Delete before you add.',
    detail:
      'The best refactor I shipped this year removed more code than it wrote. Fewer moving parts, fewer 2am pages, fewer things to explain to the next person.',
  },
  {
    index: '04',
    title: 'Ship it, then make it fast.',
    detail:
      "Premature optimization is still the root of most of my regrets. I'd rather profile a real bottleneck than guess at one that looks impressive in a design doc.",
  },
]

export const aboutParagraphs = [
  "I like the unglamorous half of engineering — the payout that has to reconcile, the migration that can't drop a row, the API that still responds when a flash sale sends it 10x traffic. Most of my 2.5 years at DS Group has gone into exactly that: turning a legacy PHP monolith into microservices, and keeping payment and loyalty platforms honest at a scale most side projects never see.",
  "When I'm not shipping production code, I'm usually deep in a LeetCode streak I'm too stubborn to break (671 problems and counting), or over-engineering something that didn't need it — a habit I'm actively trying to unlearn. I studied Computer Science at GLA University, but most of what I actually use I picked up by being the person on call when a system that couldn't afford to be wrong, was.",
]

export const aboutStats = [
  { value: '10,000+', label: 'concurrent users supported' },
  { value: '65%', label: 'faster queries via caching + indexing' },
  { value: '60%', label: 'shorter deployment cycles' },
  { value: '150+', label: 'VAPT findings remediated' },
]

export const experience = [
  {
    company: 'DS Group',
    stack: ['Node.js', 'TypeScript', 'React', 'Angular', 'MySQL', 'Redis', 'AWS', 'Docker', 'Jenkins', 'Nginx'],
    role: 'Software Engineer',
    period: 'Mar 2024 — Present',
    location: 'Noida, India',
    lede:
      "This is where most of my production scars come from — six-plus live applications, real money moving through real pipes, and enough incidents to make me quietly paranoid about idempotency.",
    points: [
      'Own end-to-end engineering delivery across 6+ production applications spanning e-commerce, loyalty, payments, logistics and HR — from technical design through deployment and production support.',
      'Scaled backend systems to support 100K+ customers and 10,000+ concurrent users, with production workloads processing 10L+ daily payout transactions.',
      'Drove modernization of legacy PHP systems into independently deployable microservices, improving release velocity and fault isolation.',
      'Own secure payment and payout workflows across Razorpay, PayU and Worldline — reconciliation, fraud prevention, reliable disbursement at scale.',
      'Designed and maintained 250+ REST APIs and third-party integrations across commerce, loyalty, payments and logistics.',
      'Reduced deployment cycle time by 60% by standardizing CI/CD across AWS, Docker, Jenkins, PM2 and Nginx.',
      'Remediated 150+ high-severity VAPT findings, raising auth, payment and API layers to OWASP-aligned standards.',
      'Led team-level project execution — breaking down technical work, unblocking teammates, reviewing solutions across concurrent deliverables.',
    ],
  },
]

export const education = {
  school: 'GLA University, Mathura',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2020 — 2024',
  detail: 'CGPA 7.88 / 10',
}

export const achievements = [
  {
    title: 'Star Performer — 2025-2026',
    detail: 'Recognized for engineering contribution, ownership and delivery impact at DS Group.',
  },
  {
    title: '671+ LeetCode problems solved',
    detail: 'Across Data Structures, Algorithms and SQL — 500 Days badge plus daily/annual challenge badges.',
  },
]

export type ProjectCategory = 'frontend' | 'backend' | 'mobile' | 'payments' | 'integrations' | 'infra'

export const projectFilters: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'payments', label: 'Payments' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'infra', label: 'Infrastructure' },
]

// Simplified, original architecture sketches. Coordinates live in a 400 x 240 viewBox.
export type DiagramNode = {
  id: string
  label: string
  x: number
  y: number
  kind: 'client' | 'service' | 'data' | 'external'
}
export type Diagram = { nodes: DiagramNode[]; edges: [string, string][] }

export type Project = {
  slug: string
  name: string
  period: string
  hook: string
  description: string
  role: string
  challenge: string
  categories: ProjectCategory[]
  points: string[]
  stack: string[]
  metrics: { value: string; label: string }[]
  diagram: Diagram
}

export const projects: Project[] = [
  {
    slug: 'rajnigandha-loyalty-crm',
    name: 'Rajnigandha Loyalty & CRM Platform',
    period: 'Mar 2024 — Present',
    hook: "The project that taught me microservices aren't a buzzword when 10 lakh payouts a day depend on getting the boundaries right.",
    description:
      'Decomposed a legacy PHP monolith into independently deployable Node.js microservices powering a large-scale loyalty program — user management, coupon validation, reward distribution and payments.',
    role: 'Backend engineering — service boundaries, caching layer, payout workflows and integrations.',
    challenge: 'Splitting a live PHP monolith into services without a single payout going out twice — or not at all.',
    categories: ['backend', 'payments', 'integrations'],
    diagram: {
      nodes: [
        { id: 'web', label: 'React app', x: 52, y: 120, kind: 'client' },
        { id: 'users', label: 'users-svc', x: 170, y: 40, kind: 'service' },
        { id: 'coupons', label: 'coupon-svc', x: 170, y: 93, kind: 'service' },
        { id: 'rewards', label: 'reward-svc', x: 170, y: 146, kind: 'service' },
        { id: 'pay', label: 'payout-svc', x: 170, y: 200, kind: 'service' },
        { id: 'redis', label: 'Redis', x: 290, y: 66, kind: 'data' },
        { id: 'mysql', label: 'MySQL', x: 290, y: 140, kind: 'data' },
        { id: 'rzp', label: 'Razorpay', x: 296, y: 210, kind: 'external' },
        { id: 'shop', label: 'Shopify/SAP', x: 352, y: 22, kind: 'external' },
      ],
      edges: [['web', 'users'], ['web', 'coupons'], ['web', 'rewards'], ['rewards', 'pay'], ['users', 'redis'], ['coupons', 'redis'], ['rewards', 'mysql'], ['pay', 'mysql'], ['pay', 'rzp'], ['users', 'shop']],
    },
    points: [
      'Designed a multi-layer Redis caching strategy combined with query indexing and connection pooling on MySQL.',
      'Engineered idempotent reward-redemption and payout workflows with retry handling and reconciliation logic for 10L+ daily UPI/bank-transfer payouts.',
      'Built Shopify REST/GraphQL and SAP integrations for real-time order, invoice and customer sync.',
      'Extended CRM workflows with Freshdesk, cutting support response time from 48 hours to under 6.',
    ],
    stack: ['Node.js', 'React.js', 'TypeScript', 'MySQL', 'Redis', 'Microservices', 'Razorpay', 'Shopify', 'SAP'],
    metrics: [
      { value: '65%', label: 'query time reduced' },
      { value: '55%', label: 'faster high-frequency reads' },
      { value: '40%+', label: 'API throughput gain' },
    ],
  },
  {
    slug: 'ksheer-ovino-dairy',
    name: 'Ksheer & OVINO — Enterprise Dairy E-Commerce',
    period: 'Jul 2024 — Present',
    hook: "Dairy delivery doesn't sound exciting until you're the one making sure 50,000 subscriptions don't silently fail to renew.",
    description:
      'Backend and platform engineering for customer-facing dairy e-commerce — catalogue, checkout, subscriptions, delivery scheduling, refunds and admin operations, built to scale with the business.',
    role: 'Backend & platform engineering — checkout, subscriptions, payment retries and Angular admin tooling.',
    challenge: 'Recurring auto-pay across three gateways, where a silent renewal failure means a customer gets no milk tomorrow.',
    categories: ['backend', 'frontend', 'payments'],
    diagram: {
      nodes: [
        { id: 'store', label: 'Storefront', x: 50, y: 70, kind: 'client' },
        { id: 'admin', label: 'Angular admin', x: 58, y: 180, kind: 'client' },
        { id: 'api', label: 'Node API', x: 180, y: 125, kind: 'service' },
        { id: 'subs', label: 'subscriptions', x: 300, y: 70, kind: 'service' },
        { id: 'db', label: 'MSSQL', x: 300, y: 180, kind: 'data' },
        { id: 'gw', label: 'Razorpay · PayU · Worldline', x: 300, y: 20, kind: 'external' },
      ],
      edges: [['store', 'api'], ['admin', 'api'], ['api', 'subs'], ['api', 'db'], ['subs', 'gw'], ['subs', 'db']],
    },
    points: [
      'Scaled the platform from 2,000+ to 50,000+ customers as daily GMV grew from ~₹20K to ₹3L+.',
      'Implemented recurring subscription and auto-pay workflows with retry logic across Razorpay, PayU and Worldline.',
      'Built Angular-based admin workflows for catalogue, orders, delivery ops and customer management.',
      'Contributed an AI-assisted logistics workflow to reduce manual coordination across delivery processes.',
    ],
    stack: ['Node.js', 'Angular', 'TypeScript', 'MSSQL', 'Razorpay', 'PayU', 'Worldline', 'Jenkins', 'Nginx'],
    metrics: [
      { value: '25x', label: 'customer growth' },
      { value: '15x', label: 'daily GMV growth' },
      { value: '1,000+', label: 'daily orders handled' },
    ],
  },
  {
    slug: 'dsphere',
    name: 'DSphere — Employee Self-Service Platform',
    period: 'Aug 2025 — Present',
    hook: 'HR software that ex-employees actually don\'t mind using — a surprisingly high bar to clear.',
    description:
      'A multi-module self-service portal for employees and ex-employees — HR documents, SLA-driven ticketing, approval hierarchies and a department-wise admin panel with a superadmin tier.',
    role: 'Full-stack — ticketing and approval workflows, auth, RBAC and the admin panel.',
    challenge: 'One portal, four access tiers, and sensitive employee data that must never leak across them.',
    categories: ['frontend', 'backend'],
    diagram: {
      nodes: [
        { id: 'emp', label: 'Employees', x: 50, y: 50, kind: 'client' },
        { id: 'ex', label: 'Ex-employees', x: 56, y: 120, kind: 'client' },
        { id: 'adm', label: 'HR admin', x: 48, y: 190, kind: 'client' },
        { id: 'auth', label: 'JWT + RBAC', x: 175, y: 120, kind: 'service' },
        { id: 'tix', label: 'ticketing · SLA', x: 300, y: 70, kind: 'service' },
        { id: 'docs', label: 'documents', x: 300, y: 170, kind: 'service' },
        { id: 'db', label: 'MySQL · Oracle', x: 300, y: 222, kind: 'data' },
      ],
      edges: [['emp', 'auth'], ['ex', 'auth'], ['adm', 'auth'], ['auth', 'tix'], ['auth', 'docs'], ['docs', 'db'], ['tix', 'db']],
    },
    points: [
      'Automated 200+ recurring HR requests per month through self-service workflows.',
      'Designed HR ticketing with SLA-based status tracking (Pending, In Progress, Breached, Resolved).',
      'Built a signup approval workflow so new registrations are held for HR review before access is granted.',
      'Implemented JWT authentication and RBAC across sensitive employee-data APIs.',
    ],
    stack: ['Node.js', 'React.js', 'Vue.js', 'MySQL', 'Oracle DB', 'JWT', 'RBAC', 'PM2', 'Nginx'],
    metrics: [
      { value: '200+', label: 'requests automated / mo' },
      { value: '4', label: 'access tiers' },
    ],
  },
  {
    slug: 'farm-connect',
    name: 'Farm Connect — Field Operations Platform',
    period: 'Dec 2024 — Present',
    hook: '500 field agents, patchy rural connectivity, and a mobile app that still has to work.',
    description:
      'A field-operations platform combining Flutter mobile workflows with React-based administration for centralized data management across field agents.',
    role: 'Mobile & backend — Flutter field app, GPS tracking, notifications and the React admin.',
    challenge: 'Keeping 500+ field agents productive on patchy rural networks without losing visit data.',
    categories: ['mobile', 'frontend', 'backend'],
    diagram: {
      nodes: [
        { id: 'app', label: 'Flutter app', x: 60, y: 60, kind: 'client' },
        { id: 'gps', label: 'GPS', x: 40, y: 140, kind: 'client' },
        { id: 'api', label: 'Express API', x: 200, y: 100, kind: 'service' },
        { id: 'fcm', label: 'Firebase FCM', x: 200, y: 200, kind: 'external' },
        { id: 'db', label: 'MySQL', x: 330, y: 60, kind: 'data' },
        { id: 'admin', label: 'React admin', x: 330, y: 160, kind: 'client' },
      ],
      edges: [['app', 'api'], ['gps', 'api'], ['api', 'db'], ['api', 'fcm'], ['fcm', 'app'], ['admin', 'api']],
    },
    points: [
      'Built a Flutter app used by 500+ field agents for real-time data tracking, visit logging and order management.',
      'Implemented GPS-based location tracking for daily movement and route visibility.',
      'Added an event-driven notification layer via Firebase Cloud Messaging.',
      'Resolved VAPT findings across authentication and API layers before production rollout.',
    ],
    stack: ['Flutter', 'React.js', 'Node.js', 'Express.js', 'MySQL', 'Firebase', 'JWT'],
    metrics: [
      { value: '500+', label: 'field agents' },
      { value: 'GPS', label: 'live route tracking' },
    ],
  },
  {
    slug: 'internal-event-management',
    name: 'Internal Event Management Platform',
    period: 'Jun 2024 — Sep 2024',
    hook: 'The internal tool that finally ended the "wait, is this room booked?" Slack thread.',
    description:
      'An internal event-booking platform with concurrency-safe slot booking, dynamic rescheduling and a visitor management system — replacing manual scheduling coordination.',
    role: 'Full-stack — booking engine, rescheduling logic, visitor management and deployment.',
    challenge: 'Two people clicking the same seat in the same second — and only one of them getting it.',
    categories: ['backend', 'frontend', 'infra'],
    diagram: {
      nodes: [
        { id: 'ui', label: 'Vue.js UI', x: 50, y: 120, kind: 'client' },
        { id: 'nginx', label: 'Nginx', x: 145, y: 120, kind: 'service' },
        { id: 'book', label: 'booking-svc', x: 255, y: 70, kind: 'service' },
        { id: 'vis', label: 'visitor-svc', x: 255, y: 175, kind: 'service' },
        { id: 'db', label: 'Oracle DB', x: 355, y: 120, kind: 'data' },
      ],
      edges: [['ui', 'nginx'], ['nginx', 'book'], ['nginx', 'vis'], ['book', 'db'], ['vis', 'db']],
    },
    points: [
      'Designed a slot booking system with concurrency control to prevent double bookings on the same seat and slot.',
      'Supported dynamic slot editing, deletion and rescheduling based on real-time availability.',
      'Built a visitor management system to track incoming and outgoing visitor records.',
      'Deployed with Git-based workflows, PM2 and Nginx for stable production performance.',
    ],
    stack: ['Node.js', 'Vue.js', 'Oracle DB', 'Git', 'PM2', 'Nginx'],
    metrics: [
      { value: '0', label: 'double bookings' },
      { value: 'Real-time', label: 'availability engine' },
    ],
  },
  {
    slug: 'rajanigandha-retails',
    name: 'Rajanigandha Retails — Microservices Re-architecture',
    period: 'Apr 2025 — Present',
    hook: 'Ripping a monolith apart is easy. Keeping the payouts flowing while you do it is the actual job.',
    description:
      'Re-architected a legacy PHP monolith into isolated MERN-stack microservices for user management, coupon validation, reward distribution and payment processing.',
    role: 'Backend & infrastructure — service decomposition, redemption engine, AWS deployment pipeline.',
    challenge: 'Ripping the monolith apart while payouts keep flowing — and proving every rupee reconciled.',
    categories: ['backend', 'payments', 'infra', 'integrations'],
    diagram: {
      nodes: [
        { id: 'ci', label: 'Jenkins', x: 44, y: 30, kind: 'service' },
        { id: 'docker', label: 'Docker · EC2', x: 160, y: 30, kind: 'service' },
        { id: 'web', label: 'React', x: 44, y: 140, kind: 'client' },
        { id: 'redeem', label: 'redemption', x: 160, y: 140, kind: 'service' },
        { id: 'db', label: 'MySQL', x: 280, y: 100, kind: 'data' },
        { id: 's3', label: 'S3', x: 360, y: 100, kind: 'data' },
        { id: 'rzp', label: 'Razorpay', x: 280, y: 200, kind: 'external' },
        { id: 'fd', label: 'Freshdesk', x: 160, y: 215, kind: 'external' },
      ],
      edges: [['ci', 'docker'], ['docker', 'redeem'], ['web', 'redeem'], ['redeem', 'db'], ['db', 's3'], ['redeem', 'rzp'], ['redeem', 'fd']],
    },
    points: [
      'Built a secure reward-redemption engine supporting UPI and bank transfers with PAN validation.',
      'Integrated Razorpay to handle 10L+ daily payouts with reconciliation and fraud checks.',
      'Scaled to 10,000+ users by optimizing MySQL query plans, indexes and connection pooling.',
      'Integrated Freshdesk to automate ticket creation, tracking and resolution.',
    ],
    stack: ['React.js', 'Node.js', 'MySQL', 'AWS EC2', 'AWS S3', 'Docker', 'Jenkins'],
    metrics: [
      { value: '10L+', label: 'daily payouts' },
      { value: '10,000+', label: 'concurrent users' },
    ],
  },
]

export const skillsIntro =
  "The stack changes project to project. The instinct to reach for the boring, reliable tool first doesn't."

export type SkillCategory = {
  id: string
  label: string
  layer: string
  blurb: string
  items: { name: string; note: string }[]
}

export const languages = ['JavaScript', 'TypeScript', 'Java', 'Python', 'Go', 'Dart', 'PHP', 'SQL']

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    layer: 'Web clients',
    blurb: 'Admin panels and customer-facing apps — mostly where operations teams spend their whole day.',
    items: [
      { name: 'React.js', note: 'Loyalty, retail and field-ops admin panels; component-driven dashboards.' },
      { name: 'Angular', note: 'Catalogue, order, delivery and customer admin workflows for the dairy platforms.' },
      { name: 'Vue.js', note: 'Event booking UI and parts of the employee self-service portal.' },
      { name: 'TypeScript', note: 'Default for anything that lives longer than a sprint, on both sides of the API.' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    layer: 'Mobile',
    blurb: 'Apps that have to keep working when the network does not.',
    items: [
      { name: 'Flutter', note: 'Field app for 500+ agents — visit logging, order capture, live route tracking.' },
      { name: 'Firebase', note: 'Event-driven push notifications through Firebase Cloud Messaging.' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    layer: 'APIs & services',
    blurb: 'Where I spend most of my time: 250+ REST APIs, service boundaries and the retry logic nobody sees.',
    items: [
      { name: 'Node.js', note: 'Primary runtime for microservices, payout workers and integration jobs.' },
      { name: 'Express.js', note: 'HTTP layer for most services — thin routes, validation at the edge.' },
      { name: 'Go', note: 'Lightweight, concurrent services and tooling — goroutines and channels where throughput matters.' },
      { name: 'Microservices', note: 'Decomposed legacy PHP monoliths into independently deployable services.' },
      { name: 'GraphQL', note: 'Shopify Admin GraphQL for order, invoice and customer sync.' },
      { name: 'Spring Boot', note: 'Java services and coursework — comfortable reading and extending it.' },
    ],
  },
  {
    id: 'data',
    label: 'Databases',
    layer: 'Data',
    blurb: 'Query plans, indexes and caches — the 65% query-time reduction came from here, not from new hardware.',
    items: [
      { name: 'MySQL', note: 'Loyalty and retail data; index tuning, query plans and connection pooling.' },
      { name: 'Redis', note: 'Multi-layer cache in front of MySQL for high-frequency reads; idempotency keys.' },
      { name: 'MSSQL', note: 'Order, subscription and delivery data for the dairy e-commerce platforms.' },
      { name: 'Oracle DB', note: 'Enterprise HR and event-booking data with strict consistency needs.' },
      { name: 'MongoDB', note: 'Document storage for MERN-stack services.' },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    layer: 'Third-party',
    blurb: 'Payment gateways and enterprise systems — the parts of the stack you do not control but still own.',
    items: [
      { name: 'Razorpay', note: '10L+ daily payouts with reconciliation, fraud checks and webhook handling.' },
      { name: 'PayU', note: 'Subscription auto-pay with retry logic for recurring dairy orders.' },
      { name: 'Worldline', note: 'Third gateway for checkout and recurring payments.' },
      { name: 'Shopify', note: 'REST and GraphQL integrations for real-time commerce sync.' },
      { name: 'SAP', note: 'Order, invoice and customer sync between commerce and ERP.' },
      { name: 'Freshdesk', note: 'Automated ticket creation — support response from 48h to under 6h.' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    layer: 'Delivery',
    blurb: 'Standardised pipelines that cut deployment cycle time by 60%.',
    items: [
      { name: 'AWS', note: 'EC2 for services, S3 for storage and assets.' },
      { name: 'Docker', note: 'Containerised services for consistent builds across environments.' },
      { name: 'Jenkins', note: 'CI/CD pipelines from push to production.' },
      { name: 'Nginx', note: 'Reverse proxy, TLS termination and routing in front of Node services.' },
      { name: 'PM2', note: 'Process management, zero-downtime reloads and logs for Node apps.' },
      { name: 'Kubernetes', note: 'Container orchestration fundamentals.' },
      { name: 'GitHub Actions', note: 'Lightweight CI for smaller repos.' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    layer: 'Guardrails',
    blurb: 'Not a layer so much as a property of every layer — 150+ high-severity VAPT findings remediated.',
    items: [
      { name: 'JWT', note: 'Stateless auth across employee and field-agent APIs.' },
      { name: 'RBAC', note: 'Four access tiers in the employee portal, enforced server-side.' },
      { name: 'OWASP Top 10', note: 'The checklist VAPT remediation was measured against.' },
      { name: 'OAuth', note: 'Delegated auth for third-party integrations.' },
    ],
  },
]

export type FlowStep = { id: string; label: string; detail: string; tone?: 'ok' | 'warn' }

export type EngineeringNote = {
  id: string
  tag: string
  title: string
  problem: string
  approach: string
  outcome: string
  kind: 'flow' | 'compare'
  scenarios?: { id: string; label: string; steps: FlowStep[] }[]
  compare?: {
    before: { label: string; bars: { label: string; value: number }[]; points: string[] }
    after: { label: string; bars: { label: string; value: number }[]; points: string[] }
  }
}

// Simplified explanations of real work. Edit freely — they describe the approach, not internal code.
export const engineeringNotes: EngineeringNote[] = [
  {
    id: 'payouts',
    tag: 'Payments',
    title: "Payouts that can't pay twice",
    problem:
      'Payment gateways retry webhooks, networks time out, and users double-tap. At 10L+ payouts a day, "usually fine" means real money sent twice.',
    approach:
      'Every redemption carries an idempotency key. State moves through a ledger (pending → processing → settled), and callbacks are reconciled against it instead of trusted blindly.',
    outcome: '10L+ daily payouts with retry handling and reconciliation built in, not bolted on.',
    kind: 'flow',
    scenarios: [
      {
        id: 'happy',
        label: 'Normal payout',
        steps: [
          { id: 'req', label: 'Redeem request', detail: 'User redeems reward points. The request carries an idempotency key.' },
          { id: 'key', label: 'Key check', detail: 'Key is new — reserve it so a retry of the same request cannot start a second payout.' },
          { id: 'ledger', label: 'Ledger: pending', detail: 'Write a pending ledger entry before any money moves.' },
          { id: 'gateway', label: 'Gateway payout', detail: 'Call the payout API (UPI / bank transfer) with the same reference.' },
          { id: 'hook', label: 'Webhook', detail: 'Gateway calls back with the final status.' },
          { id: 'settle', label: 'Reconcile', detail: 'Match the callback to the ledger entry and mark it settled.', tone: 'ok' },
        ],
      },
      {
        id: 'dupe',
        label: 'Duplicate callback',
        steps: [
          { id: 'req', label: 'Retried webhook', detail: 'The gateway sends the same callback again after a timeout.' },
          { id: 'key', label: 'Lookup', detail: 'Find the ledger entry by payout reference.' },
          { id: 'ledger', label: 'Already settled', detail: 'The entry is already in a terminal state.', tone: 'warn' },
          { id: 'settle', label: '200 OK, no-op', detail: 'Acknowledge so the gateway stops retrying — but change nothing.', tone: 'ok' },
        ],
      },
    ],
  },
  {
    id: 'queries',
    tag: 'Databases',
    title: 'Cutting query time by 65%',
    problem:
      'High-frequency loyalty reads — balances, coupon checks — were hitting MySQL on every request and slowing down as the tables grew.',
    approach:
      'Profile first. Then: composite indexes matched to the real query patterns, a Redis cache in front of the hottest reads, and connection pooling so bursts stop queueing on new connections.',
    outcome: '65% less query time, 55% faster high-frequency reads, 40%+ more API throughput.',
    kind: 'compare',
    compare: {
      before: {
        label: 'Before',
        bars: [
          { label: 'Query time', value: 100 },
          { label: 'Hot-read latency', value: 100 },
        ],
        points: ['Every read goes to MySQL', 'Filters fall back to wide scans', 'New connection per burst'],
      },
      after: {
        label: 'After',
        bars: [
          { label: 'Query time', value: 35 },
          { label: 'Hot-read latency', value: 45 },
        ],
        points: ['Hot reads served from Redis', 'Composite indexes on real access paths', 'Pooled connections'],
      },
    },
  },
  {
    id: 'deploys',
    tag: 'Infrastructure',
    title: 'Deploys that stopped being events',
    problem:
      'Every project shipped differently: manual steps, different process managers, and deploy days that ate entire afternoons.',
    approach:
      'One standard pipeline for every service: build in CI, ship a container, reload behind Nginx with PM2 so traffic never sees a cold process.',
    outcome: '60% shorter deployment cycles across AWS, Docker, Jenkins, PM2 and Nginx.',
    kind: 'flow',
    scenarios: [
      {
        id: 'pipeline',
        label: 'Release pipeline',
        steps: [
          { id: 'push', label: 'git push', detail: 'Merge to the release branch triggers the pipeline.' },
          { id: 'ci', label: 'Jenkins build', detail: 'Install, lint, test and build — fail fast before anything ships.' },
          { id: 'image', label: 'Docker image', detail: 'Package the service so production runs exactly what CI tested.' },
          { id: 'ec2', label: 'Deploy to EC2', detail: 'Roll the new image onto the instance.' },
          { id: 'pm2', label: 'PM2 reload', detail: 'Graceful reload — old workers finish in-flight requests first.' },
          { id: 'nginx', label: 'Nginx serves', detail: 'Reverse proxy keeps routing traffic without a gap.', tone: 'ok' },
        ],
      },
    ],
  },
]

export const marqueeSkills = [
  'Node.js',
  'TypeScript',
  'React.js',
  'Microservices',
  'AWS',
  'Redis',
  'MySQL',
  'Docker',
  'System Design',
  'Razorpay',
  'GraphQL',
  'Kubernetes',
]

export const contactCopy = {
  headlinePlain: "Let's build",
  headlineMid: 'something',
  headlineAccent: "that doesn't fall over.",
  sub: 'Open to backend-heavy full-stack roles, systems work, and problems that get more interesting the closer you look.',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Notes', href: '#notes' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
