import type { Profile } from "../../types/profile";
import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";
import { RepeatableList } from "../RepeatableList";

type Project = Profile["projects"][number];

const emptyProject = (): Project => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  repoUrl: "",
  liveUrl: "",
});

export function ProjectsForm() {
  const projects = useProfile((s) => s.profile.projects);
  const updateSection = useProfile((s) => s.updateSection);

  return (
    <RepeatableList
      items={projects}
      onChange={(next) => updateSection("projects", next)}
      createItem={emptyProject}
      addLabel="Add project"
      itemTitle={(index) => `Project ${index + 1}`}
    >
      {(project, patch) => (
        <>
          <Field
            label="Title"
            value={project.title}
            onChange={(title) => patch({ title })}
          />
          <Field
            label="Description"
            value={project.description}
            onChange={(description) => patch({ description })}
          />
          <Field
            label="Repo URL"
            value={project.repoUrl}
            onChange={(repoUrl) => patch({ repoUrl })}
            placeholder="https://github.com/..."
          />
          <Field
            label="Live URL"
            value={project.liveUrl}
            onChange={(liveUrl) => patch({ liveUrl })}
            placeholder="https://..."
          />
        </>
      )}
    </RepeatableList>
  );
}
