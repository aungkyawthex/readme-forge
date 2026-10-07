import { Link } from "react-router-dom";

const features = [
  ["Live Markdown", "See GitHub-ready Markdown and a rendered README as you write."],
  ["Sections that fit you", "Build projects, experience, stats, links, skills, and more."],
  ["Your order, your voice", "Reorder, disable, and save every section in the browser."],
  ["Template starting points", "Pick Minimal, Developer, or Stats-heavy, then make it yours."],
  ["No account needed", "Your draft stays in local browser storage while you work."],
];

export function LandingPage() {
  return (
    <main className="landing-shell min-h-screen px-5 py-6 sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-6xl items-center justify-between" aria-label="Main navigation">
        <Link className="landing-brand" to="/">readme-forge</Link>
        <div className="landing-nav-actions">
          <a className="landing-star" href="https://github.com/aungkyawthex/readme-forge" target="_blank" rel="noreferrer">
            <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M8 .75a.75.75 0 0 1 .673.418l1.91 3.87 4.27.621a.75.75 0 0 1 .416 1.279l-3.09 3.012.73 4.253a.75.75 0 0 1-1.088.79L8 12.984l-3.82 2.009a.75.75 0 0 1-1.088-.79l.73-4.253L.732 6.938a.75.75 0 0 1 .416-1.279l4.27-.62 1.91-3.871A.75.75 0 0 1 8 .75Z" />
            </svg>
            Star on GitHub
          </a>
          <Link className="landing-text-link" to="/editor">Open editor <span aria-hidden="true">→</span></Link>
        </div>
      </nav>

      <section className="landing-hero mx-auto grid max-w-6xl items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div>
          <p className="landing-eyebrow">A GitHub profile, written with intent</p>
          <h1>Turn the blank README into a proper introduction.</h1>
          <p className="landing-lede">A private, browser-based workshop for building the README in your <code>username/username</code> repository.</p>
          <Link className="landing-cta" to="/editor">Start building <span aria-hidden="true">→</span></Link>
          <p className="landing-note">No sign-up. Just your README.</p>
        </div>

        <div className="blueprint-card" aria-label="Example generated README">
          <div className="blueprint-bar"><span /><span /><span /><p>README.md</p></div>
          <pre aria-hidden="true"><code><em># Hi, I'm Avery</em>{"\n\n"}<b>### Product-minded engineer</b>{"\n\n"}<span>## About Me</span>{"\n\n"}- Currently working on <strong>thoughtful tools</strong>{"\n"}- Learning <strong>TypeScript</strong>{"\n\n"}<span>## Projects</span>{"\n\n"}- <strong>**readme-forge**</strong>: Profiles, made personal.</code></pre>
          <div className="blueprint-stamp">ready to copy</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-[var(--landing-line)] py-12">
        <p className="landing-eyebrow">From first line to finished file</p>
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, description]) => (
            <article key={title}>
              <h2 className="text-base font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--landing-muted)]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="landing-footer mx-auto max-w-6xl border-t border-[var(--landing-line)] py-6 text-sm text-[var(--landing-muted)]">
        <span>Built for the repository that shares your GitHub username.</span>
        <span className="landing-developer">
          Developer: <a href="https://github.com/aungkyawthex" target="_blank" rel="noreferrer">aungkyawthex</a>
          <span aria-hidden="true">·</span>
          <a href="https://aungkyawth3t-portfolio.vercel.app/" target="_blank" rel="noreferrer">Portfolio</a>
        </span>
      </footer>
    </main>
  );
}
