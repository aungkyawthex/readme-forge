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
  skills: z.array(z.string()),
  projects: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      repoUrl: z.string(),
      liveUrl: z.string(),
    })
  ),
});

//type is generated from the schema
export type Profile = z.infer<typeof profileSchema>;

export const emptyProfile: Profile = {
  header: { name: "", role: "", company: "", tagline: "" },
  about: { working: "", studying: "", learning: "", funFact: "" },
  skills: [],
  projects: [],
};