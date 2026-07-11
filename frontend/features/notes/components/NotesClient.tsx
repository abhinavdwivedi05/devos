"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus, Pin, Archive, Trash, Search, Edit2, Eye, AlertCircle } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { FolderSidebar } from "./FolderSidebar";
import { MarkdownPreview, stripMarkdown } from "./MarkdownPreview";

export function NotesClient({ initialNotes, initialFolders }: { initialNotes: any[]; initialFolders: any[] }) {
  const { notes, folders, addNote, updateNote, deleteNote, moveNoteToTrash, archiveNote, pinNote, createFolder } = useStore();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | null>("work");
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState<"edit" | "preview">("edit");
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);

  // Sync state with selected note initial selection
  const selectedNote = useMemo(() => {
    return notes.find((n) => n.id === selectedNoteId) || null;
  }, [notes, selectedNoteId]);

  // Set initial selected note if none is active
  useEffect(() => {
    const activeNotes = notes.filter((n) => n.folderId === activeFolderId && !n.isTrash && !n.isArchived);
    if (activeNotes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(activeNotes[0].id);
    }
  }, [notes, activeFolderId, selectedNoteId]);

  // Filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase());
      
      const matchesFolder = n.folderId === activeFolderId;
      const isAvailable = !n.isTrash && !n.isArchived;

      return matchesSearch && matchesFolder && isAvailable;
    });
  }, [notes, activeFolderId, search]);

  const handleCreateNote = () => {
    const title = "New Note";
    addNote({
      title,
      content: `# New Note\n\nType your notes details here...`,
      folderId: activeFolderId,
      tags: [],
      isPinned: false,
      isArchived: false,
      isTrash: false,
    });
    toast("New note added!", "success");
  };

  const handleAddFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    createFolder(newFolderName);
    setNewFolderName("");
    setShowNewFolderInput(false);
    toast("Folder created!", "success");
  };

  const handleTrashNote = (id: string) => {
    moveNoteToTrash(id);
    setSelectedNoteId(null);
    toast("Note moved to Trash", "info");
  };

  return (
    <div className="h-[calc(100vh-100px)] flex border border-border rounded-md bg-[#0d1117] overflow-hidden select-none">
      {/* Folder sidebar - leftmost */}
      <FolderSidebar
        folders={folders}
        activeFolderId={activeFolderId}
        onSelectFolder={(id) => {
          setActiveFolderId(id);
          setSelectedNoteId(null);
        }}
        newFolderName={newFolderName}
        onChangeNewFolderName={setNewFolderName}
        showNewFolderInput={showNewFolderInput}
        onToggleNewFolderInput={setShowNewFolderInput}
        onSubmitNewFolder={handleAddFolderSubmit}
      />

      {/* Files list sidebar - middle left */}
      <div className="w-60 border-r border-border bg-[#0d1117] flex flex-col shrink-0">
        <div className="p-4 border-b border-border/60 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted/65" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-md pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted/60 focus:outline-hidden focus:ring-1 focus:ring-accent-blue/50"
            />
          </div>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-md" onClick={handleCreateNote} aria-label="Create note">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredNotes.length > 0
            ? filteredNotes.map((note) => {
                return (
                  <button
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                    className={cn(
                      "w-full flex flex-col text-left p-2.5 rounded-sm transition-all cursor-pointer space-y-1 group border border-transparent",
                      selectedNoteId === note.id
                        ? "bg-border/60 border-border text-foreground font-extrabold"
                        : "hover:bg-card/45 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-semibold truncate flex-1">{note.title || "Untitled"}</span>
                      {note.isPinned && <Pin className="h-3 w-3 text-accent-blue shrink-0 ml-1.5" />}
                    </div>
                    <span className="text-[10px] text-muted truncate font-medium">
                      {stripMarkdown(note.content) || "Empty note"}
                    </span>
                  </button>
                );
              })
            : <div className="text-center py-8 text-[11px] text-muted">No notes found.</div>}
        </div>
      </div>

      {/* Editor Panel - rightmost */}
      <div className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden">
        {selectedNote ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Action Header */}
            <div className="px-6 py-3 border-b border-border/40 flex items-center justify-between bg-card/10 select-none">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                className="bg-transparent border-0 font-bold text-sm sm:text-base text-foreground focus:outline-hidden focus:ring-0 max-w-sm sm:max-w-md w-full"
              />

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => pinNote(selectedNote.id)}
                  aria-label="Pin note"
                >
                  <Pin className={cn("h-3.5 w-3.5", selectedNote.isPinned ? "fill-accent-blue text-accent-blue" : "text-muted")} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => archiveNote(selectedNote.id)}
                  aria-label="Archive note"
                >
                  <Archive className={cn("h-3.5 w-3.5", selectedNote.isArchived ? "fill-accent-purple text-accent-purple" : "text-muted")} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md hover:text-accent-red"
                  onClick={() => handleTrashNote(selectedNote.id)}
                  aria-label="Move to trash"
                >
                  <Trash className="h-3.5 w-3.5 text-muted hover:text-accent-red" />
                </Button>

                <div className="h-4 w-px bg-border mx-1" />

                <div className="flex bg-card border border-border p-0.5 rounded-md">
                  <button
                    onClick={() => setEditMode("edit")}
                    className={cn("px-2 py-1 text-[10px] font-bold rounded-sm flex items-center space-x-1 cursor-pointer transition-all", {
                      "bg-border text-foreground": editMode === "edit",
                      "text-muted hover:text-foreground": editMode !== "edit",
                    })}
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setEditMode("preview")}
                    className={cn("px-2 py-1 text-[10px] font-bold rounded-sm flex items-center space-x-1 cursor-pointer transition-all", {
                      "bg-border text-foreground": editMode === "preview",
                      "text-muted hover:text-foreground": editMode !== "preview",
                    })}
                  >
                    <Eye className="h-3 w-3" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Note Content Area */}
            <div className="flex-1 overflow-hidden p-6">
              {editMode === "edit" ? (
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                  placeholder="Start coding or write notes..."
                  className="w-full h-full bg-transparent border-0 text-xs sm:text-sm text-foreground placeholder:text-muted/60 focus:outline-hidden focus:ring-0 resize-none font-mono leading-relaxed"
                />
              ) : (
                <div className="w-full h-full overflow-y-auto pr-2">
                  <MarkdownPreview content={selectedNote.content} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none space-y-3">
            <AlertCircle className="h-8 w-8 text-muted" />
            <h3 className="text-sm font-bold text-foreground">No Note Selected</h3>
            <p className="text-[10px] text-muted max-w-xs leading-relaxed font-semibold">
              Choose a markdown note card from the file column on the left or launch a scratchpad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesClient;
