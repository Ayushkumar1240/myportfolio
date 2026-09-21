export const profile = {
  name: 'Ayush Kumar',
  role: 'Software Engineer',
  subrole: 'Backend & Full-Stack Developer',
  location: 'Noida, India',
  email: 'ayush.kumar.devmail@gmail.com',
  phone: '+91-8434332269',
  summary:
    "Backend-focused software engineer with 2.5+ years owning and scaling production systems across e-commerce, loyalty, payments, logistics and HR. I design high-throughput services in Node.js and TypeScript, running on SQL and Redis in AWS — the kind of systems that move real money and can't go down.",
  resumeUrl: '/Ayush_Kumar_Resume.pdf',
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

export const aboutStats = [
  { value: '10,000+', label: 'concurrent users supported' },
  { value: '65%', label: 'faster queries via caching + indexing' },
  { value: '60%', label: 'shorter deployment cycles' },
  { value: '150+', label: 'VAPT findings remediated' },
]

export const experience = [
  {
    company: 'DS Group',
    role: 'Software Engineer',
    period: 'Mar 2024 — Present',
    location: 'Noida, India',
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

export type Project = {
  slug: string
  name: string
  period: string
  description: string
  points: string[]
  stack: string[]
  metrics: { value: string; label: string }[]
}

export const projects: Project[] = [
  {
    slug: 'rajnigandha-loyalty-crm',
    name: 'Rajnigandha Loyalty & CRM Platform',
    period: 'Mar 2024 — Present',
    description:
      'Decomposed a legacy PHP monolith into independently deployable Node.js microservices powering a large-scale loyalty program — user management, coupon validation, reward distribution and payments.',
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
    description:
      'Backend and platform engineering for customer-facing dairy e-commerce — catalogue, checkout, subscriptions, delivery scheduling, refunds and admin operations, built to scale with the business.',
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
    description:
      'A multi-module self-service portal for employees and ex-employees — HR documents, SLA-driven ticketing, approval hierarchies and a department-wise admin panel with a superadmin tier.',
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
    description:
      'A field-operations platform combining Flutter mobile workflows with React-based administration for centralized data management across field agents.',
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
    description:
      'An internal event-booking platform with concurrency-safe slot booking, dynamic rescheduling and a visitor management system — replacing manual scheduling coordination.',
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
    description:
      'Re-architected a legacy PHP monolith into isolated MERN-stack microservices for user management, coupon validation, reward distribution and payment processing.',
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

export const skillGroups = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Java', 'Python', 'Go', 'Dart', 'PHP'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Microservices', 'Spring Boot'] },
  { label: 'Databases', items: ['MySQL', 'MSSQL', 'MongoDB', 'Oracle DB', 'Redis'] },
  { label: 'Frontend', items: ['React.js', 'Angular', 'Vue.js', 'Flutter'] },
  {
    label: 'Architecture',
    items: ['Distributed Systems', 'System Design', 'Event-Driven Architecture', 'Caching', 'Concurrency'],
  },
  { label: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Nginx', 'Linux'] },
  { label: 'Security', items: ['JWT', 'RBAC', 'OAuth', 'API Security', 'OWASP Top 10', 'VAPT Remediation'] },
  {
    label: 'Integrations',
    items: ['Razorpay', 'PayU', 'Worldline', 'Shopify', 'SAP', 'Freshdesk', 'Shiprocket', 'Firebase'],
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

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
