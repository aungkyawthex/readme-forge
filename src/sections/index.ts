import type { Profile } from "../types/profile";

export type Section = { id: string; label: string; render: (profile: Profile) => string };

export const GITHUB_README_STATS_BASE = "https://github-readme-stats.vercel.app";
export const GITHUB_STREAK_STATS_BASE = "https://streak-stats.demolab.com";

function markdownText(value: string): string {
  return value.trim().replace(/[\\`*_\[\]<>#]/g, "\\$&").replace(/\r?\n/g, " ");
}

function safeUrl(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch { return undefined; }
}

function profileLink(value: string, prefix: string): string {
  return safeUrl(value) ?? `${prefix}${encodeURIComponent(value.trim().replace(/^@/, ""))}`;
}

function badge(label: string, color: string, logo: string, href: string): string {
  const src = `https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
  return `<a href="${href}"><img src="${src}" alt="${label}" /></a>`;
}

function githubUsername(profile: Profile): string {
  const raw = profile.githubStats.githubUsername.trim() || profile.socials.github.trim();
  return raw.replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\/.*$/, "").replace(/^@/, "");
}

const header: Section = {
  id: "header", label: "Header",
  render: ({ header: value }) => !value.name ? "" : [
    `# Hi, I'm ${markdownText(value.name)}`,
    value.role || value.company ? `### ${[value.role && markdownText(value.role), value.company && `@ ${markdownText(value.company)}`].filter(Boolean).join(" ")}` : "",
    value.tagline ? `> ${markdownText(value.tagline)}` : "",
  ].filter(Boolean).join("\n\n"),
};

const about: Section = {
  id: "about", label: "About Me",
  render: ({ about: value }) => {
    const lines = [value.working && `- Currently working on **${markdownText(value.working)}**`, value.studying && `- Studying **${markdownText(value.studying)}**`, value.learning && `- Learning **${markdownText(value.learning)}**`, value.funFact && `- Fun fact: ${markdownText(value.funFact)}`].filter(Boolean);
    return lines.length ? `## About Me\n\n${lines.join("\n")}` : "";
  },
};

const socials: Section = {
  id: "socials", label: "Socials",
  render: ({ socials: value }) => {
    const portfolio = safeUrl(value.portfolio);
    const badges = [
      value.github && badge("GitHub", "181717", "github", profileLink(value.github, "https://github.com/")),
      value.linkedin && badge("LinkedIn", "0A66C2", "linkedin", profileLink(value.linkedin, "https://linkedin.com/in/")),
      value.x && badge("X", "000000", "x", profileLink(value.x, "https://x.com/")),
      portfolio && badge("Portfolio", "5B21B6", "globe", portfolio),
      value.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) && badge("Email", "D14836", "gmail", `mailto:${encodeURIComponent(value.email.trim())}`),
    ].filter(Boolean);
    return badges.length ? `## Connect with me\n\n<p>\n  ${badges.join("\n  ")}\n</p>` : "";
  },
};

const skills: Section = { id: "skills", label: "Skills", render: ({ skills: value }) => value.length ? `## Skills\n\n<p>\n  <img src="https://skillicons.dev/icons?i=${value.map(encodeURIComponent).join(",")}" alt="Skills" />\n</p>` : "" };

const githubStats: Section = {
  id: "githubStats", label: "GitHub Stats",
  render: (profile) => {
    const user = githubUsername(profile);
    const { showStats, showTopLanguages, showStreak } = profile.githubStats;
    if (!user || (!showStats && !showTopLanguages && !showStreak)) return "";
    const name = markdownText(user);
    const images = [showStats && `<img src="${GITHUB_README_STATS_BASE}/api?username=${encodeURIComponent(user)}&show_icons=true" alt="${name}'s GitHub stats" />`, showTopLanguages && `<img src="${GITHUB_README_STATS_BASE}/api/top-langs/?username=${encodeURIComponent(user)}&layout=compact" alt="${name}'s top languages" />`, showStreak && `<img src="${GITHUB_STREAK_STATS_BASE}/?user=${encodeURIComponent(user)}" alt="${name}'s streak" />`].filter((image): image is string => Boolean(image));
    // Separate blocks prevent GitHub from placing cards side-by-side on wide profiles.
    return `## GitHub Stats\n\n${images.map((image) => `<p>\n  ${image}\n</p>`).join("\n")}`;
  },
};

const projects: Section = {
  id: "projects", label: "Projects",
  render: ({ projects: value }) => {
    const items = value.filter((project) => project.title.trim()).map((project) => {
      const repo = safeUrl(project.repoUrl); const live = safeUrl(project.liveUrl);
      const links = [repo && `[Repo](${repo})`, live && `[Live](${live})`].filter(Boolean).join(" · ");
      return `- **${markdownText(project.title)}**: ${markdownText(project.description)}${links ? ` (${links})` : ""}`;
    });
    return items.length ? `## Projects\n\n${items.join("\n")}` : "";
  },
};

const experience: Section = {
  id: "experience", label: "Experience",
  render: ({ experience: value }) => {
    const items = value.filter((entry) => entry.company.trim() || entry.role.trim()).map((entry) => {
      const heading = [entry.role && `**${markdownText(entry.role)}**`, entry.company && `@ ${markdownText(entry.company)}`].filter(Boolean).join(" ");
      return `- ${heading}${entry.period.trim() ? ` (${markdownText(entry.period)})` : ""}${entry.summary.trim() ? `\n  ${markdownText(entry.summary)}` : ""}`;
    });
    return items.length ? `## Experience\n\n${items.join("\n")}` : "";
  },
};

const education: Section = {
  id: "education", label: "Education",
  render: ({ education: value }) => {
    const items = value.filter((entry) => entry.title.trim() || entry.school.trim()).map((entry) => {
      const main = [entry.title && `**${markdownText(entry.title)}**`, entry.school && markdownText(entry.school)].filter(Boolean).join(" — ");
      return `- ${main}${entry.year.trim() ? ` (${markdownText(entry.year)})` : ""}`;
    });
    return items.length ? `## Education & Certifications\n\n${items.join("\n")}` : "";
  },
};

const interests: Section = { id: "interests", label: "Interests", render: ({ interests: value }) => value.length ? `## Interests\n\n${value.map((item) => `\`${markdownText(item)}\``).join(" · ")}` : "" };

const extras: Section = {
  id: "extras", label: "Extras",
  render: (profile) => {
    const user = githubUsername(profile); const support = safeUrl(profile.extras.supportUrl);
    const parts = [profile.extras.quote.trim() && `> ${markdownText(profile.extras.quote)}`, profile.extras.showVisitorCounter && user && `<img src="https://komarev.com/ghpvc/?username=${encodeURIComponent(user)}&label=Profile%20views" alt="profile views" />`, support && `[Support me](${support})`].filter(Boolean);
    return parts.length ? parts.join("\n\n") : "";
  },
};

export const sections: Section[] = [header, about, socials, skills, githubStats, projects, experience, education, interests, extras];
export const defaultSectionOrder = sections.map((section) => section.id);
export type MarkdownOptions = { sectionOrder?: string[]; disabledSections?: string[] };

export function generateMarkdown(profile: Profile, { sectionOrder = defaultSectionOrder, disabledSections = [] }: MarkdownOptions = {}): string {
  const byId = new Map(sections.map((section) => [section.id, section]));
  const disabled = new Set(disabledSections); const seen = new Set<string>(); const ordered: Section[] = [];
  for (const id of sectionOrder) { const section = byId.get(id); if (!section || seen.has(id)) continue; seen.add(id); if (!disabled.has(id)) ordered.push(section); }
  for (const section of sections) if (!seen.has(section.id) && !disabled.has(section.id)) ordered.push(section);
  return ordered.map((section) => section.render(profile)).filter(Boolean).join("\n\n");
}
