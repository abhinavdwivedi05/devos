import React from "react";
import { Brain, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";
import Tabs from "@/components/ui/Tabs";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface AIMentorToolsProps {
  activeTab: string;
  onSelectTab: (id: string) => void;
  roadmaps: any[];
  roadmapRole: string;
  onChangeRoadmapRole: (val: string) => void;
  roadmapDiff: string;
  onChangeRoadmapDiff: (val: string) => void;
  generatingRoadmap: boolean;
  onGenerateRoadmap: () => void;
  onToggleRoadmapStep: (roadmapId: string, stepId: string) => void;
  codeSnippet: string;
  onChangeCodeSnippet: (val: string) => void;
  reviewingCode: boolean;
  onReviewCode: (e: React.FormEvent) => void;
  codeReviewFeedback: string | null;
  selectedResumeVersion: string;
  onChangeResumeVersion: (val: string) => void;
  reviewingResume: boolean;
  onReviewResume: () => void;
  resumeFeedback: string | null;
}

export function AIMentorTools({
  activeTab,
  onSelectTab,
  roadmaps,
  roadmapRole,
  onChangeRoadmapRole,
  roadmapDiff,
  onChangeRoadmapDiff,
  generatingRoadmap,
  onGenerateRoadmap,
  onToggleRoadmapStep,
  codeSnippet,
  onChangeCodeSnippet,
  reviewingCode,
  onReviewCode,
  codeReviewFeedback,
  selectedResumeVersion,
  onChangeResumeVersion,
  reviewingResume,
  onReviewResume,
  resumeFeedback,
}: AIMentorToolsProps) {
  const toolTabs = [
    { id: "roadmap", label: "Roadmaps" },
    { id: "code", label: "Code Review" },
    { id: "resume", label: "Resume Audit" },
  ];

  return (
    <div className="flex flex-col border border-border rounded-md bg-[#0d1117] overflow-hidden select-none">
      {/* Tabs picker */}
      <div className="px-5 border-b border-border/40 py-2.5 flex items-center justify-between select-none">
        <Tabs tabs={toolTabs} activeTab={activeTab} onChange={onSelectTab} variant="underline" />
      </div>

      {/* Tab view panels */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* 1. Roadmap generator Panel */}
        {activeTab === "roadmap" && (
          <div className="space-y-6">
            <div className="bg-card/30 p-4 border border-border rounded-md space-y-4 select-none">
              <h3 className="text-xs font-bold text-foreground">Interactive Roadmap Generator</h3>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Target Engineering Role"
                  options={[
                    { value: "Frontend Engineer", label: "Frontend Developer" },
                    { value: "Backend Engineer", label: "Backend Developer" },
                    { value: "DevOps Engineer", label: "DevOps Engineer" },
                    { value: "System Architect", label: "System Architect" },
                  ]}
                  value={roadmapRole}
                  onChange={(e) => onChangeRoadmapRole(e.target.value)}
                />
                <Select
                  label="Difficulty Tier"
                  options={[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                  ]}
                  value={roadmapDiff}
                  onChange={(e) => onChangeRoadmapDiff(e.target.value)}
                />
              </div>
              <Button
                variant="default"
                size="sm"
                className="w-full text-[11px] font-bold"
                onClick={onGenerateRoadmap}
                isLoading={generatingRoadmap}
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                <span>Generate Custom Learning Path</span>
              </Button>
            </div>

            {/* Display active generated roadmap list */}
            {roadmaps.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-2 select-none">
                  <span className="text-[10px] font-bold text-muted uppercase">
                    Active Checklist: {roadmaps[0].title}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {roadmaps[0].steps.map((step: any) => (
                    <div
                      key={step.id}
                      className="flex items-start space-x-3 text-xs leading-relaxed border-b border-border/20 pb-3 last:border-0 last:pb-0"
                    >
                      <button
                        onClick={() => onToggleRoadmapStep(roadmaps[0].id, step.id)}
                        className="text-muted hover:text-foreground shrink-0 mt-0.5 cursor-pointer"
                      >
                        {step.isCompleted ? (
                          <CheckCircle2 className="h-4.5 w-4.5 text-accent-green" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-border" />
                        )}
                      </button>
                      <div className="flex-1 space-y-1">
                        <p className={cn("font-bold text-foreground", step.isCompleted ? "line-through text-muted/65" : "")}>
                          {step.title}
                        </p>
                        <p className="text-[10px] text-muted leading-relaxed font-semibold">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {step.topics.map((t: string) => (
                            <Badge key={t} variant="secondary" className="text-[8px] px-1 py-0">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted select-none flex flex-col items-center justify-center space-y-2">
                <Brain className="h-7 w-7 text-muted" />
                <p className="text-xs font-semibold">No active roadmaps generated.</p>
              </div>
            )}
          </div>
        )}

        {/* 2. Code Review Panel */}
        {activeTab === "code" && (
          <div className="space-y-6">
            <form onSubmit={onReviewCode} className="space-y-4">
              <label className="text-xs font-bold text-muted select-none block">
                Paste snippet for O(N) critique
              </label>
              <textarea
                value={codeSnippet}
                onChange={(e) => onChangeCodeSnippet(e.target.value)}
                placeholder="// Paste TypeScript / React snippet here..."
                className="w-full min-h-[140px] bg-card border border-border rounded-md p-3.5 font-mono text-[10px] text-foreground focus:outline-hidden focus:ring-1 focus:ring-accent-blue/50 resize-y"
                required
              />
              <Button type="submit" variant="default" size="sm" className="w-full text-xs font-bold" isLoading={reviewingCode}>
                Review Code Snippet
              </Button>
            </form>

            {codeReviewFeedback && (
              <div className="space-y-3.5 border-t border-border/50 pt-5">
                <h4 className="text-xs font-bold text-foreground">AI Refactor Feedback</h4>
                <div className="bg-card border border-border p-4 rounded-md text-[11px] font-semibold text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {codeReviewFeedback}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Resume review Panel */}
        {activeTab === "resume" && (
          <div className="space-y-6">
            <div className="bg-card/30 p-4 border border-border rounded-md space-y-4 select-none">
              <h3 className="text-xs font-bold text-foreground">ATS Resume Scoring</h3>
              <div className="flex items-center justify-between gap-4">
                <Select
                  label="Select Active Version"
                  options={[
                    { value: "res-1", label: "Alex_Resume_v3.pdf" },
                    { value: "res-2", label: "Alex_Resume_v2.pdf" },
                  ]}
                  value={selectedResumeVersion}
                  onChange={(e) => onChangeResumeVersion(e.target.value)}
                />
                <Button
                  variant="default"
                  size="sm"
                  className="h-10 text-[10px] font-bold shrink-0 self-end px-4"
                  onClick={onReviewResume}
                  isLoading={reviewingResume}
                >
                  Run ATS Review
                </Button>
              </div>
            </div>

            {resumeFeedback && (
              <div className="space-y-3.5 border-t border-border/50 pt-5">
                <h4 className="text-xs font-bold text-foreground">ATS suggestions log</h4>
                <div className="bg-card border border-border p-4 rounded-md text-[11px] font-semibold text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {resumeFeedback}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
