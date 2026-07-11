"use client";

import React, { useState, useMemo } from "react";
import { FileText, Plus, Trash, Check, CheckCircle2, Download, AlertTriangle, Sparkles, Upload } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

export function ResumeClient({ initialResumes }: { initialResumes: any[] }) {
  const { resumes, addResume, deleteResume, setActiveResume } = useStore();
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadName, setUploadName] = useState("");

  const activeResumes = useMemo(() => {
    if (resumes.length > 0 && !selectedResumeId) {
      const active = resumes.find((r) => r.isActive);
      setSelectedResumeId(active ? active.id : resumes[0].id);
    }
    return resumes;
  }, [resumes, selectedResumeId]);

  const selectedResume = useMemo(() => {
    return resumes.find((r) => r.id === selectedResumeId) || null;
  }, [resumes, selectedResumeId]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;

    addResume({
      name: uploadName.endsWith(".pdf") ? uploadName : `${uploadName}.pdf`,
      fileSize: "1.3 MB",
      atsScore: Math.floor(Math.random() * 25) + 70, // 70 to 95 random score
      suggestions: [
        "Include metrics for Next.js bundle optimizations.",
        "Highlight TypeScript type safety assertions.",
        "Simplify heading tags format to fit standard ATS parsers.",
      ],
    });

    setUploadName("");
    setShowUploadModal(false);
    toast("Resume version uploaded! Analyzing...", "success");
  };

  const handleDownloadSimulation = (name: string) => {
    toast(`Downloading: ${name} (simulation)`, "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* Left panel: Upload Area & Version history */}
      <div className="space-y-6">
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">Resume Hub</CardTitle>
            <Button variant="default" size="sm" className="h-7 text-[10px] font-bold" onClick={() => setShowUploadModal(true)}>
              <Upload className="h-3 w-3 mr-1" />
              <span>Upload PDF</span>
            </Button>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-3">
            {activeResumes.map((res) => (
              <div
                key={res.id}
                onClick={() => setSelectedResumeId(res.id)}
                className={cn(
                  "p-3 rounded-md border text-left cursor-pointer transition-all flex items-start justify-between min-w-0",
                  selectedResumeId === res.id
                    ? "bg-border/60 border-border text-foreground font-extrabold"
                    : "bg-card border-border/40 hover:bg-card/65 text-muted hover:text-foreground"
                )}
              >
                <div className="flex items-start space-x-2.5 min-w-0">
                  <FileText className={cn("h-4 w-4 mt-0.5 shrink-0", selectedResumeId === res.id ? "text-accent-blue" : "text-muted")} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate leading-normal">{res.name}</p>
                    <p className="text-[10px] text-muted font-semibold mt-0.5">
                      Uploaded: {res.uploadedAt} • {res.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 select-none">
                  {res.isActive && <Badge variant="default" className="text-[8px] px-1 py-0 uppercase">Active</Badge>}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteResume(res.id);
                      if (selectedResumeId === res.id) setSelectedResumeId(null);
                      toast("Resume version deleted", "info");
                    }}
                    className="text-muted hover:text-accent-red cursor-pointer p-0.5"
                    aria-label="Delete resume version"
                  >
                    <Trash className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Center & Right panels: Detailed analysis & preview */}
      <div className="lg:col-span-2 space-y-6">
        {selectedResume ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ATS Score card */}
            <Card className="border-border/60 flex flex-col items-center justify-center p-6 text-center select-none">
              <span className="text-xs font-bold text-muted uppercase tracking-wider mb-4">ATS Compatibility</span>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#30363d" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={selectedResume.atsScore >= 80 ? "#3fb950" : "#58a6ff"}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * selectedResume.atsScore) / 100}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute font-extrabold text-2xl text-foreground">
                  {selectedResume.atsScore}%
                </div>
              </div>
              <p className="text-[10px] text-muted font-medium mt-4 leading-normal px-2">
                Your parser rate is {selectedResume.atsScore >= 80 ? "excellent" : "good"}. Check advice columns.
              </p>
            </Card>

            {/* Recommendations & actions */}
            <Card className="md:col-span-2 border-border/60 flex flex-col justify-between">
              <CardHeader className="p-5 border-b border-border/40 pb-4">
                <CardTitle className="text-sm font-bold">Parser Audit Checklist</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-4 space-y-3.5 flex-1">
                {selectedResume.suggestions.map((sug, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs leading-normal">
                    <AlertTriangle className="h-4 w-4 text-accent-orange shrink-0 mt-0.5" />
                    <span className="text-foreground/90 font-medium">{sug}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-5 border-t border-border/40 flex items-center justify-between bg-card/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-[11px]"
                  disabled={selectedResume.isActive}
                  onClick={() => {
                    setActiveResume(selectedResume.id);
                    toast("Active template set", "success");
                  }}
                >
                  {selectedResume.isActive ? <Check className="h-3 w-3 mr-1" /> : null}
                  <span>{selectedResume.isActive ? "Active Template" : "Set Active Version"}</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 text-[11px]"
                  onClick={() => handleDownloadSimulation(selectedResume.name)}
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  <span>Download PDF</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Card className="border-border/60 p-8 text-center text-muted">
            Choose or upload a resume version to begin auditing.
          </Card>
        )}
      </div>

      {/* Modal: Upload resume version */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" onClick={() => setShowUploadModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-md border border-border bg-card shadow-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Upload Resume PDF</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <Input label="Filename" placeholder="Alex_Rivera_Resume_v4" value={uploadName} onChange={(e) => setUploadName(e.target.value)} required />
              <div className="border border-dashed border-border/70 rounded-md p-8 flex flex-col items-center justify-center text-center select-none text-muted">
                <Upload className="h-7 w-7 text-muted/65 mb-2" />
                <span className="text-xs font-semibold">Drop PDF document here, or click to choose</span>
                <span className="text-[10px] text-muted mt-1 leading-none">Max file size: 5MB</span>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setShowUploadModal(false)}>Cancel</Button>
                <Button type="submit" variant="default" size="sm">Save Version</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeClient;
