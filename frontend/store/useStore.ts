"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Note,
  NoteFolder,
  TaskItem,
  Project,
  ProjectTask,
  ProjectMember,
  ProjectFile,
  AIMessage,
  AIRoadmap,
  ResumeVersion,
  JobApplication,
  Interview,
  JournalEntry,
  UserProfile,
  UserSettings,
  AppNotification,
  MoodType,
  TaskStatus,
  TaskPriority,
  JobStatus
} from "../types";

interface DevOSState {
  // Profile & Settings
  profile: UserProfile;
  settings: UserSettings;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;

  // Notes
  notes: Note[];
  folders: NoteFolder[];
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void; // permanent delete
  moveNoteToTrash: (id: string) => void;
  archiveNote: (id: string) => void;
  pinNote: (id: string) => void;
  createFolder: (name: string) => void;
  deleteFolder: (id: string) => void;

  // Tasks
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt" | "tasks" | "files" | "activities">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addProjectTask: (projectId: string, task: Omit<ProjectTask, "id" | "projectId" | "createdAt">) => void;
  updateProjectTask: (projectId: string, taskId: string, updates: Partial<ProjectTask>) => void;
  deleteProjectTask: (projectId: string, taskId: string) => void;
  addProjectFile: (projectId: string, file: Omit<ProjectFile, "id" | "uploadedAt" | "uploadedBy">) => void;
  deleteProjectFile: (projectId: string, fileId: string) => void;
  addProjectMember: (projectId: string, member: ProjectMember) => void;
  removeProjectMember: (projectId: string, memberId: string) => void;

  // AI Chat
  aiMessages: AIMessage[];
  addAIMessage: (message: Omit<AIMessage, "id" | "timestamp">) => void;
  clearAIChat: () => void;
  roadmaps: AIRoadmap[];
  addRoadmap: (roadmap: AIRoadmap) => void;
  toggleRoadmapStep: (roadmapId: string, stepId: string) => void;

  // Resumes
  resumes: ResumeVersion[];
  addResume: (resume: Omit<ResumeVersion, "id" | "uploadedAt" | "isActive">) => void;
  deleteResume: (id: string) => void;
  setActiveResume: (id: string) => void;

  // Jobs
  jobs: JobApplication[];
  addJob: (job: Omit<JobApplication, "id" | "appliedDate">) => void;
  updateJob: (id: string, updates: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;

  // Interviews
  interviews: Interview[];
  addInterview: (interview: Omit<Interview, "id" | "preparationChecklist" | "status">) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
  toggleInterviewChecklist: (interviewId: string, itemId: string) => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;

  // Notifications
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, "id" | "createdAt" | "isRead">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Search & Global Navigation UI UI states
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCommandMenuOpen: boolean;
  setCommandMenuOpen: (open: boolean) => void;
}

// In-memory initial data for our application to look complete and professional
const initialProfile: UserProfile = {
  name: "Alex Rivera",
  username: "alexrivera",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  bio: "Senior Frontend Engineer | UI/UX Enthusiast. Obsessed with building lightning fast, pixel-perfect user interfaces with React and Next.js.",
  socials: {
    github: "github.com/alexrivera",
    linkedin: "linkedin.com/in/alexrivera",
    twitter: "twitter.com/alexrivera_dev",
    website: "alexrivera.dev"
  },
  skills: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Zustand", "React Query", "Framer Motion", "Node.js", "GraphQL", "Docker"],
  achievements: [
    { id: "1", title: "Git Master", description: "Created over 500 commits in a single calendar year", icon: "GitCommit", date: "2026-04-12" },
    { id: "2", title: "LeetCode Specialist", description: "Solved 150+ Medium difficulty problems", icon: "Code2", date: "2026-05-30" },
    { id: "3", title: "ATS Optimizer", description: "Achieved a resume ATS rating score over 85%", icon: "FileCheck", date: "2026-06-15" }
  ]
};

const initialSettings: UserSettings = {
  profile: {
    name: "Alex Rivera",
    email: "alex.rivera@vercel.app",
    githubUsername: "alexrivera",
    leetcodeUsername: "alexrivera_lc"
  },
  appearance: {
    theme: "dark",
    reducedMotion: false,
    sidebarCollapsed: false
  },
  notifications: {
    emailAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
    browserNotifications: true
  },
  connections: {
    githubConnected: true,
    leetcodeConnected: true,
    googleConnected: false
  }
};

const initialFolders: NoteFolder[] = [
  { id: "work", name: "Work Tasks", icon: "Briefcase" },
  { id: "personal", name: "Personal Ideas", icon: "User" },
  { id: "code", name: "Coding Snippets", icon: "Code" }
];

const initialNotes: Note[] = [
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

const initialTasks: TaskItem[] = [
  { id: "task-1", title: "Complete DevOS landing page animations", description: "Add Framer Motion scroll highlights to features and pricing sliders.", status: "in-progress", priority: "high", labels: ["design", "frontend"], dueDate: "2026-07-12", isRecurring: false, createdAt: "2026-07-11T09:00:00Z", updatedAt: "2026-07-11T12:00:00Z" },
  { id: "task-2", title: "Solve LeetCode daily problem", description: "Daily challenge: Binary Tree Maximum Path Sum (Hard).", status: "todo", priority: "medium", labels: ["algorithms"], dueDate: "2026-07-11", isRecurring: true, recurrenceRule: "daily", createdAt: "2026-07-11T08:00:00Z", updatedAt: "2026-07-11T08:00:00Z" },
  { id: "task-3", title: "Review Resume version 3", description: "Optimize tech achievements with numbers and metrics.", status: "todo", priority: "high", labels: ["career"], dueDate: "2026-07-13", isRecurring: false, createdAt: "2026-07-10T10:00:00Z", updatedAt: "2026-07-10T10:00:00Z" },
  { id: "task-4", title: "Integrate Job Tracker mock API", description: "Create mock JSON entries and test visual state pipelines.", status: "done", priority: "medium", labels: ["backend", "frontend"], dueDate: "2026-07-10", isRecurring: false, createdAt: "2026-07-09T09:00:00Z", updatedAt: "2026-07-10T16:00:00Z" }
];

const initialProjects: Project[] = [
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

const initialJobs: JobApplication[] = [
  { id: "job-1", company: "Vercel", logo: "⚡", role: "Senior Developer Relations", salary: "$160,000 - $190,000", location: "Remote, US", type: "remote", status: "offered", appliedDate: "2026-06-20", lastContactDate: "2026-07-10", notes: "Offer received! Need to negotiate benefits." },
  { id: "job-2", company: "Stripe", logo: "💳", role: "Senior Frontend Engineer", salary: "$170,000 - $200,000", location: "San Francisco, CA", type: "hybrid", status: "interviewing", appliedDate: "2026-06-25", lastContactDate: "2026-07-09", notes: "Completed technical assessment. Technical round scheduled for Monday." },
  { id: "job-3", company: "Google", logo: "G", role: "L5 Software Engineer (Cloud)", salary: "$180,000 - $210,000", location: "Sunnyvale, CA", type: "on-site", status: "screening", appliedDate: "2026-07-01", lastContactDate: "2026-07-07", notes: "HR recruiter screening completed. Preparing for system design loop." },
  { id: "job-4", company: "Linear", logo: "⚙️", role: "Product Engineer", salary: "$150,000 - $175,000", location: "Remote, EU/US", type: "remote", status: "applied", appliedDate: "2026-07-08", lastContactDate: "2026-07-08", notes: "Applied via referral link. Reached out to HM on Twitter." }
];

const initialInterviews: Interview[] = [
  {
    id: "int-1",
    jobId: "job-2",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    date: "2026-07-13",
    time: "10:00 AM PST",
    type: "technical",
    format: "video",
    interviewer: "Marc Levinson (Staff Architect)",
    preparationChecklist: [
      { id: "c1", text: "Practice billing-related UI flows using Framer Motion", done: true },
      { id: "c2", text: "Review React fiber architecture and rendering optimizations", done: true },
      { id: "c3", text: "Read Stripe's design principles document", done: false }
    ],
    questionsAsked: ["Explain how to optimize heavy DOM list rendering in React", "How does client-side caching affect state synchronization in forms?"],
    status: "upcoming"
  },
  {
    id: "int-2",
    jobId: "job-3",
    company: "Google",
    role: "L5 Software Engineer (Cloud)",
    date: "2026-07-16",
    time: "1:30 PM PST",
    type: "system-design",
    format: "video",
    interviewer: "Deepa Ramakrishnan (Principal Engineer)",
    preparationChecklist: [
      { id: "c4", text: "Study rate limiting, CDNs, and load balancer algorithms", done: true },
      { id: "c5", text: "Design a scalable collaborative text editor (CRDTs)", done: false },
      { id: "c6", text: "Review consistent hashing and database sharding patterns", done: false }
    ],
    status: "upcoming"
  }
];

const initialJournal: JournalEntry[] = [
  { id: "j-1", date: "2026-07-09", content: "Great progress today on the Next.js workspace setup. Managed to configure import paths and folders clean. Logged 6 hours of solid deep focus. Completed 3 tasks.", mood: "productive", productivityScore: 8, tags: ["setup", "focus"], createdAt: "2026-07-09T22:00:00Z" },
  { id: "j-2", date: "2026-07-10", content: "A bit tired today but managed to solve a Binary Search Tree medium problem. Reviewed resume ATS keyword matches. Got some suggestions for optimizing keywords for cloud projects.", mood: "tired", productivityScore: 6, tags: ["leetcode", "career"], createdAt: "2026-07-10T22:30:00Z" },
  { id: "j-3", date: "2026-07-11", content: "Highly focused day! Formulated the design system, wrote clean theme files, and set up the global Zustand store. Feeling excited about the look and feel of the app.", mood: "focused", productivityScore: 9, tags: ["design", "state"], createdAt: "2026-07-11T17:00:00Z" }
];

const initialNotifications: AppNotification[] = [
  { id: "n-1", title: "Interview scheduled", message: "Your technical round with Stripe is scheduled for July 13th at 10:00 AM.", category: "jobs", isRead: false, createdAt: "2026-07-10T14:00:00Z" },
  { id: "n-2", title: "Resume reviewed", message: "AI Mentor has analyzed your resume. Your ATS score is 78%. Tap for suggestions.", category: "ai", isRead: false, createdAt: "2026-07-11T09:30:00Z" },
  { id: "n-3", title: "LeetCode Daily Challenge", message: "Solve today's challenge: Binary Tree Maximum Path Sum.", category: "leetcode", isRead: true, createdAt: "2026-07-11T08:00:00Z" }
];

const initialResumes: ResumeVersion[] = [
  { id: "res-1", name: "Alex_Rivera_Resume_v3.pdf", uploadedAt: "2026-07-10", fileSize: "1.2 MB", atsScore: 82, suggestions: ["Add quantified achievements in Stripe integration role.", "Expand on Next.js 15 routing optimizations.", "Include Kubernetes in active skills list."], isActive: true },
  { id: "res-2", name: "Alex_Rivera_Resume_v2.pdf", uploadedAt: "2026-06-15", fileSize: "1.1 MB", atsScore: 75, suggestions: ["Simplify header styling for parser compliance.", "Highlight TypeScript metrics."], isActive: false }
];

export const useStore = create<DevOSState>()(
  persist(
    (set) => ({
      // Profile & Settings
      profile: initialProfile,
      settings: initialSettings,
      updateProfile: (updates) =>
        set((state) => ({ profile: { ...state.profile, ...updates } })),
      updateSettings: (updates) =>
        set((state) => ({ settings: { ...state.settings, ...updates } })),

      // Notes
      notes: initialNotes,
      folders: initialFolders,
      addNote: (note) =>
        set((state) => {
          const newNote: Note = {
            ...note,
            id: `note-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return { notes: [newNote, ...state.notes] };
        }),
      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
          )
        })),
      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
      moveNoteToTrash: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isTrash: true, isPinned: false, updatedAt: new Date().toISOString() } : n
          )
        })),
      archiveNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isArchived: !n.isArchived, isPinned: false, updatedAt: new Date().toISOString() } : n
          )
        })),
      pinNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isPinned: !n.isPinned, updatedAt: new Date().toISOString() } : n
          )
        })),
      createFolder: (name) =>
        set((state) => {
          const newFolder: NoteFolder = {
            id: name.toLowerCase().replace(/\s+/g, "-"),
            name,
            icon: "Folder"
          };
          return { folders: [...state.folders, newFolder] };
        }),
      deleteFolder: (id) =>
        set((state) => ({
          folders: state.folders.filter((f) => f.id !== id),
          // Move notes out of the deleted folder
          notes: state.notes.map((n) => (n.folderId === id ? { ...n, folderId: null } : n))
        })),

      // Tasks
      tasks: initialTasks,
      addTask: (task) =>
        set((state) => {
          const newTask: TaskItem = {
            ...task,
            id: `task-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return { tasks: [newTask, ...state.tasks] };
        }),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          )
        })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      // Projects
      projects: initialProjects,
      addProject: (project) =>
        set((state) => {
          const newProject: Project = {
            ...project,
            id: `proj-${Date.now()}`,
            tasks: [],
            files: [],
            activities: [
              {
                id: `act-${Date.now()}`,
                user: { name: state.profile.name, avatarUrl: state.profile.avatarUrl },
                action: "created project",
                target: project.name,
                timestamp: new Date().toISOString()
              }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return { projects: [...state.projects, newProject] };
        }),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          )
        })),
      deleteProject: (id) =>
        set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
      addProjectTask: (projectId, task) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const newPT: ProjectTask = {
              ...task,
              id: `p-task-${Date.now()}`,
              projectId,
              createdAt: new Date().toISOString()
            };
            return {
              ...p,
              tasks: [...p.tasks, newPT],
              activities: [
                {
                  id: `act-${Date.now()}`,
                  user: { name: state.profile.name, avatarUrl: state.profile.avatarUrl },
                  action: "added task",
                  target: task.title,
                  timestamp: new Date().toISOString()
                },
                ...p.activities
              ],
              updatedAt: new Date().toISOString()
            };
          })
        })),
      updateProjectTask: (projectId, taskId, updates) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
              updatedAt: new Date().toISOString()
            };
          })
        })),
      deleteProjectTask: (projectId, taskId) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const deletedTask = p.tasks.find((t) => t.id === taskId);
            return {
              ...p,
              tasks: p.tasks.filter((t) => t.id !== taskId),
              activities: deletedTask
                ? [
                    {
                      id: `act-${Date.now()}`,
                      user: { name: state.profile.name, avatarUrl: state.profile.avatarUrl },
                      action: "deleted task",
                      target: deletedTask.title,
                      timestamp: new Date().toISOString()
                    },
                    ...p.activities
                  ]
                : p.activities,
              updatedAt: new Date().toISOString()
            };
          })
        })),
      addProjectFile: (projectId, file) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const newFile: ProjectFile = {
              ...file,
              id: `f-${Date.now()}`,
              uploadedAt: new Date().toISOString().split("T")[0],
              uploadedBy: state.profile.name
            };
            return {
              ...p,
              files: [...p.files, newFile],
              activities: [
                {
                  id: `act-${Date.now()}`,
                  user: { name: state.profile.name, avatarUrl: state.profile.avatarUrl },
                  action: "uploaded file",
                  target: file.name,
                  timestamp: new Date().toISOString()
                },
                ...p.activities
              ],
              updatedAt: new Date().toISOString()
            };
          })
        })),
      deleteProjectFile: (projectId, fileId) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const deletedFile = p.files.find((f) => f.id === fileId);
            return {
              ...p,
              files: p.files.filter((f) => f.id !== fileId),
              activities: deletedFile
                ? [
                    {
                      id: `act-${Date.now()}`,
                      user: { name: state.profile.name, avatarUrl: state.profile.avatarUrl },
                      action: "deleted file",
                      target: deletedFile.name,
                      timestamp: new Date().toISOString()
                    },
                    ...p.activities
                  ]
                : p.activities,
              updatedAt: new Date().toISOString()
            };
          })
        })),
      addProjectMember: (projectId, member) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              members: [...p.members, member],
              activities: [
                {
                  id: `act-${Date.now()}`,
                  user: { name: state.profile.name, avatarUrl: state.profile.avatarUrl },
                  action: "added member",
                  target: member.name,
                  timestamp: new Date().toISOString()
                },
                ...p.activities
              ],
              updatedAt: new Date().toISOString()
            };
          })
        })),
      removeProjectMember: (projectId, memberId) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const removed = p.members.find((m) => m.id === memberId);
            return {
              ...p,
              members: p.members.filter((m) => m.id !== memberId),
              activities: removed
                ? [
                    {
                      id: `act-${Date.now()}`,
                      user: { name: state.profile.name, avatarUrl: state.profile.avatarUrl },
                      action: "removed member",
                      target: removed.name,
                      timestamp: new Date().toISOString()
                    },
                    ...p.activities
                  ]
                : p.activities,
              updatedAt: new Date().toISOString()
            };
          })
        })),

      // AI Mentor
      aiMessages: [
        { id: "ai-init", sender: "mentor", content: "Hello! I am your DevOS AI Career Mentor. I can review your resume, suggest code optimizations, create personalized learning roadmaps, or help prepare you for upcoming interviews. What's on your mind today?", timestamp: new Date().toISOString() }
      ],
      addAIMessage: (message) =>
        set((state) => ({
          aiMessages: [
            ...state.aiMessages,
            { ...message, id: `msg-${Date.now()}`, timestamp: new Date().toISOString() }
          ]
        })),
      clearAIChat: () =>
        set((state) => ({
          aiMessages: [
            { id: "ai-init", sender: "mentor", content: "Hello! I am your DevOS AI Career Mentor. I can review your resume, suggest code optimizations, create personalized learning roadmaps, or help prepare you for upcoming interviews. What's on your mind today?", timestamp: new Date().toISOString() }
          ]
        })),
      roadmaps: [],
      addRoadmap: (roadmap) =>
        set((state) => ({ roadmaps: [roadmap, ...state.roadmaps] })),
      toggleRoadmapStep: (roadmapId, stepId) =>
        set((state) => ({
          roadmaps: state.roadmaps.map((r) => {
            if (r.id !== roadmapId) return r;
            return {
              ...r,
              steps: r.steps.map((s) => (s.id === stepId ? { ...s, isCompleted: !s.isCompleted } : s))
            };
          })
        })),

      // Resumes
      resumes: initialResumes,
      addResume: (resume) =>
        set((state) => {
          const newResume: ResumeVersion = {
            ...resume,
            id: `res-${Date.now()}`,
            uploadedAt: new Date().toISOString().split("T")[0],
            isActive: false
          };
          return { resumes: [newResume, ...state.resumes] };
        }),
      deleteResume: (id) =>
        set((state) => ({ resumes: state.resumes.filter((r) => r.id !== id) })),
      setActiveResume: (id) =>
        set((state) => ({
          resumes: state.resumes.map((r) => ({ ...r, isActive: r.id === id }))
        })),

      // Jobs
      jobs: initialJobs,
      addJob: (job) =>
        set((state) => {
          const newJob: JobApplication = {
            ...job,
            id: `job-${Date.now()}`,
            appliedDate: new Date().toISOString().split("T")[0]
          };
          return { jobs: [newJob, ...state.jobs] };
        }),
      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j))
        })),
      deleteJob: (id) =>
        set((state) => ({ jobs: state.jobs.filter((j) => j.id !== id) })),

      // Interviews
      interviews: initialInterviews,
      addInterview: (interview) =>
        set((state) => {
          const newInt: Interview = {
            ...interview,
            id: `int-${Date.now()}`,
            preparationChecklist: [
              { id: "c-init-1", text: "Review company product and technology stack", done: false },
              { id: "c-init-2", text: "Prepare questions for the interviewer", done: false }
            ],
            status: "upcoming"
          };
          return { interviews: [newInt, ...state.interviews] };
        }),
      updateInterview: (id, updates) =>
        set((state) => ({
          interviews: state.interviews.map((i) => (i.id === id ? { ...i, ...updates } : i))
        })),
      deleteInterview: (id) =>
        set((state) => ({ interviews: state.interviews.filter((i) => i.id !== id) })),
      toggleInterviewChecklist: (interviewId, itemId) =>
        set((state) => ({
          interviews: state.interviews.map((i) => {
            if (i.id !== interviewId) return i;
            return {
              ...i,
              preparationChecklist: i.preparationChecklist.map((c) =>
                c.id === itemId ? { ...c, done: !c.done } : c
              )
            };
          })
        })),

      // Journal
      journalEntries: initialJournal,
      addJournalEntry: (entry) =>
        set((state) => {
          const newEntry: JournalEntry = {
            ...entry,
            id: `j-${Date.now()}`,
            createdAt: new Date().toISOString()
          };
          return { journalEntries: [newEntry, ...state.journalEntries] };
        }),
      updateJournalEntry: (id, updates) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((j) => (j.id === id ? { ...j, ...updates } : j))
        })),
      deleteJournalEntry: (id) =>
        set((state) => ({ journalEntries: state.journalEntries.filter((j) => j.id !== id) })),

      // Notifications
      notifications: initialNotifications,
      addNotification: (notification) =>
        set((state) => {
          const newNot: AppNotification = {
            ...notification,
            id: `n-${Date.now()}`,
            isRead: false,
            createdAt: new Date().toISOString()
          };
          return { notifications: [newNot, ...state.notifications] };
        }),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
        })),
      clearNotifications: () =>
        set((state) => ({ notifications: [] })),

      // Search & global state
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      isCommandMenuOpen: false,
      setCommandMenuOpen: (open) => set({ isCommandMenuOpen: open })
    }),
    {
      name: "devos-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist local layout states and custom notes/tasks.
      // Helps avoid SSR hydration issues by filtering storage.
      partialize: (state) => ({
        notes: state.notes,
        folders: state.folders,
        tasks: state.tasks,
        projects: state.projects,
        jobs: state.jobs,
        interviews: state.interviews,
        journalEntries: state.journalEntries,
        profile: state.profile,
        settings: state.settings,
        notifications: state.notifications,
        roadmaps: state.roadmaps
      })
    }
  )
);
