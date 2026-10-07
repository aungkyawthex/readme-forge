import { emptyProfile, type Profile } from "../types/profile";

// Pulls only Header + About from pasted Markdown (our format, plus a plain first heading).
export function parseHeaderAndAbout(markdown: string): {
  header: Profile["header"];
  about: Profile["about"];
} {
  const header = { ...emptyProfile.header };
  const about = { ...emptyProfile.about };

  const nameMatch =
    markdown.match(/^#\s+(?:Hi\s*👋?,?\s*)?(?:I'm|I am)\s+(.+)$/im) ??
    markdown.match(/^#\s+(.+)$/m);
  if (nameMatch) header.name = nameMatch[1].replace(/[*_]/g, "").trim();

  const roleLine = markdown.match(/^###\s+(.+)$/m);
  if (roleLine) {
    const [role, company] = roleLine[1].split(/\s+@\s+/);
    header.role = (role ?? "").trim();
    header.company = (company ?? "").trim();
  }

  const tagline = markdown.match(/^>\s+(.+)$/m);
  if (tagline) header.tagline = tagline[1].trim();

  const working = markdown.match(/Currently working on\s+\*\*(.+?)\*\*/i);
  if (working) about.working = working[1].trim();

  const studying = markdown.match(/Studying\s+\*\*(.+?)\*\*/i);
  if (studying) about.studying = studying[1].trim();

  const learning = markdown.match(/Learning\s+\*\*(.+?)\*\*/i);
  if (learning) about.learning = learning[1].trim();

  const funFact = markdown.match(/Fun fact:\s*(.+)$/im);
  if (funFact) about.funFact = funFact[1].trim();

  return { header, about };
}
