# DevOS Roadmap

This document outlines the milestones and future enhancements planned for the DevOS platform.

---

## Milestone 1: Core Frontend Foundation (Completed)
- [x] Establishment of dark-first Tailwind CSS v4 variables system.
- [x] Multi-views dashboard, markdown files workspaces, Kanban, calendar, and AI mentor interfaces.
- [x] State synchronization using Zustand in-memory storage.
- [x] Zero-warning production compile verification.

## Milestone 2: API & Integration Connectors (Planned)
- [ ] **GitHub OAuth Integration**: Replace simulated statistics with active user API connections using NextAuth.js.
- [ ] **LeetCode Webhook Sync**: Sync daily solved challenges utilizing public GraphQL API handlers.
- [ ] **Markdown Notes Persistence**: Hook notes directories to local indexDB or a cloud-based serverless database (e.g. Supabase, PostgreSQL).
- [ ] **Resume ATS Models Upgrade**: Replace local AI responses with OpenAI GPT-4o parsed analysis.

## Milestone 3: Collaboration & Teams (Future)
- [ ] Real-time project boards collaborative editing using websockets.
- [ ] Teammates invitation handles and active status indicators.
- [ ] Edge routing optimizations for worldwide coverage.
