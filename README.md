# MediCare — AI-Powered Smart Health Monitoring and Medication Management System

> University Innovative Design Project (IDP)

**Status:** 🚧 Phase 1 of 15 complete — repository scaffolding only. Core
application code (backend, frontend, AI service, ESP32 firmware) is added in
later phases. See [Project Roadmap](#project-roadmap) below.

## Project Roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 | Repository structure & config files | ✅ Done |
| 2 | Backend & MongoDB models | ⬜ Pending |
| 3 | Authentication & role-based authorization | ⬜ Pending |
| 4 | Health monitoring APIs & IoT API | ⬜ Pending |
| 5 | Medication management system | ⬜ Pending |
| 6 | Notification & SOS systems | ⬜ Pending |
| 7 | Python FastAPI AI health analysis service | ⬜ Pending |
| 8 | React frontend & UI components | ⬜ Pending |
| 9 | Patient dashboard | ⬜ Pending |
| 10 | Doctor dashboard | ⬜ Pending |
| 11 | Caregiver dashboard | ⬜ Pending |
| 12 | ESP32 simulation & IoT code | ⬜ Pending |
| 13 | Demo data generation | ⬜ Pending |
| 14 | Testing & debugging | ⬜ Pending |
| 15 | README & full documentation | ⬜ Pending |

## Repository Structure

```
medicare-ai-health-system/
├── frontend/       # React + Vite + Tailwind SPA
├── backend/        # Node.js + Express + MongoDB REST API
├── ai-service/     # Python FastAPI health-analysis microservice
├── esp32/          # ESP32 firmware for IoT health readings
├── docs/           # Architecture, API, DB design, project report
└── screenshots/    # UI screenshots for submission
```

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Recharts, Lucide Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **AI/Analysis:** Python, FastAPI, Pandas, NumPy, scikit-learn
- **IoT:** ESP32, Arduino framework, HTTP REST
- **Deployment:** Vercel (frontend), Render/Railway (backend & AI service), MongoDB Atlas

## Getting Started (will be expanded per-phase)

Each subproject has its own `.env.example`:

- `backend/.env.example`
- `frontend/.env.example`
- `ai-service/.env.example`

Copy each to `.env` in its respective folder and fill in real values before
running. Full setup instructions (install, run, seed demo data) will be
added in Phase 15 once every service exists.

## License

MIT — see [LICENSE](./LICENSE).

## Disclaimer

MediCare's AI-generated health insights are **decision-support information
only** and are **not a medical diagnosis**. The system does not replace
consultation with a licensed physician.
UPDATED BY R SAI VEDANT