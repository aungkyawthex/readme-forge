import { z } from "zod";

export const profileSchema = z.object({
  header: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    tagline: z.string(),
  }),
  about: z.object({
    working: z.string(),
    studying: z.string(),
    learning: z.string(),
    funFact: z.string(),
  }),
  socials: z.object({
    github: z.string(),
    linkedin: z.string(),
    email: z.string(),
    portfolio: z.string(),
    x: z.string(),
  }),
  skills: z.array(z.string()),
  interests: z.array(z.string()),
  projects: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      repoUrl: z.string(),
      liveUrl: z.string(),
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      school: z.string(),
      title: z.string(),
      year: z.string(),
    })
  ),
  experience: z.array(
    z.object({
      id: z.string(),
      company: z.string(),
      role: z.string(),
      period: z.string(),
      summary: z.string(),
    })
  ),
  githubStats: z.object({
    githubUsername: z.string(),
    showStats: z.boolean(),
    showTopLanguages: z.boolean(),
    showStreak: z.boolean(),
  }),
  extras: z.object({
    quote: z.string(),
    showVisitorCounter: z.boolean(),
    supportUrl: z.string(),
  }),
});

// type is generated from the schema
export type Profile = z.infer<typeof profileSchema>;

export const emptyProfile: Profile = {
  header: { name: "", role: "", company: "", tagline: "" },
  about: { working: "", studying: "", learning: "", funFact: "" },
  socials: { github: "", linkedin: "", email: "", portfolio: "", x: "" },
  skills: [],
  interests: [],
  projects: [],
  education: [],
  experience: [],
  githubStats: {
    githubUsername: "",
    showStats: false,
    showTopLanguages: false,
    showStreak: false,
  },
  extras: { quote: "", showVisitorCounter: false, supportUrl: "" },
};
