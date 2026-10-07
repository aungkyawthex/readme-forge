import type { Profile } from "../types/profile";

export type Section = {
  id: string;
  label: string;
  render: (p: Profile) => string;
};

const header: Section = {
  id: "header",
  label: "Header",
  render: ({ header: h }) => {
    if (!h.name) return "";
    return [
      `# Hi 👋, I'm ${h.name}`,
      h.role || h.company
        ? `### ${[h.role, h.company && `@ ${h.company}`].filter(Boolean).join(" ")}`
        : "",
      h.tagline ? `> ${h.tagline}` : "",
    ].filter(Boolean).join("\n\n");
  },
};

const about: Section = {
  id: "about",
  label: "About Me",
  render: ({ about: a }) => {
    const lines = [
      a.working && `- 🔭 Currently working on **${a.working}**`,
      a.studying && `- 🎓 Studying **${a.studying}**`,
      a.learning && `- 🌱 Learning **${a.learning}**`,
      a.funFact && `- ⚡ Fun fact: ${a.funFact}`,
    ].filter(Boolean);
    return lines.length ? `## About Me\n\n${lines.join("\n")}` : "";
  },
};

const skills: Section = {
  id: "skills",
  label: "Skills",
  render: ({ skills }) =>
    skills.length
      ? `## 🛠️ Skills\n\n<p>\n  <img src="https://skillicons.dev/icons?i=${skills.join(",")}" />\n</p>`
      : "",
};

const projects: Section = {
  id: "projects",
  label: "Projects",
  render: ({ projects }) => {
    if (!projects.length) return "";
    const items = projects
      .filter((p) => p.title.trim())
      .map((p) => {
        const links = [
          p.repoUrl && `[Repo](${p.repoUrl})`,
          p.liveUrl && `[Live](${p.liveUrl})`,
        ]
          .filter(Boolean)
          .join(" · ");
        return `- **${p.title}**: ${p.description}${links ? ` (${links})` : ""}`;
      });
    if (!items.length) return "";
    return `## 🚀 Projects\n\n${items.join("\n")}`;
  },
};

export const sections: Section[] = [header, about, skills, projects];

export function generateMarkdown(profile: Profile): string {
  return sections.map((s) => s.render(profile)).filter(Boolean).join("\n\n");
}