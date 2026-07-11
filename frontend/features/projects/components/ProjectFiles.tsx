import React from "react";
import { Paperclip, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ProjectFilesProps {
  activeProject: any;
  onUploadFile: () => void;
  onDeleteFile: (projectId: string, fileId: string) => void;
}

export function ProjectFiles({ activeProject, onUploadFile, onDeleteFile }: ProjectFilesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* Asset Files upload panel */}
      <Card className="lg:col-span-2 border-border/60">
        <CardHeader className="p-5 border-b border-border/40 pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold">Documents & Mock Assets</CardTitle>
            <CardDescription className="text-[10px]">Mock repository resources log.</CardDescription>
          </div>
          <Button variant="secondary" size="sm" className="h-7 text-[10px]" onClick={onUploadFile}>
            <Paperclip className="h-3 w-3 mr-1" />
            <span>Upload Spec</span>
          </Button>
        </CardHeader>
        <CardContent className="p-5 pt-4 space-y-3.5">
          {activeProject.files.map((file: any) => (
            <div key={file.id} className="flex items-center justify-between border-b border-border/20 pb-2.5 last:border-0 last:pb-0">
              <div className="flex items-center space-x-2.5 text-xs">
                <Paperclip className="h-4 w-4 text-muted" />
                <div>
                  <p className="font-bold text-foreground">{file.name}</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5">
                    Size: {file.size} • Uploaded by {file.uploadedBy} on {file.uploadedAt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDeleteFile(activeProject.id, file.id)}
                className="text-muted hover:text-accent-red cursor-pointer p-1"
                aria-label="Delete document file"
              >
                <Trash className="h-3 w-3" />
              </button>
            </div>
          ))}
          {activeProject.files.length === 0 && (
            <p className="text-center py-6 text-[10px] text-muted">No files uploaded yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Members roster */}
      <div className="space-y-6">
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold">Collaborators</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-3.5">
            {activeProject.members.map((m: any) => (
              <div key={m.id} className="flex items-center space-x-2.5 text-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.avatarUrl} alt={m.name} className="w-7 h-7 rounded-full object-cover border border-border" />
                <div>
                  <p className="font-bold text-foreground">{m.name}</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5">{m.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
