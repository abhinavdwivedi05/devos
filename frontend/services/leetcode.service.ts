import { LeetCodeStatsData } from "@/types";

const generateLeetCodeHeatmap = () => {
  const data = [];
  const today = new Date();
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(today.getDate() - 90);

  for (let d = new Date(ninetyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
    // Math random activity
    if (Math.random() > 0.4) {
      data.push({
        date: d.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 5) + 1,
      });
    }
  }
  return data;
};

const mockLeetCodeData: LeetCodeStatsData = {
  username: "alexrivera_lc",
  ranking: 42385,
  solved: {
    total: 312,
    easy: 98,
    medium: 172,
    hard: 42,
    totalAvailable: 3200,
    easyAvailable: 800,
    mediumAvailable: 1600,
    hardAvailable: 800,
  },
  contestRating: {
    rating: 1892,
    percentile: 94.5,
    attendedCount: 24,
    history: [
      { contestName: "Weekly Contest 380", rating: 1540, rank: 4500, date: "2026-02-01" },
      { contestName: "Weekly Contest 384", rating: 1610, rank: 3200, date: "2026-03-01" },
      { contestName: "Biweekly Contest 124", rating: 1680, rank: 1900, date: "2026-04-15" },
      { contestName: "Weekly Contest 392", rating: 1745, rank: 1200, date: "2026-05-20" },
      { contestName: "Weekly Contest 398", rating: 1812, rank: 870, date: "2026-06-15" },
      { contestName: "Biweekly Contest 132", rating: 1892, rank: 420, date: "2026-07-04" },
    ],
  },
  badges: [
    { id: "b-1", name: "50 Days Streak", icon: "🔥", earnedDate: "2026-04-30" },
    { id: "b-2", name: "2026 Annual Badge", icon: "🏆", earnedDate: "2026-06-20" },
    { id: "b-3", name: "Knight Rating", icon: "⚔️", earnedDate: "2026-07-04" },
  ],
  heatmap: generateLeetCodeHeatmap(),
};

export const leetcodeService = {
  getStats: async (username: string): Promise<LeetCodeStatsData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockLeetCodeData,
          username,
        });
      }, 400);
    });
  },
};
