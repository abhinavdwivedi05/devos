"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { toast } from "@/components/ui/Toast";

// Import modular sub-views
import { KanbanBoard } from "./KanbanBoard";
import { ProjectTable } from "./ProjectTable";
import { ProjectTimeline } from "./ProjectTimeline";
import { ProjectFiles } from "./ProjectFiles";

export function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const {
    projects,
    addProject,
    deleteProject,
    addProjectTask,
    updateProjectTask,
    deleteProjectTask,
    addProjectFile,
    deleteProjectFile,
  } = useStore();

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState("kanban");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  // New task form local states
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  // New project form local states
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newProjectCat, setNewProjectCat] = useState("Web Application");

  useEffect(() => {
    if (projects.length > 0 && !activeProjectId) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects, activeProjectId]);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || null;
  }, [projects, activeProjectId]);

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    addProject({
      name: newProjectName,
      description: newProjectDesc,
      status: "active",
      progress: 0,
      category: newProjectCat,
      members: [],
    });
    setNewProjectName("");
    setNewProjectDesc("");
    setShowNewProjectDialog(false);
    toast("Project created successfully!", "success");
  };

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !activeProjectId) return;
    addProjectTask(activeProjectId, {
      title: newTaskTitle,
      priority: newTaskPriority,
      status: "todo",
      dueDate: newTaskDueDate || new Date().toISOString().split("T")[0],
    });
    setNewTaskTitle("");
    setShowNewTaskDialog(false);
    toast("Task added to project!", "success");
  };

  const handleUploadFileSimulation = () => {
    if (!activeProjectId) return;
    const filesList = ["api_schema.json", "landing_copy.txt", "analytics_mockup.png", "stripe_webhooks.js"];
    const randomFile = filesList[Math.floor(Math.random() * filesList.length)];
    const sizes = ["42 KB", "12 KB", "1.4 MB", "8 KB"];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    
    addProjectFile(activeProjectId, {
      name: randomFile,
      size,
      url: "#",
    });
    toast("Document added to files log!", "success");
  };

  const handleToggleTaskStatus = (taskId: string, currentStatus: string) => {
    if (!activeProjectId) return;
    const stages: ("todo" | "in-progress" | "review" | "done")[] = ["todo", "in-progress", "review", "done"];
    const nextIdx = (stages.indexOf(currentStatus as any) + 1) % stages.length;
    const nextStatus = stages[nextIdx];

    updateProjectTask(activeProjectId, taskId, { status: nextStatus });
    toast(`Task moved to ${nextStatus}`, "info");
  };

  const viewOptions = [
    { id: "kanban", label: "Kanban Board" },
    { id: "table", label: "Task List" },
    { id: "timeline", label: "Timeline" },
    { id: "activity", label: "Activity & Assets" },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Projects selection dropdown & header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              value={activeProjectId || ""}
              onChange={(e) => {
                setActiveProjectId(e.target.value);
                setActiveView("kanban");
              }}
              className="bg-card border border-border text-xs text-foreground font-bold rounded-md px-3.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-accent-blue/50 appearance-none pr-8 cursor-pointer select-none"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted">
              <svg className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <Button variant="outline" size="sm" className="h-8 text-[11px]" onClick={() => setShowNewProjectDialog(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            <span>New Project</span>
          </Button>
        </div>

        {activeProject && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted font-semibold">Progress:</span>
              <span className="font-extrabold text-foreground">{activeProject.progress}%</span>
              <div className="w-20 bg-border/40 rounded-full h-1.5 overflow-hidden">
                <div className="bg-accent-blue h-1.5 transition-all duration-350" style={{ width: `${activeProject.progress}%` }} />
              </div>
            </div>
            <Badge variant={activeProject.status === "active" ? "default" : "success"} className="text-[9px] uppercase px-1 py-0 font-bold">
              {activeProject.status}
            </Badge>
          </div>
        )}
      </div>

      {activeProject ? (
        <div className="space-y-6">
          {/* Tabs bar */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border/20 pb-2.5">
            <Tabs tabs={viewOptions} activeTab={activeView} onChange={setActiveView} variant="underline" />
            
            {activeView !== "activity" && (
              <Button variant="default" size="sm" className="h-8 text-[11px]" onClick={() => setShowNewTaskDialog(true)}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span>Add Project Task</span>
              </Button>
            )}
          </div>

          {/* Render Active View */}
          {activeView === "kanban" && (
            <KanbanBoard
              activeProject={activeProject}
              onToggleStatus={handleToggleTaskStatus}
              onDeleteTask={deleteProjectTask}
            />
          )}

          {activeView === "table" && (
            <ProjectTable
              activeProject={activeProject}
              onDeleteTask={deleteProjectTask}
            />
          )}

          {activeView === "timeline" && (
            <ProjectTimeline activeProject={activeProject} />
          )}

          {activeView === "activity" && (
            <ProjectFiles
              activeProject={activeProject}
              onUploadFile={handleUploadFileSimulation}
              onDeleteFile={deleteProjectFile}
            />
          )}
        </div>
      ) : (
        <p className="text-center py-12 text-muted">Initialize or select a project to get started.</p>
      )}

      {/* Modal: New Project creation */}
      {showNewProjectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" onClick={() => setShowNewProjectDialog(false)} />
          <div className="relative z-10 w-full max-w-md rounded-md border border-border bg-card shadow-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Bootstrap Project Container</h2>
            <form onSubmit={handleCreateProjectSubmit} className="space-y-4">
              <Input label="Project Name" placeholder="e.g. CLI tool config" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} required />
              <Input label="Description" placeholder="Project details and aims" value={newProjectDesc} onChange={(e) => setNewProjectDesc(e.target.value)} />
              <Select
                label="Domain Directory"
                options={[
                  { value: "Web Application", label: "Web App" },
                  { value: "Open Source Tool", label: "Open Source CLI" },
                  { value: "Library Module", label: "Library / Core Package" },
                ]}
                value={newProjectCat}
                onChange={(e) => setNewProjectCat(e.target.value)}
              />
              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setShowNewProjectDialog(false)}>Cancel</Button>
                <Button type="submit" variant="default" size="sm">Save Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Task creation */}
      {showNewTaskDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" onClick={() => setShowNewTaskDialog(false)} />
          <div className="relative z-10 w-full max-w-md rounded-md border border-border bg-card shadow-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Append Project Task</h2>
            <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
              <Input label="Task Title" placeholder="e.g. Code API middleware hooks" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} required />
              <Select
                label="Priority Tier"
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as any)}
              />
              <Input label="Due Date" type="date" value={newTaskDueDate} onChange={(e) => setNewTaskDueDate(e.target.value)} />
              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setShowNewTaskDialog(false)}>Cancel</Button>
                <Button type="submit" variant="default" size="sm">Create Task</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsClient;
