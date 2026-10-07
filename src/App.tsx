import { useState } from "react";
import { useProfile } from "./store/useProfile";
import { generateMarkdown, sections } from "./sections";
import { HeaderForm } from "./components/forms/HeaderForm";
import { AboutForm } from "./components/forms/AboutForm";
import { SocialsForm } from "./components/forms/SocialsForm";
import { SkillsForm } from "./components/forms/SkillsForm";
import { GitHubStatsForm } from "./components/forms/GitHubStatsForm";
import { ProjectsForm } from "./components/forms/ProjectsForm";
import { ExperienceForm } from "./components/forms/ExperienceForm";
import { EducationForm } from "./components/forms/EducationForm";
import { InterestsForm } from "./components/forms/InterestsForm";
import { ExtrasForm } from "./components/forms/ExtrasForm";
import { SectionSidebar } from "./components/SectionSidebar";
import { OutputPanel } from "./components/OutputPanel";
import { EditorToolbar } from "./components/EditorToolbar";

const forms = {
  header: HeaderForm,
  about: AboutForm,
  socials: SocialsForm,
  skills: SkillsForm,
  githubStats: GitHubStatsForm,
  projects: ProjectsForm,
  experience: ExperienceForm,
  education: EducationForm,
  interests: InterestsForm,
  extras: ExtrasForm,
} as const;

type SectionId = keyof typeof forms;

export default function App() {
  const profile = useProfile((s) => s.profile);
  const sectionOrder = useProfile((s) => s.sectionOrder);
  const disabledSections = useProfile((s) => s.disabledSections);
  const theme = useProfile((s) => s.theme);
  const markdown = generateMarkdown(profile, { sectionOrder, disabledSections });
  const [activeId, setActiveId] = useState<SectionId>("header");
  const [mobilePanel, setMobilePanel] = useState<"edit" | "preview">("edit");
  const ActiveForm = forms[activeId];
  const activeLabel = sections.find((s) => s.id === activeId)?.label ?? "";

  return (
    <div className="app-shell flex min-h-screen flex-col gap-4 p-4 sm:p-6" data-theme={theme}>
      <EditorToolbar />
      <div className="flex rounded-lg border p-1 lg:hidden" role="tablist" aria-label="Editor view">
        <button
          type="button"
          role="tab"
          aria-selected={mobilePanel === "edit"}
          className={`flex-1 rounded px-3 py-2 text-sm ${mobilePanel === "edit" ? "bg-[var(--accent)] text-white" : ""}`}
          onClick={() => setMobilePanel("edit")}
        >
          Edit
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobilePanel === "preview"}
          className={`flex-1 rounded px-3 py-2 text-sm ${mobilePanel === "preview" ? "bg-[var(--accent)] text-white" : ""}`}
          onClick={() => setMobilePanel("preview")}
        >
          Preview
        </button>
      </div>
      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)_minmax(0,1fr)]">
        <div className={mobilePanel === "preview" ? "hidden lg:block" : ""}>
          <SectionSidebar
            activeId={activeId}
            onSelect={(id) => setActiveId(id as SectionId)}
          />
        </div>

        <section className={`editor-panel overflow-y-auto ${mobilePanel === "preview" ? "hidden lg:block" : ""}`}>
          <p className="editor-kicker">Editing section</p>
          <h2 className="mb-5 text-xl font-semibold tracking-tight">{activeLabel}</h2>
          <ActiveForm />
        </section>

        <div className={mobilePanel === "edit" ? "hidden lg:block" : ""}>
          <OutputPanel markdown={markdown} />
        </div>
      </div>
    </div>
  );
}
