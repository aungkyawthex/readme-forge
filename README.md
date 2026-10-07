# readme-forge

readme-forge is a client-side editor for creating a polished GitHub profile README—the `username/username` repository shown on your GitHub profile.

It provides live Markdown and rendered previews, reusable sections, templates, GitHub-stat image cards, section ordering, and copy/download export. Drafts are stored only in your browser's local storage.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to create a production build, and `npm test` to run the Markdown renderer tests.

## Tech stack

- React, TypeScript, and Vite
- Tailwind CSS v4
- Zod and Zustand
- react-markdown with remark-gfm and rehype-raw
- dnd-kit, React Router, and Vitest

## Deploy

The app is fully static and can deploy to Vercel without a server. `vercel.json` rewrites client-side routes (including `/editor`) to the Vite entry point.
