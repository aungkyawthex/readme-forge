import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";

export function AboutForm() {
  const about = useProfile((s) => s.profile.about);
  const updateSection = useProfile((s) => s.updateSection);

  const set = (key: keyof typeof about) => (value: string) =>
    updateSection("about", { ...about, [key]: value });

  return (
    <div className="space-y-3">
      <Field label="Currently working on" value={about.working} onChange={set("working")} />
      <Field label="Currently studying" value={about.studying} onChange={set("studying")} />
      <Field label="Currently learning" value={about.learning} onChange={set("learning")} />
      <Field label="Fun fact" value={about.funFact} onChange={set("funFact")} />
    </div>
  );
}