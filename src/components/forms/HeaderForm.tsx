import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";

export function HeaderForm() {
  const header = useProfile((s) => s.profile.header);
  const updateSection = useProfile((s) => s.updateSection);

  const set = (key: keyof typeof header) => (value: string) =>
    updateSection("header", { ...header, [key]: value });

  return (
    <div className="space-y-3">
      <Field label="Name" value={header.name} onChange={set("name")} />
      <Field label="Role" value={header.role} onChange={set("role")} />
      <Field label="Company" value={header.company} onChange={set("company")} />
      <Field label="Tagline" value={header.tagline} onChange={set("tagline")} />
    </div>
  );
}