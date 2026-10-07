import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyProfile, type Profile } from "../types/profile";

type ProfileState = {
  profile: Profile;
  updateSection: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  reset: () => void;
};

type PersistedSlice = { profile?: Partial<Profile> };

function withIds<T extends { id: string }>(
  items: T[] | undefined,
  fill: (item: T) => T
): T[] {
  return (items ?? []).map((item) => ({
    ...fill(item),
    id: item.id || crypto.randomUUID(),
  }));
}

function mergeProfile(saved?: Partial<Profile>): Profile {
  return {
    ...emptyProfile,
    ...saved,
    header: { ...emptyProfile.header, ...saved?.header },
    about: { ...emptyProfile.about, ...saved?.about },
    socials: { ...emptyProfile.socials, ...saved?.socials },
    githubStats: { ...emptyProfile.githubStats, ...saved?.githubStats },
    extras: { ...emptyProfile.extras, ...saved?.extras },
    skills: saved?.skills ?? emptyProfile.skills,
    interests: saved?.interests ?? emptyProfile.interests,
    projects: withIds(saved?.projects, (p) => ({
      id: p.id,
      title: p.title ?? "",
      description: p.description ?? "",
      repoUrl: p.repoUrl ?? "",
      liveUrl: p.liveUrl ?? "",
    })),
    education: withIds(saved?.education, (e) => ({
      id: e.id,
      school: e.school ?? "",
      title: e.title ?? "",
      year: e.year ?? "",
    })),
    experience: withIds(saved?.experience, (e) => ({
      id: e.id,
      company: e.company ?? "",
      role: e.role ?? "",
      period: e.period ?? "",
      summary: e.summary ?? "",
    })),
  };
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      updateSection: (key, value) =>
        set((state) => ({ profile: { ...state.profile, [key]: value } })),
      reset: () => set({ profile: emptyProfile }),
    }),
    {
      name: "readme-forge-profile",
      merge: (persisted, current) => {
        const saved = persisted as PersistedSlice | undefined;
        return {
          ...current,
          profile: mergeProfile(saved?.profile),
        };
      },
    }
  )
);
