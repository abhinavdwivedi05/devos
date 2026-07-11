import React from "react";
import { journalService } from "@/services/journal.service";
import JournalClient from "@/features/journal/components/JournalClient";

export default async function JournalPage() {
  const entries = await journalService.getEntries();

  return <JournalClient initialEntries={entries} />;
}
