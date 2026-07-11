import { Project } from "@/types";

const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "DevOS SaaS App",
    description: "Building the Operating System for developers. Combines notes, tasks, jobs, trackers and metrics tools in a Vercel-like dashboard.",
    status: "active",
    progress: 68,
    category: "Web Application",
    createdAt: "2026-07-01T08:00:00Z",
    updatedAt: "2026-07-11T12:00:00Z",
    members: [
      { id: "m-1", name: "Alex Rivera", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80", role: "Frontend Lead" },
      { id: "m-2", name: "Sarah Connor", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80", role: "Product Manager" }
    ],
    files: [
      { id: "f-1", name: "design_system.fig", size: "14.2 MB", uploadedAt: "2026-07-03", uploadedBy: "Sarah Connor", url: "#" },
      { id: "f-2", name: "architecture_diagram.pdf", size: "2.4 MB", uploadedAt: "2026-07-05", uploadedBy: "Alex Rivera", url: "#" }
    ],
    activities: [
      { id: "act-1", user: { name: "Alex Rivera", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" }, action: "moved task to Done", target: "Integrate Job Tracker mock API", timestamp: "2026-07-10T16:00:00Z" },
      { id: "act-2", user: { name: "Sarah Connor", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" }, action: "added a file", target: "design_system.fig", timestamp: "2026-07-03T11:20:00Z" }
    ],
    tasks: [
      { id: "p-task-1", projectId: "proj-1", title: "Design Landing Page", description: "Build modern dark UI layout.", status: "done", priority: "high", dueDate: "2026-07-05", createdAt: "2026-07-01T08:00:00Z" },
      { id: "p-task-2", projectId: "proj-1", title: "Framer Motion Animations", description: "Subtle page transitions and interactive grid cards.", status: "in-progress", priority: "medium", dueDate: "2026-07-12", createdAt: "2026-07-01T08:00:00Z" },
      { id: "p-task-3", projectId: "proj-1", title: "Settings Panels Configuration", description: "OAuth connections and preferences toggles.", status: "todo", priority: "low", dueDate: "2026-07-15", createdAt: "2026-07-01T08:00:00Z" }
    ]
  },
  {
    id: "proj-2",
    name: "CLI Toolkit",
    description: "Developer utility tool to bootstrap folders, packages, typescript, and lint profiles in single-command actions.",
    status: "completed",
    progress: 100,
    category: "Open Source Tool",
    createdAt: "2026-06-10T08:00:00Z",
    updatedAt: "2026-06-25T17:00:00Z",
    members: [
      { id: "m-1", name: "Alex Rivera", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80", role: "Creator" }
    ],
    files: [
      { id: "f-3", name: "npm_release_spec.md", size: "128 KB", uploadedAt: "2026-06-12", uploadedBy: "Alex Rivera", url: "#" }
    ],
    activities: [
      { id: "act-3", user: { name: "Alex Rivera", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" }, action: "released version v1.0.0 to NPM", target: "@devos/cli", timestamp: "2026-06-25T17:00:00Z" }
    ],
    tasks: [
      { id: "p-task-4", projectId: "proj-2", title: "NPM Package Deployment", description: "Publish setup command parameters.", status: "done", priority: "high", dueDate: "2026-06-25", createdAt: "2026-06-10T08:00:00Z" }
    ]
  }
];

export const projectsService = {
  getProjects: async (): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProjects), 350);
    });
  }
};
