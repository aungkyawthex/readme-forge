import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type PreviewProps = {
  markdown: string;
  githubTheme: "light" | "dark";
};

export function Preview({ markdown, githubTheme }: PreviewProps) {
  if (!markdown.trim()) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Fill in the form (start with Name) to see your README preview…
      </p>
    );
  }

  return (
    <article className={`github-preview prose max-w-none ${githubTheme === "dark" ? "github-dark" : "github-light"}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
