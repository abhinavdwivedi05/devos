// DevOS Core Types definitions

// Notes Types
export interface NoteTag {
  id: string;
  name: string;
  color: string;
}

export interface NoteFolder {
  id: string;
  name: string;
  icon?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string | null;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  isTrash: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tasks Types
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done" | "backlog";

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  labels: string[];
  dueDate?: string;
  isRecurring: boolean;
  recurrenceRule?: string; // "daily" | "weekly" | "monthly"
  createdAt: string;
  updatedAt: string;
}

// Projects Kanban Types
export interface ProjectMember {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}

export interface ProjectActivity {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: TaskPriority;
  assignee?: ProjectMember;
  dueDate?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  progress: number; // 0 to 100
  members: ProjectMember[];
  files: ProjectFile[];
  activities: ProjectActivity[];
  tasks: ProjectTask[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

// AI Mentor Types
export interface AIMessage {
  id: string;
  sender: "user" | "mentor";
  content: string;
  mode?: "general" | "roadmap" | "resume" | "code";
  timestamp: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  resources: string[];
  isCompleted: boolean;
}

export interface AIRoadmap {
  id: string;
  title: string;
  role: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: RoadmapStep[];
}

// Resume Types
export interface ResumeVersion {
  id: string;
  name: string;
  uploadedAt: string;
  fileSize: string;
  atsScore: number;
  suggestions: string[];
  isActive: boolean;
}

// Job Application Tracker Types
export type JobStatus = "applied" | "screening" | "interviewing" | "offered" | "rejected";

export interface JobApplication {
  id: string;
  company: string;
  logo?: string;
  role: string;
  salary?: string;
  location: string;
  type: "remote" | "hybrid" | "on-site";
  status: JobStatus;
  appliedDate: string;
  lastContactDate?: string;
  url?: string;
  notes?: string;
}

// Interview Tracker Types
export interface Interview {
  id: string;
  jobId: string;
  company: string;
  role: string;
  date: string; // ISO date string
  time: string;
  type: "technical" | "behavioral" | "system-design" | "hr";
  format: "phone" | "video" | "on-site";
  interviewer?: string;
  preparationChecklist: { id: string; text: string; done: boolean }[];
  questionsAsked?: string[];
  feedback?: string;
  status: "upcoming" | "completed" | "cancelled";
}

// GitHub Analytics Types
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // contribution density level
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  updatedAt: string;
}

export interface LanguageShare {
  name: string;
  value: number; // percentage
  color: string;
}

export interface GitHubAnalyticsData {
  username: string;
  totalCommits: number;
  contributionStreak: number;
  pullRequests: { open: number; merged: number; closed: number };
  issues: { open: number; closed: number };
  contributions: ContributionDay[];
  languages: LanguageShare[];
  repositories: GitHubRepo[];
}

// LeetCode Stats Types
export interface LeetCodeStatsData {
  username: string;
  ranking: number;
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
    totalAvailable: number;
    easyAvailable: number;
    mediumAvailable: number;
    hardAvailable: number;
  };
  contestRating: {
    rating: number;
    percentile: number;
    attendedCount: number;
    history: { contestName: string; rating: number; rank: number; date: string }[];
  };
  badges: { id: string; name: string; icon: string; earnedDate: string }[];
  heatmap: { date: string; count: number }[];
}

// Daily Developer Journal Types
export type MoodType = "focused" | "productive" | "motivated" | "tired" | "frustrated";

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  content: string;
  mood: MoodType;
  productivityScore: number; // 1 to 10
  tags: string[];
  createdAt: string;
}

// Global Analytics Types
export interface ProductivityStats {
  studyHours: { date: string; hours: number }[];
  commitsByWeek: { name: string; commits: number }[];
  problemsSolvedByWeek: { name: string; solved: number }[];
  tasksCompletedByWeek: { name: string; tasks: number }[];
}

// User Profile & Settings Types
export interface UserProfile {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
  achievements: { id: string; title: string; description: string; icon: string; date: string }[];
}

export interface UserSettings {
  profile: {
    name: string;
    email: string;
    githubUsername: string;
    leetcodeUsername: string;
  };
  appearance: {
    theme: "dark" | "light" | "system";
    reducedMotion: boolean;
    sidebarCollapsed: boolean;
  };
  notifications: {
    emailAlerts: boolean;
    marketingEmails: boolean;
    weeklyDigest: boolean;
    browserNotifications: boolean;
  };
  connections: {
    githubConnected: boolean;
    leetcodeConnected: boolean;
    googleConnected: boolean;
  };
}

// Notification Center Types
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: "tasks" | "github" | "leetcode" | "jobs" | "ai" | "system";
  isRead: boolean;
  createdAt: string;
}
