import { useProfile } from "../../store/useProfile";
import { Field } from "../Field";
import { Toggle } from "../Toggle";

export function GitHubStatsForm() {
  const githubStats = useProfile((s) => s.profile.githubStats);
  const updateSection = useProfile((s) => s.updateSection);

  return (
    <div className="space-y-3">
      <Field
        label="GitHub username"
        value={githubStats.githubUsername}
        onChange={(githubUsername) =>
          updateSection("githubStats", { ...githubStats, githubUsername })
        }
        placeholder="octocat"
      />
      <Toggle
        label="Stats card"
        checked={githubStats.showStats}
        onChange={(showStats) =>
          updateSection("githubStats", { ...githubStats, showStats })
        }
      />
      <Toggle
        label="Top languages"
        checked={githubStats.showTopLanguages}
        onChange={(showTopLanguages) =>
          updateSection("githubStats", { ...githubStats, showTopLanguages })
        }
      />
      <Toggle
        label="Streak"
        checked={githubStats.showStreak}
        onChange={(showStreak) =>
          updateSection("githubStats", { ...githubStats, showStreak })
        }
      />
      <p className="text-xs text-gray-500">
        Cards are images from github-readme-stats. If they stop loading, change
        GITHUB_README_STATS_BASE in src/sections/index.ts to a self-hosted
        instance.
      </p>
    </div>
  );
}
