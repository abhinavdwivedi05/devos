import { JournalEntry } from "@/types";

const mockJournal: JournalEntry[] = [
  { id: "j-1", date: "2026-07-09", content: "Great progress today on the Next.js workspace setup. Managed to configure import paths and folders clean. Logged 6 hours of solid focus.", mood: "productive", productivityScore: 8, tags: ["setup", "focus"], createdAt: "2026-07-09T22:00:00Z" },
  { id: "j-2", date: "2026-07-10", content: "A bit tired today but managed to solve a Binary Search Tree medium problem. Reviewed resume ATS keyword matches. Got some suggestions for optimizing keywords for cloud projects.", mood: "tired", productivityScore: 6, tags: ["leetcode", "career"], createdAt: "2026-07-10T22:30:00Z" },
  { id: "j-3", date: "2026-07-11", content: "Highly focused day! Formulated the design system, wrote clean theme files, and set up the global Zustand store. Feeling excited about the look and feel of the app.", mood: "focused", productivityScore: 9, tags: ["design", "state"], createdAt: "2026-07-11T17:00:00Z" }
];

export const journalService = {
  getEntries: async (): Promise<JournalEntry[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJournal), 250);
    });
  }
};
