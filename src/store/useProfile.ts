import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyProfile, type Profile } from "../types/profile";

type ProfileState = {
  profile: Profile;
  updateSection: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  reset: () => void;
};

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      updateSection: (key, value) =>
        set((state) => ({ profile: { ...state.profile, [key]: value } })),
      reset: () => set({ profile: emptyProfile }),
    }),
    { name: "readme-forge-profile" } // localStorage key
  )
);