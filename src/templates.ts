import { emptyProfile, type Profile } from "./types/profile";
import { defaultSectionOrder } from "./sections";

export type Template = {
  id: string;
  name: string;
  profile: Profile;
  sectionOrder: string[];
  disabledSections: string[];
};

function profile(overrides: {
  header?: Partial<Profile["header"]>;
  about?: Partial<Profile["about"]>;
  socials?: Partial<Profile["socials"]>;
  githubStats?: Partial<Profile["githubStats"]>;
  extras?: Partial<Profile["extras"]>;
  skills?: string[];
  interests?: string[];
  projects?: Profile["projects"];
  education?: Profile["education"];
  experience?: Profile["experience"];
}): Profile {
  return {
    ...emptyProfile,
    ...overrides,
    header: { ...emptyProfile.header, ...overrides.header },
    about: { ...emptyProfile.about, ...overrides.about },
    socials: { ...emptyProfile.socials, ...overrides.socials },
    githubStats: { ...emptyProfile.githubStats, ...overrides.githubStats },
    extras: { ...emptyProfile.extras, ...overrides.extras },
    skills: overrides.skills ?? emptyProfile.skills,
    interests: overrides.interests ?? emptyProfile.interests,
    projects: overrides.projects ?? emptyProfile.projects,
    education: overrides.education ?? emptyProfile.education,
    experience: overrides.experience ?? emptyProfile.experience,
  };
}

const minimal: Template = {
  id: "minimal",
  name: "Minimal",
  disabledSections: [
    "githubStats",
    "projects",
    "experience",
    "education",
    "interests",
    "extras",
  ],
  sectionOrder: ["header", "about", "skills", "socials", ...defaultSectionOrder],
  profile: profile({
    header: {
      name: "Alex Rivera",
      role: "Software engineer",
      tagline: "I build small tools that do one thing well.",
    },
    about: {
      working: "a personal README generator",
      learning: "TypeScript",
    },
    socials: { github: "alexrivera" },
    skills: ["ts", "react", "nodejs"],
  }),
};

const developer: Template = {
  id: "developer",
  name: "Developer",
  disabledSections: [],
  sectionOrder: defaultSectionOrder,
  profile: profile({
    header: {
      name: "Sam Chen",
      role: "Full-stack developer",
      company: "Northwind",
      tagline: "APIs by day, side projects by night.",
    },
    about: {
      working: "a design-system for internal tools",
      studying: "distributed systems",
      learning: "Rust",
      funFact: "I keep a hardware keyboard in my backpack.",
    },
    socials: {
      github: "samchen",
      linkedin: "samchen",
      email: "sam@example.com",
      portfolio: "https://samchen.dev",
      x: "samchen",
    },
    skills: ["ts", "react", "nodejs", "postgres", "docker"],
    interests: ["open source", "mechanical keyboards", "hiking"],
    projects: [
      {
        id: "tpl-dev-proj-1",
        title: "Harbor",
        description: "A tiny dashboard for container logs.",
        repoUrl: "https://github.com/samchen/harbor",
        liveUrl: "https://harbor.samchen.dev",
      },
    ],
    education: [
      {
        id: "tpl-dev-edu-1",
        school: "State University",
        title: "B.S. Computer Science",
        year: "2019",
      },
    ],
    experience: [
      {
        id: "tpl-dev-exp-1",
        company: "Northwind",
        role: "Full-stack developer",
        period: "2022 — present",
        summary: "Shipped internal tools used by 40+ teammates.",
      },
    ],
    githubStats: {
      githubUsername: "samchen",
      showStats: true,
      showTopLanguages: true,
      showStreak: false,
    },
    extras: {
      quote: "Make it work, then make it clear.",
      showVisitorCounter: false,
      supportUrl: "",
    },
  }),
};

const statsHeavy: Template = {
  id: "stats-heavy",
  name: "Stats-heavy",
  disabledSections: ["experience", "education", "projects", "interests"],
  sectionOrder: [
    "header",
    "githubStats",
    "skills",
    "socials",
    "about",
    "extras",
    ...defaultSectionOrder,
  ],
  profile: profile({
    header: {
      name: "Jordan Lee",
      role: "Open source maintainer",
      tagline: "Graphs first, words second.",
    },
    about: {
      working: "docs for a CLI I maintain",
      funFact: "My contribution graph is my journal.",
    },
    socials: { github: "jordanlee" },
    skills: ["go", "ts", "linux", "git"],
    githubStats: {
      githubUsername: "jordanlee",
      showStats: true,
      showTopLanguages: true,
      showStreak: true,
    },
    extras: {
      quote: "Ship, then measure.",
      showVisitorCounter: true,
      supportUrl: "https://buymeacoffee.com/jordanlee",
    },
  }),
};

export const templates: Template[] = [minimal, developer, statsHeavy];
