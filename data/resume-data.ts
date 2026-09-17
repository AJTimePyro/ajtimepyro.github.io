import { PortfolioData } from "@/types/portfolio";

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Abhijeet Gupta",
    location: "New Delhi, India",
    phone: "+91 7838811930",
    email: "ajtimepyro@gmail.com",
    role: "Full-Stack Software Engineer",
    summary:
      "Full-Stack Software Engineer and 2026 B.Tech CSE graduate building AI-powered applications and scalable backend systems with FastAPI, Next.js, TypeScript, and Python. Experience spans LLM workflow orchestration with LangGraph, cloud infrastructure, and production SaaS development, alongside an active open-source background.",
    links: {
      github: "https://github.com/AJTimePyro",
      linkedin: "https://linkedin.com/in/ajtimepyro",
      portfolio: "https://ajtimepyro.github.io",
    },
    resumeUrl:
      "https://docs.google.com/document/d/1Z8cRfpuUiB0Yied3tqocJyCGrWRodEsH5x4H2_Ilc9k",
  },
  skills: {
    Languages: ["Python", "TypeScript", "JavaScript"],
    Backend: [
      "FastAPI",
      "Express.js",
      "Node.js",
      "REST APIs",
      "SSE (Server-Sent Events)",
      "JWT",
      "OAuth 2.0",
    ],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Zustand"],
    DatabaseORM: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "SQLite",
      "SQLAlchemy",
      "Prisma",
    ],
    CloudDevOps: ["Azure", "Docker", "Linux", "Git", "GitHub Actions", "CI/CD"],
    AI: ["LangGraph", "LangChain", "RAG", "Ollama", "Gemini API"],
  },
  experience: [
    {
      role: "Founding Engineer",
      company: "Eshway",
      startDate: "Mar 2025",
      endDate: "May 2026",
      liveUrl: "https://ltd.eshway.com/",
      highlights: [
        "Led the development of LTD, a project management platform serving **500+ active users**.",
        "Built AI features including a RAG chatbot and automated daily standups, saving 5-person teams **10+ hrs weekly**.",
        "Engineered Performance Monitor & Analytics dashboards with ClickUp migration, Google Calendar sync, and Slack command integration, managing **1,000+ weekly tasks**.",
        "Managed Azure infrastructure (Container Apps, Cache for Redis, Blob Storage, PostgreSQL) maintaining **99.9% uptime**.",
        "Executed a **zero-downtime migration** of production PostgreSQL databases from Neon to Azure.",
      ],
    },
    {
      role: "Freelance Developer",
      company: "Study Buddy",
      startDate: "Oct 2024",
      endDate: "Feb 2025",
      liveUrl: "https://studybuddyy.com/",
      highlights: [
        "Led a 4-person team to build and launch Study Buddy Web, an educational CMS platform, in **5 months**.",
        "Designed and deployed the Mendu Rural Development Society NGO website, boosting mobile responsiveness for **100+ daily visitors**.",
      ],
    },
    {
      role: "Freelance Developer",
      company: "Peaks2tails",
      startDate: "Apr 2024",
      endDate: "Sep 2024",
      loomUrl: "https://www.loom.com/share/a28772ee3bbe47b0b631a408c7126c22",
      highlights: [
        "Delivered a full-stack credit risk learning platform hosting **50+ interactive lessons** and real-time Python exercises.",
        "Architected secure Docker sandboxing for concurrent, isolated code execution.",
        "Built a centralized admin panel, enabling the client to independently manage **100% of course content**.",
      ],
    },
    {
      role: "Full-Stack Developer Intern",
      company: "Springreen",
      startDate: "Jan 2023",
      endDate: "Jun 2023",
      highlights: [
        "Built a Python Telegram bot using FFmpeg to automate media workflows, reducing manual time by **80%**.",
        "Developed full-stack features using Flask, React, and PostgreSQL, resolving **30+ UI/UX issues**.",
      ],
    },
  ],
  projects: [
    {
      slug: "applylint",
      title: "ApplyLint",
      tagline:
        "AI-powered job application assistant with adversarial evaluation",
      featured: true,
      media: [
        {
          type: "video",
          url: "https://github.com/user-attachments/assets/2cc3c7d4-ff4e-497a-9ff2-2bed5ca1a48b",
          alt: "ApplyLint LangGraph Evaluation Pipeline and SSE Stream",
        },
      ],
      description:
        "Analyzes resume-job fit, drafts tailored cover letters, and iteratively critiques and refines them via LangGraph workflows with resume-grounded validation and real-time SSE streaming to an Angular frontend.",
      stats: [
        { value: "~70s", label: "Runtime" },
        { value: "48h", label: "Sprint build" },
        { value: "Real-time", label: "SSE streaming" },
      ],
      stack: [
        "Angular",
        "FastAPI",
        "LangGraph",
        "Python",
        "SQLAlchemy",
        "SQLite",
        "SSE",
        "TypeScript",
      ],
      repoUrl: "https://github.com/AJTimePyro/ApplyLint",
      liveUrl: "https://github.com/AJTimePyro/ApplyLint#demo",
    },
    {
      slug: "galactic-results",
      title: "Galactic Results",
      tagline: "University results and ranking portal for GGSIPU",
      media: [
        {
          type: "image",
          url: "/projects/galatic-result-1.png",
          alt: "Galatic Result",
        },
      ],
      description:
        "Full-stack academic portal that ingests and parses university result PDFs into structured datasets, providing search, student rankings, and grade analytics.",
      stats: [
        { value: "All Majors", label: "GGSIPU coverage" },
        { value: "Automated", label: "PDF parsing pipeline" },
      ],
      stack: ["Next.js", "FastAPI", "MongoDB", "Python", "TypeScript"],
      repoUrl: "https://github.com/AJTimePyro/uni-result",
      liveUrl: "https://uni-result.vercel.app/",
    },
    {
      slug: "ajbotverse",
      title: "AJBotVerse",
      tagline: "Suite of cloud downloader, uploader, and utility Telegram bots",
      description:
        "Suite of high-throughput Telegram automation bots for cloud storage transfers, direct links, and utility workflows built with Pyrogram and MongoDB.",
      stats: [
        { value: "7 Bots", label: "Cloud suite" },
        { value: "290+", label: "GitHub forks" },
        { value: "120+", label: "GitHub stars" },
      ],
      stack: ["Python", "Pyrogram", "MongoDB"],
      repoUrl: "https://github.com/AJBotVerse/",
    },
  ],
  education: [
    {
      degree:
        "Bachelor of Technology (B. Tech) - Computer Science and Engineering",
      institution: "Guru Gobind Singh Indraprastha University, Delhi",
      startDate: "Nov 2022",
      endDate: "May 2026",
      cgpa: "8.93/10",
    },
  ],
};
