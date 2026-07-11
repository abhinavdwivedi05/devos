# DevOS Backend - Spring Boot Core Specifications

This directory contains specifications and architectural notes for the future Spring Boot REST API backend of DevOS.

---

## 1. Planned Stack & Architecture
- **Framework**: Spring Boot 3.3.x (Java 21)
- **Database**: PostgreSQL (Relational store for users, profiles, tasks, notes, jobs)
- **Caching**: Redis (Streak analytics caches, session store)
- **Security**: Spring Security 6 with JWT and OAuth2 OAuth providers (GitHub/Google)
- **Architecture**: Domain-Driven Design (DDD) layered architecture:
  ```text
  com.devos.backend/
  ├── config/             # Security, Redis, PostgreSQL setup
  ├── controller/         # REST Controllers mapping /api/v1/ endpoints
  ├── model/              # JPA entity models
  ├── repository/         # Database repositories (Spring Data JPA)
  ├── service/            # Core business services
  └── dto/                # Data Transfer Objects
  ```

---

## 2. Planned API Endpoint Mapping

| Method | Endpoint | Description | Frontend Service |
|--------|----------|-------------|------------------|
| GET | `/api/v1/notes` | Get all notes list | `notes.service.ts` |
| POST | `/api/v1/notes` | Create a note card | `notes.service.ts` |
| PUT | `/api/v1/notes/{id}` | Update title/content | `notes.service.ts` |
| DELETE | `/api/v1/notes/{id}` | Move to trash / Delete | `notes.service.ts` |
| GET | `/api/v1/tasks` | Get all checklist tasks | `tasks.service.ts` |
| POST | `/api/v1/tasks` | Create scheduler task | `tasks.service.ts` |
| GET | `/api/v1/projects` | Get all boards details | `projects.service.ts` |
| POST | `/api/v1/ai/chat` | Send prompt chat mentor | `ai.service.ts` |

---

## 3. Database Schema Models (PostgreSQL)
We plan to map the tables to represent Zustand store models:
1. `users` (id, email, password_hash, username, avatar_url, bio, skills[])
2. `note_folders` (id, user_id, name, icon)
3. `notes` (id, folder_id, title, content, tags[], is_pinned, is_archived, is_trash, created_at, updated_at)
4. `tasks` (id, user_id, title, description, status, priority, due_date, labels[], is_recurring, recurrence_rule)
