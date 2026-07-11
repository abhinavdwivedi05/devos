import React from "react";
import { Folder, Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface FolderSidebarProps {
  folders: any[];
  activeFolderId: string | null;
  onSelectFolder: (id: string) => void;
  newFolderName: string;
  onChangeNewFolderName: (val: string) => void;
  showNewFolderInput: boolean;
  onToggleNewFolderInput: (val: boolean) => void;
  onSubmitNewFolder: (e: React.FormEvent) => void;
}

export function FolderSidebar({
  folders,
  activeFolderId,
  onSelectFolder,
  newFolderName,
  onChangeNewFolderName,
  showNewFolderInput,
  onToggleNewFolderInput,
  onSubmitNewFolder,
}: FolderSidebarProps) {
  return (
    <div className="w-48 border-r border-border bg-card/25 flex flex-col justify-between shrink-0 p-4 space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Notebooks</span>
          <button
            onClick={() => onToggleNewFolderInput(!showNewFolderInput)}
            className="text-muted hover:text-foreground cursor-pointer"
            aria-label="Toggle add folder"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {showNewFolderInput && (
          <form onSubmit={onSubmitNewFolder} className="space-y-2">
            <Input
              placeholder="Folder name"
              className="h-8 text-xs px-2"
              value={newFolderName}
              onChange={(e) => onChangeNewFolderName(e.target.value)}
            />
            <div className="flex justify-end space-x-1.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 text-[10px]"
                onClick={() => onToggleNewFolderInput(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm" className="h-6 text-[10px] px-2.5">
                Save
              </Button>
            </div>
          </form>
        )}

        <nav className="space-y-0.5" aria-label="Notes folder list">
          {folders.map((f) => (
            <button
              key={f.id}
              onClick={() => onSelectFolder(f.id)}
              className={cn(
                "w-full flex items-center space-x-2 px-2.5 py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer text-left",
                activeFolderId === f.id
                  ? "bg-border text-foreground font-extrabold"
                  : "text-muted hover:text-foreground hover:bg-card/40"
              )}
            >
              <Folder className="h-3.5 w-3.5 text-accent-blue" />
              <span className="truncate">{f.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
