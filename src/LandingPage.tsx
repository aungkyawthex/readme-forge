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
        <Link className="landing-text-link" to="/editor">Open editor <span aria-hidden="true">→</span></Link>
      </nav>

      <section className="landing-hero mx-auto grid max-w-6xl items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div>
          <p className="landing-eyebrow">A GitHub profile, written with intent</p>
          <h1>Turn the blank README into a proper introduction.</h1>
          <p className="landing-lede">A private, browser-based workshop for building the README in your <code>username/username</code> repository.</p>
          <Link className="landing-cta" to="/editor">Start building <span aria-hidden="true">→</span></Link>
          <p className="landing-note">No sign-in. No server. Just your README.</p>
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

      <footer className="mx-auto max-w-6xl border-t border-[var(--landing-line)] py-6 text-sm text-[var(--landing-muted)]">
        Built for the repository that shares your GitHub username.
      </footer>
    </main>
  );
}
