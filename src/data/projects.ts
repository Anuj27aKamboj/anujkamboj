import type { ProjectData } from "@/types";

export const projects: ProjectData[] = [
  {
    id: "project-1",
    title: "Flixmind",
    description:
      "A React SPA for AI-powered movie discovery. Users describe what they want to watch in natural language; Google Gemini interprets the query and returns results resolved against live TMDB data. API keys are fully server-side via a custom Vercel serverless proxy.",
    features: [
      "Natural language movie search powered by Google Gemini (gemini-2.5-flash)",
      "TMDB and Gemini API calls proxied through Vercel serverless functions — no keys in the client bundle",
      "Firebase Authentication with protected routes",
      "Responsive UI with live trailer playback and multi-language support",
    ],
    techStack: ["React", "Redux Toolkit", "Firebase", "Tailwind CSS", "Vercel"],
    screenshotUrl: "/screenshots/flixmind.png",
    screenshotAlt:
      "Flixmind movie discovery app showing AI-powered recommendations",
    githubUrl: "https://github.com/Anuj27aKamboj/flixmind",
    liveUrl: "https://flixmind-auth.web.app/",
  },
  {
    id: "project-2",
    title: "DevTinder",
    description:
      "A full-stack developer networking platform with connection workflows and optimistic Redux state updates for a snappy UX. Frontend and backend deployed independently on AWS EC2, with a Node.js/Express REST API secured by JWT auth.",
    features: [
      "Connection workflows: Interested, Ignored, Accepted, Rejected",
      "Optimistic Redux state updates for instant UI feedback",
      "Node.js/Express REST API with JWT authentication",
      "MongoDB schemas engineered for high-frequency concurrent writes",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS EC2",
    ],
    screenshotUrl: "/screenshots/devtinder.png",
    screenshotAlt:
      "DevTinder developer networking platform showing connection workflow",
    githubUrl: "https://github.com/Anuj27aKamboj/devTinder-web",
    liveUrl: "http://3.26.43.77/",
  },
  {
    id: "project-3",
    title: "Vutube",
    description:
      "A high-performance YouTube clone with infinite scroll and dynamic content loading, built around a fully modular component library with zero duplicated UI logic across nested comments, sidebars, and video cards.",
    features: [
      "Infinite scroll with dynamic content loading — ~60% lighter initial page weight than pagination",
      "Modular component library shared across comments, sidebars, and video cards",
      "Built with long-term maintainability as the primary design constraint",
      "Fully responsive layout across devices",
    ],
    techStack: [
      "React",
      "JavaScript",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
    ],
    screenshotUrl: "/screenshots/vutube.png",
    screenshotAlt: "Vutube video platform showing infinite scroll feed",
    githubUrl: "https://github.com/Anuj27aKamboj/vutube",
    liveUrl: "https://vutube-kappa.vercel.app/",
  },
];
