import { emptyProfile, profileSchema, type Profile } from "../types/profile";

type ValidatedField = "email" | "portfolio" | "repoUrl" | "liveUrl" | "supportUrl";

// Validate through the profile schema so UI checks cannot drift from persisted data rules.
export function fieldError(field: ValidatedField, value: string): string | undefined {
  const profile: Profile = {
    ...emptyProfile,
    socials: { ...emptyProfile.socials, [field]: value },
    extras: { ...emptyProfile.extras, [field]: value },
    projects: [{
      id: "validation",
      title: "",
      description: "",
      repoUrl: field === "repoUrl" ? value : "",
      liveUrl: field === "liveUrl" ? value : "",
    }],
  };
  const result = profileSchema.safeParse(profile);
  if (result.success) return undefined;
  return result.error.issues[0]?.message;
}
