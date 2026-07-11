# DevOS Frontend Architecture

This document outlines the architecture, data flow, state management, and file layout guidelines of the **DevOS** dashboard workspace.

---

## 1. Directory Structure
We follow a strictly structured, modular folder organization:
```text
devos/
├── app/                  # Routing entry points (Server Components by default)
├── components/
│   ├── navigation/       # Global Sidebar and Navbar layouts
│   └── ui/               # Reusable atomic UI components (Buttons, inputs, dialogs)
├── features/             # Business modules
│   └── <feature_name>/
│       ├── components/   # Decomposed interactive client elements
│       └── ...
├── services/             # Mock Promise API wrappers
├── store/                # Zustand global client state management
├── types/                # Unified TypeScript typings
└── public/               # Static SEO assets
```

---

## 2. Component Design & Next.js App Router
1. **Server Components by Default**: Pages inside `app/` are Server Components. They handle asynchronous API pre-fetches and pass resolved payloads down to client wrappers:
   ```typescript
   // Example: app/(dashboard)/notes/page.tsx
   export default async function Page() {
     const notes = await notesService.getNotes();
     return <NotesClient initialNotes={notes} />;
   }
   ```
2. **Interactive Client Views**: Code-split interactive panels (markdown editors, dialog forms, calendars, grids) are separated into sub-components inside their feature folders and marked as `"use client"`.
3. **Lazy Loading**: Heavy client modules (like `CommandPalette`) are loaded dynamically with `ssr: false` in providers to reduce hydration delays.

---

## 3. Zustand State Coordinator ([useStore.ts](file:///c:/Users/abhin/Downloads/DevOs/store/useStore.ts))
Zustand orchestrates in-memory lists (notes, tasks, jobs, journal) and user settings. 
- Layout structures and user preference details are saved to standard browser `localStorage` dynamically.
- When real API backends are integrated, these Zustand methods can be directly mapped to async actions invoking `axios` or `fetch` commands.

---

## 4. API Backend Handoff Integration Map
To swap simulated mock models with real databases:
1. Locate the service interface files inside `services/` (e.g. `github.service.ts`, `notes.service.ts`).
2. Swap the Promise timeout returns with native fetch queries pointing to your server endpoints:
   ```typescript
   // Before:
   getNotes: async () => new Promise((res) => setTimeout(() => res(mockNotes), 300))

   // After:
   getNotes: async () => {
     const res = await fetch("/api/notes");
     return res.json();
   }
   ```
3. Update Zustand hooks (`store/useStore.ts`) to manage query results or fetch updates asynchronously.
