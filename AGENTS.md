# Task: Finish building "readme-forge", a GitHub profile README generator

## Project context
readme-forge is a client-side web app where users fill in forms and get a live-previewed, copyable `README.md` for their GitHub profile (the `username/username` repo).

**Stack (already installed and working):** React + Vite + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Zod, Zustand (with `persist`), react-markdown + remark-gfm + rehype-raw.

**Developer context:** I know React well but I'm new to TypeScript. Keep types simple (use `type`, not `interface`; avoid `any`; prefer inference). Add short comments where a TypeScript concept is non-obvious.

## Current state (already done, do not rewrite)
- `src/types/profile.ts`: Zod `profileSchema`, `Profile` type via `z.infer`, `emptyProfile`. Currently has: `header` (name, role, company, tagline), `about` (working, studying, learning, funFact), `skills: string[]`, `projects[]`.
- `src/store/useProfile.ts`: Zustand store with persist (`profile`, `updateSection(key, value)`, `reset`).
- `src/sections/index.ts`: section registry. Each section is `{ id, label, render(profile) => string }`. `generateMarkdown(profile)` joins non-empty renders. Sections exist for header, about, skills, projects.
- Components: `Field`, `Preview`, `HeaderForm`. `App.tsx` is a two-column layout (forms left, preview + "Copy Markdown" right).

## Architecture rules (follow strictly)
1. **Schema is the source of truth.** Add new data to the Zod schema and `emptyProfile`; never hand-write types that duplicate it.
2. **Every README section = one registry entry + one form component.** Follow the existing pattern.
3. `render` functions are pure, return `""` when the section has no data, and output GitHub-compatible Markdown/HTML only. GitHub READMEs cannot run JavaScript, so anything dynamic must be an image/SVG URL.
4. Repeatable lists (projects, experience, education) need a stable `id` (`crypto.randomUUID()`) and add/update/remove handlers.
5. Reuse components (`Field`, `TagInput`, a generic repeatable-list pattern) instead of duplicating code.
6. Keep dependencies minimal. Only add the libraries named in this prompt.
7. Make persisted-state changes safe: if the schema changes, a user with old localStorage data must not crash the app (merge persisted data with `emptyProfile` defaults, or bump the persist `version` with a `migrate`).

## Milestones
Work through these in order. After each milestone: run `npm run build` and `npx tsc --noEmit`, fix all errors, then stop and give me a 3-5 line summary of what changed and how to manually test it. Wait for my "continue" before starting the next milestone.

### Milestone 1: Finish core sections
- Create `AboutForm` (4 fields) and wire it into `App.tsx`.
- Create a reusable `TagInput` component (add on Enter, remove with ×, trim, lowercase, no duplicates) and `SkillsForm` using it. Skills are skillicons.dev slugs (e.g. `react`, `php`, `laravel`, `ts`).
- Create `ProjectsForm` (add `id` to the project schema; fields: title, description, repoUrl, liveUrl; add and remove buttons).
- Replace the single long form column with a section sidebar plus the selected section's form (one form visible at a time).

### Milestone 2: Remaining README sections
Add schema, `render`, and a form for each:
- **Socials and Contact:** github, linkedin, email, portfolio, x. Render as badges or links.
- **Interests:** tag list (reuse `TagInput`).
- **Education and Certifications:** repeatable (school or issuer, title, year).
- **Experience:** repeatable (company, role, period, summary).
- **GitHub Stats:** `githubUsername` plus toggles for stats card, top languages, and streak, rendered as image URLs. Make the base URL configurable in one constant so it can later point to a self-hosted instance (the public `github-readme-stats` instance is rate-limited).
- **Extras:** quote, visitor counter toggle, "support me" link.

### Milestone 3: Section control and export
- Add `disabledSections: string[]` and `sectionOrder: string[]` to the store. `generateMarkdown` must respect both.
- Add a toggle (enable/disable) per section in the sidebar and drag-and-drop reordering with `@dnd-kit/core` and `@dnd-kit/sortable`.
- Add tabs on the right panel: **Preview** and **Raw Markdown** (read-only monospace textarea).
- Add a **Download README.md** button (Blob + anchor download) next to Copy, with a brief "Copied!" confirmation state.

### Milestone 4: Templates and import
- Add 3 templates (Minimal, Developer, Stats-heavy), each as a `Profile` plus `sectionOrder`, with sensible placeholder content. Add a "Load template" dropdown that asks for confirmation before overwriting existing data.
- Add a "Reset" action with confirmation.
- Optional: a simple "Import README" that pre-fills only the Header and About fields by parsing a pasted README. Skip it if it gets complicated and tell me.

### Milestone 5: UI polish
- Install `@tailwindcss/typography` for the preview's `prose` styling.
- Dark and light mode toggle, defined with CSS variables, persisted. Add a preview toggle for "GitHub light / GitHub dark" backgrounds.
- Responsive layout: on mobile, use Edit / Preview tabs instead of two columns.
- Basic accessibility: labels on all inputs, visible focus states, keyboard-operable drag handles.
- Migrate inputs and buttons to shadcn/ui **only if** setup is clean with the Vite guide (path alias `@/`). If it causes friction, skip and tell me.

### Milestone 6: Validation and robustness
- Add URL and email validation using the existing Zod schema (React Hook Form with `@hookform/resolvers/zod` for the repeatable forms is fine). Show inline error messages and never block copy or download because of a bad optional field.
- Escape or sanitize user input where it is injected into Markdown or HTML (for example, characters that would break a link or an `<img src>`), so output is always valid.
- Add unit tests with Vitest for `generateMarkdown` and each `render` function (empty data, full data, special characters).

### Milestone 7: Landing page and deploy
- Add a simple landing page (hero, 4-6 feature bullets, "Start building" CTA) using `react-router-dom`, routing `/` to the landing page and `/editor` to the app.
- Add a meta title, description, and favicon, plus a short project `README.md` (what it is, how to run it, tech stack).
- Make sure `npm run build` passes and the app works as a static Vercel deploy (no server needed).

## Out of scope for now (do NOT build)
Authentication, Supabase or any database, GitHub OAuth, pushing to a GitHub repo, server-side code, analytics.

## Working style
- Make small, focused changes. Don't refactor files unrelated to the current milestone.
- Before each milestone, list the files you plan to create or change.
- If a requirement is ambiguous, ask me one concise question instead of guessing.
- If you hit a TypeScript error you had to work around, explain the cause in one or two sentences.
- Never use `any`. Never leave `console.log` debugging in finished code.

Start with Milestone 1.