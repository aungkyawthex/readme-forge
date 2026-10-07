import type { Profile } from "../../types/profile";
import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";
import { RepeatableList } from "../RepeatableList";

type EducationItem = Profile["education"][number];

const emptyItem = (): EducationItem => ({
  id: crypto.randomUUID(),
  school: "",
  title: "",
  year: "",
});

export function EducationForm() {
  const education = useProfile((s) => s.profile.education);
  const updateSection = useProfile((s) => s.updateSection);

  return (
    <RepeatableList
      items={education}
      onChange={(next) => updateSection("education", next)}
      createItem={emptyItem}
      addLabel="Add education or certification"
      itemTitle={(index) => `Item ${index + 1}`}
    >
      {(item, patch) => (
        <>
          <Field
            label="School / issuer"
            value={item.school}
            onChange={(school) => patch({ school })}
          />
          <Field
            label="Title"
            value={item.title}
            onChange={(title) => patch({ title })}
          />
          <Field
            label="Year"
            value={item.year}
            onChange={(year) => patch({ year })}
            placeholder="2024"
          />
        </>
      )}
    </RepeatableList>
  );
}
