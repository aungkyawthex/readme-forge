import { describe, expect, it } from "vitest";
import { emptyProfile, type Profile } from "../types/profile";
import { generateMarkdown, sections } from ".";

function fullProfile(): Profile {
  return {
    ...emptyProfile,
    header: { name: "Ada", role: "Engineer", company: "Example", tagline: "Building tools" },
    about: { working: "a README", studying: "CS", learning: "TypeScript", funFact: "Likes tests" },
    socials: { github: "ada", linkedin: "ada", email: "ada@example.com", portfolio: "https://ada.dev", x: "ada" },
    skills: ["ts", "react"],
    interests: ["open source"],
    projects: [{ id: "project", title: "Forge", description: "Generator", repoUrl: "https://github.com/ada/forge", liveUrl: "https://forge.dev" }],
    education: [{ id: "education", school: "Example U", title: "BSc", year: "2024" }],
    experience: [{ id: "experience", company: "Example", role: "Developer", period: "2023-now", summary: "Built things" }],
    githubStats: { githubUsername: "ada", showStats: true, showTopLanguages: true, showStreak: true },
    extras: { quote: "Keep going", showVisitorCounter: true, supportUrl: "https://example.com/support" },
  };
}

describe("README section renderers", () => {
  it("returns empty output for every empty section", () => {
    for (const section of sections) expect(section.render(emptyProfile)).toBe("");
  });

  it("renders every populated section", () => {
    for (const section of sections) expect(section.render(fullProfile())).not.toBe("");
  });

  it("escapes Markdown text and drops unsafe URLs", () => {
    const profile = fullProfile();
    profile.header.name = "Ada [link](https://bad.test)";
    profile.projects[0].repoUrl = "javascript:alert(1)";
    const markdown = generateMarkdown(profile);
    expect(markdown).toContain("Ada \\[link\\](https://bad.test)");
    expect(markdown).not.toContain("javascript:");
  });

  it("escapes special text in every section", () => {
    const profile = fullProfile();
    const special = "<tag> [note]";
    profile.header = { name: special, role: special, company: special, tagline: special };
    profile.about = { working: special, studying: special, learning: special, funFact: special };
    profile.skills = [special];
    profile.interests = [special];
    profile.projects[0] = { ...profile.projects[0], title: special, description: special };
    profile.education[0] = { ...profile.education[0], school: special, title: special, year: special };
    profile.experience[0] = { ...profile.experience[0], company: special, role: special, period: special, summary: special };
    profile.extras.quote = special;
    for (const section of sections) expect(section.render(profile)).not.toContain("<tag>");
  });

  it("respects custom order and disabled sections", () => {
    const markdown = generateMarkdown(fullProfile(), { sectionOrder: ["projects", "header"], disabledSections: ["header"] });
    expect(markdown.startsWith("## Projects")).toBe(true);
    expect(markdown).not.toContain("Hi, I'm Ada");
  });
});
