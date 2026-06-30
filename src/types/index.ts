export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  screenshotUrl: string;
  screenshotAlt: string;
  githubUrl: string;
  liveUrl: string;
}

export interface SkillItem {
  name: string;
  iconUrl?: string;
  iconAlt?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate: string | 'Present';
  contributions: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'mail';
}

export type Theme = 'light' | 'dark' | 'system';
export type FontScale = 0.9 | 1.0 | 1.1 | 1.2;
