import { useProfile } from "../../store/useProfile";
import { TagInput } from "../TagInput";

export function InterestsForm() {
  const interests = useProfile((s) => s.profile.interests);
  const updateSection = useProfile((s) => s.updateSection);

  return (
    <TagInput
      label="Interests"
      tags={interests}
      onChange={(next) => updateSection("interests", next)}
      placeholder="Type an interest, then Enter"
    />
  );
}
