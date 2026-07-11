import { GitHubAnalyticsData, ContributionDay } from "@/types";

// Generates a mock GitHub contribution calendar for the past year
const generateContributionCalendar = (): ContributionDay[] => {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    // Generate organic patterns: higher activity during weekdays, lower on weekends
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const probability = isWeekend ? 0.3 : 0.75;
    let count = 0;

    if (Math.random() < probability) {
      // Pick contribution count
      count = Math.floor(Math.random() * 8);
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 4) level = 2;
    else if (count > 4 && count <= 6) level = 3;
    else if (count > 6) level = 4;

    contributions.push({
      date: d.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return contributions;
};

const mockGitHubData: GitHubAnalyticsData = {
  username: "alexrivera",
  totalCommits: 1482,
  contributionStreak: 18,
  pullRequests: { open: 4, merged: 87, closed: 12 },
  issues: { open: 8, closed: 54 },
  contributions: generateContributionCalendar(),
  languages: [
    { name: "TypeScript", value: 52, color: "#3178c6" },
    { name: "JavaScript", value: 24, color: "#f1e05a" },
    { name: "CSS", value: 12, color: "#563d7c" },
    { name: "HTML", value: 8, color: "#e34c26" },
    { name: "Rust", value: 4, color: "#dea584" },
  ],
  repositories: [
    {
      id: "repo-1",
      name: "devos-dashboard",
      description: "React 19, Next.js 16 (App Router) and Tailwind CSS v4 workspace container for developers.",
      stars: 142,
      forks: 23,
      language: "TypeScript",
      languageColor: "#3178c6",
      updatedAt: "2026-07-11T12:00:00Z",
    },
    {
      id: "repo-2",
      name: "awesome-react-hooks",
      description: "Collection of highly optimized, custom React hooks for state, sensors, and timers.",
      stars: 873,
      forks: 98,
      language: "TypeScript",
      languageColor: "#3178c6",
      updatedAt: "2026-07-09T08:30:00Z",
    },
    {
      id: "repo-3",
      name: "speedy-cli",
      description: "Zero-config compiler tool for bundling Node libraries in typescript format.",
      stars: 48,
      forks: 4,
      language: "Rust",
      languageColor: "#dea584",
      updatedAt: "2026-06-25T17:00:00Z",
    },
    {
      id: "repo-4",
      name: "stripe-invoicing-demo",
      description: "Complete checkout flow utilizing Stripe elements, webhook events and custom invoice triggers.",
      stars: 12,
      forks: 1,
      language: "JavaScript",
      languageColor: "#f1e05a",
      updatedAt: "2026-05-18T14:00:00Z",
    },
  ],
};

export const githubService = {
  getAnalyticsData: async (username: string): Promise<GitHubAnalyticsData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockGitHubData,
          username,
        });
      }, 400); // simulate API latency
    });
  },
};
