import { useState } from "react";
import { useProfile } from "./store/useProfile";
import { generateMarkdown, sections } from "./sections";
import { HeaderForm } from "./components/forms/HeaderForm";
import { AboutForm } from "./components/forms/AboutForm";
import { SkillsForm } from "./components/forms/SkillsForm";
import { ProjectsForm } from "./components/forms/ProjectsForm";
import { Preview } from "./components/Preview";

const forms = {
  header: HeaderForm,
  about: AboutForm,
  skills: SkillsForm,
  projects: ProjectsForm,
} as const;

type SectionId = keyof typeof forms;

export default function App() {
  const profile = useProfile((s) => s.profile);
  const markdown = generateMarkdown(profile);
  const [activeId, setActiveId] = useState<SectionId>("header");
  const ActiveForm = forms[activeId];
  const activeLabel = sections.find((s) => s.id === activeId)?.label ?? "";

  return (
    <div className="grid h-screen grid-cols-[14rem_1fr_1fr] gap-6 p-6">
      <nav className="flex flex-col gap-1 overflow-y-auto" aria-label="README sections">
        {sections.map((section) => {
          const id = section.id as SectionId;
          const selected = id === activeId;
          return (
            <button
              key={section.id}
              type="button"
              aria-current={selected ? "page" : undefined}
              className={`rounded px-3 py-2 text-left text-sm ${
                selected ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveId(id)}
            >
              {section.label}
            </button>
          );
        })}
      </nav>

      <section className="overflow-y-auto">
        <h2 className="mb-4 text-lg font-semibold">{activeLabel}</h2>
        <ActiveForm />
      </section>

      <section className="overflow-y-auto rounded-lg border p-6">
        <Preview markdown={markdown} />
        <button
          className="mt-4 rounded bg-black px-4 py-2 text-white"
          onClick={() => navigator.clipboard.writeText(markdown)}
        >
          Copy Markdown
        </button>
      </section>
    </div>
  );
}
