import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyProfile, type Profile } from "../types/profile";
import { defaultSectionOrder } from "../sections";

type ProfileState = {
  profile: Profile;
  disabledSections: string[];
  sectionOrder: string[];
  updateSection: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  toggleSection: (id: string) => void;
  setSectionOrder: (sectionOrder: string[]) => void;
  reset: () => void;
};

type PersistedSlice = {
  profile?: Partial<Profile>;
  disabledSections?: string[];
  sectionOrder?: string[];
};

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

function normalizeOrder(saved?: string[]): string[] {
  const known = new Set(defaultSectionOrder);
  const kept = (saved ?? defaultSectionOrder).filter((id) => known.has(id));
  const missing = defaultSectionOrder.filter((id) => !kept.includes(id));
  return [...kept, ...missing];
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      disabledSections: [],
      sectionOrder: defaultSectionOrder,
      updateSection: (key, value) =>
        set((state) => ({ profile: { ...state.profile, [key]: value } })),
      toggleSection: (id) =>
        set((state) => ({
          disabledSections: state.disabledSections.includes(id)
            ? state.disabledSections.filter((x) => x !== id)
            : [...state.disabledSections, id],
        })),
      setSectionOrder: (sectionOrder) => set({ sectionOrder: normalizeOrder(sectionOrder) }),
      reset: () =>
        set({
          profile: emptyProfile,
          disabledSections: [],
          sectionOrder: defaultSectionOrder,
        }),
    }),
    {
      name: "readme-forge-profile",
      merge: (persisted, current) => {
        const saved = persisted as PersistedSlice | undefined;
        const known = new Set(defaultSectionOrder);
        return {
          ...current,
          profile: mergeProfile(saved?.profile),
          sectionOrder: normalizeOrder(saved?.sectionOrder),
          disabledSections: (saved?.disabledSections ?? []).filter((id) =>
            known.has(id)
          ),
        };
      },
    }
  )
);
