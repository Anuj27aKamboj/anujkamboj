import type { SocialLink, NavItem } from '@/types';

export const personal = {
  name: 'Anuj Kamboj',
  title: 'Frontend Developer',
  tagline: 'I build fast, accessible, and thoughtfully designed web experiences.',
  bio: `I'm a frontend developer with around two years of experience turning designs into 
  production-ready React applications. I care deeply about the details that most people 
  skip — keyboard navigation, loading states, motion that doesn't get in the way.`,
  location: 'Delhi, India',
  resumeUrl: '/resume.pdf',
  email: 'anujkamboj2000@gmail.com',
} as const;

export const navItems: NavItem[] = [
  { label: 'About',      href: '#about',      id: 'about' },
  { label: 'Skills',     href: '#skills',     id: 'skills' },
  { label: 'Projects',   href: '#projects',   id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact',    href: '#contact',    id: 'contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub',   url: 'https://github.com/Anuj27aKamboj',   icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/anuj-kamboj/', icon: 'linkedin' },
  { label: 'Email',    url: `mailto:${personal.email}`,  icon: 'mail' },
];
