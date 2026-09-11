import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Abhijeet Gupta',
    location: 'New Delhi, India',
    phone: '+91 7838811930',
    email: 'ajtimepyro@gmail.com',
    role: 'Full-Stack Software Engineer',
    summary:
      'Full-Stack Software Engineer and 2026 B.Tech CSE graduate building AI-powered applications and scalable backend systems with FastAPI, Next.js, TypeScript, and Python. Experience spans LLM workflow orchestration with LangGraph, cloud infrastructure, and production SaaS development, alongside an active open-source background.',
    links: {
      github: 'https://github.com/AJTimePyro',
      linkedin: 'https://linkedin.com/in/ajtimepyro',
      portfolio: 'https://ajtimepyro.github.io',
    },
    resumeUrl: 'https://docs.google.com/document/d/1Z8cRfpuUiB0Yied3tqocJyCGrWRodEsH5x4H2_Ilc9k',
  },
  skills: {
    Languages: ['Python', 'TypeScript', 'JavaScript'],
    Backend: [
      'FastAPI',
      'Express.js',
      'Node.js',
      'REST APIs',
      'SSE (Server-Sent Events)',
      'JWT',
      'OAuth 2.0',
    ],
    Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Zustand'],
    DatabaseORM: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'SQLite',
      'SQLAlchemy',
      'Prisma',
    ],
    CloudDevOps: [
      'Azure',
      'Docker',
      'Linux',
      'Git',
      'GitHub Actions',
      'CI/CD',
    ],
    AI: [
      'LangGraph',
      'LangChain',
      'RAG',
      'Ollama',
      'Gemini API',
    ],
  },
  experience: [
    {
      role: 'Founding Engineer',
      company: 'Eshway',
      startDate: 'Mar 2025',
      endDate: 'May 2026',
      liveUrl: 'https://ltd.eshway.com/',
      highlights: [
        'Led the development of LTD, a project management platform serving 500+ active users.',
        'Built AI features including a RAG chatbot and automated daily standups, saving 5-person teams 10+ hrs weekly.',
        'Built a Performance Monitor and Analytics dashboard with ClickUp migration, Google Calendar sync, and Slack command integration, covering 1,000+ weekly tasks.',
        'Managed Azure infrastructure (Container Apps, Cache for Redis, Blob Storage, PostgreSQL) with 99.9% uptime, including a zero-downtime PostgreSQL migration from Neon to Azure.',
      ],
    },
    {
      role: 'Freelance Developer',
      company: 'Study Buddy',
      startDate: 'Oct 2024',
      endDate: 'Feb 2025',
      liveUrl: 'https://studybuddyy.com/',
      highlights: [
        'Led a 4-person team to build and launch Study Buddy Web, a full-stack educational platform with a content management admin panel, in 5 months.',
        'Designed and deployed the Mendu Rural Development Society NGO website with minimal and modern UI, improving mobile responsiveness for 100+ daily visitors.',
      ],
    },
    {
      role: 'Freelance Developer',
      company: 'Peaks2tails',
      startDate: 'Apr 2024',
      endDate: 'Sep 2024',
      loomUrl: 'https://www.loom.com/share/a28772ee3bbe47b0b631a408c7126c22',
      highlights: [
        'Delivered a full-stack credit risk learning platform hosting a multi-tier curriculum of 50+ interactive lessons and real-time Python coding exercises, using secure Docker sandboxing for concurrent isolated code execution.',
        'Built a centralized admin panel, enabling the client to independently manage 100% of course content.',
      ],
    },
    {
      role: 'Full-Stack Developer Intern',
      company: 'Springreen',
      startDate: 'Jan 2023',
      endDate: 'Jun 2023',
      highlights: [
        'Built a Python Telegram bot using FFmpeg to automate media workflows, reducing manual time by 80%.',
        'Developed full-stack features using Flask, React, and PostgreSQL, resolving 30+ UI/UX issues.',
      ],
    },
  ],
  projects: [
    {
      slug: 'applylint',
      title: 'ApplyLint',
      tagline: 'AI-powered job application assistant with adversarial evaluation',
      description:
        'An AI-powered job application assistant that analyzes resume-job fit, drafts a cover letter, then critiques and refines it via LangGraph, with resume-grounded generation and adversarial evaluation. Engineered a FastAPI backend with SQLAlchemy, SQLite, Alembic, and SSE streaming, delivering real-time workflow updates to an Angular frontend across each workflow stage. Built in a 48-hour build-in-public sprint; cut local workflow execution from 10-19 min to ~70 sec by optimizing context size, GPU memory, reasoning config, and structured outputs.',
      stack: [
        'Angular',
        'FastAPI',
        'LangGraph',
        'Python',
        'SQLAlchemy',
        'SQLite',
        'SSE',
        'TypeScript',
      ],
      repoUrl: 'https://github.com/AJTimePyro/ApplyLint',
      liveUrl: 'https://github.com/AJTimePyro/ApplyLint#demo',
    },
    {
      slug: 'galactic-results',
      title: 'Galactic Results',
      tagline: 'University results and ranking portal for GGSIPU',
      description:
        'Built a university results and ranking portal for GGSIPU, supporting students across all academic programs. Engineered an automated pipeline to fetch and parse university result PDFs into structured datasets. Optimized storage costs by storing parsed results as CSV datasets in Google Drive.',
      stack: [
        'Next.js',
        'FastAPI',
        'MongoDB',
        'Python',
        'TypeScript',
      ],
      repoUrl: 'https://github.com/AJTimePyro/uni-result',
      liveUrl: 'https://uni-result.vercel.app/',
    },
    {
      slug: 'ajbotverse',
      title: 'AJBotVerse',
      tagline: 'Suite of cloud downloader, uploader, and utility Telegram bots',
      description:
        'Created 7 Telegram bots, including downloader/uploader tools (Mega, direct-link, other cloud services) and utility bots (request tracking, translation, reactions), earning 290+ forks and 120+ stars across a dedicated GitHub org.',
      stack: [
        'Python',
        'Pyrogram',
        'MongoDB',
      ],
      repoUrl: 'https://github.com/AJBotVerse/',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology (B. Tech) - Computer Science and Engineering',
      institution: 'Guru Gobind Singh Indraprastha University, Delhi',
      startDate: 'Nov 2022',
      endDate: 'May 2026',
      cgpa: '8.93/10',
    },
  ],
};