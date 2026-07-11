# Changelog

All notable changes to the DevOS project will be documented in this file.

---

## [1.0.0] - 2026-07-11

### Added
- **Core SaaS Dashboard Pages**: Integrated Landing Page, Auth Suite, Dashboard, Notes, Projects Kanban, Tasks Checklist, AI Mentor Chat, Resume manager, GitHub Stats, LeetCode tracker, Job Applications pipeline, and Global Calendar.
- **Dynamic SEO Assets**: Built automatic dynamic [sitemap.ts](file:///c:/Users/abhin/Downloads/DevOs/app/sitemap.ts), [robots.txt](file:///c:/Users/abhin/Downloads/DevOs/app/robots.txt), and [icon.tsx](file:///c:/Users/abhin/Downloads/DevOs/app/icon.tsx) favicon generation.
- **CI/CD pipeline**: Created `.github/workflows/ci.yml` validation runner.

### Changed
- **Server Shell Optimization**: Removed `"use client"` from root layouts to enable Server Component rendering for the dashboard frame.
- **Lucide Icons Resolution**: Created custom brand SVGs in `components/ui/BrandIcons.tsx` to handle recent Lucide brand deprecations for GitHub, LinkedIn, and Twitter.
- **JSX Regex Compilation Fix**: Moved markdown stripping regex containing backticks out of Notes JSX blocks to standalone helper functions.
- **Modular Feature Restructure**: Decomposed monolithic files (over 300 lines) in Projects, Notes, Tasks, and AI features into small sub-components.
- **Type Checking Optimization**: Combined duplicate badge styling properties in `components/ui/Badge.tsx` and updated mock objects with `createdAt` timestamps.
