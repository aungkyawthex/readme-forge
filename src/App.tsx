import { useProfile } from "./store/useProfile";
import { generateMarkdown } from "./sections";
import { HeaderForm } from "./components/forms/HeaderForm";
import { Preview } from "./components/Preview";

export default function App() {
  const profile = useProfile((s) => s.profile);
  const markdown = generateMarkdown(profile);

  return (
    <div className="grid h-screen grid-cols-2 gap-6 p-6">
      <section className="overflow-y-auto">
        <HeaderForm />
      </section>
      <section className="overflow-y-auto rounded-lg border p-6">
        <Preview markdown={markdown} />
        <button
          className="mt-4 rounded bg-black px-4 py-2 text-white"
          onClick={() => navigator.clipboard.writeText(markdown)}
        >
          Copy Markdown
        </button>
      </section>
    </div>
  );
}