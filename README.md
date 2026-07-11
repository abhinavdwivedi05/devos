# DevOS

🚀 Live Demo: https://your-vercel-url.vercel.app

The Operating System for Developers.

# DevOS Monorepo — The Developer Workspace Operating System

DevOS is a high-performance, dark-first productivity cockpit for developers, consolidating tools like GitHub analytics, LeetCode calculators, projects boards, notes notebooks, and career pipeline boards in one dashboard.

This repository is structured as a scalable monorepo, housing the frontend Next.js application, backend Spring Boot specification, and Docker configurations.

---

## 📁 Repository Organization

```text
devos/
├── frontend/                  # Next.js App Router workspace
│   ├── app/
│   ├── components/
│   ├── features/
│   └── ...
├── backend/                   # Spring Boot API specifications
├── docker/                    # Docker Compose environment helpers
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI build check
└── docker-compose.yml         # Dev environment container orchestrations
```

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
