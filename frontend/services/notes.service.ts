import { Note, NoteFolder } from "@/types";

const mockFolders: NoteFolder[] = [
  { id: "work", name: "Work Tasks", icon: "Briefcase" },
  { id: "personal", name: "Personal Ideas", icon: "User" },
  { id: "code", name: "Coding Snippets", icon: "Code" }
];

const mockNotes: Note[] = [
  {
    id: "note-1",
    title: "SaaS Architecture Planning",
    content: `# SaaS Architecture Planning\n\nNotes for building the Next.js App Router workspace:\n\n- **State Management:** Use Zustand for synchronous client layout state and global parameters.\n- **Data Fetching:** Standardize mock endpoints on services returns to simulate loading states with React Query.\n- **Theme Styling:** Dark-first configuration using Tailwind CSS v4 variables.\n- **Deployment:** Vercel Hosting with edge optimizations.\n\nTodo: Set up initial structure and build out main components folder.`,
    folderId: "work",
    tags: ["architecture", "nextjs"],
    isPinned: true,
    isArchived: false,
    isTrash: false,
    createdAt: "2026-07-09T10:00:00.000Z",
    updatedAt: "2026-07-11T12:00:00.000Z"
  },
  {
    id: "note-2",
    title: "SQL Performance Tuning Cheatsheet",
    content: `# SQL Performance Tuning Cheatsheet\n\nKey practices to optimize database execution paths:\n\n1. **Index Optimization:** Avoid index scan where indexes seek is possible. Use compound indexes appropriately.\n2. **Avoid SELECT *:** Retrieve specific columns to optimize pipeline memory usage.\n3. **EXPLAIN ANALYZE:** Run statistics queries to look for bottlenecks and costly joins.\n\n\`\`\`sql\nEXPLAIN ANALYZE\nSELECT u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.created_at > '2026-01-01';\n\`\`\``,
    folderId: "code",
    tags: ["database", "sql"],
    isPinned: false,
    isArchived: false,
    isTrash: false,
    createdAt: "2026-07-10T14:30:00.000Z",
    updatedAt: "2026-07-10T15:00:00.000Z"
  },
  {
    id: "note-3",
    title: "Morning Routine Checklist",
    content: `# Morning Checklist\n\nDaily schedule for high-productivity coding:\n\n- [x] Drink 500ml water\n- [x] Read HackerNews/Dev.to newsletter\n- [x] Check GitHub notifications\n- [ ] Review LeetCode daily target challenge\n- [ ] Complete morning team sync`,
    folderId: "personal",
    tags: ["productivity", "habits"],
    isPinned: false,
    isArchived: false,
    isTrash: false,
    createdAt: "2026-07-11T07:00:00.000Z",
    updatedAt: "2026-07-11T08:15:00.000Z"
  }
];

export const notesService = {
  getNotes: async (): Promise<Note[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockNotes), 300);
    });
  },
  getFolders: async (): Promise<NoteFolder[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFolders), 200);
    });
  }
};
