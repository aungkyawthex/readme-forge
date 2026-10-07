import { useProfile } from "../../store/useProfile";
import { TagInput } from "../TagInput";

export function SkillsForm() {
  const skills = useProfile((s) => s.profile.skills);
  const updateSection = useProfile((s) => s.updateSection);

  return (
    <div className="space-y-3">
      <TagInput
        label="Skills"
        tags={skills}
        onChange={(next) => updateSection("skills", next)}
        placeholder="skillicons.dev slug, then Enter (e.g. react)"
      />
      <p className="text-xs text-gray-500">
        Use lowercase slugs from skillicons.dev, such as react, php, laravel, ts.
      </p>
    </div>
  );
}
