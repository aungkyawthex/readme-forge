import type { Profile } from "../../types/profile";
import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";
import { RepeatableList } from "../RepeatableList";

type ExperienceItem = Profile["experience"][number];

const emptyItem = (): ExperienceItem => ({
  id: crypto.randomUUID(),
  company: "",
  role: "",
  period: "",
  summary: "",
});

export function ExperienceForm() {
  const experience = useProfile((s) => s.profile.experience);
  const updateSection = useProfile((s) => s.updateSection);

  return (
    <RepeatableList
      items={experience}
      onChange={(next) => updateSection("experience", next)}
      createItem={emptyItem}
      addLabel="Add experience"
      itemTitle={(index) => `Role ${index + 1}`}
    >
      {(item, patch) => (
        <>
          <Field
            label="Company"
            value={item.company}
            onChange={(company) => patch({ company })}
          />
          <Field
            label="Role"
            value={item.role}
            onChange={(role) => patch({ role })}
          />
          <Field
            label="Period"
            value={item.period}
            onChange={(period) => patch({ period })}
            placeholder="2022 — present"
          />
          <Field
            label="Summary"
            value={item.summary}
            onChange={(summary) => patch({ summary })}
            multiline
          />
        </>
      )}
    </RepeatableList>
  );
}
