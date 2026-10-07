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
  const markdown = generateMarkdown(profile, { sectionOrder, disabledSections });
  const [activeId, setActiveId] = useState<SectionId>("header");
  const ActiveForm = forms[activeId];
  const activeLabel = sections.find((s) => s.id === activeId)?.label ?? "";

  return (
    <div className="flex h-screen flex-col gap-4 p-6">
      <EditorToolbar />
      <div className="grid min-h-0 flex-1 grid-cols-[16rem_1fr_1fr] gap-6">
        <SectionSidebar
          activeId={activeId}
          onSelect={(id) => setActiveId(id as SectionId)}
        />

        <section className="overflow-y-auto">
          <h2 className="mb-4 text-lg font-semibold">{activeLabel}</h2>
          <ActiveForm />
        </section>

        <OutputPanel markdown={markdown} />
      </div>
    </div>
  );
}
