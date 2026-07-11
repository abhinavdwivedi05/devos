import { ProductivityStats } from "@/types";

const mockAnalytics: ProductivityStats = {
  studyHours: [
    { date: "Mon", hours: 4.5 },
    { date: "Tue", hours: 6.2 },
    { date: "Wed", hours: 5.8 },
    { date: "Thu", hours: 7.1 },
    { date: "Fri", hours: 6.5 },
    { date: "Sat", hours: 3.2 },
    { date: "Sun", hours: 2.0 }
  ],
  commitsByWeek: [
    { name: "W1", commits: 24 },
    { name: "W2", commits: 32 },
    { name: "W3", commits: 18 },
    { name: "W4", commits: 45 },
    { name: "W5", commits: 38 },
    { name: "W6", commits: 42 }
  ],
  problemsSolvedByWeek: [
    { name: "W1", solved: 4 },
    { name: "W2", solved: 8 },
    { name: "W3", solved: 5 },
    { name: "W4", solved: 12 },
    { name: "W5", solved: 9 },
    { name: "W6", solved: 14 }
  ],
  tasksCompletedByWeek: [
    { name: "W1", tasks: 12 },
    { name: "W2", tasks: 16 },
    { name: "W3", tasks: 10 },
    { name: "W4", tasks: 22 },
    { name: "W5", tasks: 18 },
    { name: "W6", tasks: 25 }
  ]
};

export const analyticsService = {
  getProductivityStats: async (): Promise<ProductivityStats> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAnalytics), 300);
    });
  }
};
