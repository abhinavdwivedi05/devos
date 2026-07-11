import React from "react";
import { notesService } from "@/services/notes.service";
import NotesClient from "@/features/notes/components/NotesClient";

export default async function NotesPage() {
  const [notes, folders] = await Promise.all([
    notesService.getNotes(),
    notesService.getFolders(),
  ]);

  return <NotesClient initialNotes={notes} initialFolders={folders} />;
}
