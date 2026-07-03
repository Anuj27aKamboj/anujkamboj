import type { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Associate Software Engineer',
    company: 'Carelon Global Solutions',
    companyUrl: 'https://www.carelonglobal.in/',
    startDate: 'Aug 2023',
    endDate: 'Mar 2025',
    contributions: [
      'Rebuilt the customer dashboard in React 18 + TypeScript, reducing load time by 40% and eliminating a class of hydration bugs from the legacy jQuery codebase.',
      'Led the design system migration to Tailwind CSS, establishing component patterns adopted across 3 product teams.',
      'Introduced Zod schema validation on all API boundaries, catching malformed responses before they reached UI state.',
      'Mentored two junior developers through code review and pair programming sessions.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Associate Software Engineer',
    company: 'Deloitte US India Consulting Pvt. Ltd.',
    companyUrl: 'https://www.deloitte.com/in/en.html',
    startDate: 'Apr 2025',
    endDate: 'Nov 2025',
    contributions: [
      'Developed and shipped 12 client-facing landing pages using React and Framer Motion with a focus on performance and animation quality.',
      'Improved Lighthouse scores across the main product from 62 to 91 by auditing image formats, deferring non-critical scripts, and eliminating render-blocking CSS.',
      'Collaborated with a designer using Figma to build a shared token system that cut handoff friction significantly.',
    ],
  },
];
