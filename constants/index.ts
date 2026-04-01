import {
  RxGithubLogo,
  RxLinkedinLogo,
  RxDownload,
} from "react-icons/rx";

export const CONTACT_EMAIL = "hafizsubhan909@gmail.com" as const;

export const SKILL_DATA = [
  { skill_name: "HTML", image: "html.png", width: 80, height: 80 },
  { skill_name: "CSS", image: "css.png", width: 80, height: 80 },
  { skill_name: "TailwindCSS", image: "tailwind.png", width: 80, height: 80 },
  { skill_name: "GSAP", image: "framer.png", width: 80, height: 80 },
  { skill_name: "React", image: "react.png", width: 80, height: 80 },
  { skill_name: "Next.js", image: "next.png", width: 80, height: 80 },
  { skill_name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Python", image: "node.png", width: 80, height: 80 },
  { skill_name: "FastAPI", image: "node.png", width: 80, height: 80 },
  { skill_name: "Git", image: "react.png", width: 80, height: 80 },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/hafiz-subhan-soft/",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/Hafiz-Subhan-Sabir",
  },
] as const;

export const FRONTEND_SKILL = [
  { skill_name: "HTML", image: "html.png", width: 80, height: 80 },
  { skill_name: "CSS", image: "css.png", width: 80, height: 80 },
  { skill_name: "TailwindCSS", image: "tailwind.png", width: 80, height: 80 },
  { skill_name: "React", image: "react.png", width: 80, height: 80 },
  { skill_name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Next.js", image: "next.png", width: 80, height: 80 },
] as const;

export const BACKEND_SKILL = [
  { skill_name: "Python", image: "node.png", width: 80, height: 80 },
  { skill_name: "Django", image: "node.png", width: 80, height: 80 },
  { skill_name: "Flask", image: "node.png", width: 80, height: 80 },
  { skill_name: "FastAPI", image: "node.png", width: 80, height: 80 },
] as const;

export const FULLSTACK_SKILL = [
  { skill_name: "AI Integrations", image: "react.png", width: 70, height: 70 },
  { skill_name: "Secure Auth Systems", image: "figma.png", width: 50, height: 50 },
] as const;

export const OTHER_SKILL = [{ skill_name: "Deployment & Maintenance", image: "go.png", width: 60, height: 60 }] as const;

export const PROJECTS = [
  {
    title: "E-commerce Car Website",
    description:
      "A full e-commerce car platform with listing discovery, filters, product details, checkout workflow, and responsive conversion-focused UI.",
    image:
      "/projects/car.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: true,
    stack: "React, Next.js, TypeScript, Payment Integrations",
  },
  {
    title: "Real-Time Vegetable Detection",
    description:
      "Computer vision project for real-time vegetable detection with dataset preparation, model training, inference flow, and deployment-ready pipeline.",
    image:
      "/projects/vegetable.jpg",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: true,
    stack: "Python, AI, ML, DL, Data Collection & Training",
  },
  {
    title: "Movie Website",
    description:
      "Netflix-like UI/UX with dynamic sections, content previews, watchlist patterns, and high-quality streaming-oriented layout structure.",
    image:
      "/projects/movie.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: true,
    stack: "React, TailwindCSS, Proper Layout & Grid Structuring",
  },
  {
    title: "Real-Time Eye Scanning Unlock System",
    description:
      "Biometric-inspired real-time eye scanning flow for unlock and identification use-cases, focused on secure authentication and system design.",
    image:
      "/projects/eye.webp",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: true,
    stack: "Authentication Systems, JWT, RBAC, Secure Password Hashing",
  },
  {
    title: "Pet Adoption Website",
    description:
      "End-to-end adoption platform with searchable pets, profile pages, application workflow, communication flow, and admin moderation.",
    image:
      "/projects/pet.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "Next.js, TypeScript, ORM, Team Collaboration",
  },
  {
    title: "Food Ordering Restaurant Website",
    description:
      "Restaurant ordering experience with menu browsing, cart, order management, and payment integration for local and bank methods.",
    image:
      "/projects/food.webp",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "React, Payment Integrations, Deployment & Maintenance",
  },
  {
    title: "ERP System",
    description:
      "Comprehensive ERP with modules for users, operations, reporting, and business workflow automation with role-based access and maintainability.",
    image:
      "/projects/erp.jpg",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "System Design, DFDs, ERDs, Agile & Waterfall",
  },
  {
    title: "AI Interview Simulator",
    description:
      "AI-powered interview practice system that simulates realistic technical and behavioral rounds, evaluates responses, and returns structured feedback.",
    image:
      "/projects/ai-interview.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "AI Integrations, Prompt Engineering, SaaS-style Workflows",
  },
  {
    title: "Script to AI Video Generator",
    description:
      "A script-to-video pipeline that transforms textual input into scene-based AI video drafts with timing, structure, and workflow automation.",
    image:
      "/projects/script-to-video.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "AI Tools Usage, API Integrations, System Design",
  },
  {
    title: "Hospital Management System",
    description:
      "Hospital management solution designed with core DSA principles for optimized records, appointments, patient workflows, and operational efficiency.",
    image:
      "/projects/hospital-management.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "DSA, Backend Logic, Optimization",
  },
  {
    title: "Tic Tac Toe Game",
    description:
      "A responsive game module featuring clean board UX, score tracking, and optimized interaction flow for quick gameplay sessions.",
    image:
      "/projects/tic-tac-toe.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "JavaScript, UI Logic, Problem Solving",
  },
  {
    title: "Bubble Game",
    description:
      "Arcade-style bubble game with performance-focused mechanics, scoring logic, and interactive UI behavior for smooth browser gameplay.",
    image:
      "/projects/bubble-game.jpg",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "Game Logic, Debugging, Frontend Interactions",
  },
  {
    title: "Feedback Portal Module",
    description:
      "A structured feedback collection module with categorized responses, reporting views, and workflow-friendly review mechanics.",
    image:
      "/projects/feedback-portal.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "Requirements Gathering, SRS, Portal Design",
  },
  {
    title: "Expense Tracker",
    description:
      "Data extraction workflows for collecting structured web information, with cleaning and processing pipelines for analytics and AI preparation.",
    image:
      "/projects/expense-tracker.png",
    link: "https://github.com/Hafiz-Subhan-Sabir",
    github: "https://github.com/Hafiz-Subhan-Sabir",
    featured: false,
    stack: "Python, Data Collection, Automation",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Profiles",
    data: [
      { name: "LinkedIn", icon: RxLinkedinLogo, link: "https://www.linkedin.com/in/hafiz-subhan-soft/" },
      { name: "GitHub", icon: RxGithubLogo, link: "https://github.com/Hafiz-Subhan-Sabir" },
    ],
  },
  {
    title: "Explore",
    data: [
      { name: "About", icon: null, link: "/#about-me" },
      { name: "Projects", icon: null, link: "/#projects" },
      { name: "Resume", icon: null, link: "/#resume" },
    ],
  },
  {
    title: "Contact",
    data: [
      { name: "Contact", icon: null, link: "/contact" },
      { name: "Email", icon: null, link: `mailto:${CONTACT_EMAIL}` },
    ],
  },
] as const;

export const NAV_LINKS = [
  { title: "About me", link: "#about-me" },
  { title: "Skills", link: "#skills" },
  { title: "Timeline", link: "#timeline" },
  { title: "Resume", link: "#resume" },
  { title: "Testimonials", link: "#testimonials" },
  { title: "Projects", link: "#projects" },
  { title: "Contact", link: "/contact" },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/Hafiz-Subhan-Sabir",
};

export const TESTIMONIALS = [
  {
    name: "Client Feedback",
    role: "Startup Founder",
    text: "Subhan delivered clean UI, fast performance, and clear communication from planning to deployment.",
  },
  {
    name: "Team Feedback",
    role: "Project Teammate",
    text: "Strong ownership and reliable delivery. He handled technical challenges quickly and kept the team aligned.",
  },
  {
    name: "Product Feedback",
    role: "Business Stakeholder",
    text: "The final build looked premium, worked smoothly, and matched business needs without unnecessary complexity.",
  },
] as const;

export const EDUCATION_HIGHLIGHTS = {
  education: "BS Information Engineering Technology (2022 - 2026)",
  technicalSummary:
    "Technical skills applied across frontend, backend, AI workflows, and delivery-ready product builds.",
  satisfiedClients: "Satisfied Clients: 35+",
  soloProjects: "Delivered 10+ solo projects end-to-end.",
  teamProjects: "Collaborated with teams on 20+ projects.",
} as const;

export const RESUME_DATA = {
  title: "Professional Resume Snapshot",
  summary:
    "Full-Stack Software Engineer building React/Next.js and Python/FastAPI products with AI integrations, secure auth, and performance-focused UI.",
  targetRoles: [
    "Full-Stack Software Engineer",
    "Frontend Engineer (React / Next.js)",
    "Software Engineer (TypeScript / Python)",
  ],
  coreSkills:
    "React, Next.js, TypeScript, JavaScript, Tailwind CSS, Python, FastAPI, REST APIs, JWT, RBAC, Git, AI integrations, Prompt Engineering",
  experience: [
    {
      title: "Freelance Full-Stack Developer",
      period: "2024 - Present",
      bullets: [
        "Built and deployed portfolio, e-commerce, and dashboard products with clean architecture and responsive UI.",
        "Implemented secure authentication flows (JWT + RBAC) and role-based access patterns across web applications.",
        "Integrated third-party APIs and payment workflows while maintaining performance and accessibility standards.",
      ],
    },
    {
      title: "Project-Based Software Engineering",
      period: "2022 - 2024",
      bullets: [
        "Delivered multiple academic and personal projects across web apps, AI workflows, and data processing pipelines.",
        "Focused on debugging, optimization, and reusable component systems for maintainable front-end development.",
      ],
    },
  ],
  education: "BS Information Engineering Technology (2022 - 2026)",
  resumeLink: "/resume/Hafiz_Subhan_Resume.pdf",
  resumeLinkLabel: "Download Resume PDF",
  downloadIcon: RxDownload,
} as const;

