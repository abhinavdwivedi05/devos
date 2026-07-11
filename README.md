# DevOS — The Operating System for Developers

🚀 Live Demo: https://devos-amber.vercel.app

The Operating System for Developers.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

DevOS is a high-performance, dark-first productivity cockpit for developers, consolidating tools like GitHub analytics, LeetCode calculators, projects boards, notes notebooks, and career pipeline boards in one dashboard.

Designed with inspiration from premium interfaces like Vercel, Linear, Stripe, and Raycast.

* **Live Demo**: [https://devos-amber.vercel.app](https://devos-amber.vercel.app)

---

## 📸 Screenshots Gallery

| Landing Page | Dashboard Overview | Notes Workspace |
| :---: | :---: | :---: |
| ![Landing Page](docs/screenshots/landing.png) | ![Dashboard Overview](docs/screenshots/dashboard.png) | ![Notes Workspace](docs/screenshots/notes.png) |

| Projects Kanban | Tasks Scheduler | Resume ATS Analyzer |
| :---: | :---: | :---: |
| ![Projects Kanban](docs/screenshots/projects.png) | ![Tasks Scheduler](docs/screenshots/tasks.png) | ![Resume ATS Analyzer](docs/screenshots/resume.png) |

| Global Calendar | Performance Analytics | AI Mentor Assistant |
| :---: | :---: | :---: |
| ![Global Calendar](docs/screenshots/calendar.png) | ![Performance Analytics](docs/screenshots/analytics.png) | ![AI Mentor Assistant](docs/screenshots/ai_mentor.png) |

| Developer Profile | Configuration Settings |
| :---: | :---: |
| ![Developer Profile](docs/screenshots/profile.png) | ![Configuration Settings](docs/screenshots/settings.png) |

---

## 🚀 Features

- **Vercel-style Dashboard**: Contribution heat maps, upcoming recruiter meetings, ATS grades, and study indicators.
- **Markdown Notes**: Nested file system directories, Markdown syntax highlighting editors, and real-time layout previews.
- **Kanban Board Projects**: Board columns, Gantt timelines, document vaults, and member rosters.
- **Interactive AI Mentor**: Chat workspace offering learning roadmap generators, code reviews, and resume checklists.
- **Job Tracker**: Pipe stages tracking recruitment states, salaries, and formats.

---

## 🏗️ Architecture

```text
devos/
├── frontend/                  # Next.js Client App (App Router, Zustand, Tailwind CSS v4)
├── backend/                   # Future Spring Boot API Server specifications
├── docker/                    # Docker Compose environment configurations
└── docker-compose.yml         # Container configuration file
```

For a detailed look at data flow, state management, and code guidelines, refer to the [ARCHITECTURE.md](ARCHITECTURE.md) blueprint document.

---

## 📦 Setting Up Locally

### Prerequisites
* Node.js v18+, v20+, or v22+
* npm

### Installation & Execution
1. Clone the repository:
   ```bash
   git clone https://github.com/username/devos.git
   cd devos
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install package dependencies:
   ```bash
   npm install
   ```
4. Boot the development server:
   ```bash
   npm run dev
   ```
The development panel will start at [http://localhost:3000](http://localhost:3000).

---

## ⚡ Deployment to Vercel
To deploy from the monorepo structure, use the following settings on Vercel:
* **Framework Preset**: `Next.js`
* **Root Directory**: `frontend`
* **Build Command**: `npm run build`
* **Install Command**: `npm install`
* **Output Directory**: `.next` (default)

---

## 🗺️ Future Roadmap & Plans
* **Spring Boot API integration**: Connect mock endpoints to active database tables.
* **Persistent Notes Storage**: Save files directly to PostgreSQL/IndexDB.
* **Live OAuth Integrations**: Integrate NextAuth for secure Google/GitHub logs.

---

## 🤝 Contributing
Onboarding details and styling guide rules are documented in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📄 License
This project is open-sourced under the terms of the MIT License. See [LICENSE](LICENSE) for details.
