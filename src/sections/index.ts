import type { Profile } from "../types/profile";

export type Section = {
  id: string;
  label: string;
  render: (p: Profile) => string;
};

// Point these at a self-hosted instance if the public APIs rate-limit you.
export const GITHUB_README_STATS_BASE = "https://github-readme-stats.vercel.app";
export const GITHUB_STREAK_STATS_BASE = "https://streak-stats.demolab.com";

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
    ]
      .filter(Boolean)
      .join("\n\n");
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

function hrefOrPath(value: string, prefix: string): string {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${prefix}${trimmed.replace(/^@/, "")}`;
}

function badge(label: string, color: string, logo: string, href: string): string {
  const src = `https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
  return `<a href="${href}"><img src="${src}" alt="${label}" /></a>`;
}

const socials: Section = {
  id: "socials",
  label: "Socials",
  render: ({ socials: s }) => {
    const badges = [
      s.github &&
        badge("GitHub", "181717", "github", hrefOrPath(s.github, "https://github.com/")),
      s.linkedin &&
        badge(
          "LinkedIn",
          "0A66C2",
          "linkedin",
          hrefOrPath(s.linkedin, "https://linkedin.com/in/")
        ),
      s.x && badge("X", "000000", "x", hrefOrPath(s.x, "https://x.com/")),
      s.portfolio &&
        badge("Portfolio", "5B21B6", "globe", hrefOrPath(s.portfolio, "https://")),
      s.email &&
        badge("Email", "D14836", "gmail", `mailto:${s.email.trim()}`),
    ].filter(Boolean);
    return badges.length ? `## Connect with me\n\n<p>\n  ${badges.join("\n  ")}\n</p>` : "";
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

function githubUsername(p: Profile): string {
  const raw = p.githubStats.githubUsername.trim() || p.socials.github.trim();
  return raw
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/\/.*$/, "")
    .replace(/^@/, "");
}

const githubStats: Section = {
  id: "githubStats",
  label: "GitHub Stats",
  render: (p) => {
    const user = githubUsername(p);
    const { showStats, showTopLanguages, showStreak } = p.githubStats;
    if (!user || (!showStats && !showTopLanguages && !showStreak)) return "";

    const images = [
      showStats &&
        `<img src="${GITHUB_README_STATS_BASE}/api?username=${encodeURIComponent(user)}&show_icons=true" alt="${user}'s GitHub stats" />`,
      showTopLanguages &&
        `<img src="${GITHUB_README_STATS_BASE}/api/top-langs/?username=${encodeURIComponent(user)}&layout=compact" alt="${user}'s top languages" />`,
      showStreak &&
        `<img src="${GITHUB_STREAK_STATS_BASE}/?user=${encodeURIComponent(user)}" alt="${user}'s streak" />`,
    ].filter(Boolean);

    return `## GitHub Stats\n\n<p>\n  ${images.join("\n  ")}\n</p>`;
  },
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

const experience: Section = {
  id: "experience",
  label: "Experience",
  render: ({ experience }) => {
    const items = experience
      .filter((e) => e.company.trim() || e.role.trim())
      .map((e) => {
        const heading = [e.role && `**${e.role}**`, e.company && `@ ${e.company}`]
          .filter(Boolean)
          .join(" ");
        const period = e.period.trim() ? ` (${e.period})` : "";
        const summary = e.summary.trim() ? `\n  ${e.summary}` : "";
        return `- ${heading}${period}${summary}`;
      });
    return items.length ? `## Experience\n\n${items.join("\n")}` : "";
  },
};

const education: Section = {
  id: "education",
  label: "Education",
  render: ({ education }) => {
    const items = education
      .filter((e) => e.title.trim() || e.school.trim())
      .map((e) => {
        const main = [e.title && `**${e.title}**`, e.school].filter(Boolean).join(" — ");
        const year = e.year.trim() ? ` (${e.year})` : "";
        return `- ${main}${year}`;
      });
    return items.length ? `## Education & Certifications\n\n${items.join("\n")}` : "";
  },
};

const interests: Section = {
  id: "interests",
  label: "Interests",
  render: ({ interests }) =>
    interests.length ? `## Interests\n\n${interests.map((i) => `\`${i}\``).join(" · ")}` : "",
};

const extras: Section = {
  id: "extras",
  label: "Extras",
  render: (p) => {
    const user = githubUsername(p);
    const parts = [
      p.extras.quote.trim() && `> ${p.extras.quote.trim()}`,
      p.extras.showVisitorCounter &&
        user &&
        `<img src="https://komarev.com/ghpvc/?username=${encodeURIComponent(user)}&label=Profile%20views" alt="profile views" />`,
      p.extras.supportUrl.trim() &&
        `[☕ Support me](${p.extras.supportUrl.trim()})`,
    ].filter(Boolean);
    return parts.length ? parts.join("\n\n") : "";
  },
};

export const sections: Section[] = [
  header,
  about,
  socials,
  skills,
  githubStats,
  projects,
  experience,
  education,
  interests,
  extras,
];

export function generateMarkdown(profile: Profile): string {
  return sections
    .map((s) => s.render(profile))
    .filter(Boolean)
    .join("\n\n");
}
