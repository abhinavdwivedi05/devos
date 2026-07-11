"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash, Briefcase, Calendar, MapPin, DollarSign, Edit2, AlertCircle } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";

export function JobsClient({ initialJobs }: { initialJobs: any[] }) {
  const { jobs, addJob, updateJob, deleteJob } = useStore();
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // Filters state
  const [search, setSearch] = useState("");
  const [locationTypeFilter, setLocationTypeFilter] = useState("all");

  // Add Job Form fields
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<"remote" | "hybrid" | "on-site">("remote");
  const [notes, setNotes] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.role.toLowerCase().includes(search.toLowerCase());
      const matchesType = locationTypeFilter === "all" ? true : j.type === locationTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [jobs, search, locationTypeFilter]);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    addJob({
      company,
      role,
      salary: salary || undefined,
      location,
      type,
      status: "applied",
      notes: notes || undefined,
    });

    // Reset fields
    setCompany("");
    setRole("");
    setSalary("");
    setLocation("");
    setType("remote");
    setNotes("");
    setShowAddJobModal(false);

    toast("Job application logged!", "success");
  };

  const handleCycleStatus = (id: string, currentStatus: string) => {
    const stages: ("applied" | "screening" | "interviewing" | "offered" | "rejected")[] = [
      "applied",
      "screening",
      "interviewing",
      "offered",
      "rejected",
    ];
    const nextIdx = (stages.indexOf(currentStatus as any) + 1) % stages.length;
    const nextStatus = stages[nextIdx];

    updateJob(id, { status: nextStatus, lastContactDate: new Date().toISOString().split("T")[0] });
    toast(`Status updated: ${nextStatus}`, "info");
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>Job Applications Tracker</span>
        </h1>
        <Button variant="default" size="sm" onClick={() => setShowAddJobModal(true)}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Application</span>
        </Button>
      </div>

      {/* Filters options panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-card/15 p-4 rounded-md border border-border/50 select-none">
        <div className="relative">
          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted/65 focus:outline-hidden focus:ring-1 focus:ring-accent-blue/50"
          />
        </div>

        <Select
          options={[
            { value: "all", label: "All Formats" },
            { value: "remote", label: "Remote" },
            { value: "hybrid", label: "Hybrid" },
            { value: "on-site", label: "On-site" },
          ]}
          value={locationTypeFilter}
          onChange={(e) => setLocationTypeFilter(e.target.value)}
          className="h-8 py-0.5 text-xs select-none"
        />
      </div>

      {/* Pipelines Board grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start select-none">
        {(["applied", "screening", "interviewing", "offered", "rejected"] as const).map((stage) => {
          const stageJobs = filteredJobs.filter((j) => j.status === stage);
          return (
            <div key={stage} className="bg-card/25 border border-border/60 p-4 rounded-md space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold border-b border-border/30 pb-2 mb-2 select-none">
                <span className="capitalize text-foreground">
                  {stage}
                </span>
                <Badge variant="secondary" className="px-1.5 py-0 font-extrabold text-[10px]">
                  {stageJobs.length}
                </Badge>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {stageJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleCycleStatus(job.id, job.status)}
                    className="bg-card border border-border hover:border-accent-blue/30 rounded-sm p-3 shadow-xs space-y-2 cursor-pointer transition-all hover:translate-y-[-1px]"
                  >
                    <div className="flex items-start justify-between min-w-0 gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-foreground truncate">{job.company}</p>
                        <p className="text-[10px] text-muted font-medium truncate mt-0.5">{job.role}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteJob(job.id);
                          toast("Application deleted", "info");
                        }}
                        className="text-muted hover:text-accent-red cursor-pointer shrink-0"
                        aria-label="Delete job application card"
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-border/20 text-[9px] text-muted font-medium select-none">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location} ({job.type})</span>
                      </p>
                      {job.salary && (
                        <p className="flex items-center gap-1.5">
                          <DollarSign className="h-3 w-3" />
                          <span>{job.salary}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {stageJobs.length === 0 && (
                  <p className="text-center py-6 text-[10px] text-muted select-none">No items</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Job Application */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" onClick={() => setShowAddJobModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-md border border-border bg-card shadow-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Log Job Application</h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Company Name" placeholder="e.g. Vercel" value={company} onChange={(e) => setCompany(e.target.value)} required />
                <Input label="Job Role / Title" placeholder="e.g. Frontend Engineer" value={role} onChange={(e) => setRole(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Salary Range" placeholder="e.g. $120k - $140k" value={salary} onChange={(e) => setSalary(e.target.value)} />
                <Input label="Location" placeholder="e.g. Remote, US" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <Select
                label="Location Type"
                options={[
                  { value: "remote", label: "Remote" },
                  { value: "hybrid", label: "Hybrid" },
                  { value: "on-site", label: "On-site" },
                ]}
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              />

              <Input label="Notes" placeholder="Recruiter contacts, links, details" value={notes} onChange={(e) => setNotes(e.target.value)} />

              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setShowAddJobModal(false)}>Cancel</Button>
                <Button type="submit" variant="default" size="sm">Log Application</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsClient;
