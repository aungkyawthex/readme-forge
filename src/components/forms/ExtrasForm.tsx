import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";
import { Toggle } from "../Toggle";
import { fieldError } from "../../lib/validation";

export function ExtrasForm() {
  const extras = useProfile((s) => s.profile.extras);
  const updateSection = useProfile((s) => s.updateSection);

  return (
    <div className="space-y-3">
      <Field
        label="Quote"
        value={extras.quote}
        onChange={(quote) => updateSection("extras", { ...extras, quote })}
        multiline
      />
      <Toggle
        label="Visitor counter"
        checked={extras.showVisitorCounter}
        onChange={(showVisitorCounter) =>
          updateSection("extras", { ...extras, showVisitorCounter })
        }
      />
      <p className="text-xs text-gray-500">
        The visitor counter uses your GitHub username from GitHub Stats or
        Socials.
      </p>
      <Field
        label="Support me URL"
        value={extras.supportUrl}
        onChange={(supportUrl) =>
          updateSection("extras", { ...extras, supportUrl })
        }
        placeholder="https://buymeacoffee.com/..."
        error={fieldError("supportUrl", extras.supportUrl)}
      />
    </div>
  );
}
