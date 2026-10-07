import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";

export function SocialsForm() {
  const socials = useProfile((s) => s.profile.socials);
  const updateSection = useProfile((s) => s.updateSection);

  const set = (key: keyof typeof socials) => (value: string) =>
    updateSection("socials", { ...socials, [key]: value });

  return (
    <div className="space-y-3">
      <Field
        label="GitHub"
        value={socials.github}
        onChange={set("github")}
        placeholder="username or URL"
      />
      <Field
        label="LinkedIn"
        value={socials.linkedin}
        onChange={set("linkedin")}
        placeholder="username or URL"
      />
      <Field
        label="X (Twitter)"
        value={socials.x}
        onChange={set("x")}
        placeholder="handle or URL"
      />
      <Field
        label="Email"
        value={socials.email}
        onChange={set("email")}
        placeholder="you@example.com"
      />
      <Field
        label="Portfolio"
        value={socials.portfolio}
        onChange={set("portfolio")}
        placeholder="https://..."
      />
    </div>
  );
}
