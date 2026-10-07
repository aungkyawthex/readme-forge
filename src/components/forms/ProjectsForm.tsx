import type { Profile } from "../../types/profile";
import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";

// Infer a single project from the schema-backed Profile type.
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

  const add = () => updateSection("projects", [...projects, emptyProject()]);

  const update = (id: string, key: keyof Omit<Project, "id">, value: string) =>
    updateSection(
      "projects",
      projects.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    );

  const remove = (id: string) =>
    updateSection(
      "projects",
      projects.filter((p) => p.id !== id)
    );

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={project.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Project {index + 1}</h3>
            <button
              type="button"
              className="text-sm text-red-600 hover:underline"
              onClick={() => remove(project.id)}
            >
              Remove
            </button>
          </div>
          <Field
            label="Title"
            value={project.title}
            onChange={(v) => update(project.id, "title", v)}
          />
          <Field
            label="Description"
            value={project.description}
            onChange={(v) => update(project.id, "description", v)}
          />
          <Field
            label="Repo URL"
            value={project.repoUrl}
            onChange={(v) => update(project.id, "repoUrl", v)}
            placeholder="https://github.com/..."
          />
          <Field
            label="Live URL"
            value={project.liveUrl}
            onChange={(v) => update(project.id, "liveUrl", v)}
            placeholder="https://..."
          />
        </div>
      ))}
      <button
        type="button"
        className="rounded bg-black px-4 py-2 text-white"
        onClick={add}
      >
        Add project
      </button>
    </div>
  );
}
