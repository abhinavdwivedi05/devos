"use client";

import React, { useState } from "react";
import { Plus, Trash, CheckSquare, Square, Calendar, User, Clock, MessagesSquare, CheckCircle2, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";

export function InterviewsClient({ initialInterviews }: { initialInterviews: any[] }) {
  const { interviews, addInterview, updateInterview, deleteInterview, toggleInterviewChecklist } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // New Interview Form
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<"technical" | "behavioral" | "system-design" | "hr">("technical");
  const [format, setFormat] = useState<"phone" | "video" | "on-site">("video");
  const [interviewer, setInterviewer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !date.trim()) return;

    addInterview({
      jobId: `job-mock-${Date.now()}`,
      company,
      role,
      date,
      time,
      type,
      format,
      interviewer: interviewer || undefined,
    });

    setCompany("");
    setRole("");
    setDate("");
    setTime("");
    setType("technical");
    setFormat("video");
    setInterviewer("");
    setShowAddModal(false);

    toast("Interview panel scheduled!", "success");
  };

  const handleToggleCheck = (intId: string, itemId: string) => {
    toggleInterviewChecklist(intId, itemId);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>Interview Prep Panels</span>
        </h1>
        <Button variant="default" size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Panel Entry</span>
        </Button>
      </div>

      {/* Grid list entries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
        {interviews.map((int) => (
          <Card key={int.id} className="border-border/60 flex flex-col justify-between">
            <CardHeader className="p-5 border-b border-border/40 pb-4 flex flex-row items-start justify-between">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-sm text-foreground truncate select-all">{int.company}</h3>
                  <Badge variant="default" className="text-[9px] uppercase px-1 py-0">{int.type}</Badge>
                </div>
                <p className="text-xs font-semibold text-muted leading-none">{int.role}</p>
              </div>

              <button
                onClick={() => {
                  deleteInterview(int.id);
                  toast("Interview schedule cleared", "info");
                }}
                className="text-muted hover:text-accent-red cursor-pointer p-0.5"
                aria-label="Delete interview schedule"
              >
                <Trash className="h-4 w-4" />
              </button>
            </CardHeader>

            <CardContent className="p-5 pt-4 space-y-4">
              {/* Event Dates metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-muted/90 select-none pb-2 border-b border-border/20">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-accent-blue" />
                  <span>{int.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-accent-blue" />
                  <span>{int.time}</span>
                </div>
              </div>

              {/* Recruiter / Interviewer details */}
              {int.interviewer && (
                <div className="flex items-center space-x-2 text-xs font-medium select-none bg-card p-2 border border-border/65 rounded-sm">
                  <User className="h-4 w-4 text-muted" />
                  <span className="text-muted">Interviewer:</span>
                  <span className="text-foreground">{int.interviewer}</span>
                </div>
              )}

              {/* Checklist details */}
              <div className="space-y-2 select-none">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Preparation Checklist</span>
                <div className="space-y-1.5">
                  {int.preparationChecklist.map((c: any) => (
                    <button
                      key={c.id}
                      onClick={() => handleToggleCheck(int.id, c.id)}
                      className="w-full flex items-start space-x-2.5 text-left text-xs font-semibold text-foreground/80 hover:text-foreground cursor-pointer"
                    >
                      {c.done ? (
                        <CheckSquare className="h-4 w-4 text-accent-green shrink-0 mt-0.5" />
                      ) : (
                        <Square className="h-4 w-4 shrink-0 mt-0.5" />
                      )}
                      <span className={cn("truncate", c.done ? "line-through text-muted/60" : "")}>{c.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions asked panel */}
              {int.questionsAsked && int.questionsAsked.length > 0 && (
                <div className="space-y-2 select-none pt-2 border-t border-border/20">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                    <MessagesSquare className="h-3.5 w-3.5" />
                    <span>Interview Archive Questions</span>
                  </span>
                  <ul className="space-y-1.5 pl-4 list-disc text-[11px] leading-relaxed text-muted font-medium">
                    {int.questionsAsked.map((q: string, idx: number) => (
                      <li key={idx} className="marker:text-accent-blue select-all">{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {interviews.length === 0 && (
          <p className="text-center py-12 text-muted lg:col-span-2">No scheduled interview panels logged.</p>
        )}
      </div>

      {/* Modal: Add Interview panel */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-md border border-border bg-card shadow-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Log Interview Panel</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Company Name" placeholder="e.g. Stripe" value={company} onChange={(e) => setCompany(e.target.value)} required />
                <Input label="Role Title" placeholder="e.g. Senior Frontend" value={role} onChange={(e) => setRole(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Panel Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <Input label="Panel Time" placeholder="e.g. 10:00 AM EST" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Panel Type"
                  options={[
                    { value: "technical", label: "Technical Coding" },
                    { value: "system-design", label: "System Design" },
                    { value: "behavioral", label: "Behavioral" },
                    { value: "hr", label: "Recruiter screening" },
                  ]}
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                />
                <Select
                  label="Format Type"
                  options={[
                    { value: "video", label: "Video Call" },
                    { value: "phone", label: "Phone Screen" },
                    { value: "on-site", label: "On-site visit" },
                  ]}
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                />
              </div>

              <Input label="Interviewer Contact Name" placeholder="e.g. Marc Levinson" value={interviewer} onChange={(e) => setInterviewer(e.target.value)} />

              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="default" size="sm">Schedule Panel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewsClient;
