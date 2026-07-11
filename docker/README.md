# DevOS Docker Workspace

This workspace is set up to coordinate service containers for DevOS (frontend, backend database, caching, and Spring Boot service).

---

## 1. Coordinated Containers
The multi-container orchestrator includes:
* **Frontend**: Next.js App Router (mapped to local port `3000`)
* **Backend**: Spring Boot Service (mapped to local port `8080`)
* **PostgreSQL**: Relational database storage (port `5432`)
* **Redis**: Streak analytics caching and key-value queues (port `6379`)

---

## 2. Dev Launch Instructions
When backend integration begins, spin up the database and caching dependencies locally using:
```bash
docker compose up -d
```
To stop the environment and discard volumes:
```bash
docker compose down -v
```
To view logs of the database:
```bash
docker compose logs postgres
```
