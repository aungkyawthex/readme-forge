import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyProfile, type Profile } from "../types/profile";

type ProfileState = {
  profile: Profile;
  updateSection: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  reset: () => void;
};

type PersistedSlice = { profile?: Partial<Profile> };

function mergeProfile(saved?: Partial<Profile>): Profile {
  const projects = (saved?.projects ?? []).map((p) => ({
    id: p.id || crypto.randomUUID(),
    title: p.title ?? "",
    description: p.description ?? "",
    repoUrl: p.repoUrl ?? "",
    liveUrl: p.liveUrl ?? "",
  }));

  return {
    ...emptyProfile,
    ...saved,
    header: { ...emptyProfile.header, ...saved?.header },
    about: { ...emptyProfile.about, ...saved?.about },
    skills: saved?.skills ?? emptyProfile.skills,
    projects,
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
      // Old localStorage may lack new fields (e.g. project id). Fill from emptyProfile.
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
