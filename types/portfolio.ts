export interface SocialLinks {
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface Profile {
  name: string;
  location: string;
  phone: string;
  email: string;
  role: string;
  summary: string;
  links: SocialLinks;
  resumeUrl: string;
}

export type SkillCategory =
  | "Languages"
  | "Backend"
  | "Frontend"
  | "DatabaseORM"
  | "CloudDevOps"
  | "AI";

export type Skills = Record<SkillCategory, string[]>;

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  liveUrl?: string;
  loomUrl?: string;
  highlights: string[];
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectMedia {
  type: "image" | "video";
  url: string;
  alt?: string;
  poster?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  featured?: boolean;
  media?: ProjectMedia[];
  stats?: ProjectStat[];
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  cgpa: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
}
